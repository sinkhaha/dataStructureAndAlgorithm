/**
 * leetcode 300 最长上升子序列
 * 中等
 * 
 * 题目:
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度
 * 
 * 例子:
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4 
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4
 */

/**
 * 
 * 解法一：动态规划
 * dp数组：以nums[i]的值结尾的最长子序列的长度 (即从头到第i个元素的最长序列长度)
 * 
 * 根据dp数组的定义，所求的最终结果（子序列的最大长度）就是 dp 数组中的最大值
 * 
 * 
 * (1)选择:选择dp[j](j<i,nums[j]<nums[i])时，此时dp[i]都最大长度
 * 
 * (2)状态:dp[i]的值即最大长度改变
 * 状态转移方程为：dp[i]=max(dp[j])+1,其中0≤j<i且num[j]<num[i]
 *
 * (3)base case: dp数组的每一项初始值都值都为1, 因为子序列最少要包含自己，所以长度最小为 1
 * 
 * 
 * 时间复杂度O(n^2)
 * 空间复杂度O(n)
 * 
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS1 = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }

    // 初始化为1，因为最短的子序列包含自己，即1
    let dp = Array(n).fill(1);
    // 选择
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // 因为求的是递增子序列，所以前面的数nums[j]必须小于nums[i]才算递增子序列，才可以计算最大值
            // 加1为在nums[j]的最长递增子序列dp[j]基础上加上当前元素nums[i]所得的最长递增子序列
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    // 此时dp数组的元素为i下标对应的最长子序列长度，遍历找出dp数组的最大元素即可
    let maxRestult = 0;
    for (let i = 0; i < n; i++) {
        maxRestult = Math.max(maxRestult, dp[i]);
    }
    return maxRestult;
};

const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS1(nums)); // 4


/**
 * 二分查找法
 * 
 * 时间复杂度O(NlogN)
 * 空间复杂度O(N)
 * 
 * @param {*} nums 
 */
var lengthOfLIS2 = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }

    let top = Array(n).fill(0);

    let piles = 0; // 堆数
    for (let i = 0; i < n; i++) {
        // 当前值
        let poker = nums[i];

        let left = 0;
        let right = piles;

        while (left < right) {
            let mid = Math.floor((right+left)/2);
            if (top[mid] > poker) {
                right = mid; 
            } else if (top[mid] < poker) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        console.log(top);

        // 没找到合适的堆，新建一个
        if (left === piles) {
            piles++;
        }
        // 把当前值放入该堆
        top[left] = poker;
    }

    // 新进来的数小于top最后一个有值的数，则替换，大于则拼在后面，最后top前面的元素即为最长上升子序列
    // [ 2, 3, 7, 18, 0, 0, 0, 0 ]
    console.log('top==', top);
    return piles;
}

console.log(lengthOfLIS2(nums)); // 4
