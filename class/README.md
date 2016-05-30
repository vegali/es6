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

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模版。通过class关键字，可以定义类。ES6的class可以看做只是一个语法糖，他的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。通过ES6的上面的例子可以改为：
```
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