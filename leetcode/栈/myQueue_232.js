/**
 * leetcode 232 用两个栈实现队列
 * 简单
 */
/**
 * 用两个栈实现队列
 * js没有栈只能用数组模拟
 * 
 * 解法1:
 * 思路：
 * (1)入列时直接插入数据栈stack
 * (2)出列时，因为先入列的元素在stack栈底，需要先他们弹出依次压入辅助栈helperStack
 * (3)栈底元素弹出pop出队列
 * (4)第2布中辅助栈heplerStack的元素一次弹出，重新压入数据栈stack
 *
 */
class MyQueue {
    constructor() {
        this.stack = [];
        this.helperStack = [];  
    }

    /**
     * 时间O(1)
     * 将一个元素放入队列的尾部
     */
    push(x) {
        this.stack.push(x);
    }

    /**
     * 从队列首部移除元素
     * 
     * 时间复杂度O(n)
     * 空间复杂度O(1)
     */
    pop() {
        while(this.stack.length) {
            this.helperStack.push(this.stack.pop());
        }
        const pop = this.helperStack.pop();
        while(this.helperStack.length) {
            this.stack.push(this.helperStack.pop())
        }
        return pop;
    }

    /**
     * 时间复杂度O(n)
     * 返回队列首部的元素
     */
    peek() {
        while(this.stack.length) {
            this.helperStack.push(this.stack.pop());
        }
        const peek = this.helperStack[this.helperStack.length - 1];
        while(this.helperStack.length) {
            this.stack.push(this.helperStack.pop())
        }
        return peek;
    }

    /**
     * O(1)
     * 返回队列是否为空
     */
    empty() {
        return this.stack.length === 0;
    }
}

const queue = new MyQueue();
queue.push(1);
queue.push(2); 
console.log(queue.peek()); // 返回 1
console.log(queue.pop());   // 返回 1
console.log(queue.empty()); // 返回 false


class MyQueue2 {
    constructor() {
        this.stack = []; // 数组的头部是队尾，数组尾部是队头，队头出队，队尾入队
    }

    /**
     * 时间O(N)
     * 队尾入队，即把元素插入数组头部，不能用已有api:unshift()
     * @param {*} x 
     */
    push(x) {
        const helper = [];
        while(this.stack.length !== 0) {
            helper.push(this.stack.pop());
        }

        this.stack.push(x);
        while(helper.length !== 0) {
            this.stack.push(helper.pop());
        }
    }

    /**
     * 时间O(1)
     */
    peek() {
        return this.stack[this.stack.length - 1];
    }

    /**
     * 时间O(1)
     */
    pop() {
        return this.stack.pop();
    }

    /**
     * 时间O(1)
     */
    empty() {
        return this.stack.length === 0;
    }
}

const queue2 = new MyQueue2();
queue2.push(1);
queue2.push(2); 
console.log(queue2.peek()); // 返回 1
console.log(queue2.pop());   // 返回 1
console.log(queue2.empty()); // 返回 false
