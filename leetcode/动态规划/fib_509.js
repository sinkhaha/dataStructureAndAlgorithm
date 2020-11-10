/**
 * leetcode 509 斐波那契数列的4种解法和对比
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
    let sumMap = {};
    return myFib(n, sumMap); 
}

function myFib(n, sumMap) {
    if (n === 0) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    if (sumMap[n]) {
        return sumMap[n];
    }
    const rst = myFib(n-2, sumMap) + myFib(n-1, sumMap);
    sumMap[n] = rst;
    return rst;
}

/**
 * 解法三：动态规划(自底向上)
 * 
 * 解法二备忘录存储技巧的升级，使用dp数组来单独存储这个备忘录
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * @param {*} n 
 */
function fib3(n) {
    if (n === 0) {
        return 0;
    }
    const dp = new Array(n);
    dp[1] = 1;
    dp[2] = 1;
    for (let i = 3; i <= n; i++) {
       dp[i] = dp[i -1] + dp[i-2];
    }
    return dp[n];
}

/**
 * 解法四：动态规划(自底向上)
 * 
 * 解法三的优化，利用(状态压缩技巧)，其实状态只跟前一个数和当前数有关，
 * 不需要像第三种解法那样用一个数组进行存储，只需用两个值存储即可
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * @param {*} n 
 */
function fib4(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    let pre = 1;
    let cur = 1;
    for (let i = 3; i <= n; i++) {
        const sum = pre + cur;
        pre = cur;
        cur = sum;
    }
    return cur;
}
