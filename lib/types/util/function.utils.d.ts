export declare type DeferredCall = <T extends () => void>(f: T, waitTime: number) => T;
export declare const deferred: DeferredCall;
