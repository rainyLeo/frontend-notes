# NPM

CommonJS包规范
- package.json 包描述文件
- bin 存放可执行二进制文件的目录
- lib 存放JavaScript代码的目录
- doc 存放文档的目录
- test 存放单元测试用例的目录

package.json
- dependencies 使用当前包所需要依赖的包列表, NPM会通过这个属性帮助自动加载依赖的包
- scripts 脚本说明对象. 它主要被包管理器用来安装, 编译, 测试和卸载包
- main 模块引入方法 require()在引入包时, 会优先检查这个字段, 并将其作为包中其余模块的入口. 如果不存在这个字段, require()会查找包目录下的index.js, index.node, index.json文件作为默认入口
- devDependencies 一些模块只在开发时需要依赖. 配置这个属性, 可以提示包的后续开发者安装依赖包


`npm init`
`npm install`
`-g` 将一个包安装为全局可用的可执行命令 /usr/local/lib/node_modules
`--save` saved to the package.json file.
`--save-dev` as a dev dependency in your package.json file.

NPM Scripts
`npm run test`

`__dirname` will resolve to the directory the executing script resides in. So if your script resides in `/home/sites/app.js`, `__dirname` will resolve to `/home/sites`. It’s a good idea to use this handy global whenever possible.

`var fortune = require('./lib/fortune.js');`
Note that we prefix our module name with `./`. This signals to Node that it should not look for the module in the `node_modules` directory; if we omitted that prefix, this would fail.

```js
"scripts": { "test": "ava 'app/**/*.test.js' --verbose --require ./other/setup-ava-tests.js" }
```