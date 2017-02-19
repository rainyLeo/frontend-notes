## 4.x API  

**express()**
创建一个 Express 应用
```js
var express = require('express');
var app = express();
```

**Methods**
- express.static(root, [options])
 Express 中唯一的内置中间件函数. 它基于 serve-static 为静态文件提供服务
 root 参数为 root directory (静态资源从这里被服务托管). 需托管的文件由组合 req.url 和提供的 root 目录来决定. 当文件找不到时, 不是发送404响应, 而是调用 next()到下一个中间件

 * 属性
  etag, lastModified, maxAge, redirect, setHeaders, fallthrough

- express.Router([options])
创建一个新的 router 对象.

```js
var router = express.Router([options])
```

可选的 options 参数指明了router 的行为

## Application

app 对象通常表示 Express 应用

```js
var express = require('express')
var app = express()

app.get('/', function(req, res) {
	res.send('hello world')
});

app.listen(3000);
```
app 对象有这些方法
 * 路由 HTTP 请求; app.METHOD, app.param
 * 设置中间件; app.route
 * 渲染 HTML 视图; app.render
 * 注册模板引擎; app.engine

它也有一些 settings(属性)影响应用的行为, 见 Application settings
>app 对象可以在 request 对象和 response 对象中通过 req.app, res.app 来引用

**Properties**

- app.locals
- app.mountpath
该属性包含 sub-app 挂载的一个或多个 path patterns

```js
var express = require('express');

var app = express(); // the main app
var admin = express(); // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
});

app.use('/admin', admin); // mount the sub app
```

这和 req 对象的 baseUrl 属性类似, 除了 req.baseUrl 返回匹配的 URL path, 而不是匹配的 patterns.

**Events**

`app.on('mount', callback(parent))`
mount 事件在 sub-app 上触发, 当它 mount 到 parent app 时. parent app 传递给 callback 函数.


**Methods**

- `app.all(path, callback[,callback...])`

 像 app.METHOD(), 但匹配所有的 HTTP 方法
 `path`: 满足路径时中间件函数被调用; 可以是字符串, path pattern, 正则表达式, 由上面组成数组.
 `callback`: 回调函数, 可以是中间件函数, 逗号分隔或数组形式的中间件函数

 你可以提供多个 callback functions 就像 middleware 那样, 除了这些 callbacks 能过调用 next('route') 避开剩下的 route callback(s). 可以用这种机制强制执行 pre-conditions 在一个 route 上, 然后把控制权交给随后的 route 当不必继续当前的 route

 例题
 ```js
 app.all('/secret', function(req, res, next) {
   console.log('Accessing the secret section ...');
   next() //把控制权传递给下一个 handler
 })
 ```

- app.delete(path, callback[,callback])
 Routes HTTP DELETE requests to the specified path with the specified callback functions.
- app.disable(name)
- app.enable(name)
- app.engine(ext, callback)

 默认下, Express 会 require() the engine 根据文件扩展名. 例如, 如果你试图渲染一个 “foo.pug” 文件, Express 在内部调用如下, 并缓存 require() 在之后的调用上以提升性能
 `app.engine('pug', require('pug').__express)`
 当引擎没有提供 `.__express` 用下面方法, 或当你想要 “map” 一个不同的扩展名到模板 engine.
 例如, map  EJS template engine 到“.html” 文件:
 `app.engine('html', require('ejs').renderFile);`
 这种情况, EJS 提供了一个 .renderFile() 方法, 它有 Express 想要的同样的签名 : (path, options, callback),
- app.get(path, callback[,callback...])
 把HTTP GET 请求路由到 path, 并执行 callback

 ```js
 app.get('/', function(req, res) {
   res.send('GET request to homepage')
 })
 ```
- app.listen(path, [callback])
 启动一个 UNIX socket, 在指定的 path 监听连接. 这和 Node 的 http.server.listen()相同
 ```js
 var express = require('express')
 var app = express()
 app.listen('/tmp/sock')
 ```
- app.listen(port, [hostname], [backlog], [callback])
 指定的域名和端口监听连接. 这和 Node 的 http.server.listen()相同
- app.METHOD(path, callback[,callback])
  路由 HTTP request, METHOD 为 HTTP method, 小写形式, app.get(), app.post(), app.put()
- app.param([name], callback)
 给 route parameters 增加回调,  name 是 parameter 的名字或它们的数组. callback 的参数为(req, res, next, parameter值, parameter名)

 如果 name 是一个数组, callback 会注册在其中每一个参数上面. 而且, 对于其中每个参数(除最后一个), 在 callback 内调用 next 会为下一个参数调用 callback. 对于最后一个参数, 调用 next 会调用下一个 middleware 为当前处理中的 route, 就像 name 为 string 时会做的那样.

 参数 callback 是它定义之上的 router 的局部变量. 它们不会被 mounted apps 或 routers 继承. 因此, app 上定义的 param callbacks 会仅通过 app routes 上定义的 route parameters 被触发.

 callback 在一个 request-response 周期中仅被调用1次, 即使 name 参数匹配多个 routes, 例如以下例子.
- app.path()
 返回 app 路径, 字符串形式
- app.post(path, callback[,callback...])
  把HTTP POST 请求路由到 path, 并执行 callback
  ```js
  app.post('/', function(req, res) {
    res.send('POST request to homepage')
  })
  ```
- app.put(path, callback[,callback...])
   把HTTP PUT 请求路由到 path, 并执行 callback
- app.render(view, [locals], callback)
 通过 callback 返回 view 的渲染过的 HMTL.
 像 res.render(), 但它不能给客户端发送 rendered view.

- app.route(path)
返回一个单一路由的实例, 你可以用它和可选的中间件一起处理 HTTP 方法.

```js
var app = express();

app.route('/events')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get(function(req, res, next) {
    res.json(...);
  })
  .post(function(req, res, next) {
    // maybe add a new event...
  });
```

- app.set(name, value)
 把 value 值赋值给 name, name 是 app settings table 其中属性之一

- app.use([path,] callback[,callback...])
 在指定的 path 挂载中间件函数: 这个函数当 base of request path 匹配 `path` 时会执行.
 例如: app.use('/apple', ...) 匹配 “/apple”, “/apple/images”, “/apple/images/news” 等等.
 由于 `path` 默认为'/', 当没有 path 时, middleware 函数会在 app 的每一次 request 时执行


## Request

req 对象表示 HTTP 请求, 它有一些属性, 对应请求的 query string, parameters, body, HTTP headers 等等 . res 为 HTTP 响应

示例:

```js
app.get('/user/:id', function(req, res) {
	res.send('user ' + req.params.id);
});
```
req 对象是 Node自带的 request 对象的增强版, 它支持所有内置的 fields 和 methods

**属性**

- req.app
 这个属性保存一个指向 Express 应用实例的引用
- req.baseUrl
 router 实例挂载的 URL 路径

 示例:
 ```js
 var great = express.Router()

 greet.get('/jp', function(req, res) {
   console.log(req.baseUrl); // /greet
   res.send('Kawayi')
 })

 app.use('/greet', greet) // load router on '/greet'
 ```
- req.body
 包含 request body 中提交的 key-value 对格式的数据. 默认为 undefined, 当用一些 body-parsing 中间件 例如 body-parser 时, 它就有值了
 示例:

 ```js
 var app = require('express')()
 var bodyParser = require('body-parser')
 var multer = require('multer')
 var upload = multer() // parsing multipart/form-data

 app.use(bodyParser.json()) // parsing application/json
 app.use(bodyParser.urlencoded({ extended: true })) // parsing application/x-www-form-urlencoded

 app.post('/profile', upload.array(), function(req, res, next) {
   console.log(req.body)
   res.json(req.body)
 })
 ```

- req.cookies
 当使用 cookie-parser 中间件时, 这个属性是一个包含 request 发送的 cookie 的对象. 如果 request 不包含 cookie, 它默认为 {}
- req.fresh
- req.hostname
- req.ip
- req.method
- req.originalUrl
 该属性是 req.baseUrl 和 req.path 的组合

 ```js
 app.use('/admin', function(req, res, next) { // GET 'http://www.example.com/admin/new'
   console.log(req.originalUrl); // '/admin/new'
   console.log(req.baseUrl); // '/admin'
   console.log(req.path); // '/new'
   next()
 })
 ```

- req.params
 包含属性的对象, 这些属性映射到 `route parameters`.

   *route parameters*: 命名的 URL 部分, 用来捕获 URL 中相应位置的值. 捕获的值在 req.params 对象中, 路径参数中的名字作为各自的 key

   ```js
   Route path: /users/:userId/books/:bookId
   Request URL: http://localhost:3000/users/34/books/8989
   req.params: { "userId": "34", "bookId": "8989" }
   ```
   用 route parameters 定义 routes, 在 route 路径中指明 route parameters

   ```js
   app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
   })
   ```

 例如, 你有这样的路由(route), `/user/:name`, 那么 'name' 属性可以这样 req.params.name 获得. 这个对象默认为 {}.

 ```js
 // GET /user/tj
 req.params.name
 // => 'tj'
 ```

 当使用正则表达式, 捕获组可以用 req.params[n]. 例如 /file/*
 ```js
 // GET /file/javascripts/jquery.js
 req.params[0]
 // => "javascripts/jquery.js"
 ```

- req.path
 包含请求 URL 的 path part
 ```js
 // example.com/users?sort=desc
 req.path
 // => "/users"
 ```
- req.protocol
- req.query
 包含 route 中每一个 query string 参数对应属性的对象, 如果没有 query string, 它就为空对象{}.
 ```js
 // GET /search?q=tobi+ferret
 req.query.q
 // => 'tobi ferret'

 // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
 req.query.order
 // => "desc"
 req.query.shoe.color
 // => "blue"
 req.query.shoe.type
 // => "converse"
 ```

- req.route
 包含当前匹配的 route, 为字符串  
- req.secure
- req.signedCookies
- req.stale
- req.subdomains
- req.xhr

**方法**
- req.accepts(types)
- req.accetsCharsets(charset[,...])
- req.acceptsEncodings(encoding[,...])
- req.accptesLanguages(lang[,...])
- req.get(field)
- req.is(type)
- req.range(size[, options])

## Response
res 对象代表 HTTP 响应.

```js
app.get('/user/:id', function(req, res) {
  res.send('user ' + req.params.id)
})
```

**属性**

- res.app
- res.headersSent
- res.locals

**方法**

- res.append(field[, value])
- res.attachment([filename])
- res.cookie(name, value[, options])
 设置 cookie 的 name, value. value 可以是字符串或转换为 JSON 的对象
- res.clearCookie(name[, options])
- res.download(pathp[,filename][,fn])
- res.end([data][, encoding])
 结束响应.没有数据返回, 如果你要返回数据, 用 res.send()和 res.json()
- res.format(object)
- res.get(field)

- res.json([body])
 发送一个 JSON 响应. 该方法发送一个响应(使用正确的 content-type), 是参数经过 JSON.stringify() 转换后的 JSON 字符串.
 参数可以是任意 JSON 类型, 包括 object, array, string, Boolean, or number, 你也可以用它把其他值转为 JSON, 例如s null, and undefined (尽管这些严格意义上不是有效的 JSON).

 ```js
 res.json(null);
 res.json({ user: 'tobi' });
 res.status(500).json({ error: 'message' });
 ```
- res.jsonp([body])
- res.links(links)
- res.location(path)
- res.redirect([status,]path)
- res.render(view[,locals][,callback])

- res.send([body])
 发送 HTTP 响应, body参数可以为 Buffer对象, 字符串, 对象或数组

 ```js
 res.send({ some: 'json' })
 res.send('<p>some html</p>')
 res.status(404).send('Sorry, we cannot find that')
 res.status(500).send({ error: 'something blew up' })
 ```

 这个方法对于简单的 non-streaming 响应可以做很多事情, 例如, 它能自动填充 Content-Length HTTP 响应头部(除非之前定义过), 并提供了自动的 HEAD 和 HTTP cache freshness 支持.

 当参数是字符串, 该方法把 Content-Type 设为 'text/html'
 当参数是数组或对象, Express 以 JSON 格式响应

- res.sendFile(path[, options][, fn])
- res.sendStatus(statusCode)
- res.set(field[, value])
- res.status(code)
- res.type(type)
- res.vary(field)


## Router

router 对象是一个中间件和路由的实例. 可以把它想象成一个'迷你-app', 只可以执行中间件和路由函数. 每个 Express 应用有一个内置的 app router

router就像中间件那样, 因此你可以把它作为 app.use()的参数或是另一个 router 的 use()方法的参数.

express对象有一个 Router()方法可以创建一个新的 router 对象.

当你创建一个 router对象后, 你可以在它上面添加中间件和 HTTP 方法路由(例如 get, put, post 等)

```js
//  传递给该 router的任意请求时调用
router.use(function(req, res, next) {
  // ... some logic
  next()
})

// 处理以 /events 结尾的任意请求
// 取决于 router 在哪被 'use()'d
router.get('/events', function(req, res, next) {
  // ..
})
```
你可以用以下方式把 router 用在一个特定的根 URL 上, 把 routes 分在不同的文件

```js
// 仅向 /calendar/* 的请求被发送到我们的'router'
app.use('/calendar', router)
```

**方法**

- router.all(path,[callback,...]callback)
 该方法很像 router.METHOD() 方法, 不同的是它匹配所有的 HTTP 方法(动词)
- router.METHOD(path,[callback,...]callback)
 该方法提供了 Express 中的路由功能, METHOD 是 HTTP 方法之一, 例如 GET, PUT, POST 等, 用的小写形式. 因此, 实际的方法为 router.get(), router.post(), router.put()等等

 你可以提供多个 callback, 所有的都是平等的, 就像中间件那样, 除了这些 callback 可能会调用 next('route') 来避开剩下的 callback.

 以下的代码是一个简单的路由定义. Express 把 path strings 转为正则表达式, 用来匹配之后的请求. Query strings 在进行这些匹配时不考虑在内, 例如 'GET /'会匹配以下的 route, 'GET /?name=tobi' 也会

 ```js
 router.get('/', function(req, res) {
   res.send('hello world')
 })
 ```
 也可以使用正则表达式
- router.param(name, callback)
  加入 route parameters 触发的 callback, name 是参数 parameter 的名字, callback 是 回调函数.

callback 函数的参数有:

 * req, the request object.
 * res, the response object.
 * next, indicating the next middleware function.
 * The value of the name parameter.
 * The name of the parameter.

和 app.param() 不同, router.param() 不接受数组形式的 route parameters.

参数 callback 是它定义的 router 的局部变量. 它们不会被 mounted apps 或 routers 继承. 因此,  router 上定义的 param callbacks 会被触发仅通过 router routes 上定义的 route parameters.

callback 在一个 request-response 周期中仅被调用1次, 即使参数匹配多个 routes, 例如以下例子.

```js
router.param('id', function(req, res, next, id) {
  console.log('Called only once');
  next();
})

router.get('/user/:id', function(req, res, next) {
  console.log('although this matches');
  next()
})

router.get('/user/:id', function(req, res) {
  console.log('and this matches too');
  res.end();
})
```

- router.route(path)
 返回一个单个 route 的实例, 你可以用来处理 HTTP 方法(和可选的中间件一起). 使用 router.route() 来避免重复的路由命名和打字错误.

 和上面的 router.param() 示例一起, 以下代码展示了怎样用 router.route() 来处理不同的 HTTP 方法.

 ```js
 var router = express.Router()

 router.param('user_id', function(req, res, next, id) {
   req.user = {
     id: id,
     name: 'TJ'
   }
   next()
 })

 router.route('/users/:user_id')
   .all(function(req, res, next) {
     // 首先所有的 HTTP 方法都会运行
     // 把它看为route 特定的中间件
     next()
   })
   .get(function(req, res, next) {
     res.json(req.user)
   })
   .put(function(req, res, next) {
     req.user.name = req.params.name
     res.json(req.user)
   })
   .post(function(req, res, next) {
     next(new Error('not implemented'))
   })
 ```
 这个方法 re-uses 单一的 /users/:user_id 路径, 并为不同的 HTTP 方法添加了处理器.


- router.use([path], [function,...]function)
 使用特定的中间件函数或函数, 可选的挂载路径 path, 默认为'/'.
 该方法和 app.use() 类似.一个简单的例子在下面
 中间件就像管道, 请求从第一个中间件开始, 一层层往下.

 ```js
 var express = require('express')
 var app = express()
 var router = express.Router()

 // 对应这个 router 请求的简单的 logger
 // 所有的到这个 router 的请求会首先命中中间件
 router.use(function(req, res, next) {
    console.log('%s %s %s', req,method, req.url, req.path)
    next()
 })

 // 仅当路径以 /bar 开头时调用
 router.use('/bar', function(req, res, next) {
   // ...
   next()
 })

 // 总是调用
 router.use(function(req, res, next) {
   res.send('Hello World')
 })

 app.use('/foo', router)
 app.listen(3000)
 ```

 '挂载'路径对于中间件函数不可见. 这个的主要影响是挂载的中间件函数可能会运行, 不论它的'前置'路径名是什么.
 你使用 router.use() 定义中间件的顺序很重要. 它们一次被调用, 因此顺序就是中间件的优先级. 例如, 通常 logger 是第一个使用的中间件, 这样每个请求都能 log
 ```js
 var logger = require('morgan')

 router.use(logger())
 router.use(express.static(__dirname + '/public'))
 router.use(function(req, res) {
   res.send('Hello')
 })
 ```

 现在假设你想要为静态文件忽略 logging 请求, 但为 logger()之后的中间件继续 logging . 你可以把 express.static() 移到上面, 在添加 logger 中间件之前:
```js
 router.use(express.static(__dirname + '/public'));
 router.use(logger());
 router.use(function(req, res){
   res.send('Hello');
 });
```

## Guide

### Routing

- Basic routing
Routing 就是决定应用怎样 responds 一个 request 在特定的端点, 也就是 URI (or path) 和一个特定的 HTTP 请求方法 (GET, POST, and so on).

每个 route 可以有一个或多个 handler functions, 当 route 匹配时会执行

Route 的定义如下:

```js
app.METHOD(PATH, HANDLER)
```

以下示例为定义简单的 routes

```js
var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.post('/', function(req, res) {
  res.send('Got a POST request')
})
```

- Route 方法
route 方法来源于 HTTP 方法, 归属于 Express 的实例.
上面示例在 app 的 root 路径上定义了 GET 和 POST 方法

- Route paths
Route paths 可以是 strings, string patterns, or regular expressions.
符号 `?, +, *,  ()` 是它们正则对应的子集. 连字符 (-) 和点 (.) 按字面解释以 string-based paths.

```js
app.get('/ab+cd', function(req, res) {
  // ...
})
```

- Route parameters
Route parameters 是命名的 URL 部分, 用来捕获 URL 中相应位置的值. 捕获的值会在 `req.params` 对象中, path 中的 route parameters 名字作为各自的 key

```js
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```
要用 route parameters 定义 routes, 只要在 route path 中指定 route parameters, 如下:

```js
app.get('/users/:userId/books/:bookId', function (req, res) {
 res.send(req.params)
})
```

因为 - 和 . 会按照字面意义解析, 它们在特定情况下也有用

```js
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

- Route handlers
你可以提供多个 callback functions 就像 middleware 那样, 但这些 callbacks 能过调用 next('route') 避开剩下的 route callback(s). 可以用这种机制强制执行 pre-conditions 在一个 route 上, 然后把控制权交给随后的 route 当不必继续当前的 route

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

- Response 方法
 * res.download()	Prompt a file to be downloaded.
 * res.end()	结束响应进程.
 * res.json()	发送 JSON response.
 * res.jsonp()	发送 JSON response with JSONP support.
 * res.redirect()	重定向 a request.
 * res.render()	渲染 a view template.
 * res.send()	发送 a response of various types.
 * res.sendFile()	发送 a file as an octet stream.
 * res.sendStatus()	设置 the response status code and send its  * string representation as the response body.

- app.route()
你可以使用 app.route() 对一个 route path 创建链式的 route handlers. 因为 path 在单个位置指定, 有利于创建模块化的 routes.

```js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book')
  })
  .post(function(req, res) {
    res.send('Add a book')
  })
```

- express.Router
-
使用 express.Router 创建模块化, 可挂载的 route handlers. 一个 Router 的实例是一个完整的中间件和路由系统. 因为这个原因, 它也被称为 'mini-app'
以下例子创建了一个 router 作为一个模块, 在其中载入中间件, 定义了 routes, 在主 app 上挂载 router 模块.
在 app 目录中创建一个 router 文件取名 birds.js, 内容如下:
```js
var express = require('express')
var router = express.Router()

router.use(function timelog(req, res, next {
  console.log('Time: ', Data.now());
  next()
})

router.get('/', function(req, res) {
  res.send('Birds Home page')
})

router.get('/about', function(req, res) {
  res.send('About birds')
})

module.exports = router
```
然后在 app 中载入 router 模块
```js
var birds = require('./birds')
// ...
app.use('/birds', birds)
```

### 中间件
http://expressjs.com/en/guide/using-middleware.html

中间件是这样的函数: 在应用的 request-response 周期中可以访问请求对象(req), 响应对象(res), 和下一个中间件函数(next).
中间件可以做以下事情:
 * 执行代码
 * 改变请求和响应对象
 * 结束请求-响应周期
 * 调用下一个中间件函数

如果当前的中间件函数没有结束 请求-响应 周期, 它必须调用 next() 把控制权传递给下一个中间件函数, 不然的话, 请求会一直挂着.
Express 应用可以用以下类型中间件
 * Application-level 中间件
 * Router-level中间件
 * Error-handling 中间件
 * Built-in 中间件
 * Third-party 中间件


- Application-level中间件

通过 app.use(), app.METHOD() 把 Application-level 的中间件绑定到 app 对象的实例

为了跳过剩下的中间件函数从 router middleware stack, 调用 `next('route')` 把控制权传递给下一个 route. 注意: next('route') 只工作在通过 app.METHOD() 或 router.METHOD() 载入的中间件函数.

```js
var app = express()

app.get('/user/:id', function(req, res, next) {
  // 如果 user ID 为 0, 跳到下一个 route
  if (req.params.id === '0') {
    next('route')
  } else {
    // 否则把控制权传递给下个中间件函数
    next()
  }
}, function(req, res, next) {
  res.render('regular')
})

// 处理 /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special')
})
```

- Router-level 中间件
-
Router-level 中间件和 Application-level 中间件同样使用, 除了它绑定到 express.Router() 的实例

```js
var router = express.Router()
```
使用 router.use() 和 router.METHOD() 载入 router-level 中间件.

```js
var app = express()
var router = express.Router()

router.use('/user/:id', function(req, res, next) {
  console.log('Request URL: ', req.originalUrl);
  next()
}, function(req, res, next) {
  console.log('Request Type: ', req.method);
  next()
})

router.get('/user/:id', function(req, res, next) {
  if (req.params.id === '0') {
    next('route')
  } else {
    next()
  }
}, function(req, res, next) {
    res.render('regular')
})

router.get('/user/:id', function(req, res, next) {
  console.log(req.params.id);
  res.render('special')
})

app.use('/', router)
```

- Error-handling 中间件
Error-handling中间件总是有4个参数. 必须总是提供4个参数, 即使用不到 next.
```js
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

- Built-in 中间件
唯一的内置中间件是 express.static.
`express.static(root, [options])`

- Third-party 中间件
```js
var cookieParser = require('cookie-parser')
app.use(cookieParser())
```


## 第三方

flightplan
capistrano

handblebars
hogan / jade
ejs

express-handlebar
express-generator

- winston
a multi-transport async logging library for node.js
- express-winston
winston middleware for express.js
- morgan
HTTP request logger 中间件 for node.js
- file-stream-rotator
To provide an automated rotation of Express/Connect logs based on date.


- cors
Node.js 包, 提供express 中间件用来允许 CORS
- nodemon
 nodemon test.js

- body-parser
 Node.js body parsing 中间件
- axios
 
```
- mongoose
