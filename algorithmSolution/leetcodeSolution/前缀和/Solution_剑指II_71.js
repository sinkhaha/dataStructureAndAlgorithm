/**
 * 剑指 Offer II 071. 按权重生成随机数
 * 中等
 * https://leetcode.cn/problems/cuyjEf/
 * 
 * 解法：前缀和 + 二分查找
 *
 */
var Solution = function (w) {
    // 前缀和数组
    this.pre = new Array(w.length).fill(0);
    this.pre[0] = w[0];
    for (let i = 1; i < w.length; ++i) {
        this.pre[i] = this.pre[i - 1] + w[i];
    }

    this.total = _.sum(w);
};

Solution.prototype.pickIndex = function () {
    const x = Math.floor((Math.random() * this.total)) + 1;

    const binarySearch = (x) => {
        let low = 0;
        let high = this.pre.length - 1;
        while (low < high) {
            const mid = Math.floor((high - low) / 2) + low;

            if (this.pre[mid] < x) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    return binarySearch(x);
};