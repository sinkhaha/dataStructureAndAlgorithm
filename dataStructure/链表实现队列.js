// 基于链表实现队列
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class QueueBasedOnLinkedList {
    constructor() {
        // 维护两个指针
        this.head = null;
        this.tail = null;
    }

    /**
     * 入队
     */
    enqueue(value) {
        if (this.head === null) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(value);
            this.tail = this.tail.next;
        }
    }

    /**
     * 出队
     * @returns 
     */
    dequeue() {
        if (this.head === null) {
            return -1;
        }
        const value = this.head.element;
        this.head = this.head.next;
        return value;

    }
}

// 测试
const newQueue = new QueueBasedOnLinkedList();
// 插入元素
newQueue.enqueue(1);
newQueue.enqueue(2);
newQueue.enqueue(3);

// 获取元素
let res = 0;
console.log('-------出队dequeue------');
while (res !== -1) {
    res = newQueue.dequeue();
    console.log(res);
}