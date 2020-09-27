/**
 * 372
 * 中等
 * 
 * 处理数组指数：
 * a^[1,2,3] = a^1 * (a^[2,3])^10
 * 
 * 取模运算公式：
 * (a * b) % k = (a % k)(b % k) % k
 * 对乘法的结果求模，等价于先对每个因子都求模，然后对因子相乘的结果再求模
 * 
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function (a, b) {
    if (!b || b.length === 0) {
        return 1;
    }
    const last = b.pop();

    const part1 = myPow(a, last);
    // 递归
    const part2 = myPow(superPow(a, b), 10);

    return part1 * part2;
};


/**
 * 计算 a 的 k 次方然后与 base 求模的结果
 * 
 * 先对因子 a 求模，然后每次都对乘法结果 res 求模，
 * 这样可以保证 res *= a 这句代码执行时两个因子都是小于 base 的，
 * 也就一定不会造成溢出，同时结果也是正确的
 * 
 * @param {*} a 
 * @param {*} k 
 */
function myPow(a, k) {
    const base = 1337;
    // 对因子求模
    a = a % base;

    let res = 1;
    for (let i = 0; i < k; i++) {
        // 溢出点
        res *= a;
        // 对乘法结果求模
        res %= base;
    }
    return res;
}

const a = 2, b = [1, 0];
console.log(superPow(a, b)); // 1024
