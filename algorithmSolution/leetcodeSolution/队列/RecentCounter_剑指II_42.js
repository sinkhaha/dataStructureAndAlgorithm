/**
 * 剑指 Offer II 042. 最近请求次数
 * 简单
 * https://leetcode.cn/problems/H8086Q/
 * 
 * 解法：队列
 */
/**
 * 
 */
var RecentCounter = function () {
    // 队列 
    this.queue = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    // 因为每次请求的时间都比之前的大，所以队列从头到尾是单调递增的
    this.queue.push(t);

    // 从队首弹出早于 t-3000 的时间的请求
    while (this.queue[0] < t - 3000) {
        this.queue.shift();
    }

    return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */