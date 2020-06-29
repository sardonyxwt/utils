class Converter {
    convertArray(sources) {
        return sources.map(this.convert);
    }
}
class DoubleSidedConverter extends Converter {
    revertArray(sources) {
        return sources.map(this.revert);
    }
}
class StraightConverter {
    convertToArray(sources) {
        return sources.map(this.convertTo);
    }
    convertFromArray(sources) {
        return sources.map(this.convertFrom);
    }
}

function preloadImageSource(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = source;
        image.onload = resolve;
        image.onerror = reject;
    });
}
function calculateRem() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const resolveFunctionCall = (func, ...flags) => !func || flags.findIndex(it => !it) >= 0 ? (() => null) : func;
const prepareFunctionCall = (func, ...flags) => !func || flags.findIndex(it => !it) >= 0 ? (() => () => null) : (...args) => () => func(...args);
const deferred = (f, waitTime) => {
    let timeoutId;
    return ((...args) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => f(...args), waitTime);
    });
};

const generateSalt = (length = 16, sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    let result = '';
    while (result.length < length) {
        result += sample.charAt(Math.floor(Math.random() * sample.length));
    }
    return result;
};
const generateUUID = () => `${generateSalt(4)}-${generateSalt(4)}-${generateSalt(4)}-${generateSalt(4)}`;
const createUniqueIdGenerator = (prefix) => {
    let index = 0;
    const uuid = generateUUID();
    const uniquePrefix = `${prefix}:${uuid}`;
    return () => `${uniquePrefix}:${++index}`;
};

function deepFreeze(obj) {
    Object.getOwnPropertyNames(obj).forEach(function (key) {
        let prop = obj[key];
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });
    return Object.freeze(obj);
}
function stringifyValue(value) {
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
const resolveValue = (object, path) => {
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
const clone = (source) => {
    return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
};
const cloneArray = (sources) => sources.map(clone);
const cloneArrays = (...sourceArrays) => {
    const result = [];
    sourceArrays.forEach(sourceArray => sourceArray.forEach(source => result.push(clone(source))));
    return result;
};
const copyArray = (sources) => [...sources];
const copyArrays = (...sourceArrays) => {
    const result = [];
    sourceArrays.forEach(sourceArray => result.push(...sourceArray));
    return result;
};
const resolveArray = (source) => Array.isArray(source) ? source : [source];
const arrayFrom = (...sources) => copyArrays(...sources.map(resolveArray));
const saveToArray = (array, newEl, compareFn = (arrEl, newEl) => arrEl === newEl) => {
    const oldElIndex = array.findIndex((arrEl, index, arr) => compareFn(arrEl, newEl, index, arr));
    if (oldElIndex === -1) {
        array.push(newEl);
        return;
    }
    array[oldElIndex] = newEl;
};
const deleteFromArray = (array, compareFn) => {
    const deleteElIndex = array.findIndex(compareFn);
    if (deleteElIndex === -1) {
        return;
    }
    array.splice(deleteElIndex, 1);
};

const charFromHexCode = (hexCode) => String.fromCharCode(parseInt(hexCode, 16));

function buildUrl(endpoint, options = {}) {
    let url = endpoint;
    const { queryParams, pathParams } = options;
    if (pathParams) { // todo update logic and add exception
        Object.getOwnPropertyNames(pathParams).forEach(key => {
            url = url.replace(new RegExp(`({${key}})|(:${key})`, 'g'), `${pathParams[key]}`);
        });
    }
    url.replace(new RegExp('({.*})|(:.*?\\/)', 'g'), '');
    if (queryParams) {
        let queryUrl = Object.getOwnPropertyNames(queryParams)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(`${queryParams[k]}`)}`)
            .join('&');
        if (queryUrl)
            url += `?${queryUrl}`;
    }
    return url;
}

export { Converter, DoubleSidedConverter, StraightConverter, arrayFrom, buildUrl, calculateRem, charFromHexCode, clone, cloneArray, cloneArrays, copyArray, copyArrays, createUniqueIdGenerator, deepFreeze, deferred, deleteFromArray, generateSalt, generateUUID, preloadImageSource, prepareFunctionCall, resolveArray, resolveFunctionCall, resolveValue, saveToArray, stringifyValue };
