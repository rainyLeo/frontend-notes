/* eslint-disable */

// sum two number without +-*/
function sum(a, b) {
  while (a !== 0) {
    ;[a, b] = [(a & b) << 1, a ^ b]
  }
  return b;
}

// sum a array
Array.prototype.sum = function() {
  return this.reduce(function(prev, curr) {
    return prev + curr;
  });
};

// 软键盘遮住输入框 softkey input
let interval = setInterval(function() {
  document.body.scrollTop = document.body.scrollHeight
}, 100)

// inherit
function inherit(p) {
  if (p === null) {
    throw TypeError();
  }
  if (Object.create) {
    return Object.create(p);
  }

  if (typeof p !== 'Object' || typeof p !== 'function') {
    throw TypeError();
  }

  function F() {};
  F.prototype = p;
  return new F();
}


// Max value in array
var array = [1, 12, 2, 3, 4];

var max1 = Math.max.apply(null, arr);

var max2 = 0
arr.forEach(e => max2 = (e > max2) ? e : max2);

var max3 = arr.reduce((prev, cur) => (prev > cur) ? prev : cur);

var max4 = arr.sort((a, b) => a - b < 0)[0];

var max5 = 0;
for (var i = 0; i < arr.length; i++) {
  if (arr[i] > max5) max5 = arr[i];
}

// flatten a array
function flat(arr) {
  var res = []

	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			Array.prototype.push.apply(res, flat(arr[i]))
    } else {
      res.push(arr[i])
    }
	}
	return res
}
// 方法2
arr.join().split(',').map(e => +e);

// type check
function type(obj) {
	var toString = Object.prototype.toString;
	var map = {
	    '[object Boolean]'  : 'boolean',
	    '[object Number]'   : 'number',
	    '[object String]'   : 'string',
	    '[object Function]' : 'function',
	    '[object Array]'    : 'array',
	    '[object Date]'     : 'date',
	    '[object RegExp]'   : 'regExp',
	    '[object Undefined]': 'undefined',
	    '[object Null]'     : 'null',
	    '[object Object]'   : 'object',
      '[object Map]'      : 'map',
      '[object Set]'      : 'set'
	};
	if(obj instanceof Element) {
        return 'element';
	}
  // Object.prototype.toString.call(date1) 和 date1.toString不一定一样
	return map[toString.call(obj)];
}

// date format 日期格式化
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

// Object shallow equal
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}


// Object.assign pollyfill
function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// object deep copy
var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};
var obj1 = {x: 3, y: {a: 2}, z: 3};
var obj2 = deepExtend({}, obj1);

// 1. deep clone obj
 function deepCopy(obj) {
	let res = obj.constructor === Array ? [] : {}
	let keys = Object.keys(obj)
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		if (typeof obj[key] === 'object') {
			res[key] = deep(obj[key])
		} else {
			res[key] = obj[key]
		}
	}
	return res
}
// 2.
function cloneobj(obj) {
    var o = obj.constructor === Array ? [] : {};
    for (var e in obj) {
        o[e] = typeof obj[e] === "object" ? cloneobj(obj[e]) : obj[e];
    }
    return o;
};
var a3 = {x:1, y: {z: 2}, c:3};
var a4 = cloneobj(a3);
// 2.
JSON.parse(JSON.stringify(obj)) // 用在Date上格式会有问题, 有function会有问题
// 3
jQuery.extend(true, {}, obj);



// trim string
function trimStr(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

// unique qrray / remove duplicate
function uniq(arr) {
  return arr.filter(function(e, i, a) {
    return a.indexOf(e) === i;
  });
}

function uniq2(arr) {
  var res = [];
  arr.forEach(function(e, i, a) {
    if (res.indexOf(e) < 0) {
      res.push(e);
    }
  });
  return res;
}

var uniq = [...new Set(arr)];

// camel case a string
// camel-case -> camelCase
function camelCase(str) {
  return str.replace(/-([a-z])/g, function(matched, p) {
    return p.toUpperCase();
  });
}

// flat a array
var a1 = [1, [2], [[3]]];
// 1.
var a2 = [].concat.apply([], a1); // [].concat(1, [2], [[3]])
// 2.
var a2  = a1.reduce(function(a, b) {
  return a.concat(b);
}, []);

a2; // [1, 2, [3]]

// swap array
// swap1
function swap1(a, b) {
  var lengtha = a.length;
  var lengthb = b.length;
  for (let i = 0; i < lengthb; i++) {
    a.push(b.shift());
  }
  for (let i = 0; i < lengtha; i++) {
    b.push(a.shift());
  }
}
//
// swap 2
function swap2(a, b) {
  var lengtha = a.length;
  var lengthb = b.length;
  [].push.apply(a, b.splice(0, lengthb));
  [].push.apply(b, a.splice(0, lengtha));
}
swap(a1, a2);

// random color
var color = "#" + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6); // take care of missing zeroes in random string


// shuffle array
// shuffle 1
 function shuffle1(arr) {
  var ret = [];
  var length = arr.length;
  while (length--) {
    var index = Math.floor(Math.random() * length);
    [].push.apply(ret, arr.splice(index, 1));
  }
  return ret;
}
// shuffle 2
function shuffle2(array) {
  var _array = array.slice();

  for (var i = 0, length = _array.length ; i < length; i++) {
    var j = Math.floor(Math.random() * length);
    [_array[i], _array[j]] = [_array[j], _array[i]]
  }
  return _array;
}

// shuffle 3
array.sort(function() {
  return Math.random() - 0.5
})

// isNumber
function isNum(obj) {
  return !isNaN(parseFloat(obj, 10)) && Number.isFinite(obj); // 如果'5' true, 换为isFinite(obj)
}

// forEach
Array.prototype.forEach = function(callback, context) {
  for (let i = 0; i < this.length; i++) {
    callback.call(context || null, this[i], i, this);
  }
}


// bind a function
function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}

function bind(f, o) {
  if (f.bind) {
    return f.bind(o);
  } else {
    return function() {
      return f.apply(o, arguments);
    }
  }
}

Function.prototype.bind = function () {
	var fn = this,
		args = Array.prototype.slice.call(arguments),
		object = args.shift();

	return function() {
		return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	};
};

// curry
Function.prototype.curry = function() {
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  }
};

// longest common subsequence
function lcsLength(A, B) {
  var m = A.length
  var n = B.length
  var C = []
  for (let i = 0; i <= A.length; i++) {
    C.push([0])
    for (let j = 0; j < B.length; j++) {
      C[0].push(0)
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (A[i] === B[j]) {
        C[i+1][j+1] = C[i][j] + 1
      } else {
        C[i+1][j+1] = Math.max(C[i][j + 1], C[i + 1][j])
      }
    }
  }
  return C[m][n]
}
var A = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']
var B = ['B', 'C', 'A', 'B', 'F']
var len = lcsLength(A, B) // 4

// 汉诺塔 hanoi
var hanoi = function(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('Move disc' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
}

function add(x) {
  return function (y) {
    return x + y;
  };
}
var increment = add(1);
var addTen = add(10);
increment(2); // 3
addTen(2); // 12


// partial
Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
} }
    return fn.apply(this, args);
  };
};

// curry/patailly with bind exmaple-1:
function list() {
  return Array.prototype.slice.call(arguments);
}
var leading10List = list.bind(null, 10);
var list1 = leading10List(); // [10]
var list2 = leading10List(1,2,3); // [10, 1, 2, 3]

// curry/patailly with bind exmaple-2:
function foo(a, b) {
  console.log("a" + a + ", b:" + b);
}

var bar = foo.bind(null, 2); // curring with bind
bar(3); // a:2, b:3


// prevent fogetting new on constructor
function User(first, last) {
  if (!(this instanceof arguments.callee)) {
    return new User(first, last);
  }
  this.name = first + ' ' + last;
}

// higher-order function / compose  f(g())

function compose(f, g) {
  return function() {
    return f.call(this, g.apply(this, arguments));
  }
}
var square = function(x) {
  return x * x;
}
var sum = function(x, y) {
  return x + y;
}

var res = compose(square, sum);
res(2, 3); // 25


// compose 2
var compose2 = function(f, g) {
  return function(x) {
    return f(g(x))
  };
};

var toUpperCase = function(x) {
  return x.toUpperCase();
};
var exclaim = function(x) {
  return x + '!';
};
var shout = compose2(exclaim, toUpperCase);

shout("send in the clowns"); // "SEND IN THE CLOWNS!"

// fibonacci tail call 尾递归
'use strict'
function fibonacci (n , a1 = 0 , a2 = 1) {
  if(n === 0) {
    return a1
  };
  return fibonacci(n - 1, a2, a1 + a2)
}
var t
console.time(t)
fibonacci(42)
console.timeEnd(t)

// memorization / memoize
function memoizer(memo, fn) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fn(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
}
var fibonacci = memoizer([0, 1], function(recur, n) {
  return recur(n - 1) + recur(n - 2);
})


function memorize2(f) {
  var cache = {};
  return function() {
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) {
      return cache(key);
    } else {
      return cache[key] = f.apply(this, arguments);
    }
  }
}

function memoize3(fn) {
  var prevArg;
  var prevResult;
  return function(arg) {
    return arg === prevArg ?
      prevResult :
      (prevArg = arg,
       prevResult = fn.call(this, arg));
  }
}

// 一个数通过+5 或*3 计算得出
function find(start, target, history) {
		if (start === target) {
			return history
		} else if (start > target) {
			return null
		} else {
			return find(start + 5, target, '(' + history + ' + 5)') ||
						 find(start * 3, target, '(' + history + ' * 3)')
		}

}
find(1, 34, '1')

function gcd(a, b) {
  if (a < b) {
    [a, b] = [b, a]
  }
  while (b !== 0) {
    [a, b] = [b, a % b]
  }
  return a
}
var gcdmemo = memorize(gcd);
gcdmemo(85, 187); // 17

var factorial = memorize(function(n) {
  return (n <= 1) ? 1 : n * factorial(n - 1);
});
factorial(5); // 120

// getter setter : accessor attribute:
var perosn = {
  _name: 'leo',
  get name() {
    return this._name;
  },
  set name(newName) {
    this._name = newName;
  }
}
// 2.
var perosn = {
  _name: 'leo'
};
Object.defineProperty(person, 'name', {
  get: function() {
    return this._name;
  },
  set: function(newName) {
    this._name = newName;
  },
  enumerable: true,
  configarable: true
});



// extend properties
function extend(to, from) {
  var keys  = Object.keys(from);
  var i = keys.length;
  while(i--) {
    to[keys[i]] = from[keys[i]];
  }
  return to;
}

// plain object
function isPlainObject(obj) {

  // Basic check for Type object that's not null
  if (typeof obj == 'object' && obj !== null) {

    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf == 'function') {
      var proto = Object.getPrototypeOf(obj);
      return proto === Object.prototype || proto === null;
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(obj) == '[object Object]';
  }

  // Not an object
  return false;
}


/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}
// 200ms 内没有连续两次触发 scroll 事件, 那么才会触发真正想在 scroll 事件中触发的函数
// 不适合图片的懒加载，因为希望在滑动过程中图片不断的被加载出来，而不是只有当我停止下滑时候，图片才被加载出来。又或者下滑时候的数据的 ajax 请求加载也是同理。
function debounce2(func, wait, immediate) {
    var timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }
let img1 = document.getElementById("img1");
document.addEventListener('scroll', debounce(handleScroll, 200), false);


// 简单的节流函数
// 如果在一段时间内 scroll 触发的间隔一直短于 500ms ，
// 那么能保证事件我们希望调用的 handler 至少在 1000ms 内会触发一次。
function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context, args);
            startTime = curTime;
        // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));






// function throttling
// Using a timer to break up a long-running task
//
// var tbody = document.getElementsByTagName("tbody")[0];
// for (var i = 0; i < 20000; i++) {
//   var tr = document.createElement("tr");
//   for (var t = 0; t < 6; t++) {
//     var td = document.createElement("td");
//     td.appendChild(document.createTextNode(i + "," + t));
//     tr.appendChild(td);
//   }
//     tbody.appendChild(tr);
//   }
var rowCount = 20000;
var divideInto = 4;
var chunkSize = rowCount/divideInto;
var iteration = 0;
var table = document.getElementsByTagName("tbody")[0];

  setTimeout(function generateRows(){
    var base = (chunkSize) * iteration;
    for (var i = 0; i < chunkSize; i++) {
      var tr = document.createElement("tr");
      for (var t = 0; t < 6; t++) {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode((i + base) + "," + t + "," + iteration));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    iteration++;
    if (iteration < divideInto)
      setTimeout(generateRows,0);
},0);

// 根据个对象属性对数组进行排序
function compareFunction(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    return value1 > value2;
  }
}
var data = [{name: 'leo', age: 24}, {name: 'rainy', age: 23}, {name: 'jade', age: 30}];
data.sort(compareFunction('name'));
// data.sort(function(a,b){return a.name < b.name});
