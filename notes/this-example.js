/* eslint-disable */

// implict binding
var a = "aglobal"; 
function foo() { 
  var a = 'afoo';
  console.log( this.a );
}
function doFoo(fn) {
  var a = 'adofoo';
  fn();
}
var obj={ 
  a: 'aobj',
  foo: foo 
};
doFoo(obj.foo);

// explicit  hard-binding1
var a = 1;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2
};
var bar = function() {
  foo.call(obj); // hard binding
};
bar(); // 2
setTimeout(bar, 100); // 2
bar.call(window); // 2,  hard-bound `bar` can no longer have its `this` overridde

// hard binding2
function foo(num) {
  return this.a + num;
}
var obj = {
  a: 2
};
var bar = function() {
  return foo.apply(obj, arguments);
};
var b = bar(3);
console.log(b); // 5

// hard-binding3, bind() function
function foo(num) {
  return this.a + num
}
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}
var obj = {
  a: 2
};
var bar = bind(foo, obj)
var b = bar(3);
console.log(b); // 5

// hard-binding4, Function.prototype.bind 
function foo(num) {
  return this.a + num;
}
var obj = {
  a: 2
};
var bar = foo.bind(obj);
var b = bar(3);
console.log(b);

// API call "context"
function foo(el) {
  console.log(el, this.id);
}
var obj = {
  id: "awesome"
};
[1,2,3].forEach(foo, obj);
// 1 awesome 2 awesome 3 awesome

// implict binding vs explicit binding
var a = 1;
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 2,
  foo: foo
};
var obj2 = {
  a: 3,
  foo: foo 
};

obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

// new binding
function foo(num) {
  this. a = num;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2
var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

// pass null for a this binding 
function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2, null => window 

// pass null for a this binding , curry 
function foo(a, b) {
  console.log("a" + a + ", b:" + b);
}

foo.apply(null, [2, 3]); // a:2, b:3

var bar = foo.bind(null, 2); // curring with bind
bar(3); // a:2, b:3

// safer this 
function foo(a, b) {
  console.log("a" + a + ", b:" + b);
}
var ø = Object.create(null); // empty object 
foo.apply(ø, [2, 3]); // a:2, b:3

var bind = foo.bind(ø, 2);
bar(3); // a:2, b:3


// indirection, indirect reference to functions, default binding rule applies 
function foo() {
  console.log(this.a);
}
var a = 2;
var o = {
  a: 3,
  foo: foo 
}
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2




// soft binding 
Function.prototype.softBind = function(obj) {
  var fn = this,
      curried = [].slice.call(arguments, 1),
      bound = function bound() {
        return fn.apply(
          (!this || 
            (typeof window !== "undefined" &&
              this === window) ||
            (typeof global !== "undefined" &&
              this === global)
          ) ? obj : this,
          curried.concat.apply(curried, arguments)
        );
      };
    bound.prototype = Object.create(fn.prototype);
    return bound;
};


function foo() {
  console.log("name: " + this.name);
}
var obj = {name: "obj"};
var obj2 = {name: "obj2"};
var obj3 = {name: "obj3"};

var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj 

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 

fooOBJ.call(obj3); // name: obj3

setTimeout(obj2.foo, 10); // name: obj

// lexical this in ES6 arrow function 
function foo() {
  return (a) => {
    console.log(this.a); // `this` here is lexically inhereted from foo() 
  }
}
var obj1 = {a: 2};
var obj2 = {a: 3};
var bar = foo.call(obj1);
bar.call(obj2); // 2, not 3


function foo() {
  setTimeout(() => {
    console.log(this.a); // `this` here is lexically inhereted from foo()
  }, 100);
}
var obj = {a: 2};
foo.call(obj); // 2











