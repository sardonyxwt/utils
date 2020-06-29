export type Parameters<T> = T extends (...args: infer T) => any ? T : never;
export type ReturnType<T> = T extends (...args: any[]) => infer T ? T : never;

export const resolveFunctionCall = <T extends Function>(func: T, ...flags: boolean[]): T =>
    !func || flags.findIndex(it => !it) >= 0 ? (() => null) as any : func;

export const prepareFunctionCall = <T extends Function>(func: T, ...flags: boolean[]):
    ((...args: Parameters<typeof func>) => () => ReturnType<typeof func>) =>
    !func || flags.findIndex(it => !it) >= 0 ? (() => () => null) as any : (...args) => () => func(...args);

export type DeferredCall = <T extends Function>(f: T, waitTime: number) => T;
export const deferred: DeferredCall = <T extends Function>(f: T, waitTime: number) => {
    let timeoutId: number;
    return ((...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => f(...args), waitTime);
    }) as unknown as T;
};
