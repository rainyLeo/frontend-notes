## Webpack

Webpack at its core, is a code bundler.It takes your code, transforms and bundles it, then returns a brand new version of your code.

there are three main steps Webpack needs no know.
	1. the starting point of your application, or your root JavaScript file.
	2. which transformation to make on your code
	3. which location it should save the new transformed code

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

### loader

**file-loader**

如果你的图片地址是写死在 <template></template> 或者 <style></style> 里的，Webpack 会帮你处理这个图片最终的地址（要用到 file-loader）：
```html
<template>
  <img src="./相对地址.jpg">
</template>
```
Webpack 编译后会变成：

<img src="/绝对地址.jpg">
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
因为编译后的 index.html 是在根目录下的，所以实际上请求的地址是 /相对地址.jpg，但你的图片地址应该是在 /src/images/相对地址.jpg，所以就会报错。（file-loader 没有探测到你引用了这个图片，所以这个图片甚至都不会出现在你的编译后的文件里面）

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



### Command

`webpack`
`webpack-dev-server`
`--content-base src` 设置index.html的目录, include the folder
`--inline` live reload
`--hot` live reload

### Tips

- Webpack configurations file: `webpack.config.js` should be located in the root directory of our project
- entry: `./` 不能少, 否则 ERROR in multi main


```js
// In webpack.config.js
module.exports = {

	// STEP 1
	// webpack allows you to have one or many entry points of your application. if you just have one, you can just use a string.If you have more, you can use an array.
	entry: [
		'./app/index.js'
	],

	// STEP 2
	// Each loader needs to be composed of three things
	// 1. which file type to run the specific transformation on.
	// 2. which directories should be included or excluded from being transformed.
	// 3. the specific loader we want to run
	module: {
		loaders: [
			{test: /\.coffee$/, exclude: /node_modules/, loader: "coffee-loader"}
		]
	},

	// STEP 3
	// __dirname: the name of directory that the currently executing script resides in
	// So now when Webpack runs, our code will be transformed and then can be referenced at ourApp/dist/index_bundle.js
	output: {
		filename: "index_bundle.js",
		path: __dirname + '/dist'
	}
}

```

`html-webpack-plugin`: A plugin,  instead of actually copying our index.html file, it's just gong to use that file as a template and create a brand new index.html file.

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	// points to our regular index.html file located in our app directory
	template: __dirname + '/app/index.html',
	// keep the name index.html
	filename: 'index.html',
	// inject a script which reference the name of the output file(index_bundle.js) and put it in the body of this newly created HTML file
	inject: 'body'
});

module.exports = {
	entry: [
		'./app/index.js'
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	output: {
		filename: "index_bundle.js",
		path: __dirname + '/dist'
	},
	plugins: [HTMLWebpackPluginConfig]
};


```

Now if we run `webpack` from our command line, inside of our dist folder we'll have tow files. `index_bundle.js` and `index.html`.
`index_bundle.js` is the result of taking our entry code and running it through the loaders. While index.html was created on the fly with HTMLWebpackPluginConfig

** Run webpack **
`npm install -g webpack` intall webpack globally then you have access to the webpack CLI (If you haven't, you just have to use npm scripts to run them)
`webpack` In the root directory of your app(or wherever webpack.config.js is located), you can run `webpack` from your terminal and that will do a one time run through of your webpack settings.
However, this can be kind of a pain to keep having to run the command over and over whenever you change anything. To fix this:
`webpack -w` that will watch your files and re-excecute `webpack` whenever any of the files webpack is concerned about changes.
`webpack -p` to production, that will run through the normal transformations as well as minify your code.


** Tips **
- `webpack-dev-server` runs in memory by design, cannot find the `bundle.js`. If you want a real bundle, build through `webpack`.

```js

// In webpack.config.js
module: {
	loaders: [
		{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
	]
}

```

## Code Splitting
