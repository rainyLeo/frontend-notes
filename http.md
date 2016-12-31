## HTTP请求

** URL **
-URLs specify protocol, server, and local resource
- syntax : <scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
- Say you want to fetch the URL http://www.joes-hardware.com/seasonal/index-fall.html:
 1. The first part of theURL(http) is the URL scheme. The scheme tells a web client
how to access the resource. In this case, the URL says to use the HTTP protocol.
 2. The second part of the URL (www.joes-hardware.com) is the server location.
This tells the web client where the resource is hosted, the host name can be provided as a hostname, as above (“www.joes-hardware.com”) or as an IP address. The port component identifies the network port on which the server is listening. For HTTP, which uses the underlying TCP protocol, the default port is 80.
 3. The third part of the URL (/seasonal/index-fall.html) is the resource path. The
path tells what particular local resource on the server is being requested.
 4. parameters, query strings, fragments

- Encoding Mechanisms: To get around the limitations of a safe character set representation, an encoding scheme was devised to represent characters in a URL that are not safe. The encoding simply represents the unsafe character by an “escape” notation, consisting of a per- cent sign (%) followed by two hexadecimal digits that represent the ASCII code of the character.
 - % Reserved escape token for encoded characters
 - / Reserved for delimiting splitting up path segments in the path component
 - . Reserved in the path component
 - .. Reserved in the path component
 - # Reserved as the fragment delimiter
 - ? Reserved as the query-string delimiter
 - ; Reserved as the params delimiter
 - : Reserved to delimit the scheme, user/password, and host/port components
 - $, + Reserved
 - @&= Reserved because they have special meaning in the context of some schemes 
 - {}| \ ^ ~ []‘ Restricted because of unsafe handling by various transport agents, such as gateways
 - <>" Unsafe; should be encoded because these characters often have meaning outside the scope of the URL, such as delimiting the URL itself in a document (e.g., “http://www.joes-hardware.com”)
 
 
- Schemes
 - http: The Hypertext Transfer Protocol scheme conforms to the general URL format, except that there is no username or password. The port defaults to 80 if omitted. form: http://<host>:<port>/<path>?<query>#<frag>
 - https: http with (SSL), which provides end-to-end encryption of HTTP connections. Its syntax is identical to that of HTTP, with a default port of 443. form: https://<host>:<port>/<path>?<query>#<frag>
 - mailto: Mailto URLs refer to email addresses. Because email behaves differently from other schemes (it does not refer to objects that can be accessed directly), the format of a mailto URL differs from that of the standard URL. The syn- tax for Internet email addresses is documented in Internet RFC 822. form: mailto:joe@joes-hardware.com
 - ftp: File Transfer Protocol URLs can be used to download and upload files on an FTP server and to obtain listings of the contents of a directory structure on an FTP server. form: ftp://<user>:<password>@<host>:<port>/<path>;<params>
 - file: The file scheme denotes files directly accessible on a given host machine (by local disk, a network filesystem, or some other file-sharing system). The fields follow the general form. If the host is omitted, it defaults to the local host from which the URL is being used. form: file://<host>/<path>
 - telnet: The telnet scheme is used to access interactive services. It does not represent an object per se, but an interactive application (resource) accessible via the telnet protocol. form: telnet://<user>:<password>@<host>:<port>/
 



** Messages **

- HTTP messages sent from web clients to web servers are called request messages. Messages from servers to clients are called response messages.
- HTTP messages are the blocks of data sent between HTTP applications. These blocks of data begin with some text meta-information describing the message con- tents and meaning, followed by optional data. These messages flow between clients, servers, and proxies

- HTTP messages consist of three parts:
 1. Start line
  - The first line of the message is the start line, indicating what to do for a request or what happened for a response. describing the message
 2. Header fields
  - containing attributes. Zero or more header fields follow the start line. Each header field consists of a name and a value, separated by a colon (:) for easy parsing. The headers end with a blank line. 
 3. Body 
  - containing data. After the blank line is an optional message body containing any kind of data. Request bodies carry data to the web server; response bodies carry data back to the client. Unlike the start lines and headers, which are textual and structured, the body can contain arbitrary binary data (e.g., images, videos, audio tracks, software applications). Of course, the body can also contain text and can be empty.

**语法**
- messages syntax 
request message:
<method> <request-URL> <version>
<headers>
<entity-body>

Start line: GET /specials/blade.txt HTTP/1.1
Headers:    Accept: text/*
 					  Host: www.joes-hardware.com 


response message:
<version> <status> <reason-phrase>
<headers>
<entity-body>

Start line:  HTTP/1.1 200 OK
Headers: 		 Content-type: text/plain 
         		 Content-length: 19
Body:	 	     Hi! I'm a message!

- 请求头部
Accept
Host
Referer
Cookie
Cache-Control
User-Agent
Connection
If-Modified-Since 
除非在指定的时间之后现在的资源被修改过, 否则限制这个请求; 可以与 Last-Modified 响应头部配合使用
If-Nonde-Match
服务器可以为文档提供特殊的标签(参见 Etag), 而不是将其与最近修改日期相匹配, 这些标签就像序列号一样. 如果已缓存标签与服务器文档中的标签不同, If-Nonde-Match头部就会执行请求; 如果相同, 返回304

- 响应头部
Content-type
Content-length
content-encoding
Content-Security-Policy

Cache-Control 用于随报文(message)传送缓存指示
Expires 到了该时间时实体不再有效, 需要从源端再次获取
Etag 与此实体相关的实体标记(entity tag)
Last-Modified 这个实体最后一次被修改的日期和时间

Access-Control-Allow-Origin
Set-cookie

- 304(Not Modified)
客户端发送一个 If-Modified-Since 头部, 说明只读取该日期之后修改过的文档, 如果这个日期之后文档并未被修改, 服务器返回一个304状态码, 而不是文档的内容

- 缓存
通过 cashe-control:max-age 和 Expires 头部, HTTP 让原服务器向每个文档附加了一个"过期时间", 说明了在多长时间内可以将这些内容视为新鲜的.
在缓存文档过期之前, 缓存可以以任意频率使用这些副本, 而无需与服务器联系(200 from cache)-当然, 除非客户端请求中包含有(阻止提供已缓存或未验证资源的)头部.
但一旦已缓存文档过期, 缓存就必须与服务器核对, (通过 If-Modified-Since 或 If-Nonde-Match)询问文档是否被修改过, 如果被修改过, 就要获取一份新鲜(带有新的过期时间)的副本; 如果没有修改过, 返回304


**方法**
- GET get a document from the server; Send named resource from the server to the client
- PUT Store data from client into a named server resource. (message body)
- DELETE Delete the named resource from a server.
- TRACE Trace the message through proxy servers to the server.
- POST Send client data into a server gateway application for processing (message body)
- HEAD Send just the HTTP headers from the response for the named resource.

**状态码**
- Every HTTP response message comes back with a status code. The status code is a three-digit numeric code that tells the client if the request succeeded, or if other actions are required.
- Status codes between 200 and 299 represent success. Codes between 300 and 399 indicate that the resource has been moved. Codes between 400 and 499 mean that the client did something wrong in the request. Codes between 500 and 599 mean something went awry on the server.

*Headers*
- Headers example 
 * Content-length: 1450 			 The entity body contains 15,040 bytes of data 
 * Content-type: image/gif 		 The entity body is a GIF image 
 * Accept:image/gif,text/html  The client accepts GIF and HTML

*Entity Bodies*





*connection management*

- With the IP address and port number, a client can easily communicate via TCP/IP. Figure 1-10 shows how a browser uses HTTP to display a simple HTML resource that resides on a distant server.
(a) The browser extracts the server’s hostname from the URL.
(b) The browser converts the server’s hostname into the server’s IP address, looks up IP via (DNS)
(c) The browser extracts the port number (if any) from the URL, HTTP:80.
(d) The browser establishes a TCP connection with the web server using IP and port.
(e) The browser sends an HTTP request message to the server.
(f) The server sends an HTTP response back to the browser.
(g) The connection is closed, and the browser displays the document.


TCP/IP
- HTTP is an application layer protocol. HTTP doesn’t worry about the nitty-gritty details of network communication; instead, it leaves the details of networking to TCP/IP, the popular reliable Internet transport protocol.
- TCP provides:
 * Error-free data transportation
 * In-order delivery (data will always arrive in the order in which it was sent)
 * Unsegmented data stream (can dribble out data in any size at any time)
- In networking terms, the HTTP protocol is layered over TCP. HTTP uses TCP to transport its message data. Likewise, TCP is layered over IP

Connections, IP Addresses, and Port Numbers
- Before an HTTP client can send a message to a server, it needs to establish a TCP/IP connection between the client and server using Internet protocol (IP) addresses and port numbers.
- In TCP, you need the IP address of the server computer and the TCP port number associated with the specific software program running on the server.
-  but how do you get the IP address and port number of the HTTP server in the first place? Why, the URL
-  Hostnames can easily be converted into IP addresses through a facility called the Domain Name Service (DNS)
- When the port number is missing from an HTTP URL, you can assume the default value of port 80.
- With the IP address and port number, a client can easily communicate via TCP/IP.


Keep-Alive
- The keep-alive behavior can be tuned by comma-separated options specified in the Keep-Alive general header:
- The timeout parameter is sent in a Keep-Alive response header. It estimates how long the server is likely to keep the connection alive for. This is not a guarantee.
- The max parameter is sent in a Keep-Alive response header. It estimates how many more HTTP transactions the server is likely to keep the connection alive for. This is not a guarantee.
- The Keep-Alive header also supports arbitrary unprocessed attributes, primarily for diagnostic and debugging purposes. The syntax is name [= value].
- Keep-alive does not happen by default in HTTP/1.0. The client must send a Connection: Keep-Alive request header to activate keep-alive connections.

Telnet
- The Telnet utility connects your keyboard to a destination TCP port and connects the TCP port output back to your display screen. Telnet is commonly used for remote terminal sessions, but it can generally connect to any TCP server, including HTTP servers.
- You can use the Telnet utility to talk directly to web servers. Telnet lets you open a TCP connection to a port on a machine and type characters directly into the port. The web server treats you as a web client, and any data sent back on the TCP con- nection is displayed onscreen.



Architectural Components of the Web
- Proxies
 * HTTP intermediaries that sit between clients and servers, receiving all of the client’s HTTP requests and relaying the requests to the server (perhaps after modifying the requests)
 * Proxies are often used for security, acting as trusted intermediaries through which all web traffic flows. Proxies can also filter requests and responses
- Caches
 * HTTP storehouses that keep copies of popular web pages close to clients
 * A web cache or caching proxy is a special type of HTTP proxy server that keeps copies of popular documents that pass through the proxy. The next client requesting the same document can be served from the cache’s personal copy 
- Gateways
 * Special web servers that connect to other servers/applications
 * They are often used to convert HTTP traffic to another protocol. A gateway always receives requests as if it was the origin server for the resource. The client may not be aware it is communicating with a gateway.
- Tunnels
 * Special proxies that blindly forward HTTP communications
 * HTTP tunnels are often used to transport non-HTTP data over one or more HTTP connections, without looking at the data.
 * One popular use of HTTP tunnels is to carry encrypted Secure Sockets Layer (SSL) traffic through an HTTP connection, allowing SSL traffic through corporate fire- walls that permit only web traffic.
- Agents 
 * Semi-intelligent web clients that make automated HTTP requests
 


### Tips 
- Sending Client Data to the Server
Broadly speaking, your two options for sending client data to the server are the query‐ string and the request body. Normally, if you’re using the querystring, you’re making a GET request, and if you’re using the request body, you’re using a POST request (the HTTP protocol doesn’t prevent you from doing it the other way around, but there’s no point to it: best to stick to standard practice here).

It is a common misperception that POST is secure and GET is not: in reality, both are secure if you use HTTPS, and neither is secure if you don’t. If you’re not using HTTPS, an intruder can look at the body data for a POST just as easily as the querystring of a GET request. However, if you’re using GET requests, your users will see all of their input (including hidden fields) in the querystring, which is ugly and messy. Also, browsers often place limits on querystring length (there is no such restriction for body length). For these reasons, I generally recommend using POST for form submission.


## cookie
一种功能强大且高效的持久身份识别技术
服务器通过 Set-Cookie 或 Set-Cookie2 HTTP响应头部将 cookie 贴到客户端










跟踪了新浪的首页，我们来总结一下HTTP请求的流程：

步骤1：浏览器首先向服务器发送HTTP请求，请求包括：
方法：GET还是POST，GET仅请求资源，POST会附带用户数据；
路径：/full/url/path；
域名：由Host头指定：Host: www.sina.com.cn
以及其他相关的Header；
如果是POST，那么请求还包括一个Body，包含用户数据。

步骤2：服务器向浏览器返回HTTP响应，响应包括：
响应代码：200表示成功，3xx表示重定向，4xx表示客户端发送的请求有错误，5xx表示服务器端处理时发生了错误；
响应类型：由Content-Type指定；
以及其他相关的Header；
通常服务器的HTTP响应会携带内容，也就是有一个Body，包含响应的内容，网页的HTML源码就在Body中。

步骤3：如果浏览器还需要继续向服务器请求其他资源，比如图片，就再次发出HTTP请求，重复步骤1、2。
Web采用的HTTP协议采用了非常简单的请求-响应模式，从而大大简化了开发。当我们编写一个页面时，我们只需要在HTTP请求中把HTML发送出去，不需要考虑如何附带图片、视频等，浏览器如果需要请求图片和视频，它会发送另一个HTTP请求，因此，一个HTTP请求只处理一个资源。
HTTP协议同时具备极强的扩展性，虽然浏览器请求的是http://www.sina.com.cn/的首页，但是新浪在HTML中可以链入其他服务器的资源，比如<img src="http://i1.sinaimg.cn/home/2013/1008/U8455P30DT20131008135420.png">，从而将请求压力分散到各个服务器上，并且，一个站点可以链接到其他站点，无数个站点互相链接起来，就形成了World Wide Web，简称WWW。

HTTP连接就是IO操作

