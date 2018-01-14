- baseUrl:
* 加载代码相对于 baseUrl, baseUrl + path. 但如果 moduleId 为以下3种情况, 则路径解析不走 baseUrl + path, 而是regular URL that is relative to the document
  - .js 结尾
  - / 开头
  - 包含 http:, https:

最好用 baseUrl , paths config 去设置moduleId 路径
* 通过requirejs config 设置, 如果没设置, 会取 data-main 所在的路径, 如果没有 data-main, 则为运行 requirejs的HTML所在目录

- paths:
路径解析从baseUrl里找不到的从这里找, 路径相对 baseUrl, 除非是以 / , http:, https: 开头

empty: mapping the path to an empty file, allows the optimizer to
resolve the dependency to path, but then does not include it in the output.
Useful to map module names that are to resources on a CDN or other
http: URL when running in the browser and during an optimization that
file should be skipped because it has no dependencies.


- data-main
requirejs开始执行代码的地方

Relative module names are relative to other names, not paths

- map
Sets up a map of module IDs to other module IDs.

\*" map value which means "for all modules loaded, use this map config". If there is a more specific map config, that one will take precedence over the star config

- shim

- optimize
"uglify": (default)
"none": no minification will be done. Use this setting if you are using
ES 2015 or later syntax in your files, since the bundled UglifyJS only
understands ES5 and earlier syntax

- r.js
The r.js file allows you to run the optimizer as well as run modules in Node, Rhino, Nashorn or xpcshell.
If you are running in Node, and want to use npm to install this file via npm, see the Use with Node page for more information.



- grunt
```js
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  },
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    },
  },
});
// Specifying both a task and target like grunt concat:foo or grunt concat:bar will process just the specified target's configuration, while running grunt concat will iterate over all targets, processing each in turn

```
* options
override built-in defaults. In addition, each target may have an options property which is specific to that target. Target-level options will override task-level options.

The options object is optional and may be omitted if not needed.


* files
which files the task should operate.

`expand` Set to true will enable the following properties:

`cwd` All src matches are relative to (but don't include) this path.
`src` Pattern(s) to match, relative to the cwd.
`dest` Destination path prefix.
`ext` Replace any existing extension with this value in generated dest paths.
`extDot` Used to indicate where the period indicating the extension is located. Can take either 'first' (extension begins after the first period in the file name) or 'last' (extension begins after the last period), and is set by default to 'first' [Added in 0.4.3]
flatten Remove all path parts from generated dest paths.
rename Embeds a customized function, which returns a string containing the new destination and filename. This function is called for each matched src file (after extension renaming and flattening). More information
