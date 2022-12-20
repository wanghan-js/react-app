export class MyArray<T> {
  // 数组总长度, 创建后固定
  private readonly _length: number = 0;
  // 数组实际有值的个数
  private _size: number = 0;
  // 数组存数据的容器, 用对象模拟
  private _data: Record<number, T> = {};

  constructor(length: number = 0) {
    this._length = length;
  }

  get(index: number): T {
    if (index < this.length()) {
      if (index < this.size()) {
        return this._data[index];
      } else {
        throw new Error("指定索引下的数组元素还未初始化");
      }
    } else {
      throw new Error("数组越界");
    }
  }

  set(index: number, value: T) {
    if (index < this.length()) {
      if (index <= this.size()) {
        this._data[index] = value;
        if (index === this.size()) {
          this.incrementSize();
        }
      } else {
        throw new Error("不允许稀疏数组");
      }
    } else {
      throw new Error("数组越界");
    }
  }

  push(item: T): number {
    if (this.size() >= this.length()) {
      throw new Error("数组没有空闲空间了, 需要重新分配数组空间");
    }
    this._data[this.size()] = item;
    this.incrementSize();
    return this.size();
  }

  pop(): T {
    if (this.size() === 0) {
      throw new Error("数组为空");
    }
    const item = this._data[this.lastIndex()];
    this.decrementSize();
    return item;
  }

  shift(): T {
    if (this.size() === 0) {
      throw new Error("数组为空");
    }
    const item = this._data[0];
    this.decrementSize();
    for (const index in this._data) {
      const i = Number(index);
      if (i < this.size()) {
        this._data[i] = this._data[i + 1];
      }
    }
    return item;
  }

  unshift(item: T): number {
    if (this.size() >= this.length()) {
      throw new Error("数组没有空闲空间了, 需要重新分配数组空间");
    }
    for (const index in this._data) {
      const i = Number(index);
      this._data[i + 1] = this._data[i];
    }
    this._data[0] = item;
    this.incrementSize();
    return this.size();
  }

  size(): number {
    return this._size;
  }

  length(): number {
    return this._length;
  }

  private lastIndex(): number {
    return this.size() - 1;
  }

  private incrementSize(): void {
    this._size++;
  }

  private decrementSize(): void {
    this._size--;
  }
}
