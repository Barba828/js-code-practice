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
// var p1 = new Person();
// var p2 = new Person();
// p1.name = '张三';
// console.log(p1.hasOwnProperty('name'), p1.name)  //true
// console.log(p2.hasOwnProperty('name'), p2.name)  //false
// console.log(p1.constructor)

// class Father {
//     constructor(name) {
//         this.name = name
//     }
// }

// var f1 = new Father('张三')
// console.log(f1.constructor)  



