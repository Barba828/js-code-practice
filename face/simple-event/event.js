/**
 * event.js
 * @github https://github.com/browserify/events
 */
class EventEmitter {
    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    static defaultMaxListeners = 10;
    _events = undefined;
    _eventsCount = 0;
    _maxListeners = undefined;

    constructor() {
        this.init();
    }

    init() {
        if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || undefined;
    }

    /**
     * 设置最大监听数
     * @param {number} n 
     * @returns 
     */
    setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
        }
        this._maxListeners = n;
        return this;
    };

    /**
     * 获取最大监听数
     * @returns 
     */
    getMaxListeners() {
        return _getMaxListeners(this);
    }

    /**
     * 广播事件emit
     * @returns 
     */
    emit() {
        const [type, ...args] = arguments;
        const events = this._events;
        const handler = events[type];

        let doError = (type === 'error');

        if (events !== undefined)
            doError = (doError && events.error === undefined);
        else if (!doError)
            return false;

        // If there is no 'error' event listener then throw.
        if (doError) {
            let er;
            if (args.length > 0)
                er = args[0];
            if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            let err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
            err.context = er;
            throw err; // Unhandled 'error' event
        }

        if (handler === undefined)
            return false;

        if (typeof handler === 'function') {
            Reflect.apply(handler, this, args);
        } else {
            const listeners = [...handler]
            listeners.forEach(listener => {
                Reflect.apply(listener, this, args);
            })
        }

        return true;
    }

    /**
     * 新增类型为 type 的监听事件，若已存在监听则添加到原有监听事件后面
     * @param {string} type 
     * @param {function} listener 
     * @returns 
     */
    addListener(type, listener) {
        return _addListener(this, type, listener, false);
    };

    /**
     * 新增类型为 type 的监听事件，若已存在监听则添加到原有监听事件之前
     * @param {string} type 
     * @param {function} listener 
     * @returns 
     */
    prependListener(type, listener) {
        return _addListener(this, type, listener, true);
    };

    on = this.addListener

    /**
     * 新增类型为 type 的监听事件，且只执行一次即销毁
     * @param {string} type 
     * @param {function} listener 
     * @returns 
     */
    once(type, listener) {
        this.on(type, _onceWrap(this, type, listener));
        return this;
    };

    prependOnceListener(type, listener) {
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
    };

    /**
     * 移除类型为 type 的某监听事件
     * @param {string} type 
     * @param {function} listener 
     * @returns 
     */
    removeListener(type, listener) {
        let list, events, position;

        checkListener(listener);

        events = this._events;
        if (events === undefined)
            return this;

        list = events[type];
        if (list === undefined)
            return this;

        if (list === listener || list.listener === listener) {
            // 若 list 是一个函数，则直接删除
            if (--this._eventsCount === 0)
                this._events = Object.create(null);
            else {
                delete events[type];
                if (events.removeListener) {
                    // 自身触发的监听事件2: removeListener 事件
                    this.emit('removeListener', type, list.listener || listener);
                }
            }
        } else if (typeof list !== 'function') {
            position = list.findIndex(item => item === listener || item.listener === listener);

            if (position < 0)
                return this;

            list.splice(position, 1)

            // 若当前 list 监听数为 1 ，则由函数数组退化为函数
            if (list.length === 1)
                events[type] = list[0];

            // 自身触发的监听事件2: removeListener 事件
            if (events.removeListener !== undefined)
                this.emit('removeListener', type, list[position] || listener);
        }

        return this;
    };

    off = this.removeListener;

    /**
     * 移除类型为 type 的全部监听事件，若 type 为空，则全部移除
     * @param {*} type 
     * @returns 
     */
    removeAllListeners(type) {
        let listeners, events, i;

        events = this._events;
        if (events === undefined)
            return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
            if (arguments.length === 0) {
                // 移除全部监听
                this._events = Object.create(null);
                this._eventsCount = 0;
            } else if (events[type] !== undefined) {
                // 移除 type 类型的监听
                if (--this._eventsCount === 0)
                    this._events = Object.create(null);
                else
                    delete events[type];
            }
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            let keys = Object.keys(events);
            let key;
            for (i = 0; i < keys.length; ++i) {
                key = keys[i];
                if (key === 'removeListener') continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
                this.removeListener(type, listeners[i]);
            }
        }

        return this;
    };

    listeners(type) {
        return _listeners(this, type, true);
    };

    rawListeners(type) {
        return _listeners(this, type, false);
    };

    listenerCount(type) {
        return _listenerCount(type)
    }

    static listenerCount = function (emitter, type) {
        if (typeof emitter.listenerCount === 'function') {
            return emitter.listenerCount(type);
        } else {
            return _listenerCount.call(emitter, type);
        }
    };

    eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
}

function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}

function _addListener(target, type, listener, prepend) {
    let m; // 事件监听的最大长度 _maxListeners
    let events; // 事件监听的集合 _events
    let existing; // 当前事件监听 _events[type]

    checkListener(listener);

    events = target._events;
    if (events === undefined) {
        // 若无监听事件，新增空事件对象
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        // 自身触发的监听事件1: newListener 事件
        if (events.newListener !== undefined) {
            target.emit('newListener', type,
                listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }

    // 加入监听，若原来无监听，则直接定义监听为listener函数，若已有，则将listener函数加入监听数组
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
                prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }

        // 检测监听数，发出内存溢出警告
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            let w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' ' + String(type) + ' listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            console.warn(w);
        }
    }

    return target;
}

function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
            return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}

function _onceWrap(target, type, listener) {
    const state = { fired: false, wrapFn: undefined, target, type, listener };
    const wrapped = onceWrapper.bind(state); // 将 listener 函数转化为只执行一次就 remove 的 onceWrapped 函数
    wrapped.listener = listener; // remove 时判断声明时原 listener 函数指针
    state.wrapFn = wrapped; // remove 时实际移除的函数
    return wrapped;
}

/**
 * @param {*} unwrap 是否展开
 * @returns 
 */
function _listeners(target, type, unwrap) {
    let events = target._events;

    if (events === undefined)
        return [];

    let evlistener = events[type];
    if (evlistener === undefined)
        return [];

    if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ? evlistener.map(item => item.listener || item) : [...evlistener]
}

function _listenerCount(type) {
    let events = this._events;

    if (events !== undefined) {
        let evlistener = events[type];

        if (typeof evlistener === 'function') {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }

    return 0;
}

function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}

/**
 * 监听 emitter 执行一次事件后的 Promise
 * @param {*} emitter 
 * @param {*} name 
 * @returns 
 */
function once(emitter, name) {
    return new Promise(function (resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }

        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        };

        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
    });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        } else {
            emitter.on(name, listener);
        }
    } else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}

/** ---------------test----------------- */

// 实例化
const emitter = new EventEmitter();

const handleExpel = man => {
    console.log(`expel ${man}`);
}
emitter.addListener('arson', handleExpel);
emitter.once('arson', handleExpel);

once(emitter, 'arson').then(res => {
    console.log('once promise ' + res);
})

// 我们触发arson事件,发现回调成功执行
emitter.emit('arson', 'first');
emitter.emit('arson', 'second');
emitter.emit('arson', 'third');

console.log(emitter.rawListeners('arson'));
console.log(emitter.eventNames());

