/**
 * 122. 买卖股票的最佳时机II
 * 简单
 * 
 * 贪心算法
 * 
 * 时间复杂度：O(N)，N为prices的长度
 * 空间复杂度：O(1)

 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    // 最大利润
    let maxProfit = 0;
    for (let i = 1; i < n; i++) {
        // 如果当前价格比昨天大，那加上今天可以所得的利润，即每一步都是最佳选择
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }

    return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // 7
