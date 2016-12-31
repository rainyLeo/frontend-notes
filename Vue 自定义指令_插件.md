## 自定义指令

**接收**

除了默认设置的核心指令(v-model 和 v-show), Vue 也允许注册自定义指令。注意，在 Vue2.0 里面，代码复用的主要形式和抽象是组件 — 然而，有的情况下, 你需要对元素进行 DOM 访问, 这时候自定义指令就会有用。下面这个例子将聚焦一个 input 元素，像这样：

当页面加载时，元素将获得焦点。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：

```js
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // focus 该元素
    el.focus()
  }
})
```

如果你想注册一个局部指令，组件也可以接收一个 `directives` 的选项：

```js
directives: {
  focus: {
    // 指令的定义---
  }
}
```

然后你可以在模板中任何元素上使用新的 `v-focus` 属性：

```html
<input v-focus>
```

**钩子函数**

指令定义对象可以有几个钩子函数(都是可选的)

 * bind: 仅调用一次, 当指令第一次绑定元素时. 这里你可以做一下一次性工作
 * inserted:  当绑定的元素插入父节点时调用
 * update: 在包含组件更新后调用, 但可能在它的子组件更新之前. 指令的值可能变或没变, 但你可以通过
  对比 current value 和 old value 跳过不必要的更新
 * componentUpdated: 当包含元素和它的子组件更新时调用
 * unbind: 仅调用一次, 当指令从元素取消绑定时

**指令钩子参数**

指令钩子有这些参数:

 * el: 指令绑定的元素. 这可以用来直接操作 DOM
 * binding: 包含以下属性的对象
   - name: 指令名称, 没有 v-前缀
   - value: 传递给指令的值. 例如 `v-my-directive="1+1"`, value 为 2
   - oldValue: 之前的值, 只在 update, componentUpdated 中可用
   - expression: 字符串表达式
   - arg: 传给指令的参数, 如果有的话. 例如`v-my-directive: foo`, arg 为 'foo'
   - modifiers: 包含修饰符的对象.
 * vnode: Vue 编译器产生的虚拟节点
 * oldVnode, 之前的虚拟节点

> 除了 el, 把这些参数当成只读. 如果你需要在钩子间传递共享信息, 推荐通过元素的 dataset

一个自定义指令的例子:

```html
<div id="hook-arguments-example" v-demo:hello.a.b="message"></div>
```
```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

**函数缩写**

大多情况下, 你想要 bind 和 update 有同样的行为, 且不关心其他的钩子.

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

**对象字面量**

如果你的指令需要多个 value, 你也可以传递一个对象字面量. 记住, 指令可以接收任何有效的 JavaScript 表达式.

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```


## 插件

**写一个插件**

插件通常给 Vue 添加全局的功能. 有几种类型的插件:

  1. 增加全局的方法或属性, 例如 vue-element
  2. 增加一个或多个全局 assets: 指令/过滤器/过渡效果, 例如 vue-touch
  3. 提供全局 mixnin 增加一些组件选项, 例如 vuex
  4. 增加一些 Vue 实例方法, 通过把它们附加到 Vue.prototype
  5. 一个提供资金 API 的库, 同时注入以上的组合, 例如 vue-router
  
Vue 插件应该暴露一个 `install` 方法. 该方法接收 Vue 构造器作为第一个参数, 并带有 options

```js
MyPlugin.install = function (Vue, options) {
  // 1.添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // something logic ...
  }
  // 2. 添加全局 asset
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // something logic ...
    }
    ...
  })
  // 3. 注入组件 options
  Vue.mixin({
    created: function () {
      // something logic ...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // something logic ...
  }
}

```

**使用组件**

通过 调用 Vue.use() 全局方法使用组件

```js
// calls `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
```

你可以选择性地传递一下 options

```js
Vue.use(MyPlugin, { someOption: true })
```

一些 Vue 官方插件例如 vue-router 会自动调用 Vue.use(), 如果 Vue 是一个全局变量.
但是在模块环境比如 CommonsJS 中, 你需要显示调用 Vue.use()

```js
// When using CommonJS via Browserify or Webpack
var Vue = require('vue')
var VueRouter = require('vue-router')
// Don't forget to call this
Vue.use(VueRouter)
```

















