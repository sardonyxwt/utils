export declare type ConstructorParameters<T> = T extends new (...args: infer T) => any ? T : never;
export declare type ConstructorReturnType<T, Z = any> = T extends new (...args: any[]) => infer Z ? Z : never;
export declare type Builder<T> = {
    set: <K extends keyof T>(key: K, value: T[K] | (() => T[K])) => Builder<T>;
    setFrom: (data: Partial<T>) => Builder<T>;
    build: () => T;
} & {
    [K in keyof T]: (value: T[K] | (() => T[K])) => Builder<T>;
};
export declare type BuilderFactory = <T extends new (...args: any[]) => any>(clazz: T) => (...constructorArgs: ConstructorParameters<typeof clazz>) => Builder<ConstructorReturnType<T>>;
export declare const builderFactory: BuilderFactory;
//# sourceMappingURL=index.d.ts.map