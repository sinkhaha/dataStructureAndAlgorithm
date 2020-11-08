/**
 * 70. 爬楼梯
 * 
 * 简单
 */

/**
 * 解法1:递归
 * 
 * 缺点：会出现重复调用
 * 
 * 时间复杂度近似 O(2^n)
 * 
 * @param {*} n 
 */
let depth = 0; // 全局变量，表示递归的深度
function climbStairs1(n) {
    // 防止爆栈
    ++depth;
    if (depth > 1000) {
        throw new Error('小心爆栈');
    }

    if (n < 1) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    if (n == 2) {
        return 2;
    }
    return climbStairs1(n - 2) + climbStairs1(n - 1);
}

/**
 * 解法2:解法1的优化，备忘录递归，剪枝
 * 
 * 用个哈希表缓存，每次把不同参数的计算结果存入哈希，
 * 当遇到相同参数时，再从哈希表里取出，就不用重复计算了
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 */
let mapData = new Map();
function climbStairs2(n) {
    if (n < 1) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    // 值的判断和存储
    if (mapData.get(n)) {
        return mapData.get(n);
    }

    let value = climbStairs2(n - 1) + climbStairs2(n - 2);
    mapData.set(n, value);
    return value;
}


/**
 * 解法3:动态规划（最优）
 * 
 * 状态转移方程 F(n) = F(n-1)+F(n-2)（n>=3）
 *
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} n 
 */
function climbStairs3(n) {
    if (n < 1) {
        return 0;
    }
    // base case
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    let a = 1;
    let b = 2;
    let temp = 0;

    // 每一次迭代，都会计算出多一级台阶的走法数量
    // 只需保留两个临时变量a和b，分别代表了上一次和上上次迭代的结果
    // temp为当前迭代结果值
    for (let i = 3; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }

    return temp;
}

console.log(climbStairs1(3));
console.log(climbStairs2(3));
console.log(climbStairs3(3));
