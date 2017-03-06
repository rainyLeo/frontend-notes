


- we call a property or method on a string primitive, and the engine automatically coerces it to a String object, so that the property/method access works
- null and undefined have no object wrapper form, only their primitive values. By contrast, Date values can only be created with their con‐ structed object form, as they have no literal form counterpart.

- RegExp使用new语法是要转义\, 即\\, 在字符串会动态改变时用new, 其余地方用字面量形式
- 对象属性名会自动变成字符串, 包括数字
- 原型链上有个属性的writable: false 的话, 用=设置同名的属性会失败, 要用Object.defineProperty





```js
var foo = {a: "alpha", 2: "two"};
console.log(foo.a);    // alpha
console.log(foo[2]);   // two
//console.log(foo.2);  // Error: missing ) after argument list
//console.log(foo[a]); // Error: a is not defined
console.log(foo["a"]); // alpha
console.log(foo["2"]); // two
```
#### Loops and iteration
```js
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7"
}
```
#### Expressions and operators
```
x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)
```


`propNameOrNumber in objectName`

`objectName instanceof objectType`
