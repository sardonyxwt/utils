export declare type Generator<T> = (...args: any[]) => T;
export declare const generateSalt: Generator<string>;
export declare const generateUUID: Generator<string>;
export declare const createUniqueIdGenerator: (prefix: string) => Generator<string>;
