export const generateSalt = (
    length = 16,
    sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
    let result = '';
    while (result.length < length) {
        result += sample.charAt(Math.floor(Math.random() * sample.length));
    }
    return result;
};

export const generateUUID = (): string =>
    `${generateSalt(4)}-${generateSalt(4)}-${generateSalt(4)}-${generateSalt(
        4,
    )}`;

export type Generator = () => string;

export const createUniqueIdGenerator = (prefix: string): Generator => {
    let index = 0;
    const uuid = generateUUID();
    const uniquePrefix = `${prefix}:${uuid}`;
    return () => `${uniquePrefix}:${++index}`;
};
