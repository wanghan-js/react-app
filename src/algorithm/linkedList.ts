export class LinkedList<T> {
  constructor(private value: T, private next: LinkedList<T> | null) {}

  hasNext(): boolean {
    return this.next !== null;
  }

  size(): number {
    let count = 1;
    let next = this.next;
    while (next !== null) {
      count += 1;
      next = next.next;
    }
    return count;
  }
}
