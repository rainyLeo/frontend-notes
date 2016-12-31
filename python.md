Python: 动态类型语言(运行期间才检查变量的类型, 编译时不知道变量的类型, 编写时可以不指定变量的数据类型); 强类型语言(无隐式类型转换, 一个变量不经过强制转换, 永远是这个数据类型); 静态作用域(词法作用域)

### syntax
int : integers
float : real numbers
bool : boolean
NoneType : none
type()


i // j : int division
i ** j : i to the power of j
_ : 上一次表达式的值
3 * 'ab' : 'ababab'
a, b = 0, 1
a, b = b, a
'...' : 换行

and  (&& in js)
or (|| in js)
not (! in js)

range(1, 4) : 1, 2, 
range(0, 10, 3) : 0, 3, 6, 9
list(range(5)) : [0, 1, 2, 3, 4]

pass statement

Keyword Arguments 
- Functions can also be called using keyword arguments of the form kwarg=value
- When a final formal parameter of the form `**name` is present, it receives a dictionary (see Mapping Types - dict) containing all keyword arguments except for those corresponding to a formal parameter.  
- This may be combined with a formal parameter of the form `*name` which receives a tuple containing the positional arguments beyond the formal parameter list. (`*name` must occur before `**name`.)  





Arbitrary Argument Lists

Unpacking Argument Lists  

- The reverse situation occurs when the arguments are already in a list or tuple but need to be unpacked for a function call requiring separate positional arguments
-  If they are not available separately, write the function call with the \*-operator to unpack the arguments out of a list or tuple:
- In the same fashion, dictionaries can deliver keyword arguments with the \*\*-operator:



Lambda Expressions
- Small anonymous functions can be created with the lambda keyword. This function returns the sum of its two arguments: lambda a, b: a+b
- 

Documentation Strings

Function Annotations

Intermezzo: Coding Style

## Functions 
- Scope
 1. inside a function, can access a variable defined outside
 2. inside a function, cannot modify a variable defined outside(JS can modify)
  - 理解为每个作用域内变量前有 var 重新声明

```py
x = 5
def h():
    x = x + 1
    print(x)

h() # UnboundLocalError: local variable 'x' referenced before assignment


def g(x):
    def h():
        x = 'abc'
    x = x + 1
    print('in g(x): x =', x)
    h()
    return x
    
x = 3
z = g(x)
print('z',z)
#output
 in g(x): x = 4
 z 4

```

## Data Structures

### str
immutable

word = 'hello'
- word[0:2] => 'he' 
- word[:2] => 'he'
- word[1:] => 'ello'
- len(word) => 5

- word.split('char')

### List 
mutable 

list = [1,2,3,4] 
- list[-2] => 3
- list[0:2] => Rt == [1,2], list == [1,2,3,4]
- list2 = list[:] (shallow copy)
- list + [5,6] => Rt == [1,2,3,4,5,6], list == [1,2,3,4]
- list.append(5) => list == [1,2,3,4,5]
- list[0:2] = [5,6] => list == [5,6,3,4]
- len(list) => 4
- li.insert(0,0) => list == [0,1,2,3,4]
- min(), max(), len(), del(l[i])
list.append(x)
list.extend(L)
list.insert(i, x)
list.remove(x)
list.pop([i])
list.clear()

list.index(x)
list.count(x)
list.sort(key=None, reverse=False)
sorted(list)
list.reverse()
list.copy()
''.join(list)

- methods like insert, remove or sort that only modify the list have no return value printed – they return the default None
- del statement
 1. There is a way to remove an item from a list given its index instead of its value: the del statement. 
 2. This differs from the pop() method which returns a value. 
 3. The del statement can also be used to remove slices from a list or clear the entire list (which we did earlier by assignment of an empty list to the slice)
 
### Tuples and Sequences
- Tuples may be nested
- Tuples are immutable, but they can contain mutable objects

t = 1, 2, 3
t = (1, 2, 3)
t[0] == 1
v = ([1, 2, 3], [3, 2, 1])
v[0][0] == 1

### Sets 
- A set is an unordered collection with no duplicate elements
- Set objects also support mathematical operations like union, intersection, difference, and symmetric difference.
- Curly braces or the set() function can be used to create sets. Note: to create an empty set you have to use set(), not {}; the latter creates an empty dictionary,

basket = {'apple', 'orange', 'apple', 'pear', 'orange'}
=> basket == {'orange', 'pear', 'apple'}
a = set('abccba')
=> a == {'c', 'a', 'b'}

b = set('ad')
'c' in a == Ture
a - b == {'c', 'b'}
a | b == {'d', 'c', 'a', 'b'}
a & b == {'a'}
a ^ b == {'d', 'c', 'b'}

c = {x for x in 'abcde' if x not in 'abc'}
c == {'d', 'e'}


### Dictionaries 
- Dictionaries are sometimes found in other languages as “associative memories” or “associative arrays”
- dictionaries are indexed by keys, which can be any immutable type
- strings and numbers can always be keys. Tuples can be used as keys if they contain only strings, numbers, or tuples
- You can’t use lists as keys, since lists can be modified in place using index assignments, slice assignments, or methods like append() and extend()
- It is best to think of a dictionary as an unordered set of key: value pairs, with the requirement that the keys are unique (within one dictionary)
- A pair of braces creates an empty dictionary: {}. 
- Placing a comma-separated list of key:value pairs within the braces adds initial key:value pairs to the dictionary;
- It is also possible to delete a key:value pair with `del`
- Performing `list(d.keys())` on a dictionary returns a list of all the keys used in the dictionary, in arbitrary order (if you want it sorted, just use `sorted(d.keys())` instead)
- To check whether a single key is in the dictionary, use the `in` keyword

dict['key'] = value
dict.keys()
dict.values()

keys
- must be unique
- immutable type
- careful with float type as a key 
- no order to keys or values


person = {'name': 'leo', 'age': 25}
person['job'] = 'dev' (no . notation) => person == {'name': 'leo', 'age': 25, 'job': 'dev'}
del person['name'] => person == {'age': 25, 'job': 'dev'}
list(person.keys()) => ['name', 'age', 'job']
sorted(person.keys()) => ['age', 'job', 'name']

- The `dict()` constructor builds dictionaries directly from sequences of key-value pairs:
`dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])`
=> {'sape': 4139, 'jack': 4098, 'guido': 4127}

- dict comprehensions can be used to create dictionaries from arbitrary key and value expressions
`{x: x**2 for x in (2, 4, 6)}`
=> {2: 4, 4: 16, 6: 36}

- When the keys are simple strings, it is sometimes easier to specify pairs using keyword arguments:
`dict(sape=4139, guido=4127, jack=4098)`
{'sape': 4139, 'jack': 4098, 'guido': 4127}

### Looping Techniques
- When looping through dictionaries, the key and corresponding value can be retrieved at the same time using the `items()` method.

```py
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
#output
gallahad the pure
robin the brave
```


- When looping through a sequence, the position index and corresponding value can be retrieved at the same time using the `enumerate()` function.

```py
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)
# output
0 tic
1 tac
2 toe
```

- To loop over two or more sequences at the same time, the entries can be paired with the `zip()` function.

```py
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
   print('What is your {0}?  It is {1}.'.format(q, a))
#output
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.
```

- To loop over a sequence in reverse, first specify the sequence in a forward direction and then call the `reversed()` function.

```py
for i in reversed(range(1, 10, 2)):
   print(i)
#output
apple
banana
orange
pear

```

- It is sometimes tempting to change a list while you are looping over it; however, it is often simpler and safer to create a new list instead.

```py
import math
raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
filtered_data = []
for value in raw_data:
   if not math.isnan(value):
       filtered_data.append(value)

#output
filtered_data
[56.2, 51.7, 55.3, 52.5, 47.8]
```
### More on Conditions

- The comparison operators `in` and `not in` check whether a value occurs (does not occur) in a sequence. The operators `is` and `is not` compare whether two objects are really the same object; this only matters for mutable objects like lists. All comparison operators have the same priority, which is lower than that of all numerical operators.

- Comparisons can be chained. For example, `a < b == c` tests whether a is less than b and moreover b equals c.

- Comparisons may be combined using the Boolean operators `and` and `or`, and the outcome of a comparison (or of any other Boolean expression) may be negated with `not`. These have lower priorities than comparison operators; between them, `not` has the highest priority and `or` the lowest, so that `A and not B or C` is equivalent to `(A and (not B)) or C`. As always, parentheses can be used to express the desired composition.

- The Boolean operators `and` and `or` are so-called short-circuit operators: their arguments are evaluated from left to right, and evaluation stops as soon as the outcome is determined. For example, if `A` and `C` are true but `B` is false, `A and B and C` does not evaluate the expression `C`. When used as a general value and not as a Boolean, the return value of a short-circuit operator is the last evaluated argument.

It is possible to assign the result of a comparison or other Boolean expression to a variable. For example,

```py
string1, string2, string3 = '', 'Trondheim', 'Hammer Dance'
non_null = string1 or string2 or string3

#output
non_null
'Trondheim'
```

- Note that in Python, unlike C, assignment cannot occur inside expressions. C programmers may grumble about this, but it avoids a common class of problems encountered in C programs: typing = in an expression when == was intended.

### Comparing Sequences and Other Types

- Sequence objects may be compared to other objects with the same sequence type. The comparison uses lexicographical ordering: first the first two items are compared, and if they differ this determines the outcome of the comparison; if they are equal, the next two items are compared, and so on, 
- If two items to be compared are themselves sequences of the same type, the lexicographical comparison is carried out recursively. 

```py
(1, 2, 3)              < (1, 2, 4)
[1, 2, 3]              < [1, 2, 4]
'ABC' < 'C' < 'Pascal' < 'Python'
(1, 2, 3, 4)           < (1, 2, 4)
(1, 2)                 < (1, 2, -1)
(1, 2, 3)             == (1.0, 2.0, 3.0)
(1, 2, ('aa', 'ab'))   < (1, 2, ('abc', 'a'), 4)
```
- Note that comparing objects of different types with < or > is legal provided that the objects have appropriate comparison methods. For example, mixed numeric types are compared according to their numeric value, so 0 equals 0.0, etc. Otherwise, rather than providing an arbitrary ordering, the interpreter will raise a TypeError exception

## Modules

A module is a file containing Python definitions and statements. The file name is the module name with the suffix .py appended. Within a module, the module’s name (as a string) is available as the value of the global variable __name__. For instance, use your favorite text editor to create a file called fibo.py in the current directory with the following contents:

```py
# Fibonacci numbers module, fibo.py

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while b < n:
        print(b, end=' ')
        a, b = b, a+b
    print()

def fib2(n):   # return Fibonacci series up to n
    result = []
    a, b = 0, 1
    while b < n:
        result.append(b)
        a, b = b, a+b
    return result
```

Now enter the Python interpreter and import this module with the following command:
`import fibo`
This does not enter the names of the functions defined in fibo directly in the current symbol table; it only enters the module name fibo there. Using the module name you can access the functions:
```py
>>> fibo.fib(1000)
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
>>> fibo.fib2(100)
[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
>>> fibo.__name__
'fibo'
```



```py
from fibo import fib, fib2
fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
```
- This does not introduce the module name from which the imports are taken in the local symbol table (so in the example, fibo is not defined).

```py
from fibo import *
fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
```
- This imports all names except those beginning with an underscore (\_). In most cases Python programmers do not use this facility since it introduces an unknown set of names into the interpreter, possibly hiding some things you have already defined.

### Executing modules as scripts
When you run a Python module with

`python fibo.py <arguments>`
the code in the module will be executed, just as if you imported it, but with the __name__ set to "__main__". That means that by adding this code at the end of your module:

```py
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
```
you can make the file usable as a script as well as an importable module, because the code that parses the command line only runs if the module is executed as the “main” file:

`$ python fibo.py 50`
1 1 2 3 5 8 13 21 34

If the module is imported, the code is not run:
`import fibo`
This is often used either to provide a convenient user interface to a module, or for testing purposes (running the module as a script executes a test suite).


- The built-in function `dir()` is used to find out which names a module defines. It returns a sorted list of strings:
```py
import fibo
dir(fibo)
#output
['__name__', 'fib', 'fib2']
```

### Packages
- Packages are a way of structuring Python’s module namespace by using “dotted module names”. For example, the module name A.B designates a submodule named B in a package named A.
- The `__init__.py` files are required to make Python treat the directories as containing packages; In the simplest case, __init__.py can just be an empty file, but it can also execute initialization code for the package or set the __all__ variable,


```py
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
```

Users of the package can import individual modules from the package, for example:

`import sound.effects.echo`
This loads the submodule sound.effects.echo. It must be referenced with its full name.

`sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)`
An alternative way of importing the submodule is:

`from sound.effects import echo`
This also loads the submodule echo, and makes it available without its package prefix, so it can be used as follows:

`echo.echofilter(input, output, delay=0.7, atten=4)`
Yet another variation is to import the desired function or variable directly:

`from sound.effects.echo import echofilter`
Again, this loads the submodule echo, but this makes its function echofilter() directly available:

`echofilter(input, output, delay=0.7, atten=4)`


- Note that when using `from package import item`, the item can be either a submodule (or subpackage) of the package, or some other name defined in the package, like a function, class or variable. 
- Contrarily, when using syntax like `import item.subitem.subsubitem`, each item except for the last must be a package; the last item can be a module or a package but can’t be a class or function or variable defined in the previous item.


## Classes
```py
class MyClass:
    i = 123
    def f(self):
        return 'hello world'

x = MyClass()
x.i => 123
x.f() => 'hello world'

class Complex:
    def __init__(self, realpart, imagpart):
        self.r = realpart
        self.i = imagpart
x = Complex(3, 2)
x.r, x.i 
=> (3, 2)
```

### Class and Instance Variables
```py
class Dog:
    kind = 'canine'         # class variable shared by all instances
    def __init__(self, name):
        self.name = name    # instance variable unique to each instance

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.kind                  # shared by all dogs
'canine'
>>> e.kind                  # shared by all dogs
'canine'
>>> d.name                  # unique to d
'Fido'
>>> e.name                  # unique to e
'Buddy'


class Dog:
    tricks = []             # mistaken use of a class variable
    def __init__(self, name):
        self.name = name
    def add_trick(self, trick):
        self.tricks.append(trick)

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.add_trick('roll over')
>>> e.add_trick('play dead')
>>> d.tricks                # unexpectedly shared by all dogs
['roll over', 'play dead']

```

### Inheritance

- Use isinstance() to check an instance’s type: isinstance(obj, int) will be True only if obj.__class__ is int or some class derived from int.
- Use issubclass() to check class inheritance: issubclass(bool, int) is True since bool is a subclass of int. However, issubclass(float, int) is False since float is not a subclass of int.


```py
class DerivedClassName(BaseClassName):
    <statement-1>
    .
    .
    .
    <statement-N>

class DerivedClassName(modname.BaseClassName):
  
class DerivedClassName(Base1, Base2, Base3):
    <statement-1>
    .
    .
    .
    <statement-N>



```


### Control Flow
```py
if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')
    

words = ['cat', 'window', 'food']
for w in words:
    print(w, len(w))
#output:
cat 3
window 6
food 4

for i in range(4):
    print(i)
#output:
0
1
2
3

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
   print(i, a[i])
#output:   
0 Mary
1 had
2 a
3 little
4 lamb

for n in range(2, 10):
   for x in range(2, n):
       if n % x == 0:
           print(n, 'equals', x, '*', n//x)
           break
   else:
       # loop fell through without finding a factor
       print(n, 'is a prime number')
2 is a prime number
3 is a prime number
4 equals 2 * 2
5 is a prime number
6 equals 2 * 3
7 is a prime number
8 equals 2 * 4

def fib(n):    # write Fibonacci series up to n
   """Print a Fibonacci series up to n."""
   a, b = 0, 1
   while a < n:
       print(a, end=' ')
       a, b = b, a+b
   print()
```

## Coding Style
- Use 4-space indentation, and no tabs.
  4 spaces are a good compromise between small indentation (allows greater nesting depth) and large indentation (easier to read). Tabs introduce confusion, and are best left out.

- Wrap lines so that they don’t exceed 79 characters.

- This helps users with small displays and makes it possible to have several code files side-by-side on larger displays.

- Use blank lines to separate functions and classes, and larger blocks of code inside functions.

- When possible, put comments on a line of their own.

- Use docstrings.

- Use spaces around operators and after commas, but not directly inside bracketing constructs: a = f(1, 2) + g(3, 4).

- Name your classes and functions consistently; the convention is to use CamelCase for classes and lower_case_with_underscores for functions and methods. Always use self as the name for the first method argument (see A First Look at Classes for more on classes and methods).

- Don’t use fancy encodings if your code is meant to be used in international environments. Python’s default, UTF-8, or even plain ASCII work best in any case.

- Likewise, don’t use non-ASCII characters in identifiers if there is only the slightest chance people speaking a different language will read or maintain the code.



### method 
copy()
deepcopy()

