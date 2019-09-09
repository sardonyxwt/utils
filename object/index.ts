export function deepFreeze<T>(obj: T) {
  Object.getOwnPropertyNames(obj).forEach(function (key) {
    let prop = obj[key];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

export function flatten(data) {
  const result = {};

  function recurse(current, prop) {
    if (Object(current) !== current) {
      result[prop] = current;
    } else if (Array.isArray(current)) {
      if (current.length === 0) {
        result[prop] = [];
      } else {
        for (let i = 0; i < current.length; i++) {
          recurse(current[i], prop ? prop + '.' + i : '' + i);
        }
      }
    } else {
      const propNames = Object.getOwnPropertyNames(current);
      if (propNames.length !== 0) {
        propNames.forEach(
          p => recurse(current[p], prop ? prop + '.' + p : p)
        );
      } else {
        result[prop] = {};
      }
    }
  }

  recurse(data, '');
  return result;
}

export function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }
  let result = {}, current, prop, parts, idx;
  Object.getOwnPropertyNames(data).forEach(
    dataProp => {
      current = result;
      prop = '';
      parts = dataProp.split('.');
      for (let i = 0; i < parts.length; i++) {
        idx = !isNaN(parseInt(parts[i], 10));
        current = current[prop] || (current[prop] = (idx ? [] : {}));
        prop = parts[i];
      }
      current[prop] = data[dataProp];
    }
  );
  return result[''];
}

export function stringifyValue(value): string {
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

export const resolveValue = (object, path: string) => {
    const pathParts = path.split(/[.\[\]]/).filter(it => it !== '');
    let result = object;
    for (let i = 0; i < pathParts.length; i++) {
        if (!result || typeof result !== 'object') {
            result = undefined;
            break;
        }
        result = result[pathParts[i]];
    }
    return result;
};

export const clone = <T>(source: T): T => {
    return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
};

export const cloneArray = <T>(sources: T[]): T[] => sources.map(clone);

export const cloneArrays = <T>(...sourceArrays: (T[])[]): T[] => {
    const result = [];
    sourceArrays.forEach(sourceArray =>
        sourceArray.forEach(source => result.push(clone(source))));
    return result;
};

export const copyArray = <T>(sources: T[]): T[] => [...sources];

export const copyArrays = <T>(...sourceArrays: (T[])[]): T[] => {
    const result = [];
    sourceArrays.forEach(sourceArray => result.push(...sourceArray));
    return result;
};

export const resolveArray = <T>(source: T | T[]): T[] => Array.isArray(source) ? source : [source];

export const arrayFrom = <T>(...sources: (T | T[])[]): T[] => copyArrays(...sources.map(resolveArray));

export const saveToArray = <T>(
    array: T[],
    newEl: T,
    compareFn: (arrEl: T, newEl: T, index: number, arr: T[]) => boolean = (arrEl, newEl) => arrEl === newEl
): void => {
    const oldElIndex = array.findIndex((arrEl, index, arr) => compareFn(arrEl, newEl, index, arr));
    if (oldElIndex === -1) {
        array.push(newEl);
        return;
    }
    array[oldElIndex] = newEl;
};

export const deleteFromArray = <T>(
    array: T[],
    compareFn: (arrEl: T, index: number, arr: T[]) => boolean
) => {
    const deleteElIndex = array.findIndex(compareFn);
    if (deleteElIndex === -1) {
        return;
    }
    array.splice(deleteElIndex, 1);
};
