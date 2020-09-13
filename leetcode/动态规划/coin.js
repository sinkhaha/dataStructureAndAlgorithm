/**
 * leetcode 322 零钱兑换问题
 */
/**
 * 解法一：暴力解法
 * 
 * @param {*} coins
 * @param {*} amount
 */
function coinChange1(coins, amount) {
    this.cal = function (amount) {
        // 目标金额为0，所需硬币数量为0
        if (amount === 0) {
            return 0;
        }
        if (amount < 0) {
            return -1;
        }

        // 正无穷大的数值
        let result = Infinity;
        for (let coin of coins) {
            // 计算子问题
            const subResult = cal(amount - coin);
            // 子问题无解
            if (subResult === -1) {
                continue;
            }
            // 个数为 1 + 子问题的解, 1为选择来当前coin金额的硬币
            result = Math.min(result, 1 + subResult);
        }
        
        return result != Infinity ? result : -1;
    };

    return cal(amount);
}

/**
 * 解法二：解法一的优化
 * 备忘录
 * 
 * @param {*} coins 
 * @param {*} amount 
 */
function coinChange2(coins, amount) {
    let subResultMap = {};

    this.cal = function (amount) {
        if (subResultMap[amount] !== undefined) {
            return subResultMap[amount];
        }
        if (amount === 0) {
            return 0;
        }
        if (amount < 0) {
            return -1;
        }
    
        let result = Infinity;
        for (let coin of coins) {
            // 计算子问题
            const subResult = cal(amount - coin);
            // 子问题无解
            if (subResult === -1) {
                continue;
            }
            // 个数为 1 + 子问题的解
            result = Math.min(result, 1 + subResult);
        }

        // 备忘录
        subResultMap[amount] = result == Infinity ? -1 : result;
        return subResultMap[amount];
    };

    return cal(amount);
}

/**
 * 解法三：动态规划，自底向上
 * 
 * 时间复杂度O(n)
 * 空间复杂度O()
 * 
 * @param {*} coins 
 * @param {*} amount 
 */
function coinChange3(coins, amount) {
    // dp 数组的定义：当目标金额为 i 时，至少需要 dp[i] 枚硬币凑出
    // dp 数组初始化为 amount + 1 , 因为凑成 amount 金额的硬币数最多只可能等于 amount（全用 1 元面值的硬币），
    // 所以初始化为 amount + 1 就相当于初始化为正无穷，便于后续取最小值
    let dp = new Array(amount + 1).fill(amount+1);
    dp[0] = 0;
    // 外层 for 循环在遍历所有状态的所有取值
    for (let i = 0; i < dp.length; i++) {
        // 内层 for 循环在求所有选择的最小值
        for (let coin of coins) {
            // 子问题无解
            if (i - coin < 0) {
                continue;
            }
            dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
        }
    }
    // 等于初始值
    return dp[amount] === amount + 1 ? -1 : dp[amount];
}

const coins = [1, 2, 5];
const amount = 11;

console.log('结果1是:' + coinChange1(coins, amount));
console.log('结果2是:' + coinChange2(coins, amount));
console.log('结果3是:' + coinChange3(coins, amount));
