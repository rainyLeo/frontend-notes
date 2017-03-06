### Bable

A wonderful tool for compiling your JavaScript. Bable can transforms JSX into actual JavaScript, can transform future JavaScript to modern day JavaScript so the browser can understand it.
`npm install --save-dev babel-core babel-loader babel-preset-react`: bable-core is babel itself, babel-loader is the webpack loader we'll use, bable-preset-react is to get the JSX -> JS transformation going.

You just give Webpack the single `babel-loader` we installed then that loader will look to a `.babelrc` file that we'll make for each of the babel transformations you want to make.
First, in the same directory where the `webpack.config.js` file is (usually the root directory), we'll need to make a `.babelrc` file which looks like this
```js
// instruct our bable-loader which babel transformation to actually make 
// For now, just react transform, this works because we npm installed babel-preset-react earlier
// In .babelrc
{
	"preset": [
		"react"
	]
}