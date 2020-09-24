/**
 * leetcode 43 字符串相乘
 *
 * 思路：
 * 有两个指针 i，j 在 num1 和 num2 上遍历，计算乘积，同时将乘积叠加到结果 result 的正确位置
 * 
 * 解题重点：
 * num1[i] 和 num2[j] 的乘积对应的就是 result[i+j] 和 result[i+j+1] 这两个位置
 * 
 * 时间复杂度O(n*m) n和m分别为两个数的长度
 * 空间复杂度O(n+m)
 * 
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    let n1 = num1.length;
    let n2 = num2.length;

    // 结果最多为n1+n2位
    let result = Array(n1+n2).fill(0);

    // 从后往前，即从个位开始相乘
    for (let i = n1 - 1; i >= 0; i--) {
        for (let j = n2 - 1;j >= 0; j--) {
            let mul = (num1[i]-'0') * (num2[j]-'0');

            // 乘积在 result 对应的索引位置 
            let p1 = i + j;
            let p2 = i + j + 1; 

            // 叠加到 result 上 
            let sum = mul + result[p2]; 
            result[p2] = Math.floor(sum % 10);
            result[p1] += Math.floor(sum / 10);
        }
    }
    
    // 转成字符串，去掉前面的0
    return result.join('').replace(/^0*/g, '');
};

const num1 = '123';
const num2 = '456';
console.log(multiply(num1, num2)); // 56088
