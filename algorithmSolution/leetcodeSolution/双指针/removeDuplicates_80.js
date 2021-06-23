/**
 * leetcode 80 删除排序数组中的重复项 II
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/
 * 
 * 使得每个元素最多出现两次
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function (nums) {
    let j = 1; // 已经更新后数组的指针

    const n = nums.length;
    if (n <= 1) {
        return n;
    }
    
    // i为遍历指针
    for (let i = 2; i < n; i++) {
        // nums[i] !== nums[j]后一个数跟前一个数不相等，即nums[i]是新的数字
        // nums[i] !== nums[j - 1] 这是允许有一个重复数字,即允许nums[i]等于nums[j-1]；添加nums[i]
        if (nums[i] !== nums[j] || (nums[i] === nums[j] && nums[i] !== nums[j - 1])) {
            // j指针前进，把不相等的值放到j中
            j++;
            nums[j] = nums[i];
        }
        // 相等则不做操作，继续循环移动i遍历指针
    }
    // j是从1开始计数，需要加1
    return j + 1;
}
console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));
