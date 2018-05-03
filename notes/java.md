# JDK

The Java Development Kit (JDK), officially named "Java Platform, Standard Edition (Java SE)" is needed for writing Java programs.

- JRE

JRE (Java Runtime) is needed for running Java programs. JDK (Java Development Kit), which includes JRE plus the development tools (such as compiler and debugger), is need for writing as well as running Java programs. In other words, JRE is a subset of JDK. Since you are supposed to write Java Programs, you should install JDK, which includes JRE.

- Install

```bash
# Display the JDK version
javac -version
javac 9.0.x
# Display the JRE version
java -version
java version "9.0.x"
Java(TM) SE Runtime Environment (build 1.x.x_xx-xxx)
Java HotSpot(TM) Client VM (build 22.1-b02, mixed mode, sharing)
# Display the location of Java Compiler
which javac
/usr/bin/javac
// Display the location of Java Runtime
which java
/usr/bin/java

```

javac 是编译器, 将.java编译成.class, java 命令启动Java虚拟机, 虚拟机执行编译器放在class文件中的字节码.
编译器需要文件名(Hello.java), 而运行程序时, 只需要指定类名(Hello), 不要带扩展名.java或.class

- run

```bash
javac Hello.java
# Hello.java Hello.class
java Hello
```

- IDE

Eclipse, NetBeans, IntelliJ IDEA

- External JAR Files and Native Libraries

External Java packages (such as Servlet, MySQL Connector/J, JOGL, JUnit) are often distributed in JAR files (Java Archive - a single-file package of many Java classes), with possibly Native Libraries (".lib" and ".dll" in Windows, or ".a" and ".so" in Linux/Mac).

## Grammer

Java中的所有函数都属于某个类的方法.
Java虚拟机从类中的main方法开始执行. main方法必须声明为public, main方法要有一个外壳类, main方法必须是静态的, void表示没有返回值

Java字符串用双引号

- 数据类型
8种基本类型(4整型, 2浮点, 1字符char, 1布尔boolean)

1. 整型
Java中整型的范围是固定的, 与机器无关.
int(4字节):
short(2字节),
long(8字节): 后缀L或l
byte(1字节).

十六进制前缀0x/0X, 八进制前缀0, 二进制前缀0b/0B
Java没有无符号(unsigned)形式的4整型类型

2. 浮点
float(4字节), double(8字节)
float 类型有后缀f/F

3. char
char 类型原本表示单个字符. 但现在有些Unicode需要2个char
char类型的字面量用单引号括起来, 'A'是编码值65对应的字符常量, "A"是包含一个字符A的字符串
char类型的值可以表示为十六进制值, 范围\u0000-\Uffff, \u Unicode转义值, Unicode转义序列会在解析代码前得到处理
建议不在程序中使用char类型, 除非确实需要处理UTF-16 code unit. 最好将字符串作为抽象数据类型处理

4. boolean

- 变量
变量名大小写敏感, 不能使用未初始化的变量, 变量的声明尽可能靠近变量第一次使用的地方
Java中不区分变量的声明与定义

关键字final表示常量, 只能被赋值一次, 一旦被赋值之后, 就不能再更改了
在Java中, 经常希望某个常量在一个类的多个方法中使用, 通常将这些常量称为类常量, 使用关键字static final定义类常量

- 类型转换
转换顺序 double, float, long, int, 两个数进行二元操作(例如n+f, n是整数, f是浮点数)时, 先要将2个操作数转换为同一个类型, 然后再进行计算. 如果2个数有一个是double类型, 另一个操作数就会转换为double类型, 以此类推
强制类型转换(cast): 
double x = 9.334;
int nx = (int) x;

- 字符串
当一个字符串与一个非字符串的值进行拼接时, 后者被转换成字符串
Java字符串是不可变的, 但又是对象, 大致类似于 char* 指针
用 equals 方法检测两个字符串是否相等, == 只能检测字符串是否在同一个位置(引用地址相等), 但不同位置的字符串内容也可能相同

- 数组
数组是存储同一类型值的集合 
```java 
int[] a = new int[100];
String[] names = new String[10]; // 对象数组的元素初始化为null
int[] primes = {2, 3, 5, 7}
primes = new int[] {17, 19, 23}
```
一旦创建了数组, 就不能改变它的大小(可以改变每个数组元素), 如果需要在运行时改变数组的大小, 应该使用数组列表(array list)
数组拷贝: copyOf, 数值型, 多余元素赋值0, 布尔型false, 如果长度小于原数组, 只拷贝前面的元素

## 面向对象

传统的结构化设计, 首先要确定如何操作数据, 然后再决定如何组织数据, 以便于数组操作.
而 OOP却调换了这个次序, 将数据放在第一位, 然后再考虑操作数据的算法
对于一些规模较小的问题, 将其分解为过程的开发方式比较理想. 而面向对象更加适用于解决规模较大的问题

首先从设计类开始, 然后再往每个类中添加方法'



- 方法参数
Java 按值调用(call by value)

- 对象构造
1. 重载
Java允许重载任何方法, 而不只是构造器方法, 方法签名: 方法名和参数类型
2. 默认域初始化
如果在构造器中没有显示地给域赋予初值, 那么就会被自动地赋为默认值: 数值为0, 布尔值false, 对象为null. (不推荐, 影响可读性)
这是域与局部变量的主要不同点
3. 无参数的构造器
4. 显示域初始化
5. 参数名
6. 调用另一个构造器
7. 初始化块

- 包

使用包的唯一原因是确保类名的唯一性
1. 类的导入
一个类可以使用所属包中的所有类, 以及其他包中的公有类(public class)
2. 静态导入
import语句不仅可以导入类, 还可以导入静态方法和静态域
3. 将类放入包中
要将一个类放入包中, 就必须将包的名字放在源文件开头, 包中定义类的代码之前.

```java
package com.hors.corejava

public class Employee {

}
```
如果没有在源文件中放置 package语句, 这个源文件中的类就被放置在一个默认包(default package)中. 默认包没有名字
将包中的文件放到与完整的包名匹配的子目录中

编译器在编译源文件的时候不检查目录结构. 但是如果包与目录不匹配, 虚拟机就找不到类
4. 包作用域
标记为 public可以被任意的类使用; 标记为 private的部分只能被定义它们的类使用. 
如果没有指定 public或 private, 这个部分(类,方法或变量)可以被同一个包中的所有方法访问.
因此变量必须显示标记为 private, 不然的话将默认为包可见

- 类路径
class path
javac编译器总是在当前的目录中查找文件, 但Java虚拟机仅在类路径中有"."目录的时候才查看当前目录.

- 类设计技巧
1. 一定要保证数据私有
2. 一定要对数据初始化
3. 不要在类中使用过多的基本类型
用其他的类代替多个相关的基本类型的使用
4. 不是所有的域都需要独立的域访问器和域更改器
5. 将职责过多的类进行分解
6. 类名和方法名要能体现它们的职责
7. 优先使用不可变得类

## 继承
1. 类, 超类和子类
2. 覆盖方法
在子类中可以增加域, 增加方法或覆盖超类的方法, 不能删除继承的域和方法
3. 子类构造器
使用super调用超类的方法和构造器, super调用构造器必须是子类构造器的第一条语句, 如果子类的构造器没有显示地调用超类的
构造器, 则将自动地调用超类默认(没有参数)的构造器, 如果超类没有不带参数的构造器, 子类构造器中又没有显式调用超类其他的
构造器, Java编译器会报错

关键字 this两个用途: 1. 引用隐式参数 2. 调用该类其他的构造器
     super两个用途: 1. 调用超类方法 2. 调用超类的构造器
4. 继承层次
5. 多态
6. 理解方法调用
一个对象变量可以指示多种实际类型的现象称为多态. 在运行时能够自动地选择调用哪个方法的现象称为动态绑定    
如果是 private方法, static 方法, final 方法或者构造器, 那么编译器都可以准确地知道应该调用哪个方法, 这种调用称为
静态绑定

在覆盖一个方法的时候, 子类方法不能低于超类方法的可见性. 如果超类方法是public, 子类方法一定要声明为public. 遗漏的话编译器
会把它解释为试图提供更严格的访问权限

7. 阻止继承: final类和方法
不允许扩展的类称为final类
final域, 构造对象之后就不能改变天它们的值. 如果将一个类声明为final, 只有其中的方法自动地成为final, 而不包括域

8. 强制类型转换
只能在继承层次内进行类型转换
在将超类转换成子类之前, 应该使用instanceof进行检查
9. 抽象类
抽象类不能被实例化, 抽象类可以不含抽象方法
抽象方法充当占位的角色, 它们的具体实现在子类中.
10. 受保护访问
protected: 允许子类访问
* 仅对本类可见--private
* 对所有类可见--public
* 对本包和所有子类可见--protected
* 对本包可见--默认, 不需要修饰符

- Object: 所有类的超类
1. equals方法
判断2个对象是否具有相同的引用
对于数组类型的域, 可以使用静态的Arrays.equals方法检测相应的数组元素是否相等
2. 相等测试与继承
3. hashcode 方法
4. toString 方法
建议为自定义的每一个类增加toString方法

- 泛型数组列表
ArrayList 是一个采用类型参数的泛型类, 它用起来有点像数组, 但在添加和删除元素时, 具有自动调节数组容量的功能
ArrayList<Employee> staff = new ArrayList<>()

- 继承的设计技巧
1. 将公共操作和域放在超类
2. 不要使用protected域
3. 使用继承实现"is-a"关系
4. 除非所有继承的方法都有意义, 否则不要使用继承
5. 在覆盖方法时, 不要改变预期的行为
6. 使用多态, 而非类型信息
7. 不要过多地使用反射

## 接口, lambda 表达式与内部类

- 接口
1. 概念
在接口中所有方法都自动地是public, 在实现接口时, 必须把方法声明为public
接口中的域自动为public static final
2. 接口的特性
接口不是类, 不能使用 new实例化一个接口.
接口可以被扩展
接口中不能包含实例域或静态方法, 但却可以包含常量
尽管每个类只能够拥有一个超类, 但却可以实现多个接口
3. 接口与抽象类
接口可以提供多重继承的大多数好处, 同时还能避免多重继承的复杂性和低效性
4. 静态方法
在 Java SE8 中, 允许在接口中增加静态方法
5. 默认方法

- lambda
1. 为什么引入
2. 语法
如果可以推导出一个lambda表达式的参数类型, 则可以忽略其类型
无需指定lambda表达式的返回类型, 它总是会由上下文推导得出
3. 函数式接口
4. 方法引用
5. 构造器引用
6. 变量作用域
lambda表达式可以捕获外围作用域中变量的值
在lambda表达式中,只能引用值不会改变的变量. 另外如果在lambda表达式中引用变量, 而这个变量可能在外部改变, 这也是不合法的
lambda表达式捕获的变量必须实际上是最终变量


- 内部类





