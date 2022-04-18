function Parent() {
    this.surname = '张';
    this.name = '张三';
    this.like = ['apple', 'banana'];
}

function Child() {
    this.name = '张小三';
    this.age = 13;
}
Parent.prototype.showSurname = function () {
    return this.surname;
}

var par = new Parent()

// 继承实现
Child.prototype = new Parent()
var chi = new Child();
// console.log(chi.showSurname())  // 张
// console.log(chi.__proto__ === Child.prototype)

function Person() {

}
// Person.prototype.name = '张三'



