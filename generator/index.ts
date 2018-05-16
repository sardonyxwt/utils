let indexes: { [key: string]: number } = {};

export function generateSeed(length: number) {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result: string[] = [];
  while (result.length < length) {
    result.push(
      CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
    );
  }
  return result;
}

export function uniqueId(prefix = '', useSeed = false) {
  indexes[prefix] ? ++indexes[prefix] : indexes[prefix] = 1;
  let result = prefix + indexes[prefix];
  if (useSeed) result = `${result}-${generateSeed(8).join('')}`;
  return result;
}
