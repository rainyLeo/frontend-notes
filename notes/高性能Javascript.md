
## Loading

- This code has a single `<script>` tag at the bottom of the page that loads multiple JavaScript files, showing the best practice for including external JavaScript on an HTML page.

- Keeping JavaScript files small and limiting the number of HTTP requests are only the first steps in creating a responsive web application.

- The secret to nonblocking scripts is to load the JavaScript source code after the page has finished loading. In technical terms, this means downloading the code after the window’s `load` event has been fired

`defer`
This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `DOMContentLoaded`. The defer attribute shouldn't be used on scripts that don't have the `src` attribute.  

`async`(HTML5)
Set this Boolean attribute to indicate that the browser should, if possible, execute the script asynchronously. It has no effect on inline scripts (i.e., scripts that don't have the src attribute).

`document.DOMContentLoaded`

## Data Access

The general advice is to use literal values and local variables whenever possible and limit use of array items and object members where speed of execution is a concern

Generally speaking, you can improve the performance of JavaScript code by storing frequently used object members, array items, and out-of-scope variables in local variables. You can then access the local variables faster than the originals.

*Identifier Resolution*  
The deeper into the execution context’s scope chain an identifier exists, the slower it is to access for both reads and writes. Local variables are always the fastest to access inside of a function, whereas global variables will generally be the slowest  

- always store out-of-scope values in local variables if they are used more than once within a function

*Closure*  
Typically, a function’s activation object is destroyed when the execution context is destroyed. When there’s a closure involved, though, the activation object isn’t destroyed, because a reference still exists in the closure’s [[Scope]] property  

*Object*  
object member access tends to be slower than accessing data in literals or variables, and in some browsers slower than accessing array items.  

- the deeper into the prototype chain that a member exists, the slower it is to retrieve


## DOM Scripting  

The general recommendation is to manipulate DOM as few times as possible and strive to stay in ECMAScript land.  

In general, for any type of DOM access it’s best to use a local variable when the same DOM property or method is accessed more than once.

For many use cases that require a single loop over a relatively small collection, just caching the length of the collection is good enough. But looping over an array is faster that looping over a collection

**Accessing and modifying DOM elements**

Simply accessing a DOM element comes at a price—the “toll fee” discussed earlier. Modifying elements is even more expensive because it often causes the browser to recalculate changes in the page geometry. Don't do it in loops  

Cloning nodes is more efficient in most browsers, but not by a big margin.

Element nodes is faster, looping over `children` is faster than `childNodes`

*HTML Collections*

- getElementByID(), getElementsbyClassName(), getElementsByTagName(), document.images, document.links, document.forms,

- live, meaning that they are automatically updated when the underlying document is updated  

*NodeList*  

- querySelector(), querySelectorAll() 慢很多

- static , do not represent the live structure of the document.


**Modifying the styles of DOM elements and causing repaints and reflows**

*Repaints and Reflows*
Once the browser has downloaded all the components of a page—HTML markup, JavaScript, CSS, images—it parses through the files and creates two internal data structures:

A DOM tree  
  - A representation of the page structure
A render tree
  - A representation of how the DOM nodes will be displayed
Once the DOM and the render trees are constructed, the browser can display (`paint`) the elements on the page.  

When a DOM change affects the geometry of an element (width and height)—such as a change in the thickness of the border or adding more text to a paragraph, resulting in an additional line—the browser needs to recalculate the geometry of the element as well as the geometry and position of other elements that could have been affected by the change. The browser invalidates the part of the render tree that was affected by the change and reconstructs the render tree. This process is known as a `reflow`. Once the reflow is complete, the browser redraws the affected parts of the screen in a process called `repaint`.  

Not all DOM changes affect the geometry. For example, changing the background color of an element won’t change its width or height. In this case, there is a repaint only (no reflow), because the layout of the element hasn’t changed.  

`Repaints` and `reflows` are expensive operations and can make the UI of a web application less responsive. As such, it’s important to reduce their occurrences whenever possible.  

*When Does a Reflow Happen?*
As mentioned earlier, a reflow is needed whenever layout and geometry change. This happens when:
- Visible DOM elements are added or removed
- Elements change position
- Elements change size (because of a change in margin, padding, border thickness, width, height, etc.)
- Content is changed, e.g., text changes or an image is replaced with one of a different size
- Page renders initially
- Browser window is resized  

Depending on the nature of the change, a smaller or bigger part of the render tree needs to be recalculated. Some changes may cause a reflow of the whole page: for example, when a scroll bar appears.  

*Minimize Repains and Reflows*  

1. Style changes  

Reflows and repaints can be expensive, and therefore a good strategy for responsive applications is to reduce their number. In order to minimize this number, you should combine multiple DOM and style changes into a batch and apply them once.(`style.cssText`)  

Another way to apply style changes only once is to change the CSS `class name` instead of changing the inline styles  

2. Batching DOM changes  

  When you have a number of changes to apply to a DOM element, you can reduce the number of repaints and reflows by following these steps:
  - Take the element out of the document flow.
  - Apply multiple changes.
  - Bring the element back to the document.  

  There are three basic ways to modify the DOM off the document:   
   - Hide the element, apply changes, and show it again.
   - Use a `document fragment` to build a subtree outside of the live DOM and then copy it to the document.
   - Copy the original element into an off-document node, modify the copy, and then replace the original element once you’re done.

  Caching Layout Information  
   - It is best to minimize the number of requests for layout information, and when you do request it, assign it to local variables and work with the local values.  

  Take Elements Out of the Flow for Animations  



**Handling user interaction through DOM events**  

 Event Delegation  
  -  With event delegation, you attach only one handler on a wrapper element to handle all events that happen to the children descendant of that parent wrapper.


## Algorithms and Flow Control  

*Loop Performance*

- Decreasig the work per iteration
- Decreasig the number of iterations

*Optimizing if-else*

- When optimizing `if-else`, the goal is always to minimize the number of conditions to evaluate before taking the correct path. The easiest optimization is therefore to ensure that the most common conditions are first
- Another approach is to organize the `if-else` into a series of nested if-else statements. Using a single, large if-else typically leads to slower overall execution time as each additional condition is evaluated.

*Recursion*
- If you run into a stack overflow error, change the method to an iterative algorithm or make use of memoization to avoid work repetition.


## Strings and Reuglar Expressions

## Timers

- The `setInterval()` function is almost the same as `setTimeout()`, except that the former repeatedly adds JavaScript tasks into the UI queue. The main difference is that it will not add a JavaScript task into the UI queue if a task created by the same setInterval() call is already present in the UI queue.

*Throttle & Debounce*


## Ajax

Cache Data  
 - On the server side, set HTTP headers that ensure your response will be cached in the browser.  
 - On the client side, store fetched data locally so that it doesn’t have be requested again.


window.requestAnimationFrame()
