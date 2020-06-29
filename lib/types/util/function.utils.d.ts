export declare type Parameters<T> = T extends (...args: infer T) => any ? T : never;
export declare type ReturnType<T> = T extends (...args: any[]) => infer T ? T : never;
export declare const resolveFunctionCall: <T extends Function>(func: T, ...flags: boolean[]) => T;
export declare const prepareFunctionCall: <T extends Function>(func: T, ...flags: boolean[]) => (...args: Parameters<T>) => () => ReturnType<T>;
export declare type DeferredCall = <T extends Function>(f: T, waitTime: number) => T;
export declare const deferred: DeferredCall;
