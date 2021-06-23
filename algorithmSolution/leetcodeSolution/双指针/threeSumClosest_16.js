/**
 * leetcode 16 接近的三数之和
 * 
 * 排序 + 双指针
 * https://leetcode-cn.com/problems/3sum-closest/
 * 
 * 解法有点类似 第15题目(3数之和)
 * 
 * 空间复杂度O(logN) 排序
 * 时间复杂度O(n^2)
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    // 先排序
    nums = nums.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });

    let n = nums.length;
    let result = Number.MAX_SAFE_INTEGER; // 和（最小差值的和）

    for (let i = 0; i < n; i++) {
        // 和前一个数相同，跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let second = i + 1;
        let third = n - 1;
        while (second < third) {
            const sum = nums[i] + nums[second] + nums[third];
            // 相等即最小差值
            if (sum === target) {
                return sum;
            }

            // 判断是否是最小差值的和
            const cur = Math.abs(sum - target);
            const pre = Math.abs(result - target);
            if (cur < pre) {
                result = sum; // 赋予3数之和sum，而非cur
            }

            // 向前移动第3个指针
            if (sum > target) {
                let third1 = third - 1;
                // 移动到前一个不相等的元素
                while (third1 > second && nums[third1] === nums[third]) {
                    third1--;
                }
                third = third1;
                // 向后移动第2个指针
            } else {
                let second1 = second + 1;
                // 移动到下一个不相等的元素
                while (second1 < third && nums[second1] === nums[second]) {
                    second1++;
                }
                second = second1;
            }
        }

    }
    return result;
};
