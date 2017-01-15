## Getting Started

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 用 router-link 组件来导航. -->
    <!-- 用 `to` 属性指定链接. -->
    <!-- <router-link> 默认被渲染成 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- route outlet -->
  <!-- route 匹配的组件在这里渲染 -->
  <router-view></router-view>
</div>
```

```js
// 0. 如果使用了模块系统(例如用了 vue-cli), import Vue , VueRouter, 然后 Vue.use(VueRouter)
// 1. 定义 route 组件, 也可以从其他文件导入
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2.定义一些 routes
// 每个 route 应该映射到一个组件. '组件'可以是由 Vue.extend() 创建实际的组件构造器, 或只是一个组件对象
const routes = [
	{ path: '/foo', component: Foo },
	{ path: '/bar', component: Bar }
]

// 3. 创建 router 实例, 传入 routes, 也可以传入附加的选项
const router = new VueRouter({
	routes
})

// 4. 创建并挂载 root instance
// 确保 router 注入到 app
const app = new Vue({
	router
}).$mount('#app')
```
注意 <router-link> 自动得到 .router-link-active class 当它的目标路由被匹配时

## Dynamic Route Match

经常会遇到需要把一些路由模式匹配同样的组件. 例如有个 User 组件对所有的用户渲染但用户的 ID 不同. 在 vue-router 中我们可以用动态的路径.

```js
const User = {
	template: '<div>User</div>'
}

const router = new VueRouter({
	routes: [
		// 动态部分用冒号:开始
		{ path: '/user/:id', component: User }
	]
})
```
现在 /uer/foo, /user/bar 这些 URL 会映射到同一个路由
路由动态部分用冒号 : 来表示. 当路由被匹配时, 动态部分的值在每个组件中可以用 this.$route.params 来得到. 因此, 我们可以通过更新 User 的模板来渲染当前用户的 ID.

```js
const User = {
	template: '<div>User {{ $route.params.id }}</div>'
}
```

在同一个路由中可以有多个动态部分, 它们会映射到 $route.params 响应的地方.例如:
				pattern 					    | 		matched path     |	  $route.params
-----------------------------------------------------------------------------------------
/user/:username								|  /user/leo           |   { username: 'leo'}
/user/:username/post/:postId  |  /user/leo/post/123  |   { username: 'leo', postId : 123}

除了 $route.params, $route 对象也有一些其他有用的信息, 例如 $route.query, $route.hash 等等

- Reacting to Params Changes

使用 routes 时 要注意的一件事是当用户从 /user/foo 导航到 /user/bar 时, 使用的是同一个组件. 由于2各路由渲染了同样的组件, 这比销毁旧的实例创建一个新的要高效一些. 但是, 这也意味着组件的 lifecycle hooks 不会被调用.

为了在同样的组件中相应参数的变化, 你可以 watch $route 对象

```js
const User = {
	template: '...',
	watch: {
		'$route'(to, from) {
			// 相应路由变化
		}
	}
}
```
- 高级匹配模式
vue-router 使用 path-to-regexp 作为路径匹配引擎, 它支持许多高级的匹配模式例如 optional dynamic segments, zero or more / one or more requirements, and even custom regex patterns. Check out its documentation for these advanced patterns, and this example of using them in vue-router

- 匹配优先级
有时同样的 URL 会匹配多个路由. 这种情况下匹配的优先级由定义的顺序决定: 先定义的路由优先级更高

## Nested Routes

实际的 app UI 通常由组件组合嵌套而成. URL 也会嵌套.
在 Vue-router 中, 用嵌套的路由可以简单的表示这种关系, 上一节的例子:

```html
<div id='app'>
	<router-view></router-view>
</div>
```
```js
const User = {
	template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
	routes: [
		{ path: '/user/:id', component: User }
	]
})
```
这儿的 router-view 是 top-level outlet. 它渲染顶层路由匹配的组件. 类似的, 一个渲染的组件也可以有它自己的 <router-view>. 例如, 如果我们在 User 组件模板内增加一个: 

```js
const User = {
	template: `
		<div class='user'>
			<h2>User {{ $route.params.id }}</h2>
			<router-view></router-view>
		</div>
	`
}
```

为了把组件渲染进嵌套的 outlet, 我们需要在 `VueRouter` 中使用 `children` 选项.

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // UserProfile 会在 User's <router-view> 内被渲染
          // 当 /user/:id/profile 被匹配时
          // 注意: 这里的 path 没有 /, 相对路径
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts 会在 User's <router-view> 内被渲染
          // 当 /user/:id/posts 被匹配时
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

注意 children 里面的 path 没有 / , 为相对路径. 加了 / 为绝对路径, URL 里面就没有 parent 路径了, 但该组件还是在 parent 里面

注意以 `/` 开头的渲染的路径会被当做 root path. 这允许你 leverage the component nesting 而不必使用 nested URL.

如你所见 `children` 选项只是另一个路由配置对象的数组, 就像 routes 自身一样. 因此, 你可以尽可多的保持嵌套

在上面的设置中, 当你你访问 `/user/foo`,  User's outlet 中没有东西被渲染, 因为没有匹配到 sub route . 也许你想在那渲染一些东西. 这种情况下你可以提供一个空的 subroute path:
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // UserHome 在 User's <router-view> 中被渲染
        // 当 /user/:id 被匹配时
        { path: '', component: UserHome },

        // ...other sub routes
      ]
    }
  ]
})
```

## Programmatic Navigation

除了使用 <router-link> 创建 a 标签以声明式地导航, 我们可以用 router 实例的方法来编程实现.

- `router.push(location)`

为了导航到不同的 URL, 可以使用 router.push. 这个方法把新的 entry push 进了 history stack, 因此当用户点击浏览器后退按钮时会被带到之前的 URL

当你点击 <router-link> 时会在内部调用这个方法, 因此点击 <router-link :to='...'> 和调用 router.push(...) 是一样的.

参数可以是字符串路径, 或者是是位置对象. 例如:

```js
router.push('home')
router.push({ path: 'home' })
router.push({ name: 'user', params: { userId: 123 }})
router.push({ path: 'register', query: { plain: 'private' }})
```
- `router.replace(location)`
和 router.push 相似, 唯一的区别是它不会 push 新的 history entry

- `router.go(n)`
 该方法接收一个整数作为参数, 表明在 history stack 中前进或后退多少步, 和 window.history.go(n) 相似
 ```js
 // 和 history.forward()一样
 router.go(1)
 // 和 history.back() 一样
 router.go(-1)
 ```
- History Manipulation
你也许注意到 router.push, router.replace and router.go 对应于 window.history.pushState, window.history.replaceState and window.history.go, 它们确实模仿了 window.history APIs.

## Named Routes

用名字识别一个路由有时候会更方便一些, 尤其当链接到一个路由或进行导航时. 当创建 router 实例的时候, 你可以在 routes 选项中给路由一个名字:
```js
const router = new VueRouter({
	routes: [
		{
			path: '/user/:userId',
			name: 'user',
			component: User
		}
	]
})
```

为了链接到一个命名的路由, 你可以把一个对象传给 router-link 组件的 to 参数
注意: to 前面有冒号 :,  名字 'user' 有单引号

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User<router-link>
```

这和下面用 router.push()的一样
```js
router.push({ name: 'user', params: { userId: 123 }})
```
这两种情况下 router 会导航到路径 /user/123

## Named Views

有时候你需要同时显示多个 views 而不是嵌套它们, 例如创建包括 sidebar 和 main 的布局. 这里可以用 named views. 你可以有多个 views 并给每一个命名. 没有名字的 router-view 名字为 default
```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个 view 通过使用组件来渲染, 因此多个 views 需要的多个组件用同样的路由. 组件选项这样:
```js
const router = new VueRouter({
	routes: [
		{
			path: '/',
			components: {
				default: Foo,
				a: Bar,
				b: Baz
			}
		}
	]
})
```

## Navigation Guards

有名字可见, vue-router 提供的 navigation guards 主要用来保护导航, 通过重定向或取消. 有几种方法进行 route navigation process: globally, pre-route, in-component

- Global Guards
你可以用 router.beforeEach 注册 global before guards
```js
const router = new VueRouter({...})
router.beforeEach((to, from, next) => {
	// ...
})
```

 * to: Route: the target Route Object being navigated to
 * from: Route: the current route being navigated away from
 * next: Function: this function must be called to resolve the hook.


# API

- router-link
 <router-link> is the component for enabling user navigation in a router-enabled app. The target location is specified with the to prop. It renders as an <a> tag with correct href by default, but can be configured with the tag prop. In addition, the link automatically gets an active CSS class when the target route is active.
 
- router-view
 The <router-view> component is a functional component that renders the matched component for the given path. Components rendered in <router-view> can also contain its own <router-view>, which will render components for nested paths.
 
- The Route Object
 A route object represents the state of the current active route. It contains parsed information of the current URL and the route records matched by the URL.
 The route object can be found in multiple places:

 * Inside components as this.$route, and obvious inside $route watcher callbacks;
 * As the return value of calling router.match(location);
 * Inside navigation guards as the first two arguments:
 * Route Object Properties
  $route.path, $route.params, $route.query, $route.hash, $route.name, $route.matched

 
- Router Constructor Options
- Router Instance
 router.push(location), router.replace(location), router.go(), router.beforeEach(guard)
- Component Injections
 These properties are injected into every child component by passing the router instance to the root instance as the router option.
 * $router: The router instance.
 * $route: The current active Route. This property is read-only and its properties are immutable, but it can be watched.





