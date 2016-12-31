## Redux  

**When Do I Need Redux?**
  - Complex data flows
  - Inter-component communication
  - Non-heirarchical data 
  - many actions
  - same data used in multiple places


**Reducers**
返回新的state, 不修改传进来的state

- Forbidden in Reducers 
  1. Mutate arguments
  2. Perform side effects
  3. Call non-pure functions

  - Immutable
   
  Object.assign() , ...
  concat(), filter(), map(), reduce()...
  Immutable.js
  

**Store**  

   Store: a store holds the whole `state tree` of your app.The only way to change the state inside is to dispatch an action on int. A store is just an object with a few methods on it.
   
   - API
    1. `getState()`
    2. `dispatch(action)`
    3. `subscribe(listener)` Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.
    4. `replaceReducer(nextReducer)`


### Redux API  
 
  1. `createStore(reducer, [preloadedState], [enhancer])` Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
  
  2. `combineReducers(reducer)`
  
  3. `applyMiddleware(...middlewares)` 

   - arguments: Each middleware receive store's `dispatch` and `getState` functions as named arguments, and `return a function`. That function will be given the `next` middleware's dispatch method, and is expected to return a function of `action` calling `next(action)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real store's `dispatch` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ getState, dispatch }) => next => action`
  
  4. `bindActionCreators(actionCreators, dispatch)`
  
  5. `compose(...functions)`


## Redux-Middleware   

它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点;

applyMiddleware 实际增强了 dispatch

1. redux-thunk  

- 异步 Action Creator  

使用特定的 middleware, `action creator` 可以返回函数而不是 object. 这种情况下这个 action creator 就叫做 `thunk`  

当 action creator 返回一个函数, 该函数将被 thunk middleware 执行. 这个函数不必是纯函数, 它可以有副作用, 包括进行异步API 调用. 该函数也可以 dispatch actions

thunk middleware 知道怎样处理函数, 它把 `dispatch` and `getState` 作为参数传递给函数, 使函数自己也能 dispatch actions.

被thunk middleware调用的函数可以返回一个值, 这个值作为dispatch方法的返回值进行传递
  
2. redux-promise-middleware
  
3. redux-saga
  
  Reselect : memoize for performance

### Async Actions  

当你调用一个异步API, 有2个关键的时间点: 发起调用的时刻, 接受到结果(或者超时)的时刻.

这2个时间点通常需要应用中 state 的变化, 这需要你 dispatch 普通的同步 actions 来让 reducers 处理; 通常, 每个API 请求需要 dispatch 至少3种ctions 

* **一个 action 通知 reducers 请求开始.**
  
  reducers 处理这个 action 通过切换 state 中一个 `isFetching` 变量. 这时 UI 显示一个进度条.

* **一个 action 通知 reducers 请求成功完成.**

  reducers 处理这个 action 通过把新的数据合并到 state 并重置`isFetching`. 这时 UI会隐藏进度条, 显示得到的数据.

* **一个 action 通知 reducers 请求失败.**

  reducers 处理这个 action 通过重置 `isFetching`. 另外, 一些 reducers 会储存错误信息以便让 UI 显示出来.


# React-Redux

- Provider: Attaches app to store, wrap top-level component. (use context)

- Connect: Creates container components. Wraps container component so it's connected to the Redux store 


## <Provider store> 

Makes the Redux store available to the `connect()` calls in the component hierarchy below. Normally, you can’t use `connect()` without wrapping the root component in `<Provider>`.

If you really need to, you can manually pass store as a prop to every `connect()`ed component, but we only recommend to do this for stubbing store in unit tests, or in non-fully-React codebases. Normally, you should just use `<Provider>`.

Props
 `store` (Redux Store): The single Redux store in your application.
 `children` (ReactElement) The root of your component hierarchy.


##  connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

Connects a React container component to a Redux store.

**auguments**  

- `mapStateToProps(state, [ownProps])`: what state should I expose as props? return a object 

*If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called*. Its result must be a plain object*, and it will be merged into the component’s props. If you omit it, the component will not be subscribed to the Redux store

If `ownProps` is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated)

- `[mapDispatchToProps(dispatch, [ownProps])`: what actions do I want on props   

If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props

If a function is passed, it will be given dispatch. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way

If you omit it, the default implementation just injects `dispatch` into your component’s props.

If `ownProps` is specified as a second argument, its value will be the props passed to your component, and mapDispatchToProps will be re-invoked whenever the component receives new props.
  
**Returns**

A React component class that injects state and action creators into your component according to the specified options.

**Remarks**

 * It needs to be invoked two times. The first time with its arguments described above, and a second time, with the component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyComponent).

 * It does not modify the passed React component. It returns a new, connected component, that you should use instead.

 * The mapStateToProps function takes a single argument of the entire Redux store’s state and returns an object to be passed as props. It is often called a `selector`. Use `reselect` to efficiently compose selectors and compute derived data.
 
 

# 源码

```js

// CreateStore
function createStore(reducer, preloadedState, enhancer) {

  let state = preloadedState;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    dispatch({ type: 'INIT' });
  }

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}

// combineReducers
function combineReducers(reducers) {
  return function(state = {}, action) {
    return Object.keys(reducers).reduce(function(nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}


// bindActionCreator
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
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


// Provider
class Provider extends Component {
  getChildContex() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  render() {
    return Children.only(this.props.children);
  }
}


// Connect

```

### Example

```js
import { createStore } from 'redux'; // ES6
// var createStore = require('redux').createStore; // ES5(CommonJS)

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```
