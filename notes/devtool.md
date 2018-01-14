


## debug

step over 执行函数并跳过, step into 进入函数, step out 跳出函数

sources里面直接可以修改保存(cmd-s), 然后运行看效果, 打开文件 cmd-p

事件, DOM 可以有 breakpoint

可以再Elements面板移除事件

breakpoint 移动: 点绿色箭头(resume script execution)移到到下一个断点, 或在某一行右键 continue here

breakpoint 可以根据条件 true 进行

按住绿色箭头再点击灰色三角可以跳过所有断点


勾上 Async, 可以显示异步的call stack, 很有用

xhr 断点可以根据url包含某一字符串执行

cmd + p 搜索

watch 可以为表达式

blackbox script 跳转某一文件

- snippit

- call stack
先执行的在下面
callstack 可以 restart frame, 从开始重新执行


## console

在任何标签都可以用 esc 换成 console

$0~$4, 存储最近点击的元素 (DOM)
$vm0~$vm4, 存储最近点击的组件 (Vue)

使用, 而不是+, 可以用 %d, %s

console.dir(): dom 元素
console.assert()
console.trace()
console.table()
console.count()
console.image

$() 	Returns the first element that matches the specified CSS selector. Shortcut for document.querySelector().
$$()	Returns an array of all the elements that match the specified CSS selector. Alias for document.querySelectorAll().
$x()	Returns an array of elements that match the specified XPath.


monitorEvents()
getEventListeners(document)

debug(function)
