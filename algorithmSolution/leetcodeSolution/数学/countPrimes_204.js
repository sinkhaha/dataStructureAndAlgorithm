/**
 * 204 计算质数
 * 
 * 简单
 * https://leetcode-cn.com/problems/count-primes/
 * 
 * 素数: 一个数如果只能被 1 和它本身整除，那么这个数就是素数
 */
/**
 * 
 * 空间复杂度 O(1)
 */
function countPrimes(n) {
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (isPrimes2(i)) {
            count++;
        }
    }
    return count;
}

/**
 * 时间复杂度O(n)
 * 
 * 判断整数 n 是否是素数
 * @param {*} n 
 */
function isPrimes1(n) {
    for (let i = 2; i < n; i++) {
        // 有其他整除因子
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * 判断整数 n 是否是素数
 * @param {*} n 
 */
function isPrimes2(n) {
    // i 不需要遍历到 n，只需要到 sqrt(n) 即可
    for (let i = 2; i * i <= n; i++) {
        // 有其他整除因子
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

/**============================================= */

/**
 * 高效的计算素数的方法
 * 
 * Sieve of Eratosthenes算法
 * 
 * 如果 2 是一个素数，那么 2 × 2 = 4, 3 × 2 = 6, 4 × 2 = 8... 都不可能是素数了
 * 如果 3 也是素数，那么 3 × 2 = 6, 3 × 3 = 9, 3 × 4 = 12... 也都不可能是素数了
 * 即如果一个数i是素数，那 i 的倍数不可能是素数
 * 
 * 时间复杂度 O(N * loglogN)
 * 
 * @param {*} n 
 */
function countPrimes2(n) {
    let isPrimes = Array(n).fill(true);

    // 不需要遍历到n,只需要遍历到sqrt(n)即可
    for (let i = 2; i * i < n; i++) {
        if (isPrimes[i]) {
            // i 的倍数不可能是素数了，注意j从i的平方开始
            for (let j = i * i; j < n; j += i) {
                isPrimes[j] = false;
            }
        }
    }

    let count = 0;
    for (let i = 2; i < n; i++) {
        if (isPrimes[i]) {
            count++;
        }
    }
    return count;
}

function test() {
    const n = 10;
    console.log(countPrimes(n));
    console.log(countPrimes2(n));
}
test();

