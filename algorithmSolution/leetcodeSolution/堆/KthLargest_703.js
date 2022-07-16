/**
 * leetcode 703 数据流中的第K大元素
 * 简单
 * https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/
 * 
 * 解法1:维护一个倒序的数组，然后取第k个即可
 * 解法2:用小顶堆（优先队列）实现，java有内置api
 *
 */

/**
 * 解法1
 * 
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    // 对nums倒序排序
    this.minHeap = nums.sort((a, b) => b - a);
    this.k = k;
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    // 找到要插入值的位置进行插入
    let pos = this.minHeap.length;
    for (let i = 0; i < this.minHeap.length; i++) {
        if (val >= this.minHeap[i]) {
           pos = i;
           break;
        }
    }
    this.minHeap.splice(pos, 0, val);
    return this.minHeap[this.k-1];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */