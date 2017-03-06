### Container Component && Presentational Component

Container
  - Focus on how things work
  - Aware of Redux
  - Subscribe to Redux State
  - Dispatch Redux actions
  - Generated
  - stateful

Presentational
  - Focus on how things work
  - Unware of Redux
  - Read data from props
  - Invoke callbacks on props
  - Written by hand
  - stateless


'when you notice that some components don't use props they receive but merely forward them down...it's a good time to introduce some container components'


## 关于 this

render() 里面的 this 是 React 组件本身
React 组件内的函数内的 this 为 undefined(class中默认为strict mode), 所以在 render 内调用组件内的函数要 bind(this), 另一种方法是这个函数用箭头函数的方式来写, 因为箭头函数中的 this 为遵从词法作用域规则, 会'继承'外部的 this

### render / JSX

`render()` method returns a tree of React components that will eventually render to HTML.
the `<div>`(in render()) tags are not actual DOM nodes; they are instantiation of React `div` components. You can think of these as markers or pieces of data that React knows how to handle.React is not generating HTML string so XSS protection is the default.

HTML components are regular React components, just like the ones you define, with one difference. The JSX compiler will automatically rewrite HTML tags to `React.createElement(tagName)` expressions and leave everything else alone.

You do not have to return basic HTML. You can return a tree of components that you built. This is what makes React composeble; a key tenet of maintainable front-ends.

`render()` methods are written declaratively as functions of `this.props` and `this.state`. The framework guarantee the UI is always consistent with the inputs.


### props / state

props, state 都是 object

- props  

Data passed in from the parent component is available as a 'property' on child component. These 'property' are accessed through `this.props` Using props, we will be able to read the data passed to the child component from the parent component, and render some markup.

props are to components what arguments are to functions  

props are `immutable`: they are passed from the parent and are "owned" by the parent.

- state
*当 state变化时, 组件会re-render*  

To implement interactions, we introduce mutable `state` to the component. `this.state` is private to the component and can be changed by calling `this.setState()`. When the state updates, the component re-renders itself.

The key to dynamic updates is the call to `this.setState()`.

### Pure Functions and Function Composition

React 0.14 introduced Stateless Functional Components which allows the code above to be written as normal functions

- Pure functions always return the same result given the same arguments.
- Pure function's execution doesn't depend on the state of the application.
- Pure functions don't modify the variables outside of their scope.
- Pure functions do not have any observable side effects, such as network or database calls. The pure functions just calculate the new value.
- pure functions do not modify the values passed to them

Why is this important for React? Well the main reason is React's `render` method needs to be a pure function and because it's a pure function, all of the benefits of pure functions now apply to your UI as well.
Another reason is that it's a good idea to get used to making your functions pure and pushing "side effects" to the boundaries of your program. I'll say this throughout the course, React will make you a better developer if you learn React the right way. Learning to write pure functions is the first step on that journey.

Pure functions can’t use any of the lifecycle methods like componentWillMount or shouldComponentUpdate. Stateless functional components are great for simple components when all they do is take some props and render something based on those props.

Stateless functions don't have a `this` object.

Currently the biggest downfall with Stateless Functional Components are that they don't support `shouldComponentUpdate` (which we'll talk about soon), but as someone new to React I think that's a tradeoff you should make until you learn more about advanced features like shouldComponentUpdate.

### API / property
`this.props.children`  
an array of components rather than just a single component

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点
这里需要注意，只有当子节点多余1个时，this.props.children 才是一个数组

`PropTypes`

`ref`

`findDOMNode`  



### 插件

node-uuid 生成独立的key
lodash : throttle

### Test

mocha+expect

enzyme

### lifecycle events
Lifecycle methods are special methods each component can have that allow us to hook into the views when specific conditions happen (i.e. when the component first renders or when the component gets updated with new data, etc).

You can really break React's Life Cycle Methods down into two categories.
1) When a component gets mounted to the DOM and unmounted.
2) When a component receives new data.

`getDefaultProps`
`getInitialState()` executes exactly once during the lifecycle of the component and sets up the initial state of the component.
`componentWillMount` executed before the node is inserted into the DOM

`componentDidMount` is a method called automatically by React after a component is rendered(mounted to the DOM) for the first time. executed after the node is inserted into the DOM
- Make an Ajax request to fetch some data  
- set up listeners

`componentWillUnmount()`  executed right before the component is removed from the DOM
- Remove any listeners

`componentDidUpdate(prevProps, prevState)`

Life Cycle Events that are going to be called whenever the component *receives new data from its parent component*.

`componentWillReceiveProps(nextProps)` execute some code whenever your component receives new props

`shouldComponentUpdate(newProps, newState)` returns a boolean, if that boolean is true, that component will re-render. If it's false, that component (and naturally all child components), won't re-render.This can be a huge performance gain if you know exactly when you want to re-render (based on either the state or the props of your components).

This method is called before `componentWillUpdate()` and gives you a chance to `return false`, cancel the update, which means your `render()` method won't be invoked. This is useful in performance-critical areas of the app when you think nothing interesting changed and no re-rendering is necessary. You make this decision based on comparing the `newState` argument with the existing `this.state` and comparing `newProps` with `this.props` or just simply knowing that this component is static and doesn't change.

![](/Users/baoyang/Dropbox/Picture/lifecycle.png)

### Callbacks as props
We need to pass data from the child component back up to its parent. We do this in our parent's `render` method by passing a new callback into the child, binding it to the child's event.Whenever the event is triggered, the callback will be invoked.

### ReactDOM
`ReactDOM.render()` instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.
The ReactDOM module exposes DOM-specific methods, while React has the core tools shared by React on different platforms

### ES5 ES6 or Stateless functions
- If your component needs to access `this`, use ES6 classes
- If your components need lifecycle methods, use ES6 classes
- If you can use Stateless Functional Component, then do so.


React.createClass -> extends React.Component
- No more random properties in the object, only functions (methods). If you need a property, you assign it to this inside of the constructor
- The method syntax is render() {}, no more function keywords necessary
- The methods are no longer separated by , as in var obj = {a: 1, b: 2}

## Thinking in React

- Step1: Break the UI into a component hierarchy
- Step2: Build a static version in React
- Step3: Identify the minimal(but complete) representation of UI state
- Step4: Identify where your state should live
- Step5: Add inverse data flow


Why amazing?
1. Everything is a component
2. Single source of truth(SSOT)
3. Virtual DOM

![](/Users/baoyang/Dropbox/Picture/react-ssot.png)

Virtual DOM
compare virtual/real DOM tree, calculate the minimize set to re-render
![](/Users/baoyang/Dropbox/Picture/react-rendertree.png)
