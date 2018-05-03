
## 概述

- 为什么要有worker

Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。
线程可以执行任务而不干扰用户界面。此外，他们可以使用XMLHttpRequest执行 I/O
worker 的一个优势在于能够执行处理器密集型的运算而不会阻塞 UI 线程

- 分类
Web Workers API定义了两种 worker，一种是 Dedicated Worker, 另外一种是Shared Worker。Dedicated Worker只能在他被创建的Context中访问。而Shared Worker一经创建，可以在同一个域里面的多个Context共享访问，例如不同的frame，不同的page。

- Web Workers的能力

原则上，worker不具备任何直接影响页面的能力，例如DOM操作。而是需要通过 postMessage 通知UI线程，间接的影响页面。这种设计的思想和主流的多线程UI设计思想也是一致的。

Worker可用的接口：

 - Navigator
 - XMLHttpRequest
 - setTimeout(), setInterval()
 - Array, Date, Math, and String


Worker不具备的能力：

 - DOM
 - window对象
 - document对象

### Dedicated Worker

- 创建
`var worker = new Worker('workerScript.js'); `

- 通信

1. 在UI线程向worker发送消息
`worker.postMessage(any message, optional sequence<Transferable> transfer);`
worker线程接收消息 
`onmessage = function(message) {}`

2. 从Dedicated Worker线程发送消息到UI线程
`postMessage(any message, optional sequence<Transferable> transfer); `
在UI线程里接收消息
`worker.onmessage = function (message) {} `

**线程安全**