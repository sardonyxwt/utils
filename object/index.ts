export function deepFreeze<T>(obj: T) {
  Object.getOwnPropertyNames(obj).forEach(function (key) {
    let prop = obj[key];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

export function flatten(data) {
  const result = {};

  function recurse(current, prop) {
    if (Object(current) !== current) {
      result[prop] = current;
    } else if (Array.isArray(current)) {
      if (current.length === 0) {
        result[prop] = [];
      } else {
        for (let i = 0; i < current.length; i++) {
          recurse(current[i], prop ? prop + '.' + i : '' + i);
        }
      }
    } else {
      const propNames = Object.getOwnPropertyNames(current);
      if (propNames.length !== 0) {
        propNames.forEach(
          p => recurse(current[p], prop ? prop + '.' + p : p)
        );
      } else {
        result[prop] = {};
      }
    }
  }

  recurse(data, '');
  return result;
}

export function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }
  let result = {}, current, prop, parts, idx;
  Object.getOwnPropertyNames(data).forEach(
    dataProp => {
      current = result;
      prop = '';
      parts = dataProp.split('.');
      for (let i = 0; i < parts.length; i++) {
        idx = !isNaN(parseInt(parts[i], 10));
        current = current[prop] || (current[prop] = (idx ? [] : {}));
        prop = parts[i];
      }
      current[prop] = data[dataProp];
    }
  );
  return result[''];
}

function stringifyValue(value): string {
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
