/**
 * 剑指 Offer II 011. 0 和 1 个数相同的子数组
 * 中等
 * https://leetcode.cn/problems/A1NYOS/
 * 
 * 解法：哈希表 + 前缀和 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    // 0和1数量相同，等价于 1的数量减去0的数量等于0，可以把数组的0全部变成-1，这样问题就转化为“求最长的连续子数组，其元素和为0”

    // 参考官方题解 时间O(n) 空间O(n)
    let map = new Map(); // key是某个前缀和，value是该前缀和第一次出现时的下标
    map.set(0, -1); // 空时前缀和是0，出现的下标用-1表示

    let counter = 0; // 存储前缀和

    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        // 计算前缀和
        if (nums[i] == 1) {
            counter++;
        } else {
            counter--;
        }

        if (map.has(counter)) { // 说明从index + 1 到 i 有相同数量的0和1。因为[0, index]的前缀和sum1跟[0, i]的前缀和sum2是相等的，所以sum2-sum1的值为0，即可推出[index + 1, i]区间的和是0，所以此区间有相同数量的0和1
            const index = map.get(counter);
            result = Math.max(result, i - index);
        } else {
            map.set(counter, i); // 把当前前缀和 和 下标存入map中
        }
    }

    return result;
};