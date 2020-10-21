/**
 * 338 比特位计数
 * 
 * 中等
 */
/**
 * 利用：
 * n中1的个数 = (n & n-1)中1的个数 + 1
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

