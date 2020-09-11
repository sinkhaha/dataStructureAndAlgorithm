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
