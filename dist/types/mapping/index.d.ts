import 'reflect-metadata';
export declare type ConstructorParameters<T> = T extends new (...args: infer T) => any ? T : never;
export declare type ConstructorReturnType<T, Z = any> = T extends new (...args: any[]) => infer Z ? Z : never;
export declare type Mapping = string | ((source: any, target: any) => any) | MappingResolver<any> | [string | ((source: any, target: any) => any), MappingResolver<any>];
export declare type MappingDecorator = (mapping?: Mapping, defaultValue?: any) => PropertyDecorator;
export declare type MappingDecoratorFactory = (sourceId?: string) => MappingDecorator;
export interface MappingResolver<T> {
    from: (source: any) => T;
    fromArray: (source: any) => T[];
}
export declare type MappingResolverFactory = <T extends new (...args: any[]) => any>(clazz: T, ...constructorArgs: ConstructorParameters<typeof clazz>) => (sourceId?: string) => MappingResolver<ConstructorReturnType<T>>;
export declare const MAPPING_METADATA_KEY = "metadata:mapping";
export declare const MAPPING_DEFAULT_SOURCE_ID = "default";
export declare const mappingDecoratorFactory: MappingDecoratorFactory;
export declare const mapping: MappingDecorator;
export declare const mappingResolverFactory: MappingResolverFactory;
export declare const MAPPING: {
    date: MappingResolver<Date>;
    split: (separator: string | RegExp, limit?: number) => MappingResolver<string[]>;
};
//# sourceMappingURL=index.d.ts.map