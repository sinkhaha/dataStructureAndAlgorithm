/**
 * 762 二进制表示中质数个计算置位
 * 
 * 简单
 */
/**
 * 也是利用  n & (n-1)  解题
 * 
 * 题目给定了最大值范围（R - L 的最大值为 10000），
 * 这个最大值范围最多不超过20bit就可以完全表示了，
 * 所以可以先把20以内的质数缓存一下然后对比个数即可，不需要计算是不是质数
 * 
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var countPrimeSetBits = function (L, R) {
    const mapPrime = {
        2: true,
        3: true,
        5: true,
        7: true,
        11: true,
        13: true,
        17: true,
        19: true
    };

    this.count = function(n) {
        let res = 0;
        while(n != 0) {
            res++;
            n = n & (n-1); 
        }
        return res;
    }

    let c = 0;
    for (let i = L; i <= R; i++) {
        if (mapPrime[this.count(i)]) {
            c++;
        }
    }

    return c;
};

const L = 6;
const R = 10;
console.log(countPrimeSetBits(6, 10)); // 4
