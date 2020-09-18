/**
 * 0-1背包问题：
 * 给你一个可装载重量为W的背包和N个物品，每个物品有重量和价值两个属性。
 * 其中第i个物品的重量为wt[i]，价值为val[i]，现在让你用这个背包装物品，最多能装的价值是多少？
 * 
 * 例如：
 * N = 3, W = 4
 * wt = [2, 1, 3], val = [4, 2, 3]
 * 结果：
 * 算法返回 6，选择前两件物品装进背包，总重量 3 小于W，可以获得最大价值 6。 
 *
 * 
 * 1.dp数组定义：dp二维数组，一个维度表示容量，一个表示物品；
 * dp[i][w]:表示对于前i个物品，当前背包的容量为w,这时可以装的最大价值是dp[i][w]；
 * 根据这个定义，想求的答案就是dp[N][W]
 * 
 * 2.选择：选择物品装进背包 或 不选物品装进背包
 * 如果没有把第i个物品装入背包，最大价值dp[i][w]=dp[i-1][w] (没有装即跟前一个结果相等)
 * 如果把第i个物品装入背包，那么dp[i][w]=dp[i-1][w-wt[i-1]] + val[i-1] (由于i是从 1 开始的，
 * 所以对val和wt的取值是i-1,w-wt[i-1]为选择i后剩余的背包能装下的重量，val[i-1]为当前选择i的价值)
 * 
 * 
 * 3.状态：背包的容量 和 可选的物品
 * 
 * 4. base case 就是dp[0][..] = dp[..][0] = 0，
 * 因为没有物品或者背包没有空间的时候，能装的最大价值就是 0
 * 
 * leetcode有0-1背包的变体题目
 * 
 */
function zeroOneBag(N, W, wt, val) {

    // 全初始化为0，此时已经包含base case
    let dp = [];
    for (let i = 0; i < N + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < W + 1; j++) {
            dp[i][j] = 0;
        }
    }
    
    console.log(dp);

    for (let i = 1; i < N + 1; i++) {
        for (let w = 1; w < W + 1; w++) {
            // 当前背包容量不够，只能不装入背包
            if (w - wt[i - 1] < 0) {
                dp[i][w] =  dp[i - 1][w];
            } else {
                dp[i][w] = Math.max(
                    dp[i - 1][w], // 不装
                    dp[i - 1][w - wt[i - 1]] + val[i - 1] // 装
                );
            }
        }
    }

    console.log(dp);

    return dp[N][W];
}

const N = 3;
const W = 4;
const wt = [2, 1, 3];
const val = [4, 2, 3];
console.log(zeroOneBag(N, W, wt, val)); // 6
