/**
 * leetcode 69 x 的平方根
 * 
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去
 * 
 * 简单
 */
/**
 * 利用二分查找思路
 *
 * 时间复杂度：O(logx)，即为二分查找需要的次数
 * 空间复杂度：O(1)
 * 
 * @param {*} x 
 */
function mySqrt(x) {
    let low = 0;
    let high = x;
    let result = -1;

    while (low <= high) {
        const middle = Math.floor(low + (high - low) / 2);

        if (middle * middle <= x) {
            result = middle;
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }

    return result;
}

console.log(mySqrt(9));
