## 题目
**877. 石子游戏**
>中等

https://leetcode-cn.com/problems/stone-game/

## 解法：动态规划
### 思路
博弈问题：核心思路是在二维 dp 的基础上使用元组分别存储两个人的博弈结果。



1. 状态：有三个，开始的索引 i，结束的索引 j，当前轮到的人；`dp[i][j][fir or sec]（0 <= i < piles.length；i <= j < piles.length）`

2. 选择：有两个，选择最左边的那堆石头，或者选择最右边的那堆石头；可以这样穷举所有状态
```
n = piles.length
for 0 <= i < n:
    for j <= i < n:
        for who in {fir, sec}:
            dp[i][j][who] = max(left, right)
```
3. dp 数组定义	
```
dp[i][j].fir 表示，对于 piles[i...j] 这部分石头堆，先手能获得的最高分数
dp[i][j].sec 表示，对于 piles[i...j] 这部分石头堆，后手能获得的最高分数

例如，假设 piles = [3, 9, 1, 2]，索引从 0 开始
dp[0][1].fir = 9 表示：面对石头堆 [3, 9]，先手最终能够获得 9 分。
dp[1][3].sec = 2 表示：面对石头堆 [9, 1, 2]，后手最终能够获得 2 分。
```
所求答案，按照这个定义即比较`dp[0][n-1].fir`和`dp[0][n-1].sec`哪个大，大的那个人得分高赢得游戏

4. 状态转移方程 
```
dp[i][j].fir = max(选择最左边的石头堆, 选择最右边的石头堆)
即
dp[i][j].fir = max(piles[i] + dp[i+1][j].sec, piles[j] + dp[i][j-1].sec)
解释：我作为先手，面对 piles[i...j] 时，有两种选择：
要么我选择最左边的那一堆石头，然后面对 piles[i+1...j]，但是此时轮到对方，相当于我变成了后手；
要么我选择最右边的那一堆石头，然后面对 piles[i...j-1]，但是此时轮到对方，相当于我变成了后手。

if 先手选择左边:
    dp[i][j].sec = dp[i+1][j].fir
if 先手选择右边:
    dp[i][j].sec = dp[i][j-1].fir
解释：我作为后手，要等先手先选择，有两种情况：
如果先手选择了最左边那堆，给我剩下了 piles[i+1...j]，此时轮到我，我变成了先手；
如果先手选择了最右边那堆，给我剩下了 piles[i...j-1]，此时轮到我，我变成了先手。
```

5. 基础情况
```
dp[i][j].fir = piles[i]
dp[i][j].sec = 0（其中 0 <= i == j < n）

解释：i 和 j 相等就是说面前只有一堆石头 piles[i]
那么显然先手的得分为 piles[i]，后手没有石头拿了，得分为 0
```

### 代码
```javascript
/**
 * 
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
    let n = piles.length;

    // 初始化三维数组 dp[n][n][2], 除了base case，其余初始化为0
    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i][j] = [];
            // 0为先手fir，1为后手sec
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

    // 因为dp数组的对角线是已知的，所以可以斜着遍历数组，从下往上，从左往右
    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            let j = l + i - 1;
            // 先手选择最左边 或 选择最右边 时的石头后的分数
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

```
### 复杂度
* 时间复杂度O(N^2)
* 空间复杂度O(N^2)
