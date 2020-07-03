export type DeferredCall = <T extends () => void>(f: T, waitTime: number) => T;

export const deferred: DeferredCall = <T extends () => void>(
    f: T,
    waitTime: number,
) => {
    let timeoutId: number;
    return (((...args: []) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => f(...args), waitTime);
    }) as unknown) as T;
};
