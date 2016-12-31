## engine vs runtime 


engine: 执行 JS 代码,   V8, SpiderMonkey...

engine: callstack + heap 

runtime: 一种执行环境, 它给执行中的程序提供内置的库, 比如浏览器的 runtime 给提供了Window 对象, DOM API等; Node 的 runtime 提供了 FileSystem, Cluster等

js engine + js runtime  = host environment (浏览器, node)


engine 运行在 host environment (浏览器)  中

runtime 对 engine 就是 linker 对 compiler 

engine 是 runtime 的一部分

runtime 就是 host environment? 错

event loop 存在于 host environment 中, 它把 task queue 中的任务分配 engine 来执行, 

, (ES6把 event loop 包含在了 engine 中?).


文章开头，我说「简单地说，JavaScript 是单线程执行的语言」，现在可以说得稍微复杂一点了：JavaScript Engine 对 JavaScript 程序的执行是单线程的，但是 JavaScript Runtime（整个宿主环境）并不是单线程的；而且，几乎所有的异步任务都是并发的，例如多个 Job Queue、Ajax、Timer、I/O(Node)等等。

上面说的是 JavaScript Runtime 层面，JavaScript 执行本身，也有一些特殊情况，例如：一个 Web Worker 或者一个跨域的 iframe，也是独立的线程，有各自的内存空间（栈、堆）以及 Event Loop Queue。要与这些不同的线程通信，只能通过 postMessage。一次 postMessage 就是在另一个线程的 Event Loop Queue 中加入一条消息。