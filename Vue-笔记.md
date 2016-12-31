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

