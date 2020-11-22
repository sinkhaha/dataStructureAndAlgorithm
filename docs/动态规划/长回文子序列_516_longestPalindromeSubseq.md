## 题目
**516. 最长回文子序列**
>中等

https://leetcode-cn.com/problems/longest-palindromic-subsequence/

## 解法：动态规划
### 思路
1. 状态：`i`和`j`改变，`s[i]`和`s[j]`不同，`dp[i][j]`最长回文子序列长度也改变

2. 选择：选择`s[i]`和`s[j]`

3. dp数组：`dp[i][j]`数组表示⼦串`s[i..j]`的最⻓回⽂⼦序列的⻓度，`dp[0][n-1]`为所求结果

>`dp[i][j]`可以由`dp[i+1][j-1]`的结果推出来，因为`s[i]`和`s[j]`字符相等时，则`[i...j]`的字符串为`[i+1...j-1]`之间的字符串加上`s[i]`和`s[j]`这两个字符串

4. 状态转移方程
* `当 i== j，即s[i] == s[j]，dp[i][j] = dp[i + 1][j - 1] + 2 `
* `当 i!= j，即s[i] != s[j]，dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]) `

`dp[i][j] = dp[i + 1][j - 1] + 2` 表示：
>当`i = j `即`s[i]`和`s[j]`两个字符相等，则`[i...j]`的字符串为`[i+1...j-1]`之间的字符串加上`s[i]`和`s[j]`这两个字符串，即要在`dp[i+1][j-1]`的结果加上2

`dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])`表示：
>当`i != j`即当两个字符不相等时，需要分别求出`s[i+1...j]`和`s[i..j-1]`哪个回⽂⼦序列更⻓，即`dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])`

5. 基础情况 base case
如果`s`只有一个字符，只能构成一个回文子序列，即最长长度为1，也就是`dp[i][j] = 1 (当i==j时)`，即dp二维数组对角线都为1



### 代码
```javascript

/**
 * 
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let n = s.length;

    // 初始化二维数组，n行n列
    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            // base case 当i==j时，dp[i][j]为1，1个字符,其他元素都初始化为0
            if (i === j) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }

    console.log(dp);

    // 因为dp表格对角线的值已知，所求结果为dp[i][j]，所以从下往上，从左往右遍历
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            // 选择s[i]和s[j]，对应的状态改变
            if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }
    
    // 右上角的元素即为所求结果，表示s的最长回文子串
    return dp[0][n-1];
};

```

### 复杂度
* 时间复杂度O(N^2) N为s的长度
* 空间复杂度O(N^2)
