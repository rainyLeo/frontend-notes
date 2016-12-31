/* eslint-disable */

function f(x, y) {
  x = 10;
  console.log(
    arguments[0],
    arguments[1]
  );
}
 
f(); 
// undefined, undefined, 不是10, undefined

({
  x: 10,
  foo: function () {
    function bar() {
      console.log(x);
      console.log(y);
      console.log(this.x);
    }
    with (this) {
      var x = 20;
      var y = 30;
      bar.call(this);
    }
  }
}).foo();
// undefined, 30, 20