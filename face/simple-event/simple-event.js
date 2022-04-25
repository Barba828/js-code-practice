class EventEmitter {
    constructor() {
        this._events = this._events || new Map(); // 储存事件/回调键值对
    }

    emit = function (type, ...args) {
        // 从储存事件键值对的this._events中获取对应事件回调函数
        const handler = this._events.get(type);
        handler.forEach(fn => {
            fn.apply(this, args);
        })
        return true;
    };

    addListener = function (type, fn) {
        // 将type事件以及对应的fn函数放入this._events中储存
        if (!this._events.has(type)) {
            this._events.set(type, [fn]);
        } else {
            this._events.get(type).push(fn);
        }
    };

    removeListener = function (type, fn) {
        // 删除type事件中的fn函数
        if (this._events.has(type)) {
            const handlers = this._events.get(type);
            const index = handlers.indexOf(fn);
            if (index > -1) {
                handlers.splice(index, 1);
            }
            if (handlers.length === 0) {
                this._events.delete(type);
            }
        }
    }
}

// 实例化
const emitter = new EventEmitter();

const handleExpel = man => {
    console.log(`expel ${man}`);
}
// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('arson', handleExpel);
emitter.removeListener('arson', handleExpel);
emitter.addListener('arson', man => {
    console.log(`kill ${man}`);
});

// 我们触发arson事件,发现回调成功执行
emitter.emit('arson', 'low-end'); // expel low-end
