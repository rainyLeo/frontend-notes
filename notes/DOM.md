# DOM  

The `DOMContentLoaded` event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading (the `load` event can be used to detect a fully-loaded page).

`readystatechange` === `DOMContentLoaded` === `jquery.ready()`

`window.onload` vs `document.onload`

## Interface

EventTarget <- Node <- Element <- HTMLElement <- HTMLImageElement

- `Element`
The Element interface represents an object of a Document.

Inherits properties from its parent interface, Node, and by extension that
interface's parent, EventTarget.

This interface describes methods and properties common to all kinds of elements.
Specific behaviors are described in interfaces which inherit from Element but
add additional functionality. For example, the HTMLElement interface is the
base interface for HTML elements, while the SVGElement interface is the basis
for all SVG elements'

- `HTMLElement`
The HTMLElement interface represents any HTML element. Some elements directly
 implement this interface, others implement it via an interface that inherits it.

DOM elements inherit from an `HTMLElement` constructor. By making the HTMLElement prototype accessible, the browsers provide us with the ability to extend any HTML node of our choosing.
`event.target instanceof HTMLLIElement`

inherits properties from its parent, Element

- `Node`
A Node is an interface from which a number of DOM types inherit, and allows these various types to be treated (or tested) similarly.
Inherits properties from its parents EventTarget

- `Document`
The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree.

This interface also inherits from the Node and EventTarget interfaces.


- `EventTarget`
EventTarget is an interface implemented by objects that can receive events and may have listeners for them.

Element, document, and window are the most common event targets, but other objects can be event targets too, for example XMLHttpRequest, AudioNode, AudioContext, and others.

Many event targets (including elements, documents, and windows) also support setting event handlers via on... properties and attributes.

- `Event`
The Event interface represents any event which takes place in the DOM
Event()

many event interfaces based on the main Event interface, such as: CustomEvent, MouseEvent, DragEvent, TouchEvent,
FocusEvent, FetchEvent, StorageEvent, MutationEvent, MessageEvent, AnimationEvent...

- `CustomEvent`
The CustomEvent interface represents events initialized by an application for any purpose.

based on Event interface

vs `Document.createEvent()`: many methods with createEvent are deprecated

## Property   


`Node.nodeName`: UpperCase, similar to `tagName`, nodeName will return #text for text nodes while tagName will return undefined.   
`Node.nodeValue`: returns or sets the value of the current node
`Node.nodeType`  

`Element.innerHTML` sets or gets the HTML syntax describing the element's descendants
`Node.innerText` represents the "rendered" text content of a node and its descendants

`DocumentFragment` 表示文档而一部分 ，但不属于文档树．当把 DocumentFragment插入文档树时,插入的其实时它的所有子节点.当需要插入大量节点时, 使用 DocumentFragment一次插入多个节点,性能的提升会非常明显

`Node.firstChild`, read-only
`Node.lastChild`,  
`Node.previousSibling`,  
`Node.nextSibling`  
`Node.childNodes`: childNodes also includes e.g. text nodes and comments, type NodeList  
`Node.parentNode`  read-only property returns the parent of the specified node in the DOM tree. parentNode is the parent of the current node. The parent of an element is an Element node, a Document node, or a DocumentFragment node
`Node.parentElement` read-only property returns the DOM node's parent Element, or null if the node either has no parent, or its parent isn't a DOM Element

**ParentNode**
`ParentNode.firstElementChild`, read-only
`ParentNode.lastElementChild`,   
`ParentNode.children`: Node.children is a read-only property that returns a live HTMLCollection of the child elements of Node.  
`ParentNode.childElementCount`,
`ParentNode.append()` Inserts a set of Node objects or DOMString objects after the last child of the ParentNode.
`ParentNode.prepend()`


`Node.previousElementSibling`,  
`Node.nextElementSibling`  

`NodeList.item()`: tables.item(0) = tables[1]
`HTMLCollection.item()`: c.item(0) = c[1]

`Node.textContent` 设置文字内容时用这个, 没有 XSS 安全问题, 性能比 innerHTML 好
`text`   


`input.value`

`el.style.cssText`: modify dom only once

`Element.className`  
`Element.classList`: remove, add, toggle, contains, item    

`selectedIndex`

`activeElement`


## 笔记

this = event.currentTarget: 指向事件绑定的 DOM 元素
event.target: 实际点击的 DOM 元素
event.target 和 event.currentTarget 不是总是相等

keydown: 按任意键触发, 按住重复触发, 文本框变化之前
keypress: 按字符键触发, 按住重复触发, 文本框变化之前
keyup: 释放键触发, 文本框变化之后

textContent vs innerText:
- innerText 是 IE 引入的.
- textContent 会返回所有元素的内容,包括<script> 和 <style>, innerText 不会
- innerText 会感应 CSS 样式, 可能会触发 reflow, textContent 不会
- 在 IE11 之前改变 innerText 的内容不仅移除该元素子节点, 也会删除所有的后代 text 节点

textContent vs innerHTML
innerHTML 返回 HTML. 当需要在元素内容取出或写入 text 时, 最好用 textContent, 因为 text 不会解析成 HTML, 可能会有更好的性能, 而且只可以避开 XSS 攻击

innerHTML: html string -> dom element
outerHTML: dom element -> html string

## Methods

`querySelector()`,  
`querySelectorAll()`: Nodelist
li:nth-child(n), li:nth-of-type(n): li为子元素, 匹配子元素, 不包括子元素的后代

`getElementById()`,  
`getElementsByTagName()`: getElementsByTagName() returns a Live NodeList which is faster than querySelectorAll() which returns a static NodeList.  
`getElementsByClassName()`,  
`getElementsByName()`,  

`createDocumentFragment`: Since the document fragment is in memory and not part of the main DOM tree, appending children to it does not cause page reflow (computation of element's position and geometry). Consequently, using document fragments often results in better performance.  

`createElement()`,  
`createTextNode()`  

`appendChild(aChild)`: first removed, then append to new position  
`insertBefore(newNode, referenceNode)`
`replaceChild()`,  
`removeChild()`,   
`cloneNode()`,

`childNodes.remove()` : Removes this childNodes from the children list of its parent. (IE not support )
`childNodes.before()`: Inserts a set of Node or DOMString objects in the children list of this childNodes's parent, just before this childNodes
`childNodes.after()`
`childNodes.replaceWith()`

`getAttribute()`,   
`setAttribute()`,  
`hasAttribute()`,   
`removeAttribute()`  


`hasChildNodes()`,  
`hasFocus()`  
`matchesSelector()`     

`contains()`: 检测某个节点是不是另一个节点的后代, 返回 true或 false  

`insertAdjacentHTML()`  
`scrollIntoView()`  

`normalize()` : 处理文本节点, 合并, 删除空白节点

`getComputedStyle`     
`getPropertyValue()`  
`getPropertyCSSValue()`  

`nextNode()`
`previousNode()`  

`write()`, `writeln()`, `open()`, `close()`

`getBoundingClientRect` returns the size of an element and its position relative to the viewport.

`DOMParser` DOMParser can parse XML or HTML source stored in a string into a DOM Document.


#Event

### Method

`addEventListener()`,  
`removeEventListener()`

`attachEvent()`, `detachEvent()` :IE  

`addHandler()`, `removeHandler()`  

`preventDefault()`, `stopPropagation()`  

### Type

`on` +  
`click`, `dblclick`,  
`mousedown`,  冒泡
`mouseenter`, `mouseleave`,  不支持冒泡  
`mouseover`, `mouseout`,   支持冒泡
`mousemove`,  
`mouseup`  
`mousewheel`, `contextmenu`

`keydown` `keyup` `keypress`  

`submit`  
`reset`  

`change`:  

- `select` user changes the selected option of a `<select>` element.   
- `radio`, `checkboxes` the checked state has been changed.  
- `input`, `textarea`  element value was changed

`focus`, `blur`: 不冒泡, 所有浏览器都支持
`focusin`, `focusout` 冒泡, firefox不支持?

`textinput`  
`select`: The onselect event occurs after some text has been selected in an element.The onselect event is mostly used on `<input type="text">` or `<textarea>` elements.

`load` `unload`  

`resize` `scroll`

`input`

### Prop

鼠标指针坐标属性:  
`event.clientX`, `event.clientY`,  浏览器窗口左上角  
`event.pageX`, `event.pageY`, 页面左上角  
`event.offsetX`,`event.offsetY` 被点击元素左上角  
`screenX`,`screenY` 显示器左上角

`event.target`  
`event.currentTarget` always === this

 元素的属性
`event.target.clientTop` 元素上边框的宽度(`getComputedStyle().borderTopWidth`)
`event.target.clientLeft` 元素左边框的宽度
`event.target.offsetLeft`  
`event.target.offsetTop` 元素上方距离包含块 padding box 顶部距离, 只读
`event.target.scrollLeft`,  
`event.target.scrollTop`, 元素滚动条顶部距离浏览器顶部的距离, 可以读取或设置
`getBoundingClientRect().top` 元素上方距离 viewport 顶部距离

`element.clientHeight` 元素可见高度, 包括 padding, 只读
`element.clientWidth`
`element.offsetHeight` 元素可见高度, 包括 padding, border, scrollbar, 只读
`element.offsetWidth`
`element.offsetParent` read-only property returns a reference to the object which is the closest positioned containing element.
`element.scrollHeight` 元素内容高度, 包括 overflow 的不可见内容, 只读.
`element.scrollWidth`
`getBoundingClientRect().width` 大多数情况下等于 offsetWidth, 除了在 transform 时等于 rendering width, 而 offsetWidth 等于 layout width


`window.innerHeight` css viewport(@media) 高度, 包括 scrollbar.
`window.innerWidth`  css viewport(@media) 宽度, 包括 scrollbar
和 scale zoom 有关
undefined in IE8-

`document.body.clientWidth == document.documentElement.clientWidth`
CSS viewport 减去 scrollbar width
jQuery(window).width()

`window.outerHeight` the height in pixels of the whole browser window, 包含浏览器的工具栏, 标签栏
`window.outerWidth`  width of the whole browser window including sidebar (if expanded), window chrome and window resizing borders/handles

跨浏览器 viewport:
`var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);`
`var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);`

chrome 右上方显示的是 `window.outerWidth * window.outerHeight`

滚动到底部: document.body.scrollTop = document.body.scrollHeight

document.onscroll, document.body.scrollTop


Chrome renders paddingBottom to the bottom of the scroll content, while other browsers don't


## HTMLImageElement

- 属性
src
srcset
height:  rendered height of the image in CSS pixels
width
naturalHeight : intrinsic height of the image in CSS pixels, or 0.
naturalWidth 
