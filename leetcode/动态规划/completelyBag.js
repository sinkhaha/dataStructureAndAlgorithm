/**
 * 518 零钱兑换
 * 
 * 完全背包问题: 每个物品的数量是无限的
 * 
 * 可以把这个问题转化为完全背包问题:
 * 有一个背包，最大容量为amount，有一系列物品coins，每个物品的重量为coins[i]，每个物品的数量无限。
 * 请问有多少种方法，能够把背包恰好装满
 * 
 * dp数组的定义:
 * 状态有两个，也就是需要一个二维dp数组
 * 若只使用前i个物品，当背包容量为j时，有dp[i][j]种方法可以装满背包
 * 即
 * 若只使用coins中的前i个硬币的面值，若想凑出金额j，有dp[i][j]种凑法
 * 
 * 选择: 装进背包 或者 不装进背包
 * 状态: 背包的容量 和 可选择的物品
 * 状态的转移: 
 * 1、如果不把第i个物品装入背包，就是不使用coins[i]这个面值的硬币，那么凑出面额j的方法数dp[i][j]应该等于dp[i-1][j]，继承之前的结果;
 * 2、如果把第i个物品装入了背包，就是使用coins[i]这个面值的硬币，那么dp[i][j]应该等于dp[i][j-coins[i-1]] 
 * (由于i是从 1 开始的，所以coins的索引是i-1时表示第i个硬币的面值)
 * 
 * 综上就是两种选择，而想求的dp[i][j]是“共有多少种凑法”，所以dp[i][j]的值应该是以上两种选择的结果之和
 * 
 * base case：
 * dp[0][..] = 0 和 dp[..][0] = 1
 * 因为如果不使用任何硬币面值，就无法凑出任何金额；
 * 如果凑出的目标金额为 0，那么“无为而治”就是唯一的一种凑法
 * 
 * @param {*} amount 
 * @param {*} coins 
 */
function change(amount, coins) {
    let n = coins.length;
    const dp = [];
    for (let i = 0; i < n + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < amount + 1; j++) {
            // base case
            if (i === 0) {
                dp[0][j] = 0;
            } else if (j === 0) {
                dp[i][0] = 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }

    console.log(dp);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            // 当选择的第i个硬币的金额比想凑的金额大时，即只有选择不装
            if (j - coins[i - 1] < 0) {
                dp[i][j] = dp[i - 1][j];
            } else {
                // 不装 + 装
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
            }
        }
    }
    return dp[n][amount];
}

const amount = 5;
const coins = [1, 2, 5];
console.log(change(amount, coins)); // 4
