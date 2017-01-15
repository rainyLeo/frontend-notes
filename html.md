
- doctype
This doctype declaration is the  first line in the HTML, and defines what version of HTML you’re using (such as HTML5 or HTML 4.01 Transitional).
If you mistype the doctype declaration or leave it out, you can throw most browsers into an altered state called *quirks mode*. 
Quirks mode is browser manufacturers’ attempt to make their software behave like  old browsers

## meta

**简介**

<meta> 标签用来提供关于 HTML 文档的元数据. 它不会显示在页面上，但是机器却可以解析。
meta常用于具体说明页面描述性内容，包括关键字，作者, 最后修改时间，和其它的元数据。这些元数据可以被浏览器使用（如何显示内容或重载页面），被搜索引擎使用(关键字)和其它网络服务。

**Tips and Notes**

* <meta>标签总是在<head>内部
* Metadata 总是 name/value 的一组
* 如果 name 或者 http-equiv 属性有的话, content 属性也一定要有. 如果没有的话, content 属性也不能定义

**HTML4.01 和 HMTL5 的区别**

HTML5有一个新的属性 charset, 定义 charset 更方便
* HTML4.01: <meta http-equiv="content-type" content="text/html; charset=UTF-8">
* HTML5: <meta charset="UTF-8">

**示例**

1. 为搜索引擎定义关键字
<meta name="keywords" content="HTML, CSS, JavaScript">
2. 为网页定义描述
<meta name="decription" content="rainyleo blog">
3. 定义页面的作者
<meta name="author" content="rainyleo">
4. 每 30 秒属性一次
<meta http-equiv="refresh" content="30">

**属性**

name: metadata 的名称
http-equiv: 为 content 属性值提供 HTTP header
charset: 指明 HTML 文档的字符编码
content: 定义 http-equiv 或 name 属性的值

**name 属性值示例**

* viewport(移动端窗口)
移动端浏览器在一个通常比屏幕更宽的虚拟"窗口"(视口)中渲染页面, 从而无需将所有页面都压缩进小屏幕里(那样会把很多没有针对移动端进行优化的站点打乱). 用户可以通过平移和缩放来浏览页面的不同区域.

`<meta name="viewport" content="width=divice-width, initial-scale=1, maximum-scale=1">`
width 属性控制视口的宽度. 可以像 width=600这样设为确切的像素数, 或者设为 device-width 这一特殊值来指代比例为100%时屏幕宽度的 CSS 像素数值.

initial-scale 属性控制页面最初加载时的缩放比例. maximum-scale, minimum-scale及 user-scalable 属性控制允许用户以怎样的方式放大或缩小页面.

* robots(定义搜索引擎爬虫的索引方式)
robots 用来告诉爬虫哪些页面需要索引, 哪些页面不需要索引, content 的参数有 all, none, index, 您的心, follow, nofollow, 默认是 all
`<meta name="robots" content="none">`


**http-equiv 属性**

* X-UA-Compatable
用于告诉浏览器以何种版本来渲染页面(一般设为最新模式)
`<meta http-equiv="X-UA-Compatable" content="IE=edge, chrome=1" />`
指定 IE 和 chrome 使用最新版本来渲染当前页面

* cache-control
指定浏览器如何缓存某个相应以及缓存多长时间
`<meta http-equi="cache-control" content="no-chche">`

* 其他
expires: 网页到期时间
refresh: 自动刷新, 可指向设定的网址
Set-Cookie: cookie 设定


## DNS prefech

提前解析后面可能用到的域名, 加快网站的访问速度
`<link rel="dns-prefetch" href=//a.bcdn.com>`


## entity

close x: &times; &#x274C; &#x274E;
