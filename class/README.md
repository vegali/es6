#class

## 1.Class基本语法
Javascript的传统方法是通过构造函数定义并生成对象。
```
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