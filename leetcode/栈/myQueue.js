/**
 * leetcode 232 用两个栈实现队列
 * 简单
 */
/**
 * 用两个栈实现队列
 * js没有栈只能用数组模拟
 * 
 * 思路：一个存数据的栈，一个是在pop和peek时的辅助栈
 */
class MyQueue {
    constructor() {
        this.pushStack = [];
        this.popStack = [];  
    }

    /**
     * 将一个元素放入队列的尾部
     */
    push(x) {
        this.pushStack.push(x);
    }

    /**
     * 从队列首部移除元素
     * 
     * 时间复杂度O(n)
     * 空间复杂度O(1)
     */
    pop() {
        while(this.pushStack.length) {
            this.popStack.push(this.pushStack.pop());
        }
        const pop = this.popStack.pop();
        while(this.popStack.length) {
            this.pushStack.push(this.popStack.pop())
        }
        return pop;
    }

    /**
     * 返回队列首部的元素
     */
    peek() {
        while(this.pushStack.length) {
            this.popStack.push(this.pushStack.pop());
        }
        const peek = this.popStack[this.popStack.length - 1];
        while(this.popStack.length) {
            this.pushStack.push(this.popStack.pop())
        }
        return peek;
    }

    /**
     * 返回队列是否为空
     */
    empty() {
        return this.pushStack.length === 0;
    }
}

const queue = new MyQueue();
queue.push(1);
queue.push(2); 
console.log(queue.peek()); // 返回 1
console.log(queue.pop());   // 返回 1
console.log(queue.empty()); // 返回 false