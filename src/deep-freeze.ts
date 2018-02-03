export function deepFreeze<T>(obj: T) {
  Object.getOwnPropertyNames(obj).forEach(function (key) {
    let prop = obj[key];
    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}
