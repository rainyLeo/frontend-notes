/* eslint-disable */
//example-1a 外部函数所有局部变量都在闭包内，即使这个变量声明在内部函数定义之后
function sayAlice() {
  var sayAlert = function() { console.log(alice); };
  var alice = 'hello alice';
  return sayAlert;
}
var helloAlice = sayAlice(); 
helloAlice();
// 输出：hello alice,即使局部变量声明在sayAlert之后，局部变量仍然可以被访问到

//exmple-1b 同上, 闭包作用域链中的局部变量是引用而非拷贝
function printNum() {
  var num = 666;
  var sayNum = function() { console.log(num);};
  num += 1;
  return sayNum;
}
printNum()(); // 667, 闭包sayName引用变量num, 即使num += 1在sayNum函数声明的后面

//example-2 多个子函数有同样的父作用域, 这些闭包共享一个variable object, 在一个闭包修改变量会影响其他闭包中的变量(因为引用的是同一个变量)
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

//example-3 当在一个循环中赋值函数时，这些函数(闭包)将引用同一个变量
function getArr(arr) {
  var result = [];
  
  for (var i = 0; i < arr.length; i++) {
    result[i] =  function () {     
      return arr[i] * arr[i];
    };
  }
  return result;
}
var arr1 = getArr([1,2,3]);
arr1[0](); // NaN, i的最终值是3



//example-4 每次函数调用的时候创建一个新的作用域链和变量对象, 调用返回的函数(闭包)相互独立
function counter() {
  var n = 0;
  return {
    count: function() {
      return n++;
    },
    reset: function() {
      n = 0;
    }
  };
}
var c = counter();
var d = counter();
c.count(); // 0
c.count(); // 1
d.count(); // 0 : c 和 d相互独立
c.reset(); // reset()和 count() 共享变量值
c.count(); // 0

//example-5 getter 和 setter 用闭包实现
function counter(n) {
  return {
    get count() {
      return n++;
    },
    set count(m) {
      if (m > n) {
        n = m;
      } else {
        throw Error("count can only be set to a larger value");
      }
    }
  };
}
var c = counter(100);
c.count; // 100
c.count; // 101
c.count = 200;
c.count; // 200
c.count = 150; // Error!

//example-6 私有属性存储方法 闭包实现
function addPrivateProperty(o, name, predict) {
  var value;
  
  o["get" + name] = function() {
    return value;
  };
  o["set" + name] = function(v) {
    if (predict && !predict(v)) {
      throw Error("set" + name + ": invalid value " + v);
    } else {
      value = v;
    }
  };
}
var o = {};
addPrivateProperty(o, "Name", function(x) {
  return typeof x == "string";
});
o.setName("Leo");
o.getName();

// example-7a 模块模式创建对象(私有属性) 闭包实现
var person = (function() {
  var age = 25;
  
  return {
    name: 'leo',
    getAge: function() {
      return age;
    },
    growOlder: function() {
      age++;
    }
  };
})();
person.name; // 'leo'
person.getAge(); // 25

person.age = 20;
person.getAge(); // 25

person.growOlder();
person.getAge(); // 26

// example-7a 暴露模块模式创建对象(私有属性) 闭包实现
var person = (function() {
  var age = 25;
  
  function getAge() {
    return age;
  }
  function growOlder() {
    age++;
  }
  return {
    name: 'leo',
    getAge: getAge,
    growOlder: growOlder
  };
})();
















