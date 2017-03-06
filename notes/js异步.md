
## Callback  

callback 是 到目前 JS 中最常见的异步方式. callback是 JS 中最基础的异步模式.    

callback 的问题: callback hell(pyramid of doom), 并不只是指函数嵌套和缩进, 还有运行的顺序等, 导致的难以维护和更新;
问题1: The mismatch between sequential brain planning and callback-driven async JS code
问题2: inversion of control

callback problem: lack of sequentiality and lack of trustability

always invoke callbacks asynchronously


## 并行(parallel threading)

'parallel' 和 'async' 并不一样. async 是关于*当前*和*以后*直接的间隔. parallel 是指几件事情可以同时发生. 并行计算的最常见手段是*进程*和*线程*. 进程和线程独立执行并且可以同时执行: 在独立的处理器之间, 或者独立的电脑直接, 但多个线程可以共享一个进程的内存.  

相反地, event loop 把它的工作拆分为一个个的任务然后依次执行, 不允许对于共享内存并行地存取和更改. 在不同线程之间配合 event loops 可以让并行化和序列化共存   

执行的并行线程的 interleaving 和 异步事件的 interleaving 有很大的不同.

## concurrency 并发 

并发是指2个或多个'进程'(非操作系统级, 虚拟进程, 代表有关联的, 序列化的一些操作)同时执行, 不论它们各自的组成的操作是否并行(in parallel)发生. 可以把并发理解为 '进程'级别的并行化(parallelism), 而不是操作级别的并行化(不同处理器的线程间). 2个'进程'可以并发, 但它们各自的事件要在 event loop queue 中排队依次执行

JavaScript runtime 一次只能做一件事. 但浏览器不只是 runtime
