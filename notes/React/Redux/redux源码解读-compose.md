compose这个函数是一个工具函数, 在函数式编程中很常见, 它把一个函数函数的结果传进另一个函数中, compose(f, g, h)(x) 返回 f(g(h(x)))

下面先看一个简化版本的compose以便理解, 这里只有2个函数  

```js 
function compose(f, g) {
  return function() {
    return f.call(this, g.apply(this, arguments));
  };
  /* 如果只接收一个参数, 也可以这样写
  return function(x) {
    return f(g(x));
  };
  */
}  
const square = x => x * x;
const sum = (x, y) => x + y;
const res = compose(square, sum);
res(2, 3); // 25
```    

下面是redux中的compose  

```js
function compose(...funcs) {
  // 没有传入函数时直接返回参数
  if (funcs.length === 0) {
    return arg => arg;
  }
  // 只有一个函数时直接返回该函数
  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];
  // slice(0, -1)得到数组中除了最后一个的剩下的部分
  const rest = funcs.slice(0, -1);
  // reduceRight从数组的最右边开始, 从右往左依次把上一个函数执行的结果传入下一个, 最后返回最左边函数的结果
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args));
}
```