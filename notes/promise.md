
## Promsie

* Read-only view to a single future value
* Not lazy. By then time you have a promise, it's on its way to being resolved
* Immutable
* Uncancellable. Your promise will resolve or rejct, and only once
* alwayse async


Promise 对比 callback 优点
- sequentiality 
- trustability.
- Immutability
immutable once resolved, it’s now safe to pass that value around to any party and know that it cannot be modified accidentally or maliciously. 

## Observable

* Streames or sets
* Of any number of things
* Over any amount of time
* Lazy. Observable will not generate values via an underlying producer untail they're subscribed to.
* Can be "unsubscribed" from. This means the underlying producer can be told to stop and even tear down

## Async type and value

* DOM events(0-N values)
* Animations(cancelable)
* Ajax(1 value)
* WebSockets(0-N values)
* SSE(0-N values)
* Alternative inputs(0-N values)