/**
 * 斐波那契数列的4种解法和对比
 */
/**
 * 解法一：暴力递归(自顶向下)
 * 
 * 时间复杂度：O(2^n)，指数级别
 * 空间复杂度：O(n)
 * 
 * 注意点：
 * (1)注意爆栈
 * (2)存在重复的调用计算
 * 
 * @param {*} n 
 */
function fib(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    return fib(n-2) + fib(n-1);
}

/**
 * 解法二：备忘录递归(自顶向下)
 * 解法一递归的升级版
 * 
 * 比解法一多了个“备忘录”储存，"剪枝"处理技巧，可以去除重复的调用计算
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * @param {*} n 
 */
function fib2(n) {
    if (n === 0) {
        return 0;
    }
    const sumMap = {};
    if (n === 1 || n === 2) {
        return 1;
    }
    if (sumMap[n]) {
        return sumMap[n];
    }
    const rst = fib2(n-2) + fib2(n-1);
    sumMap[n] = rst;
    return rst;
}
