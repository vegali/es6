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

####默认值
解构赋值允许指定默认值
```
var [foo = true] = []
foo // true
```
