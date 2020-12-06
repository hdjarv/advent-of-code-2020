export class FrequencyTable<T> {
  private table: Map<T, number> = new Map<T, number>();

  constructor(value?: T | T[]) {
    if (value) {
      this.add(value);
    }
  }

  add(value: T | T[]) {
    value = Array.isArray(value) ? value : [value];
    for (let val of value) {
      const count = this.table.has(val) ? this.table.get(val)! : 0;
      this.table.set(val, count + 1);
    }
  }

  entries() {
    return this.table.entries();
  }

  get(value: T) {
    return this.table.get(value);
  }

  keys() {
    return this.table.keys();
  }

  values() {
    return this.table.values();
  }
}
