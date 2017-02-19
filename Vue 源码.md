## Dep

A dep is an observable(publisher) that can have multiple directives(subscriber) subscribing to it.
(dep == dependency)

---
“依赖”是“发布／订阅”模式的组成部分。在 Observer 中，依赖的作用有两方面：第一，当 getter 触发时，触发“发布／订阅”模式的“收集依赖（订阅）”过程；第二，当 setter 触发时，触发“发布／订阅”模式的“发布”过程。
---
Dep 连接 Watcher 和 Observer

Dep 即依赖，所谓依赖，就是“表达式（或函数）的值对 `vm._data` 的依赖”，也就是说，一个表达式（或函数）的值需要 `vm._data` 中的哪些属性（或嵌套属性）参与计算。

举个例子，表达式 a.b 依赖 `vm._data.a.b` 参与计算，即当 `vm._data.a.b` 发生变化时，表达式的值也要重新计算。
---

 - addSub

 - removeSub

 - depend

 - notify

 Dep.target
 targetStack, pushTarget(), popTarget


## Watcher

A watcher parses an expression, collects dependencies,
and fires callback when the expression value changes.
This is used for both the $watch() api and directives.

---
Observer 使 data 变成'发布者'(dep), directive 对应的 watcher 是订阅者, 订阅 data 的变化.
watcher 帮 directive 监听表达式的值, 如果发生变化, 则通知它 update 自己所在的 DOM.


Dep 添加/删除订阅者(watcher), watcher 给自己添加 Dep, 或把自己从 Dep 移除.

---
每个与数据绑定的 directive 都有一个 watcher, 帮它监听表达式的值, 如果发生变化,
则通知它 update 自己所在的 DOM.

`Directive.prototype._bind()` 里面，会 `new Watcher(expression, update)`，
把表达式和 .directive的 update方法传进去。
---

每个指令都维护一个 Watcher 实例 `this._watcher` ，这个对象知道什么时候需要执行更新方法，所以现在 DOM 操作的更新函数转交给 Watcher 来维护。

至于插值，其实会被转化为 v-text 或者 v-html 指令

订阅者 Watcher 维护一个表达式，当 Watcher 实例创建的时候，这个表达式会计算一次，在计算的过程中，会触发响应式数据的 getter 方法。利用这一点，Vue 就是在 getter 方法执行时实现将“当前订阅者”添加到依赖的订阅者列表。这个过程也叫 “收集依赖”, 当然，并不是每次 getter 方法都会收集依赖.
---

收集依赖(订阅)

	- get
	 Evaluate the getter, and re-collect dependencies.
	 "touch" every property so they are all tracked as
   dependencies for deep watching

	- addDep
	 Add a dependency to this directive

	- cleanupDeps
	 Clean up for dependency collection

	- update
	 Subsciber interface. Will be called when a dependency changes

	 ```js
	 Dep.prototype.notify = function() {
	 	subs.forEach(sub => sub.update())
	 }
	 ```

	- run
	 Scheduler job interface.
	 Will be called by the scheduler.

	- evaluate
	 Evaluate the value of the watcher.
	 This only gets called for lazy watchers

	- depend
	 Depend on all deps collected by this watcher

	- teardown
	 Remove self from all dependencies's subscriber list

	 remove self from vm's watcher list
   this is a somewhat expensive operation so we skip it
   if the vm is being destroyed or is performing a v-for
   re-render (the watcher list is then filtered by v-for).

	- traverse
	 Recursively traverse an object to evoke all converted
   getters, so that every nested property inside the object
   is collected as a "deep" dependency.






## Observer


Observer 的作用仅仅是把 `vm._data` 进行了 getter/setter 转化

Observer class that are attached to each observed
object. Once attached, the observer converts target
object's property keys into getter/setters that
collect dependencies and dispatches updates.

- walk
 Walk through each property and convert them into
 getter/setters. This method should only be called when
 value type is Object.

- observeArray
 Observe a list of Array items


**helpers**

- protoAugment
 Augment an target Object or Array by intercepting
 the prototype chain using __proto__
 增强对象或数组, 使其能够检测变化. 一是拦截数组的 mutation methods,
 二是提供 $set, $remove

- copyAugment

- defineReactive$$1
 Define a reactive property on an Object.

- observe
 Attempt to create an observer instance for a value,
 returns the new observer if successfully observed,
 or the existing observer if the value already has one.

- set
 Set a property on an object. Adds the new property and
 triggers change notification if the property doesn't
 already exist.

- del
 Delete a property and trigger change if necessary.

- dependArray

 Collect dependencies on array elements when the array is touched, since
 we cannot intercept array element access like property getters





## scheduler
 - resetSchedulerState
 - flushSchedulerQueue
  Flush both queues and run the watchers.
 - queueWatcher
  Push a watcher into the watcher queue.
  Jobs with duplicate IDs will be skipped unless it's
  pushed when the queue is being flushed.
