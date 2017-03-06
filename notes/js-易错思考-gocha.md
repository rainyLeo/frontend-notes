typeof 是特殊的运算符, 它并不访问变量的值, 而是取值的类型信息.
```js
typeof(b) ; // undefined
console.log(b); // ReferenceError, ...not defined
```

void 避免表达式返回值, 使表达式总是返回 undefined


```js
b + 'a'; // ReferenceError

var b;
b + 'a'; // 'undefineda'
b + 3; // NaN
b + []; // undefined

```

- []+{}, {}+[]
先说 [] + {} 。一个数组加一个对象。加法会进行隐式类型转换，规则是调用其 valueOf() 或 toString() 以取得一个非对象的值（primitive value）。如果两个值中的任何一个是字符串，则进行字符串串接，否则进行数字加法。[] 和 {} 的 valueOf() 都返回对象自身，所以都会调用 toString()，最后的结果是字符串串接。[].toString() 返回空字符串，({}).toString() 返回“[object Object]”。最后的结果就是“[object Object]”。然后说 {} + [] 。看上去应该和上面一样。但是 {} 除了表示一个对象之外，也可以表示一个空的 block。在 [] + {} 中，[] 被解析为数组，因此后续的 + 被解析为加法运算符，而 {} 就解析为对象。但在 {} + [] 中，{} 被解析为空的 block，随后的 + 被解析为正号运算符。即实际上成了：{ // empty block }+[]即对一个空数组执行正号运算，实际上就是把数组转型为数字。首先调用 [].valueOf() 。返回数组自身，不是primitive value，因此继续调用 [].toString() ，返回空字符串。空字符串转型为数字，返回0，即最后的结果。

- delete
不能删除用 var 声明的变量, 以及直接继承自原型的成员


- 变量作用域和生存周期
在 JavaScript 中, 语法解释与执行分成两个阶段, 而变量声明是在语法解释阶段处理的.

变量的生存周期指它何时被创建和被释放. 在 JavaScript 中, 一个变量的创建是在:
* 引擎做语法分析, 发现显示声明时
* 引擎做代码执行, 发现试图写(例如赋值)一个未被创建的变量时
释放是在:
* 引擎执行到函数结束/退出操作时, 将清除函数内的未被引用的变量
* 引擎执行到全局的代码块终结时, 将清除全局的变量和数据的引用

```js
function foo() {
  if (!bar) {
    console.log('haha');
  }
  var bar = false; // 有 var有输出, 没有 var ReferenceError
}

foo();
```

bar 变量在函数还未执行到已经被引擎创建好了, 因此它的变量生存周期早于它在代码中被声明的位置; 如果将'var'去掉, 则它的生存周期便是从那一会开始


- 面向对象
在 JavaScript 中, 类表现为构造函数

* 继承
基于原型继承
* 封装
依赖变量作用域(只能实现 public, private)
public: 访问不熟限制, 在类的外部可见
private: 仅该类可见
protected: 该类及其派生类可见
* 多态








