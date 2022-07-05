/**
 * 剑指 Offer 59 - II. 队列的最大值
 * 中等
 * https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/
 * 
 * 解法：队列
 * 
 * 有点类似题目 https://leetcode.cn/problems/min-stack/submissions/
 */
var MaxQueue = function () {
    this.queue = [];
    this.helperQueue = []; // 辅助队列，单调递减，存queue队列每次加入一个元素后的最大值的递减值
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    if (this.helperQueue.length == 0) {
        return -1;
    }

    return this.helperQueue[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    this.queue.push(value);

    while (this.helperQueue.length && this.helperQueue[this.helperQueue.length - 1] < value) {
        this.helperQueue.pop();
    }

    this.helperQueue.push(value);

};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    if (this.queue.length == 0) {
        return -1;
    }

    const result = this.queue.shift();

    // 当前队列queue的最大值出队了，那辅助队列的最大值也得出队，此时辅助队列的第2大值就是队列的最大值了
    if (this.helperQueue.length && this.helperQueue[0] == result) {
        this.helperQueue.shift();
    }

    return result;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */