# DOM  

The `DOMContentLoaded` event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading (the `load` event can be used to detect a fully-loaded page).

`readystatechange` === `DOMContentLoaded` === `jquery.ready()`

`window.onload` vs `document.onload`

## Property   
 
- DOM elements inherit from an HTMLElement constructor. By making the HTMLElement prototype accessible, the browsers provide us with the ability to extend any HTML node of our choosing.
 
`nodeName`: UpperCase, similar to `tagName`   
 
`nodeValue`, `nodeType`  
  
`innerHTML`, `innerText`  

`DocumentFragment` 表示文档而一部分 ，但不属于文档树．当把DocumentFragment插入文档树时,插入的其实时它的所有子节点.当需要插入大量节点时, 使用DocumentFragment一次插入多个节点,性能的提升会非常明显

`firstChild`,  
 `lastChild`,  
`previousSibling`,  
 `nextSibling`  
`childNodes`: childNodes also includes e.g. text nodes and comments, type NodeList  
 `parentNode`, 

`firstElementChild`,  
`lastElementChild`,   
`previousElementSibling`,  
`nextElementSibling`  
`children`: Node.children is a read-only property that returns a live HTMLCollection of the child elements of Node.  

`childElementCount`,  

`NodeList.item()`: tables.item(0) = tables[1]
`HTMLCollection.item()`: c.item(0) = c[1] 

`textContent`,`text`   

`input.value`  

`el.style.cssText`: modify dom only once

`className`  
`classList`: remove, add, toggle, contains, item    

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
- 在 IE11之前改变 innerText 的内容不仅移除该元素子节点, 也会删除所有的后代 text 节点

textContent vs innerHTML
innerHTML 返回 HTML. 当需要在元素内容取出或写入 text 时, 最好用 textContent, 因为 text 不会解析成 HTML, 可能会有更好的性能, 而且只可以避开 XSS 攻击

##Methods

`querySelector()`,  
`querySelectorAll()`: Nodelist  

`getElementById()`,  
`getElementsByTagName()`: getElementsByTagName() returns a Live NodeList which is faster than querySelectorAll() which returns a static NodeList.  
`getElementsByClassName()`,  
`getElementsByName()`,  
   
`createDocumentFragment`: Since the document fragment is in memory and not part of the main DOM tree, appending children to it does not cause page reflow (computation of element's position and geometry). Consequently, using document fragments often results in better performance.  

`createElement()`,  
`createTextNode()`  
  
`appendChild()`: first removed, then append to new postion  
`insertBefore()`,  
`replaceChild()`,  
`removeChild()`,   
`cloneNode()`,  
  
`getAttribute()`,   
`setAttribute()`,  
`hasAttribute()`,   
`removeAttribute()`  

 
`hasChildNodes()`,  
 `hasFocus()`  
`matchesSelector()`     
 
`contains()`: 检测某个节点是不是另一个节点的后代, 返回true或false  
 
`insertAdjacentHTML()`  
`scrollIntoView()`  
  
`normalnize()` : 处理文本节点, 合并, 删除空白节点 

`getComputedStyle`     
`getPropertyValue()`  
`getPropertyCSSValue()`  
 
`nextNode()`
`previousNode()`  

`write()`, `writeln()`, `open()`, `close()` 


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

### Prop

鼠标指针坐标属性:  
`event.clientX`, `event.clientY`,  浏览器窗口左上角  
`event.pageX`, `event.pageY`, 页面左上角  
`event.offsetX`,`event.offsetY` 被点击元素左上角  
`screenX`,`screenY` 显示器左上角

`event.target`  
`event.currentTarget` always === this
 
 元素的属性
`event.target.scrollLeft`,  
`event.target.scrollTop`, 元素滚动条顶部距离浏览器顶部的距离, 可以读取或设置
`event.target.offsetLeft`  
`event.target.offsetTop` 元素上方距离页面顶部距离, 只读
`event.target.clientTop` 元素上边框的宽度
`event.target.clientLeft`

`element.offsetHeight` 元素可见高度, 包括 padding, border, scrollbar, 只读
`element.offsetWidth`
`element.clientHeight` 元素可见高度, 包括 padding, 只读
`element.clientWidth`
`element.scrollHeight` 元素内容高度, 包括 overflow 的不可见内容, 只读.
`element.scrollWidth`

`window.innerHeight` Height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
`window.innerWidth`
`window.outerHeight` the height in pixels of the whole browser window, 包含浏览器的工具栏, 标签栏
`window.outerWidth` 多个滚动条

viewport:
`var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);`
`var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);`
document.body.clientWidth == window.innerWidth == document.documentElement.clientWidth

chrome 右上方显示的是 window.outerWidth * window.outerHeight

滚动到底部: document.body.scrollTop = document.body.scrollHeight

document.onscroll, document.body.scrollTop
