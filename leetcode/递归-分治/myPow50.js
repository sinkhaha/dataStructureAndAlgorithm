/**
 * 50. Pow(x, n)
 * 
 * 中等
 * 
 * 解法1: 利用分治递归解法，
 * 当n为偶数时，结果为 myPow(x, n/2) * yPow(x, n/2)
 * 当n为奇数时，结果为 x * myPow(x, n/2) * yPow(x, n/2)
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
