export class Stack<T> {
  private count = 0;
  private items: Record<number, T> = {};

  constructor(items: T[] = []) {
    this.pushMany(items);
  }

  push(item: T): void {
    this.pushOne(item);
  }

  pushMany(items: T[]): void {
    for (const item of items) {
      this.pushOne(item);
    }
  }

  pop(): T | null {
    return this.popOne();
  }

  popMany(count: number): T[] {
    const n = this.constrainedCount(count);
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(this.pop() as T);
    }
    return result;
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.size() - 1];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.popMany(this.size());
  }

  size(): number {
    return this.count;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    let s = "";
    for (let i = 0; i < this.size(); i++) {
      s += this.items[i] + ", ";
    }
    s = s.slice(0, -2);
    return s;
  }

  private constrainedCount(count: number): number {
    let n: number;
    if (count > this.size()) {
      n = this.size();
    } else if (count < 0) {
      n = 0;
    } else {
      n = count;
    }
    return n;
  }

  private pushOne(item: T): void {
    this.items[this.size()] = item;
    this.incrementSize();
  }

  private popOne(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    this.decrementSize();
    const item = this.items[this.size()];
    delete this.items[this.size()];
    return item;
  }

  private incrementSize(): void {
    this.count += 1;
  }

  private decrementSize(): void {
    this.count -= 1;
  }
}
