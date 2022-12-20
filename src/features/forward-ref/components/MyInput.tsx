import { forwardRef, useImperativeHandle, useRef } from 'react'

export type MyInputRefValue = {
  focus: () => void
}

export const MyInput = forwardRef<MyInputRefValue>((props, ref) => {
  const realInputRef = useRef<HTMLInputElement>(null)
  // 相当于把父组件传进来的 ref 包了一层, 从而限制了外层 ref 的操作范围, 只能调用白名单中的函数
  // 另外注意这里父组件传进来的 ref 最终得到的值只是它期望的 HTMLInputElement 的一个子集
  // 所以 forwardRef 函数的泛型参数需要用 Partial 类型工具包裹一下
  // 或者更加直接的指定 useImperativeHandle 中返回的对象类型
  useImperativeHandle(ref, (): MyInputRefValue => {
    // Only expose focus and nothing else
    return {
      focus() {
        if (!realInputRef.current) {
          throw new Error('Input does not exist!')
        }
        realInputRef.current.focus()
      },
    }
  })
  return <input type='text' {...props} ref={realInputRef} />
})
// 这里加 displayName 的作用是: 在 react 的 devtools 工具的 Components 面板中能正确显示 MyInput 这个组件的名字
// 类似 Vue 组件中的 name 属性
// 如果不加的话, eslint 会报错
MyInput.displayName = 'MyInput'
