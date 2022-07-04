/**
 * 剑指 Offer II 041. 滑动窗口的平均值
 * 简单
 * https://leetcode.cn/problems/qIsx9U/
 * 
 * 解法：队列
 */
/**
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function (size) {
    this.list = [];
    this.cap = size;
    this.sum = 0;
};

/** 
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
    if (this.list.length == this.cap) {
        const delVal = this.list.shift();
        this.sum -= delVal;
    }

    this.list.push(val);
    this.sum += val;
    return this.sum / this.list.length;
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */