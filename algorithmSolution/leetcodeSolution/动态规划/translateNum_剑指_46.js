/**
 * 剑指 Offer 46. 把数字翻译成字符串
 * 中等
 * https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
 * 
 * 解法：动态规划
 */
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
    // 动态规划
    // dp[i]表示，以i为结尾的字符串有dp[i]种翻译的方法
    // 2种选择 1、s[i]可以单独翻译 2、s[i-1]和s[i]可以一起翻译(前提是组合的数在 10−25 之间)

    // 状态转移方程
    // 1、当s[i]单独翻译，dp[i] = dp[i-1]
    // 2、当s[i]和前面的数s[i-1]组合翻译
    // 如果组合的数不在[10,25]之间，相当于还是得拆开来单独翻译，即dp[i] = dp[i-1]
    // 如果组合的数在[10,25]之间，此时dp[i] = dp[i-2]
    // 综上，dp[i] = dp[i-1] + dp[i-2]

    // base case  dp[0] = dp[1] = 1


    let s = String(num);

    let pre = 1; // 即dp[0]
    let cur = 1; // 即dp[1]

    for (let i = 2; i <= s.length; i++) {
        const compareNum = s.substring(i - 2, i);

        // 计算dp[i]
        let c = +compareNum >= 10 && compareNum <= 25
            ? pre + cur
            : pre;

        cur = pre;
        pre = c;
    }

    return pre;
};