## 题目
**1312. 让字符串成为回文串的最少插入次数**
>困难

https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/

## 解法：动态规划
### 思路
1. 状态：`dp[i][j]`最少插入次数的改变
2. 选择：字符`s[i]`和`s[j]`
3. dp数组：
`dp[i][j]` 表示`字符串s[i...j]`，要变成回文串时最少需要`dp[i][j]`次插入，所以所求结果为`dp[0][n-1]`（n为s的长度）

4. 状态转移方程
* 如果`s[i] == s[j]`，此时`s[i, j]`和`s[i+1..j-1]`回文串的插入次数相等，因为`s[i]`和`s[j]`相等了，`s[i+1...j-1]`加`上s[i]`和`s[j]`也是回文串，即`dp[i][j] = dp[i+1][j-1]`

* 如果`s[i] != s[j]`，此时要在字符串`s[i..j-1]`或者`s[i+1..j]`插入一个字符串组成回文串，取`两者中插入次数的小者后加上1`即可
> 因为要把`s[i..j-1]`变回文串，可以在`s[i..j-1]`右边插入一个字符`s[j]`将`s[i..j]`变成回文串
>
> 把`s[i+1..j]`变回文串，也可以在`s[i+1..j]`左边插入一个字符`s[i]`将`s[i..j]`变成回文串
```javascript
// 状态转移方程
if (s[i] == s[j]) {
    dp[i][j] = dp[i + 1][j - 1];
} else {
    dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + 1;
}
```

5. 基础情况
当`i == j`时，`dp[i][j] = 0`
> 因为当`i == j`时，`s[i..j]`就只是一个字符，一个字符本身就是回文串，不需要进行任何插入操作，所以为0


### 代码
```javascript
/**
 * 
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    let n = s.length;

    // n行，n列的二维数组，初始化为0，base case为 i == j时，dp[i][j]=0
    const dp = Array.from(Array(n), () => Array(n).fill(0));
    console.log(dp);

    // 因为所求结果在dp表格右上角，即dp[0][n-1]，所以从下往上，从左往右遍历
    for (let i = n - 2; i >= 0; i--) {
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
* 时间复杂度 `O(N^2)`, N为s的长度
* 空间复杂度 `O(N^2)`

## 解法2: 状态压缩(解法1的优化)
### 思路
在解法1的基础上进行状态压缩，因为dp数组的状态之和它相邻的状态有关，所以可以压缩成一维，降低空间复杂度为O(N)

### 代码
```javascript
/**
 * 
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
* 时间复杂度 `O(N^2)`, N为s的长度
* 空间复杂度 `O(N)`
