## Event & Callback

Events are great for things that can happen multiple times on the same object—keyup, touchstart etc. With those events you don't really care about what happened before you attached the listener

```js
// add this function to the job queue after 500 ms have passed
setTimeout(function() {
    console.log("Timeout");
}, 500)
console.log("Hi!");


```

## Book << You don't konw JS (Async and performance) >>

two major categories of deficiencies with using callbacks to express program asynchrony and manage concurrency: lack of sequentiality and lack of trustability.

- Because a Promise is externally immutable once resolved, it’s now safe to pass that value around to any party and know that it cannot be modified accidentally or maliciously. This is especially true in relation to multiple parties observing the resolution of a Promise.

It is not possible for one party to affect another party’s ability to observe Promise resolution. 

Immutability may sound like an academic topic, but it’s actually one of the most fundamental and important aspects of Promise design, and shouldn’t be casually passed over.  

- Promises are an easily repeatable mechanism for encapsulating and composing future values.



## Promise   

A promise is a placeholder for the result of an asynchronous operation. Instead of subscribing to an event or passing a callback to a function, the function can return a promise

Any Promise object is in one of three mutually exclusive states: `fulfilled`, `rejected`, and `pending`:

- A promise p is `fulfilled` if p.then(f, r) will immediately enqueue a Job to call the function f.
- A promise p is `rejected` if p.then(f, r) will immediately enqueue a Job to call the function r.
- A promise is `pending` if it is neither fulfilled nor rejected.
- A promise is said to be `settled` if it is not pending, i.e. if it is either fulfilled or rejected.

A promise is `resolved` if it is settled or if it has been “locked in” to match the state of another promise. Attempting to resolve or reject a resolved promise has no effect. A promise is unresolved if it is not resolved. An unresolved promise is always in the pending state. A resolved promise may be pending, fulfilled or rejected.


- Promises are not about replacing callbacks. Promises provide a trustable intermediary—that is, between your calling code and the async code that will perform the task—to manage callbacks.
- Promises can be chained together, which can sequence a series of asychronously completing steps
- Promise is that it’s a future value, a time-independent container wrapped around a value. Promise is said to be the async version of a sync function’s return value.
- Just know that if you don’t attach a rejection handler to a promise, all failures will happen silently

Calling `resolve()` triggers an asynchronous operation. Functions passed to `then()` and `catch()` are executed asynchronously, because these are also added to the `job queue`

Each call to `then()` or `catch()` actually creates and returns another promise. This second promise is resolved only when the first has been fulfilled or rejected

---

At their most basic, promises are a bit like event listeners except:

- A promise can only succeed or fail `once`. 
- If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.

This is extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome.

*Queuing asynchronous actions*
You can also chain thens to run async actions in sequence.

When you return something from a `then()` callback, it's a bit magic. If you return a value, the next `then()` is called with that value. However, if you return something promise-like, the next `then()` waits on it, and is only called when that promise settles (succeeds/fails)

**JavaScript exceptions and promises**

Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in the constructor callback:

---


### Promise API 

`Promise.resolve()`
The Promise.resolve() method accepts a single argument and returns a promise in the fulfilled state. That means no job scheduling occurs, and you need to add one or more fulfillment handlers to the promise to retrieve the value.
`Promise.reject()`
You can also create rejected promises by using the Promise.reject() method. This works like Promise.resolve() except the created promise is in the rejected state

If you pass a promise to either the Promise.resolve() or Promise.reject() method, the promise is returned without modification.
`Promise.all()`
Promise.all takes an array of promises and creates a promise that fulfills when all of them successfully complete. You get an array of results (whatever the promises fulfilled to) in the same order as the promises you passed in.
`Promise.race()`









**Examples**

```js
var p = new Promise(function(resolve, reject) {
	// ..
});
// The two parameters provided to the Promise(..) constructor are functions, and are generally named resolve(..) and reject(..), respectively. They are used as:
// If you call reject(..), the promise is rejected, and if any value is passed to reject(..), it is set as the reason for rejection.
// If you call resolve(..) with no value, or any nonpromise value, the promise is fulfilled.
// If you call resolve(..) and pass another promise, this promise simply adopts the state—whether immediate or eventual—of the passed promise (either fulfillment or rejection).



function ajax(url) {
	return new Promise(function pr(resolve, reject) {
		// make request, eventually call
		// either `resolve()` or `reject()`
	});
	
}
ajax("http://some.url.1")
.then(
	function fulfilled(contents) {
		// handle contents success
	},
	function rejected(reason) {
		// handle ajax error reason 
	}
)

```

## API

- Axios

- fetchAPI

`fetch()`: 该方法最简单的形式是，接受一个 URL 参数并返回一个 promise 对象：

```js
fetch('http://rest.learncode.academy/api/test123/tweets')
	.then(response => response.json())
	.then(json => dispatch({
		type: 'FETCH_TWEETS_FULFILLED', 
		payload: json
	}))

```

Fetch 引入了 3 个接口，分别是 `Headers`，`Request` 和 `Response`。他们直接对应于的 HTTP 中相应的概念，但是基于隐私和安全考虑，也有些区别，例如支持 CORS 规则以及保证 cookies 不能被第三方获取



## Generator + Promise

The important pattern to recognize: a generator can yield a promise, and that promise can then be wired to resume the generator with its fulfillment value.

Promises are a trustable system that uninverts the inversion of con‐ trol of normal callbacks or thunks (see the Async & Performance title of this series). So, combining the trustability of Promises and the synchronicity of code in generators effectively addresses all the major deficiencies of callbacks. Also, utilities like Promise.all([ .. ]) are a nice, clean way to express concurrency at a generator’s single yield step.


## async / await

`async` function is essentially syntactic sugar for the `generators + promises + run(..)` pattern; under the covers, it operates the same!

```js
(async function() {
	let contents = await readFile("config.json");
	doSomethingWith(contents);
	console.log("Done");
});

```
Async functions *always* return a promise, whether you use `await` or not. That promise resolves with whatever the async function returns, or rejects with whatever the async function throws.

The `async` keyword before function indicates that the function is meant to run in an asynchronous manner. The `await` keyword signals that the function call to readFile("config.json") should return a `promise`, and if it doesn’t, the response should be wrapped in a promise. 

When you `await` a promise, the function is paused in a non-blocking way until the promise settles. If the promise fulfills, you get the value back. If the promise rejects, the rejected value is thrown. Anything you `await` is passed through `Promise.resolve()`, so you can safely await non-native promises.

Just like the implementation of `run()` in the preceding section,` await` will throw an error if the promise is rejected and otherwise return the value from the promise.

async 的返回值, await 后面函数f()的返回值都是promise
1. f() resolve,  await f()返回 resolve 的值, async 返回 promise
2. f() reject, await f() 没有返回值, async 返回该 reject promise