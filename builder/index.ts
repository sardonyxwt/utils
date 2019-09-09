export type ConstructorParameters<T> = T extends new (...args: infer T) => any ? T : never;
export type ConstructorReturnType<T, Z = any> = T extends new (...args: any[]) => infer Z ? Z : never;

export type Builder<T> = {
    set: <K extends keyof T>(key: K, value: T[K] | (() => T[K])) => Builder<T>;
    setFrom: (data: Partial<T>) => Builder<T>;
    build: () => T;
} & {
    [K in keyof T]: (value: T[K] | (() => T[K])) => Builder<T>;
}

export type BuilderFactory = <T extends new (...args) => any>(clazz: T) =>
    (...constructorArgs: ConstructorParameters<typeof clazz>) => Builder<ConstructorReturnType<T>>

function createBuilder<T extends new (...args) => any>(
    clazz: T, ...constructorArgs: ConstructorParameters<typeof clazz>
): Builder<ConstructorReturnType<T>> {
    const tempObj = Object.create({});

    const builder = new Proxy({
        set: (key, value) => {
            tempObj[key] = typeof value === 'function' ? value() : value;
            return builder;
        },
        setFrom: (data) => {
            if (typeof data === 'object') {
                Object.getOwnPropertyNames(data).forEach(key => tempObj[key] = data[key]);
            }
            return builder;
        },
        build: () => {
            const object = new (clazz as any)(...constructorArgs);
            Object.getOwnPropertyNames(tempObj).forEach(key => object[key] = tempObj[key]);
            return object;
        }
    }, {
        get(target, key) {
            return key in target
                ? target[key]
                : (value) => target.set(key, value)
        }
    });

    return builder as Builder<ConstructorReturnType<T>>;
}

export const builderFactory: BuilderFactory = <T extends new (...args) => any>(clazz: T) =>
    (...constructorArgs: ConstructorParameters<typeof clazz>) => createBuilder<T>(clazz, ...constructorArgs);
