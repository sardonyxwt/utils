export interface SynchronizedCache<T> {
  get(key: string): Promise<T>;
  has(key: string): boolean;
  remove(key: string);
}

class SynchronizedCacheImpl<T> implements SynchronizedCache<T> {

  private cache: { [key: string]: Promise<T> } = {};

  constructor(private action: (key) => Promise<T>) {
  }

  get(key: string): Promise<T> {
    if (key in this.cache) {
      return <Promise<T>>this.cache[key];
    } else {
      const promise = this.action(key);
      this.cache[key] = promise;
      return promise;
    }
  }

  has(key: string): boolean {
    return key in this.cache;
  }

  remove(key: string): boolean {
    const present = this.has(key);
    if (present) {
      this.get(key).then(
        () => delete this.cache[key]
      );
    }
    return present;
  }

}

export function createSyncCache<T>(action: (key) => Promise<T>): SynchronizedCache<T> {
  return new SynchronizedCacheImpl<T>(action);
}
