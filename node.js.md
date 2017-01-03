
# NPM

CommonJS包规范
- package.json 包描述文件
- bin 存放可执行二进制文件的目录
- lib 存放JavaScript代码的目录
- doc 存放文档的目录
- test 存放单元测试用例的目录
 
package.json 
- dependencies 使用当前包所需要依赖的包列表, NPM会通过这个属性帮助自动加载依赖的包
- scripts 脚本说明对象. 它主要被包管理器用来安装, 编译, 测试和卸载包
- main 模块引入方法require()在引入包时, 会优先检查这个字段, 并将其作为包中其余模块的入口. 如果不存在这个字段, require()会查找包目录下的index.js, index.node, index.json文件作为默认入口
- devDependencies 一些模块只在开发时需要依赖. 配置这个属性, 可以提示包的后续开发者安装依赖包


`npm init`
`npm install`
`-g` 将一个包安装为全局可用的可执行命令 /usr/local/lib/node_modules 
`--save` saved to the package.json file.
`--save-dev` as a dev dependency in your package.json file.

NPM Scripts
`npm run test` 

`__dirname` will resolve to the directory the executing script resides in. So if your script resides in `/home/sites/app.js`, `__dirname` will resolve to `/home/sites`. It’s a good idea to use this handy global whenever possible.

`var fortune = require('./lib/fortune.js');`
Note that we prefix our module name with `./`. This signals to Node that it should not look for the module in the `node_modules` directory; if we omitted that prefix, this would fail.

```js
"scripts": { "test": "ava 'app/**/*.test.js' --verbose --require ./other/setup-ava-tests.js" }
```

**Module wrapper**
模块代码执行前, Node.js 会用一个函数把它包起来:
```js
(function(exports, require, module, __filename, __dirname) {
  // module code here
})
```

## 模块

当模块的文件名是 index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径, 以下等价
```js
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```


**变量**
- `exports` 是指向 module.exports 的一个引用, 只用 module.exports 就行了
- `process` 全局对象, 代表当前 Node.js process, 不需要 require
- `__dirname` 当前运行的 js 所在的目录名, 字符串
- `__filename` 被执行代码的文件名. 解析的绝对路径. 不是全局的, 是每个 module 的局部变量


## NVM

See what versions are installed:
`nvm ls`

See what versions are available to install:
`nvm ls-remote`

Install a version:
`nvm install v6.2.2`

Set the new version as your default:
`nvm alias default v6.2.2`

# Node.js

- 2009.5 Ryan Dahl 发布于 Github
- 使用Google V8 engine 的 Web & Socket Server
- 使用 JavaScript 编写 Backend( 前后端统一, 减少开发成本)

- Single Thread, Event Driven, Non-Blocking IO
- Strongly Community Support: NPM(package manager for JavaScript)

- what to do with it
	- utilities on your machine
	- a web server 

## Event loop 

call stack 和 message queue 一起运行的机制称为 Event Loop. "Loop" 指的是 runtime 等待 message 出现在 queue 中, 处理这个 message, 再次等待一直这样持续. 

Event loop 的工作很简单. 查看 stack 和查看 task queue; 如果 stack 是空的, 把 queue 中第一个取出, 把它 push 到 stack 中 
 
Examples

macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
microtasks: process.nextTick, Promises, Object.observe, MutationObserver

## event driven 事件驱动  

所谓的 event driven，就是将一切抽象为事件。I/O 操作完成是一个事件，用户点击一次鼠标是事件，Ajax 完成了是一个事件，一个图片加载完成是一个事件.一个任务不一定产生事件，比如获取当前时间。当产生事件后，这个事件会被放进队列中，等待被处理. 当产生事件后，这个事件会被放进队列中，等待被处理. 先产生的事件，先被处理

event driven 的的实现过程主要靠 event loop 完成。进程启动后就进入主循环。主循环的过程就是不停的从事件队列里读取事件。如果事件有关联的handle(也就是注册的callback)，就执行handle。一个事件并不一定有callback

准确讲，使用 event driven 的系统中，必然有非常非常多的事件。如果事件都产生，都要主循环去处理，必然会导致主线程繁忙。那对于应用层的代码而言，肯定有很多不关心的事件（比如只关心点击事件，不关心定时器事件）。这会导致一定浪费。

事实上，不是所有的事件都放置在一个队列里。
不同的事件，放置在不同的队列。

JavaScript: event-driven model 
python, java, ruby: request-response model

## Non-blocking IO 

同步 IO: CPU 等待 IO 执行的结果
异步 IO: CPU 不等待, 去做别的事情, 好了再通知 CPU(回调), 发送信息通知, CPU 检查(轮询)

记住一点: *只有当 call stack 空的时候, task 才会从 task queue 移入 call stack 中*.  

上面这句话总结了 JavaScript 的 non-bolcking, single-threaded 的本质. 意思是当一个函数开始执行时, 没有东西可以打断它. 其他需要被执行的 callback 函数必须等待. 这就是 JavaScript 运行的方式. 问题来了, 如果 call stack 中当前的函数执行时间很长怎么办? 这样是否意味着 message queue 会变得越来越长, 一些重要的 message 需要等待很长的时间? 这个问题可以避免, 由于这个原因:

花费时间长的操作通常和 I/O 有关. 因此有一种异步 I/O 的机制. 指的是当需要进行 I/O 操作时, 例如和服务器或者数据库进行通信, 你需要传递一个 callback 函数, 当操作完成时执行它. 这样的话, 调用的函数就不会被 blocked. 因此当假定只有 I/O 操作花费的时间较长时, 就不会遇到 queue 中的 message 等待过长的时间. 

这种假设有道理吗? 绝大多数情况下是这样的, 其他和 I/O 操作无关的花费时间很长的大概只有处理一个庞大的数组或递归调用次数过多.


## API 

`process.nextTick()`: defers the execution of a function until the next pass of the event loop. Its functioning is very simple; it takes a callback as an argument and pushes it to the top of the event queue, *in front of* any pending I/O event, and returns immediately. The callback will then be invoked as soon as the event loop runs again. Callbacks deferred with process.nextTick() run before any other I/O event is fired
`setImmediate()`: the execution is queued *behind* any I/O event that is already in the queue.  

## Buffer

在 ES6 TypedArray 之前, JavaScript不能操作二进制数据流, Buffer是为了操作8位字节流, 比如 TCP流和文件系统操作.

ES6 引入了 TypedArray, Buffer 实现 Unit8Array以适合 Node.js 使用场景

Buffer 类的实例和整数数组相似, 但它在 V8 heap上分配了固定大小内存. Buffer 的大小创建的时候就固定了不能改变.

Buffer 是 Node 全局变量, 不需要 require



