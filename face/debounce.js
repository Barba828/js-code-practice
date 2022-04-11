function debounce(func, wait) {
    let timer = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, wait);
    };
}

function throttle(func, wait) {
    let lastTime = 0;
    let timer = null;

    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        let nowTime = +new Date();

        const remainWaitTime = wait - (nowTime - lastTime);

        if (remainWaitTime <= 0) {
            lastTime = nowTime;
            func.apply(this, arguments);
        } else {
            timer = setTimeout(function () {
                lastTime = +new Date();
                func.apply(this, arguments);
                timer = null;
            }, remainWaitTime);
        }
    };
}

const test = () => {
    console.log(Date.now());
}

const thro = throttle(test, 100)

thro()
thro()
thro()
thro()
thro()
thro()

setTimeout(() => {
    thro()
}, 50);
setTimeout(() => {
    thro()
}, 100);