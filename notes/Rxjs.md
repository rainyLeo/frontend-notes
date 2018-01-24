# Rxjs

Observable object represents the object that sends notifications (the provider);
Observer object represents the class that receives them (the observer).

Observables are able to deliver values either synchronously or asynchronously.

An observable is a collection of values over time.
Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver.
`Observable.subscribe(observer)`

---

Reactive programming is programming with asynchronous data streams, streams are so central to Reactive

A stream is a sequence of ongoing events ordered in time. It can emit three different things: a value (of some type), an error, or a "completed" signal

We capture these emitted events only asynchronously, by defining a function that will execute when a value is emitted, another function when an error is emitted, and another function when 'completed' is emitted.

## 静态方法和实例方法

Instance operators are functions that use the this keyword to infer what is the input Observable.

Static operators are pure functions attached to the Observable class, and usually are used to create Observables from scratch.

### Observable Methods

`combineLatest`

`function combineLatest<T, R>(array: ObservableInput<T>[], project: (...values: Array<T>) => R, scheduler?: IScheduler): Observable<R>`;

To ensure output array has always the same length, combineLatest will actually wait for all input Observables to emit at least once, before it starts emitting results.
Static version of combineLatest accepts either an array of Observables or each Observable can be put directly as an argument


--a-----------e--------i-------->
-----b----c--------d-------q---->
    combineLatest
----ab---ac--ec---ed--id--iq---->

`concat`
---a-----b---|->
             ---x----y---|->
        concat
---a-----b------x----y---|->

`create`
Rx.Observable.create(subscribe)

**arguments**
subscribe(function):

**return**
(Observable): The observable sequence with the specified implementation for the subscribe method

```js
var obs = Rx.Observable.create(function (observer) {
    observer.onNext(42);
    observer.onCompleted();

    // Note that this is optional, you do not have to return this if you require no cleanup
    return function () {
        console.log('disposed');
    };
});

var subscription = obs.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: 42
// => Completed

subscription.dispose();

// => disposed
```

`defer`
`empty`

`for`
`from`
Rx.Observable.from(iterable, [mapFn], [thisArg], [scheduler])

This method creates a new Observable sequence from an array-like or iterable object.

`fromCallback`
`fromEvent`
`fromEventPattern`
`fromNodeCallback`
`fromPromise`

`interval`
    interval(1000)
---0---1---2---3---4---5->
`merge`

stream A: --a-----------b--------c-------->
stream B: --------d----------e-------f---->
                merge(f)
          --a-----d-----b----e---c---f---->
`never`
An Observable that never emits anything.
`of`
    of(1, 2, 3)
1-----2------3|->
将普通数据转换成流式数据 Observable

`range`
Rx.Observable.range(start, count, [scheduler])

`start`
`timer`
    timer(3000, 1000)
-----------0---1---2---3->

`zip`
Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.

stream A: --1----2-------3------->
stream B: -a---------b-------c------>
               zip(f)
          --1a------2b-------3c----->

### Observable Instance Methods

`amb` (5.0 `race`)
取得多个Observable中先有值得那个
`buffer`
`combineAll`
高阶流转一阶流, 然后应用 combineLatest.
`combineLatest`
`concat`
`concatAll`
高阶流转为一阶流, 然后应用 concat
`concatMap`
--1--------------3-----5--------------|-> (inner obs)
  10--10--10-|->  (source obs)
    `concatMap(i => 10*i---10*i---10*i---|)`
--10--10--10-----30--30--3050--50--50-|->

Maps each value to an Observable, then flattens all of these inner Observables using concatAll
concatMap is equivalent to mergeMap with concurrency parameter set to 1.
`concatMapTo`
It's like concatMap, but maps each value always to the same inner Observable.
`count`
Tells how many values were emitted, when the source completes.
`defaultIfEmpty`
-----------------|->
    defaultIfEmpty(41)
-----------------42|->    
If the source Observable turns out to be empty, then this operator will emit a default value.
`distinct`
去重

`distinctUntilChanged`
`function distinctUntilChanged<T, K>(this: Observable<T>, compare: (x: K, y: K) => boolean, keySelector: (x: T) => K): Observable<T>`
对象的深度比较要传_.isEqual
If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
If a comparator function is not provided, an equality check is used by default.
去除连续的重复
`distinctUntilKeyChanged`
去除连续的对象值得重复
`debounce` (`debounceTime` 5.0)
--a---b--c------d----|->
    debounce(200)
-----a------c-----d--|->

Emits an item from the source Observable after a particular timespan has passed without the Observable omitting any other items.
It's like `delay`, but passes only the most recent value from each burst of emissions.

比如 keydown 事件500ms内没有触发再发送请求

`delay`
--a-----b---------|->
    delay(200)
-------a-----b----|->
`do`
`elementAt`
Emits only the i-th value, then completes.
`every`
`expand`

It's similar to mergeMap, but applies the projection function to every source value as well as every output value. It's recursive.
`filter`
5.0中 where 用 filter 替代
`find`
Finds the first value that passes some test and emits that.
`first`
Emits only the first value. Or emits only the first value that passes some test.
`flatMap` (5.0 alias `mergeMap`)

--1--------------3-----5-----------|-> (inner obs)
--10--10--10-|->  (source obs)
    mergeMap(i => 10*i---10*i---10*i---|)
--10--10--10-----30--3050-3050--50-|->

----Namita---Amit---Rohit---Neetika----- //Input Stream
.flatMap(x => Rx.Observable.of('Hello ' + x))
--Hello Namita--     //transforming each input element into an Observable
--Hello Amit--
--Hello Rohit--
--Hello Neetika--
---Hello Namita---Hello Amit---Hello Rohit---Hello Neetika--- // Flatmap's final result

flatMap = map + mergeAll

`flatMapFirst` (5.0 `exhaustMap`)
--1--------------3-----5-----------|-> (inner obs)
--10--10--10-|->  (source obs)
    flatMapFirst(i => 10*i--10*i--10*i---|)
--10--10--10-----30--30--30------|->
当前面的流未完成时放弃后面的流

`flatMapLatest` (5.0 `switchMap`)

`function switchMap<T, I, R>(this: Observable<T>, project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;`

--1--------------3-----5-----------|-> (inner obs)
--10--10--10-|->  (source obs)
    switchMap(i => 10*i--10*i--10*i---|)
--10--10--10-----30--3050--50--50--|->

Maps each value to an Observable, then flattens all of these inner Observables using switch.
可以保证先发送的请求的返回值不会覆盖后发送的
`groupBy`
Groups the items emitted by an Observable according to a specified criterion, and emits these grouped items as GroupedObservables, one GroupedObservable per group.
`isEmpty`
`last`
`map`
--1---------2--------3-------|->
    map(x => 10 * x)
--10--------20-------30------|->
`mapTo`
Like map, but it maps every source value to the same output value every time.
`merge`
`mergeAll`
---.----.-------|------->
    \a   \e
     \    \
      \b   \
       \    \f
        \c   \
         \    \g
          \d   \ (inner obs emit two value over time)
   mergeAll
----a-b-c-ed-f-g--|----->

mergeAll subscribes to an Observable that emits Observables(high order)
高阶流降为一阶流
`min`
`of`
5.0 中 return, just 都统一为 of .
`pairwise`
---a---b-----c------d----|->
    pairwise
-----[a,b]-[b,c]---[c,d]-|->
`partition`
Splits the source Observable into two, one with values that satisfy a predicate, and another with values that don't satisfy the predicate.
`pluck`
Rx.Observable.prototype.pluck(property)

{a: {b: 1}}
.pluck('a', 'b')
`retry`
`sample`
Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits.
----a---b--c--------d----|-->
------x-------x---x----x---|>
    sample
------a-------c--------d-|-->
`sampleTime`
Samples the source Observable at periodic time intervals, emitting what it samples.
---a---b-c--------d-e-f--|-->
    sampleTime(100)
-----------c----------e-|-->
`scan`
----1-----3------5-----|->
    scan((acc, curr) => acc + curr, 0)
----1-----4------9-----|->
It's like reduce, but emits the current accumulation whenever the source emits a value.
`sequenceEqual`
Checks to see of all values emitted by both observables are equal, in order.
`skip`
---a---b---c---d---e---|->
    skip(3)
---------------d---e---|->
`skipUntil`
Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
---a---b---c---d---e---|->
------------x----------|->
    skipUntil
---------------d---e---|->
`skipWhile`
---2---3---4---5---6---|->
    skipWhile(x => x < 4)
-----------4---5---6---|->
`slice`
`some`
`startWith`
-----a-----b-----c---|->
    startWith(s)
s----a--- -b-----c---|->

`subscribe | forEach`
`switch`
---.----.-------|------->
    \a   \e
     \    \
      \b   \
       \    \f
        \c   \
         \    \g
          \d   \ (inner obs emit two value over time)
   switch
----a--b---e--f-g--|----->

类似 mergeAll, 不过会抛弃之前的流
高阶流转为一阶流, 只会保留最后的流，而取消抛弃之前的流
`switchFirst`(5.0 exhaust)
高阶流转为一阶流, 当之前的inner obs未completed时放弃后面的inner obs
`subscribeOn`
`take`
---a-----b---c-----d---|->
    take(2)
---a-----b|-------------->
`takeLast`
`takeUntil`
---a-----b---c-----d---|->
-----------z---|--------->
    takeUntil
---a-----b-|-------------->
Lets values pass until a second Observable, notifier, emits something. Then, it completes.

`takeWhile`
---2-----3---4-----5---|->
    takeWhile(x => x < 4)
---2-----3---|----------->
`throttle`
It's like throttleTime, but the silencing duration is determined by a second Observable.
`throttleTime`
--a--x--y-----b-----x---c-x---|->
    throttleTime(50)
--a-----------b---------c-----|->
Lets a value pass, then ignores source values for the next duration milliseconds.
`toPromise`
`timeInterval`
Records the time interval between consecutive values in an observable sequence.
记录时间
`withLatestFrom`
--a----b----------c---d---e--|-> (source)
----1-----2---3--4------|------>
    withLatestFrom
-------b1---------c4--d4--e4-|->

Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.

#### Observer Methods

`create`
Rx.Observer.create([onNext], [onError], [onCompleted])

`fromNotifier`

#### Observer Instance Methods

`asObserver`
Rx.Observer.prototype.asObserver()

`checked`
`notifyOn`
`onCompleted`
`onError`
`onNext`
`toNotifier`

- [`Rx.Notification`](api/core/notification.md)

`Observable.of` 创建的这个，里面只有一个值，这个值是个数组，所以，订阅它，会得到一个数组
`Observable.from` 创建的这个，里面有若干个值，每个值是由数组中的元素创建的，订阅它，会一次性得到多个值，但展示的时候只会有最后一个，因为前面的都被覆盖掉了

### Subjects

Represents an object that is both an observable sequence as well as an observer. Each notification is broadcasted to all subscribed observers.

This class inherits both from the `Rx.Observable` and `Rx.Observer` classes.

A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

- Rx.AsyncSubject

The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

```js
var subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);
subject.complete();

// observerA: 5
// observerB: 5
```

- Rx.BehaviorSubject

Has a notion of "the current value". It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject

In the following example, the BehaviorSubject is initialized with the value 0 which the first Observer receives when it subscribes. The second Observer receives the value 2 even though it subscribed after the value 2 was sent.

```js
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

- Rx.ReplaySubject

A ReplaySubject records multiple values from the Observable execution and replays them to new subscribers.

```js
var subject = new Rx.ReplaySubject(3, /*window time*/); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```
- Rx.Subject

### Schedulers

- [`Rx.HistoricalScheduler`](api/schedulers/historicalscheduler.md)
- [`Rx.Scheduler`](api/schedulers/scheduler.md)
- [`Rx.VirtualTimeScheduler`](api/schedulers/virtualtimescheduler.md)

### Disposables

- [`Rx.CompositeDisposable`](api/disposables/compositedisposable.md)
- [`Rx.Disposable`](api/disposables/disposable.md)
- [`Rx.RefCountDisposable`](api/disposables/refcountdisposable.md)
- [`Rx.SerialDisposable`](api/disposables/serialdisposable.md)
- [`Rx.SingleAssignmentDisposable`](api/disposables/singleassignmentdisposable.md)

# Vue-rx

Observable -> Vue: `subscriptions`
Vue -> Observable: `watchAsObservable`

vue-rx init 和 beforeDestroy 的时候自动地订阅和取消订阅 Observable

- `subscriptions`

The subscriptions options can also take a function so that you can return unique observables for each component instance:

- `v-stream` (require RxJS)

 stream DOM events to an Rx Subject

- `$watchAsObservable(expOrFn, [options])` (require RxJS)

从 $watch 创建 Observable

- `$subscribeTo(observable, next, error, complete)`

- `$fromDOMEvent(selector, event)` (require RxJS)

```js
data() {
  return {
    num: 1
  }
},

subscriptions() {
  return {
    num$: this.$watchAsObservable('num')
      .pluck('newValue')
      .startWith(this.num)
      .map(a => a + 1)
      .delay(3000)
  }
}
```

- `this.$watchAsObservable('num')`，把num属性的变动，映射到一个数据流上
- 这个数据流的结果是一个对象，里面有newValue和oldValue属性，我们通常情况下，要的都是newValue，所以用pluck把它挑出来
- 注意，这个检测的只是后续变动，对于已经存在的值，是$watch不到的，所以，用startWith，把当前值放进去
- 然后是常规的rx运算了

range 操作，创建了一个流，里面有多个简单数字
map 操作，把这个流升级为二阶，流里面每个元素又是一个流
mergeAll 操作，把其中的每个流合并，降阶为一阶流，流里面每个元素是个简单数字
如果说不 mergeAll，直接订阅 map 出来的那个二阶流，结果是不对的，vue-rx 只支持一阶订阅绑定，不支持把高阶流直接绑定，如果有业务需要，应当自行降阶，通过各种 flat、concat、merge操作，变成一阶流再进行绑定。

## 5.0 change

- Observer Interface Changes (also Subjects)

observer.onNext(value) -> observer.next(value)
observer.onError(err) -> observer.error(err)
observer.onCompleted() -> observer.complete()

- Subscription dispose is now unsubscribe

```js
var subscription = myObservable.subscribe(doSomething);
// RxJS 4: subscription.dispose();
subscription.unsubscribe();
```

- Operator Splits

To reduce polymorphism and get better performance out of operators, some operators have been split into more than one operator:

## vs Functions

Subscribing to an Observable is analogous to calling a Function.

func.call() means "give me one value synchronously"
observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"

## vs Promise

Observable is lazy, is canceble, can retry, can have multiple values

A Promise is simply an Observable with one single emitted value. Rx streams go beyond promises by allowing many returned values.

Promise 其实就是只有单独一个值 的 Observable ，但后者更胜一筹的是允许多个返回值（多次 emit）
