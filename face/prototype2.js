/**
 * 需在浏览器环境中运行
 */
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}
function getName() {
    console.log(5)
}

Foo.getName();          // 2 静态方法
getName();              // 4 js预编译会变量提升，function 提升优先级比 变量提升 优先级高
//   所以 function getName() 会被提升到顶部，再在执行中被 var getName 修改
Foo().getName()         // 1 返回 this 其实是 window ，并且在 Foo 里修改了 this.getName
getName();              // 1 getName被 Foo 修改了
new Foo.getName();      // 2 使用 new 操作符调用函数时，this 指向实例，而不是构造函数，但这里实际上还是静态方法
new Foo().getName();    // 3 同上，但是这里执行的实力原型链上的方法
new new Foo().getName() // 3 同上，new 原型链上的 getName 并没有返回值

/* ---------------- */
function Foo() {
    Foo.a = function () {
        console.log(1);
    };
    this.a = function () {
        console.log(2);
    };
}
Foo.prototype.a = function () {
    console.log(4);
};
Function.prototype.a = function () {
    console.log(3);
};

Foo.a(); // 3 Foo本身没有该静态方法，原型链向上查找
let obj = new Foo(); // 执行了 Foo 构造函数
obj.a(); // 2 构造函数修改了原型链方法
Foo.a(); // 1 Foo本身有该静态方法，不会去原型链上查找
