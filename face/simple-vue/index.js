/**
 * 发布订阅模式实现双向数据流 By Object.defineProperty
 * 
 * 1. Observer，劫持监听所有属性
 *      get方法 => 新增 watcher 观察者到 dep 发布者的订阅列表subs中
 *      set方法 => dep 发布者通知所有观察者更新
 * 2. Dep，发布者
 *      notify => 通知 watcher 观察者更新
 *      depend => 添加 watcher 观察者到订阅列表subs中
 * 3. Wathcer，订阅者
 *      update => 更新，同时会调用 get 方法新增 watcher 订阅者
 *      addDep => 将新增的 watcher 订阅者添加到 dep 发布者的订阅列表subs中
 */
const Vue = (function () {
    let uid = 0;

    // 发布者，用于储存订阅者并发布消息
    class Dep {
        constructor() {
            // 设置 id，用于区分新 Watcher 和只改变属性值后新产生的 Watcher
            this.id = uid++;
            // 储存订阅者的数组
            this.subs = [];
        }
        // 触发target上的 Watcher 中的 addDep 方法,参数为 dep 的实例本身
        depend() {
            Dep.target.addDep(this);
        }
        // 添加订阅者，sub 即一个 Watcher 实例 
        addSub(sub) {
            this.subs.push(sub);
        }
        notify() {
            // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
            this.subs.forEach(sub => sub.update());
        }
    }
    // 为Dep类设置一个静态属性,默认为null,工作时指向当前的 Watcher 实例
    Dep.target = null;

    // 监听者，监听对象属性值的变化
    class Observer {
        constructor(value) {
            this.value = value;
            this.walk(value);
        }
        // 遍历属性值并监听
        walk(value) {
            Object.keys(value).forEach(key => this.convert(key, value[key]));
        }
        // 执行监听的具体方法
        convert(key, val) {
            defineReactive(this.value, key, val);
        }
    }
    function defineReactive(obj, key, val) {
        // 监听数据新增发布管理员
        // get 时 dep 执行 depend 添加订阅者
        // set 时 dep 执行 notify 通知全部订阅者
        const dep = new Dep();
        // 递归 继续给当前属性的值添加深度监听 deep
        let chlidOb = observe(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                // 如果 Dep 类存在 target 属性（即该属性正在被监听 watch），将其添加到dep实例的subs数组中
                // target 指向一个 Watcher 实例，每个 Watcher 都是一个订阅者
                // Watcher 实例在实例化过程中，会读取 data 中的某个属性，从而触发当前 get 方法
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: newVal => {
                if (val === newVal) return;
                val = newVal;
                // 递归 对新值进行深度监听
                chlidOb = observe(newVal);
                // 通知所有订阅者，数值被改变，Watcher 会直接读取 data 中的值并执行 cb 回调函数
                dep.notify();
            },
        });
    }
    function observe(value) {
        // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
        if (!value || typeof value !== 'object') {
            return;
        }
        return new Observer(value);
    }

    // 订阅者
    class Watcher {
        constructor(vm, expOrFn, cb) {
            this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
            this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
            this.cb = cb; // 当数据更新时想要做的事情
            this.expOrFn = expOrFn; // 被订阅的数据
            this.val = this.get(); // 维护更新之前的数据
        }
        // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
        update() {
            this.run();
        }
        // dep 发布者 Dep 实例，将当前 Watcher 实例添加到 dep 的 subs 数组中
        addDep(dep) {
            // 如果在 depIds 的 hash 中没有当前的 id ，可以判断是新 Watcher ，因此可以添加到 dep 的数组中储存
            // 此判断是避免同 id 的 Watcher 被多次储存
            if (!this.depIds.hasOwnProperty(dep.id)) {
                dep.addSub(this);
                this.depIds[dep.id] = dep;
            }
        }
        run() {
            const val = this.get();
            if (val !== this.val) {
                this.val = val;
                this.cb.call(this.vm, val);
            }
        }
        get() {
            // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
            // 1.更新 Dep.target 为当前 Watcher 实例
            Dep.target = this;
            // 2.从vm中获取值，触发观察者 get 方法，使用当前 Dep.target：dep.depend()方法将该 Watcher 实例添加到订阅者列表(dep.subs)中
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
    }

    class Vue {
        constructor(options = {}) {
            // 简化了$options的处理
            this.$options = options;
            // 简化了对data的处理
            let data = (this._data = this.$options.data);
            // 将所有data最外层属性代理到Vue实例上
            Object.keys(data).forEach(key => this._proxy(key));
            // 监听数据
            observe(data);
        }
        // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
        $watch(expOrFn, cb) {
            new Watcher(this, expOrFn, cb);
        }
        _proxy(key) {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: () => this._data[key],
                set: val => {
                    this._data[key] = val;
                },
            });
        }
    }

    return Vue;
})();

let demo = new Vue({
    data: {
        text: '',
        person: {
            name: 'jobs',
            age: 42,
            gender: 'male'
        },
        room: {
            title: 'steve'
        }
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

console.log('this is simple-vue');