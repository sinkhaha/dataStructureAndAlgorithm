/**
 * 414. 第三大的数
 * 简单
 * 
 * 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。
 *
 * 1. 数组先去重
 * 2. 升序排序
 * 3. 若数组长度大于等于3返回数组第3位；否则返回数组第1位
 *
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    var arr = [...new Set(nums)].sort((a, b) => b - a);
    return arr.length >=3 ? arr[2] : arr[0]
};



