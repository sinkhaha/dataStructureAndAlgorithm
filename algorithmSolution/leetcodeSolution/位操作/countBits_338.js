/**
 * 338 比特位计数
 * 
 * 中等
 * https://leetcode-cn.com/problems/counting-bits/
 */
/**
 * 利用：
 * n中1的个数 = (n & n-1)中1的个数 + 1
 * 
 * 1. dp[i]数组表示：数字 i 的1的个数
 * 2. 转移方程：dp[i] = dp[i & (i - 1)] + 1
 * 
 * i & (i - 1)实现的是去除二进制 i 的最后一个1，该数一定比 i 小
 * 因此dp数组里一定已经计算过 i & (i - 1) 的1的个数
 * 再加上去掉的这个1
 * 只要是大于0的数至少有一个1，等式一定成立
 * 
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    let result = new Array(num + 1);
    result[0] = 0;
    for (let i = 1; i < num + 1; i++) {
        // n中1的个数 = (n & n-1)中1的个数 + 1
        // 例如 6中1的个数 = 4中1的个数 + 1
        result[i] = result[i & (i - 1)] + 1
    }
    return result;
};

const num = 2;
console.log(countBits(num)); // [0,1,1]

