// 用栈来模拟队列

import { Stack } from "@/leet-code/stack";

export class Stack2queue<T> {
  private pushStack = new Stack<T>();
  private popStack = new Stack<T>();

  constructor() {}

  enqueue(item: T) {
    this.pushStack.push(item);
  }

  dequeue(): T | null {
    this.handlePopStack();
    // 然后返回栈顶元素
    return this.popStack.pop();
  }

  peek(): T | null {
    this.handlePopStack();
    return this.popStack.peek();
  }

  size(): number {
    return this.pushStack.size() + this.popStack.size();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  // 移形换影
  private handlePopStack() {
    if (this.popStack.isEmpty()) {
      // popStack 为空, 则把 pushStack 里所有的元素放进去
      while (!this.pushStack.isEmpty()) {
        this.popStack.push(this.pushStack.pop() as T);
      }
    }
  }
}
