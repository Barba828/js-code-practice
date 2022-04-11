/**
 * 观察者模式 模版代码
 */
class Subject {

    constructor() {
        this.observerList = [];
    }

    addObserver(observer) {
        this.observerList.push(observer);
    }

    removeObserver(observer) {
        const index = this.observerList.findIndex(o => o.name === observer.name);
        this.observerList.splice(index, 1);
    }

    notifyObservers(message) {
        const observers = this.observerList;
        observers.forEach(observer => observer.notified(message));
    }

}

class Observer {

    constructor(name, subject) {
        this.name = name;
        if (subject) {
            subject.addObserver(this);
        }
    }

    notified(message) {
        console.log(this.name, 'got message', message);
    }

}

function main() {
    const subject = new Subject();
    const observerA = new Observer('observerA', subject);
    const observerB = new Observer('observerB', subject);
    subject.notifyObservers(`Hello from subject at ${new Date()}`);
    console.log('------------------------')

    setTimeout(() => {
        const observerC = new Observer('observerC');
        const observerD = new Observer('observerD');
        subject.addObserver(observerC);
        subject.addObserver(observerD);
        subject.notifyObservers(`Hello from subject at ${new Date()}`);
        console.log('------------------------')
    }, 1000)

    setTimeout(() => {
        subject.removeObserver(observerA);
        subject.notifyObservers(`Hello from subject at ${new Date()}`);
        console.log('------------------------')
    }, 2000)
}

main();

  // observerA got message Hello from subject at Fri Jun 25 2021 16:25:09 GMT+0800 (GMT+08:00)
  // observerB got message Hello from subject at Fri Jun 25 2021 16:25:09 GMT+0800 (GMT+08:00)
  // ------------------------
  // observerA got message Hello from subject at Fri Jun 25 2021 16:25:10 GMT+0800 (GMT+08:00)
  // observerB got message Hello from subject at Fri Jun 25 2021 16:25:10 GMT+0800 (GMT+08:00)
  // observerC got message Hello from subject at Fri Jun 25 2021 16:25:10 GMT+0800 (GMT+08:00)
  // observerD got message Hello from subject at Fri Jun 25 2021 16:25:10 GMT+0800 (GMT+08:00)
  // ------------------------
  // observerB got message Hello from subject at Fri Jun 25 2021 16:25:11 GMT+0800 (GMT+08:00)
  // observerC got message Hello from subject at Fri Jun 25 2021 16:25:11 GMT+0800 (GMT+08:00)
  // observerD got message Hello from subject at Fri Jun 25 2021 16:25:11 GMT+0800 (GMT+08:00)
  // ------------------------
