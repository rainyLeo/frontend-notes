## Optimizing Performance

1. Avoid Reconciliation
 * shouldComponentUpdate
 * React.PureComponent

2. Immutable Data Structures 

Immutability makes tracking changes cheap. A change will always result in a new object so we only need to check if the reference to the object has changed
which is all we need to implement `shouldComponentUpdate`

**shouldComponentUpdate In Action**
shouldComponentUpdate 返回 false, 组件不 reconcile
shouldComponentUpdate 返回 true, 如果 React elements 一样, 组件不 reconcile, 否则 reconcile

## Reconciliation

React implements a heuristic O(n) algorithm based on two assumptions:

1. Two elements of different types will produce different trees.
2. The developer can hint at which child elements may be stable across different renders with a key prop.

**The Diffing Algorithm**

diff V-DOM, 不是 diff 数据

1. Elements Of Different Types
tear down the old tree and build the new tree from scratch.

2. DOM Elements Of The Same Type
React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes

3. Component Elements Of The Same Type
When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance.

4. Recursing On Children


5. Keys