// 数组实现栈
class Stack {
    constructor() {
        this.array = [];
    }
    // 入栈 时间复杂度都是 O(1) 空间复杂度是 O(1)
    push(element) {
        this.array.push(element);
        return element;
    }
    // 出栈 时间复杂度都是 O(1) 空间复杂度是 O(1)
    pop() {
        return this.array.pop();  
    }
    // 是否为空
    isEmpty() {
        return this.array.length === 0;
    }
    // 获取大小
    getSize() {
        return this.array.length;
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

const stack = new Stack();
stack.push('5');
stack.push('4');
stack.push('6');
stack.push('7');
console.log(stack.getDatas());

console.log(stack.pop());
console.log(stack.getDatas());
