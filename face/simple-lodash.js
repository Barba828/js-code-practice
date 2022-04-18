const isObj = (val) => typeof val === "object" && val !== null;

/**
 * 深度拷贝，递归复制，使用 in 关键字获取对象的属性
 */
function deepClone(obj) {
    // 通过 instanceof 去判断你要拷贝的变量它是否是数组（如果不是数组则对象）。

    // 1. 准备你想返回的变量（新地址）。
    const newObj = obj instanceof Array ? [] : {}; // 核心代码。

    // 2. 做拷贝；简单数据类型只需要赋值，如果遇到复杂数据类型就再次进入进行深拷贝，直到所找到的数据为简单数据类型为止。
    for (const key in obj) {
        const item = obj[key];
        newObj[key] = isObj(item) ? deepClone(item) : item;
    }

    // 3. 返回拷贝的变量。
    return newObj;
}

/**
 * 深度拷贝2
 * 利用ES6特性，增加弱应用的 weakMap 传递递归的上下文，Reflect.ownKeys() 获取对象的所有属性包括 Symbol
 */
function deepClone2(obj, wMap = new WeakMap()) {
    if (isObj(obj)) {
        // 判断是对象还是数组
        let target = Array.isArray(obj) ? [] : {};

        // 如果存在这个就直接返回
        if (wMap.has(obj)) {
            return wMap.get(obj);
        }

        wMap.set(obj, target);

        // 遍历对象
        Reflect.ownKeys(obj).forEach((key) => {
            // 拿到数据后判断是复杂数据还是简单数据 如果是复杂数据类型就继续递归调用
            const item = obj[key];
            target[key] = isObj(item) ? deepClone2(item, wMap) : item;
        });

        return target;
    } else {
        return obj;
    }
}
var testObject = { [Symbol('1')]: 1, a: 2 };
Object.defineProperty(testObject, 'myMethod', {
    value: function () {
        alert("Non enumerable property");
    },
    enumerable: false
});

var copyedObject = deepClone(testObject);
var copyedObject2 = deepClone2(testObject);

// console.log(copyedObject);
// console.log(copyedObject2);

/**
 * 数组扁平化
 * @param {Array} arr 
 * @param {Number} deep 深度
 * @returns 
 */
const flat = function (arr, deep = 1) {
    const result = []

    arr.forEach(item => {
        if (Array.isArray(item)) {
            if (deep > 0) {
                result.push(...flat(item, deep - 1))
            } else {
                result.push(item)
            }
        } else {
            result.push(item)
        }
    })

    return result
}

console.log(flat([1, 2, [3, 4, [5, 6]], 7, 8]));


