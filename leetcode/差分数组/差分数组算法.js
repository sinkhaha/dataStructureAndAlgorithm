const { SSL_OP_NO_SSLv2 } = require("constants");

/**
 * 差分值算法类
 * 
 * 差分数组的主要适用场景是频繁对原始数组的某个区间的元素进行增减
 * 
 * 差分数组 和 前缀和 思想非常类似
 * 
 * leetcode 1109题用到该算法
 */
class Difference {
    /**
     * 构造方法构造nums的差分值数组
     * @param {*} nums 
     */
    constructor(nums) {
        this.diff = []; // 差分数组
        // 构造nums的差分数组
        this.diff[0] = nums[0];
        for (let i = 1; i < nums.length; i++) {
            // 当前i元素为nums当前i元素和前一元素之差
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }

    /**
     * 获取构造出的差分值数组
     */
    getDiff() {
        return this.diff;
    }

    /**
     * 利用差分值数组给原数组闭区间nums[i, j]增加 val值(可以是负数)
     * 用途：构造差分数组diff，可以快速进行区间增减的操作
     * 
     * 例如：
     * 回想通过diff反推nums的过程，如果想对区间nums[i..j]的元素全部加 3，
     * 那么只需要让diff[i] += 3（表示nums[i..]所有的元素都加了 3），
     * 然后再让diff[j+1] -= 3（表示nums[j+1..]所有元素再减 3）即可，
     * 综合起来，就是对nums[i..j]中的所有元素都加 3
     * 
     * @param {*} i 
     * @param {*} j 
     * @param {*} val 
     */
    increment(i, j, val) {
        this.diff[i] += val;
        // 说明是对nums[i]及以后的整个数组都进行修改，那么就不需要再给diff数组减val了
        if (j + 1 < this.diff.length) {
           this.diff[j+1] -= val;
        }
    }

    /**
     * 通过差分值数组反推得到原数组
     */
    getOriginArrFromDiff() {
        let res = [];
        // 根据差分数组构造结果数组
        res[0] = this.diff[0];
        for (let i = 1; i < this.diff.length; i++) {
            res[i] = res[i - 1] + this.diff[i];
        }
        return res;
    }
}

const nums = [8, 5, 9, 6, 1];
const difference = new Difference(nums);
console.log(`${nums} 的差分值数组是：${difference.getDiff()}`); // [8, -3, 4, -3, -5]
const originNums = difference.getOriginArrFromDiff(nums);
console.log(`原数组是${originNums}`);

// 给差分值数组第1和第2个元素的值加上2
difference.increment(1, 2, 2);
console.log(difference.getDiff()); // [ 8, -1, 4, -5, -5 ]

/**============================================= */
/**
 * leetcode 1109 航班预订统计
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * 
 * 示例:
 * 输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
 * 输出：[10,55,45,25,25]
 * @param {number[][]} bookings
 * @param {number} n 数组的长度为n
 * @return {number[]}
 */
var corpFlightBookings1 = function(bookings, n) {
    // nums实例化n为元素且初始化为全 0，不能用 new Array(n)，不然是undefined
    const nums = Array(n).fill(0);
    const difference = new Difference(nums);

    console.log(`difference=${JSON.stringify(difference)}`);

    for (let booking of bookings) { // 如[1, 2, 20]
        // 注意转成数组索引要减一
        let i = booking[0] - 1;
        let j = booking[1] - 1;
        let val = booking[2];
        // 对区间 nums[i..j] 增加 val
        difference.increment(i, j, val);
    }

    // 返回最终的结果数组
    return difference.getOriginArrFromDiff();
};

const bookings = [[1,2,10], [2,3,20], [2,5,25]];
const n = 5;
console.log('解法一结果是：', corpFlightBookings1(bookings, n)); // [ 10, 55, 45, 25, 25 ]

/**=================================================================== */

/**
 * 解法二：
 * 参考题解，其实解法和解法一思路一样
 * @param {*} bookings 
 * @param {*} n 
 */
var corpFlightBookings2 = function(bookings, n) {
    // 类似差分数组
    const counters = Array(n).fill(0);

    // 利用差分值数组给原数组闭区间nums[i, j]增加 val值
    for (let booking of bookings) {
        counters[booking[0] - 1] += booking[2];
        if (booking[1] < n) {
            counters[booking[1]] -= booking[2];
        }
    }

    // 通过差分值数组反推得到原数组
    for (let i = 1; i < n; i++) {
        counters[i] += counters[i - 1];
    }
    return counters;
}

const bookings2 = [[1,2,10], [2,3,20], [2,5,25]];
const n2 = 5;
console.log('解法二结果是：', corpFlightBookings2(bookings2, n2)); // [ 10, 55, 45, 25, 25 ]
