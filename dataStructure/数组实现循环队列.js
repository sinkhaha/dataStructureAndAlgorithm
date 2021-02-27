/**
 * 对头指针等于队尾指针(this.head === this.tail)是无法判断当前状态是队空还是队满,因为可能队列都是为空的
 * 为了达到判断队列状态的目的，可以通过牺牲一个存储空间来实现，
 * 队头指针在队尾指针的下一位置时即队满，此时队尾指针指的位置是不存数据的。
 * 当队头和队尾指针在同一位置时，队空。
 * 
 * 难点：（1）队满条件 （2）队空条件 （3）出队入队使用指针维护
 */
class MycircleQueue {
    constructor(len) {
        this.length = len; // 固定大小
        this.queue = new Array(len);
        this.head = -1; // 必须维护指针，不会让队列一直增大
        this.tail = -1;
    }

    // 队列满标识：（队尾下标+1）% 数组长度 = 队头下标  即(tail+1)%n = head
    isFull() {
        return (this.tail + 1) % this.length === this.head;
    }

    // 判断是否为空
    isEmpty() {
        return this.head === -1;
    }

    // 入队（移动尾指针）
    enQueue(element) {
        if (this.isFull())
            throw new Error('队列满了');
        if (this.isEmpty())
            this.head = 0;

        this.tail = (this.tail + 1) % this.length;
        this.queue[this.tail] = element;
        return true;
    }

    // 出队(移动头指针)
    deQueue() {
        if (this.isEmpty())
            throw new Error('队列为空')

        if (this.head === this.tail) { // 队空
            this.head = -1;
            this.tail = -1;
        } else {
            // 改变头指针即可（原来的元素还在的，只要不读取，在入队时把数据覆盖即可）
            this.head = (this.head + 1) % this.length;
        }
        return true;
    }

    // 获取队列第一元素
    getFront() {
        if (this.isEmpty()) throw new Error('队列是空');
        return this.queue[this.head];
    }

    // 获取队列最后一个元素
    getLast() {
        if (this.isEmpty()) throw new Error('队列为空');
        return this.queue[this.tail]; // 最后一个不存值
    }
}

// 固定8个元素
const cirQueue = new MycircleQueue(4);
cirQueue.enQueue('6');
cirQueue.enQueue('7');
cirQueue.enQueue('5');
cirQueue.enQueue('3');
cirQueue.getData();

cirQueue.deQueue();
cirQueue.getData();

cirQueue.enQueue('8');
cirQueue.getData();

// cirQueue.deQueue();
// cirQueue.getData();

// cirQueue.enQueue('10');
// cirQueue.getData();

// cirQueue.deQueue();
// cirQueue.getData();

// cirQueue.enQueue('11');
// cirQueue.getData();

// console.log(cirQueue.getLast());

