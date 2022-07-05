/**
 * 202. 快乐数
 * 简单
 * https://leetcode.cn/problems/happy-number/
 * 
 * 解法：哈希表
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    // 最后有3种可能：
    // 1、最终会得到1
    // 2、最终会进入循环
    // 3、值会越来越大，最后接近无穷大(此情况永远不会发生，会转化成第1种或第2种情况)

    // 哈希表检测循环
    const seen = new Set();
    while (n != 1 && !seen.has(n)) { // 哈希表不存在该数，即还没进入循环，则继续分离
        seen.add(n);
        n = getNext(n); // 得到下一个数字
    }

    // 此时说明进入了循环 或者 是1，可以判断是否是快乐数
    return n == 1;
};

// 对n做数位分离，求平方和
const getNext = (n) => {
    let totalNum = 0;
    while (n > 0) {
        let d = n % 10;
        n = Math.floor(n / 10);
        totalNum += d * d;
    }
    return totalNum;
}