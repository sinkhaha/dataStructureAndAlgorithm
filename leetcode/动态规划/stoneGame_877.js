/**
 * 877. 石子游戏
 * 
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
    let n = piles.length;

    // 三维数组 dp[n][n][2], 除了base case,其余初始化为0
    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i][j] = [];
            // 0为先手，1为后手
            for (let k = 0; k < 2; k++) {
                // base case 为 dp[i][i][0] = piles[i] 和 dp[i][i][1] = 0; 
                if (i === j && k === 0) {
                    dp[i][j][k] = piles[i];
                } else {
                    dp[i][j][k] = 0;
                }
            }
        }
    }

    console.log(dp);

    // 斜着遍历数组
    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            let j = l + i - 1;
            // 先手选择最左边 或 最右边的石头后的分数
            let left = piles[i] + dp[i + 1][j][1]; // 1为下一次只能是后手
            let right = piles[j] + dp[i][j - 1][1]; // 1为下一次只能是后手

            if (left > right) {
                dp[i][j][0] = left;
                dp[i][j][1] = dp[i + 1][j][0];
            } else {
                dp[i][j][0] = right;
                dp[i][j][1] = dp[i][j - 1][0];
            }
        }
    }

    
    console.log(dp);
    
    // result[0]为先手的得分，result[1]为后手的得分
    const result = dp[0][n-1];

    return !!(result[0] - result[1]);
};

const piles = [5, 3, 4, 5];
console.log(stoneGame(piles));
