# es6

### let const

```
{
    let a = 1; //功能类似于var,但所声明的变量只在所在的代码块内有效。并不会发生“变量提升”现象
    var b = 2;
}
console.log(a) // a is not defined
console.log(b) //2

const PI = 3.1415; //声明一个只读的常量，其值不可改变
PI = 3; //严格模式下报错：TypeError : "PI" is read-only。常规模式下不报错，但重新赋值无效。
```

const 的作用域 和 let 命令相同，只在所声明的块级作用域内有效。

### 变量的结构赋值
按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

#### 1数组解构
before：为变量赋值只能直接指定
```
var a = 1;
var b = 2;
var c = 3;
```
after：
```
var [a,b,b] = [1,2,3];
```
情况一：解构不成功，变量的值等于undefined。（值少于变量名）
```
var [foo] = [];
var [foo,bar] = [1];
```
情况二：不完全解构，即等号左边的模式，只匹配一部分等号右边的数组。(值多余变量名)
```
let [a,y] = [1,2,3];
```
情况三：等号右边不是数组（不是可遍历的解构），会报错。
```
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

##### 默认值
解构赋值允许指定默认值
```
var [foo = true] = []
foo // true
```

#### 2对象解构
```
var {foo,bar} = {foo:'aaa',bar:'bbb'}
foo //'aaa'
bar //'bbb'
```
对象的解构和数组与一个重要的不同。数组的元素是按顺序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名。

#### 3字符串解构赋值
```
const [a,b,c,d,e] = 'hello';
a //'h'
b //'e'
c //'l'
d //'l'
e //'o'
```

#### 4数值和布尔值的解构赋值
解构赋值时，如果等号右边是数值或布尔值时，则会先转为对象。
```
let {toString :s} = 123;
s === Number.prototype.toString // true

let {toString :s} = true;
s === Boolean.prototype.toSting //true
```

#### 5函数参数的解构赋值
```
function add([x,y]){
    return x + y;
}
add([1,2]); //3

//函数在传入参数的一刻 数组的参数别解构为变量x,y let [x,y] = [1,2]
```

### 解构的通途
- 交换变量的值
```
[x,y] = [y,x]
```
- 从函数返回多个值
```
//返回一个数组
function example(){
    return [1,2,3];
};
var [a,b,c] = example();

//返回一个对象
function example(){
    return {
        foo:1,
        bar:2
    };
};
var {foo,bar} = example
```
- 函数参数的定义
    解构赋值可以很方便的将一组参数和变量名对应起来。
```
//有次序的参数
function f([x,y,z]){...}
f([1,2,3]);

//无次序的参数
function f(x,y,z){...}
f({z:3,y:2,x:1})
```
