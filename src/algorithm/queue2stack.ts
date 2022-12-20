// 用队列来模拟栈

import { Queue } from "@/leet-code/queue";
import { Stack2queue } from "@/leet-code/stack2queue";

export class Queue2stack<T> {
  private q1 = new Stack2queue<T>();
  private q2 = new Stack2queue<T>();

  constructor() {}

  push(item: T) {
    if (this.q1.isEmpty()) {
      // 说明数据都在 q2 中
      this.q2.enqueue(item);
    } else {
      this.q1.enqueue(item);
    }
  }

  pop(): T | null {
    if (this.q1.isEmpty()) {
      // 说明数据都在 q2 中
      while (this.q2.size() > 1) {
        this.q1.enqueue(this.q2.dequeue() as T);
      }
      // 到这里 q2 的 size 为 1, 也就是最后加入的数据, 需要返回
      return this.q2.dequeue();
    } else {
      while (this.q1.size() > 1) {
        this.q2.enqueue(this.q1.dequeue() as T);
      }
      // 到这里 q2 的 size 为 1, 也就是最后加入的数据, 需要返回
      return this.q1.dequeue();
    }
  }

  peek(): T | null {
    if (this.q1.isEmpty()) {
      // 说明数据都在 q2 中
      while (this.q2.size() > 1) {
        this.q1.enqueue(this.q2.dequeue() as T);
      }
      // 到这里 q2 的 size 为 1, 也就是最后加入的数据, 需要返回
      const item = this.q2.peek();
      this.q1.enqueue(this.q2.dequeue() as T);
      return item;
    } else {
      while (this.q1.size() > 1) {
        this.q2.enqueue(this.q1.dequeue() as T);
      }
      // 到这里 q2 的 size 为 1, 也就是最后加入的数据, 需要返回
      const item = this.q1.peek();
      this.q2.enqueue(this.q1.dequeue() as T);
      return item;
    }
  }

  size(): number {
    return this.q1.size() + this.q2.size();
  }
}
