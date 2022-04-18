// call
Function.prototype.MyCall = function (context) {
    if (typeof this !== "function") {
        throw new Error('type error')
    }
    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }

    // 使用Symbol 来确定唯一
    const fnSym = Symbol()

    //模拟对象的this指向
    context[fnSym] = this

    // 获取参数
    const args = [...arguments].slice(1)

    //绑定参数 并执行函数
    const result = context[fnSym](...args)

    //清除定义的this
    delete context[fnSym]

    // 返回结果 
    return result
}


// call 如果能明白的话 apply其实就是改一下参数的问题
// apply
Function.prototype.MyApply = function (context) {
    if (typeof this !== "function") {
        throw new Error('type error')
    }

    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }


    // 使用Symbol 来确定唯一
    const fnSym = Symbol()
    //模拟对象的this指向
    context[fnSym] = this

    // 获取参数
    const args = [...arguments][1]

    //绑定参数 并执行函数 由于apply 传入的是一个数组 所以需要解构
    const result = arguments.length > 1 ? context[fnSym](...args) : context[fnSym]()

    //清除定义的this
    delete context[fnSym]

    // 返回结果  //清除定义的this
    return result
}

// bind
Function.prototype.MyBind = function (context) {
    if (typeof this !== "function") {
        throw new Error('type error')
    }

    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }

    //模拟对象的this指向
    const self = this

    // 获取参数
    const args = [...arguments].slice(1)

    // 最后返回一个函数 并绑定 this 要考虑到使用new去调用，并且bind是可以传参的
    return function Fn(...newFnArgs) {
        if (this instanceof Fn) {
            return new self(...args, ...newFnArgs)
        }
        return self.apply(context, [...args, ...newFnArgs])
    }
}


function func(a, b, c) {
    console.log(this.name, a, b, c)
}

const obj = {
    name: 'barba'
}

func.call(obj, 1, 2, 3)
func.apply(obj, [1, 2, 3])
func.bind(obj, 1, 2, 3)()

func.MyCall(obj, 1, 2, 3)
func.MyApply(obj, [1, 2, 3])
func.MyBind(obj, 1, 2, 3)()