
## 外部 / 内部

外部优点: 可缓存, 维护方便, 但需要一次 http 请求

## 路径

同一个目录下, href="styles.css"
不同目录, 相对路径

## 层叠

- 浏览器默认样式
- 文档的样式
- 每个独立的 HTML 元素的 style 属性


1. 居中 div: 设定 div 的宽度, 水平 margin 设为 auto
2. line-height 可以让文本垂直居中(可设置 line-height 等于 height)

## 选择符

Sibling Selector: `+, ~`

**优先级**

按照顺序:
inline > internal > external > browser default (同样的 weight 时)
优先级:
inline > id > class = attritube = pseudo > tag = pseudo element

优先级一样时, 后出现的高
!important 最高

1.每个选择器都有一个权值，权值越大的优先级越高。
2.权值相等时，后出现的覆盖先出现的。
3.用JS代码指定的样式，相当于增加了一段行内样式。
4.!important规则的优先级最大（这条规则只适用于支持!important的浏览器，像IE6这样的就不支持）

## 继承

font, color, line-height, border-collapse, border-spacing, word-spacing, letter-spacing, list-style, text-align, text-indent, text-transform, white-space, cursor, direction

- 最近的祖先样式比其他祖先样式优先级高
- “直接样式”比“祖先样式”优先级高
- 继承的都是计算后的绝对值

## 盒模型

**content-box**

默认, width 和 height 为 content 的尺寸, 不包括 padding, border 和 margin.
注意: padding, border, margin 在 box 之外, 例如 `.box {width: 350px; border: 10px solid balck;}`, 结果是浏览器中渲染出 `.box {width: 370px}`

元素的尺寸是这样计算的: width = width of content, height = height of content


**border-box**

width 和 height 包括 content, padding, border, 不包括 margin.
注意: padding 和 border 在 box 之内, 例如 `.box {width: 350px; border: 10px solide black;}`, 浏览器中渲染出 `.box {width: 350px}`

元素的尺寸这样计算: width = border + padding + width of content, height = border + padding + height of content.

**padding**
padding 在内容区域周围. background 会用在 content 和 padding 上. 因此 padding 常用来缓冲 content 让它在背景之下没那么刺眼.

**margin**
margin是透明的看不见的, 通常用来分隔开不同元素.




*block 元素*

1. 独占一行(从新的一行开始, 其后元素另起一行)
2. 可以设置 height, width, line-height, vertical...
3. 元素宽度默认和父元素一致, 不设置宽度有时会 100%
4. 如果未定义高度, 则高度取决于内容的高度.
5. div, p, ul, li, table, form, h1~h6, blockquote, aside, article, address, figure, header, hgroup, hr, main, nav, footer, video, canvas, dd, dl


*inline 元素*

1. 和其他元素在一行
2. 不可设置 height, width, 垂直 padding/margin/border
3. 元素宽度就是包含的文字图片宽度, 不可改变
4. 修改尺寸通过 line-height, 水平 padding/margin/border
5. span, a, em, label, i, strong

*inline-block*

1. 和其他元素在一行
2. 可设置 height, width, line-height
3. button, img, input


- width 的百分比相对于父元素
- margin 是透明的, 用来控制间隔, 可为负值
- 文档流中, block 元素默认宽度为100%, 占据一行, float 让2个 block 元素可以并排在一行.
- block 元素中的第一行文本会被当做 block 元素
- 元素 float, absolute 定位时会脱离文档流, 当没有设置元素的宽度时, 元素的宽度随内容的变化而变化; 会自动以 inline-block 的方式显示, 可以设置 width, height
- 普通文档流中, block 元素的垂直 margin 会发生 margin 叠加
- display: none 脱离文档流, 不在渲染树; visibility: hidden, 仍在文档流中, 占据空间
- outline vs border: 和 border不同, outline 在元素盒子之上, 不会影响盒子的大小和位置. 因此, 它可以用来找 bug, 因为它不会改变页面的布局.
- float vs absolute: If you want your div to interact and be effected by the other divs on the page, use floats. If you want you div to stay in the same place no matter how the dom changes around it, use absolute positioning; If the elements are meant to interact with each other, use floats. If an element is independent of the content around it, use absolute positioning.

- 空白节点, block 元素内部的 inline 元素的行为表现，就好像 block 元素内部还有一个（更有可能两个-前后）看不见摸不着没有宽度没有实体的空白节点. 对于 inline 元素各种想得通或者想不通的行为表现，基本上都可以用 vertical-align 和 line-height 来解释.
原因: vertical-align 默认值是 baseline, 也就是基线对齐。而基线是什么，基线就是字母 x 的下边缘, 字符 x 本身是有高度的, 于是，图片下面就留空了, 而 x 文字的高度是由 line-height 决定的
解决: 1. 让 vertical-align 失效, display: block; 2. 使用其他的 vertical-align 值 3. 修改 line-height 的值

## 定位

**absolute**

- 元素位置相对于距离它最近的-已定位的(除 static)-祖先元素, 如果没有, 则相对于文档左上角
- 脱离文档流, 不占据空间, 普通文档流中其他元素的布局就像它不存在时一样
- 可能覆盖页面上其他元素, 可通过设置 z-index 来控制叠放次序

**relative**

在正常文档流中的位置

**fixed**
相对于浏览器窗口进行定位


## 浮动

浮动元素脱离文档流。浮动的框可以向左或向右移动，直到他的外边缘碰到包含框或另一个浮动框的边框为止,
文字和 inline 元素会包围浮动.

设定希望定位的元素的宽度, 然后 float left/right

1. 浮动元素不在文档流中, 不对包围它们的 block box 产生影响, 脱离父元素框
2. 对相邻的后面元素产生影响

清除浮动的三种方法

1.为父元素添加 overflow: hidden（第一个方法很简单，缺点是不太直观.）
2.同时浮动父元素（比较麻烦，还需 clear 父元素同级元素）
3.为父元素添加 after 伪类很方便，或父元素的最后添加一个非浮动的子元素添加 clear 。
4.父元素 display: flow-root

```css
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
```

## 居中

**水平居中**
1. inline-* 元素: 父 block 元素设置 text-align: center
2. 1个block 元素: 设置 width(不设置的话等于父元素的 width), 水平 margin 设为 auto
3. 多个 block: 设置 display: inline-block; 或用 flex, 父元素 { display: flex; justify-content: center;}

**垂直居中**
1. inline-* 元素:
 - 单行: 上下 padding 相同; 或 line-height 等于 height
 - 多行: 上下 padding 相同; 或 { display: table-cell; vertical-align: middle;}, 父 block 元素 display: table; 或用 flex,  父 block 元素 {display: flex; flex-direction: column; justify-content: center; resize: vertical; overflow: auto} 或用伪元素, div{position: relative;} div:before{ content: ' '; display: inline-block; height: 100%: width: 1%; vertical-align: middle;} p {display: inline-block; vertical-align: middle}

2. block 元素
 - 知道元素高度: .parent { postion: relative; }, .children { postion: absolute; top: 50%; height: 100px; margin-top: -50px }
 - 不知道元素高度: .parent { postion: relative }, .children { position: absolute; top: 50%; transform: translateY(-50%); }
 - 可以使用 flex, .parent { display: flex; flex-direction: column; justify-content: center; }


 **水平垂直居中**
 1. 元素有固定的宽度和高度: .parent { position: relative }, .child { width: 300px; height: 100px; padding: 20px; position: absolute; top: 50%; left: 50%; margin: -70px 0 0 -170px; }
 2. 不知道元素的宽度和高度: .parent { position: relative; } .child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)};
 3. 可以使用 flex, .parent { display: flex; justify-content: center; align-items: center; }, 或 .child { margin: auto; }


## 伪类

:link 没有被访问过的链接
:visited 被访问过的链接
:hover 鼠标悬停
:focus 键盘移动到链接上, 显示的与鼠标悬停时相同. 或鼠标点击, 例如输入框
:active 单击时

顺序: Lord Vader Hates Fury Animals

:link 和 :visited 只能用于 a 标签, :hover, :active, :focus  可以用在任何元素上

:first-child
:last-child

:not
:after
:before
:target
:enabled
:checked

:nth-child
:nth-of-type
例子:
```html
<div>
    <h1>Hello</h1>

    <p>Paragraph</p>

    <p>Target</p>
</div>
```
p:nth-child(2) : <p>Paragraph</p>
p:nth-of-type(2): <p>Target</p>


## 布局

CSS 布局主要依赖3个基本概念: 定位, 浮动, margin

- Float
设置宽度, 然后 float left 或 right;
需要清除浮动: overflow, clear
* 两列布局
一个左浮动, 一个右浮动; (设置宽度)
* 三列布局
一个左浮动(左, 右), 一个右浮动

- 定宽, 流体, 弹性布局

* 流体布局
尺寸用百分比 % 而不是像素.
最好设置 min-width,

* 弹性布局
弹性布局设置元素宽度相对于字体大小(em)而不是浏览器宽度.
最好设置 max-width
浏览器默认字体大小大多是 16px. 所以 font-size: 62.5%, 1em = 10px
内部元素宽度用百分比, 包装元素宽度用 em

- 流体和弹性 图片
1.对于需要很宽的图片, 例如 header中的, 可以用背景图代替 image 元素, 当元素放大时图片缩放的比较好;;
2.如果图片需要为 img 元素, 可以设置父元素的 width: 100%, overflow: hidden
3.对于内容图片, 需要垂直和水平放大, 可以设置图片的百分比宽度, 和 max-width 等于图片自身宽度

- Faux 列
通过添加重复的背景图撑开元素的高度

- 等高列
CSS3 : column-count, column-width, column-gap

## 其他概念

BFC, 包含块(Containing block)

## 百分比

百分比值是一种相对值，任何时候要分析它的效果，都需要正确找到它的参照

一个css属性值从定义到最终实际使用，是存在一个过程的。这其中涉及到Specified Values（指定值）、Computed Values（计算值）、 Used Values（使用值）、Actual Values（实际值）等概念，可以想见到，百分比值实际会在这个过程中，根据它的参照计算转化为一个绝对值（比如100px），然后再被应用。这就是百分比值的意义。


宽和高在使用百分比时, 其参照都是元素的包含块(Containing block). 包含块就是父元素的内容区(盒模型的 content)

width: 参照父元素 content width
height:  参照父元素 content height

当一个元素的高度使用百分比, 其父元素没有高度定义时, 且这个元素不是绝对定位, 则该百分比值等同于 auto . 这时子元素的 height 百分比高度是不起作用的，常见的就是 height:100% 无效，而宽度就没有此问题

如果元素是根元素(html), 其包含块是视口(viewport) 提供的初始包含块, 初始包含块的高度等于视口高度. 所以, html 标签的高度定义百分比总是有效的. 如果希望在 body 里也用高度百分比, 就一定要先为 html 定义高度.

对于 margin 和 padding, 其任意方向的百分比值, 参照都是包含块的宽度.

border-radius: 参照这个元素自身的尺寸

background-position: 参照是一个减法计算值，由放置背景图的区域尺寸，减去背景图的尺寸得到，可以为负值.
 a percentage value aligns the specified percentage of the image with the same percentage of the styled element

font-size: 参照是直接父元素的font-size

line-height: 参照是元素自身的font-size

vertical-align: 元素自身的line-height

bottom、left、right、top: 参照是元素的包含块。left和right是参照包含块的宽度，bottom和top是参照包含块的高度。

transform: translate 参照是变换的边界框的尺寸（等于这个元素自己的border-box尺寸）
transform: scaleY(-1) 对称

当百分比值用于可继承属性时，只有结合参照值计算后的绝对值会被继承，而不是百分比值本身


## 基线

字母x的下边缘(线)就是基线。

line-height 行高的定义就是两基线的间距
vertical-align 的默认值就是基线

## 移动端

ch
vw
vh
vmax
vmin  

在 ios 设备中，利用 overflow 来模拟滚动会出现卡顿的情况，可以通过设置-webkit-overflow-scrolling: touch 来解决，原因是设置后 ios会为其创建一个 UIScrollView，利用硬件来加速渲染

## 字体

在大多数浏览器中, 非 h 标签文字大小为 16px(base text size). 因此设置 100% 相当于 16px.

font-size 是一个继承属性.

px: retina 屏幕每 inch 的 pixel 更多, 例如设置文字 16px, retina 屏幕浏览器会用 32px 去渲染文字.

percentage: base text size. font-size 的 % 参照父元素

em: base text size. 1em == 100%. font-size 的 em 参照父元素 font-size, 其他属性(比如 padding)的 em 参照当前元素的 font-size.

rem: root em, text size of the root element(html), 避免了 percentage 和 em 的多层继承问题.

Font Size Idea: px at the Root, rem for Components, em for Text Elements

## 属性

line-height: 默认值 120%
overflow: auto; .It does the samething as `scroll` but adds scroll bars only when needed.

background-image
Normally a background image fills the entire area of an element including its borders, padding, and content

background-clip
This property limits the area in which a background-image appears

background-origin
Tells a browser where to place a background image in relationship to the border, padding and content of an element.


## 声明顺序

这是一个选择器内书写CSS属性顺序的大致轮廓。这是为了保证更好的可读性。

作为最佳实践，我们应该遵循以下顺序（应该按照下表的顺序）：

结构性属性：
display
width, height
position, left, top, right etc.
overflow, float, clear etc.
margin, padding
表现性属性：
background, border etc.
font, text

性选择器或属性值用双引号（””），而不是单引号（”）括起来。
URL值（url()）不要使


用引号


## 不熟悉属性

user-select
pointer-events
outline-offset
cursor: not-allowed;
touch-action
-webkit-appearance
position: sticky;
object-fit
 - how an object (image or video) should fit inside its box.
background-size: cover
white-space: nowrap;
will-change
clip-path
