/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * 简单
 * https://leetcode.cn/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
 * 
 * 解法：二分查找
 * 
 * 时间 O(logn)
 * 空间 O(1)
 */
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    let low = 0;
    let high = numbers.length - 1;

    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (numbers[mid] < numbers[high]) {
            high = mid;
        } else if (numbers[mid] > numbers[high]) {
            low = mid + 1;
        } else { // 由于重复元素的存在，我们并不能确定 numbers[mid]是在最小值的左侧还是右侧，因为此时numbers[high]和numbers[mid]相等，所以可以把high去掉，无论numbers[high]是不是最小值，它都有一个替代品numbers[mid]
            high -= 1;
        }
    }

    return numbers[low];
};