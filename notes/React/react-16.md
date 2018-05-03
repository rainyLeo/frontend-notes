
## 渲染组件

组件就是函数

```js
// 1.写成函数
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 2.写成class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Note: 
1.组件名称大写字母开头
2.React组件就像纯函数, props是参数, props只读

## Statue 和 生命周期

State is similar to props, but it is private and fully controlled by the component.

Class 组件可以有state和生命周期

1. 不要直接修改state, 而是用 setState, 只能在constructor里给this.state赋值
2. State 更新可能是异步的
3. State 更新会被合并

不渲染组件: return null, it does not affect the firing of the component’s lifecycle methods. 


render() function should be pure
render() will not be invoked if shouldComponentUpdate() returns false.

## Lifecycle
获取数据放 didMount 里
componentDidUpdate is guaranteed to be invoked only once per update

- deprecate:
(componentWillMount, componentWillReceiveProps, and componentWillUpdate). 
more problematic with async rendering(may be invoked muliple times)
- new
1. getDerivedStateFromProps 
 after a component is instantiated as well as when it receives new props.
 It can return an object to update state, or null to indicate that the new props do not require any state updates.
 Together with componentDidUpdate, this new lifecycle should cover all use cases for the legacy componentWillReceiveProps.
2. getSnapshotBeforeUpdate
 called right before mutations are made (e.g. before the DOM is updated). The return value for this lifecycle will be passed as the third parameter to `componentDidUpdate`.
Together with componentDidUpdate, this new lifecycle should cover all use cases for the legacy componentWillUpdate.


## Async rendering

- time slicing
ensure that high-priority updates don’t get blocked by a low-priority update
requestIdleCallback
- suspence
components to suspend rendering while they load async data