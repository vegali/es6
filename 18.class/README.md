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
类和模块的内部，默认就是采用严格模式，所以不需要使用 `use strice` 指定运算模式。只要你的代码写在类或模块之中，就只有严格模式可用。
考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。
