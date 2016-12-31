## 认识 jQuery
$() 返回一个新的jQuery对象实例, 放在一个数组里面,一个元素也在数组里面.
$(document).ready(), 在DOM加载完毕后调用, 而不必等到页面中图片加载, 类似`DOMContentLoaded`

**jQuery 对象和 DOM 对象**
jQuery 对象才能使用 jQuery 方法, DOM 对象才能使用 DOM 方法;

```js 
var $cr = $('#cr'); // jQuery 对象
var cr = $cr[0]; // DOM 对象

var cr = document.getElementById('cr'); // DOM 对象
var $cr = $(cr); // jQuery 对象

$cr.is(':checked') === cr.checked

```

jQuery 很多方法同时可以获取和设置
attr(), html(), text(), height(), width(), val(), css()


##jQuery对象方法

#### 遍历n n 
`.each()` 
`.map()`
`.grep()`
`.eq()` 将匹配元素集合缩减为集合中指定位置的元素
`.first()`
`.last()`
`.slice()`

### 连缀

几乎所有jQuery方法都会返回一个jQuery对象, 因而可以连缀调用多个jQuery方法.

`.end()` 结束当前链条中最近的筛选操作, 并将匹配元素集合还原为之前的状态

`.pushStack()`用于入栈, `.end()`用于出栈

## 操作DOM

#### 选择器:

标签, ID, 类, 群组, 后代, 通配符, 伪类, 子, 邻居, 属性


否定:`$('li:not(.horizontal)')`,
属性选择符:  `$('img[alt]')'`, `$('a[href^="mailto:"]')`,
Javascript数组从0开始, `:eq(1)`取得是集合中第二个元素, 而CSS是从1开始, `$('div:nth-child(1)')`取得的是作为第一个子元素的所有div元素,
`:eq()` :odd :even 都从0开始
`:nth-child()`是jQuery中唯一从1开始计数的选择符, CSS中也有同名的
`:contains()` 区分大小写
表单选择符: `$('input[type="radio"]:checked')`,所有选中的单选按钮; `$('input[type="password"],input[type="text"]:disabled')`可以选择所有密码输入字段和文本输入字段.

#### 属性操作

1. --类操作
`.addClass(className)`: jQuery在.addClass等方法中使用了隐式迭代机制, 因此一次函数调用就可以完成对所有选择的文档部分的修改, 原生的.classList.add()需一个一个添加
`.removeClass([className])` 从每个匹配元素上移除一个或多个或全部类样式
`.toggleClass([className][,switch])` 为匹配元素集合中的每个元素切换一个或多个或全部类样式
`.hasClass(selector)` 检测匹配元素集中任意元素含有的指定类样式, 只要其中一个元素含有就返回true

2. --HTML属性操作
`.attr(name, value)` 获取匹配元素集合第一个元素的HTML属性值, 或未匹配元素集合设置一个或多个HTML属性 
`.removeAttr(name)` 从匹配元素集中的每个元素上移除一个或多个HTML属性, 多个HTML属性直接用空格隔开

3. --DOM属性操作 
`.prop(name, value)` 获取匹配元素集合第一个元素的DOM属性值, 或为匹配元素集合设置一个或多个DOM属性 
`.removeProp(name)` 从匹配元素集中的每个元素上移除一个DOM属性


`.prop()`与`.attr()` 的区别: 1)优先使用`.prop()`, 因为它总是返回DOM元素最新的状态. 2)涉及自定义HTML属性时使用`.attr()`; 
 1.具有 true 和 false 两个属性的属性，如 `checked`, `selected` 或者 `disabled` 使用 prop(), `$("#checkBox").prop("checked", false)`

An attribute is only ever a string, no other type.

```js
<input type="checkbox" checked=true/>

$('input').prop('checked'); // returns true
$('input').attr('checked'); // returns "checked"
```


4. --值操作

 `.val(value)` 获取匹配元素的当前值, 或修改每个元素的值
 方法主要做的就是对于 `option` 和 `select` 的兼容性的处理，正常情况下直接取 `Element.value` 进行操作，亮点依旧在钩子技术和参数重载上; 当你获取 `option` 元素的 value 属性值时， 如果没有对此 option 显式设置 value 值，获取到的值是 option 的 text;  当 `select` 是单选时，获取的 value 值，就是你选择的那个 option 的值， 如果是多选，获取值时，就是你选择的所有 option 的值的数组形式

 

### DOM内容

`.html()` 不传递参数时, 返回匹配元素的HTML标记, 传入参数后, 元素的内容被传入的HTML替换掉. 要注意传入的HTML必须是有效的,而且要对特殊字符进行转义
`.text()` 取得匹配元素的文本内容,或者用新字符串替换元素的内容.使用`.text`取得内容时所有HTML标签都将被忽略,而所有HTML实体也会被转成对应的字符. 而在通过它设置内容时,诸如<这样的字符,都会被转换成等价的HTML实体.

`.empty()` 移除每个匹配的元素中的元素

`.remove()`,`.detach()` 从文档中移除每个匹配的元素及其后代元素,但不实际删除它们

`is()` 接收一个选择符表达式, 然后用选择符来测试当前的jQuery对象. 如果集合中至少有一个元素与选择符匹配, is()返回true

`$()`可以在括号内放入HTML元素,在HTML中创建新元素

`.wrap()` 添加元素
`.wrapAll()`
`.wrapInner`

`.clone()` 复制元素,传入参数true可以连同事件一起复制

#### DOM查找过滤
`.filter()`
`.find()`
`.not()`
`.closest()`
`.add()`
`.andSelf()`

#### DOM遍历
`.next()` 下一个最接近的同辈元素
`.nextAll()`
`.prev()`
`.prevAll()`
`.siblings()` 获取匹配元素集合中每个元素的所有兄弟元素,可以通过一个选择器表达式过滤找到的元素
`.parent()` 
`.parents()`
`.children()`
`.contents()`

#### DOM插入
`.insertAfter()` 在现有元素外部,之后添加内容
`.insertBefore()` 在现有元素外部,之前添加内容
`.appendTo()` 在现有元素内部,之后添加内容
`.prependTo()` 在现有元素内部,之前添加内容
`.replaceAll()`
`.replaceWith()`


## 事件

jQuery始终会在模型的冒泡阶段注册事件处理程序

`.on()` 通过对.on()的一次调用为每个按钮都绑定相同的点击事件处理程序时, 隐式迭代机制起作用. 行为队列机制让我们在同一个点击事件上绑定了两个函数, 而且第二个函数不会覆盖第一个函数. 如果给.on()方法传入的第二个参数是一个选择符表达式, jQuery会把click事件处理程序绑定到选择的对象, 同时比较event.target和该选择符表达式, 如果匹配, jQuery会把this关键字映射到匹配的元素, 否则不会执行事件处理程序

`.off()` 1.为了让.off()的调用具有针对性, 以避把注册的两个单击处理程序全部移除,可以使用事件命名空间.

```js
$('#switch').on('click.collapse', function(){});
$('#switch').off('click.collapse');
```
对事件处理系统而言, 后缀.collapse是不可见的.

`one()` 对于只需触发一次, 随后要立即解除绑定的情况.

`.trigger()` 模拟事件的操作


- return false; does 3 separate things when you call it :

event.preventDefault(); – It stops the browsers default behaviour.
event.stopPropagation(); – It prevents the event from propagating (or “bubbling up”) the DOM.
Stops callback execution and returns immediately when called.

### 键盘事件
如果想知道用户按了那个键, 应该监听keyup或keydown事件, 如果想知道用户输入的是什么字符, 应该监听keypress事件.

`.which`属性包含被按下的那个键的标识符, 对于字母键而言, 这个标识符就是响应大写字母的ASCII值.(A->65)

事件委托:利用冒泡, 借助一个元素的事件处理程序完成很多工作

```js
if (event.target === this) {
  // 确保点击的元素为选择的元素
}
```

`jQuery.noConflict()`: 把`$`标识符的控制权让出给其他库使用, 在需要使用jQuery方法时, 用jQuery而不是$, 或者在.ready()方法中使用$,
jQuery(document).ready(function($){
  // 这里可以使用
});

## 样式与动画
`.css()` 可获取, 也可设置, 对于`backgroundColor`这样由多个单词构成的属性名, jQuery既可以解释连字符班的CSS表示法(background-color), 也可以解释驼峰大小写形式的DOM表示法(backgroundColor)
`.hover()` 在鼠标指针进入元素和离开元素时, 通过JavaScript来改变元素的样式, .hover接收2个函数参数, 第一个函数会在鼠标进入被选择的元素时执行, 第二个函数会在鼠标指针离开该元素时执行.使用.hover()可以避免事件传播(event propagation)

`.hide()`  会将内联style属性设置为`display:none`. 它的聪明之处在于能够在把display设置为none之前记住原先的display值.
`.show()` 将匹配的元素集合的display属性恢复为应用display:none之前的可见属性.
当在.show()或.hide()中指定时长(一个速度参数时),就会产生动画效果,即效果会在一个特定的时间段内发生.
`.fadeIn()`, 逐渐增大不透明度
`.fadeOut()` 逐渐减小不透明度
`.fadeTo()`
`.slideDown()` 滑动, 仅改变元素的高度
`.sliceUp()`

`.animate()`

`.outWidth()`

## Ajax

`$.getJSON()`



## 插件相关
### 1.给jQuery添加函数

全局函数, jQuery对象的方法,它们是jQuery命名空间内部的函数

1.方法1

```js
(function($) {
  $.sum = function(array) {
    var total = 0;
    
    $.each(array, function(index, value) {
      value = $.trim(value);
      value = parseFloat(value) || 0;
      
      total += value;
    });
    return total    
  }
})(jQuery)
```  

2 .方法2, 扩展全局jQuery对象, 通过$.extend()定义全局函数,

```js
(function($) {
  $.extend({
    average: function(array) {
      if ($.isArray(array)) {
        return $.sum / array.length;
      }
      return '';
    }
  });
})(jQuery)

```

**使用命名空间隔离函数**

```js
(function($) {
  $.mathUtils = {
    average: function(array) {
      //...
    }
  }
})(jQuery)

$.mathUtils.average(array);

```


### 2.给jQuery添加对象方法

添加全局函数需要以新方法来扩展jQuery对象. 添加实例方法于此类似, 但扩展的却是`jQuery.fn`对象

```js
jQuery.fn.myMethod = function() {
  // ...
}
```

`jQuery.fn` 是`jQuery.prototype`的别名, 使用别名是出于简洁的考虑.


#### 对象方法的上下文
一个合理的实例方法应该包含对它的上下文的操作(比如DOM节点)

```js
(function($) {
  $.fn.swapClass = function(class1, class2) {
    this.each(function() {
      var $element = $(this);
      if ($element.hasClass(class1)) {
        $element.removeClass(class1).addClass(class2);
      } else if ($element.hasClass(class2)) {
        $element.removeClass(class2).addClass(class1);
      }
    });
  };
})(jQuery);

$(document).ready(function() {
  $('table').click(function() {
    $('tr').swapClass('one', 'two');
  });
});
```
在对象方法体内, this引用的是一个jQuery对象, 但在每次调用的.each()方法中, this引用的则是一个DOM元素


## 源码解读相关

```js
jQuery = function(selector, context) {

  // The jQuery object is actually just the init constructor 'enhanced'
  // Need init if jQuery is called (just allow error to be thrown if not included)
  return new jQuery.fn.init(selector, context);
};

//
init = jQuery.fn.init = function(selector, context, root) {
  
}

```
`init.prototype = jQuery.fn`

`jQuery.fn = jQuery.prototype`

原型属性和方法:


`.init(selector, context, rootjQuery)` 构造函数, 解析selector和context的类型, 并执行相应的逻辑, 最后返回jQuery.fn.init()的实例

`.pushStack(elements, name, arguments)`
创建一个新的空jQuery对象, 然后把DOM元素集合放入到这个jQuery对象中, 并保留对当前jQuery对象的引用

`.toArray()` 将当前jQuery对象转换为真正的数组
`.selector` 记录jQuery查找和过滤DOM元素时的选择器表达式


`jQuery.extend = jQuery.fn.extend = function() {}`
  
`jQuery.extend()`, `jQuery.fn.extend()` 用于合并两个或多个对象的属性到第一个对象,它们的语法如下:
`jQuery.extend([deep], target, [object1...])`
`jQuery.fn.extend([deep], target, [object1...])`
参数deep是可选的Boolean值, 表示是否进行深度合并(即递归合并).合并默认行为是不递归的;
如果只有一个参数target, 则扩展jQuery对象本身

#### 静态属性和方法

定义在jQuery全局对象上的,要jQuery.noConflict()这样调用

```js
jQuery.extend({
  noConflict: function(deep) {},
  //每一个都相当于
  //jQuery.noConflict = function() {
  //  ...
  //}
  isReady: false,
  readyWait: 1,
  holdReady: function(hold) {},
  ready: function(wait) {},
  bindReady: function() {},
  isFunction: function(obj) {},
  isArray: Array.isArray || function(obj) {}, 
  isWindow: function(obj) {},
  isNumeric: function(obj) {},
  type: function(obj) {},
  isPlainObject: function(obj) {},
  isEmptyObject: function(obj) {},
  error: function(msg) {},
  parseJSON: function(data) {},
  noop: function(data) {},
  camelCase: function(string) {},
  globalEval: function(data) {},
  nodeName: function(elem, name) {},
  each: function(object, callback, args) {},
  trim: trim ? function(text){} : function(test) {},
  makeArray: function(array, results) {},
  inArray: function(elem, array, i) {}, // 在数组中查找指定元素并返回其下标, 未找到则返回-1
  merge: function(first, second) {}, // 合并2个数组的元素到第一个数组      
  grep: function(elems, callback, inv) {}, // 查找数组中满足过滤函数的元素
  map: function(elem, callback, arg) {},
  guid: 1, // 全局计数器, 用于jQuery事件模块和缓存模块
  proxy: function(fn, context) {}, 
  now: function() {}, // (new Date()).getTime() 的简写
  access: function(elems, key, value, exec, fn, pass) {}, 
  sub: function() {},
  uaMatch: function(ua){},
  browser: {}
  
})
```

`jQuery.access(elems, key, value, exec, fn, pass)` 为集合中的元素设置一个或多个属性,或读取第一个元素的属性值. 如果设置的属性值是函数, 并且参数exec是true时, 还会执行函数并取其返回值作为属性值. 为.attr(), .prop(), .css()提供支持

`jQuery.attr(elem, name, value, pass)` 为方法.attr(name, value)提供了基础功能, 是对原生方法getAttribute()和setAttribute()的封装和简化, 并解决了大量的浏览器兼容性问题.

$.each() 和 $(selector).each()的不同:
1.$.each()定义在jQuery全局对象上, $(selector).each()定义在jQuery.prototype上;

```js
// $.each()
jQuery.extend({
  each: function functionName() {
    
  }
});
// 等价于
jQuery.each = function() {
  
}

// $(selector).each
jQuery.fn.extend({
  each: function() {
    
  }
});

// 等价于
jQuery.prototype.each = function() {
  
};

```

2.$.each()可用于任意数字, 对象, 类数组;  
 $(selector).each()只用于jQuery对象



