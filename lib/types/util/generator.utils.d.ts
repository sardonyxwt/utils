export declare const generateSalt: (length?: number, sample?: string) => string;
export declare const generateUUID: () => string;
export declare type Generator = () => string;
export declare const createUniqueIdGenerator: (prefix: string) => Generator;
