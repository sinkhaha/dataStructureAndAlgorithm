
// 链表实现循环队列
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class CircularQueue {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    /**
     * 入队
     * @param {*} value 
     */
    enqueue(value) {
        if (this.head === null) {
            this.head = new Node(value);
            this.head.next = this.head;
            this.tail = this.head;
        } else {
            const flag = this.head === this.tail;
            this.tail.next = new Node(value);
            // 末尾节点指向头节点
            this.tail.next.next = this.head;
            // 尾指针移动
            this.tail = this.tail.next;
            if (flag) {
                this.head.next = this.tail;
            }
        }
    }
    /**
     * 出队, 因为先进先出，所以队头指针需要向下一位移动
     * @returns 
     */
    dequeue() {
        if (this.head == null) return -1;

        if (this.head === this.tail) { // 只有一个元素
            const value = this.head.element;
            this.head = null;
            return value;
        } else {
            const value = this.head.element;
            this.head = this.head.next; // 头指针向前移动
            this.tail.next = this.head;
            return value;
        }
    }

    display() {
        let res = 0;
        console.log('-------获取queue队列的元素------');
        while (res !== -1) {
            res = this.dequeue();
            console.log(res);
        }
    }
}

// 测试
const newCircularQueue = new CircularQueue();
// 插入元素
newCircularQueue.enqueue(1);
newCircularQueue.enqueue(2);
newCircularQueue.enqueue(3);
// 获取元素
newCircularQueue.display();
newCircularQueue.enqueue(1);
newCircularQueue.display();
