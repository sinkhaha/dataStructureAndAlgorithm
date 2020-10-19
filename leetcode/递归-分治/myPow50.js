/**
 * 50. Pow(x, n)
 * 
 * 中等
 * 
 * 解法1: 利用分治递归解法，
 * 当n为偶数时，结果为 myPow(x, n/2) * yPow(x, n/2)
 * 当n为奇数时，结果为 x * myPow(x, n/2) * yPow(x, n/2)
 * 
 * 注意：n为负数时，需要取倒数
 */
/**
 * 分治-递归
 * 
 * 时间复杂度O(logN)
 * 
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n == 0) {
        return 1;
    }
    if (n == 1) {
        return x;
    }
    
    // n是负数，要取倒数
    if (n < 0) {
        return 1 / myPow(x, -n);
    }

    // 偶数 
    if (n % 2 == 0) {
        return myPow(x * x, n/2);
    } else {
        return x * myPow(x, n - 1);
    }
};

const x = 2;
const n = 10;
console.log(myPow(x, n));

/**
 * 不用递归，利用位运算解法
 * 
 * @param {*} x 
 * @param {*} n 
 */
var myPow2 = function(x, n) {
    if (n < 0) {
        x =  1 / x;
        n = -n;
    }

    let pow = 1;
    while(n) {
        // 相同位的两个数字都为1，则为1；若有一个不为1，则为0
        // 所以，“一个数 & 1” 就是取二进制的最末位，如果等于1，即要乘以x
        if (n & 1) {
            pow = pow * x;
        }

        x = x * x;
        // 带符号右移, n右移b位（即去掉末b位），相当于n除以2的b次方（取整)
        n = n >> 1;
    }
    return pow;
}
console.log(myPow2(x, n));
