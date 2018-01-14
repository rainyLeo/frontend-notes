**Types**
a type is introduced with:

- A type alias declaration (`type sn = number | string;`)
- An interface declaration (`interface I { x: number[]; }`)
- A class declaration (`class C { }`)
- An enum declaration (`enum E { A, B, C }`)
- An `import` declaration which refers to a type

Each of these declaration forms creates a new type name.

**Values**
Values are runtime names that we can reference in expressions. For example `let x = 5`; creates a value called `x`.

Again, being explicit, the following things create values:

- `let`, `const`, and `var` declarations
- A `namespace` or `module` declaration which contains a value
- An `enum` declaration
- A `class` declaration
- An `import` declaration which refers to a value
- A `function` declaration

**Namespaces**
Types can exist in namespaces. For example, if we have the declaration `let x: A.B.C`, we say that the type `C` comes from the `A.B` namespace.
This distinction is subtle and important – here, `A.B` is not necessarily a type or a value.


**Interface**

```ts
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

// Notice we didn’t have to explicitly say that the object we pass to printLabel implements this interface like we might have to in other languages. Here, it’s only the shape that matters.

interface Point {
    color?: string;
    width?: number;
    [propName: string]: any;
    readonly x: number;
    readonly y: number;
}

```

- Class Types

```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
// Interfaces describe the public side of the class, rather than both the public and private side. This prohibits you from using them to check that a class also has particular types for the private side of the class instance.

// When working with classes and interfaces, it helps to keep in mind that a class has two types: the type of the static side and the type of the instance side. You may notice that if you create an interface with a construct signature and try to create a class that implements this interface you get an error:

// This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.

// Instead, you would need to work with the static side of the class directly. In this example, we define two interfaces, `ClockConstructor` for the constructor and `ClockInterface` for the instance methods. Then for convenience we define a constructor function `createClock` that creates instances of the type that is passed to it.
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

let digital = createClock(DigitalClock, 12, 17);

```

- Extending Interfaces
```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```
- Hybrid Types
interfaces can describe the rich types present in real world JavaScript. Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object that works as a combination of some of the types described above.
One such example is an object that acts as both a function and an object, with additional properties:

```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

- Interfaces Extending Classes
When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. This means that when you create an interface that extends a class with private or protected members, that interface type can only be implemented by that class or a subclass of it.

```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}
```

**Class**
- Public, private, and protected modifiers
`Public` by default
When a member is marked `private`, it cannot be accessed from outside of its containing class(实例不能用)
The `protected` modifier acts much like the private modifier with the exception that members declared protected can also be accessed by instances of deriving classes(实例不能用, 子类可以用, 子类实例不能用)
```ts
class Person {
    private department: string;
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

```

- Readonly modifier

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
```

- Parameter properties
Parameter properties let you create and initialize a member in one place

```ts
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```

- Static Properties

- Abstract Classes
Abstract classes are base classes from which other classes may be derived. They may not be instantiated directly. Unlike an interface, an abstract class may contain implementation details for its members. The abstract keyword is used to define abstract classes as well as abstract methods within an abstract class.

```ts
abstract class Department {
    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super() 
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```

- Advanced Techniques
When you declare a class in TypeScript, you are actually creating multiple declarations at the same time. The first is the type of the *instance* of the class.
We’re also creating another value that we call the *constructor function*. 

Another way to think of each class is that there is an *instance* side and a *static* side.

```ts
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

- Using a class as an interface

**Functions**

```ts
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

- Overloads

```ts
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

**Generics**

In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.

```ts
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString");  // type of output will be 'string'
let output = identity("myString"); // type argument inference

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```

- Generic Types

```ts
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- Generic Classes

```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- Generic Constraints

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

- Using Type Parameters in Generic Constraints
You can declare a type parameter that is constrained by another type parameter.

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

- Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example,

```ts
function create<T>(c: {new(): T; }): T {
    return new c();
}

// A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types.

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

```

**enum**

```ts
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)

enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```

**Type Compatibility**

```ts
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

*A Note on Soundness*
TypeScript’s type system allows certain operations that can’t be known at compile-time to be safe. When a type system has this property, it is said to not be “sound”. The places where TypeScript allows unsound behavior were carefully considered, and throughout this document we’ll explain where these happen and the motivating scenarios behind them.

- Starting out
The basic rule for TypeScript’s structural type system is that x is compatible with y if y has at least the same members as x. For example:

```ts
// 1.
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: "Alice", location: "Seattle" };
x = y;

// 2.Comparing two functions
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

- Classes
Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.

- Generics
Because TypeScript is a structural type system, type parameters only affect the resulting type when consumed as part of the type of a member. 

- Subtype vs Assignment
So far, we’ve used ‘compatible’, which is not a term defined in the language spec. In TypeScript, there are two kinds of compatibility: subtype and assignment. These differ only in that assignment extends subtype compatibility with rules to allow assignment to and from `any` and to and from enum with corresponding numeric values.


**Advanced Types*

- Intersection Types

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

- Union Types

```ts
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", 'abc'); 

// If we have a value that has a union type, we can only access members that are common to all types in the union.
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
// If a value has the type A | B, we only know for certain that it has members that both A and B have


let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}
```

- Type Guards and Differentiating Types
A type guard is some expression that performs a runtime check that guarantees the type in some scope. To define a type guard, we simply need to define a function whose return type is a *type predicate*:

```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```
`pet is Fish` is our type predicate in this example. A predicate takes the form `parameterName is Type`, where `parameterName` must be the name of a parameter from the current function signature.

Any time `isFish` is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible.

```ts
// Both calls to 'swim' and 'fly' are now okay.
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

- `typeof` type guards

- `instanceof` type guards

- Nullable types
The `--strictNullChecks` flag fixes this: when you declare a variable, it doesn’t automatically include null or undefined.

```ts
let s = "foo";
s = null; // error, 'null' is not assignable to 'string'
let sn: string | null = "bar";
sn = null; // ok

sn = undefined; // error, 'undefined' is not assignable to 'string | null'
```

With --`strictNullChecks`, an optional parameter automatically adds `| undefined`:


`identifier!` removes `null` and `undefined` from the type of `identifier`:

- Type Aliases
Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.

```ts
// 1.
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
// 2.
type Container<T> = { value: T };
// 3.
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
// 4.
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

// However, it’s not possible for a type alias to appear anywhere else on the right side of the declaration:
type Yikes = Array<Yikes>; // error
```

- Interfaces vs. Type Aliases
One difference is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name
A second more important difference is that type aliases cannot be extended or implemented from (nor can they extend/implement other types).

Because an ideal property of software is being open to extension, you should always use an interface over a type alias if possible.
On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.

- String Literal Types

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

- Numeric Literal Types

- Index types

```ts
// 1.
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]

// 2.
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```
`keyof T`, the index type query operator.
`T[K]`, the indexed access operator

- Mapped types

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```
