// 如何实现一个 js 沙箱, 来实现安全的执行用户代码

// 方案: proxy + with

function withedYourCode(code: string): Function {
  // 把用户输入的代码用 with 语句包起来
  // with 语句提供一个执行环境, 用户代码在使用全局变量时, 只能使用环境中的变量
  const _code = "with (context) {" + code + "}";
  // 构造一个函数, 调用函数时就执行用户代码, 注意函数必须提供参数 context 作为执行环境
  const f = new Function("context", _code);
  return f;
}

// 用户代码可全局访问的变量白名单
const accessWhiteList: (string | Symbol)[] = ["Math", "Date", "console"];

// 定义一个执行上下文对象
const context = {
  func: (arg: unknown) => console.log(arg),
  foo: "foo",
};

// 执行上下文的代理对象
const contextProxy = new Proxy(context, {
  // has 可以拦截 with 代码块中任意全局属性的访问
  has(target, prop) {
    if (accessWhiteList.includes(prop)) {
      // 说明在用户代码中使用到的全局变量, 在我们定义的白名单中
      // 在可访问的白名单内, 可继续向上查找
      return Reflect.has(target, prop);
    }

    // 如果执行上下文对象中有用户使用的属性, 返回 true
    // 如果没有, 直接报错
    if (Reflect.has(target, prop)) {
      return true;
    } else {
      throw new Error(
        `Invalid expression - ${String(prop)}! You can not do that!`
      );
    }
  },
});

export function sandbox(code: string) {
  // 将 this 指向手动构造的全局代理对象
  withedYourCode(code).call(contextProxy, contextProxy);
}
