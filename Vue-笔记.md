`computed` 函数默认为 getter, 没有参数, 可以添加 setter; 可以 cache, 不需要 cache 用 methods

style 动态绑定要加 : , `:style="{ }"`

选择框 checkbox 也可以绑定, `v-model="todo.completed"`

`v-on` 可以接内联语句(a++), 其他指令一般只能接表达式
自定义组件也可以

```html
<button v-on:click="doThis"></button>
<button v-on:click="doThat('hello', $event)"></button>

<my-component @my-event="handleThis"></my-component>
<my-component @my-event="handleThis(123, $event)"></my-component>

```

`v-bind` 接的是表达式, 其他绑定(mustache)也是, 对象字面量属于表达式
 v-bind, {{ }} 里面可以放函数调用, `v-bind="fullName('leo')"`,  `{{ fullName('leo') }}`

`message.split('')` 是表达式

函数调用 `f('a')` 是表达式还是语句 ??

mapState, mapGetters 写在 `computed` 里, mapMutations, mapActions 写在 `methods` 里

`this.$set(this.list[index],'status',true)` // 通过set的方法让数组的变动能够让Vue检测到

v-if和v-for放在一个元素内同时使用，因为Vue总会先执行v-for，所以导致v-if不会被执行。替代地，你可以使用一个额外的template元素用来放置v-if或者v-for从而达到同样的目的

自定义组件添加原生事件要加 .native `<my-component @click.native="doThis"></my-component>`

父模板向子组件传 props 时, 如果把直接拿出来传, 不会触发更新, 而且会报错 'mutate props', 如果传递一个数组或对象, 则会正常更新.(因为传递的是引用)

```js
// main.js
template: '<App msg="haha"/>',
components: { App }

// 等于
render(h) {
	return h(App)
}
// ES6: render: (h) => h(App)


// 或(JSX)
render(h) {
	return <App />
}
```

There are two builds available, the standalone build and the runtime-only build. The difference being that the former includes the template compiler and the latter does not.

If you `import Vue from 'vue'` you get the runtime only build that cannot compile templates (either in-dom templates or template option).
In this case you need the standalone build, here is a helpful section explaining this:
https://vuejs.org/guide/installation.html#Standalone-vs-Runtime-only-Build

By default, the NPM package exports the runtime-only build. To use the standalone build, add the following alias to your Webpack config:

```js
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}
```

The runtime-only build does not include the template compiler, and does not support the `template` option. You can only use the `render` option when using the runtime-only build, but it works with single-file components, because single-file components’ templates are pre-compiled into `render` functions during the build step. 


- keep-alive
If you want to keep the switched-out components in memory so that you can preserve their state or avoid re-rendering, you can wrap a dynamic component in a `<keep-alive>` element:
路由切换时组件不更新,报错: TypeError: Cannot read property '$el' of undefined, 但手动刷新页面可以
解决: router-view 加 keep-alive


## 还不熟悉
mixin
slot
自定义组件, 指令
插件

