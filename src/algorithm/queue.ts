export class Queue<T> {
  constructor(private array: T[] = []) {}

  enqueue(item: T) {
    this.array.push(item);
  }

  dequeue(): T | null {
    if (this.size() > 0) {
      return this.array.shift() as T;
    } else {
      return null;
    }
  }

  peek(): T | null {
    if (this.size() > 0) {
      return this.array[0];
    } else {
      return null;
    }
  }

  size(): number {
    return this.array.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}
