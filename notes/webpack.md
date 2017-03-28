
## Code Splitting


### Command

`webpack-dev-server` 启动服务器, 运行在内存中
`--content-base src` 设置index.html的目录, include the folder
`--inline` live reload
`--hot` live reload
`webpack` 在应用根目录(或 webpack.config.js 所在目录)
`webpack -w` watch 文件, 有修改时会重新运行 `webpack`
`webpack -p`  production, 会进行压缩

### 概念

- Webpack configurations file: `webpack.config.js` should be located in the root directory of our project
- entry: `./` 不能少, 否则 ERROR in multi main

### loader

**file-loader**

如果你的图片地址是写死在 <template></template> 或者 <style></style> 里的，Webpack 会帮你处理这个图片最终的地址（要用到 file-loader）

```html
<template>
  <img src="./相对地址.jpg">
</template>
```

Webpack 编译后会变成：

`<img src="/绝对地址.jpg">`
但如果你用 Vue.js 来定义图片路径：

```html
<template>
  <img :src="src">
</template>
<script>
export default {
  data () { return { src: './相对地址.jpg' } }
}
</script>
```

那么 file-loader 是无法探测到图片路径的，所以编译之后，你的应用请求的图片地址实际上是：

`<img src="./相对地址.jpg">`

因为编译后的 `index.html` 是在根目录下的，所以实际上请求的地址是 /相对地址.jpg，但你的图片地址应该是在 `/src/images/相对地址.jpg`，所以就会报错。（file-loader 没有探测到你引用了这个图片，所以这个图片甚至都不会出现在你的编译后的文件里面）

所以在是用 Vue.js 动态定义图片路径时，一定要用绝对路径（例如 cdn 路径），或者使用 file-loader 引用你的图片以得到绝对路径：

```js
import yourJPGPath from 'file-loader!./test.jpg'
export default {
  data () { return { src: yourJPGPath } }
}
```

从你的需求来看，你最好先把图片上传到 cdn，然后在接口里返回图片的绝对路径。


**url-loader**

The url loader works like the file loader, but can return a Data Url if the file is smaller than a byte limit.

当图片很小时, 可以设置 base64


### Plugins

react-html-attrs
transform-class-properties
transform-decorators-legacy

```js
// 压缩(编译速度回变慢, 一般生产环境用)
new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})
```

`html-webpack-plugin`: 不是复制 index.html, 而是使用它作为模板, 创建一个新的 index.html.
