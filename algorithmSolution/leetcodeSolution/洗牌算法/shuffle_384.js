/**
 * leetcode 384 打乱数组
 * 中等
 * 
 * 洗牌算法：产生的结果必须有 n! 种可能
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 */
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums;
};

/**
 * 获取原数组
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums;
};

/**
 * 打乱数组
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const nums = this.nums.slice(0);
    let n = nums.length;

    // 产生的结果有 n! 种可能
    for (let i = 0; i < n; i++) {
        // 从 i 到 n-1 随机选一个
        const rand = randOne(i, n - 1); 
        // 交换nums数组i和rand下标的两个元素
        [ nums[i], nums[rand] ] = [ nums[rand], nums[i] ];
    }

    return nums;
};

// 得到一个在闭区间 [n, m] 内的随机整数
function randOne(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
};

const nums = ['Solution', 'shuffle', 'reset', 'shuffle'];
 var obj = new Solution(nums);
 var param_1 = obj.reset();
 var param_2 = obj.shuffle();
 console.log(param_1);
 console.log(param_2);


 