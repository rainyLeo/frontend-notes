## 定义函数  

#### 函数声明(Function declarations)  

**函数定义**(也叫**函数声明**，或**函数语句**)由`function`关键字及以下部分组成：  

* 函数名称
* 一组参数，放在一对括号里，由逗号隔开
* 定义函数的Javascript语句，放在大括号里,｛｝

举个例子，以下代码定义里一个名为square的函数：  
```js
function square(number) {
    return number * number;
}
```    
square函数有一个名为number的参数。函数包含一条语句，它返回函数参数number与自身的乘积。`return`语句指明函数的返回值  
`return number * number`  

原始类型参数(例如number) *通过值* 传递给函数；这个值传递给函数，但如果函数更改了这个参数的值，这个更改不会影响到全局或调用的函数  

如果把一个对象 (例如Array或用户自定义的其它对象）当作参数向函数传递时，并且函数更改了对象的 property 值，这个改变在函数外部也是可见的，如下面的例子所示：  

```js
function myFunc(theObject) {
    theObject.make = "Toyota";
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x, y;

x = mycar.make; // x gets the value "Honda"

myFunc(mycar);
y=mycar.make; // y gets the value "Toyota"
              // (the make property was changed by the function)

```  

#### 函数表达式(Function expressions)  
上面的函数声明用的是语法语句，函数也可以通过**函数表达式**来创建。这样的函数可以是**匿名**的；它不必要有一个名字。例如，函数square可以这样定义:

```js
var square = function(number) { return number * number; };
var x = square(4); //x gets the value 16
```
函数名可以用函数表达式来赋值，也可以用在函数内部引用自身，或者在debugger堆栈跟踪中鉴别该函数:

```js
var factorial = function fac(n) {return n < 2 ? 1 : n * fac(n-1) };
console.log(factorial(3));
```

当把一个函数作为参数传递给另一个函数时可以使用函数表达式。下面的例子定义了一个map函数，然后把一个匿名函数作为它的第一个参数来调用:

```js
function map(f,a) {
    var result = [], //create a new array
        i;
    for (i = 0; i != a.length; i++)
        result[i] = f(a[i]);
    return result;
}
```

下面的代码:  

```js
map(function(x) {return x * x * x}, [0, 1, 2, 5, 10]);
```
返回［0, 1, 8, 125, 1000].  

在JavaScript中，函数可以基于条件来定义。如下所示，仅当num等于0时定义myFunc函数:

```js
var myFunc;
if (num === 0) {
    myFunc = function(theObject) {
        theObject.make = "Toyota";
    }
}
```

除了以上描述的定义函数的方法外，也可以通过Function构造函数来在运行时创建函数，这和 eval() 很像。  
*方法(method)* 是作为对象属性的函数。[Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

#### 函数调用(Calling functions)

定义一个函数并不会执行它。定义函数仅命名了函数，说明了当函数被调用时做什么。*调用* 函数才会用给定的参数来执行这些动作。例如，当定义了square函数，可以这样来调用:

```js
square(5);
```

这条语句用一个参数5来调用函数。函数执行语句返回25这个值。  
当函数被调用时它必须在作用域之内，但函数声明可以被提升，如下所示:

```js
console.log(square(5));
/* ... */
function square(n) { return n * n}
```

函数作用域是函数声明的地方，如果在最上级声明的话，作用域则为整个程序中。  
>注意：这仅在用上面的语法定义函数时有效( function funcName){} ).下面的代码则没有效果

```js
console.log(square(5));
square = function (n) {
    return n * n;
}
```

函数的参数不局限于strings和numbers。可以把整个对象传递给函数。  
函数可以调用自身，例如，这个函数递归计算阶乘值:

```js
function factorial(n) {
    if ((n === 0) || (n === 1))
        return 1;
    else
        return (n * factorial(n - 1));
}
```

然后你可以这样计算值:

```js
var a, b, c;
a = factorial(1);
b = factorial(2);
c = factorial(3);
```

也有其他的方法可以调用函数。经常会出现需要动态调用函数的情况，或者传递给函数的参数数量会变化，或者函数调用的context需要在运行时被设定为一个指定的对象。这说明函数本身也是对象，也可以拥有方法。参考[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) object。其中的一个方法，[apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)方法，可以用来完成这个目的  

#### 函数作用域(Function scope)

定义在函数内部的变量在函数外部不能被访问，因为这个变量仅在函数的作用域中有定义。但是函数可以访问定义在其作用域中的任何变量和函数。换句话说，定义在全局作用域内的函数可以访问定义在全局作用域中的变量。定义在一个函数内的子函数也可以访问定义在其父函数内的所有变量，以及它的父函数和父函数可以访问的变量。  

```js
//The following varialbles are defined in the global scope
var num1 = 20,
    num2 = 3,
    name = "Chamahk";

//This function is defined in the global scope
function multiply() {
    return num1 * num2;
}

multiply();  //return 60;

//A nested function exmaple
function getScore() {
    var num1 = 2,
        num2 = 3;

    function add() {
        return name + " scored " + (num1 + num2);
    }

    return add();
}

getScore(); //Returns "Chamahk scored 5"
```

#### 作用域和函数栈(Scope and the function stack)
##### 递归(Recursion)

函数可以引用和调用自身。有3种方法可以引用自身:  

1. 通过函数名
2. arguments.callee
> ECMAScript (ES5) forbids use of arguments.callee() in strict mode.

3. 使用作用域中的变量名来引用函数  

例如，考虑下面的函数定义:

```js
var foo = function bar() {
    // statements go here
}
```

在函数体内，下面的几个是等价的:
1. bar()
2. arguments.callee()
3. foo()

调用自身的函数称为*递归函数*。在某些情况下，递归和循环类似。两种都多次执行同样的代码，两种都需要一个条件(为避免无限循环，或无限递归)。例如以下循环:

```js
var x = 0;
while (x < 10) { // "x < 10" 为循环条件
    //do stuff
    x++;
}
```

可以转化为一个递归函数:

```js
function loop(x) {
    if (x >= 10) //跳出循环条件
        return;
    loop(x + 1); //递归调用
}
loop(0);
```

不过，一些算法并不能通过简单的重复循环来实现。例如，获取一个树结构(e.g.[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model))的所有节点用递归更简单:

```js
function walkTree(node) {
    if (node == null)
        return;
    //do something with node
    for (var i = 0; i < node.childNodes.length; i++) {
        walkTree(node.childNodes[i]);
    }
}
```

和函数循环相比，每一次调用递归函数创造了许多个递归调用。  

可以把任何递归算法转换为非递归的形式，但逻辑会变得更复杂并且需要使用栈。实际上，递归本身也用了栈：函数栈  

栈的行为可以用下面的例子来看下:

```js
function foo(i) {
    if (i < 0)
        return;
    console.log('begin:' + i);
    foo(i - 1);
    console.log('end:' + i);
}
foo(3);

// Output:

// begin:3
// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
// end:3

```

#### 嵌套函数和闭包(Nested functions and closures)

可以在函数内嵌套另一个函数。嵌套(内部的)函数是它包容(外部)函数的私有成员。它自身也形成了一个*闭包*。闭包是一个可以自己拥有独立的环境与变量的表达式(通常是一个函数)。  

嵌套函数是一个闭包，意味着嵌套函数可以“继承”它的包容函数的参数和变量。换句话说，内部函数包含外部函数的作用域。  

总结如下：

* 内部函数仅可以通过外部函数中的语句访问
* 内部函数形成闭包：内部函数可以访问外部函数的参数和变量，但外部函数不能使用内部函数的参数和变量  

以下例子表明嵌套函数:

```js
function addSquares(a,b) {
    function square(x) {
        return x * x;
    }
    return square(a) + square(b);
}
a = addSquare(2,3); //returns 13
b = addSquare(3,4); //returns 25
c = addSquare(4,5); //returns 41
```

内部函数形成闭包，可以调用外部函数并为外部和内部函数同时指定参数

```js
function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}
fn_inside = outside(3); //Think of it alike: give me a function
result = fn_inside(5); //returns 8
result1 = outside(3)(5); //returns 8
```
#### 保存变量(Preservation of variables)

注意下当inside返回时x是怎样保存的。闭包会在它引用的所有作用域中保存参数和变量。由于每一次调用传入的参数都可能不同，每一次调用outside都创建一个新的闭包。当返回的inside不再可访问时内存才会释放出来。

这与存储在其他对象的引用不同，而且通常是不太明显的，因为并不能直接设置引用，且不能检查(inspect)它们。

#### 多层嵌套函数(Multiply-nested functions)

函数可以多层嵌套，例如function(A)包含function(B)包含function(C)。函数B和C都会形成闭包，B可以访问A，C可以访问B。而且，C也可以访问A。因此，闭包可以包含多层作用域(scope)；它递归包含函数的作用域。这叫做 *作用域链(scope chaining)* 为什么叫做“链”稍后会有解释。

考虑下面的例子:

```js
function A(x) {
    function B(y) {
        function C(z) {
            console.log(x + y +z);
        }
        C(3);
    }
    B(2);
}
A(1); //logs 6 (1 ＋2 ＋3)
```
在这个例子中，C可以访问B的y和A的x，这是因为:  

1. B形成一个包含A的闭包，B可以访问A的参数和变量  
2. C形成一个包含B的闭包  
3. 因为B的闭包包含A，C的闭包包含B，C可以访问A和B的参数及变量。也就是说，C*链接*了B和A的作用域  

但是反过来的话时不成立的。A不能访问C，因为A不能访问B的参数和变量，而C是B的一个变量。因此，C对B来说是私有的。  

#### 命名冲突(Name conflicts)

当一个闭包的作用域内存在两个参数或变量拥有同样的名字时，会产生命名冲突。更内部的作用域具有更高优先级，因此最内部的作用域优先级最高，最外部的作用域优先级最低。这就是作用域链。链的第一个是最内部的作用域，最后一个是最外部的作用域。看下面的例子:  

```js
function outside() {
    var x = 10;
    function inside(x) {
        return x;
    }
    return inside;
}
result = outside()(20); //returns 20 instead of 10
```

`return x`时发生命名冲突，因为有内部参数x和也有外部的变量x。这里的作用域链是`｛inside，outside，global object｝`。因此inside的x的优先级闭outside的x更高，返回的是20而不是10  

#### 闭包(Closures)

闭包是JavaScript最强大的特性之一。JavaScript允许函数的嵌套，并且内部函数访问定义在外部函数中的变量和函数(以及外部函数可以访问的变量和函数)。然而，外部函数不能访问定义在内部函数中的变量和函数。这为内部函数的变量提供了一定的安全性。另外，而且，当内部函数生存周期大于外部函数时，由于内部函数可以访问外部函数的作用域，定义在外部函数的变量和函数的生存周期就会大于外部函数本身。当内部函数以某种方式被任何一个外部函数作用域访问时，一个闭包就产生了。

```js
var pet = function(name) {      //外部函数定义一个name变量
    var getName = function() {  
        return name;            //内部函数可以访问外部函数的name变量
    }
    return getName;             //返回内部函数，因此把它暴露在外部作用域
},
myPet = pet("Vivie");

myPet();                        //返回"Vivie"
```

实际上可能会比上面的代码复杂的多。在下面这种情形中，返回了一个包含可以操作外部函数的内部变量方法的对象。

```js
var createPet = function(name) {
    var sex;

    return {
        setName: function(newName) {
          name = newName;
        },

        getName: function() {
          return name;
        },

        getSex: function() {
          return sex;
        },

        setSex: function(newSex) {
          if(typeof newSex === "string" && (newSex.toLowerCase() === "male" || newSex.toLowerCase() === "female")) {
            sex = newSex;
          }
        }
    }
}

var pet = createPet("Vivie");
pet.getName();                      // Vivie

pet.setName("Oliver");
pet.setSex("male");
pet.getSex();                       //male
pet.getName();                      //Oliver

```

上面的代码中，外部函数的name变量对内部函数是可以访问的，除了通过内部函数，没有其他访问内部变量的方法。内部函数的内部变量安全地为内部函数存储，它们可以为内部函数保存"持续"且安全的数据。这些内部函数甚至不一定要有名字或赋值给变量。  

```js
var getCode = (function() {
  var secureCode = "0]Eal2";  //A code we do not want ousiders to be able to modify...

  return function() {
    return secureCode;
  };
})();

getCode(); //Returns the secureCode

```

然而，当使用闭包时要当心许多陷阱。如果一个enclosed函数定义了一个变量，这个变量和外部作用域中的某个变量重名，就没有方法可以引用外部作用域中的变量了。

```js
var createPet = function(name) {  //Outer function defines a variable called "name"
  return {
    setName: function(name) {    //Enclosed function also defines a variable called "name"
      name = name;               //How do we access the "name" defined by the outer function???
    }
  }
}
```

`this`变量有点复杂。它必须小心地使用，`this`指向的完全取决于函数在何处被调用，而不是在何处被定义。一篇关于闭包的详尽的文章在[这里](http://jibbering.com/faq/notes/closures/)

#### 使用arguments对象(Using the arguments object)

函数的arguments会被保存在一个类似数组的对象中。在函数内，可以这样取得被传递的参数:  

`arguments[i]`  

i 是参数的序数编号，它从0开始。第一个传递给函数的参数为 arguments[0]。参数的总数可以用 arguments.length 来表示  

在使用 arguments 对象时，可以用比声明时更多的参数调用函数。这在你不知道要向函数传递多少参数时比较有用。可以使用 arguments.length 来获得实际传递给函数的参数的数量，然后用arguments对象访问每一个参数。  

例如，假设有一个连接几个字符串的函数。函数的唯一参数是一个字符串，它确定了连接几个项目的符号。函数定义如下：  

```js
function myConcat(separator) {
    var result = "",
        i;
    // iterate through arguments
    for (i = 1; i < arguments.length; i++) {
        result += arguments[i] + separator;
    }
    return result;
}
```

你可以向这个函数传递任意数量的参数，它把每个参数连成一个字符串“清单”：  

```js
// returns "red, orange, blue, "
myConcat(", ", "red", "orange", "blue");
```

>注意：arguments变量“像数组”，但不是数组。它像数组有数字索引和length属性。但是，它没有数组的其它方法


#### 函数参数(Function parameters)

从ECMAScript 6开始，有两个新的parameters: default parameters and rest parameters.

##### Default parameters

在JavaScript中，函数的参数默认值为undefined。但是，在某些情况下，设置一个不同的默认值会变得有用。这就要用到default parameters。  

在过去，设置默认值通常的做法是在函数内测试参数的值，如果为defined则进行赋值。在下面的例子中，如果在调用时没有给b传递值，当计算a * b时它的值则为defined，相乘的结果为NaN。但可以下面例子中的第二行来解决：  

```js
function multiply(a, b) {
    b = typeof b !== 'undefined' ? b : 1;

    return a * b;
}

multiply(5); //5
```

有了默认参数，函数中的检查就不需要了。现在，你可以把1作为默认值：  

```js
function multiply(a, b = 1) {
    return a * b;
}

multiply(5); //5
```

#### Rest parameters
剩余参数语法允许将不确定数量的参数表示为数组。在下面的例子中，使用剩余参数收集从第二个到最后参数。然后，我们将这个数组的每一个数与第一个参数相乘。这个例子是使用了一个箭头函数，这将在下一节介绍。

```js
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```

#### 箭头函数(Arrow functions)

[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和函数表达式相比语法较简洁，词法上和this值绑定。箭头函数都是匿名的。看这篇博客：[ES6 In Depth: Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)

从2个方面介绍箭头函数：更短的函数和词法this。

##### 更短的函数(Shorter functions)

在一些函数模式中，更短的函数更受欢迎。比较：

```js
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length )
```

##### this的词法(Lexical this)

在箭头函数出现之前，每个新的函数定义自己的this值(1.在构造函数中是new的对象，2.在严格模式函数调用中是undefined，在非严格模式函数调用中是全局对象 3.函数被当作对象方法调用时是context object, 4.在apply, call, bind中是参数)。这在面向对象编程中有点麻烦。

```js
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();

```
在ECMSAScript 3/5中，可以通过把this值赋值给一个变量来进行固定。

```js
function Person() {
  var self = this; // Some choose `that` instead of `self`.
                   // Choose one and be consistent.
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;
  }, 1000);
}
```

另外，创建一个约束函数(bound function)可以使得this值被正确传递给growUp()函数。

箭头函数可以获取闭包上下文中的this值，下面的代码可以正常使用。

```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```

#### 预定义的函数(Predefined functions)

JavaScript有一些内置的函数。  

`eval()`
    eval()函数执行以字符串形式表示的JavaScript代码。  

`isNaN()`  
    isNaN()函数判断一个值是否是NaN。注意： isNaN函数内部的强制转换规则十分有趣； 另一个可供选择的是ECMAScript 6 中定义Number.isNaN() , 或者使用 typeof 来判断数值类型。

`parseInt()`  
parseInt() 函数解析字符串参数，并返回指定的基数（基础数学中的数制）的整数。  

`parseFloat`  
parseFloat() 函数解析字符串参数，并返回一个浮点数。

`decodeURI()`  
decodeURI() 函数对先前经过encodeURI函数或者其他类似方法编码过的字符串进行解码。
`decodeURIComponets`  
decodeURIComponent()方法对先前经过encodeURIComponent函数或者其他类似方法编码过的字符串进行解码。  

`encodeURI()`  
encodeURI()方法通过用以一个，两个，三个或四个转义序列表示字符的UTF-8编码替换统一资源标识符（URI）的某些字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。  

`encodeURIComponet`  
encodeURIComponent() 方法通过用以一个，两个，三个或四个转义序列表示字符的UTF-8编码替换统一资源标识符（URI）的每个字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。  

# 函数对象内置方法

## Function.prototype.apply()

apply()方法以指定的this值、以数组或类数组形势提供的参数调用函数  

>注意：apply()函数的语法和call()的很像，唯一区别在于call()接收的是**参数列表**，而apply()接收的是**参数数组**(或类数组对象)

##### 语法  

`fun.apply(thisArg, [argsArray])`

##### 参数

**thisArg**  

在fun函数运行时指定的this值。注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null或undefined时会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动标准对象。  

**argsArray**  

一个数组或者类数组对象，其中的数组元素将作为单独的参数传给fun函数。如果该参数的值为null或undefined，则表示不需要传入任何参数。从ECMAScript5开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。  

#### 描述

在调用一个存在的函数时，你可以为其指定一个this对象。this指当前对象，也就是正在调用这个函数的对象。使用apply，你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。  

apply与call()非常相似，不同之处在于提供参数的方式。apply使用参数数组而不是一组参数列表。apply可以使用数组字面量(array literal)，如fun.apply(this, ['eat', 'bananas'])，或数组对象，如fun.apply(this, new Array('eat', 'bananas'))。  

你也可以使用arguments对象作为argsArray参数。arguments是一个函数的局部变量。它可以被用作被调用对象的所有未指定的参数。这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。你可以使用arguments来把所有的参数传递给被调用对象。被调用对象接下来就负责处理这些参数。  

从ECMAScript5开始，可以使用任何种类的数组对象，就是说只要有一个length属性和[0...length]范围的整数属性。例如现在可以使用Nodelist或一个自己定义的类似{'length':2, '0': 'eat', '1': 'bananas'}形式的对象。  

需要注意：IE9和chrome14仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。  

#### 示例

**使用apply来链接构造器** 
 
你可以使用apply来给一个对象链接构造器，类似于Java。在接下来的例子中我们会创建一个叫做construct的全局的Function函数，来使你能够在构造器中使用一个数组对象而非参数列表。  

```js
Fucntion.prototype.construct = function(aArgs) {
    var oNew = Object.create(this.prototype);
    this.apply(oNew, aArgs);
    return oNew;
};  
```

>注意上面使用的Object.create()方法相对来说比较新。另一种可选的方法是使用闭包，请考虑如下替代方法：  

```js
Function.prototype.construct = function(aArgs) {
    var fConstructor = this;
    var fNewConstr = function() {
        fConstructor.apply(this, aArgs);
    };
    fNewConstr.prototype = fConstructor.prototype;
    return new fNewConstr();
};
```

使用案例：  

```js
function MyConstructor () {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"
```

>注意：这个非native的Function.construct方法无法和一些native构造器(例如Date)一起使用。在这种情况下你必须使用Function.bind方法（例如，想象有如下一个数组要用在Date构造器中：[2012, 11, 4]; 这时你需要这样写：new(Function.prototype.bind.apply(Date, [null].concat([2012, 11, 4])))(） --无论如何这不是最后的实现方式并且也许不该用在任何生存环境中）  
>

#### 使用apply和内置函数

聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大／最小值。  

```js
/* min/max number in an array */
var numbers = [5, 6, 2, 3, 7];

/* using Math.min/Math.max apply */
var max = Math.max.apply(null, numbers); /* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* vs. simple loop based algorithm */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min)
    min = numbers[i];
}

```  

但是当心：如果用上面的方式调用 apply, 你很可能会遇到方法参数个数越界的问题. 当你对一个方法传入非常多的参数 (比如超过1W多个参数) 时, 就非常有可能会导致越界问题, 这个临界值是根据不同的 JavaScript 引擎而定的 (JavaScript 核心中已经做了硬编码  参数个数限制在65536)，因为这个限制(实际上也是任何用到超大栈空间的行为的自然表现)是未指定的. 有些引擎会抛出异常.  更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失. (举个例子: 如果某个引擎限制了方法参数最多为4个 [实际真正的参数个数限制当然要高得多了, 这里只是打个比方], 上面的代码中, 真正通过 apply 传到目标方法中的参数为 5, 6, 2, 3, 而不是完整的 numbers 数组.) 如果你的参数数组可能非常大, 那么推荐使用下面这种策略来处理: 将参数数组切块后循环传入目标方法:

```js
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
```  

## Function.prototype.bind()

bind()方法会创建一个新函数，当这个新函数被调用时，它的this值设定为提供的值，及其它给定的参数

#### 语法

`fun.bind(thisArg[, arg1[, arg2[, ...]]])`  

##### 参数

**thisArg**  
当绑定的函数被调用时，被传递给目标函数作为this的值。如果绑定函数用new操作符创建的，这个值被忽略

**arg1, arg2, ...**  
当调用目标函数时，传递给绑定函数的参数  

#### 描述

bind()函数创建一个新的函数:绑定函数(a bound function) ，新函数与被调函数(绑定函数的目标函数)具有相同的函数体(在ECMAScript中内部的call属性)。当目标函数被调用时，this值作为bind()的第一个参数，该参数不能被重写。当绑定函数被调用时，bind()也接收默认参数来传给目标函数。绑定函数也可以用new操作符来创建：这样做的话好像目标函数被创建了。提供的this值被忽略，while prepended arguments are provided to the emulated function.

#### 示例

##### 创建绑定函数

bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。从函数中，用原来的对象创建一个绑定函数，则能很好地解决这个问题：  

```js
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX(); // 9, because in this case, "this" refers to the global object

// Create a new function with 'this' bound to module
//New programmers (like myself) might confuse the global var getX with module's property getX
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

##### 分离函数（Partially Functions）（curring）

bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。当绑定函数被调用时，这些参数（如果有的话）跟在this值后面，然后被插入到传给目标函数的参数列表的开始位置，传给绑定函数的参数会跟在它们的后面。  

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

##### 配合 setTimeout

在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或全局）对象。当使用类的方法时，需要 this 引用类的实例，你可能需要显式地把 this 绑定到回调函数以便继续使用实例。

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

##### 作为构造函数使用的绑定函数

>警告 :这部分演示了 JavaScript 的能力并且记录了 bind() 的超前用法。以下展示的方法并不是最佳的解决方案且可能不应该用在任何生产环境中。  

自然而然地，绑定函数适用于用new操作符 new 去构造一个由目标函数创建的新的实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。然而, 原先提供的那些参数仍然会被前置到构造函数调用的前面。  

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return this.x + ',' + this.y;
};

var p = new Point(1, 2);
p.toString(); // '1,2'

var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);
// 以下这行代码在 polyfill 不支持,
// 在原生的bind方法运行没问题:
//(译注：polyfill的bind方法如果加上把bind的第一个参数，即新绑定的this执行Object()来包装为对象，Object(null)则是{}，那么也可以支持)
var YAxisPoint = Point.bind(null, 0/*x*/);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true
```

你知道不需要做特别的处理就可以用new操作符 new 创建一个绑定函数。必然地，你需要知道不需要做特别处理就可以创建一个可以被直接调用的绑定函数，即使你更希望绑定函数是用new操作符 new 来调用。

```js
// 这个例子可以直接在你的 javascript 控制台运行
// ...接着上面的代码继续(译注：

// 仍然能作为一个普通函数来调用
// (即使通常来说这个不是被期望发生的)
YAxisPoint(13);

emptyObj.x + ',' + emptyObj.y;   //  '0,13'
```  

如果你希望一个绑定函数只支持使用new操作符 new，或者只能直接调用它，那么模板函数必须强制执行那限制。

##### 快捷调用

在你想要为一个需要特定的 this 值得函数创建一个捷径（shortcut）的时候，bind() 方法也很好用。

你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以创建这样一个捷径：

```js
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```  

用 bind() 可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 call() 方法的绑定函数，并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply() 调用了。  

```js
// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

// ...

slice(arguments);
```

#### Polyfill（兼容旧浏览器）

bind 函数在 ECMA-262 第五版才被加入；它可能无法在所有浏览器上运行。你可以部份地在脚本开头加入以下代码，就能使它运作，让不支持的浏览器也能使用 bind() 功能。  

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || this,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

```

上述算法和实际的实现算法还有许多其他的不同 （尽管可能还有其他不同之处，却没有那个必要去穷尽）：

1. 这部分实现依赖于`Array.prototype.slice()`， `Array.prototype.concat()`， `Function.prototype.call()`这些原生方法.  

2. 这部分实现创建的函数的实现并没有caller 以及会在 get，set或者deletion上抛出TypeError错误的 arguments 属性这两个不可改变的“毒药” 。（假如环境支持{jsxref("Object.defineProperty")}}， 或者实现支持__defineGetter__ and __defineSetter__ 扩展）  

3. 这部分实现创建的函数有 prototype 属性。（正确的绑定函数没有的)  

4. 这部分实现创建的绑定函数所有的 length 属性并不是同ECMA-262标准一致的：它的 length 是0，而在实际的实现中根据目标函数的 length 和预先指定的参数个数可能会返回非零的 length。  

如果你选择使用这部分实现，你不能依赖于ECMA-262，但是ECMA-5是可以的。在某些情况下（也可以作另一番修改以适应特定的需要），这部分实现也许可以作为一个过渡，在bind()函数被广泛支持之前。
