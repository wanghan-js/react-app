import { evalRPN } from './evalRPN'
import { Stack } from './stack'

/**
 * 224. 基本计算器
困难
860
相关企业
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。

 

示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
 

提示：

1 <= s.length <= 3 * 105
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式
'+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
'-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
输入中不存在两个连续的操作符
每个数字和运行的计算将适合于一个有符号的 32位 整数
 */
export function calculate(s: string): number {
  // 先将中缀表达式转换成后缀表达式 (也就是逆波兰表达式)
  const rpn = convertToRPN(s)
  // 然后计算逆波兰表达式的值
  return evalRPN(rpn)
}

function convertToRPN(s: string): string[] {
  // 首先对表达式进行修整, normalize it
  let exp = s
  // 针对一元 - 处理, 把它变成二元 -, 前面补 0 即可,避免出现操作符和操作数不匹配的情况
  if (exp.startsWith('-')) {
    exp = '0' + exp
  }
  exp = exp.replace(/\s+/g, '').replace(/\(-/g, '(0-')

  const rpn: string[] = []
  const stack = new Stack<string>()
  let tempOperand = ''
  for (const token of exp) {
    if (tempOperand) {
      if (/\d/.test(token)) {
        // 说明属于前面的操作数
        tempOperand += token
        continue
      } else {
        // 说明到了操作数的边界, 操作数入 rpn 栈
        rpn.push(tempOperand)
        tempOperand = ''
      }
    }

    if (/\d/.test(token)) {
      tempOperand += token
    } else {
      if (stack.isEmpty() || token === '(') {
        // 如果是空栈或左括号, 操作符直接入栈
        stack.push(token)
      } else if (token === ')') {
        // 如果是右括号, 不断弹栈, 找到左括号停止, 弹出的操作符全部输出
        let op: string
        while ((op = stack.pop() as string) !== '(') {
          rpn.push(op)
        }
      } else {
        // 其他运算符需要比较优先级
        while (getOrder(stack.peek() as string) >= getOrder(token) && !stack.isEmpty()) {
          // 只要栈中的操作符优先级大于等于新操作符的优先级, 则一直弹栈并输出
          rpn.push(stack.pop() as string)
        }
        stack.push(token)
      }
    }
  }

  // 如果最后还剩一个数字, 记得要入栈 rpn
  if (tempOperand) {
    rpn.push(tempOperand)
  }

  while (!stack.isEmpty()) {
    rpn.push(stack.pop() as string)
  }

  console.log(rpn.join(' '))

  return rpn
}

// 获取运算符的优先级, 用数字表示, 数字大表示优先级高
function getOrder(operator: string): number {
  switch (operator) {
    case '+':
    case '-':
      return 1
    case '*':
    case '/':
      return 2
    default:
      return 0
  }
}

// 聪明的做法, 不使用逆波兰表达式, 而是使用双栈
export function calculate2(s: string): number {
  // 首先对表达式进行修整, normalize it
  let expression = s
  // 针对一元 - 处理, 把它变成二元 -, 前面补 0 即可,避免出现操作符和操作数不匹配的情况
  if (expression.startsWith('-')) {
    expression = '0' + expression
  }
  expression = expression.replace(/\s+/g, '').replace(/\(-/g, '(0-')

  // 操作数一个栈
  const operandStack = new SimpleStack<string>()
  // 操作符一个栈
  const operatorStack = new SimpleStack<string>()
  // 用来缓存临时的操作数
  let tempOperand = ''

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i]
    if (token === '(') {
      // 左括号直接入栈, 等待与之匹配的右括号
      operatorStack.push(token)
    } else if (token === ')') {
      // 如果是右括号, 直接计算, 直到遇到 ( 为止, 计算结果放在 operandStack
      while (operatorStack.peek() !== '(') {
        calc(operandStack, operatorStack)
      }
      // 把 ( pop 出去
      operatorStack.pop()
    } else if (/\d/.test(token)) {
      // 数字, 需要将后面连续的数字一起 parse 后入栈
      if (tempOperand) {
        // 说明是之前操作数的一部分
        tempOperand += token
      } else {
        // 说明是一个新的操作数
        tempOperand = token
      }
      // 判断是否可以将操作数入栈, 看下一个 token 是否是数字
      const nextToken = expression[i + 1]
      if (!/\d/.test(nextToken)) {
        // 下个字符不是数字, 则操作数入栈, 临时操作数清空
        operandStack.push(tempOperand)
        tempOperand = ''
      }
    } else {
      // + - * / % ^ 操作符
      // 需要判断操作符优先级, 如果「栈内运算符」优先级 >= 「当前运算符」优先级, 则需要把栈内可以算的都算掉
      // 直到遇到左括号, 或者没有操作符了, 或者操作符优先级条件不满足了; 否则直接入栈 operatorStack
      while (
        !operatorStack.isEmpty() &&
        operatorStack.peek() !== '(' &&
        getOrder(operatorStack.peek()) >= getOrder(token)
      ) {
        calc(operandStack, operatorStack)
      }
      operatorStack.push(token)
    }
  }

  while (!operatorStack.isEmpty()) {
    calc(operandStack, operatorStack)
  }

  if (operandStack.isEmpty()) {
    throw new Error('Invalid expression!')
  } else {
    return Number(operandStack.pop())
  }
}

function calc(operandStack: SimpleStack<string>, operatorStack: SimpleStack<string>): void {
  // 基本思路, 取出一个操作符, 再取出两个操作数, 算出的结果放到操作数栈中
  const operator = operatorStack.pop()
  const rightOperand = Number(operandStack.pop())
  const leftOperand = Number(operandStack.pop())
  let result = 0
  switch (operator) {
    case '+':
      result = leftOperand + rightOperand
      break
    case '-':
      result = leftOperand - rightOperand
      break
    case '*':
      result = leftOperand * rightOperand
      break
    case '/':
      result = parseInt(String(leftOperand / rightOperand))
      break

    default:
      break
  }
  operandStack.push(String(result))
}

class SimpleStack<T> {
  private box: T[] = []

  push(item: T): void {
    this.box.push(item)
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!')
    }

    return this.box.pop() as T
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!')
    }

    return this.box[this.size() - 1]
  }

  size(): number {
    return this.box.length
  }

  isEmpty(): boolean {
    return this.size() === 0
  }
}
