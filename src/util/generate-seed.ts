export function generateSeed(length: number) {
  const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string[] = [];
  while(result.length < length) {
    result.push(
      CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
    );
  }
  return result;
}
