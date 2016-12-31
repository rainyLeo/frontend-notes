

** Sending Client Data to the Server **  

Broadly speaking, your two options for sending client data to the server are the query‐ string and the request body. Normally, if you’re using the querystring, you’re making a `GET` request, and if you’re using the request body, you’re using a `POST` request (the HTTP protocol doesn’t prevent you from doing it the other way around, but there’s no point to it: best to stick to standard practice here).

It is a common misperception that `POST` is secure and `GET` is not: in reality, both are secure if you use HTTPS, and neither is secure if you don’t. If you’re not using HTTPS, an intruder can look at the body data for a `POST` just as easily as the querystring of a `GET` request. However, if you’re using GET requests, your users will see all of their input (including hidden fields) in the querystring, which is ugly and messy. Also, browsers often place limits on querystring length (there is no such restriction for body length). For these reasons, I generally recommend using POST for form submission.



** Form handling **  
  
```html
<form action="/process" method="POST">
	<input type="hidden" name="hush" val="hidden, but not secret!"> 
	<div>
		<label for="fieldColor">Your favorite color: </label>
		<input type="text" id="fieldColor" name="color"> 
  </div>
	<div>
		<button type="submit">Submit</button>
  </div>
</form>
```

Notice the method is specified explicitly as `POST` in the `<form>` tag; if you don’t do this, it defaults to `GET`. The action attribute specifies the URL that will receive the form when it’s posted. If you omit this field, the form will be submitted to the same URL the form was loaded from. I recommend that you always provide a valid `action`, even if you’re using AJAX (this is to prevent you from losing data; see Chapter 22 for more information).

From the server’s perspective, the important attribute in the `<input>` fields are the `name` attributes: that’s how the server identifies the field. It’s important to understand that the `name` attribute is distinct from the `id` attribute, which should be used for styling and frontend functionality only (it is not passed to the server).

When the user submits the form, the `/process` URL will be invoked, and the field values will be transmitted to the server in the request body.


It’s very important that you use a 303 (or 302) redirect, not a 301 redirect in this instance. 301 redirects are “permanent,” meaning your browser may cache the redirection destination.


- File uploads
There are two popular and robust options for multipart form processing: `Busboy` and `Formidable`. I find Formidable to be slightly easier, because it has a convenience callback that provides objects containing the fields and the files, whereas with Busboy, you must listen for each field and file event. We’ll be using Formidable for this reason.

While it is possible to use AJAX for file uploads using XMLHttpRe‐ quest Level 2’s FormData interface, it is supported only on modern browsers and requires some massaging to use with jQuery


** Cookies and Sessions **  

 every HTTP request contains all the information necessary for the server to satisfy the request


The idea of a cookie is simple: the server sends a bit of information, and the browser stores it for some configurable period of time. It’s really up to the server what the par‐ ticular bit of information is: often it’s just a unique ID number that identifies a specific browser so that the illusion of state can be maintained.

- Cookies are not secret from the user
- The user can delete or disallow cookies
- Regular cookies can be tampered with
- Cookies can be used for attacks
- Users will notice if you abuse cookies
- Prefer sessions over cookies


** Middleware **  

Conceptually, middleware is a way to encapsulate functionality: specifically, function‐ ality that operates on an HTTP request to your application. Practically, a middleware is simply a function that takes three arguments: a request object, a response object, and a “next” function

In an Express app, you insert middleware into the pipeline by calling `app.use`.  

Learning how to think flexibly about middleware and route handlers is key to under‐ standing how Express works. Here are the things you should keep in mind:
	- Route handlers (`app.get`, `app.post`, etc.—often referred to collectively as `app.VERB`) can be thought of as middleware that handle only a specific HTTP verb (GET, POST, etc.). Conversely, middleware can be thought of as a route handler that handles all HTTP verbs (this is essentially equivalent to `app.all`, which handles any HTTP verb; there are some minor differences with exotic verbs such as PURGE, but for the common verbs, the effect is the same)
	- Route handlers require a path as their first parameter. If you want that path to match any route, simply use `/*`. Middleware can also take a path as its first parameter, but it is optional (if it is omitted, it will match any path, as if you had specified /\*).
	- Route handlers and middleware take a callback function that takes two, three, or four parameters (technically, you could also have zero or one parameters, but there is no sensible use for these forms). If there are two or three parameters, the first two parameters are the request and response objects, and the third paramater is the next function. If there are four parameters, it becomes an error-handling middle‐ ware, and the first parameter becomes an error object, followed by the request, response, and next objects.
	- If you don’t call `next()`, the pipeline will be terminated, and no more route handlers or middleware will be processed. If you don’t call `next()`, you should send a re‐ sponse to the client (res.send, res.json, res.render, etc.); if you don’t, the client will hang and eventually time out.
 	- If you do call `next()`, it’s generally inadvisable to send a response to the client. If you do, middleware or route handlers further down the pipeline will be executed, but any client responses they send will be ignored.


** Routing **  

The routing mechanism in Express does not take subdomains into account by default: app.get(/about) will handle requests for http://meadowlarktravel.com/about, http:// www.meadowlarktravel.com/about, and http://admin.meadowlarktravel.com/about. If you want to handle a subdomain separately, you can use a package called vhost (for “virtual host,” which comes from an Apache mechanism commonly used for handling subdomains). First, install the package (npm install --save vhost), then edit your application file to create a subdomain:


** CORS **  

You generally don’t have to worry about cross-domain resource shar‐ ing (CORS) when using a CDN. External resources loaded in HTML aren’t subject to CORS policy: you only have to enable CORS for resources that are loaded via AJAX   


** Performance Considerations **  

How you handle static resources has a significant impact on the real-world performance of your website, especially if your site is multimedia-heavy. The two primary perfor‐ mance considerations are reducing the number of requests and reducing content size.

Of the two, reducing the number of (HTTP) requests is more critical, especially for mobile (the overhead of making an HTTP request is significantly higher over a cellular network). Reducing the number of requests can be accomplished in two ways: com‐ bining resources and browser caching.

Combining resources is primarily an architectural and frontend concern: as much as possible, small images should be combined into a single sprite. Then use CSS to set the offset and size to display only the portion of the image you want. For creating sprites, I highly recommend the free service SpritePad. It makes generating sprites incredibly easy, and it generates the CSS for you as well. Nothing could be easier. SpritePad’s free functionality is probably all you’ll ever need, but if you find yourself creating a lot of sprites, you might find their premium offerings worth it.

Browser caching helps reduce HTTP requests by storing commonly used static resour‐ ces in the client’s browser. Though browsers go to great lengths to make caching as automatic as possible, it’s not magic: there’s a lot you can and should do to enable browser caching of your static resources.
Lastly, we can increase performance by reducing the size of static resources. Some tech‐ niques are lossless (size reduction can be achieved without losing any data), and some techniques are lossy (size reduction is achieved by reducing the quality of static resour‐ ces). Lossless techniques include minification of JavaScript and CSS, and optimizing PNG images. Lossy techniques include increasing JPEG and video compression levels. We’ll be discussing minification and bundling (which also reduces HTTP requests) in this chapter.





















