import 'reflect-metadata';
import { resolveValue } from '../object';

export type ConstructorParameters<T> = T extends new (...args: infer T) => any ? T : never;
export type ConstructorReturnType<T, Z = any> = T extends new (...args: any[]) => infer Z ? Z : never;


export type Mapping = string | ((source, target) => any) | MappingResolver<any> |
    [string | ((source, target) => any), MappingResolver<any>];
export type MappingDecorator = (mapping?: Mapping, defaultValue?) => PropertyDecorator;
export type MappingDecoratorFactory = (sourceId?: string) => MappingDecorator;

export interface MappingResolver<T> {
    from: (source: any) => T;
    fromArray: (source: any) => T[];
}

export type MappingResolverFactory = <T extends new (...args) => any>(
    clazz: T, ...constructorArgs: ConstructorParameters<typeof clazz>
) => (sourceId?: string) => MappingResolver<ConstructorReturnType<T>>;

export const MAPPING_METADATA_KEY = 'metadata:mapping';
export const MAPPING_DEFAULT_SOURCE_ID = 'default';

const metaKey = (sourceId?: string) => `${MAPPING_METADATA_KEY}:${sourceId || MAPPING_DEFAULT_SOURCE_ID}`;

export const mappingDecoratorFactory: MappingDecoratorFactory = (sourceId?) => {
    return (mapping?: Mapping, defaultValue = null) => {
        return (target: Object, propertyKey: string | symbol) => {
            const metadataKey = metaKey(sourceId);
            const isPropertyMetadataExist = Reflect.hasMetadata(metadataKey, target);
            let properties = isPropertyMetadataExist ? Reflect.getMetadata(metadataKey, target) : [];
            properties.push(propertyKey);
            Reflect.defineMetadata(metadataKey, properties, target);
            Reflect.defineMetadata(metadataKey, [mapping || propertyKey, defaultValue], target, propertyKey);
        }
    }
};

export const mapping = mappingDecoratorFactory();

export const mappingResolverFactory: MappingResolverFactory = <T extends new (...args) => any>(
    clazz: T, ...constructorArgs: ConstructorParameters<typeof clazz>
) => {
    return (sourceId?: string): MappingResolver<ConstructorReturnType<T>> => {
        const from = (source: any) => {
            if (typeof source !== 'object' || Array.isArray(source)) {
                return null;
            }

            const object = new (clazz as any)(...constructorArgs);

            const resolveMapping = (propertyName, mapping: Mapping, defaultValue) => {
                if (typeof mapping === 'string') {
                    return resolveValue(source, mapping) || defaultValue;
                }
                if (typeof mapping === 'function') {
                    return mapping(source, object) || defaultValue;
                }
                if (typeof mapping === 'object' && Array.isArray(mapping)) {
                    const value = resolveMapping(propertyName, mapping[0], defaultValue);
                    if (typeof value === 'undefined') {
                        return value;
                    }
                    return Array.isArray(value)
                        ? (mapping[1] as MappingResolver<T>).fromArray(value)
                        : (mapping[1] as MappingResolver<T>).from(value);
                }
                if (typeof mapping === 'object' && !!mapping) {
                    const value = resolveValue(source, propertyName) || defaultValue;
                    if (typeof value === 'undefined') {
                        return value;
                    }
                    return Array.isArray(value)
                        ? (mapping as MappingResolver<T>).fromArray(value)
                        : (mapping as MappingResolver<T>).from(value);
                }
                return source[propertyName] || defaultValue;
            };

            const metadataKey = metaKey(sourceId);
            const isPropertyMetadataExist = Reflect.hasMetadata(metadataKey, clazz.prototype);

            if (!isPropertyMetadataExist) {
                throw new Error('Property metadata not exist')
            }

            Reflect.getMetadata(metadataKey, clazz.prototype).map(propertyName => {
                const [mapping, defaultValue]: [Mapping, any]
                    = Reflect.getMetadata(metadataKey, clazz.prototype, propertyName);

                object[propertyName] = resolveMapping(propertyName, mapping, defaultValue);
            });

            return object as ConstructorReturnType<T>;
        };
        const fromArray = (source: any[]) => {
            if (typeof source !== 'object' || !Array.isArray(source)) {
                return null;
            }
            return source.map(from);
        };
        return {from, fromArray};
    }
};

export const MAPPING: {
    date: MappingResolver<Date>;
    split: (separator: string | RegExp, limit?: number) => MappingResolver<string[]>;
} = {
    date: {
        from: (source: string | number) => source ? new Date(source) : null,
        fromArray: (source: (string | number)[]) => source ? source.map(MAPPING.date.from) : null
    },
    split: (separator: string | RegExp, limit?: number) => ({
        from: (source: string) => source ? source.split(separator, limit) : null,
        fromArray: (source: string[]) => source ? source.map(MAPPING.split(separator, limit).from) : null
    })
};
