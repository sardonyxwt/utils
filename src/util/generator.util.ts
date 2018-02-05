let indexes: { [key: string]: number } = {};

export class GeneratorUtil {

  static generateSeed(length: number) {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string[] = [];
    while (result.length < length) {
      result.push(
        CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
      );
    }
    return result;
  }

  static uniqueId(prefix = '', useSeed = false) {
    indexes[prefix] ? ++indexes[prefix] : indexes[prefix] = 0;
    let result = prefix + indexes[prefix];
    if (useSeed) result = `${result}-${GeneratorUtil.generateSeed(8).join('')}`;
    return result;
  }

}
