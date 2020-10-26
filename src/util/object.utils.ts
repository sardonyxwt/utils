export function deepFreeze<T extends Record<string, never>>(
    obj: T,
): Readonly<T> {
    Object.getOwnPropertyNames(obj).forEach(function (key) {
        const prop = obj[key];
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });
    return Object.freeze(obj);
}

export function stringifyValue(value: never): string {
    if (value === undefined || value === null) {
        return '';
    }
    if (typeof value === 'number') {
        return `${value}`;
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
}

export const resolveValue = <T>(
    object: Record<string, never>,
    path: string,
): T => {
    const pathParts = path.split(/[.\[\]]/).filter((it) => it !== '');
    let result = object;
    for (let i = 0; i < pathParts.length; i++) {
        if (!result || typeof result !== 'object') {
            result = undefined;
            break;
        }
        result = result[pathParts[i]];
    }
    return result as T;
};

export const clone = <T>(source: T): T => {
    return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
};

export const cloneArray = <T>(sources: T[]): T[] => sources.map(clone);

export const cloneArrays = <T>(...sourceArrays: T[][]): T[] => {
    const result: T[] = [];
    sourceArrays.forEach((sourceArray) =>
        sourceArray.forEach((source) => result.push(clone(source))),
    );
    return result;
};

export const copyArray = <T>(sources: T[]): T[] => [...sources];

export const copyArrays = <T>(...sourceArrays: T[][]): T[] => {
    const result: T[] = [];
    sourceArrays.forEach((sourceArray) => result.push(...sourceArray));
    return result;
};

export const resolveArray = <T>(source: T | T[]): T[] =>
    Array.isArray(source) ? source : [source];

export const arrayFrom = <T>(...sources: (T | T[])[]): T[] =>
    copyArrays(...sources.map(resolveArray));

export const saveToArray = <T>(
    array: T[],
    newEl: T,
    compareFn: (arrEl: T, newEl: T, index: number, arr: T[]) => boolean = (
        arrEl,
        newEl,
    ) => arrEl === newEl,
): void => {
    const oldElIndex = array.findIndex((arrEl, index, arr) =>
        compareFn(arrEl, newEl, index, arr),
    );
    if (oldElIndex === -1) {
        array.push(newEl);
        return;
    }
    array[oldElIndex] = newEl;
};

export const deleteFromArray = <T>(
    array: T[],
    compareFn: (arrEl: T, index: number, arr: T[]) => boolean,
): void => {
    const deleteElIndex = array.findIndex(compareFn);
    if (deleteElIndex === -1) {
        return;
    }
    array.splice(deleteElIndex, 1);
};
