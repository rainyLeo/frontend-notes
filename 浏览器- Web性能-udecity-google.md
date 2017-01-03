
Converting HTML to the DOM 

DOM + CSSOM -> Render Tree -> Layout -> Paint
(JavaScript)

## Get Render Tree 

1. When you request a URL and hit Enter, the browser sends a request to the server. Then get the response (html). 
2. Parsing. Characters(HTML response) -> Tokens -> Nodes -> DOM Tree 
3. Converting CSS to CSSOM. Characters -> Tokens -> Nodes -> CSSOM 


- Render tree only captures visible content
- `display: none` will be skipped 

## Layout 

compute the location and the size of the render tree elements.

`<meta name="viewport" content="width=device-width, initial-scale=1">`:
telling the browser the width of the layout viewport should be equal to the device width. If don't use this meta, then the browser will use the default viewport width, which is typically 980 pixels, and it's optimized for large screens.

- Use the meta viewport tag to control the width and scaling of the browser's viewport.
- Include width=device-width to match the screen's width in device-independent pixels.
- Include initial-scale=1 to establish a 1:1 relationship between CSS pixels and device-independent pixels.
- Ensure your page is accessible by not disabling user scaling.

* batch updates to avoid having mutiple layout events

## Paint

Putting pixels on the page 


## Example

```html
<!DOCTYPE HTML>
<head>
	<link rel="stylesheet" href="css/style.css" type="text/css"></link>
	<script src="js/app.js"></script>
</head>
<body>
	...
</body>
```

1. Begin constructing the DOM by parsing HTML
2. Request CSS & JS resources
3. Parse CSS and construct the CSSOM tree
4. Execute JS
5. Constructing the DOM 
6. Merge DOM and CSSOM into the Render Tree
7. Run layout, paint 


## DevTools
You can't optimize what you can't measure

pagespeed website

## Optimizing the DOM

* minimy
* compress
* http caching

- GZIP performs best on text-based assets: CSS, JavaScript, HTML
- All modern browsers support GZIP compression and will automatically request it.
- Your server must be configured to enable GZIP compression.
- Some CDNs require special care to ensure that GZIP is enabled.

## Avoid Rendering Blocking CSS

- By default, CSS is treated as a render blocking resource, which means that the browser won't render any processed content until the CSSOM is constructed.
- Make sure to keep your CSS lean, deliver it as quickly as possible, and use media types and queries to unblock rendering
- The browser downloads all CSS resources, regardless of blocking or non-blocking behavior

Critical rendering path requires both the DOM and the CSSOM to construct the render tree. This creates an important performance implication: `both HTML and CSS are render blocking resources`.
 
* Media type and media queries
	`<link href="print.css" rel="stylesheet" media="print">`
	`<link href="other.css" rel="stylesheet" media="(min-width: 40em)">`
	`<link href="portrait.css" rel="stylesheet" media="orientation:portrait">`
* Inline CSS

## Optimizing JS

async: Set this Boolean attribute to indicate that the browser should, if possible, execute the script asynchronously. It has no effect on inline scripts (i.e., scripts that don't have the src attribute).

 *async attribute*
 `<script scr="externaljs" async></script>`
 - does not block DOM construction
 - does not block on CSSDOM
 
Blocking: `<script src="anExteralScript.js"></script>`
Inline: `<script>document.write("this is an inline script")</script>`
Async: `<script async src="anExternalScript.js"></script>`


Inline JS will alwayse block CSSOM (one exception, put it above css link)
 
There is also a `defer` attribute that you can add to the script tag that tells the parser that the script should wait to execute until after the document is loaded, whereas `async` lets the script run in the background while the document is being parsed. 
 
 load, DOMContentLoaded
 
async 脚本在script文件下载完成后会立即执行,并且其执行时间一定在 window的load事件触发之前。这意味着多个async脚可能不会按其在页面中的出现次序顺序执行。
与此相对，浏览器确保多个 defer 脚本按其在HTML页面中的出现顺序依次执行,且执行时机为DOM解析完成后，document的DOMContentLoaded 事件触发之前。
 
## General Strategies and CRP

* Minify, Compress, Cache
	HTML, CSS, JavaScript
* Minimize use of render blocking resources (CSS)
	1. use media queries on <lin> to unblock rendering
	2. Inline CSS
* Minimize use of parser blocking resources (JS)
 	1. Defer JavaScript execution
 	2. Use async attribute on <script>

1. Minimize Bytes
2. Reduce Critical resources
3. Shorten CRP length

## CRP 

- Critical Resource: Resource that could block initial rendering of the page.
- Critical Path Length: Number of roundtrips, or the total time required to fetch all of the critical resources.
- Critical Bytes: Total number of bytes required to get to first render of the page, which is the sum of the transfer filesizes of all critical resources

The general sequence of steps to optimize the critical rendering path is:

1. Analyze and characterize your critical path: number of resources, bytes, length.
2. Minimize number of critical resources: eliminate them, defer their download, mark them as async, and so on.
3. Optimize the number of critical bytes to reduce the download time (number of roundtrips).
4. Optimize the order in which the remaining critical resources are loaded: download all critical assets as early as possible to shorten the critical path length.
 
## Preload Scanne


## Drwa CRP diagram
Use Ctrl+Shift+I on Windows, or Cmd+Opt+I on Mac to open the DevTools.
Use Ctrl+Shift+R on Windows, or Cmd+Shift+R on Mac to reload the page and capture the timeline. PROTIP: In order to use the hard reload trick to capture the full trace, you have to load the page first, open Timeline in DevTools, start and stop recording, and then use the shortcuts described above to reload the page. Basically, open DevTools and hit the record button twice before doing a hard reload. Check out DevTools emulation docs for a detailed walkthrough of how to emulate a mobile device.




















