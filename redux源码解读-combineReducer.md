

接收一个包含几个不同reducer的对象, 返回一个合并的reducer. 当这个合并的reducer接收到action时, 会调用每一个子reducer, 把它们的结果放到单一的state对象中, state对象的属性对应各自reducer中的state

```js
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  // 用循环把reducers中的每一项复制到finalReducers对象中
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    // 判断node环境, 非生产环境时当传入的reducer不存在时进行警告
    if (NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }
    // 检查reudcer为函数时, 复制该reducer到finalReducers 
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  // 保存finalReducers的属性名
  // Object.keys()返回对象中可枚举的自有的属性名
  var finalReducerKeys = Object.keys(finalReducers)

  if (NODE_ENV !== 'production') {
    var unexpectedKeyCache = {}
  }
  // assertReducerSanity函数会检查reducer的返回值, 如果返回的state为undefined会报错
  // 因此reducer一定要有一个default语句返回原state
  var sanityError
  try {
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }
  /* 第二部分, 返回一个合并的reducer函数 */
  return function combination(state = {}, action) {
    if (sanityError) {
      throw sanityError
    }
    // 参数检查, finalReducerKeys()的length不能为0, state应该为plain object
    if (NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    var hasChanged = false
    var nextState = {}
    // 循环中调用每一个reducer, 得到新的state
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      // 调用reducer, 得到新的state
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      // 判断state是否改变, 因为reducer为纯函数, 不会修改原state, 可以直接用!==来比较前后state是否相等
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // state改变时返回新的state, 否则返回原state
    return hasChanged ? nextState : state
  }
}
```