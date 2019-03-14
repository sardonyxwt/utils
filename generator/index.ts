export type UniqueIdGenerator = () => string;

export function generateSalt(length: number, sample?: string) {
  const CHARACTERS = sample || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  while (result.length < length) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
  }
  return result;
}

export function createUniqueIdGenerator(): UniqueIdGenerator {
  const salt = generateSalt(32);
  const index = 0;
  return () => `${salt}:${index}`;
}
