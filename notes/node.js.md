
# Node.js

- 2009.5 Ryan Dahl 发布于 Github
- 使用Google V8 engine 的 Web & Socket Server
- 使用 JavaScript 编写 Backend( 前后端统一, 减少开发成本)

- Single Thread, Event Driven, Non-Blocking IO
- Strongly Community Support: NPM(package manager for JavaScript)

- what to do with it
	- utilities on your machine
	- a web server



## 模块

当模块的文件名是 index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径, 以下等价
```js
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```

**Module wrapper**
模块代码执行前, Node.js 会用一个函数把它包起来:
```js
(function(exports, require, module, __filename, __dirname) {
  // module code here
})
```

**变量**
- `exports` 是指向 module.exports 的一个引用, 只用 module.exports 就行了
- `process` 全局对象, 代表当前 Node.js process, 不需要 require
部分属性
process.pid 进程pid
process.versions node、v8、ssl、zlib等组件的版本
process.arch 系统架构，如:x64
process.argv CLI参数
process.env 环境变量

部分方法
process.uptime() 正常运行的时长
process.memoryUsage() 内存使用情况
process.cwd() 当前目录
process.exit() 退出进程
process.on() 添加事件监听 比如：on('uncaughtException')

- `__dirname` 当前运行的 js 所在的目录名, 字符串
- `__filename` 被执行代码的文件名. 解析的绝对路径. 不是全局的, 是每个 module 的局部变量

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

上面这句话总结了 JavaScript 的 non-blocking, single-threaded 的本质. 意思是当一个函数开始执行时, 没有东西可以打断它(run to complete). 其他需要被执行的 callback 函数必须等待. 这就是 JavaScript 运行的方式. 问题来了, 如果 call stack 中当前的函数执行时间很长怎么办? 这样是否意味着 message queue 会变得越来越长, 一些重要的 message 需要等待很长的时间? 这个问题可以避免, 由于这个原因:

花费时间长的操作通常和 I/O 有关. 因此有一种异步 I/O 的机制. 指的是当需要进行 I/O 操作时, 例如和服务器或者数据库进行通信, 你需要传递一个 callback 函数, 当操作完成时执行它. 这样的话, 调用的函数就不会被 blocked. 因此当假定只有 I/O 操作花费的时间较长时, 就不会遇到 queue 中的 message 等待过长的时间.

这种假设有道理吗? 绝大多数情况下是这样的, 其他和 I/O 操作无关的花费时间很长的大概只有处理一个庞大的数组或递归调用次数过多.

## stream 流

用Node处理比较大的数据时可能会出现些问题：
- 速度较慢
- 缓冲器只限制在1GB上等，
- 数据连续不断的时如何何操作
用Stream就会解决。因为Node的 Stream 是对连续数据进行分块后的一个抽象，也就是不需要等待资源完全加载后再操作。

标准Buffer的处理方式：只有整个Buffer加载完后才能进行下一步操作，看图对比下Node的Stream，只要拿到数据的第一个 chunk 就可以进行处理了

Node中有四种数据流：

- Readable 读
process.stdin 是一个标准输入流，数据一般来自于键盘输入，用它来实现一个可读流的例子。

- Writable 写
- Duplex 读&写
- Transform 数据转换

Stream在Node中很常见：
- HTTP 的 request response
request 和 response 是继承自Event Emitter的可读可写流：
- 标准 I/O
- 文件读写

## Buffer

在 ES6 TypedArray 之前, JavaScript不能操作二进制数据流, Buffer是为了操作8位字节流, 比如 TCP流和文件系统操作.

ES6 引入了 TypedArray, Buffer 实现 Unit8Array以适合 Node.js 使用场景

Buffer 类的实例和整数数组相似, 但它在 V8 heap上分配了固定大小内存. Buffer 的大小创建的时候就固定了不能改变.

Buffer 是 Node 全局变量, 不需要 require

标准的Buffer数据比较难看懂，一般用 toString() 来转换成人类可读的数据

fs 模块的 readFile 方法回调中的data就是个Buffer
```js
fs.readFile('file-path', function (err, data) {
  if (err) return console.error(err);
  console.log(data);
});
```

## Cluster 集群

单个 Node 实例运行在单个线程中。要发挥多核系统的能力，就需要启动一个 Node 进程集群来处理负载。核心模块 cluster 可以让一台机器的所有 CPU 都用起来，这样就能纵向的来扩展我们的Node程序。

**重要代表 pm2**
pm2优点很多：

- 负载均衡
- 热重载：0s reload
- 非常好的测试覆盖率

pm2 启动很简单：
`$ pm2 start server.js -i 4 -l ./log.txt`

-i 4 是 cpu数量（我是4核的）
-l ./log.txt 打日志
pm2 启动后自动到后台执行 通过 $ pm2 list 可以查看正在跑着那些进程。

更多内容直接看官网: http://pm2.keymetrics.io/

**Spawn vs Fork vs Exec**
`child_process.spawn()` vs `child_process.fork()` vs `child_process.exec()`

Node中有如上三种方式创建一个外部进程，而且都来自于核心模块 child_process

- require('child_process').spawn()
 用于比较大的数据，支持流，可以与任何命令(bash python ruby 以及其他脚本)一起使用，并且不创建一个新的V8实例

- require('child_process').fork() 
创建一个新的V8实例，实例出多个worker, 和spawn不同的的是 fork 只执行 node 命令

- require('child_process').exec() 
使用Buffer，这使得它不适合比较大的数据和Stream，异步调用，并在回调一次性拿到所有数据
exec()用的不是事件模式，而是在回调中返回 stdout stderr


## API

`process.nextTick()`: defers the execution of a function until the next pass of the event loop. Its functioning is very simple; it takes a callback as an argument and pushes it to the top of the event queue, *in front of* any pending I/O event, and returns immediately. The callback will then be invoked as soon as the event loop runs again. Callbacks deferred with process.nextTick() run before any other I/O event is fired
`setImmediate()`: the execution is queued *behind* any I/O event that is already in the queue.  

## NVM

See what versions are installed:
`nvm ls`

See what versions are available to install:
`nvm ls-remote`

Install a version:
`nvm install v6.2.2`

Set the new version as your default:
`nvm alias default v6.2.2`
