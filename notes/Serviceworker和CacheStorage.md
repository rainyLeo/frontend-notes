## Cache

`Cache` 接口提供缓存的 Request / Response 对象对的存储机制，例如作为ServiceWorker 生命周期的一部分。 Cache 接口像 workers 一样, 是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中,  但是它不必一定要配合 service worker 使用.

一个域可以有多个具名的 `Cache` 对象. 用户来实现脚本是如何 (例如在 ServiceWorker) 处理 `Cache` 更新的. `Cache` 中的内容除非显示地更新, 否则不会更新, 它们不会过期, 除非删除. 使用 `CacheStorage.open()` 打开一个指定的 `Cache` 对象, 然后就可以使用 `Cache` 对象的方法.

你需要定期地清理缓存条目, 因为每个浏览器都严格限制了一个域下缓存数据的大小. 浏览器尽其所能去管理磁盘空间, 浏览器有可能去删除一个域下的缓存数据. 确保你的代码可以安全地操作缓存. 查看 Deleting old caches 获取更多信息.

- 方法

`Cache.match(request, options)`
返回一个 Promise，resolve的结果是 Cache 对象第一个匹配的请求。
`Cache.matchAll(request, options)`
返回一个Promise，resolve的结果是 Cache 对象匹配的所有请求组成的数组。
`Cache.add(request)`
请求一个 URL, 并把返回的 response对象添加到给定的 Cache. 这在功能上等同于调用 `fetch()`, 然后使用 Cache.put() 将response添加到 cache中.
`Cache.addAll(requests)`
请求一个数组的 URL，返回的 response对象添加到给定的 Cache。
`Cache.put(request, response)`
把一个请求及其响应，添加到给定的 cache。
`Cache.delete(request, options)`
搜索key值为request的 Cache 条目。如果找到，则删除该Cache 条目，并且返回一个resolve为true的 Promise；如果未找到，则返回一个resolve为false的Promise。
`Cache.keys(request, options)`
返回一个Promise对象，resolve的结果是 Cache对象key值组成的数组。

## CacheStorage

`CacheStorage` 接口是 `Cache` 对象的存储. 它提供一个包含所有具名 cache的目录,  可以来自 ServiceWorker, 其他类型 worker 或 window 作用域可以访问的, 并维护一个字符串名称到Cache 对象的mapping 

可以用全局的 `caches` 属性访问 `CacheStorage`

- 方法

`CacheStorage.open(cacheName)`
返回一个Promise, resolve 匹配 `cacheName` 的Cache对象(如果不存在就创建一个新的cache)
`CacheStorage.match()`
检查一个指定的 Request 是否在 CacheStorage 维护的 Cache对象的key中, 返回一个Promise resolve 这个匹配
`CacheStorage.has()`
返回一个Promise, resolve true 如果 匹配 cacheName 的 Cache对象存在
`CacheStorage.delete()`
找到匹配 cacheName 的 Cache 对象, 如果找到, 删除 Cache 对象, 并返回 resolve true 的 Promise, 没找到 false
`CacheStorage.keys()`
返回一个 Promise, resolve 一个包含CacheStorage 跟踪的所有具名Cache对象的数组


## ServiceWorkder

一种机制, 对资源缓存和自定义的网络请求
Service Workers 要求必须在 HTTPS 下才能运行

- 基本架构

1. service worker URL 通过 `serviceWorkerContainer.register()` 来获取和注册。
2. 如果注册成功，service worker 就在 `ServiceWorkerGlobalScope` 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。
3. service worker 现在可以处理事件了。
4. 受 service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是 install 事件(在这个事件里可以开始进行填充 IndexDB和缓存站点资源)。这个流程同原生 APP 是一样的 — 让所有资源可离线访问。
5. 当 `oninstall` 事件的处理程序执行完毕后，可以认为 service worker 安装完成了。
6. 下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。 `onactivate` 主要用途是清理先前版本的service worker 脚本中使用的资源。
7. Service Worker 现在可以控制页面了，但仅是在 `register()` 成功后的打开的页面。也就是说，页面起始于有没有 service worker ，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 service worker 获得完全的控制。
## PWA