#lass

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
