
### Execution context(activation record)

**EC creation**

  1. Activation object (arguments) 
  2. Scope chain, { Activation object + [[Scope]](all parent scopes) }
  3. Variable instantiation,  { vars, function declarations, arguments }
  4. this

All javascript code is executed in an execution context. Global code (code executed inline, normally as a JS file, or HTML page, loads) gets executed in global execution context, and each invocation of a function (possibly as a constructor) has an associated execution context.

When a javascript function is called it enters an execution context, if another function is called (or the same function recursively) a new execution context is created and execution enters that context for the duration of the function call. Returning to the original execution context when that called function returns. Thus running javascript code forms a stack of execution contexts

Each function call has its own execution context. Whenever code execution flows into a function, the function's context is pushed onto a context stack. After the function has finished executing, the stack is popped, returning control to the previously executing context.

When a function is `defined`, its(function) scope chain is created, preloaded with the parent's scope chain, and saved to the internal [[Scope]] property.

When a function is called, an execution context is created, and its(execution context) scope chain is created.(by copying the objects in the function's [[Scope]] property).After that, an activation object (which also acts as a variable object) is created and pushed to the front of the context’s scope chain


**Variable object**
a object stores variables and function declarations defined in the context
In ES5, the concept of variable object is replaced with lexical environments model

**Activation object**
variable object for functions, also stores formal parameters and arguments object


### Scope Chain

`[[Scope]]`: a hierarchical chain of all parent variable object, which are above the current function context; the chain is saved to the function at its creation.
`[[Scope]]`: property of function

Scope chain: property of execution context
Scope chain: `[Activation Object].concat([[Scope]])`

单向链表
--
Scope chain is related with an execution context, a chain of variable object which is used for variable lookup at identifier resolution

When code is executed in a context, a scope chain of variable objects is created. The purpose of the scope chain is to provide ordered access to all variables and functions that an execution context has access to.

The scope chain is essentially a list of pointers to variable objects and does not physically contain the objects
--
Scope chain is nothing but Copy of `[[Scope]]` from the definition to the invocation
--
It is an implicit, permanent link between a function and it's scope chain...
A function definition's(lamda) hidden [[Scope]] reference.
- Holds the scope chain(preventing garbage collection)
- It is used and copied as the 'outer environment reference' anytime the function is run
--
In ECMAScript functions are objects, they are created during variable instantiation from function declarations, during the evaluation of function expressions or by invoking the Function constructor.

Function objects created with the Function constructor always have a [[scope]] property referring to a scope chain that only contains the global object.

Function objects created with function declarations or function expressions have the scope chain of the execution context in which they are created assigned to their internal [[scope]] property.


### Closure


Closure: a combination of a function code and it's `[[Scope]]` property;

         a combination of a code block (in JavaScript this is a function) and statically/lexically saved all parent scopes, thus, via these saved scopes a function may refer free variables.
         
         a combination of a code block and data of a context in which this code block is created;
         
         the inner function at creation moment saves it's parent's scope chain in it's [[Scope]] property. Then when the function is activated, the scope chain of its context is formed as combination of the activation object and this [[Scope]] property:
         Scope chain = Activation Object + [[Scope]],
         the scope chain will be used for variable lookup then in further calls of the function.
         
Notice: several functions may have the same parent scope.(it's quite a normal situation when e.g. we have two inner/global functions) In this case variables stored in the [[Scope]] property are shared between all functions having the same parent scope chain. Changes of variables made by one closure are reflected on reading these variables in another closure.
(闭包保存的是整个变量对象, 存的是变量的引用)
Example:

```js
function baz() {
  var x = 1;
  return {
    foo: function() {
      return ++x;
    },
    bar: function() {
      return x;
    }
  }
}
var closures = baz();
console.log(
  closures.foo(), // 2
  closures.bar()  // 2
)
```

--

在计算机科学中，闭包（英语：Closure），又称词法闭包（Lexical Closure）或函数闭包（function closures），是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。闭包在运行时可以有多个实例，不同的引用环境和相同的函数组合可以产生不同的实例。

闭包的概念出现于60年代，最早实现闭包的程序语言是Scheme。之后，闭包被广泛使用于函数式编程语言如ML语言和LISP。很多命令式程序语言也开始支持闭包。

在一些语言中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，则可能产生闭包。运行时，一旦外部的 函数被执行，一个闭包就形成了，闭包中包含了内部函数的代码，以及所需外部函数中的变量的引用。其中所引用的变量称作上值(upvalue)。

闭包一词经常和匿名函数混淆。这可能是因为两者经常同时使用，但是它们是不同的概念

### Automatic Garbage Collection

ECMAScript uses automatic garbage collection. The specification does not define the details, leaving that to the implementers to sort out, and some implementations are known to give a very low priority to their garbage collection operations. 

But the general idea is that if an object becomes `un-referable` (by having no remaining references to it left accessible to executing code) it becomes available for garbage collection and will at some future point be destroyed and any resources it is consuming freed and returned to the system for re-use.

This would normally be the case upon exiting an execution context. The scope chain structure, the Activation/Variable object and any objects created within the execution context, including function objects, would no longer be accessible and so would become available for garbage collection.


### this

- this永远指向函数运行时所在的对象, 而不是函数创建时所在的对象
- 匿名函数和不处于任何对象中的函数, this指向window, (非严格模式)
- call, apply, bind, with中的参数
- 函数作为方法调用, 被谁调用, this就指向谁, 一般为.左边的对象
- ES6, arrow function: lexical this , the lexical binding of an arrow-function cannot be overridden(even with new!), they are essentially a syntactic replacement of self = this in pre-ES6 coding 


this的4种绑定, 函数调用的4种方式
1. 作为函数调用, implicit binding, window in non-strict mode, Otherwise undefined
2. 作为方法调用, implicit binding, that object
3. 用call, apply显示调用, explicit binding, the first argument 
4. 用new调用, explicit binding, the instance object
5. 事件绑定

```js
let PageHandler = {
  init: function() {
    document.addEventListener("click", function(event) {
      // 这里的this为document对象, 不是window也不是PageHandler, 可以.bind(this)绑定到PageHandler或者用arrow function
      this.doSomething(event.type);
    }, false);
  },
  doSomething: function() {} 
};

```


Priority: 
- default binding is the lowest priority rule of the four
- explicit binding takes precedence over implicit binding
- new binding is more precedent than implicit binding and explicit binding

Determining this. Ask these questions in this order, and stop when previous rule applies
1. Is the function called with new(new binding)? If so, `this` is the newly constructed object().
   `var bar = new foo()`
2. Is the function called with call or apply(explicit binding), even hidden inside a bind hard binding? If so, `this` is the explicitly specified object.
  `var bar = foo.call(obj)`
3. Is the function called with a context(implicit binding), otherwise known as an owning or containing object? If so, `this` is that context object.
  `var bar = obj.foo()`
4. Otherwise, default the `this`(default binding). If in strict mode, pick undefined, otherwise pick the global object.
  `var bar = foo()`;

- If you pass null or undefined as the this binding parameter to call, apply, or bind, those values are effectively ignored, and instead the default binding rule applies to the invocation.

--

The value of this in a function context is provided by the caller and determined by the current form of a call expression (how the function call is written syntactically).

If on the left hand side from the call parentheses ( ... ), there is a value of Reference type then this value is set to the base object of this value of Reference type.

In all other cases (i.e. with any other value type which is distinct from the Reference type), this value is always set to null. But since there is no any sense in null for this value, it is implicitly converted to global object.

> Note, in the strict mode of ES5 this value is not coerced to global object, but instead is set to undefined.

--

Each function automatically gets two special variables as soon as the function is called: `this` and `arguments`. An inner function can never access these variables directly from outer function.

--

A this value is a special object which is related with the execution context. Therefore, it may be named as context object(i.e. an object in which context the execution context is activated)

Any object can be used as this value of the context. One important note is that the this value is *a property of the execution context, but not property of the variable object*.

In contrast with variables, this value never participates in identifier resolution process. I.e. when accessing this in a code, its value is taken directly from the execution context and without any scope chain lookup. The value of this is determined only once, on entering the context and is immutable while the code is running in the context.

this is not statically bound to a function.
this is not a variable

> Note: in ES6 this actually became a property of a lexical environment(variable object in ES3 terminology). This is done to support arrow functions, which has lexical this, which they inherit from parent context  
  
--

  
