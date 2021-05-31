/**
 * 188 买卖股票的最佳时机 IV （k次交易）
 * 
 * 困难
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/
 * 
 * 当k等于1时，是121题
 * 当k等于 无限 时，是122题
 * 当k等于2时，是123题
 * 
 * 动态规划解法：
 * （1）dp数组定义，3维数组
 * dp[i][k][j]: 表示到第i天的最大利润(0<=i<=n-1);
 * j值为0或1，表示是否持有股票，0表示没有股票，1表示有股票，j为0时我能买，不能卖；j为1时我能卖，不能买;
 * k表示之前总共交易了多少次 1<=k<=K
 * 
 * 所求结果为第n-1天没有持股票时，第0到K天的最大值
 * max(dp[n - 1]{1...K}[0])
 * 
 * （2）状态转移方程
 * 两层循环
 * for(i = 1; i < n) 
 *   for (k = 1; k < K + 1)
 * 
 * 第i天没有股票：
 * dp[i][k][0] = Max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * 前一天没股票，今天不操作：dp[i-1][k][0]即第i-1天也没有股票，所以第i天不操作
 * 前一天有股票，今天卖：dp[i-1][k][1] + prices[i]即第i-1天有股票，在第i天卖了，得到利润prices[i]
 * 
 * 第i天有股票：
 * dp[i][k][1] = Max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 前一天有股票，今天不操作：dp[i-1][k][1]即第i-1天有股票，所以第i天不操作
 * 前一天没股票，今天买：dp[i-1][k-1][0]-prices[i]即第i-1天没股票，在第i天买入，要减去prices[i]的价格
 * 
 * （3）base case （边界状态需要考虑两个方面,i=0和k=0时的处理,注意此时的k是从0开始，表示交易0次）
 * // k=0
 * for(i = 0; i<n; i++):
 * dp[i][0][0] = 0 ； 因为 k 是从 1 开始的，所以 k = 0 表示不允许交易，此时利润是 0
 * dp[i][0][1] = -infinity ；因为k=0表示不允许交易，是不可能持有股票的，用负无穷表示这种不可能
 *
 * // i=0
 * for(k = 1; k < K + 1; k++): // 因为k=0已经赋值，这里k从1开始
 * dp[0][k][0]= 0 ；因为i是从0开始，0表示还没开始，所以此时利润为0
 * dp[0][k][1] = -prices[0] ；因为i是从0开始，0表示还没开始，所以是不可能持有股票的，用-prices[0]表示这种不可能
 * 
 * 注意，上面两轮边界定义有交集dp[0][0][0] 和 dp[0][0][1] ，后者dp[0][0][1]会得到不同的结果，以 k=0 时赋值结果为准
 * 
 * 时间复杂度O(n*K)
 * 空间复杂度O(n*K)
 * 
 */

/**
 * 
 * 会导致内存堆溢出
 * 
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    let n = prices.length;
    if (n <= 1) {
        return 0;
    }

    // 退化为不限制交易次数
    // 一次交易分为买入和卖出，至少需要两天，有效的限制 k 应该不超过 n/2，
    // 如果超过，就没有约束作用了，相当于 k 为无限次交易，退化成122题
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    } else { // 交易次数为k时
        // 初始化3维dp数组为0
        let maxK = k;
        let dp = [];
        for (let i = 0; i < n; i++) {
            dp[i] = [];
            for (let k = 0; k < maxK + 1; k++) {
                dp[i][k] = [];
                dp[i][k][0] = 0;
                dp[i][k][1] = 0;
            }
        }

        // base case
        for (let i = 0; i < n; i++) {
            dp[i][0][0] = 0;
            dp[i][0][1] = Number.MIN_SAFE_INTEGER;
        }
        // k为0已经在上面初始化了
        for (let k = 1; k < maxK + 1; k++) {
            dp[0][k][0] = 0;
            dp[0][k][1] = -prices[0];
        }

        // 选择
        for (let i = 1; i < n; i++) {
            for (let k = 1; k < maxK + 1; k++) {
                dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
                dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
            }
        }
        // console.log('dp=', dp);

        return dp[n - 1][maxK][0];
    }
};

const k = 2;
const prices = [3, 2, 6, 5, 0, 3];
console.log(maxProfit(k, prices)); // 7
