# 基础

## 介绍

### Vue.js 是什么

Vue 采用自底向上增量开发的设计. Vue 的核心库只关注视图层, 非常容易学习和与其他库或已有项目整合. 另一方面, Vue 完全有能力驱动采用单文件组件和 Vue 生态系统所支持的库开发的复杂单页应用

Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件.

### 声明式渲染

Vue 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统:

```html
<div id="app">
  {{ message }}
</div>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue'
  }
})
```
看起来这和渲染一个字符串模板很类似, 但是 Vue 在背后做了大量工作. 现在数据和 DOM 已经被绑定在一起, 所有的元素都是响应式的. 打开浏览器控制台, 修改 app.message, 你会看到相应地更新.

除了绑定插入的文本内容, 我们还可以采用这种方式绑定 DOM 元素属性:

```html
<div id="app-2">
  <span v-bind:title="message">
    Hover 
  </span>
</di>
```
```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loade page on' + new Date()
  }
})
```

v-bind 属性称为指令. 指令带有前缀 v-, 以表示它们是 Vue 提供的特殊属性. 它们会在渲染过的 DOM 上应用特殊的响应式行为. 这个指令的含义是: 将这个元素的 title 属性和 Vue 实例的 message 属性绑定到一起.

你在浏览器的控制台输入 app2.message = 'some new message', 你会看到这个绑定了 title 属性的 HTML 已经进行了更新

### 条件与循环

控制切换一个元素的属性也相当简单:

```html
<div id="app-3">
  <p v-if="seen">Now you see me</p>
</div>
```
```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

继续在控制台设置 app3.seen = false, 你会发现 "Now you see me" 消失了.
这个例子演示了我们不仅可以绑定 DOM 文本到数据, 也可以绑定 DOM 结构到数据. 而且, Vue 也提供了一个强大的过渡效果系统, 可以再 Vue 插入/删除元素时自动应用过渡效果

也有一些其他指令, 每个都有特殊的功能. 例如, v-for 指令可以用来自数组中的数据来渲染一个列表:

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'learn JavaScript' },
      { text: 'learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
```

在控制台, 输入 app4.todos.push({ text: 'New item '}). 你会发现列表中多了一栏新内容

### 处理用户输入

为了让用户和你的应用进行互动, 我们可以用 v-on 指令绑定一个事件监听来调用 Vue 实例中的方法:

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```
```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.messsage.split('').reverse().join('')
    }
  }
})
```

在 reverseMessage 方法中, 我们在没有接触 DOM 的情况下更新了应用的状态 - 所有的 DOM 操作都有 Vue 来处理, 你只写的代码只需要关注基本逻辑.

Vue 也提供了 v-model 指令, 它使得在表单输入和应用状态中做双向数据绑定变得非常轻巧.

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue'
  }
})
```

### 用组件构建(应用)

组件系统是 Vue 的另一个重要概念, 因为它提供了一种抽象, 让我们可以用独立可复用的小组件来构建大型应用. 如果我们考虑到这点, 几乎任意类型的应用的界面都可以抽象为一个组件树.

在 Vue 里, 一个组件实际上是一个拥有预定义选项的 Vue 实例:

```js
// 定义一个叫做 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
```

现在你可以在另一个组件的模板中引入它

```html
<ul>
  <!-- 创建一个 todo-item 组件实例 -->
  <todo-item></todo-item>
</ul>
```

但是这样会为每个 todo 渲染同样的文本. 我们应该将数据从父作用域传到子组件. 让我们修改一下组件的定义, 使他能够接受一个 prop 属性:

```js
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

现在, 我们可以用 v-bind 指令将 todo 传到每一个重复的组件中:

```html
<div id="app-7">
  <ol>
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```
```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```

这只是一个假设的例子, 但是我们已经将应用分割成了2个更小的单元, 子元素通过 props 接口实现了与父元素很好的解耦. 我们现在可以在不影响父应用的基础上, 进一步为我们的 todo 组件改进更多复杂的模板和逻辑.

在一个大型应用中, 为了使得开发过程可控, 有必要将应用整体分割成一个个组件. 在后面的教程中我们将详述组件, 不过这里有一个假想的例子, 看看使用了组件的应用模板是什么样的:

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

**与自定义元素的关系**

你可能已经注意到 Vue 组件非常类似于自定义元素 — 它是 Web Component 规范的一部分。实际上 Vue 的组件语法参考了该规范。例如 Vue 组件实现了 Slot API 与 is 特性。但是，有几个关键的不同：

 1. Web 组件规范仍然远未完成，并且没有浏览器实现。相比之下，Vue 组件不需要任何补丁，并且在所有支持的浏览器（IE9 及更高版本）之下表现一致。必要时，Vue 组件也可以放在原生自定义元素之内。

 2. Vue 组件提供了原生自定义元素所不具备的一些重要功能，比如组件间的数据流，自定义事件系统，以及动态的、带特效的组件替换


## Vue 实例

### 构造器

每个 Vue vm 都是通过 Vue 构造器创建一个 Vue 的根实例启动的:

```js
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 MVVM 模式, Vue 的设计无疑受到了它的启发. 因此在文档中经常会使用 vm 这个变量名表示 Vue 实例

在实例化 Vue 时, 需要传入一个选项对象, 它可以包含数据, 模板, 挂载元素, 方法, 生命周期钩子等.

可以扩展 Vue构造器, 从而用预定义选项创建可复用的组件构造器:

```js
var MyComponent = Vue.extend({
  // 扩展选项
})

// 所有的 MyComponent 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

尽管可以命令式地创建扩展实例, 不过在多数情况下建议将组件构造器注册为一个自定义元素, 然后声明式地用在模板中. 我们将在后面详细说明组件系统. 现在你只需要知道所有的 Vue 组件其实都是被扩展的 Vue 实例.

### 属性和方法

每个 Vue 实例都会代理其 `data` 对象里所有的属性:

```js
var data = { a: 1 };
var vm = new Vue({
	data: data
})
vm.a === data.a // true

// 设置属性也会影响到原始数据
vm.a = 2;
data.a // 2

// ... 反之亦然
data.a = 3;
vm.a // 3
```

注意只有这些被代理的属性是 **响应式** 的. 如果在实例创建之后添加新的属性到实例上, 它不会触发视图更新. 我们将在后面详细讨论响应系统

除了 data 属性, Vue 实例暴露了一些有用的实例属性和方法. 这些属性与方法都有前缀 `$`, 以便于代理的 data 属性区分

```js
var data = { a: 1 };
var vm = new Vue({
	el: '#example',
	data: data
})

vm.$data === data // true
vm.$el === document.getElementById('example'); // true

// $watch 是一个实例方法
vm.$watch('a', function(newVal, oldVal) {
	// 这个回调会在 `vm.a` 改变后调用
})
```

> 注意, 不要在实例属性或回调中(如 vm.$watch('a', newVal => this.myMethod()))用箭头函数. 因为箭头函数绑定父上下文, `this` 不会像预想的那样是 Vue 实例, this.myMethod  会未定义

### 实例生命周期钩子

每个 Vue 实例在被创建时会经历一系列初始化步骤 - 例如, 它需要设置数据观察, 编译模板, 把实例挂载到 DOM 上, 当数据改变时更新 DOM. 在这些过程中, 它也会调用一些生命周期钩子, 钩子让我们有机会执行自定义的逻辑. 例如, 当实例被创建后 `created` 钩子会被调用

```js
var vm = new Vue({
	data: {
		a: 1
	},
	created: function() {
		// `this` 指向 vm 实例
		console.log('a is: ' + this.a)
	}
})
// -> 'a is: 1'
```

也有一些其他的钩子, 在实例生命周期的不同阶段调用, 如 `mounted`, `updated`, `destroyed`. 所有的钩子调用时 `this` 指向调用它的 Vue 实例. 一些用户可能会问 Vue 是否有"控制器"的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中


## 模板语法

Vue 使用了基于 HTML 的模板语法, 允许开发者声明式将 DOM 绑定至底层 Vue 实例的数据. 所有的 Vue 模板都是合法的 HTML, 能被遵循规范的浏览器和 HTML parsers 解析.

在底层的实现上, Vue 把模板编译成 Virtual DOM render functions.

结合响应系统, 在应用状态改变时, Vue 能够智能地计算出重新渲染组件的最小代价, 应用最小化的 DOM 操作.

如果你熟悉 Virtual DOM 的概念并且偏爱 JavaScript 的原始力量, 你也可以手写 render functions(可选 JSX), 而不用模板.

### 插值

**文本**

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签会被替换成 data 对象上 msg 属性的值. 每当 data 对象的 msg 属性更改时, 插值处也会被更新.

通过 `v-once` 指令, 你也可以进行一次性地插值, 当数据变化时插值不会更新. 但记住这也会影响该节点上其他绑定

```html
<span v-once>This is never change: {{ mesg }}</span>
```

**Raw HTML**

双括号 mustaches 会把数据解析成纯文本, 而不是 HTML. 为了输出真正的 HTML, 可以用 `v-html` 指令:

```html
<div v-html="rawHtml"></div>
```

>注意, 在你的网站动态渲染 HTML 会比较危险, 容易导致 XSS 攻击. 只对可信内容使用 HTML 插值, 不要对用户提供的内容插值

**属性**

Mustaches 不能用在 HTML 属性(attribute)中, 用 `v-bind` 指令:

```html
<div v-bind:id="dynamicId"></div>
```

它也支持 boolean 属性 - 如果条件为假值, 该属性会被移除:

```html
<button v-bind:disabled="someConditon">Button</button>
```

**使用 JavaScript 表达式**

到目前为止, 在我们的模板中一直都只绑定简单的属性键值. 但实际上, 在所有的绑定中, Vue 都提供了完全的 JavaScript 表达式支持(不是语句):

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ messsage.splict('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的 data 作用域下作为 JavaScript 被解析. 有个限制就是, 每个绑定只能包含 *单个表达式*, 下面的不会生效:

```html
<!-- 这是语句, 不是表达式 -->
{{ var a = 1 }}

<!-- 流程控制也不会生效, 请使用三元表达式 -->
{{ if(ok) { return message }}}
```

> 模板表达式都被放在沙盒中, 只能访问全局变量的一个白名单, 如 Math 和 Date. 你不应该在模板表达式中试图访问用户定义的全局变量

### 指令

指令是带有 `v-` 前缀的特殊属性. 指令属性值期望是单一 JavaScript 表达式(除了 v-for, 稍后讨论). 指令的职责是当表达式的值变化时, 相应地把某些行为应用到 DOM 上. 我们回顾一下介绍里的例子:

```html
<p v-if="seen">Now yuo see me</p>
```

这里 v-if 指令将根据表达式 seen 的值得真假来移除/插入 <p> 元素.

**参数**

一些指令可以带"参数", 在指令后用冒号指明. 例如, `v-bind` 指令用来响应式地更新 HTML 属性:

```html
<a v-bind:href="url"></a>
```

这里 href 是参数, 它告诉 v-bind 指令将元素的 href 属性绑定到 url 表达式的值.

另一个例子是 `v-on` 指令, 它用于监听 DOM 事件:

```html
<a v-on:click="doSomething>"</a>
```

在这里参数是监听的事件名称.我们之后会更详细讨论事件处理

**修饰符**

修饰符(modifiers)以用点 `.` 指明的特殊后缀, 用于指出一个指令应该以特殊方式绑定. 例如,  `.prevent` 修饰符告诉 v-on 指令在触发的事件上调用 event.preventDefault() :

```html
<form v-on:submit.prevent="onSubmit"></form>
```


### 过滤器

Vue 允许你自定义过滤器, 被用作文本格式化. 过滤器在2个地方有用: mustache 插值和 v-bind 表达式.
过滤器应该添加到 JavaScript 表达式的尾部, 用管道符号表示:

```html
<!-- in mustache -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

> Vue 2.x 过滤器只能在 mustache 和 v-bind(2.1开始支持) 中使用. 其他指令中请使用计算属性.

过滤器函数总是接收表达式的值作为第一个参数.

```js
new Vue({
  // ...
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```

过滤器可以串联

```html
{{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数, 因此可以接收参数:

```js
{{ message | filterA('arg1', arg2) }}
```

这里, 字符串 'arg1' 将传给过滤器作为第二个参数, 表达式 arg2 的值会作为第三个参数

### 简写

v- 前缀在模板中是作为一个标示 Vue 特殊属性的明显标识. 当你使用 Vue 为现有的标记添加动态行为时, 他会很有用, 但对于一些经常使用的指令来说有点繁琐. 而且, 当你搭建 SPA 并用 Vue 管理所有模板时, v- 前缀也变得不那么重要. 因此, Vue 为两个最常用的指令 v-bind, v-on 提供了缩写形式

**v-bind 缩写**

```html
<!-- 完整写法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

**v-on 缩写**

```html
<!-- 完整写法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

## 计算属性和观察者

### 计算属性

在模板中绑定表达式很方便, 但是它们实际上只用于简单的操作. 在模板中放入太多的逻辑会让它们过于复杂且难以维护. 例如

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

在这种情况下, 模板不再简单明了. 当你不止一次需要注意时问题会更糟糕.

这就是为什么对于复杂的逻辑, 你应该使用计算属性(computed property)

**基础例子**

```html
<div id="example">
	<p>Original message: {{ message }}</p>
	<p>Computed reversed message: {{ reversedMessage }}</p>
</div>
```

```js
var vm = new Vue({
	el: '#example',
	data: {
		message: 'Hello'
	},
	computed: {
    // a computed getter
		reversedMessage: function() {
      // `this` 指向 vm 实例
			return this.message.split('').reverse().join('');
		}
	}
})
```

这里我们声明了一个计算属性 reversedMessage. 我们提供的函数用作 vm.reversedMessage 属性的 getter 函数.

```js
console.log(vm.reversedMessage) // -> 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // -> 'dybdooG'
```

你可以打开浏览器的控制台, 修改 vm. vm.reversedMessage 的值始终取决于 vm.message 的值

你也可以像普通属性一样在模板中绑定计算属性. Vue 知道 vm.reversedMessage 依赖于 vm.message, 因此当 vm.message 发生改变时, Vue 也会更新 vm.reversedMessage 上的绑定. 而且最妙的是我们声明式地创建这种依赖关系: 计算属性的 getter 函数是纯函数, 方便测试和理解.

**计算缓存 vs 方法**

你可能注意到我们可以通过调用表达式中的方法来达到同样的效果:

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
// in component
methods: {
  reversedMessage: function() {
    return this.message.split('').reverse().join('')
  }
}
```

不用计算属性, 我们可以在 methods 定义一个相同的函数. 对于最终结果来说, 这两种方式是相同的. 然而, 不同的是计算属性会基于它的依赖而被缓存. 计算属性只有在它的相关依赖发生改变时才会重新计算求值. 这就意味着只要 message 没有发生改变, 多次访问 reversedMessage 计算属性会立即返回之前的计算结果, 而不必再次执行函数.

这也意味以下计算属性从不会更新, 因为 Date.now()不是响应式的依赖:

```js
computed: {
  now: function() {
    return Date.now()
  }
}
```

相比而言, 每当发生重新渲染, 方法调用总是会运行函数

我们为什么需要缓存？假设我们有一个重要的计算属性 A ，这个计算属性需要一个巨大的数组遍历和做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter ！如果你不希望有缓存，请用 method 替代。

**计算属性 vs Watched Property**

Vue 提供了更通用的方法来观察和响应 Vue 实例上数据的变化 : *watch 属性*.
当你有一些数据需要基于其他数据变化时, 可能会过度使用 `watch`.但是, 通常用计算属性比命令式地 `watch` 回调更好一点.

```html
<div id="demo">{{ fullName }}</div>
```
```js
var vm = new Vue({
	el: '#demo',
	data: {
		firstName: 'Foo',
		lastName: 'Bar',
		fullName: 'Foo Bar'
	},
	watch: {
		firstName: function(val) {
			this.fullName = val + ' ' + this.lastName
		},
		lastName: function(val) {
			this.fullName = this.firstName + ' ' + val
		}
	}
})
```

上面的代码是声明式的和重复的, 和计算属性相比:

```js
var vm = new Vue({
	el: '#demo',
	data: {
		firstName: 'Foo',
		lastName: 'Bar'
	},
	computed: {
		fullName: function() {
			return this.firstName + ' ' + this.lastName
		}
	}
})
```

这样更好, 不是吗?

**计算 Setter**

计算属性默认只有 getter, 但在需要时你也可以通过一个 setter:

```js
//...
computed: {
  fullName: {
    // getter
    get: function() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function(newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在当你运行 vm.fullName = 'rainy leo', setter 会被调用, vm.firstName 和 vm.lastName 也会相应地更新.

### 观察者

虽然计算属性在大多数情况下更合适, 有时也需要自定义 watcher .
因此 Vue 提供了更通用的方法通过 `watch` 选项, 来响应数据的变化. 当你想在数据变化时, 进行异步或昂贵的操作时, 这会有用
例如:

```js
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
    // ajax请求直到用户输入完毕才会发出
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})
```

在这个示例中，使用 watch 选项允许我们执行异步操作（访问一个 API），限制我们执行该操作的频率，并直到我们得到最终结果时，才设置中间状态。这是计算属性无法做到的。

除了 watch 选项之外，您还可以使用 vm.$watch API 命令。

## Class 与 Style 绑定

数据绑定一个常见需求是操作元素的 class 列表和它的内联样式. 因为它们都是属性 ，我们可以用 v-bind 处理它们：只需要计算出表达式最终的字符串. 不过，字符串拼接麻烦又易错. 因此，在 v-bind 用于 class 和 style 时， Vue 专门增强了它. 表达式除了字符串之外，还可以是对象或数组

### 绑定 HTML Classes

**对象语法**

可以传递一个对象给 `v-bind:class` 以动态切换 classes:

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示 active class 的出现取决于 data 属性 isActive 的真假

我们也可以在对象中传入更多属性用来动态切换多个 class 。此外， v-bind:class 指令可以与普通的 class 属性共存。如下模板:

```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

如下 data:

```js
data: {
  isActive: true,
  hasError: false
}
```

渲染为:

```html
<div class="static active"></div>
```

当 isActive 或者 hasError 变化时，class 列表将相应地更新。例如，如果 hasError 的值为 true ， class 列表将变为 "static active text-danger"。

你也可以直接绑定数据里的一个对象：

```html
<div v-bind:class="classObject"></div>
```
```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：

```html
<div v-bind:class="classObject"></div>
```
```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
}
```

**数组语法**

我们可以把一个数组传给 v-bind:class ，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]">
```
```js
data: {
	activeClass: 'active',
	errorClass: 'text-danger'
}
```

渲染为:

```html
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class ，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```

此例始终添加 errorClass ，但是只有在 isActive 是 true 时添加 activeClass 。

不过，当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：

```html
<div v-bind:class="[{ active: isActive }, errorClass]">
```

**和组件一起**

当你在自定义的组件中使用 class 属性, 这些 class 会被添加到组件的根元素. 元素上已存在的 class 不会被覆盖.

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后当使用它时添加一些 class:

```html
<my-component class="baz boo"></my-component>
```

渲染的 HTML 为:

```html
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

**对象语法**

`v-bind:style` 的对象语法十分直观 — 看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，让模板更清晰：

```html
<div v-bind:style="styleObject"></div>
```
```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

**数组语法**

v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]">
```

**自动添加前缀**

当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue 会自动侦测并添加相应的前缀。


## 条件渲染

### v-if

在字符串模板中, 如 Handlebars, 我们这样写一个条件块:

```html
<!-- Handlebars 模板 -->
{{#if ok}}
  <h1>Yes</h1>
{{/if}}
```

在 Vue 中 ，我们使用 v-if 指令实现同样的功能：

```html
<h1 v-if="ok">Yes</h1>
```

也可以用 v-else 添加一个 “else” 块：

```html
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

### v-if on <template> 的条件组

因为 v-if 是一个指令, 它必须附加在单个元素上. 但是如果我们想要切换多个元素呢? 这种情况下我们可以在 <template> 元素上用 v-if , 它作为一个不可见的包装元素. 最终渲染结果不会出现 <template> 元素.

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

**v-else**

可以用 v-else 指令为 v-if 添加 else 块.

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

v-else 元素必须紧跟在 v-if 或 v-else-if 元素的后面——否则它不能被识别。

**v-else-if**

v-else-if, 由名字可以看出, 作为 v-if 的 “else if 块”. 它可以多次调用:

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

和 v-else 类似,  v-else-if 元素必须紧跟在 v-if 或 v-else-if 元素之后.

**用 key 控制重用元素**

### v-show

另一个根据条件展示元素的选项是 v-show 指令。用法大体上一样：

```html
<h1 v-show="ok">Hello</h1>
```

区别在于 v-show 的元素总是会被渲染并存在于 DOM; v-show 切换元素的 CSS display 属性;

> 注意 v-show 不支持  <template> 语法, 也不能和 v-else 一起用

###  v-if vs v-show

v-if 是真实的条件渲染，因为它会确保条件块在切换时能正确地移除与重建内部的事件监听器和子组件。

v-if 也是惰性的：如果初始渲染时条件为假，它什么也不做 — 直到条件第一次变为真时它才开始渲染

相比之下， v-show 简单得多 — 无论初始条件是什么, 元素始终被渲染，只是简单地基于 CSS 切换。

一般来说， v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。


## 列表渲染

### v-for 

我们用 v-for 指令基于一个数组渲染列表项. v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组, item 是迭代中的数组元素的别名

**基本用法**

```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```
```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'foo' },
      { message: 'Bar' }
    ]
  }
})
```

在 v-for 块中，我们拥有对父作用域属性的完全访问权限。 v-for 还支持一个可选的第二个参数为当前项的索引。

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```

**Template v-for**

如同 v-if 模板，你也可以用带有 v-for 的 <template> 标签来渲染多个元素块。例如：

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

**Object v-for**

你也可以用 v-for 来迭代对象的属性

```html
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```
```js
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
```

你也可以提供第二个的参数为键名：

```html
<div v-for="(value, key) in object">
  {{ key }} : {{ value }}
</div>
```

第三个参数为索引：

```html
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```

> 在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的


**整数迭代 v-for**

v-for 也可以取整数。在这种情况下，它将重复多次模板。

```html
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```

**组件和 v-for**

在自定义组件里，你可以像任何普通元素一样用 v-for.

```html
<my-component v-for="item in items"></my-component>
```

然而它不能自动传递数据到组件里，因为组件有自己独立的作用域。为了传递迭代数据到组件里，我们要用 props ：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
```

不自动注入 item 到组件里的原因是，因为这使得组件会紧密耦合到 v-for 如何运作。在一些情况下，明确数据的来源可以使组件可重用。

下面是一个简单的 todo list 完整的例子：


### key

当 Vue 更新 v-for 渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，它不是移动 DOM 元素来匹配数据项的顺序， 而是将简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

这个默认的模式是有效的，但是只适用于不依赖子组件状态或临时 DOM 状态（例如：表单输入值）的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有唯一 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值（在这里使用简写）：

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。

因为它是 Vue 识别节点的一个通用机制， key 并不特别与 v-for 关联，key 还具有其他用途，我们将在后面的指南中看到其他用途。


### 数组更新检测

**变更方法**

Vue wraps an observed array’s mutation methods so they will also trigger view updates. The wrapped methods are:

push()
pop()
shift()
unshift()
splice()
sort()
reverse()

You can open the console and play with the previous examples’ items array by calling their mutation methods. For example: example1.items.push({ message: 'Baz' }).

**替换数组**

Mutation 方法, 顾名思义, 会改变调用它们的原数组. 相比之下, 也有 non-mutating 方法, 例如 filter(), concat() 和 slice(), 不改变原数组而是返回一个新数组. 当使用非改变方法时, 你可以用一个数组替换旧数组:

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作.

**注意事项**

由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

 1. 当你直接设置一个项的索引时，例如： vm.items[indexOfItem] = newValue
 2. 当你修改数组的长度时，例如： vm.items.length = newLength
 
为了避免第一种情况，以下两种方式将达到像 vm.items[indexOfItem] = newValue 的效果， 同时也将触发状态更新：

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)
```

避免第二种情况，使用 splice：

```js
example1.items.splice(newLength)
```

### 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

例如：

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

另外，当计算属性不可行时(例如，在嵌套 v-for 循环中), 你也可以使用 methods 方法：

```html
<li v-for="n in even(numbers)">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```


## 事件处理

### 监听事件

可以用 `v-on` 指令监听 DOM 事件, 当事件触发时运行某些 JavaScript 代码.

```html
<div id="exmaple-1">
	<button v-on:click="counter += 1>">Add 1</button>
	<p>clicked {{ counter } times}
</div>
```
```js
var example1 = new Vue({
	el: '#exmaple-1',
	data: {
		counter: 0
	}
})
```

### Method 事件处理器

许多事件处理的逻辑都很复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 可以接收一个定义的方法名来调用。

```html
<div id="example-2">
<!-- `greet` 是在下面定义的方法名 -->
<button v-on:click="greet">Greet</button>
</div>
```
```js
var example2 = new Vue({
	el: '#example-2',
	data: {
		name: 'Vue.js'
	},
  // 在 `methods` 对象中定义方法
	methods: {
		greet: function(event) {
			// `this` 在方法中指向 Vue 实例
			console.log('Hello ' + this.name);
			// `event` 是原生 DOM 事件
			console.log(event.target.tagName);
		}
	}
})

// 也可以用 JavaScript 直接调用方法
example2.greet()
```

### 内联处理器中的 Methods 

除了直接绑定到一个方法，也可以用内联 JavaScript 语句：

```html
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```
```js
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入 method 中：

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
```
```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

### 事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题， Vue 为 v-on 提供了 事件修饰符. 通过由点(.)表示的指令后缀来调用修饰符。

* .stop
* .prevent
* .capture
* .self
* .once

```html
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```

```html
<!-- click 事件将最多触发一次 -->
<a v-on:click.once="doThis"></a>
```

和其他修饰符不同, 它们只能用于原生 DOM 事件, `.once` 修饰符也可以用于组件事件.


### 按键修饰符

在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

全部的按键别名：

 * .enter
 * .tab
 * .delete (捕获 “删除” 和 “退格” 键)
 * .esc
 * .space
 * .up
 * .down
 * .left
 * .right
 
可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```js
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

### 修饰符按键

当下面的修饰符按键被按下时, 你可以用它们来触发鼠标或键盘事件:

 * .ctrl
 * .alt
 * .shift
 * .meta
 
> Note: On Macintosh keyboards, meta is the command key (⌘). On Windows keyboards, meta is the windows key (⊞). On Sun Microsystems keyboards, meta is marked as a solid diamond (◆). On certain keyboards, specifically MIT and Lisp machine keyboards and successors, such as the Knight keyboard, space-cadet keyboard, meta is labeled “META”. On Symbolics keyboards, meta is labeled “META” or “Meta”.

例如:

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

### 为什么在 HTML 中监听事件?

你可能注意到这种事件监听的方式违背了关注点分离（separation of concern）传统理念。不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：

 1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

 2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

 3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。


## 表单输入绑定

### 基础用法

你可以用 v-model 指令在表单 input 和 textarea 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。

> v-model 并不关心提供给表单 input 或 textarea 的初始值。它总是把 Vue 实例 data 作为事实来源.

> 对于一些需要 IME (Chinese, Japanese, Korean etc.)的语言, 你可能注意到 v-model 在 IME composition 过程中不会更新. 这种情况下你想要更新的话可以用 input 事件来代替.

**文本**

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

**多行文本**

```html
<span>Multiline message is:</span>
<p style="white-space: pre">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

> 在 textarea 文本插值不会生效, 用 v-model

**复选框**

单个勾选框，布尔值：

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

**单选按钮**

**选择列表**

### 值绑定

对于单选按钮，勾选框及选择列表选项， v-model 绑定的值通常是静态字符串（对于 checkbox 是布尔值）：

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

**复选框**

```html
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>
```
```js
// 当选中时
vm.toggle === vm.a
// 当没有选中时
vm.toggle === vm.b
```

**单选按钮**

```html
<input type="radio" v-model="pick" v-bind:value="a">
```
```js
// 当选中时
vm.pick === vm.a
```

**选择列表设置**

```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
```js
// 当选中时
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
```

### 修饰符

**.lazy**

在默认情况下， v-model 在 input 事件后同步 input 和 data，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件后同步：

```html
<!-- 在 "change" 后同步而不是 "input"  -->
<input v-model.lazy="msg" >
```

**.number**

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

```html
<input v-model.number="age" type="number">
这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。
```

**.trim**

如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：

```html
<input v-model.trim="msg">
```

### v-model with Components

HTML’s 内置的 input 类型有时不能满足需求. 幸运的是, Vue 组件允许你用自定义的行为创建可重用的 inputs . 这些 inputs 也可以使用 v-model! 阅读 custom inputs in the Components 了解更多.


## Components

### 什么是组件

组件（Component）是 Vue 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展


### 使用组件

**注册**

之前说过，我们可以通过以下方式创建一个 Vue 实例：

```js
new Vue({
	el: '#some-element',
	// options
})
```

要注册一个全局组件，你可以使用 Vue.component(tagName, options)。 例如：

```js
Vue.component('my-component', {
  // 选项
})
```

> 对于自定义标签名，Vue 不强制要求遵循 W3C规则 （小写，并且包含一个短杠），尽管遵循这个规则比较好。

组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用。要确保在初始化根实例 之前 注册了组件：

```html
<div id="example">
	<my-component></my-component>
</div>
```

```js
// 注册
Vue.component('my-component', {
	template: '<div>A custom component</div>'
})

// 创建根实例
new Vue({
	el: '#example'
})
```

渲染为:

```html
<div id="exmaple">
	<div>A custom component</div>
</div>
```

**局部注册**

不必在全局注册每个组件。可以使用 components 实例选项来注册，这样组件仅在另一个实例/组件的作用域中可用:

```js
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 仅在 父元素的模板中可用
    'my-component': Child
  }
})
```

这种封装也适用于其它可注册的 Vue 功能，如指令。

**DOM 模板解析说明**

当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 <ul> ， <ol>， <table> ， <select> 限制了能被它包裹的元素， <option> 只能出现在其它元素内部。

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```html
<table>
  <my-row>...</my-row>
</table>
```

自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：

```html
<table>
  <tr is="my-row"></tr>
</table>
```

应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：

 * <script type="text/x-template"
 * JavaScript内联模版字符串
 * .vue 组件

因此，有必要的话请使用字符串模版。


**data 必须是函数**

大多数可以传入 Vue 构造器的选项也可以用在组件中, 有一个例外: data 必须是函数. 事实上, 如果你这样:

```js
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```

那么 Vue 会在控制台发出警告，告诉你在组件中 data 必须是一个函数。最好理解这种规则的存在意义, 我们来讨巧.

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```js
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一个函数, 因此 Vue 不会警告
  // 但我们为每个组件实例返回了同一个对象应用
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

由于这三个组件实例共享了同一个 data 对象， 因此增加一个 counter 会影响所有组件！我们可以通过为每个组件返回新的 data 对象来解决这个问题：

```js
data: function () {
  return {
    counter: 0
  }
}
```

现在每个 counter 都有它自己内部的状态了

**组合组件**

组件意味着协同工作，通常父子组件会是这样的关系：组件 A 在它的模版中使用了组件 B 。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件。然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。

在 Vue.js 中，父子组件的关系可以总结为 `props down, events up` 。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。


### Props

**使用 Props 传递数据**

组件实例的作用域是孤立的. 这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件.

prop 是父组件用来传递数据的一个自定义属性。子组件需要显式地用 props 选项 声明 "prop"：

```js
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 "this.message" 这样使用
  template: '<span>{{ message }}</span>'
})
```

然后我们可以向它传入一个普通字符串：

```html
<child message="hello!"></child>
```

**camelCase vs kebab-case**

HTML 特性不区分大小写。当使用非字符串模版时，prop 的名字形式会从 camelCase 转为 kebab-case（短横线隔开）：

```js
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```
```html
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

再次说明，如果你使用字符串模版，不用在意这些限制。

**动态 Props**

类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的 data 中。每当父组件的 data 变化时，该变化也会传导给子组件：

```html
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

使用 v-bind 的缩写语法通常更简单：

```html
<child :my-message="parentMsg"></child>
```

**字面量语法 vs 动态语法**

初学者常犯的一个错误是使用字面量语法传递数值：

```html
<!-- 传递了一个字符串"1" -->
<comp some-prop="1"></comp>
```

因为它是一个字面 prop ，它的值以字符串 "1" 而不是以实际的数字传下去。如果想传递一个实际的 JavaScript 数字，需要使用 v-bind ，从而让它的值被当作 JavaScript 表达式计算：

```html
<!-- 传递实际的数字 -->
<comp v-bind:some-prop="1"></comp>
```

**单向数据流**

prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

通常有两种改变 prop 的情况：

prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用；

prop 作为需要被转变的原始值传入。

更确切的说这两种情况是：

 1. 定义一个局部 data 属性，并将 prop 的初始值作为局部数据的初始值。

 ```js
 props: ['initialCounter'],
 data: function () {
   return { counter: this.initialCounter }
 }
 ```
 
 2. 定义一个计算属性，此属性从 prop 的值计算得出。
 
 ```js
 props: ['size'],
 computed: {
   normalizedSize: function () {
     return this.size.trim().toLowerCase()
   }
 }
 ```

> 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。


**Prop 验证**

组件可以为 props 指定验证要求。如果未指定验证要求，Vue 会发出警告。当组件给其他人使用时这很有用。

prop 是一个对象而不是字符串数组时，它包含验证要求：

```js
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

type 可以是下面原生构造器：

 * String
 * Number
 * Boolean
 * Function
 * Object
 * Array
 
type 也可以是一个自定义构造器，使用 instanceof 检测。

当 prop 验证失败了， Vue 将拒绝在子组件上设置此值，如果使用的是开发版本会抛出一条警告。

### 自定义事件

我们知道，父组件是使用 props 传递数据给子组件，但是如果子组件内发生变化要和父组件通信，应该怎样做？那就是自定义事件.


**在自定义事件上 使用 v-on**

每个 Vue 实例都实现了事件接口(Events interface)，即：

 * 使用 $on(eventName) 监听事件
 * 使用 $emit(eventName) 触发事件

另外，父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

下面是一个例子：

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```
```js
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

在本例中，子组件已经和它外部完全解耦了。它所做的只是触发一个父组件关心的它自己的内部事件

*给组件绑定原生事件*

时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：

```html
<my-component v-on:click.native="doTheThing"></my-component>
```

**使用自定义事件的表单输入组件**

自定义事件也可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。牢记：

```html
<input v-model="something">
```

仅仅是下面的语法糖：

```html
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

在组件中使用时，这可以简化：

```html
<custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>
```

所以要让组件和 v-model 一起使用，它必须：

 * 接受一个 value 属性
 * 在有新的 value 时触发 input 事件
 
我们看一个非常简单的货币输入：

```html
<currency-input v-model="price"></currency-input>
```

这个接口不仅仅可以用来连接组件内部的表单输入，也很容易集成你自己创造的输入类型。想象一下：

```html
<voice-recognizer v-model="question"></voice-recognizer>
<webcam-gesture-reader v-model="gesture"></webcam-gesture-reader>
<webcam-retinal-scanner v-model="retinalImage"></webcam-retinal-scanner>
```

**非父子间通信**

有时候非父子关系的组件也需要通信。在简单的场景下，使用一个空的 Vue 实例作为中央事件总线：

```js
var bus = new Vue()

// 在组件 A 的 method 中
bus.$emit('id-selected', 1)

// 在组件 B 的 created 钩子里
bus.$on('id-selected', function (id) {
  // ...
})
```

在更多复杂的情况下，你应该考虑使用专门的 状态管理模式.

### 使用 Slots 进行内容分发

在使用组件时，常常要像这样组合它们：

```html
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```

 
注意两点：

 1. <app> 组件不知道它的挂载点会有什么内容。挂载点的内容是由 <app> 的父组件决定的。
 2. <app> 组件很可能有它自己的模版。

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发 (或 "transclusion" 如果你熟悉 Angular)。Vue.js 实现了一个内容分发 API ，参照了当前 Web 组件规范草案，使用特殊的 `<slot>` 元素作为原内容的分发的出口

**编译作用域**

在深入内容分发 API 之前，我们先明确内容在哪个作用域进行编译。假定模板为：

```html
<child-component>
  {{ message }}
</child-component>
```

message 应该绑定到父组件的 data，还是绑定到子组件的 data？答案是父组件。组件作用域的一个简单规则是：

> 父组件模板中的内容在父组件作用域内编译；子组件模板中的内容在子组件作用域内编译。

一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：

```html
<!-- 无效 -->
<child-component v-show="someChildProperty"></child-component>
```

假定 someChildProperty 是子组件的属性，上例不会如预期那样生效。父组件模板不知道子组件的状态。

如果你需要绑定子组件作用域的指令到一个组件的根节点，你应该在子组件自己的模板内这么做：

```js
Vue.component('child-component', {
  // 这次有效, 因为我们在正确的作用域中
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```

类似地，分发的内容将会在父组件作用域中编译。

**单个 slot**

除非子组件模板包含至少一个 <slot> ，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。

最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空且没有要插入的内容时才显示备用内容。

假定 my-component 组件有下面模板：

```html
<div>
  <h2>I'm the child title</h2>
  <slot>
    如果没有要分发的内容则显示我。
  </slot>
</div>
```

父组件模版：

```html
<div>
  <h1>I'm the parent title</h1>
  <my-component>
    <p>这是原始内容</p>
    <p>这也是原始内容</p>
  </my-component>
</div>
```

渲染结果：

```html
<div>
  <h1>I'm the parent title</h1>
  <div>
    <h2>I'm the child title</h2>
    <p>这是原始内容</p>
    <p>这也是原始内容</p>
  </div>
</div>
```

**命名的 Slots**

<slot> 元素可以用一个特殊的属性 name, 它用来配置如何分发内容。你可以有多个不同的名字的 slots。有名字的 slot 将匹配内容片段中有 slot 属性的元素。

你也可以有一个未命名的 slot ，它是作为未匹配内容的默认 slot. 如果没有默认的 slot ，未匹配的内容会被丢弃.

例如，假定我们有一个 app-layout 组件，它的模板为：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  
  <main>
    <slot></slot>
  </main>
  
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件模版：

```html
<app-layout>
  <h1 slot="header">Here might be a page title</h1>
  
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  
  <p slot="footer">Here's some contact info</p>
</app-layout>
```

渲染结果为：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

在组合组件时，内容分发 API 是非常有用的机制。

**作用域的 Slots**

A scoped slot 是一种特殊类型的 slot, 它可用于可复用的模板(可以给它传递 data)而不是已经渲染的元素

在子组件中, 把数据传递给一个 slot 就像你把 props 传给组件那样:

```html
<div class="child">
  <slot text="hello from child"></slot>
</div>
```

在父组件中,  带有特殊的属性 scope 的 <template> 元素表明这是一个用于 scoped slot 的模板. scope 的值是临时变量的名字, 它保存了从子组件传过来的 props 对象:

```html
<div class="parent">
  <child>
    <template scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```

上面的渲染成这样:

```html
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```

scoped slots 的一个更典型的用法是列表组件, 它允许父组件自定义列表中每一项如何渲染:

```html
<my-awesome-list :items="items">
  <!-- scoped slot can be named too -->
  <template slot="item" scope="props">
    <li class="my-fancy-item">{{ props.text }}</li>
  </template>
</my-awesome-list>
```

列表组件的模板:

```html
<ul>
  <slot name="item"
    v-for="item in items"
    :text="item.text">
    <!-- fallback content here -->
  </slot>
</ul>
```


### 动态组件

多个组件可以使用同一个挂载点， 使用保留的 <component> 元素可以动态地在它们之间切换, 并且动态地绑定到它的 is 属性：

```js
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```
```html
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```

你也可以直接绑定到组件对象上：

```js
var Home = {
  template: '<p>Welcome home!</p>'
}
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```

**keep-alive**

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染, 为此你可以把一个动态组件包装在 keep-alive 元素中：

```html
<keep-alive>
  <component :is="currentView">
    <!-- 非激活的组件将被缓存！ -->
  </component>
</keep-alive>
```

在API 参考查看更多 <keep-alive> 的细节。

### 杂项

**编写可复用组件**

在编写组件时，最好想一想之后你是否想把它用在别处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口, 并且不假定它使用的上下文环境.

Vue 组件的 API 来自三部分 - props, events 和 slots ：

 * Props 允许外部环境传递数据给组件

 * Events 允许组件在外部环境触发副作用

 * Slots 允许外部环境把其他内容和组件组合在一起

使用 v-bind 和 v-on 的简写语法，模板的含义简洁明了：

```html
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

**子组件 Refs**

尽管有 props 和 events ，但是有时仍然需要在 JavaScript 中直接访问子组件。为此你必须使用 ref 为子组件指定一个引用 ID 。例如：

```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```
```js
var parent = new Vue({ el: '#parent' })
// 访问子组件实例
var child = parent.$refs.profile
```

当 ref 和 v-for 一起使用时， ref 是一个数组或对象，包含相应的子组件。

> $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。

**异步组件**

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单， Vue 允许将组件定义为一个工厂函数，并且异步地解析组件. Vue 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

工厂函数接收一个 resolve 回调，在从服务器加载完组件定义时调用。也可以调用 reject(reason) 表明加载失败。这里 setTimeout 只是为了演示。怎么加载组件完全由你决定。一种推荐的方式是异步组件和 Webpack 的代码分割功能一起用：

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

你也可以在 resolve 函数中返回一个 Promise, 因此配合 Webpack 2 + ES2015 语法可以这样写：

```js
Vue.component(
  'async-webpack-example',
  () => System.import('./my-async-component')
)
```

**组件命名规定**

当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase 。Vue 不关心这个。

```js
// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // 使用 camelCase 形式注册
  'camelCasedComponent': { /* ... */ },
  // 使用 TitleCase 形式注册
  'TitleCasedComponent': { /* ... */ }
}
```

在 HTML 模版中，请使用 kebab-case 形式：

```html
<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```

当使用 *字符串* 模板时，可以不受 HTML 的 case-insensitive 限制。这意味着在模版中，你可以使用 camelCase 、 PascalCase 或者 kebab-case 来引用你的组件和 props：

```html
<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```

如果组件不是通过 slot 元素传递的内容，你甚至可以在组件名后使用 / 使其自闭合：

`<my-component/>`

当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。

**递归组件**

组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以：

`name: 'unique-name-of-my-component'`

当你利用 Vue.component 注册了一个全局组件时, 全局的 ID 会自动设置为组件的 name 选项.

```js
Vue.component('unique-name-of-my-component', {
  // ...
})
```

当你不小心时, 递归组件可能导致死循环:

```js
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

上面组件会导致一个错误 "max stack size exceeded" ，所以要确保递归调用有终止条件 (比如递归调用时使用 v-if 且它最终值会有 false )。

**组件之间循环引用**

假设你正在写一个文件目录树, 就像 Finder 那样. 你可能会有一个带有以下模板的 tree-folder 组件:

```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```

然后有一个 tree-folder-contents 组件, 模板如下:

```html
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```

当你仔细看时, 会发现这些组件在渲染树上实际上互相作为祖先元素和后辈元素 - 矛盾! 当用 Vue.component 全局注册组件时, 这种矛盾可以自动解决. 如果你想这样, 那么可以停止阅读了.

然而, 如果你正在用模块系统 requiring/importing 组件时,  例如用 Webpack 或 Browserify, 会有这样的错误:

`Failed to mount component: template or render function not defined.`

为了说清楚是怎么回事, 我把你的组件取名 A 和 B. 模块系统发现它需要 A, 但首先 A 需要 B, 但 B 需要 A, 等等. 它陷入了死循环, 不知道怎样解析组件. 为了解决这个问题, 我们需要给模块系统一个 point , 让它知道 “A 最终需要 B , 但不必首先解析 B.”

在我们例子中, 我把那个 point 作为 tree-folder 组件. 我们知道 tree-folder-contents 组件会引起矛盾, 因此我们在 beforeCreate 钩子里注册它:

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```

问题解决!

**内联模板**

如果子组件有 inline-template 特殊属性(attribute)，组件将用它内部内容作为它的模板，而不是把它当作分发的内容。这让注册模板更灵活

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

但是 inline-template 让模板的作用域难以理解。最佳实践是使用 template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素。

**X-Templates**

另一种定义模版的方式是在 script 标签里使用 text/x-template 类型，然后用一个 id 引用模板。例如：

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

这在有很多模版或者小的应用中有用，否则应该避免使用，因为它将模版和组件的其他定义隔离了。


** 使用 v-once 的廉价静态组件**

尽管在 Vue 中渲染 HTML 很快，但有时你可能会有一个包含大量静态内容的组件. 这种情况下, 你可以在根元素上添加 v-once 指令, 确保它只会计算一次并将渲染结果缓存起来：

```js
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```


# 高级

## 深入响应式

我们已经讲了大部分的基础内容，现在是时候深入一点了。Vue 最显著的特点之一是它的响应系统. Models 只是纯 JavaScript 对象，当你修改它们时视图会更新. 这让状态管理非常简单且直观，不过理解它的原理以避免一些常见的陷阱也是很重要的。在本节中，我们将开始深挖 Vue 响应系统的底层细节。

**如何追踪变化**

当你把一个纯 Javascript 对象传给 Vue 实例来作为它的 data 选项，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。这是 ES5 的特性，不能打补丁实现，这便是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。

用户看不到 getter/setters，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 vue-devtools 来获取更加友好的检查接口。

每个组件实例都有相应的 watcher 实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher ，然后 watcher 让组件重新渲染.

![](https://vuejs.org/images/data.png)

**变化检测问题**

由于 Javascript 的限制，Vue 不能检测到对象属性的添加或删除。因为 Vue 在初始化实例时将属性转为 getter/setter，属性必须在 data 对象上才能让 Vue 转换它并使它为响应的。例如：

```js
var vm = new Vue({
  data:{
    a:1
  }
})
// `vm.a` 是响应的

vm.b = 2
// `vm.b` 是非响应的
```

Vue 不允许在已经创建的实例上动态添加新的根级别的响应式属性. 但是你可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

```js
Vue.set(vm.someObject, 'b', 2)
```

你也可以使用 vm.$set 实例方法，它是全局 Vue.set 方法的别名：

```js
this.$set(this.someObject, 'b' ,2)
```

有时你想向已有对象上添加一些属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

也有一些数组相关的问题，之前已经在列表渲染中讲过。

**声明响应式属性**

由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例时声明所有根级别响应式属性，哪怕只是一个空值:

```js
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message` 
vm.message = 'Hello!'
```

如果你不在 data 对象中声明 message，Vue 会警告你 render function 正试图访问一个不存在的属性。

这样的限制在背后是有其技术原因的，在依赖项跟踪系统中，它消除了一类边界情况，也使 Vue 实例在类型检查系统的帮助下运行的更高效。在代码可维护性方面上这也是重要的一点：data 对象就像组件状态的纲要 (Schema），在它上面声明所有的响应式属性, 这让组件代码更易理解。

**异步更新队列**

Vue 进行 DOM 更新是异步的. 只要观察到数据变化，Vue 就会开启一个队列，并缓冲同一 event loop 中发生的所有数据变化. 如果同一个 watcher 被多次触发，它只会被放进队列一次。这种缓冲的非重复机制很有用, 它避免了不必要计算和 DOM 操作. 然后, 在下一个 event loop 的 tick 内, Vue 清空队列, 进行实际的操作. Vue 在内部尝试使用原生的 Promise.then 和 MutationObserver 进行异步队列操作，并会用 setTimeout(fn, 0) 作为替代。

例如，当你设置 vm.someData = 'new value' ，组件不会马上重新渲染。它会在下一个 tick 内当队列清空时进行更新. 大多数时候我们不需要关心这个, 但当你想要在 DOM 更新后进行一些操作时要注意这点. 虽然 Vue 鼓励开发者沿着数据驱动的思路，尽量避免直接接触 DOM，但是有时我们确实要这么做。为了等到 Vue 在数据变化之后更新完 DOM ，你可以在数据变化后立刻使用 Vue.nextTick(callback). callback 回调在 DOM 更新完之后就会调用。例如：

```html
<div id="example">{{ message }}</div>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

也有一个实例方法 vm.$nextTick(), 它在组件内使用特别方便，它不需要全局 Vue 而且它的回调的 this 会自动绑定到当前的 Vue 实例上：

```js
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
})
```

## Render 函数

### 基础

Vue 推荐使用在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你确实需要使用 JavaScript. 这就是你该使用 render 函数的地方，它比 template 更接近编译器。

我们先看一个使用 render 函数的简单例子，假设你想生成一个带锚链接的标题：

```html
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

对于上面的 HTML，你想用这样的组件接口：

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

当我们开始写一个基于 level prop 产生 heading 的组件，你很快会像这样：

```html
<script type="text/x-template" id="anchored-heading-template">
  <div>
    <h1 v-if="level === 1">
      <slot></slot>
    </h1>
    <h2 v-if="level === 2">
      <slot></slot>
    </h2>
    <h3 v-if="level === 3">
      <slot></slot>
    </h3>
    <h4 v-if="level === 4">
      <slot></slot>
    </h4>
    <h5 v-if="level === 5">
      <slot></slot>
    </h5>
    <h6 v-if="level === 6">
      <slot></slot>
    </h6>
  </div>
</script>
```
```js
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

template 在这种场景中就不太适合了. 它不仅啰嗦, 而且为每个 heading level 重复使用了 <slot></slot> ，整个内容包在了一个无用的 div 中，因为组件必须有一个根节点。

虽然模板在大多数组件中都非常好用，但很明显这里就不是. 我们来试一下用 render 函数重写上面的例子：

```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

简单清晰很多！代码精简了，但需要非常熟悉 Vue 的实例属性。在这个例子中，你需要知道当你不使用 slot 属性向组件中传递内容时，比如 anchored-heading 中的 Hello world!, 这些子元素被存储在组件实例中的 $slots.default 中。如果你还不了解， 在深入 render 函数之前推荐阅读 instance properties API。

### createElement 参数

第二件你需要熟悉的是如何在 createElement 函数中生成模板。这里是 createElement 接受的参数：

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名，组件选项，或一个函数
  // 返回其中之一. 必须选项
  'div',
  // {Object}
  // 一个对应属性的 data 对象
  // 您可以在 template 中使用.可选项.
  {
    // (下一节将详细说明相关细节)
  },
  // {String | Array}
  // 子节点(VNodes). 可选项.
  [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProp: 'foo'
      }
    }),
    'bar'
  ]
)
```

**深入 Data 对象**

有一件事要注意：和在模板中 v-bind:class, v-bind:style 有特别的处理类似，它们在 VNode 的 data 对象中有自己的顶层的字段.

```js
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML 属性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件处理函数在 "on" 内部
  // 所以不支持如 .enter 等修饰符
  // 需要手动设置 keyCode
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会保持跟踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2'
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // The name of a slot if the child of a component
  slot: 'name-of-slot'
  // 其他特殊的 top-level 属性
  key: 'myKey',
  ref: 'myRef'
}
```

**完整例子**

**限制**

VNodes 必须唯一

### 使用 JavaScript 代替模板功能

### JSX

```js
import AnchoredHeading from './AnchoredHeading.vue'
new Vue({
  el: '#demo',
  render (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```
> 将 h 作为 createElement 的别名是一个通用惯例，在 JSX 必须这样. 如果 h 不在作用域中, 应用会报错。

### 函数组件

之前创建的锚点标题组件是比较简单，没有管理或者监听任何传递给它的状态，也没有生命周期方法。它只是一个接收参数的函数。
在这个例子中，我们标记组件为 functional， 这意味它是无状态（没有 data），无实例（没有 this ）。
一个 函数化组件 就像这样：

```js
Vue.component('my-component', {
  functional: true,
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  },
  // Props 可选
  props: {
    // ...
  }
})
```


**slots() vs children**

你可能想知道为什么同时需要 slots() 和 children。slots().default 不是和 children 类似的吗？在一些场景中，是这样，但是如果是函数式组件和下面这样的 children 呢？

```html
<my-functional-component>
  <p slot="foo">
    first
  </p>
  <p>second</p>
</my-functional-component>
```

对于这个组件，children 会给你两个段落标签，而 slots().default 只会传递第二个匿名段落标签，slots().foo 会传递第一个具名段落标签。同时拥有 children 和 slots() ，因此你可以选择让组件通过 slot() 系统分发或者简单的通过 children 接收，让其他组件去处理。

### 模板编译

你可能有兴趣知道，Vue 的模板实际是编译成了 render 函数。这是一个实现细节，通常不需要关心，但如果你想看看模板的功能是怎样被编译的，你会发现会非常有趣。下面是一个使用 Vue.compile 来实时编译模板字符串的简单 demo：


## 自定义指令

除了默认设置的核心指令(v-model 和 v-show), Vue 也允许注册自定义指令。注意，在 Vue2.0 里面，代码复用的主要形式和抽象是组件 — 然而，有的情况下, 你需要对元素进行 DOM 访问, 这时候自定义指令就会有用。下面这个例子将聚焦一个 input 元素，像这样：

当页面加载时，元素将获得焦点。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：

```js
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

也可以注册局部指令，组件中接受一个 directives 的选项：

```js
directives: {
  focus: {
    // 指令的定义---
  }
}
```

然后你可以在模板中任何元素上使用新的 v-focus 属性：

```html
<input v-focus>
```

## Mixin

**基础**

Mixin 是一种为 Vue 组件提供可重用功能的方式.  mixin 对象可以包含任意组件选项. 当组件使用 mixin 时，mixin 中所有选项将会被合并到组件自身的选项。

例子：

```js
// 定义一个 mixin 对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 定义一个使用 mixin 对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -> "hello from mixin!"
```

**选项合并**

当 mixin 对象和组件含有同名选项时，这些选项会以适当的方式合并。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，mixin 对象的钩子将在组件自身钩子之前调用 ：

```js
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})
// -> "mixin 钩子被调用"
// -> "组件钩子被调用"
```

作为对象值的选项，例如 methods, components 和 directives，将被合并到同一个对象. 当对象中存在键名冲突时，组件选项的优先级更高。

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
vm.foo() // -> "foo"
vm.bar() // -> "bar"
vm.conflicting() // -> "from self"
```

注意： Vue.extend() 也使用同样的策略进行合并。

**全局 mixin**

**自定义选项合并策略**

自定义选项将使用默认策略，即简单地覆盖已有值。 如果想让自定义选项以自定义逻辑混合，可以向 Vue.config.optionMergeStrategies 添加一个函数：

## 插件

## 单文件组件

### 简介

在很多 Vue 项目中， 全局组件用 Vue.component 来定义，接着用 new Vue({ el: '#container '}) 在每个页面内指定一个容器元素。

这种方案在只是使用 JavaScript 增强某个视图的中小型项目中表现得很好。然而在更复杂的项目中，或者当你的前端完全采用 JavaScript 驱动的时候，以下弊端就显现出来：

 * 全局定义, 强制要求每个 component 中的命名不得重复
 * 字符串模板, 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
 * 不支持CSS, 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
 * 没有构建步骤, 限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 `.vue` 的 single-file components(单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 Webpack 或 Browserify 等构建工具。

这是一个文件名为 Hello.vue 的简单实例：

### 开始

**对于刚接触 JavaScript 模块构建系统的用户**

**对于高级用户**

我们建议浏览 github.com/vuejs-templates，找到你需要的部分，然后参考 README 中的说明，使用 vue-cli 工具生成新的项目。

Webpack 中，每个模块在构建前被加载器转变，Vue 官方插件 vue-loader 用来转变 .vue 单文件组件。 webpack-simple 模板已经准备好了一切， 如果要更多了解 .vue 如何和 Webpack 配合工作， 请看 vue-loader 文档

