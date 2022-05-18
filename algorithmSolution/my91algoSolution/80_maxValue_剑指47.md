## 题目
https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/

**剑指 Offer 47. 礼物的最大价值**
>中等

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？


示例 1:
```
输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
```

提示：

* 0 < grid.length <= 200
* 0 < grid[0].length <= 200

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法
### 思路
1. 选择
选择走右边 或 选择走下边
2. dp数组
`dp[i][j]`表示走到`(i, j)位置`时的礼物最大价值
3. 转移方程
`dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]`
即`走到当前位置的礼物最大价值 = Math.max(左边位置的礼物价值，上边位置的礼物价值) + 当前位置礼物价值`
4. base case
第一个位置的价值`dp[0][0] = grid[0][0]`
第一行的价值为左边的价值加上当前位置的价值
```js
for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
}
```
第一列的价值为上边的价值加上当前位置的价值
```js
for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
}
```
### 代码
```js
/**
 * 
 *
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    let dp = Array.from(Array(m), () => Array(n).fill(0));
    // base case
    dp[0][0] = grid[0][0];
    // 第一行和第一列都是累加
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i - 1] + grid[0][i];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
};
```
### 复杂度
 * 时间复杂度：O(mn)
 * 空间复杂度：O(mn)
