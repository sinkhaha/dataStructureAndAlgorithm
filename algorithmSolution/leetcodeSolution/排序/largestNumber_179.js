/**
 * 179. 最大数
 * 
 * 给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。
 * 
 * 
 * 比较 ab 与 ba的大小，按降序排列，再将数组转化为字符串
 * 
 * 
 * 时间复杂度：O(nlgn)
 * 空间复杂度：O(n)
 * 
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    nums.sort((a, b) => {
        let result1 = `${a}${b}`;
        let result2 = `${b}${a}`;
        return result2 - result1;
    });

    return nums[0] ? nums.join('') : '0';
};