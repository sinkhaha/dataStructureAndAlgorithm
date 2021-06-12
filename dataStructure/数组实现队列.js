// 数组实现队列
class MyQueue {
    constructor() {
        this.array = [];
    }
    // 入队
    enQueue(element) {
        this.array.push(element);
        return element;
    }
    // 出队
    deQueue() {
        return this.array.shift();
    }
    // 是否为空
    isEmpty() {
        return this.array.length === 0;
    }
    // 获取第一个元素
    getFirst() {
        return this.array[0];
    }
    // 获取最后一个元素
    getLast() {
        return this.array[this.array.length - 1];
    }
    // 输出数据
    getDatas() {
        let queueString = '';
        for (let i = 0; i < this.array.length; i++) {
            queueString += this.array[i] + ' ';
        }
        return queueString;
    }
}

const myQueue = new MyQueue();
myQueue.enQueue('3');
myQueue.enQueue('6');
myQueue.enQueue('7');
myQueue.enQueue('5');
console.log(myQueue.getDatas());
myQueue.deQueue('6');
console.log(myQueue.getDatas());
console.log(myQueue.isEmpty());
console.log(myQueue.getFirst());
console.log(myQueue.getLast());
