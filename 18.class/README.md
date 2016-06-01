#Class
------------------------------
## 1.Class基本语法
Javascript的传统方法是通过构造函数定义并生成对象。
```Javascript
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    return '(' this.x + ',' + this.y ')'
}
```

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模版。通过``class``关键字，可以定义类。ES6的``class``可以看做只是一个语法糖，他的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。通过ES6的上面的例子可以改为：
```Javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    
    toString(){
        return '(' this.x + ',' this.y ')';
    }
}
```
上面的代码定义了一个“类”，可以看到里面有一个``constructor``方法，这就是构造方法，而 ``this`` 关键字则代表实例对象。也就是说，ES5的构造函数 ``Point`` 对应ES6的 ``Point``类的构造方法。

Point类除了构造方法，还定义了一个 ``toString`` 方法。注意，定义“类”方法的时候，前面不需要加 ``function`` 关键字，直接把函数定义放进去就可以了。另外，方法之间不需要加逗号分隔。

ES6的类，完全可以看做构造函数的另一种写法。
```Javascript
class Point{

}
typeof Point // "function"
Point === Point.prototype.constructor // true
```
上面的代码表明，类的数据类型就是函数，类本身就指向构造函数。
构造函数的`prototype`属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。
```Javascript
class Point{
    constructor(){
        //
    }
    toString(){
        //
    }
    toValue(){
        //
    }
}
//同等于
Point.prototype = {
    toSting(){},
    toValue(){}
}
```
在类的实例上面调用方法，其实就是调用原型上的方法。
```Javascript
class B{}
let b = new B();
b.constructor === B.prototype.constructor // true
```
上面的代码中，`b`是`B`类的实例，它的constructor方法就是`B`类原型的 `constructor` 方法。

由于类的方法都定义在 `prototype` 对象上，所以类的新方法都可以定义在 `prototype` 对象上面。 `Object.assign` 方法可以很方便的一次向类添加多个方法。
```Javascript
class Point{
    constructor(){
        //...
    }
}
Object.assign(Point.prototype,{
    toSting(){}
    toValue(){}
})
```
`prototype` 对象的 `constructor` 属性，直接指向“类”的本身，这与ES5的行为是一致的。
```Javascript
Point.prototype.constructor === Point; //true
```
另外，类的内部所有定义的方法，都是不可枚举的。
```Javascript
class Point{
    constructor(x,y){
        //...
    }
    toString(){
        //...
    }
}
Object.keys(Point.prototype); //[] (Object.keys()返回对象自身所有可枚举的属性键名)
Object.getOwnPropertyNames(Point.prototype); //["constructor","toString"] (Object.getOwnPropertyNames()返回一个数组，包含对象自身的所有属性)
```
上面的代码中， ``toString`` 方法是 ``Point`` 类内部定义的方法，它是不可枚举的。这一点与ES5不一致。
```Javascript
function Point(x,y){
    //...
}
Point.prototype.toString = function(){
    //...
}
Object.keys(Point.prototype); // ["toString"]
Object.getOwnPropertyNames(Point.prototype); //["constructor","toString"]
```
上面的代码采用ES5的写法，`toString` 方法就是可以枚举的。
类的属性名，也可以采用表达式。
```Javascript
let methodName = "getArea";
class Square{
    constructor(length){
        //...    
    }
    [methodName](){
        //...
    }
}
```
上面的代码中，Square类的方法名 getArea 就是从表达式中获得的。

------------------------------
### constructor 方法

`constructor` 方法是类的默认方法，通过 `new` 命令生成对象实例时，自动调用该方法。一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。
`constructor` 方法默认返回实例对象（既this）,完全可以指定返回另一个对象。
```Javascript
class FooP{
    constructor(){
        return Object.create(null);
    }
}
new Foo() instanceof Foo //false;
```
上例代码中，`constructor` 函数返回一个全新的对象，结果导致实例对象不是`Foo`类的实例。

------------------------------
### 类的实例对象
生成类的实例方法，与ES5完全一样，也是使用 `new` 命令。如果忘记加上`new`，像函数那样调用`Class`,将会报错。
与ES5一样，实例的属性除非显示的定义在其本身，否则定义在原型上。
```Javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y
    }
    toString(){
        return '(' + this.x + this.y + ')';
    }
}

var p = new Point(2,3);

p.toString(); // (2,3)
p.hasOwnProperty('x'); //true
p.hasOwnProperty('y'); //true
p.hasOwnProperty('toString'); //false
p.__proto__.hasOwnProperty('toString') //true
```
上面的代码中， `x` 和 'y' 都是实例对象 'p' 的自身属性（因为定义在 `this` 变量上），所以 `hasOwnProperty` 方法返回 `true`，而 'toString' 是原型对象的属性（因为定义在 `Point` 的类上），所以返回 `false` 。这都与ES5一致。

与ES5一样，类的所有实例共享一个原型对象。
```Javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__; //true
```
上面的代码中， `p1` 和 `p2` 都是 `Point` 的实例，它们的原型都是Point，所以__proto__属性是相等的。
这也意味着，可以通过实例的__proto__属性为Class添加方法。
```JavaScript
p1.__proto__printName = function(){ return 'Oops' };

p1.printName(); //Oops
p2.printName(); //Oops

var p3 = new Point(4,2);
p3.printName(); //Oops
```
上面的代码在 `p1` 的原型上添加了一个 `printName` 的方法，由于 `p1` 的原型就是 `p2` 的原型，因此 `p2` 也可以调用这个方法。而且，伺候新建的实例也都拥有这个方法。

------------------------------
### name属性
由于本质上，ES6的Class只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括 `name` 属性。
```Javascript
class Point{}
Point.name // 'Point'
```
`name` 的属性总是返回紧跟在 `class` 关键字后面的类名。

------------------------------
### Class表达式
与函数一样，Class也可以使用表达式的形式定义。
```Javascript
const MyClass = class Me{
    getClassName(){
        return Me.name;
    }
}
```
上面的代码中定义了一个类。需要注意的是，这个类的名字是 `MyClass` ,`name` 是 `Me` ， `Me`只在Class的内部代码可用，指当前类。
```Javascript
let inst = new MyClass();
inst.getClassName(); // Me
Me.name //Me is not defined
```
上面的代码表示，`Me` 只在 Class 内部有定义。
如果Class内部没有用到的话，可以省略 `Me`,也就可以写成以下形式。
```Javascript
const MyClass = class{ //... }
```
采用Class表达式，可以写出立即执行的Class。
```JavaScript
let Person = new class{
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}('李四');
Person.sayName(); // 张三
```
上面的代码中，Person是一个立即执行的Class的实例。

------------------------------
### 不存在变量升迁
Class不存在变量提升（hoist）,这一点与ES5完全不同。
```Javascript
new Foo();// ReferenceError
class Foo{}
```
上面的代码中 `Foo` 类使用在前，定义在后，这样会报错，因为ES6不会把变量声明提前到代码头部。这种规定的原因与下面提到的继承有关，必须保证子类在父类之后定义。
```Javascript
{
    let Foo = class{};
    class Bar extends Foo{
        //...
    }
}
```
上面的代码不会报错，因为 `class` 继承 `Foo` 的时候， `Foo` 已经定义了。但是，如果存在Class的提升，上面的代码就会报错，因为 `class` 会被提升到代码头部。而 'let' 命令也是不提升的。所以导致 `class` 继承 `Foo` 的时候，`Foo` 还没有定义。

------------------------------
### 严格模式
类和模块的内部，默认就是采用严格模式，所以不需要使用 `use strict` 指定运算模式。只要你的代码写在类或模块之中，就只有严格模式可用。
考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

______________________________
## 2.Class的继承
------------------------------
### 基本用法

Class之间可以通过 `extends` 关键字实现继承，这比ES5通过修改原型链实现继承要清晰和方便的多。
```Javascript
class ColorPoint extends Point{}
```
上面的代码定义了一个 `ColorPoint` 类，通过关键字 `extends` 继承了 `Point` 类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样。下面我们在 `ColorPoint` 类里加上代码。
```Javascript
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y); //调用父类的 constructor(x,y)
        this.color = color;
    }
    toString(){
        return this.color + ' ' + super.toString(); //调用父类的 toString()
    }
}
```
上面的代码中，`constructor` 方法和 `toString` 方法中，都出现了 `super` 关键字，它在这里标示父类的构造函数，用来新建父类的 `this` 对象。
子类必须在 `constructor` 中调用 `super` 方法，否则新建的实例会报错。这是因为子类没有自己的 `this` 对象，二是继承父类的 `this` 对象，然后对其加工。如果不调用 `super` 方法，子类就得不到`this`对象。
```Javascript
class ColorPoint extends Point{
    constructor(){
        //...
    }
}

var cp = new ColorPoint();  //referenceError
```
子类的构造函数中没有调用 `super` 方法，导致新建实例是报错。

ES5的继承，实质上是先创造了子类的实例对象 `this` 然后再将父类的方法添加到 `this` 上面。ES6的继承机制完全不同，实质上是先创造父类的实例对象 `this` ，所以必须先调用 `super` 方法。然后再用子类的构造函数修改 `this`。
如果子类没有定义 `constructor` 方法，这个方法被默认添加，
```Javascript
constructor(...args){
    super(...args)
}
```
另一个需要注意的地方，在子类的构造函数中，只有调用了 `super` 之后，才可以使用 `this` 关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例的加工，只有`super`方法才能返回父类实例。
```Javascript
class colorPoint extends Point{
    constructor(x,y,color){
        this.color = color; //ReferenceError
        super(x,y);
        this.color = color; //正确
    }
}
```
上面的代码中，子类的 `constructor` 方法在没有调用 `super` 之前，就使用 `this` 关键字，结果报错，而放在 `super` 关键字后就是正确的。
下面是生成子类实例额的代码。
```javascript
let co = new ColorPoint(25,8,'green');
cp instanceof ColorPint // true
cp instanceof Point // true
```
上面的代码中，实例对象 `cp` 同时是 `ColorPoint` 和 'Point' 两个类的实例，这与ES5的行为完全一致。

-----------------------
### 类的prototype属性和__proto__属性
大多数浏览器的ES5实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 `prototype` 属性。 Class 作为构造函数的语法糖，同时有prototype属性和 `__proto__` 属性，因此可以同事存在两条继承链。
 - 子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
 - 子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。
```javascript
class A{}
class B extends A {}
B.__proto__ === A //true
B.prototype.__proto__ === A.prototype //true
```
上面的代码中，子类`B`的`__proto__`的属性指向父类 `A`，子类`B`的`prototype`属性的`__proto__`属性指向父类的`prototype`属性。
这样的结果是因为，类的继承是按照下面的模式实现的。
```Javascript
class A{}
class B{}

//B的实例继承A的实例
Object.setPrototypeOf(B.prototype,A.prototype);

//B继承A的静态属性
Object.setPrototypeOf(B,A)
```
《对象的扩展》一章给出过 `Object.setPrototypeOf`方法的实现。
```Javascript
Object.setPrototypeOf = function(ob,proto){
    obj.__proto__ = proto;
    return obj;
}
```
因此就得到了上面的结果
```javascript
Object.setPrototypeOf(B.prototype,A.prototype);
//等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B,A);
//等同于
B.__proto__ = A
```
两条继承两可以这样理解：作为一个对象，子类 （`B`）的原型（`__proto__`属性）是父类（`A`）；作为一个构造函数，子类（`B`）的原型（`prototype`属性）是父类的实例。

-------------------
### Extends 的继承目标
`extends` 关键字后面可以跟多种类型的值。
```javascript
class B extends A{}
```
上面的代码 `A`，只要是一个有 `prototype` 属性的函数，就能被 `B` 继承。由于函数都有`prototype`属性，因此 `A` 可以是任意函数。

下面讨论三种特殊情况。
第一种，子类继承 Object 类。
```javascript
class A extends Object{}

A.__proto__ = Object // true
A.prototype.__proto__ = Object.prototype
```
这种情况下，`A`其实就是构造函数`Object`的赋值，`A`的实例就是`Object`的实例。

第二种特殊情况，不存在任何继承。
```JavaScript
class A{}
A.__proto__ == Function.prototype // true
A.prototype.__ptoto__ === Object.prototype //true
```
这种情况下，A作为一个基类（及不粗在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。但是，A调用后返回一个空对象（即Object实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。

第三种情况，子类继承`null`。
```JavaScript
class C extends null{}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```
这种情况与第二种情况非常像。`A`也是一个普通函数，所以直接继承了`Function.prototype`。但是，A 调用后返回的独享不继承任何方法，所以它的`__proto__`指向`Function.prototype`,实质上执行了下面的代码。
```JavaScript
class C extends null {
    constructor(){
        return Object.create(null);
    }
}
```

-------------------
###Object.getPrototypeOf()
`Object.getPrototype`方法可以用来从子类上获取父类。
```JavaScript
Object.getPrototypeOf(ColorPoint) === Point //true
```
因此可以用这个方法判断一个类是否继承了另一个类。

---------------------
### super 关键字
`super`这个关键字，有两种用法，含义不同。
 1、作为函数调用时（`super(...args)`）；`super`代表父类的构造函数。
 2、作为对象调用时（`super.prop`或`super.method()`），`super`代表父类。注意，此时的`super`即可以引用父类实例的属性和方法，也可以引用父类的静态方法。
```JavaScript
class B extends A{
    get m(){
        return this._p * super._p;
    }
    set m(){
        throw new Error('该属性只读');
    }
}
```
上面的代码中，子类通过 `super` 关键字，调用父类实例的 `_p` 属性。
由于，对象总是继承其他对象的，所以可以在任意对象中使用`super`关键字。
```javascript
var obj = {
    toString(){
        return "MyObject:" + super.toString();
    }
};

obj.toString();
```

-----------------
### 实例的 `__proto__` 属性
子类实例的 `__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类原型的原型，就是父类的原型。
```javascript
var p1 = new Point(x,y);
par p2 = new ColorPoint(x,y,'red')

p2.__proto__.__proto__ === p1.__proto__ //true
```
因此可用用子类实例的`__proto__.__proto__`的属性，可以修改父类实例的行为。
```JavaScript
p2.__proto__.__proto__.printName = function(){
    console.log('ha');
}
p1.printName(); //'ha'
```

_______________________
## 3.原生构造函数的继承
ES6之前，原生构造函数是无法继承的，比如不能自己定义一个`Array`的子类。
```JavaScript
function MyArray(){
    Array.apply(this,arguments);
}
MyArray.prototype = Object.create(Array.prototype,{
        constructor : {
            value : MyArray
        }
    }
)
```
上面的代码定义了一个继承`Array`的`MyArray`类，但是这个类的行为与`Array`完全不一致。
```javascript
var colors = new MyArray();
colors[0] = 'red';
colors.length // 0
colors[0] // 'red'
```
之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 `Array.apply()` 或者分配原型对象都不行。ES5是先新建子类的实例对象 `this`，在讲父类的属性添加到子类上，由于父类的内部属性无啊获取，导致无法继承原生的构造函数。
ES6孕育继承原生构造函数定义子类，因为ES6是先新建父类的实例对象 `this` ，然后在用子类的构造函数修饰 `this`，是的父类的所有行为都可以继承。
```JavaScript
class MyArray extends Array{
    constructor(...args){
        super(...args);
    }
}
var colors = new MyArray();
colors[0] = 'red';
colors.length; // 1
colors.length = 0;
colors[0] //undefined
```
这以为着ES6可以自定义原生数据结构的子类，这是ES5无法做到的。

______________________
## 4.Class的取值函数（getter）和存值函数（setter）
与ES5一样，在Class内部可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```JavaScript
class MyClass{
    constructor(){
    
    }
    get prop(){
        return 'getter';
    }
    set prop(){
        console.log('setter:' + value)
    }
}
let inst = new MyClass();
inst.prop = 123;
inst.prop // 'getter'
```
上面的代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

----------------------------
## 5.Class 的 Generator方法
如果某个方法前加上 （`*`）,就代表该方法是一个Generator函数。
```JavaScript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```
上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

_____________________
## 6.Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```JavaScript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: undefined is not a function
```
上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

父类的静态方法，可以被子类继承。
```JavaScript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'
```
上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

静态方法也是可以从`super`对象上调用的。
```JavaScript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod(); // "hello , too"
```
_________________________
## 7.Class的静态属性和实例属性
静态属性指的是Class本身的属性，即`Class.propname`，而不是定义在实例对象（`this`）上的属性。
```JavaScript
class Foo{}
Foo.prop = 1;
Foo.prop // 1
```
上面的写法为 `Foo` 类定义了一个静态属性 `prop`；
目前只有这种方法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。
```javascript
//以下两种写法都无效
class Foo{
    prop : 1 //方法1
    static prop : 1 //方法2
}
Foo.prop //undefined
```

ES7有静态属性的提案，在这就不说了。

_________________________
## 8.new.target 属性
`new` 是从构造函数生成实例的命令，ES6为`new`命令引入了一个`new.target`属性，（在构造函数中）返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令调用，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。
```JavaScript
function Person(name){
    if(new.target !== undefined){
        this.name = name;
    }else{
        throw new Error('必须使用new生成实例')；
    }
}
```
__________________________
## 9.Mixin模式的实现
Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。
```JavaScript
function mix(...mixins){
    class Mix{}
    for(let xixin of mixins){
        copyProperties(Mix,xixin);
        copyProperties(Mix.prototype,mixin.prototype)
    }
    return Mix
}

function copyProperties(target,source){
    for(let key of Reflect.ownKeys(source)){
        if(
        
            key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ){
            let desc = Object.getOwnPropertyDescriptor(source,key);
                    Object.defineProperty(target,key,desc);
        }
    }
}
```
上面代码的`mix`函数，可以将多个对象合成一个类。使用的时候只要继承这个类即可。
```JavaScript
class DistributedEdit extends mis(Loggable,Serializable){
    //...
}
```