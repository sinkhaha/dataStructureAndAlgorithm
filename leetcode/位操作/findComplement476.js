/**
 * 476 数字的补数
 * 
 * 简单
 */
/**
 * 利用左移右移
 * 
 * <<左移，乘以2的b次方    >>右移，除以2的b次方
 * 
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    // TODO
    let flag = false;
    for (let i = 31; i >= 0; i--) {
        // 从最高位开始找到不为0的第一个
        if (num & (1 << i) != 0) {
            flag = true;
        }
        // 对该位跟1进行异或
        if (flag) {
            num ^= (1 << i)
        }
    }
    return num;
};

const num = 5;
console.log(findComplement(num));
