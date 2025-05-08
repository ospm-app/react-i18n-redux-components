class CustomStorage {
  private values: Map<string, string>;

  constructor() {
    this.values = new Map();
  }

  key(index: number): string | undefined {
    if (index < 0) {
      return undefined;
    }

    const keys = [...this.values.keys()];

    return keys.length > index ? keys[index] : undefined;
  }

  setItem<T extends { toString(): string }>(key: string, value: T): void {
    this.values.set(key, value.toString());
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}

export const storage =
  typeof window !== 'undefined' && typeof window.localStorage === 'object'
    ? window.localStorage
    : new CustomStorage();
