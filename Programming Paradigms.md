

# Programming Paradigms
1. Thinking in machine: procedure-oriented, (imperative)
2. Thinking in Object: object-oriented 
3. Thinking in function: functional programming
4. Concurrent programming(networking)

- Imperative, which state the order in which operations take place, allows side effects
- Functional, which does not allow side effects
- Declarative, which does not state the order in which operations execute 
- Object-oriented, which groups code together with the state the code modifies
- Procedural, which groups code into functions


Imperative vs Declarative Programming

- Declarative, as opposed to imperative, means that we will write expressions, as opposed to step by step instructions.
- Declarative programming is "the act of programming in languages that conform to the mental model of the developer rather than the operational model of the machine"
- Because we are not encoding order of evaluation, declarative coding lends itself to parallel computing. This coupled with pure functions is why FP is a good option for the parallel future - we don't really need to do anything special to achieve parallel/concurrent systems

```js
// imperative
var makes = [];
for (var i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}

// declarative
var makes = cars.map(function(car) { return car.make; });



// imperative
var authenticate = function(form) {
  var user = toUser(form);
  return logIn(user);
};

// declarative
var authenticate = compose(logIn, toUser);

Object-oriented vs Behavior Delegation in JS


```


## Functional Programming
- A function is a special relationship between values: Each of its input values gives back exactly one output value.

Pure functions
- A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.
- Pure functions are mathematical functions and they're what functional programming is all about
- In functional programming, we dislike unwieldy functions like splice that mutate data.


** High-order functions **
- Composition



** Curry **
- 'A function that will return a new function until it receives all its arguments'
- The concept is simple: You can call a function with fewer arguments than it expects. It returns a function that takes the remaining arguments.


Lambda calculus

FP的共同點在於:
- 没有副作用(side effect), 在表达式(expression)内不可以造成值得改变
- 第一级函数(first-class function), 函数可以当做传入参数或传出结果

FP和我们管用的编程风格, 有相当大的差异:
- Imperative Programming 认为程序的执行, 就是一连串状态的改变
- FP将程序的运作, 视为数学函数的计算, 且避免'状态'和'可变资料'

Functional Programming Concepts
1. Avoiding Mutable States
2. Recursion
3. High-Order functions
4. Function Composition
5. Lazy Evaluation



