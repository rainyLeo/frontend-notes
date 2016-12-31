要理解 A*搜索算法, 要从启发式搜索算法说起, 所谓启发式搜索, 就在于当前搜索节点往下选择下一步节点时, 可以通过一个启发函数(heuristic)来进行选择, 选择代价最少的节点作为下一步搜索节点而跳转其上.(遇到有一个以上代价最少的节点时, 可以选距离当前搜索点最近一次展开的搜索点进行下一步搜索). 

DFS 和 BFS 在展开子节点时均属于盲目型搜索, 也就是说, 它不会选择哪个节点在下一次搜索中更优就跳转到该节点上进行下一步的搜索. 在运气不好的情况下, 均需要试探完整个解集空间, 显然只适合问题规模不大的搜索问题中. 

而与 DFS, BFS 不同的是, 一个经过仔细设计的启发函数, 往往在很快的时间内就可以得到一个搜索问题的最优解, 对于 NP 的问题, 亦可在多项式时间内得到一个较优解. 关键在于如何设计这个启发函数.


A* 算法, 是一种在图形平面上, 有多个节点的路径, 求出最低通过成本的算法. 常用于游戏中 NPC 的移动的计算, 或在线游戏的 BOT 的移动计算上.

A* 算法综合了 BFS 和 Dijkstra 算法的有点: 在进行启发式搜索提高算法效率的同时, 可以保证找到一条最有路径(基于评估函数). 

在此算法中, 如果以 g(n) 表示从起点到任意顶点 n 的实际距离, h(n) 表示任意顶点 n 到目标顶点的估算距离(根据评估函数的不同而变化), 那么 A*算法的估算函数为:
`f(n) = g(n) + h(n)`
该公式遵循以下特性:
- 如果 g(n) 为0，即只计算任意顶点n到目标的评估函数 h(n)，而不计算起点到顶点n的距离，则算法转化为 BFS(Breadth First Search),此时使用的是贪心策略，速度最快，但可能得不出最优解；
- 如果 h(n) 不为0，则一定可以求出最优解，而且 h(n) 越小，需要计算的节点越多，算法效率越低，常见的评估函数有——欧几里得距离、曼哈顿距离、切比雪夫距离；
- 如果 h(n) 为0，即只需求出起点到任意顶点n的最短路径 g(n)，而不计算任何评估函数 h(n)，则转化为单源最短路径问题，即 Dijkstra 算法，此时需要计算最多的定点；

-----------

[参考链接](http://www.redblobgames.com/pathfinding/a-star/introduction.html)

在游戏中经常需要遭到一个位置到另一个位置的路径. 不仅需要找到最短路径, 也会考虑行进时间.
为了找到路径我们可以使用一种 *图搜索(graph search)* 算法, 当地图可以用图表示的时候.
A* 是图搜索的一种常用的选择. BFS 是图搜索算法中最简单的一种, 所以先从它开始说起.

### 表示一个地图
学习算法的第一件事是理解 **数据**. 什么是输入? 什么是输出?

**输入**: 图搜索算法, 包括 A*, 把"图"作为输入. 图是位置(节点nodes)和连接(边edge)的集合. A*只认识图, 不认识其他的东西.

**输出**:  A* 找到的路径由图节点和边组成. 边是抽象的属性概念. A* 会告诉你从一个位置移动到另一个位置但不会告诉你这样移动. 

下面用网格(grid)表示图 因为它容易形象化概念.

### 算法
有很多用在图上的算法, 下面会讨论这些:
* Breadth First Search
所有方向上等价地搜索.这是一种很有用的算法, 不仅可以用于寻路, 也可以用在procedural map generation, flow field pathfinding, distance maps 和其他一些图分析中
* Dijkstra's Algorithm
优先考虑搜寻哪个路径. 不同于等价搜寻所有可能的路径, 它更倾向低代价的路径. 当移动的代价不同时, 我们用这个代替 BFS
* A*
它是基于 Dijkstra 算法的一种修改, 用与单个目标节点. Dijkstra 算法可以找到去所有位置的路径; A* 只找去一个位置的路径. 它优先考虑距离目标更近的路径.

下面从最简单的 BFS 开始, 每次增加一个特点直到变为 A*

### Breadth First Search
这些算法的关键思想都是追踪一个叫做 *边界(frontier)* 的不断扩展的圈. 在网格中, 这个过程称为"泛红填充"(flood fill), 这种技术在非网格中也可以使用. 

怎样实现呢?重复这些步骤直到边界(frontier)为空:
1. 从边界(frontier)中挑选并删除一个位置(location)
2. 把这个位置标记为已访问, 这样就不会再去处理它
3. *扩充* 它通过查看它的邻居节点(neighbors), 任何未见过的节点都把它加到边界中

看一下代码(Python):

```py
frontier = Queue()
frontier.put(start)
visited = {}
visited[start] = True

while not frontier.empty():
	current = frontier.get()
		for next in graph.neighbors(current):
			if next not in visited:
				frontier.put(next)
				visited[next] = True
```
这个循环是这里图搜索算法的关键, 包括 A*. 但怎么找到最短路径呢? 这个循环没有实际建立路径; 它只说明了如何访问图上的每一个节点. 因为 BFS 可以用在除了寻路其他很多地方. 这里我们只用来寻路, 所以修改一下循环来跟踪已访问过的节点 *来自哪里* , 并把 visited 重命名为 came_from:

```py
frontier = Queue()
frontier.put(start )
came_from = {}
came_from[start] = None

while not frontier.empty():
   current = frontier.get()
   for next in graph.neighbors(current):
      if next not in came_from:
         frontier.put(next)
         came_from[next] = current
```

现在每个节点的 came_from 指向它的上一个节点. 


重建路径的代码比较简单: 从目标到开始节点一步步返回. 路径是 *一系列边(edges)*, 但保存节点通常更简单:

```py
current = goal
path = [current]
while current != start:
	current = came_from[current]
	path.append(current)
path.append(start) #optional
path.reverse() # optional
```

这是最简单的寻路算法, 它不仅可以用在这里的网格上, 也可以用在任何种类的图当中. 在地牢游戏中, 图位置可以是房间, 图的边可以是它们之间的通道. 


### 提前退出
我们找到了从一个节点去所有其他位置的路径, 通常不需要所有的路径. 我们只需要一个路径, 从开始到目标节点. 当我们发现目标时可以停止扩展边界. 

```py
frontier = Queue()
frontier.put(start )
came_from = {}
came_from[start] = None

while not frontier.empty():
   current = frontier.get()

   if current == goal: 
      break           

   for next in graph.neighbors(current):
      if next not in came_from:
         frontier.put(next)
         came_from[next] = current
```

### 移动成本

到目前为止我们的每一步成本(cost)是一样的. 在一些寻路的情况下, 不同类型的移动有不同的成本. 网格中对角线的移动可能比直线移动需要更大的成本. 我们比较下从开始节点的 *步骤数* 和 *距离*.

这种情况我们用 **Dijkstra's Algorithm**, 它和 BFS 有什么不同? 我们需要 track 移动成本, 增加一个变量, cost_so_far, 来追踪从开始节点的总的移动成本. 当评估一个节点位置时需要考虑移动成本; 把 queue 更改为 priority queue. 不太明显的是, 我们可能会用不同的代价多次访问一个节点, 所以我们需要稍微改一下逻辑. 原先情况下, 如果位置已被访问我们给 frontier 增加一个节点, 现在情况是, 当新的路径比之前最好的路径更好时, 我们把它加到 frontier. 

```py
frontier = PriorityQueue()
frontier.put(start, 0)
came_from = {}
came_from[start] = None
cost_so_far = {}
cost_so_far[start] = 0

while not frontier.empty():
	current = frontier.get()
	if current == goal:
		break
	
	for next in graph.neighbors(current):
		new_cost = cost_so_far[current] + graph.cost(current, next)
		if next not in cost_so_far or new_cost < cost_so_far[next]:
			cost_so_far[next] = new_cost
			priority = new_cost
			frontier.put(next, priority)
			came_from[next] = current
```

用一个 priority queue 代替常规的 queue *改变了 frontier 扩充的方式*. 

除了1的移动成本可以使我们探索更多有趣的图, 不仅仅是网格. 

一个实现细节: priority queue 支持插入和删除操作, 但一些 Dijkstra 算法也有第三种操作, 用来修改其中元素的 priority. 

### 启发式(heuristic)搜索

在 BFS 和 Dijkstra 算法中, frontier 向所有方向扩充. 然而, 有时候只需找到去一个节点的路径. 我们来让 frontier 朝着目标的方向扩充而不是其他方向. 首先我们定义一个 *启发* 函数, 来告诉我们距离目标有多近:

```py
def heuristic(a, b):
	# Manhattan distance on a square grid
	return abs(a.x - b.x) + abs(a.y - b.y)
```

在 Dijkstra 算法中, 我们用距 *开始* 的实际距离来管理 priority queue 的优先级. 在这里, **Greedy Best First Search** 中, 我们用距 *目标* 的的估计距离来管理 priority queue 的优先级. 距离目标最近的节点会先访问. 代码用了 BFS 中的 priority queue 但没用 Dijkstra 中的 cost_so_far.

```py
frontier = PriorityQueue()
frontier.put(start, 0)
came_from = {}
came_from[start] = None

while not frontier.empty():
  current = frontier.get()

  if current == goal:
    break
   
    for next in graph.neighbors(current):
      if next not in came_from:
        priority = heuristic(goal, next)
        frontier.put(next, priority)
        came_from[next] = current
```


### A* 算法

Dijkstra 算法在寻找最短路径时很好用, 但它也搜索了其他不想要的方向浪费了时间. Greedy Best First 算法搜寻了更准确的方向但它可能找的不是最短的路径. A* 算法结合二者, 用了距离开始的实际距离和距离目标的估计距离.
代码和 Dijkstra 算法很像.

```py
frontier = PriorityQueue()
frontier.put(start, 0)
came_from = {}
cost_so_far = {}
came_from[start] = None
cost_so_far[start] = 0

while not frontier.empty():
   current = frontier.get()

   if current == goal:
      break
   
   for next in graph.neighbors(current):
      new_cost = cost_so_far[current] + graph.cost(current, next)
      if next not in cost_so_far or new_cost < cost_so_far[next]:
         cost_so_far[next] = new_cost
         priority = new_cost + heuristic(goal, next)
         frontier.put(next, priority)
         came_from[next] = current
```

**比较** 算法: Dijkstra 算法计算距离开始的距离, GBF 估算距离目标的距离. A* 用二者之和.
当 GBF 找到正确路径时, A*也找到了.当 GBF 找的是错误的路径(更长), A*找到了正确的路径, 像 Dijkstra 那样, 但比 Dijkstra 搜索了更少的节点.


A* 取了这两个的优点. 只要启发函数不高估距离, A* 不会用启发函数得到估计的结果. 它找一个最佳的路径, 像 Dijkstra 那样. A* 用启发函数重新排序节点, 因此目标节点更可能尽早发现.


















