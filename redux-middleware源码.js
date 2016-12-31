/*eslint-disable*/
/********** Middleware **********/


/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. 
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];
    
    // 把 getState和dispatch传递给每一个middleware作为它们的第一个参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    
    
    // chain数组里从右往左依次调用dispatch, 把每一次调用的结果作为参数传递给下一个middleware, 详见compose()
    // dispatch 为 middleware 的第二个参数
    // 最后再赋值给 dispatch进行增强
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}


// 写法2
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   let middlewares = [promiseMiddleware, loggerMiddleware];

//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// };
// 
// 
 /** 其他相关代码: **/

 const store = createStore(
   todoApp,
  //applyMiddleware()返回的柯里函数作为enhancer
   applyMiddleware(...middlewares)
 );
 
// createStore() 相关:
function createStore(reducer, preloadedState, enhancer) {
  // 如果只传进2个参数, 且第二个为函数的话, 第二个参数变为enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  // 检测enhancer为函数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    // 传递2次参数调用 enhancer, 调用的结果直接作为 creatStore() 的结果返回 
    return enhancer(createStore)(reducer, preloadedState);
  }
  // 省略...
}

// compose 
function compose(...funcs) {
  return function() {
    let last = funcs[funcs.length - 1];
    let rest = funcs.slice(0, -1);

    return rest.reduceRight(function(composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}




/***** thunk middleware *****/

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;  

 
// 写法 2
// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function' ?
//     action(store.dispatch) :
//     next(action);


/** Promise middleware , add promise support to dispatch **/

const promiseMiddleware = (store) => {
  const next = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next);
    }
    return next(action);
  };
};
  /* 写法2
  const promiseMiddleware = (store) => {
    return (next) => {
      return (action) => {
        if (typeof action.then === 'function') {
          return action.then(next);
        }
        return next(action);
      };
    };
  }

   ** 写法3 **
  const promiseMiddleware = (store) => (next) => (action) => {
    if (typeof action.then === 'function') {
      return action.then(next);
    }
    return next(action);
  }
*/ 


