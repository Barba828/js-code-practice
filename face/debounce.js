/**
 * 防抖
 * wait时间之后执行，每次调用都会把前一次的延迟执行清除，然后重新计时
 */
function debounce(func, wait) {
    let timer = null; // 闭包保存标记
    return function () {
        if (timer) {
            // 重复调用，清除定时器
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, wait);
    };
}

/**
 * 节流
 * wait时间内，多次调用也只会执行一次
 */
function throttle(func, wait) {
    let timer = null; // 闭包保存标记
    return function () {
        if (timer) {
            // 重复调用，无效
            return
        }

        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, wait)
    };
}

/**
 * 节流
 * 解决初次调用执行问题，例如 wait 100ms，会在 0 ms和 100 ms 执行两次
 */
function throttle2(func, wait) {
    let lastTime = 0; // 保存上一次调用时间
    let timer = null; // 闭包保存标记

    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        const nowTime = new Date();
        const remainWaitTime = wait - (nowTime - lastTime); // 节流剩余时间

        if (remainWaitTime <= 0) {
            // 初次调用立即执行
            lastTime = nowTime;
            func.apply(this, arguments);
        } else {
            // 多次调用，更新剩余时间 settimeout
            timer = setTimeout(() => {
                lastTime = new Date();
                func.apply(this, arguments);
                timer = null;
            }, remainWaitTime);
        }
    };
}

const test = (a) => {
    console.log(a, '--', Date.now());
}

const thro = throttle2(test, 100)

thro(1)
thro(2)
thro(3)
thro(4)
thro(5)
thro(6)

setTimeout(() => {
    thro(7)
}, 50);
setTimeout(() => {
    thro(8)
}, 100);