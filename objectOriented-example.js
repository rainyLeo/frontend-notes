/* eslint-disable */
/* eslint no-redeclare: 'off' */


/********  对象创建 ********/

/* 组合使用构造函数模式和原型模式 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['sherly', 'court'];
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    alert(this.name);
  }
};

var person1 = new Person('leo', 25, 'software engineer');
var person2 = new Person('rainy', 24, 'frontend');
person1.friends.push('van');
alert(person1.friends); // 'sherly, count, van'
alert(person2.friends); // 'sherly, count'
alert(person1.friends === person2.friends); // false
alert(person1.sayName === person2.sayName); // true


/* Methods Attached Via the Prototype Object*/
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.getName = function () {
  return this.name;
};
User.prototype.getAge = function () {
  return this.age;
};
var user = new User("leo", 24);
// 下面3行等于上面的new User();
// var user = {};
// user.__proto__ = User.prototype;
// User.call(user, 'leo', 24);
console.log(user.getName); // "leo"
console.log(user.getAge); // 24


/* Example of a Private Method Only Usable by the Constructor function */
function Classroom(students, teacher) {
  function disp() {
    console.log(this.names.join(", "));
  }
  this.students = students;
  this.teacher = teacher;
}
var class1 = new Classroom([
  "john", "bob"
], "Mr.Smith");
class1.disp(); // type error, disp is not a public property of the object


/* Example of Using Privileged Methods */
function User(name, age) {
  var year = (new Date()).getFullYear() - age;
  this.getYearBorn = function () {
    return year;
  };
}
var user = new User("bob", 25);
console.log(user.getYearBorn()); // 1991
console.log(user.year); // undefined, 如果是this.yaer = ... 则为公有属性，可以访问


/* Create a new user object that accepts an object of properties */
function User(properties) {
  var that = this;
  for (var p in properties) {
    (function(prop) {
      that["get" + prop] = function() {
          return properties[prop];
      };
      that["set" + prop] = function (val) {
          properties[prop] = val; 
      };    
    })(p);
  }
}

var user = new User({name: "leo", age: 25});
console.log(user.name); // undefined
console.log(user.getname()); // "leo"
console.log(user.getage()); // 25

// Example of a Static Method
User.cloneUser = function (user) {
  return new User(user.getName(), user.getAge());
};


/* 封装 */
var packaging = function() {
  // Private
  var name = 'leo';
  var method1 = function() {
    alert('Private');
  };

  // Privileged
  this.title = 'javascript patterns';
  this.getName = function() {
    return name;
  };

  // public Static
  packaging.fullName = 'rainy leo';
  packaging.alertName = function() {
    alert(packaging.fullName);
  };

};
// public
packaging.prototype = {
  sayName: function() {
    alert('pbulic');
  }
};


/***********  继承  **********/

/* Example of Prototypal Inheritance */
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

function User(name, password) {
  this.name = name;
  this.password = password;
}
// The User object inherits all of the Person object's methods
User.prototype = new Person();

User.prototype.getPassword = function () {
  return this.password;
};


/* Classical Inheritance */
// 先声明一个超类
function Person(name) {
  this.name = name;
}

// add method
Person.prototype.getName = function() {
  return this.name;
};

// instantiantion
var reader = new Person('leo');
reader.getName();

// another class
function Author(name, books) {
  // call superclass
  Person.call(this, name); //call the superclass's constructor in the scope of this
  this.books = books;
}
Author.prototype = new Person(); // set up the prototype chain
Author.prototype.constructor = Author; // Set the constructor attribute to Author
Author.prototype.getBooks = function() { // Add a method to Author
    return this.books;
};
var m = new Author('leo', 'jsNinja');
alert(m.getBooks());
alert(m.getName());

/* Prototypal Inheritance */
var Person = {
  name: 'default name',
  getName: function() {
    return this.name;
  }
};

function clone(object) {
  function F() {}
  F.prototype = object;
  return new F();
}

var Author = clone(Person);
Author.getName();
Author.name = 'leo';
Author.getName();

Author.books = [];
Author.getBooks = function() {
  return this.books;
};

var author = [];
author[0] = clone(Author);
author[0].name = 'Dustin Diaz';
author[0].books = ['javascript design patterns'];


/* Classical Inheritance with Object.create() */
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}
// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved');
};

//Rectangle - subclass
function Rectangle() {
  Shape.call(this);
}
// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype); // 不需要调用构造函数
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);// true
console.log('Is rect an instance of Shape?', rect instanceof Shape);// true
rect.move(1, 1); // Outputs, 'Shape moved.'


/* Combination Inheritance 组合继承(原型链＋借用构造函数) */
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'green', 'blue'];
}

SuperType.prototype.sayName = function() {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name); // 没有这一行的话colors在实例间共享, 因为定义在原型链上面了

  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType

SubType.prototype.sayAge = function() {
  alert(this.age);
};

var instance1 = new SubType('leo', 25);
instance1.colors.push('balck');
alert(instance1.colors); // 'red, green, blue, black'
instance1.sayName(); // 'leo'
instance1.sayAge(); // 25

var instance2 = new SubType('rainy', 24);
alert(instance2.colors); // 'red, green, blue'
instance2.sayName(); // 'rainy'
instance2.sayAge(); // 24


/* Parasitic Combination Inheritance 寄生组合式继承*/
function inheritPrototype(subType, superType) {
  var prototypeCopy = Object.create(superType.prototype);
  prototypeCopy.constructor = subType;
  subType.prototype = prototypeCopy;
}
// 相当于下面两行
// subType.prototype = Object.create(superType.prototype);
// subType.prototype.constructor = subType;
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
  alert(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  alert(this.age);
};
