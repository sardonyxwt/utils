export declare class SynchronizedCache<T> {
    private action;
    private cache;
    constructor(action: (key) => Promise<T>);
    get(id: string): Promise<T>;
}
export declare class SynchronizedUtil {
    static createSyncCache<T>(action: (key) => Promise<T>): SynchronizedCache<T>;
    static syncPromises<T>(promises: (Promise<T> | T)[]): Promise<T[]>;
}
