## 题目
**1312. 让字符串成为回文串的最少插入次数**
>困难

https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/

## 解法1：动态规划
### 思路
1. 状态: `dp[i][j]`最少插入次数的改变
2. 选择: 字符`s[i]`和`s[j]`
3. dp数组:
`dp[i][j]` 表示`字符串s[i...j]`，要变成回文串时`最少需要dp[i][j]`次插入
根据dp数组可知所求结果为`dp[0][n-1]`（n为s的长度）

4. 状态转移方程
* 如果`s[i] == s[j]`，此时结果`s[i, j]`和`s[i+1..j-1]`回文串的插入次数相等，所以`dp[i][j]=dp[i+1][j-1]`
 
* 如果`s[i] != s[j]`，可以把`s[i..j-1]`变回文串 或者 把`s[i+1..j]`变回文串，此时结果为`s[i..j-1]`或者`s[i+1..j]`，取`两者中的小者后加上1`即可；
>如果把`s[i..j-1]`变回文串，可以在`s[i..j-1]`左边插入一个字符`s[j]`可以将`s[i..j]`变成回文串；如果把`s[i+1..j]`变回文串，可以在`s[i+1..j]`右边插入一个字符`s[i]`可以将`s[i..j]`变成回文串

**所以状态转移方程如下**
```javascript
if (s[i] == s[j]) {
    dp[i][j] = dp[i + 1][j - 1];
} else {
    // 取次数小者，加上1次
    dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + 1;
}
```
5. 基本情况
当`i == j`时，`dp[i][j] = 0`，即dp表格对角线为0
> 因为当`i == j`时，`s[i..j]`就只是一个字符，一个字符本身就是回文串，不需要进行任何插入操作，所以为0

### 代码
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    let n = s.length;

    // 二维数组初始化为0，base case为 i===j时，dp[i][j]=0
    let dp = Array.from(Array(n), () => Array(n).fill(0));
   
    // 因为dp表格对角线已知0 且 所求结果为dp[0][n - 1]，所以从下往上，从左往右进行遍历
    // 从下往上
    for (let i = n - 2; i >= 0; i--) {
        // 从左往右
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
            }
        }
    }

    // 所求结果
    return dp[0][n - 1];
};

```
### 复杂度
* 时间复杂度 O(N^2), N为s的长度
* 空间复杂度 O(N^2)


## 解法2：解法1的优化,状态压缩

### 思路
状态压缩
解法1的dp二维数组的状态只和它相邻的状态有关，可以压缩成一维

### 代码
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    let n = s.length;

    let dp = Array(n).fill(0);

    let temp = 0;
    for (let i = n - 2; i >= 0; i--) {
        // 记录 dp[i+1][j-1]
        let pre = 0;
        for (let j = i + 1; j < n; j++) {
            temp = dp[j];
            if (s[i] === s[j]) {
                // dp[i][j] = dp[i + 1][j - 1];
                dp[j] = pre;
            } else {
                // dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
                dp[j] = Math.min(dp[j], dp[j - 1]) + 1;
            }
            pre = temp;
        }
    }

    // 所求结果
    return dp[n - 1];
};

```
### 复杂度
* 时间复杂度 O(N^2), N为s的长度
* 空间复杂度 O(N)
