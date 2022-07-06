/**
 * 155. 最小栈
 * 中等
 * https://leetcode.cn/problems/min-stack/
 * 
 * 解法：栈
 */
/**
 * 
 */
var MinStack = function () {
    this.stack = [];
    this.minStack = [Infinity]; // 存栈已有数值的最小值
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.stack.push(val);
    const premin = this.minStack[this.minStack.length - 1];
    // 入栈后，计算当前栈中的最小值curmin
    const curmin = Math.min(premin, val);
    this.minStack.push(curmin);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.stack.pop();
    this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */