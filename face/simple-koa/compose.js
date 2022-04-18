/**
 * 洋葱模型的实现：
 * 实际上可以理解为特定的递归调用，普通的递归函数中每一轮调用的函数体是自身，而洋葱模型中调用的函数是 next ，也就是注册的下一个中间件
 * use 注册中间件：生成中间件数组
 * compose 将中间件数组转换为中间件函数：将数组下一位 fn(i+1) 中间件作为参数传入，返回当前中间件 fn(i) 函数，实现中间件数组按序递归调用
 */

const middleware = []

/**
 * 生成中间件数组
 */
function use(mw) {
    middleware.push(mw);
}

/**
 * 将中间件数组转为中间件函数
 * 中间件函数：通过 next 调用下一层的递归函数
 */
function compose(middleware) {
    return (ctx, next) => {
        return dispatch(0);
        /**
         * dispatch 函数递归调用，入参有 next 
         */
        function dispatch(i) {
            const fn = middleware[i];
            if (!fn) return;
            return fn(ctx, dispatch.bind(null, i + 1));
        }
    }
}

/**
 * test
 */
use(async function (ctx, next) {
    console.log("next前，第一个中间件")
    await next()
    console.log("next后，第一个中间件")
});
use(async function (ctx, next) {
    console.log("next前，第二个中间件")
    await next()
    console.log("next后，第二个中间件")
});
use(async function (ctx, next) {
    console.log("第三个中间件，没有next了")
});

const fn = compose(middleware);

fn();