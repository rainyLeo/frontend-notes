
bindActionCreators接收2个参数, actionCreators和dispatch, 返回dispatch之后的action
actionCreators可以是一个函数, 也可以是包含几个函数的对象  

```js
// 返回一个函数, 函数接收的参数传入actionCreator产生一个action, 再dispatch这个action
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

function bindActionCreators(actionCreators, dispatch) {
  // actionCreators是一个函数, 直接返回
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  // actionCreators 不是函数或对象时抛出错误
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    );
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  // 循环中把每一个actionCreator传入dispatch中, 把结果保存在一个对象中
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  // 返回这个对象, 对象中每一项都是一个函数, 每个函数接收各自的参数产生action并dispatch这个action
  return boundActionCreators;
}

```
看一个例题, 下面2种写法是一样的

```js
 const mapDispatchToProps = (dispatch) => ({
   onClick: bindActionCreators(toggleTodo, dispatch)
 });
 
 const mapDispatchToProps = (dispatch) => ({
   onClick: (id) => {
     dispatch(toggleTodo(id));
   }
 });
```