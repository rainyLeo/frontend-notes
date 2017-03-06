`applyMiddleware()`感觉应该是redux的5个API中最绕人一个了, 它往往作为`createStore()`的第三个参数`enhancer`, 那它`enhance`了什么呢? 答案就是createStore()里面的`dispatch`函数

要把applyMiddleware()理解清楚, 要联系到createStore()这个函数, 它们会相互调用, 下面两处代码要结合起来看

applyMiddleware的函数参数为middlewares数组或只有一个middleware函数, middleware函数通常返回一个接收3次参数的柯里化
函数, 见最下面的thunk-middleware, 它有这样的语句`return ({ dispatch, getState }) => next => action =>`

```js
function applyMiddleware(...middlewares) {
  // 返回一个柯里化的函数, 接收2次参数, createStore()函数中通过
  // enhancer(createStore)(reducer, preloadedState)来调用这个返回的函数
  return (createStore) => (reducer, preloadedState, enhancer) => {
    // 这里再次调用 createStore() 得到 store 
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];
    
    // 把 getState 和 dispatch 传递给每一个middleware作为它们的第1层参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    
    // chain数组里从右往左依次调用dispatch, 把每一次调用的结果作为'参数'传递给下一个middleware(详见之前的compose那篇) 
    // 这里的'参数'就是 middleware 的第2层参数
    // 注意到store的原dispatch作为第一次调用的参数
    dispatch = compose(...chain)(store.dispatch);

    // 最后返回store, store中的 dispatch 用已经'enhance'的 dispatch 进行替换
    return {
      ...store,
      dispatch
    };
  };
}
```
createStore的相关代码, 与上面的applyMiddleware()结合起来看   

```js

 const store = createStore(
   todoApp, // reducer
   applyMiddleware(...middlewares)  //applyMiddleware() 返回的函数作为 enhancer

 );
 
// createStore()中相关代码:
function createStore(reducer, preloadedState, enhancer) {
  // 如果只传进2个参数, 且第二个为函数的话, 第二个参数赋值给 enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  // 检测 enhancer 为函数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    // 注意: 这里和上面的 applyMiddle() 联系起来了
    // 传递2次参数调用 enhancer, 即 applyMiddleware() 返回的那个函数 
    return enhancer(createStore)(reducer, preloadedState);
  }
  /* 以下省略... */
}
```  


下面来看一下redux-thunk这个middleware, 一般用于异步, 这个middleware一共只有14行
thunk-middleware 返回一个函数, 接收3次参数, 前2次参数在 applyMiddle() 中已经传递过了, 那么第3层参数呢?
实际上第3层参数就是之后 dispatch 里面的参数 action, 这个 action 可以是一个 actionCreator 返回的结果,  
- 当这个 actionCreator 返回一个函数类型的 action 时, thunk-middleware 调用这个函数并返回结果, 函数的参数为第1次传递进去的原始的 
dispatch 和 getState, 还可以另外接受一个参数 extraArgument.  
- 当 action 不是函数时, 直接返回 第2层参数调用 action 的结果, 这里的 next 为前一个 middleware 包装过的dispatch, 如果只有这 一个
middleware, 那么 next 就等于原始的 dispatch, 那就相当于没有用这个 middleware 了.

```js
function createThunkMiddleware(extraArgument) {
  
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      // action 为函数时, 调用这个函数, 并返回结果, action 通过闭包能够访问第一层参数 dispatch 和 getState
      return action(dispatch, getState, extraArgument);
    }
    // action 不是函数时, 返回第3层参数调用的结果
    return next(action);
  };
}
// 把返回的函数赋值给变量 thunk
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;  

```
