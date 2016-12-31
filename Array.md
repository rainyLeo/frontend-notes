Method | Description | Return | Note
-------|-------------| -------|-------
concat() | joins two arrays| a new array
join(deliminator = ',') | joins all elements of an arry into a string | a new string
push() | adds one or more elements to the end of an array | the resulting length of the array | change original array
pop() | removes the last element from an array | that removed element | change original array
unshift() | adds one or more elements to the front of an array | the new length of the array | change original array
shift() | removes the first element from an array | that removed element | change original array
slice(start, end) | extracts a section of an array | a new array | 1.dont change original array, it returns a shallow copy of a portion of the array  2.If end is omitted, slice extracts through the end of the sequence (arr.length)
splice(start, deleteCount[, addElement1, addElement2, ...]) | removes elements from an array and/or adding new elements | an array containing the deleted elements.If no elements are removed, an empty array is returned | 1.change original array 2. if deleteCount is omitted, deleteCount will be equal to (arr.length - start), if deleteCount is < 0, it equals 0
reverse() | transposes the element of an array | a reference to the array | change original array
sort([compareFunction]) | sorts the elements of an array | the array | 1.the default sort order is according tho string Unicode code points 2.If compareFunction is supplied, the array elements are sorted according to the return value of the compare function
indexOf(searchElement[, fromIndex]) | search the array for searchElement | index of the first search | returns -1 if ti is not present
lastIndexOf | works like indexOf, but start at the end searches backwards
forEach(callback[, thisArg]) | executes callback on every array item |always return undefined|callback is invoked with three arguments: (element, index[optional], array[optional])
map(callback[, thisArg]) | create a new array with the results of calling a provided function on every element in this array | a new array with the result of calling | 1.don't change original array, but callback may do so 2.callback function takes three arguments:(element, index[optional], array[optional])
filter(callback[, thisArg]) | create a new array with all elements that pass the test implemented by the provided function | a new array containing the items for witch callback returned true | 1.don't change original array 2.callback invoked with arguments(element, index[optional], array[optional]) 
every(callback[, thisArg]) | tests whether all elements in the array pass the test implemented by the provided function | returns true if callback returns true for every item in the arary, otherwise false | 1.don't change original array 2.callback(element, index[optional], array[optional])
some(callback[, thisArg]) | tests whether some element in the array passed the test implemented by the provided function | returns true if callback returns true for at least one item in the array, otherwise false | 1.don't change original array 2.callback takes three arguments(element, index[optional], array[optional])
reduce(callback[, initialValue]) | applies callback(firstValue, secondValue) to reduce the list of items down to a single value | last callback result | 1.don't change original array 2. callback takes four arguments(previousValue, currentValue, currentIndex, array), initialValue(optional, could be [])
find(callback[, thisArg]) | returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned | first satisfied value or undefined | 1.don't change original array 2.callback takes three arguments(element, index, array)
findIndex(callback[, thisArg]) | The findIndex() method returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned. | index or -1| 1.don't change original array 2.callback takes three arguments(element, index, array)

注意：map(), filter(), some(), every(), reduce() callback里面大多要有return  

map的回调有可能修改原数组

```js
var a = [1, 2, 3];
a.map(function(e, i, a) {
  return e += 1; 
});
console.log(a); // [1, 2, 3]

var a = [1, 2, 3];
a.map(function(e, i, a) {
  return a[i] += 1; 
});
console.log(a); // [2, 3, 4]
```

引用类型赋值、参数传递：得到指针副本

```js
var a = [1, 2, 3];
var b = a;
b.pop(); // b.length = 2;
console.log(a); // [1, 2]  
---
var a = [1, 2, 3];
var b = a;
b = []; // b = null;
console.log(a); // [1, 2, 3] 
---
function changeArr(arr) {
  arr.length = 2;
}
var arr1 = [1,2,3];
changeArr(arr1);
console.log(arr1); // [1, 2]
---

```

数组（对象）具有相同值，并不相等，只有指向同一对象时才想等

```js
var a = [1, 2, 3];
var b = [1, 2, 3];
console.log(a === b); // false;
```