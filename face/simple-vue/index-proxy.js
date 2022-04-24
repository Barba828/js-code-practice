/**
 * 发布订阅模式实现双向数据流 By Proxy
 * @github https://github.com/xiaomuzhu/proxy-vue
 */
const Vue = (function () {
    /**
     * [subs description] 订阅器：储存订阅者，通知订阅者
     * @type {Map}
     */
    class Dep {
        constructor() {
            // hash 储存订阅者
            this.subs = new Map();
        }
        // 添加订阅者
        addSub(key, sub) {
            // 取出键为 key 的订阅者
            const currentSub = this.subs.get(key);
            // 如果能取出说明有相同的 key 的订阅者已经存在,直接添加
            if (currentSub) {
                currentSub.add(sub);
            } else {
                // 用 Set 数据结构储存,保证唯一值
                this.subs.set(key, new Set([sub]));
            }
        }
        // 通知
        notify(key) {
            // 触发键为 key 的订阅者们
            if (this.subs.get(key)) {
                this.subs.get(key).forEach(sub => {
                    sub.update();
                });
            }
        }
    }

    /**
     * [Observer description] 监听器：监听对象，触发后通知订阅
     * @param {[type]}   obj [description] 需要被监听的对象
     */
    const Observer = obj => {
        const dep = new Dep();
        return new Proxy(obj, {
            get: function (target, key, receiver) {
                // 如果订阅者存在，直接添加订阅
                if (Dep.target) {
                    dep.addSub(key, Dep.target);
                }
                return Reflect.get(target, key, receiver);
            },
            set: function (target, key, value, receiver) {
                // 如果对象值没有变,那么不触发下面的操作直接返回    
                if (Reflect.get(receiver, key) === value) {
                    return;
                }
                const res = Reflect.set(target, key, observify(value), receiver);
                // 当值被触发更改的时候,触发 Dep 的通知方法
                dep.notify(key);
                return res;
            },
        });
    };
    /**
     * 将对象转为监听对象
     * @param {*} obj 要监听的对象
     */
    function observify(value) {
        if (!value || typeof value !== 'object') {
            return value;
        }

        // 深度监听
        Object.keys(value).forEach(key => {
            value[key] = observify(value[key]);
        });

        return Observer(value);
    }

    /**
     * [Watcher description] 订阅者：加入订阅器订阅，订阅内容发生变化时更新
     */
    class Watcher {
        constructor(vm, expOrFn, cb) {
            this.vm = vm; // vm 是 vue 的实例
            this.expOrFn = expOrFn; // 被订阅的数据
            this.cb = cb; // 触发更新后的回调
            this.value = this.get(); // 获取老数据
        }
        get() {
            // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知 dep 收集当前订阅者
            // 1.更新 Dep.target 为当前 Watcher 实例
            Dep.target = this;
            // 2.从vm中获取值，触发观察者 get 方法，使用当前 Dep.target
            let value;
            if (typeof this.expOrFn === 'function') {
                value = this.expOrFn.call(this.vm);
            } else if (typeof this.expOrFn === 'string') {
                value = this.vm[this.expOrFn];
            }
            // 3.清除 Dep.target ，用于下一个Watcher使用
            Dep.target = null;
            return value;
        }
        // 将订阅者放入待更新队列等待批量更新
        update() {
            pushQueue(this);
        }
        // 触发真正的更新操作
        run() {
            const val = this.get(); // 获取新数据
            this.cb.call(this.vm, val, this.value);
            this.value = val;
        }
    }

    // 创建异步更新队列
    let queue = new Set()
    // 用Promise模拟nextTick
    function nextTick(cb) {
        Promise.resolve().then(cb)
    }
    // 执行刷新队列
    function flushQueue(args) {
        queue.forEach(watcher => {
            watcher.run()
        })
        // 清空
        queue = new Set()
    }
    // 添加到队列
    function pushQueue(watcher) {
        queue.add(watcher)
        // 下一个循环调用
        nextTick(flushQueue)
    }

    class Vue {
        constructor(options = {}) {
            // 简化了$options的处理
            this.$options = options;
            this.$watch = this._watch;
            this._initVM();
            this._initData(options.data);
            return this._vm;
        }
        // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
        _watch(expOrFn, cb) {
            new Watcher(this, expOrFn, cb);
        }
        // 深度监听 data 对象
        _initData(data) {
            this._data = observify(data());
        }
        // 将_vm与data绑定，对this进行代理
        _initVM() {
            const { _config } = this;
            this._vm = new Proxy(this, {
                get: (target, key, receiver) => {
                    if (Object.keys(this).includes(key)) return this[key];
                    if (Object.keys(this._data).includes(key)) return this._data[key];
                    // 如果是获取computed中的计算属性，那就要重新计算，获取data中数据，将dom订阅，关联了computed和dom
                    // return _config.computed[key].call(target._vm);
                },
                set: (target, key, value, receiver) => {
                    if (!this[key]) {
                        return Reflect.set(this._data, key, value);
                    }
                    return Reflect.set(target, key, value);
                },
            });
        }
    }

    return Vue;
})()

let demo = new Vue({
    data: () => ({
        text: '',
        person: {
            name: 'jobs',
            age: 42,
            gender: 'male'
        },
        room: {
            title: 'steve'
        }
    }),
    computed: {
        change() {
            return 2;
        },
        click() {
            return 3;
        },
    },
});

const p = document.getElementById('p');
const input = document.getElementById('input');

input.addEventListener('keyup', function (e) {
    demo.text = e.target.value;
    demo.person.name = e.target.value + '-name';
    demo.room = {
        title: e.target.value + '-title'
    }
});

demo.$watch('text', str => p.innerHTML = str);
demo.$watch('room', room => console.log(room.title));
demo.$watch(function () { return this.person.name }, name => console.log(name));

console.log('this is simple-proxy-vue');