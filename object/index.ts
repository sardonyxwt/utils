export class ObjectUtil {

  static deepFreeze<T>(obj: T) {
    Object.getOwnPropertyNames(obj).forEach(function (key) {
      let prop = obj[key];
      if (typeof prop === 'object' && prop !== null) {
        ObjectUtil.deepFreeze(prop);
      }
    });
    return Object.freeze(obj);
  }

}
