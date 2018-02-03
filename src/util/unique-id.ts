import {generateSeed} from "./generate-seed";

let indexes: { [key: string]: number } = {};

export function uniqueId(prefix = '', useSeed = false) {
  indexes[prefix] ? ++indexes[prefix] : indexes[prefix] = 0;
  let result = prefix + indexes[prefix];
  if(useSeed) result = `${result}-${generateSeed(8).join('')}`;
  return result;
}
