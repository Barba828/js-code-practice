/**
 * @Promise PromiseA+ https://promisesaplus.com/
 */

// 首先定义三种状态为三个常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 定义一个promise类
class Promise {
    // 该构造函数接收一个执行器(函数executor)，executor需要在实例化的时候立即执行。
    constructor(executor) {
        this.state = PENDING // 默认状态为待定
        this.value = undefined // 成功的返回值
        this.reason = undefined // 失败的原因

        this.onResolvedCallbacks = [] // 成功的回调函数集合
        this.onRejectedCallbacks = [] // 失败的回调函数集合

        let resolve = (val) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = val
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = (error) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = error
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        //then的两个参数如果不是函数则需要将其转为函数形式
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }

        let newPromise
        return (newPromise = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        //第一个then返回的值中叫做x，我们用函数resolvePromise来判断x
                        let x = onFulfilled(this.value)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(newPromise, x, resolve, reject)

                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        }))
    }
}

/**
 * 2.3. Promise 处理程序
 * Promise Resolution Procedure
 * @param {*} promise2 newPromise
 * @param {*} x value
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError("循环引用"));
    }
    if (x instanceof Promise) {
        if (x.state === PENDING) {
            x.then(
                (y) => {
                    resolvePromise(promise2, y, resolve, reject);
                },
                (reason) => {
                    reject(reason);
                }
            );
        } else {
            x.then(resolve, reject);
        }
    } else if (x && (typeof x === "function" || typeof x === "object")) {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === "function") {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

// const promiseA = promise.then((value) => {
//     return { value }
// })

// const promiseB = new Promise((resolve, reject) => {
//     resolve({ value })
// });

promise.then(value => {
    console.log(value);
    return {
        value: 3,
        then: () => {
            console.log('asdsad');
        }
    }
}).then(value => {
    console.log(value);
})
