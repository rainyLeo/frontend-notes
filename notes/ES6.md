## Block Scope

- let, not hoisting

  ```javascript
  { let a = 2, b, c; // ..
  }
  ```

- let declarations should all be at the top of their scope. That totally avoids the accidental errors of accessing too early.
- TDZ

- const
- Constants are not a restriction on the value itself, but on the variable's assignment of that value. In other words, the value is not frozen or immutable because of const, just the assignment of it. If the value is complex, such as an object or array, the contents of the value can still be modified:

 ```js
 {
    const a = [1, 2, 3];
    a.push(4);
    console.log(a); // [1, 2, 3, 4]
    a = 42; // TypeError!
 }

```
- Assigning an object or array as a constant means that value will not be able to be garbage collec‐ ted until that constant’s lexical scope goes away, as the reference to the value can never be unset.

- Block-scope functions

```js
{
    foo(); // works!
    function foo() {
        // ..
    }
}
foo(); // ReferenceError
```

## Spread/Rest

- Spread
    * a suitable replacement for the apply() method in most circumstances.

```js
// spread
-
var a = [2, 3, 4];
var b = [1, ...a, 5];
console.log( b ); // [1,2,3,4,5]

// rest
function foo(x, y, ...z) {
    console.log( x, y, z );
}
foo( 1, 2, 3, 4, 5 ); // 1 2 [3,4,5]
```

## Functions

- Default Parameter
    * (不传或 传undefined 会用, null 不会用)
    * 参数不会和arguments对象同步(与ES5 strict mode中类似)

- Rest Parameter
    * there can be only one rest parameter, and the rest parameter must be last
    * rest parameters cannot be used in an object literal setter

- `name` property

- `new.target`

```js
function Person(name) {
//   if (typeof new.target !== "undefined") {
    this.name = name;
  } else {
    throw new Error("You must use new with Person.")
  }
}

```

## Destructoring

- Be careful: you shouldn't mix in declaration with assignment unless you want all of the assign‐ ment expressions also to be treated as declara‐ tions. Otherwise, you'll get syntax errors.
- Remember: the purpose of destructuring is not just less typing, but more declarative readability.

```js
/* Object Destructoring */
var {x: bam, y: baz, z: bap} = {x: 4, y: 5, z: 6};
console.log(bam, baz, bap); // 4 5 6

var person = {
  name: 'leo',
  age: 25
}
var { name, age } = person;
console.log(name, age); // 'leo' 25
var person2 = {
  name: 'rainy',
  age: 20
}
({ name, age } = person2);


/* Array Destructoring */
var a1 = [1, 2, 3], a2 = [];
[a2[2], a2[0], a2[1]] = a1;
console.log(a2); // [2,3,1]

// default value assignment
var [a, b, c = 1] = [3, 4]

// nested destructuring
var a1 = [1, [2, 3, 4], 5];
var [a, [b, c, d], e] = a1

var [a, b] = [b, a];
// rest items
var colors = [ "red", "green", "blue" ];
var [ firstColor, ...restColors ] = colors;

var colors = [ "red", "green", "blue" ];
var [ ...clonedColors ] = colors;
var clonedColors2 = [...colors];



/* Function Destructuring Parameters */
function foo({x,y}) {
    console.log( x, y );
}
foo({ y: 1, x: 2}); // 2 1
foo({ y: 42 }); // undefined 42
foo({}); // undefined undefined

// destructuring defaults vs parameter defaults
function f6({x = 10} = {}, {y} = {y: 10}) {
    console.log(x, y);
}
f6();
f6( undefined, undefined );
f6( {}, undefined );
f6( {}, {} );
f6( undefined, {} );
f6({x:2},{y:3});

// 10 10
// 10 10
// 10 10
// 10 undefined
// 10 undefined
// 2 3
```

## Object literal

- Concise Properties

```js
var x = 2, y = 3,
  o = {
        x,
        y
    }
```

- Concise Methods :
  - Note: anomynous function, cannot reference itself
  - Only use them if you're never going to need them to do recursion or event binding

```js
var o = {
    x() {
        // ..
    },
    y() {
        // ..
    }
}
```

- Computed Property Names

  ```js
  var prefix = "user_";
  var o = {
    baz: function(..){ .. },
    [ prefix + "foo" ]: function(..){ .. },
    [ prefix + "bar" ]: function(..){ .. }
  };
  ```

- Object `super`

 `super` is only allowed in concise methods

```js
var o1 = {
    foo() {
    console.log( "o1:foo" );
  }
};

var o2 = {
  foo() {
      super.foo();
      // 相当于 Object.getPrototypeOf(this).foo.call(this)
      console.log( "o2:foo" );
  }
};
Object.setPrototypeOf( o2, o1 );
o2.foo();
     // o1:foo
     // o2:foo
```

- Own property enumeration order
    1. All numeric keys in ascending order
    2. All string keys in the order in which they were added to the object
    3. All symbol keys in the order in which they were added to the object

```js
var obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1,
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join(""));
// "012acbd"

for (var p in obj) {
  console.log(p);
}
// "012acbd"

```


## Template / String literal

```js
var name = 'leo';
var greeting = `hello ${name}`;

var text =
`Now is the time for all good men
to come to the aid of their
country!`;

function upper(s) {
  return s.toUpperCase();
}
var who = "reader";
var text = `A very ${upper( "warm" )} welcome`;

// tagged template literals
```

## Arrow Functions

- lexical `this`, `arguments`,  `super` and `new.target`, 'Inherits' from closest containing non-arrow function
- Cannot `new` it
- No prototype
- No `arguments` object
- Arrow functions are always function expressions, there is no arrow function declaration; anonymous function expression

- what happens if you use `=>` with a this-aware function that doesn't need `var self = this` to work
- Implicit return for expression bodies
- The longer the function, the less `=>` helps; the shorter the function, the more => can shine.
- I think it's probably more sensible and reasonable to adopt `=>` for the places in code where you do need short inline function expressions, but leave your normal-length main functions as is


```js
var a = [1,2,3,4,5];
a = a.map(v => v * 2);


// Wrapping the object literal in parentheses signals that the curly braces are an object literal instead of the function body.
let getTempItem = id => ({ id: id, name: "Temp" });

// Lexical this in the arrow function callback in thesnippet now points to the same value as in the enclosing makeRequest(..) function.
// In other words, => is a syntactic stand-in for var self = this.
var controller = {
    makeRequest: function(..){
        btn.addEventListener("click", () => {
            // ..
            this.makeRequest(..);
        }, false );
    }
};

// what happens if you use => with a this-aware function that doesn’t need var self = this to work
var controller = {
	makeRequest: (..) => {
		// ..
		this.helper(..);
	},
	helper: (..) => {
		// ..
	}
};
controller.makeRequest(..);

var a = 2;
var o = {
  a: 1,
  fun: () => {
    console.log(this.a);
  }
}
o.fun(); // 2

// Although we invoke as controller.makeRequest(..), the this.helper reference fails, because this here doesn’t point to con troller as it normally would.
// Where does it point? It lexically inherits this from the surrounding scope. In this previous snippet, that’s the global scope, where this points to the global object. Ugh.
```

- If you have a short, single-statement inline function expression, where the only statement is a return of some computed value, and that function doesn't already make a this reference inside it, and there's no self-reference(recursion, event binding/unbinding), and you don't reasonably expect the function to ever be that way, you can probably safely refactor it to be an => arrow function
- If you have an inner function expression that's relying on a var self = this hack or a .bind(this) call on it in the enclosing function to ensure proper this binding, that inner function expression can probably safely become an => arrow function
- If you have an inner function expression that's relying on something like var args = Array.prototype.slice.call(arguments) in the enclosing function to make a lexical copy of arguments, that inner function expression can probably safely become an => arrow function
- For everything else - normal function declarations, longer multistatement function expressions, functions that need a lexical name identifier self-reference(recursion, etc.), and any other function that does't fit the previous characteristics - you should probably avoid => function syntax


## Regular Expressions

- Unicode Flag
- Sticky Flag
- Regular expression flags


## Iterators

- Iterators are meant to eliminate the complexity and error-prone nature of loops

- Iterators are objects with a specific interface designed for iteration.
- All iterator objects have a `next()` method that returns a result object. The result object has two properties: `value`, which is the next value, and `done`, which is a Boolean that’s true when there are no more values to return.

- The iterator keeps an internal pointer to a location within a collection of values, and with each call to the `next()` method, it returns the next appropriate value


- An iterator is a structured pattern for pulling information from a source in one-at-a-time fashion.
- Iterators are a way of organizing ordered, sequential, pull-based consumption of data.


```js
// You can use Symbol.iterator to access the default iterator for an object, same thing when use for...of
var arr = [1, 2, 3]; // or 'abcde'
var it = arr[Symbol.iterator]();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: undefined, done: true}

function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}
```

- ECMAScript 6 has three types of collection objects: arrays, maps, and sets. All three have the following built-in iterators to help you navigate their content: `entries()`, `values()`, `keys()`


## Generators

- A generator is a function that returns an iterator.
- Generator functions are indicated by an asterisk character `*` after the function keyword and use the new `yield` keyword.
- Perhaps the most interesting aspect of generator functions is that they stop execution after each yield statement

Generator Uses
- Producing a series of values
- Queue of tasks to perform serially


## Iterables and for-of Loops

- Closely related to iterators, an iterable is an object with a `Symbol.iterator` property.
- The well-known `Symbol.iterator` symbol specifies a function that returns an iterator for the given object
- All collection objects `(arrays, sets, maps) and strings, NodeList` are iterables in ECMAScript 6, so they have a default iterator specified.
- Iterables are designed to be used with a new addition to ECMAScript: the `for-of` loop.
- All iterators created by generators are also iterables, because generators assign the Symbol.iterator property by default.
- the `spread operator` works equally well on any iterable.

```js
var str = 'abcd';
var arr = [...str];
arr; ['a', 'b', 'c', 'd'];
```

**for .. of**

loops over the set of values produced by an iterator.
Standad built-in values in JavaScript that are by default iterables(or provide them) include:
 * Array
 * String
 * Generator
 * Set Map,  TypedArray
 * NodeList

- This for-of loop first calls the `Symbol.iterator` method on the values array to retrieve an iterator. Then `iterator.next()` is called, and the value property on the iterator’s result object is read into variable
- Plain objects are not by default suitable for `for..of` looping. That’s because they don’t have a default iterator, which is intentional, not a mistake.
- you can also use the `Symbol.iterator` property to create your own iterables.


## Modules

- both `import` and `export` must always appear in the top-level scope of their respective usage
- when you `export` something, you’re exporting a binding (kinda like a pointer) to that thing (variable, etc.).
- All imported bindings are immutable and/or read-only.


```js
/*** export ***/
// 1. named export
export function foo() {
	// ..
}
export var awesome = 40;
var bar = [1, 2, 3];
export { bar };

// 另一种写法
function foo() {
	// ..
}
var asesome = 40;
var bar = [1, 2, 3];
export { foo, awesome, bar };

// 2. export default
function foo() {
	// ..
}
export default foo;

export default function foo() {
}


/*** import ***/

import { foo, bar } from "foo";

// If the module has just a default export
import foo from "foo"

// rename
import {foo as newFoo} from "foo"

// import entire API to a single module namespace binding
export function bar() {}
export var x = 42;
export function baz() {}

import * as foo from "foo";
foo.bar();
foo.x;

```

import 路径, 相对路径是相对当前目录。绝对路径是相对入口文件, 如果不使用相对路径或者绝对路径，node默认会去 node_modules/文件夹下去找.


export 有 2 种, named export , default export

var, let or const 不能 紧跟着 export default
export default 每个模块只能有一个

```js
// named export
export { myFunction };
export const foo = Math.sqrt(2);

// default export
export default function() {}
```

例题:
```js
// 例子 1
let data = {}
export default data

import data from './data.js'

// 例子 2
export let data = {}
// 等于下面
// let data = {}
// export { data }

import { data } from './data.js'

```

## Class

- 新关键字, `class, constructor, extends, super, static`

**class**

- Class methods use the same “concise method” syntax available to object literal.
- All methods are nonenumerable.
- Class declarations are `not hoisted`
- Class does `not create` a global object property of that name.
- Calling the class constructor without `new` throws an error, as the pre-ES6 option of Foo.call( obj ) will not work.
- All code inside class declarations runs in `strict mode` automatically.
- A class can also be an expression, as in: `var x = class Y { .. }`


**super**

- `super` is not limited to class declarations. It also works in object literals,
- `super` is not dynamic like `this` is. When a constructor or method makes a super reference inside it at declaration time (in the class body), that super is statically bound to that specific class hierarchy, and cannot be overridden
- the default subclass constructor `automatically` calls the parent constructor(with super), and passes along any arguments.
- You can only use `super()` in a derived class constructor. If you try to use it in a nonderived class (a class that doesn’t use `extends`) or a function, it will throw an error.
- You must call `super()` before accessing `this` in the constructor. Because `super()` is responsible for *initializing `this`*,  attempting to access this before calling super() results in an error.
- The only way to avoid calling `super()` is to return an object from the class constructor.

**static**

- `Static` members are not accessible from instances. You must always access static members from the class directly.
- If a base class has `static` members, those static members are also available on the derived class.
- ES6只支持静态方法, 没有静态属性, 但可以通过 static get 达到

- `new.target` always points at the constructor that new actually directly invoked, even if the constructor is in a parent class and was delegated to by a super(..) call from a child constructor.

**inheritance**

- In ECMAScript 5 classical inheritance, the value of `this` is first created by the derived type and then the base type constructor is called. That means `this` starts out as an instance of derived class and then is decorated with additional properties from base class.
- in ECMAScript 6 class-based inheritance, the value of `this` is first created by the base and then modified by the derived class constructor. The result is that `this` starts with all the built-in func- tionality of the base and correctly receives all functionality related to it.


```js
class Foo {
	constructor(a, b) {
		this.x = a;
		this.y = b;
	}
  // class 中的方法相当于定义在 prototype 上
  // equivalent of Foo.prototype.gimmeXY
	gimmeXY() {
		return this.x * this.y;
	}
  // equivalent of Foo.create
  static create(name) {
      return new Foo(name);
  }
}

// equivalent of Bar.prototype = new Foo() or Bar.prototype = Object.create(Foo.prototype)
class Bar extends Foo {  // Bar.prototype.__proto__ === Foo.prototype;
	constructor(a, b, c) {
    // equivalent of Foo.call(this, a, b)
		super(a, b); // 放第一行
		this.z = c;
	}
	gimmeXYZ() {
		return super.gimmeXY() * this.z; // Foo.prototype.gimmeXY()
	}
}

var b = new Bar(5, 15, 25);

//If you choose not to use a constructor, super() is automatically called for you with all arguments upon creating a new instance of the class.
class Square extends Rectangle {
    // no constructor
}
// is equivalent to
class Square extends Rectangle {
    constructor(...args) {
        super(...args);
    }
}

// extending natives
class MyArray extends Array {
	first() {
		return this[0];
	}
	last() {
		return this[this.length - 1];
	}
}
a; // [1, 2, 3];
a.first(); // 1

```

## Collections

**Map**

- allow object as keys, while object properties always coerce values into strings
- cannot use `[]` bracket access syntax for setting and retrieving values
- To get the list of values from a map, use `values()`, which returns an iterator.
- iterate over a map’s entries using `entries()`

- If you use an object as a map key and that object is later discarded (all references unset) in attempt to have garbage collection (GC) reclaim its memory, the map itself will still retain its entry.


```js
var m = new Map();
var x = {id: 1};
var y = {id: 2};
m.set(x, "foo");
m.set(y, "bar");

m.get(x); // "foo"
m.get(y); // "bar"
var keys = [...m.keys()];
keys[0] === x;
keys[1] === y;
m.has(x); // true
m.delete(y);
m.clear();
m.size(); // 0

var x = {id: 1};
var y = {id: 2};
var m = new Map([
	[x, "foo"],
	[y, "bar"]
]);
m.get(x); // "foo"
m.get(y); // "bar"
[...m.values()]; // ["foo", "bar"]
var vals = [...m.entries];
vals[0][0] === x;
vals[0][1]; // "foo"

```

**WeakMap**

- WeakMaps take (only) objects as keys. Those objects are held weakly, which means if the object itself is GC’d, the entry in the WeakMap is also removed.
- WeakMaps do not have a `size` property or `clear()` method, nor do they expose any iterators over their keys, values, or entries
- Just like Maps, WeakMaps let you soft-associate information with an object. But they are particularly useful if the object is not one you completely control, such as a DOM element
- WeakMap only holds its keys weakly, not its values
- weak sets and weak maps do not have built-in iterators.

**Sets**

- A set is a collection of unique values (duplicates are ignored).
- The API for a set is similar to map. The `add(..)` method takes the place of the set(..) method (somewhat ironically), and there is no get(..) method.
- The Set(..) constructor form is similar to Map(..), in that it can receive an iterable, like another set or simply an array of values. However, unlike how Map(..) expects an entries list (array of key/ value arrays), Set(..) expects a values list (array of values):
- `forEach` first and second arguments to the callback function are the same value in the set version

```js
var s = new Set();
var x = {id: 1};
var y = {id: 2};
s.add(x);
s.add(y);
s.add(x);
s.has(x); // true
s.size; // 2
s.delete(y);
s.clear();
s.size; // 0


var x = {id: 1},
    y = {id: 2};
var s = new Set([x, y]);

```

- Converting set with array

```js
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
  array = [...set];
console.log(array);             // [1,2,3,4,5]
```


**WeakSet**

- In a WeakSet instance, the add() method, has() method, and delete() method all throw an error when passed a nonobject.
- Weak sets aren’t iterables and therefore cannot be used in a for-of loop.
- Weak sets don’t expose any iterators (such as the keys() and values() methods), so there is no way t- programmatically determine the con- tents of a weak set.
- Weak sets don’t have a `forEach()` method.
- Weak sets don’t have a `size` property.



### New APIs
- Array
 - Array.of()
 - Array.from()
 - includes()
 - fill()
 - find()
 - findIndex()
 - copyWithin()
 - entries(), values(), keys()
 - creating Arrays and Subtypes

 ```js
 var a = [1, 2, 3];
 [...a.values()]; // [1, 2, 3]
 [...a.keys()]; // [0, 1, 2]
 [...a.entries()]; // [[0,1], [1,2], [2, 3]]
 [...a[Symbol.iterator]()]; // [1, 2, 3]
  ```

- Object
 - Object.is()
 - Object.assign()
 - Object.setPrototypeOf()
 - Object.getOwnPropertySymbols()


- String
 - String.raw()
 - repeat()
 - String Inspection Functions
    - startWith()
	- endsWith()
	- includes()
 - Unicode Functions


## ES2016

- ** Exponentiation Operator
- Array.prototype.includes
- 'use stric' in function limitation


## ES2017

- Object.values()
- Object.entries()
- Object.getOwnPropertyDescriptors

- String.prototype.padStart
- String.prototype.padEnd

- Trailing commas in function parameter lists and calls
- async function

## ES2018

https://github.com/tc39/proposals

- ... Object spread operator(stage-3)
- SIMD (stage-3)
- Function.prototype.toString rivision(stage-3)
- Lifting Template Literal Restriction(stage-3)
- Asynchronous Iteration(stage-3)

- @ decorator (stage-2)
- String.prototype.trimStart / String.prototype.trimEnd
- Shared memory and atomics
- Public Class Fields
- Promise.prototype.finally
