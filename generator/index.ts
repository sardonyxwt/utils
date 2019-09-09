export type Generator<T> = (...args) => T;

export const generateSalt: Generator<string> = (
    length = 16,
    sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
    let result = '';
    while (result.length < length) {
        result += sample.charAt(Math.floor(Math.random() * sample.length))
    }
    return result;
};

export const generateUUID: Generator<string> = () =>
    `${generateSalt(4)}-${generateSalt(4)}-${generateSalt(4)}-${generateSalt(4)}`;

export const createUniqueIdGenerator = (prefix: string): Generator<string> => {
    let index = 0;
    const uuid = generateUUID();
    const uniquePrefix = `${prefix}:${uuid}`;
    return () => `${uniquePrefix}:${++index}`;
};
