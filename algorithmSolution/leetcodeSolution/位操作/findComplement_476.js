/**
 * 476 数字的补数
 * 
 * 简单
 * https://leetcode-cn.com/problems/number-complement/
 */
/**
 * 利用左移右移 和 异或
 * 
 * <<左移，乘以2的b次方    >>右移，除以2的b次方
 * 
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
    // num在二进制下右多少位为0
    let count = 0;
    let tmpNum = num;

    while (tmpNum != 0) {
        count += 1;
        tmpNum >>= 1;
    }

    // 异或运算取反
    return num ^ ((1 << count) - 1);
};

const num = 5;
console.log(findComplement(num));
