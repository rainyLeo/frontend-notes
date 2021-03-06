## Ajax

* 更新网页不必重新加载整个页面
* 页面加载完成后 - 向服务器请求数据
* 页面加载完成后 - 从服务器接收数据
* 在后台向服务器发送数据

Ajax 使用内置的 XMLHttpRequest 对象向服务器请求数据, 用 JavaScript 和 HTML DOM 显示或使用数据. Ajax 通过后台和 web服务器交换数据, 允许网页异步更新, 这样可以更新网页的局部, 而不必重载整个页面.

**如何工作**

事件产生, 浏览器:创建 XHR 对象, 发送 Http 请求(request) ---> Internet ---> 服务器处理 Http 请求, 创建 Http 响应( response), 发送数据返回给浏览器 ---> Internet ---> 浏览器处理接收到的数据(用 JavaScript), 更新页面内容


完整步骤

1.创建XMLHttpRequest对象。
2.设置响应HTTP请求状态变化的函数。
3.创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息，发送HTTP请求。
4.在响应HTTP请求状态变化的函数里，获取异步调用返回的数据。
5.最后，使用JavaScript 实现 DOM 局部刷新。

```html
<div id="demo">
<h1>The XMLHttpRequest Object</h1>
<button type="button" onclick="loadDoc()">Change Content</button>
</div>
<script>
function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById('demo').innerHTML = this.responseText;
		}
	};
	xhttp.open('GET', 'ajax_info.txt', true);
	xhttp.send()
}
</script>
```

**XHR 对象属性**

onreadystatechange: 定义回调函数, 当 readyState 属性变化时调用
readyState: 保存 XHR 的状态, 4: 请求完成
responseText: 字符串表示的 response 数据
status: 请求的状态码, 200: 'OK', 403: 'Forbidden', 404: 'Not Found'
statusText: status 的文本内容('OK', 'Not Found')


**向服务器发送请求**

用 XHR 对象的 open() 和 send() 方法发送请求
* open(method, url, async)
  - method: 请求方法类型, GET, POST
  - url: 服务器(文件)地址
  - async: true( 异步), false( 同步)
* send()
 发送请求(用 GET)
* send(string)
 发送请求(用 POST)

**GET 或 POST?**
GET 比 POST 简单和快, 可以再大多数情况下使用.
以下情况使用 POST:
- 发送大量数据给服务器( POST 没有大小限制)
- 发送用户输入(可能包含未知字符), POST 更健壮和安全?


**Axios**

Promise based HTTP client for the browser and node.js
* Make XMLHttpRequests from the browser
* Make http requests from node.js
* Supports the Promise API
* Intercept request and response
* Transform request and response data
* Cancel requests
* Automatic transforms for JSON data
* Client side support for protecting against XSRF
示例
```js
// GET request
axios.get('/user?ID=123')
 .then(function(response) {
	 console.log(response);
 })
 .catch(function(error) {
	 console.log(error);
 })

// 上面的也可以这样写
// query 可以写在 params 里面
axios.get('/user', {
 params: {
	 ID: 123
 }
})
 .then(function(response) {
	 console.log(response);
 })
 .catch(function(error) {
	 console.log(error);
 })

// POST 请求
axios.post('/user', {
 firstName: 'Rainy',
 lastName: 'Leo'
})
 .then(function(response) {
	 console.log(response);
 })
 .catch(function(error) {
	 console.log(error);
 })
```

**axios API**

可以通过传递相关 config 给 axios 发送请求
```js
// POST 请求
axios({
 method: 'post',
 url: '/user/123',
 data: {
	 firstName: 'Rainy',
	 lastName: 'Leo'
 }
});
```

**请求设置**

有可选的 config 选项来发送请求. 只有 url 是必须的. 请求的默认方法是 GET.
```js
{
 url: '/user',
 method: 'get', // 默认
 // baseURL 会加到 url之前, 除非 url 是绝对路径
 baseURL: 'http://some-domain.com/api/',
 transformRequest: [function (data) {
	// Do whatever you want to transform the data
	 return data;
 }],
 headers: {'X-Requested-With': 'XMLHttpRequest'},
 // params 是请求的 URL 参数, 纯对象, ( 一般是query)
 params: {
	 ID: 12345
 },
 data: {
	 firstName: 'Fred'
 },
 // ...
}
```

**响应**

```js
{
 data: {},
 status: 200,
 statusText: 'OK',
 headers: {},
 config: {}
}
```

**Config 默认**

可以设置 config 的默认, 会应用于每一个请求.
```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
