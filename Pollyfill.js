 
 Array.prototype.map2 = function(fn /*, thisArg*/) {
   var res = [];
   var thisArg;
   if (this == null) {
     throw new TypeError('Array.prototype.map2 called on null or undefined');
   }
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }

   for (let i = 0; i < this.length; i++) {
     if (i in this) {
       res.push(fn.call(thisArg, this[i], i, this));
     }
   }
   return res;
 };

 Array.prototype.forEach2 = function(fn /*, thisArg*/) {
   var thisArg;
   if (this == null) {
     throw new TypeError('Array.prototype.map2 called on null or undefined');
   }
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }
   for (let i = 0; i < this.length; i++) {
     if (i in this) {
       fn.call(thisArg, this[i], i, this);
     }
   }
 };

 Array.prototype.reduce2 = function(fn /*, initialValue*/) {
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (this.length === 0 && arguments.length === 1) {
     throw new TypeError('reduce of empty array with no initial value');
   }

   var result;
   var i = 0;
   if (arguments.length > 1) {
     result = arguments[1];
   } else {
     do {
       if (i in this) {
         result = this[i++];
         break;
       }
       // length == 1但没有初始化
       if (++i >= this.length) {
         throw new TypeError('reduce of empty array with no initial value');
       }
     } while (true);
   }

   for (; i < this.length; i++) {
     if (i in this) {
       result = fn(result, this[i], i, this);
     }
   }

   return result;
 };

 Array.prototype.filter2 = function(fn /*, thisArg*/) {
   var res = [];
   var thisArg;
   if (this == null) {
     throw new TypeError('Array.prototype.map2 called on null or undefined');
   }
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }
   for (let i = 0; i < this.length; i++) {
     if (i in this) {
       if (fn.call(thisArg, this[i], i, this)) {
         res.push(this[i]);
       }
     }
   }
   return res;
 };

 Array.prototype.some2 = function(fn /*, thisArg*/) {
   var thisArg;
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }
   for (let i = 0; i < this.length; i++) {
     if (i in this && fn.call(thisArg, this[i], i, this)) {
         return true;
     }
   }
   return false;
 };

 Array.prototype.every2 = function(fn /*, thisArg*/) {
   var thisArg;
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }
   for (let i = 0; i < this.length; i++) {
     if (i in this) {
       if (!fn.call(thisArg, this[i], i, this)) {
         return false;
       }
     }
   }
   return true;
 };

 Array.prototype.find2 = function(fn /*, thisArg*/) {
   var thisArg;
   if (typeof fn !== 'function') {
     throw new TypeError(fn + ' is not a function');
   }
   if (arguments.length > 1) {
     thisArg = arguments[1];
   }
   for (let i = 0; i < this.length; i++) {
     if (fn.call(thisArg, this[i], i, this)) {
       return this[i];
     }
   }
 };