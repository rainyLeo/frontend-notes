Redux一共有5个公共方法, 先说第一个createStore(), 函数参数可以接收3个参数, reducer, preloadedState, enhancer, 返回一个对象, 该对象包含4个公有方法, 分别为getStore(), subscribe(listener), dispatch(action), replaceReducer(nextReducer). createStore函数使用了设计模式中的暴露模块模式(Revealing Module Pattern)  


```js  

function createStore(reducer, preloadedState, enhancer) {
  // 第一部分, 参数判断, createStore有3个参数, 第二个指定初始的state, 第三个可以为applyMiddleware(), 后两个都是可选的 

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    // 如果只传递2个参数而且第二个参数是函数的话, 把第二个参数赋值给变量enhancer
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== 'undefined') {
    // 如果有3个参数, 但第三个参数enhancer不是函数的话, 抛出错误
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    // 到这里时createStore的参数数量可能是2个(上面那种情况), 也可能是3个, 所以preloadedState的值可能存在或为undefined
    // 注意: 这里直接返回结果(这里的代码在applyMiddleware的时候会用到)
    return enhancer(createStore)(reducer, preloadedState);
  }
  // 如果reducer不是函数类型抛出错误
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

// 第二部分 定义私有变量和方法 

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  // 对原listeners数组做了一次拷贝 确保不会修改原listeners数组
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  // store的第一个方法, state作为私有属性, 只能通过getState()来访问, 确保state不会被无故修改
  function getState() {
    return currentState;
  }

  // store的第二个方法
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    // 把当前的参数listener放入数组
    nextListeners.push(listener);
    // 返回一个函数, 当该函数被调用时会从数组里删除当前的listener
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();

      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  // store的第三个方法
  function dispatch(action) {
    // 确保action是通过{}或new Object()定义的对象
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      );
    }
    // action必须要有一个type属性, 否则报错
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      );
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      // 调用reducer, 传入当前state 和 action 得到新的 state  
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    // listeners数组的每个listener都执行一次
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
    // 返回原action
    return action;
  }

  // store的第四个方法, 替换reducer
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }
  // 执行一次dispatch, reducer返回它们自己的初始state, 从而初始化store的state
  dispatch({ type: ActionTypes.INIT });


  // 第三部分: 返回值, 返回一个包含4个公有方法的对象, 这4个方法都是闭包, 可以一直保持对私有变量的访问. 

  // 这里用的ES6的写法, 相当于dispatch: dispatch, 把dispatch函数作为属性值, dispatch变量名作为属性名
  // 这4个方法都为createStore()函数的返回值的属性, 所以可以用store.dispatch()来调用 
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
  };
}
```