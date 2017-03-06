
# 核心概念

## State

### 单一状态树

Vuex 使用单一状态树, 也就是说, 用一个对象包含了应用的的所有 state, 它作为唯一数据源. 这也意味着每个应用通常只有一个 store. 单一状态树让我们可以直接定位任意特定的 状态片段, 轻易得到当前应用状态的快照以进行 debug

单一状态树和模块化不冲突 - 在后面的章节我们会讨论怎样把 state 和 mutations 分割到子模块中

### 把 Vuex State 引入 Vue 组件

那么我们怎样在 Vue 组件中展示 state 呢? 由于 Vuex store 是响应式的,  从它里面读取 state 的最简单的方法是在 computed 属性中返回 store state

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return store.state.count  // 这里的 store 是全局的 store
    }
  }
}
```
无论什么时候 `store.state.count` 改变, 都会重新计算 computed 属性, 并触发响应 DOM 更新.

然而, 这种模式导致组件依赖全局 store. 当使用模块化的系统时, 它需要导入 store 到每个组件中以使用 store state, 而且当测试组件时也需要模拟状态 

Vuex 提供了一种机制来从根组件把 store '注入'到所有的子组件中(通过 `Vue.use(Vuex)`)

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 store 选项
  // 这会把 store 实例注入到所有子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```
通过提供 `store` 选项到 root instance, 该 store 会注入到根组件下的的所有子组件中, 并且在子组件中可以通过 `this.$store` 访问到. 让我们更新下 Counter 的实现:

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

### The `mapState` 辅助函数

当一个组件需要使用多个 store state 属性或 getters, 把这些都声明为 computed 属性会比较啰嗦. 为了解决这个问题, 我们可以使用 `mapState` 辅助函数, 它帮助我们生成 computed getter 函数, 让我们可以少写点代码:

```js
// 在单独构建的版本(standalone builds)中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    count: state => state.count,
    // 传字符串值 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够用 `this` 获取 local state, 必须用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性名字和 state 子树名字一样时. 我们也可以传递一个字符串数组给 `mapState`

```js
computed: mapState([
  // map this.count to store.state.count
  'count'
])
``` 

### Object Spread Operator

注意到 `mapState` 返回一个对象. 我们怎样用它和局部计算属性结合在一起呢? 通常, 我们需要用一个工具函数把多个对象合并成一个, 以使我们可以把最终的对象传递给 `computed` 属性. 但是自从有了对象展开运算符, 可以简化:

```js
computed: {
  localComputed() { /* ... */ },
  // 使用对象展开运算符把此对象混合到外部对象中
  ...mapState({
    // ...
  })
}
```

### 组件也可以有局部 State

使用 Vuex 并不意味着你要把所有的 state 放入 Vuex. 虽然把更多的 state 放入 Vuex 会让你的状态变化更明显和易调试, 但有时也会使代码更啰嗦和不直观. 如果一个 state 严格属于单个组件, 最好作为局部 state. 你应该权衡一下再做决定, 以适合应用的开发


## Getters

有时候我们需要根据 store state 派生出一些 state. 例如过滤列表项并计数:

```js
computed: {
  doneTodoCount() {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要使用这个属性, 我们要么复制该函数, 或者抽取到一个共享函数然后在多处导入它 - 这两种情况都不太理想.

Vuex 允许我们在 store 中定义 "getters" (可以把它们看做 store 的 computed properties). Getters 会接收 state 作为第一个参数:

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

getters 会暴露为 `store.getters` 对象:

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

getters 也可以接收其他的 getters 作为第二个参数:
```js
getters: {
  // ...
  doneTodoCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

store.getters.doneTodoCount // -> 1
```

我们现在可以方便地在组件内使用:

```js
computed: {
  doneTodoCount() {
    return this.$store.getters.doneTodoCount
  }
}
```

### `mapGetters` 帮助函数

`mapGetters` 帮助函数把 store 的 getters 映射到局部 computed properties: 

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象
    ...mapGetters([
      'doneTodoCount',
      'anotherGetter'
      // ...
    ])
  }
}
```

如果你想要映射一个 getter 到不同的名字, 使用对象形式:

```js
...mapGetters({
  // map this.doneCount to store.getters.doneTodosCount
  doneCount: 'doneTodosCount'
})
```

## Mutations

改变 Vuex store 中 state 的唯一方法是 commit a mutation. Vuex 的 mutations 和事件很像: 每个 mutation 有一个字符串的事件类型 `type` 和一个回调函数 `handler`. 这个回调函数 handler 就是我们进行实际的 state 更改的地方, 它接收 state 作为第一个参数:

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      // 更改 state
      state.count++
    }
  }
})
```

你不能直接调用 mutation handler. 这个选项更像是事件注册: "当触发一个 type 为 `increment` 的 mutation 时, 调用这个 handler". 为了调用 a mutation handler, 你需要用它的 type 调用 `store.commit`

```js
store.commit('increment')
```

### Commit with payload

你也可以多传一个参数给 `store.commit`, 该参数在 mutation 中叫载荷(payload)

```js
// ...
mutations: {
  increment(state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```

在大多数情况下, payload 应该是是一个对象, 这样它可以包含多个字段(fields), 并且记录的 mutation 也可以更有描述性:

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```

### Object-Style Commit

commit a mutation 的另一种方法是直接使用带有 `type` 属性的对象:

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的 commit 时, 整个对象会作为 payload 传给 mutation handler, 因此 handler 保持不变:

```js
mutations: {
  increment(state, payload) {
    state.count += payload.amount
  }
}
```

### Silent Commit

### Mutations 需遵守 Vue 响应规则

因为 Vuex store 的 state 是响应式的, 当我们改变 state 时, 监视 state( observing) 的 Vue 组件也会自动更新. 这也意味着 Vuex 的 mutations 也需要与使用 Vue 一样遵守一些注意事项:

 1. 初始化 store 的 state 时, 提供 state 需要的所有字段
 2. 当需要在对象上添加新的属性时, 你应该:
  * 用 `Vue.set(obj, 'newProp', 123)` 或 - 
  * 用新对象替换原有对象. 例如用 stage-3 对象展开语法可以这样写:
   `state.obj = { ...state.obj, newProp: 123 }`

### 使用常量描述 Mutation 类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: {...},
  mutations: {    
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```
有多个开发者参与的大型项目用常量比较方便

### Mutations 必须是同步的

一个要记住的重要规则是 mutation handler 函数必须是同步的

### 在组件中 Commiting Mutations 

你可以在组件中用 `this.$store.commit('xxx')` 来 commit mutations, 或使用 `mapMutations` 帮助函数, 它把组件的方法映射为 `store.commit` 调用(需要在根节点注入 store)

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),
    ...mapMutations({
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    })
  }
}
```

- 下一步: Actions
在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你能调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，**mutation 都是同步事务**：

``` js
store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
```

为了处理异步操作，让我们来看一看 Actions

## Actions

Action 类似于 mutations, 不同在于:
 * Action commit mutations, 而不是直接改变状态
 * Actions 可以包含异步操作

让我们注册一个简单的 action:

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})
```

Action handler 接收一个 context 对象, 它和 store 实例具有同样的方法和属性, 因此你可以调用 `context.commit` 来 commit a mutation, 或通过 `context.state`, `context.getters` 来访问 state 和 getters. 我们之后介绍到 module 时你就知道为什么这个 context 对象不是 store 实例了.

实践中, 我们也可以用 ES6 的参数结构来简化一下(尤其当我们需要多次调用 commit 时)

```js
actions: {
  increment({ commit }) {
    commit('increment')
  }
}
```

### Dispatching Actions

Actions 可以用 `store.dispatch` 方法来触发:

```js
store.dispatch('increment')
```

第一眼看起来有点蠢, 为什么不直接调用 mutation - store.commit('increment')? 记得 mutations 必须是同步的吗? Actions 则不必.可以在 action 内进行异步操作:

```js
actions: {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的 payload 格式和对象风格的 dispatch:

```js
// dispatch with a payload
store.dispatch('incrementAsync', {
  amount: 10
})

// dispatch with an object
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

### 在组件中 Dispatching Actions

你可以在组件中用 `this.$store.dispatch('xxx')` 来 dispatch actions, 或者用 `mapActions` 把组件方法映射为 `store.dispatch`(需要先在根节点注入 store, root store injection)

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
```

### Composing Actions

Actions 经常是异步的, 那我们怎么知道一个 action 什么时候完成了呢? 更重要的是, 我们怎样把多个 actions 组合在一起, 以处理更复杂的异步流程呢?

第一件要清楚的事情是 `store.dispatch` 可以处理(被触发的 action  handler 返回的) Promise, 它也可以返回 Promise.

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以:

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

也可以在其他的 action 中:

```js
actions: {
  // ...
  actionsB({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
 最后, 如果我们用了 async / await, 我们可以这样组合 actions:
 
 ```js
 // 假设 getData() 和 getOtherData() 返回 Promise
 
 actions: {
   async actionA({ commit }) {
     commit('gotData', await getData())
   },
   async actionB({ dispatch, commit }) {
     await dispatch('action') //  wait for actionA to finish
     commit('getOtherData', await getOtherData())
   }
 }
 ```
> store.dispatch 也可以在不同的模块中触发多个 action 处理函数. 这种情况下返回值是一个 Promise, 当所有的处理函数 resolve 时该 Promise resolve.

## Modules

因为使用了单一状态树, 应用的所有 state 都在一个大的对象中. 然而, 当我们的应用变得庞大时, store 会很臃肿.

为了解决这个, Vuex 允许我们把 store 分在不同的模块中. 每个模块可以包含它自己的 state, mutations, actions, getters 甚至自己的子模块:

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 's state
store.state.b // -> moduleB 's state 
```

### Module Local State

在模块内部的 mutations 和 getters 中, 第一个参数是模块的局部 state.

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment: (state) {
      // state is the local module state
      state.count++
    }
  },
  
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
}
```

类似地, 在模块 actions 内部, `context.state` 是局部 state, 而且 root state 是 `context.rootState`:

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOdd ({ state, commit }) {
      if (state.count % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

 同样, 在模块 getters 内部, root state 将作为第3个参数:
 
 ```js
 const moduleA = {
   // ...
   getters: {
     sumWithRootCount(state, getters, rootState) {
       return state.count + rootState.count
     }
   }
 }
 ```

### Namespacing

注意到 actions, mutations 和 getters 在模块内部是注册在全局 namespace 下的 - 这允许多个模块响应同样的 mutation/action type. 你可以自己用前缀或后缀 namespace 模块以避免命名冲突. 你应该这样做尤其当你写一个被使用在不同环境下的可复用的 Vuex 模块. 例如, 我们创建一个 todo 模块:

```js
// types.js

// define names of getters, actions and mutation as constants
// and they are prefixed by the module name 'todos'
export const DONE_COUNT = 'todos/DONE_COUNT'
export const FETCH_ALL = 'todos/FETCH_ALL'
export const TOGGLE_DONE = 'todos/TOGGLE_DONE'

// modules/todos.js
import * as types from '../types'

// define getters, actions and mutations using prefixed names
const todosModule = {
  state: { todos: [] },
  
  getters: {
    [types.DONE_COUNT] (state) {
      // ...
    }
  },
  
  actions: {
    [types.FETCH_ALL] (context, payload) {
      // ...
    }
  },
  
  mutations: {
    [types.TOGGLE_DONE] (state, payload) {
      // ...
    }
  }
  
}
```

### Dynamic Module Registration

你可以用 `store.registerModule` 在 store 被创建后注册一个模块:

```js
store.registerModule('myModule', {
  // ...
})
```

模块的 state 将暴露为 `store.state.myModule`

动态模块注册可以让其他 Vue 插件可以用 Vuex 来进行 state 管理, 通过把模块附加到应用的 store 上. 例如, vuex-router-sync 库集成 vue-router 和 vuex, 通过 在一个动态附加的模块内管理应用的 route state

你也可以用 `store.unregisterModule(moduleName)` 动态移除一个模块. 注意你不能用这个方法移除静态模块(在 store 创建时声明的)


# API 参考

### Vuex.Store

```js
import Vuex from 'vuex'
const store = new Vuex.Store({ ...options })
```

### Vuex.Store 构造器选项

 * state
  type: `Object`
  
  The root state object for the Vuex store
  
 * mutations
  type: `{ [type: string]: Function }`
  
  在 store 上注册 mutations. handler 函数总是接收 `state` 作为第一个参数(会是模块 local state, 如果定义在模块中), 接收 `payload` 作为第二个参数(可选)
  
 * actions
 
  type: `{ [type: string]: Function}`
  
  在 store 上注册 actions. handler 函数接收 `context` 对象, 包含以下属性:
  
  ```js
  {
    state, // 等同于 store.state, 若在模块中则为 local state
    rootState, //  等同于 store.state, 只存在于模块中
    commit, //  等同于 store.commit
    dispatch, //  等同于 store.dispatch
    getters //  等同于 store.getters
  }
  ```
  
 * getters
 
  type: `{ [key: string]: Function }`
  
  在 store 上注册 getters. getter 函数接收以下参数:
  
  ```js
  state, // 如果在模块中定义则为模块的 local state
  getters, // 等同于 store.getters
  rootState // 等同于 store.state
  ```
  
  注册的 getters 暴露为 `store.getters`
  
 * mudules
 
  type: `Object`
  
  一个包含该合并到 store 中子模块的对象, 形如:
  ```js
  {
    key: {
      state,
      mutations,
      actions?,
      getters?,
      modules?
    }
  }
  ```
 每一个模块可以包含 `state`, `mutations`. 模块的 state 将附加到 store 的 root state 上, 用模块的 key. 模块的 mutations 和 getters 只接收模块的 local state 作为第一个参数而不是 root state, 模块 action 的 `context.state` 也指向 local state
 
 * plugins
 
  type: `Array<Function>`
  
  一个包含插件函数的数组, 它将应用到 store 上. 插件接收 store 作为唯一参数并且可以监听 mutations 或 dispatch mutations
  
 * strict
  type: `Boolean`
  default: `false`
  
  强制 Vuex store 为严格模式. 在严格模式中, mutation handler 之外的 Vuex state mutation 会报错.
  
### Vuex.Store 实例属性

 * state
 
  type: `Object`
  
  The root state. 只读
  
 * getters
 
  type: `Object`
  
  暴露注册的 getter. 只读
  
### Vuex.Store 实例方法

 * `commit(type: string, payload?: any) | commit(mutation: Object)`
 
  Commit a mutation
  
 * `dispatch(type: string, payload?: any) | dispatch(action: Object)`
 
  Dispatch an action. Return a Promise that resolves all triggered action handler.
  
 * `replaceState(state: Object)`
 
  Replace the store's root state. Use this only for state hydration / time-travel purposes
  
 * `watch(getter: Function, cb: Function, options?: Object)`
 
  响应式地 watch a getter function's 返回值, 当返回值改变时 call the callback. getter 接收 store's state 作为唯一参数. 接收一个可选的选项对象, 它和 Vue 的 `vm.$watch` 有同样的选项.
  
  要想停止 watch, 调用返回的 handler function
  
 * `subscribe(handler: Function)`
 
  Subscribe to store mutations. `handler` is called after every mutation and receives the mutation descriptor and post-mutation state as arguments:
  
  ```js
  store.subscribe((mutation, state)) => {
    console.log(mutation.type)
    console.log(mutation.payload)
  }
  ```
  
  通常用于插件
  
  * `registerModule(path: string | Array<string>, module: Module)`
  
   注册一个动态的 module
   
  * `unregisterModule(path: string | Array<string>)`
  
   取消注册动态 module
   
  * `hotUpdate(newOptions: Object)`
  
   Hot swap new actions and mutations
   
### Component Binding Helpers

   * `mapState(map: Array<string> | Object): Object`
    Create component computed options that return the sub tree of the Vuex store
   * `mapGetters(map: Array<string> | Object): Object`
    Create component computed options that return the evaluated value of a getter
   * `mapActions(map: Array<string> | Object): Object`
    Create component methods options that dispatch an action
   * `mapMutations(map: Array<string> | Object): Object`
    Create component methods options that commit a mutation







