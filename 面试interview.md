# 题目

- a标签超过80像素显示为... a { width: 80px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

- 图片边滚动边加载 设置 data-src, 判断滚动位置改变为 src

# 看准整理

- JavaScript读写cookie document.cookie = '..'
- xss csrf
- TCP/IP基本概念

- 知不知道HTTP2

- Why http2 影响一个 http 请求的因素主要有两个，带宽和延迟。今天的网络基础建设已经使得带宽得到极大的提升，大部分时候都是 _延迟_ 在影响响应速度。
- 延迟

  - 浏览器阻塞(head of line blocking): 浏览器会因为一些原因阻塞请求。浏览器对于同一个域名，同时只能有 4 个连接（这个根据浏览器内核不同可能会有所差异），超过浏览器最大连接数限制，后续请求就会被阻塞。
  - 建立连接, 连接无法复用: 会导致每次请求都经历三次握手和慢启动。三次握手在高延迟的场景下影响较明显，慢启动则对文件类大请求影响较大。
  - DNS 查询. 通常可以利用DNS缓存结果来达到减少这个时间的目的

- Http2

  - 多路复用: 即连接共享, 通过多个 request 共享一个tcp连接的方式, 接收方可以根据request的 id将request再归属到各自不同的服务端请求里面
  - 压缩头部: 前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。
  - 二进制分帧: HTTP1.x的解析是基于文本. 在http2二进制分帧层上，HTTP2.0会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码，其中HTTP1.x的首部信息会被封装到Headers帧，request body则封装到Data帧里面;改进传输性能，实现低延迟和高吞吐量
  - 服务器推送: 在客户端请求之前发送数据的机制

- HTTP Response的Header

- 输入URL后发生了什么
- new operator实际上做了什么
- preflight request
- 弹出层, 轮播
- js 冒泡
- tcp udp 区别
- CommonJS AMD CMD CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。 但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

- CommonJS

  ```javascript
  var clock = require('clock')
  ```

- AMD

  ```javascript
  define(['jquery'], function ($) {
  // methods
  function myFunc(){}
  // exposed public methods
  return myFunc
  });
  ```

  AMD讲究的是前置执行. define 是AMD规范用来声明模块的接口，示例中的第一个参数是一个数组，表示当前模块的依赖。第二个参数是一个回调函数，表示此模块的执行体。只有当依赖数组中的所有依赖模块都是可用的时，AMD模块加载器（比如RequireJS）才会去执行回调函数并返回此模块的暴露接口

- CMD Sea.js 实现的是 CMD 规范. CMD规范倾向依赖就近
对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。
CMD 推崇依赖就近，AMD 推崇依赖前置。

```javascript
define(function (require, exports, module) {
  // load dependence
  var $ = require('jquery')
  // methods
  function myFunc(){}
  // exposed public methods
  return myFunc
})
```

- UMD 因为AMD，CommonJS规范是两种不一致的规范，虽然他们应用的场景也不太一致，但是人们仍然是期望有一种统一的规范来支持这两种规范。于是，UMD（Universal Module Definition，称之为通用模块规范）规范诞生了

  ```javascript
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node, CommonJS-like
      module.exports = factory(require('jquery'));
    } else {
      // Browser globals (root is window)
      root.returnExports = factory(root.jQuery);
    }
  }(this, function ($) {
    //  methods
    function myFunc(){};
    //  exposed public method
    return myFunc;
  }));
  ```

- 单页面路由原理
- BFC
- session cookie
Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；
Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式。
- get post
- 如何实现一个302
- 找出1到100内素数
```js
function isPrime(num) {
	for (let i = 2; i < num; i++) {
		if (num % i === 0) {
			return false
		}
	}
	return true
}
function findPrime(n) {
	let res = []
	for (let i = 1; i <= n; i++) {
		if (isPrime(i)) {
			res.push(i)
		}
	}
	return res
}
```
- 字符串出现次数最多的字符统计 
 ```js
 var arr = s.split('').sort().join('').match(/(\S)\1*/g)
 ```
- 深拷贝、多维数组改一维数
* deep
```js
function deepCopy(obj) {
	let res = obj.constructor === Array ? [] : {}
	let keys = Object.keys(obj)
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		if (typeof obj[key] === 'object') {
			res[key] = deep(obj[key])
		} else {
			res[key] = obj[key]
		}
	}
	return res
}
// 方法2
JSON.parse(JSON.stringify(obj))
```

* flat
```js
var arr = [1, [2], [[3]], [[[[4, 5]]]]]
function flat(arr) {
  var res = []

	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			[].push.apply(res, flat(arr[i]))
    } else {
      res.push(arr[i])
    }
	}
	return res
}
// 方法2
arr.join().split(',').map(e => +e);
```
- 冒泡排序
- CSS 放顶部底部区别
  progressive load
- CSS link import 区别
import  阻塞并行下载, 浏览器会等到 import 下载完了再下载其他的内容
- 上传文件, 图片
- DNS 原理, 怎么解析 ip
- 数组内容, 2s 打印一个
```js
var arr = [1,2,3,4,5]
for (let i = 0; i < array.length; i++) {
	setTimeout(function () {
		console.log(arr[i])
	}, 2000 * i)
}
```
- cookie , localstorage
- 实现图片的切换, 除了闭包还要什么方法
- 红黑树
- CSS 三列布局, 不用浮动
 flex 
- flex 布局
- jQuery 源码
- cdn 不加 http 
 有可能是 https协议的
- 为什么淘宝、腾讯等会把静态资源放在另外一个主域名下 
 1、cookie free，即这些域名下请求不会发cookie，节省流量，这也是不放二级三级域名的原因 
 2、动静分离，静态资源方便做CDN

# HTML

**doctype**

1. When performing HTML validation testing on a web page it tells the HTML (HyperText Markup Language) validator which version of (X)HTML standard the web page coding is supposed to comply with. When you validate your web page the HTML validator checks the coding against the applicable standard then reports which portions of the coding do not pass HTML validation (are not compliant).
2. It tells the browser how to render the page in standards compliant mode

# Cookie, localStorage, sessionStorage

1. cookie由服务端生成，用于标识用户身份；而两个storage用于浏览器端缓存数据
2. 三者都是键值对的集合
3. 一般情况下浏览器端不会修改cookie，但会频繁操作两个storage
4. 如果保存了cookie的话，http请求中一定会带上；而两个storage可以由脚本选择性的提交
5. session storage会在会话结束后销毁；而localStorage 会永久保存直到覆盖。cookie会在过期时间之后销毁。
6. 安全性方面，cookie中最好不要放置任何明文的东西。两个storage的数据提交后在服务端一定要校验（其实任何 payload 和qs里的参数都要校验）

# CSS

**display有哪些值？说明他们的作用**

- none Turns off the display of an element (it has no effect on layout);
- block 像块类型元素一样显示。
- inline 缺省值。像行内元素类型一样显示。
- inline-block 像行内元素一样显示，但其内容像块类型元素一样显示（可以设置 width height）。
- list-item 像块类型元素一样显示，并添加样式列表标记。

**position的值relative和absolute定位原点是**

- static: 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
- relative: 生成相对定位的元素，相对于其正常位置进行定位。
- absolute: 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
- fixed: 生成绝对定位的元素，相对于浏览器窗口进行定位。
- inherit: 规定从父元素继承 position 属性的值。

**js延迟加载的方式有哪些**

defer和async(有兼容性问题) 动态创建DOM方式

**WEB应用从服务器主动推送Data到客户端有那些方式**

html5提供的 Websocket, ajax 长时间连接, ajax 长轮询

**你有用过哪些前端性能优化的方法**

请求数量: 合并脚本和样式表, iconfont，拆分初始化负载，划分主域 请求带宽: 开启 GZip，精简 JavaScript，移除重复脚本，图像优化 缓存利用: 使用 CDN，使用外部 JavaScript 和 CSS，减少 DNS 查找 页面结构: 将样式表(影响样式的内容)放在顶部，将脚本放在底部，尽早刷新文档的输出 "拆分初始化负载"的目标是将页面一开始加载时不需要执行的资源从所有资源中分离出来，等到需要的时候再加载。

划分主域 + 减少 DNS 查找：建议在一个网站里面使用至少2个域，但不多于4个域来提供资源

**http状态码有那些？分别代表是什么意思**

1**(信息类)：表示接收到请求并且继续处理 100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息 2**(响应成功)：表示动作被成功接收、理解和接受 200 OK 正常返回信息 201 Created 请求成功并且服务器创建了新的资源 202 Accepted 服务器已接受请求，但尚未处理 3**(重定向类)：为了完成指定的动作，必须接受进一步处理 301 Moved Permanently 请求的网页已永久移动到新位置。 302 Found 临时性重定向。 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。 304 Not Modified 自从上次请求后，请求的网页未修改过。 4**(客户端错误类)：请求包含错误语法或不能正确执行 401 Unauthorized 请求未授权验证。 403 Forbidden 禁止访问。 404 Not Found 找不到如何与 URI 相匹配的资源。 5**(服务端错误类)：服务器不能正确执行一个正确的请求 500 Internal Server Error 服务器遇到错误，最常见的服务器端错误。 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）

**一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）**

注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句， 而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、 到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

详细版

浏览器会开启一个新的线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理; 通过 DNS 解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求; 进行 HTTP 协议会话，客户端发送报头(请求报头); 进入到 web 服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器; 进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理; 处理结束回馈报头，和资源，如果是浏览器访问过的资源，浏览器缓存上有对应的，会与服务器最后修改时间对比，一致则返回304; 如果 html 没缓存，则浏览器开始下载 html 文档(响应报头，状态码200)，同时使用缓存; html 一边下载一边解析 html，根据标签建立文档树 DOM 其中根据标记下载所需css、js、图片文件，其中 css 是异步下载??，同步执行(By default CSS is treated as a render blocking resource, html 也是)并会阻塞式的建立 CSSOM, 然后这俩一起会 render 成完整的 render 树（最后我们看到的样子），然后再因为假如把 css 放到底部,可能页面会出现白屏(阻塞 render)，或者布局混乱样式很丑直到CSS加载完成闪跳(rerender)的感觉。所以写到顶部确保用户至少能早一点看到界面。 js 在现代浏览器里面是异步下载，同步执行的，最好放到底部。因为对于在 js 后面的内容（html），html 的逐步呈现会被阻塞。 当 js 运行完成，页面加载完成。

**如何解决跨域问题**

JSONP CORS

服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问

**Ajax**

完整步骤

1.创建XMLHttpRequest对象。 2.设置响应HTTP请求状态变化的函数。 3.创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息，发送HTTP请求。 4.在响应HTTP请求状态变化的函数里，获取异步调用返回的数据。 5.最后，使用JavaScript 实现 DOM 局部刷新。

**HTML5 新特性**

关于图像，位置，存储，多任务等功能的增加。

- 语义化更好的内容标签（header,nav,footer,aside,article,section）
- 拖拽释放(Drag and drop) API
- 音频、视频 API(audio,video)
- 画布(Canvas) API
- 地理位置定位(Geolocation) API
- 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
- sessionStorage 的数据在浏览器关闭后自动删除
- 新的技术 webworker, websocket

**常见web安全及防护原理**

_sql注入_

就是通过把SQL命令插入到Web表单中递交，或插入到输入包含查询字符串（query string）的 url，最终达到欺骗服务器执行恶意的SQL命令。

避免方式

前端需 1.永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双"-"进行转换等。 2.不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。

_XSS_

Xss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html 标签或者javascript代码。比如：攻击者插入 js 代码，然后运行，或者甚至替换你的 script 标签（联通手机流量这么干过劫持，然后你的代码就运行不了啦。。被替换成他的了，然后攻击者想干啥就干啥，只要你能干的，他都可以干）。

防范

首先代码里对用户输入的地方和变量都需要仔细检查长度和对 "<", ">", ";", "'"等字符做过滤

其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。

_CSRF_

CSRF（Cross-site request forgery），中文名称：跨站请求伪造

你这可以这么理解CSRF攻击：攻击者盗用了你的身份，以你的名义发送恶意请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。

要完成一次CSRF攻击，受害者必须依次完成两个步骤：

1.登录受信任网站A，并在本地生成Cookie。 2.在不登出A的情况下，访问危险网站B（B 网站会直接发送恶意请求，比如转钱，而这时已有Cookie，存在漏洞的 A 网站会以为这个请求是你发出的）。

- CSRF的防御

服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。

原理就是，要求在访问敏感数据请求时，要求用户浏览器提供不保存在cookie中，并且攻击者无法伪造的数据作为校验，那么攻击者就无法再执行CSRF攻击

1.使用验证码 2.添加 token 并验证

**说说你对MVC和MVVM的理解**

- MVC

View 响应用户交互，将特定事件传给 Controller Controller 完成业务逻辑后，要求 Model 改变状态（改变 model 状态的方法，应该是 model 模块的内容，不要写进 controller） Model 将新的数据发送到 View(当Model变更了以后，会通过观察者模式（Observer Pattern）通知View)，用户得到反馈 

- MVVM
组成部分Model、View、ViewModel

- View：UI界面 ViewModel：它是View的抽象，负责View与Model之间信息转换，将View的Command传送到Model； Model：数据访问层

**什么是事件代理**

事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧，用于优化性能。

使用情景，当需要给每一个子元素绑定事件的时候，会消耗大量性能。

"事件代理"即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能。

**attribute和property的区别是什么**

attribute是 DOM 素在文档中作为 html 标签拥有的属性；

property就是 DOM 元素在 js 中作为对象拥有的属性。

**Javascript垃圾回收方法**

- 标记清除

这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为"进入环境"，当变量离开环境的时候（函数执行结束）将其标记为"离开环境"

垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

**什么是web语义化,有什么好处**

web语义化是指通过HTML标记表示页面包含的信息，包含了HTML标签的语义化和css命名的语义化。 HTML标签的语义化是指：通过使用包含语义的标签（如h1-h6）恰当地表示文档结构 css命名的语义化是指：为html标签添加有意义的class，id补充未表达的语义，如Microformat通过添加符合规则的class描述信息 为什么需要语义化：

去掉样式后页面呈现清晰的结构 盲人使用读屏器更好地阅读 搜索引擎更好地理解页面，有利于收录 便团队项目的可持续运作及维护

**HTTP request报文结构是怎样的**

rfc2616中进行了定义：

首行是Request-Line包括：请求方法，请求URI，协议版本，CRLF 首行之后是若干行请求头，包括general-header，request-header或者entity-header，每个一行以CRLF结束 请求头和消息实体之间有一个CRLF分隔 根据实际请求需要可能包含一个消息实体 一个请求报文例子如下：

**HTTP response报文结构是怎样的**

rfc2616中进行了定义：

首行是状态行包括：HTTP版本，状态码，状态描述，后面跟一个CRLF 首行之后是若干行响应头，包括：通用头部，响应头部，实体头部 响应头部和响应实体之间用一个CRLF空行分隔 最后是一个可能的消息实体 响应报文例子如下：

**如何进行网站性能优化**

雅虎Best Practices for Speeding Up Your Web Site：

content方面

减少HTTP请求：合并文件、CSS精灵、inline Image 减少DNS查询：DNS查询完成之前浏览器不能从这个主机下载任何任何文件。方法：DNS缓存、将资源分布到恰当数量的主机名，平衡并行下载和DNS查询 避免重定向：多余的中间访问 使Ajax可缓存 非必须组件延迟加载 未来所需组件预加载 减少DOM元素数量 将资源放到不同的域下：浏览器同时从一个域下载资源的数目有限，增加域可以提高并行下载量 减少iframe数量 不要404 Server方面

使用CDN 添加Expires或者Cache-Control响应头 对组件使用Gzip压缩 配置ETag Flush Buffer Early Ajax使用GET进行请求 避免空src的img标签 Cookie方面 减小cookie大小 引入资源的域名不要包含cookie css方面 将样式表放到页面顶部 不使用CSS表达式 不使用@import 不使用IE的Filter Javascript方面 将脚本放到页面底部 将javascript和css从外部引入 压缩javascript和css 删除不需要的脚本 减少DOM访问 合理设计事件监听器 图片方面 优化图片：根据实际颜色需要选择色深、压缩 优化css精灵 不要在HTML中拉伸图片 保证favicon.ico小并且可缓存 移动方面 保证组件小于25k Pack Components into a Multipart Document

**什么是渐进增强**

渐进增强是指在web设计时强调可访问性、语义化HTML标签、外部样式表和脚本。保证所有人都能访问页面的基本内容和功能同时为高级浏览器和高带宽用户提供更好的用户体验。核心原则如下:

所有浏览器都必须能访问基本内容 所有浏览器都必须能使用基本功能 所有内容都包含在语义化标签中 通过外部CSS提供增强的布局 通过非侵入式、外部javascript提供增强功能 end-user web browser preferences are respected

**css sprite是什么,有什么优缺点**

概念：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案。

优点：

减少HTTP请求数，极大地提高页面加载速度 增加图片信息重复度，提高压缩比，减少图片大小 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现 缺点：

图片合并麻烦 维护麻烦，修改一个图片可能需要从新布局整个图片，样式

**display: none;与visibility: hidden;的区别**

联系：它们都能让元素不可见

区别：

display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见 display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式 修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。 读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容
