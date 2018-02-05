export class SynchronizedCache<T> {

  private cache: Map<string, Promise<T>> = new Map();

  constructor(private action: (key) => Promise<T>) {
  }

  get(id: string): Promise<T> {
    if (this.cache.has(id)) {
      return <Promise<T>>this.cache.get(id);
    } else {
      const promise = this.action(id);
      this.cache.set(id, promise);
      return promise;
    }
  }
}

export function createSyncCache<T>(action: (key) => Promise<T>) {
  return new SynchronizedCache<T>(action);
}

export function syncPromises<T>(promises: (Promise<T> | T)[]): Promise<T[]> {
  let results: T[] = [];
  return new Promise<T[]>(((resolve, reject) => {
    if (promises.length === 0) resolve(results);
    promises.forEach(promise => {
      if (promise instanceof Promise) {
        (promise as Promise<T>).then(result => {
          results.push(result);
          if (results.length === promises.length) resolve(results);
        }).catch((error) => reject(error));
      } else {
        results.push(promise);
        if (results.length === promises.length) resolve(results);
      }
    });
  }));
}
