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