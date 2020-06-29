export declare function deepFreeze<T>(obj: T): Readonly<T>;
export declare function flatten(data: any): {};
export declare function unflatten(data: any): any;
export declare function stringifyValue(value: any): string;
export declare const resolveValue: (object: any, path: string) => any;
export declare const clone: <T>(source: T) => T;
export declare const cloneArray: <T>(sources: T[]) => T[];
export declare const cloneArrays: <T>(...sourceArrays: T[][]) => T[];
export declare const copyArray: <T>(sources: T[]) => T[];
export declare const copyArrays: <T>(...sourceArrays: T[][]) => T[];
export declare const resolveArray: <T>(source: T | T[]) => T[];
export declare const arrayFrom: <T>(...sources: (T | T[])[]) => T[];
export declare const saveToArray: <T>(array: T[], newEl: T, compareFn?: (arrEl: T, newEl: T, index: number, arr: T[]) => boolean) => void;
export declare const deleteFromArray: <T>(array: T[], compareFn: (arrEl: T, index: number, arr: T[]) => boolean) => void;
//# sourceMappingURL=object.utils.d.ts.map