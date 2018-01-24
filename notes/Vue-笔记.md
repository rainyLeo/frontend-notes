

`computed` 函数默认为 getter, 没有参数, 可以添加 setter; 可以 cache, 不需要 cache 用 methods
能用 computed的 地方不要用函数或 watch, 有异步操作用 watch


style 动态绑定要加 : , `:style="{ }"`

选择框 checkbox 也可以绑定, `v-model="todo.completed"`

`v-on` 可以接内联语句(a++), 其他指令一般只能接表达式
自定义组件也可以

传函数名时参数为event, 传 inline function时加 $event 参数

```html
<button v-on:click="doThis"></button>
<button v-on:click="doThat('hello', $event)"></button>

<my-component @my-event="handleThis"></my-component>
<my-component @my-event="handleThis(123, $event)"></my-component>

```

`v-bind` 接的是表达式, 其他绑定(mustache)也是, 对象字面量属于表达式
 v-bind, {{ }} 里面可以放函数调用, `v-bind="fullName('leo')"`,  `{{ fullName('leo') }}`

尽量不要在 {{ }} 里面放函数调用, 而是使用 filter

<!-- `{{ formatDate(article.createdAt) }}` 出错! -->

`message.split('')` 是表达式

函数调用 `f('a')` 是表达式还是语句 ??, 猜测是表达式

对象的添加删除要用 .set 变为响应式的, 对象的修改本来就是响应式的
数组通过 index 或修改 length不是响应式的
如果数组的每一项时对象, 这时通过数组的 index 改变某项的值是响应式的

`this.$set(this.list[index], 'status', true)` // 通过set的方法让数组的变动能够让Vue检测到

v-for 可以用于对象; 可以用 of; 要加上 key
v-if, v-for, v-show 可以用在 template 上

v-if 和 v-for 放在一个元素内同时使用，因为 Vue 总会先执行 v-for，所以导致 v-if 不会被执行。替代地，你可以使用一个额外的 template 元素用来放置 v-if 或者 v-for 从而达到同样的目的

v-if vs v-show: v-show 切换的是 css display 属性, 总是会渲染在 DOM 中, 而 v-if 不会渲染在 DOM 中

is 属性: <li is="todo-item"></li>

修饰符 .stop, .prevent, .self, .capture 只能用于原生事件, .once 还可以用于自定义事件

自定义组件添加原生事件要加 .native `<my-component @click.native="doThis"></my-component>`,
不然监听的就是自定义事件

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

new Vue({
    el: ''
})

// 没有el时要手动 $mount, 或者 append 到 DOM上
```

filter 用来格式化文本

<component is=""><component> 动态组件

class 和 style 可以用对象或数组写法, 对象的 key 为 class 名, value 为 boolean 变量,
数组中一般放 class 名的字符串或变量名; 可以和普通的 class 混用; 数组中也可以包含对象写法

sass 加入 scoped 有时部分 css 会失效(第三方组件, 比如elementUI)

`<slot></slot>` 在子组件中使用, 父组件中子组件便签内的内容渲染在 slot 内, 如果 slot 没有名字, 则内容在 `$slots.default`, 和 `$slots.children` 不一定一样(有可能有其他 slot); scopedSlot 可以用来向父组件传参数

mixin 在组件之间复用一些函数和生命周期等

自定义事件 $emit 可以传值

全局组件安装用 Vue.component(), 局部组件安装用 components: { componentName }

Vue.extend() 注册组件构造函数, 其他组件可以通过 new 生成

插件安装用 Vue.use(), 插件要有 install 方法

ref 用于获取 child component, 不是响应式的

v-else 的使用, watch 的使用
getter/setter 的使用(例如 computed 里)
Object.defineProperty 的使用


- keep-alive
If you want to keep the switched-out components in memory so that you can preserve their state or avoid re-rendering, you can wrap a dynamic component in a `<keep-alive>` element:
路由切换时组件不更新,报错: TypeError: Cannot read property '$el' of undefined, 但手动刷新页面可以
解决: router-view 加 keep-alive

由于 JavaScript 的限制， Vue 不能检测以下变动的数组：
当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如： vm.items.length = newLength

## vuex

mapState, mapGetters 写在 `computed` 里, mapMutations, mapActions 写在 `methods` 里


## 还不熟悉
mixin, extends
slot, keep-alive
key, ref
render
插件
filters
functional
$options, $parent, $root, $slots, $refs
$set, $watch, $delete, $on, $off, $emit,
$mount, $forceUpdate, $nextTick, $destroy
