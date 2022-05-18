## 题目
**120. 三角形最小路径和**
>中等

https://leetcode-cn.com/problems/triangle/

## 解法：动态规划
### 思路
1. 状态：i 和 j

2. 选择：分别选择`dp[i][j]`的相邻的两个节点
 
3. dp数组
`dp[i][j]`：表示从最底一层到`(i,j)`这个点的所有路径和的最小值；所求结果即为`dp[0][0]`

4. 状态转移方程（从最后一行往上推）
`dp[i][j] = min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j]`
>`dp[i+1][j]`和`dp[i+1][j+1]`为`dp[i][j]`的相邻节点，取其中的较小者即可

5. 基础情况
`dp[n-1][j]= triangle[n-1][j]`，即最底层每个节点的最小和都等于自己

### 代码
```javascript
/**
 * 
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    if (!triangle || triangle.length == 0) {
        return 0;
    }

    const m = triangle.length;
    const n = triangle[triangle.length - 1].length;

    // dp二维数组初始化数组为0
    const dp = [];
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == m - 1) { // base case
                dp[i][j] = triangle[i][j];
            } else {
                dp[i][j] = 0;
            }
        }
    }
    console.log('dp=', dp);

    // 从后往前，从下往上遍历
    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
        }
    }

    return dp[0][0];
};

const triangle = [
    [2],
    [3, 4],
    [6, 5, 7],
    [4, 1, 8, 3]
];
console.log(minimumTotal(triangle)); // 2+3+5+1=11

```
### 复杂度
* 时间复杂度O(m*n) m为行，n为列
* 空间复杂度O(m*n)
