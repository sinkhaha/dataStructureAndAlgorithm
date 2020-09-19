/**
 * 121. 买卖股票的最佳时机
 * 简答
 * 
 * 思路：
 * 可以在历史最低点买的股票，记录一个历史最低价格点 minprice，
 * 在第 i 天卖出股票能得到的利润就是 prices[i] - minprice
 *
 * 解法：
 * 只需要遍历价格数组一遍，判断当前值是否是记录历史最低价格点，
 * 如果当前值比最低点大，重新计算是否是最大利润 
 * 
 * 时间复杂度O(n),n为prices的长度
 * 空间复杂度O(1)
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length === 0) {
        return 0;
    }
    // 最低点
    let minPrice = Number.MAX_SAFE_INTEGER;
    // 最大利润
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        // 判断当前是否是最低价格点
        if (prices[i] < minPrice) {
            minPrice = prices[i];
            // 当前值比最低点大，重新计算是否是最大利润    
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // 5