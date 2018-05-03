
next() 调用次数比 yield 多一个
next() 也会取return 的值
第一个 next() 不要传参数, 后面next()的参数会传进之前的 yield 表达式里
```js
// 1.
function *foo(x) {
    var y = x * (yield 'hello');
    return y;
}

var it = foo(2);
var a = it.next();
var b = it.next(4) // 4 -> yield 'hello'

// 2.
var z = 1;
function *foo() {
    var x = yield 2;
    console.log('x', x);
    z++;
    var y = yield (x * z);
    console.log('x, y, z', x, y, z);
}
var it1 = foo(); 
var it2 = foo();
var val1 = it1.next().value;
var val2 = it2.next().value;

val1 = it1.next(10).value; // 20,z=2, 10 -> yield2 -> x
val2 = it2.next(8).value; //  24,z=3, 8 -> yield 2 -> x
```

## generator api
- next()
- return()
- throw()
a generator’s iterator is also an iterable

## Generator + Promise
yield a Promise, and use Promise to control the generator’s iterator

## Generators can play three roles:

1. Iterators (data producers): Each yield can return a value via next(), which means that generators can produce sequences of values via loops and recursion. Due to generator objects implementing the interface Iterable [3], these sequences can be processed by any ECMAScript 6 construct that supports iterables. Two examples are: for-of loops and the spread operator (...).

2. Observers (data consumers): yield can also receive a value from next() (via a parameter). That means that generators become data consumers that pause until a new value is pushed into them via next().

3. Coroutines (data producers and consumers): Given that generators are pausable and can be both data producers and data consumers, not much work is needed to turn them into coroutines (cooperatively multitasked tasks).

## generator delegation
```js
function* foo() {

}
function* bar() {
    yield *foo() // *bar() delegated its iteration control to *foo()
}
```