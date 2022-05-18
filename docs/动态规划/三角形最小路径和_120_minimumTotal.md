## 题目
**120. 三角形最小路径和**
>中等

给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

 

示例 1：
```
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```
示例 2：
```
输入：triangle = [[-10]]
输出：-10
```

提示：

* 1 <= triangle.length <= 200
* triangle[0].length == 1
* triangle[i].length == triangle[i - 1].length + 1
* -10^4 <= `triangle[i][j]` <= 10^4

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/triangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
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
