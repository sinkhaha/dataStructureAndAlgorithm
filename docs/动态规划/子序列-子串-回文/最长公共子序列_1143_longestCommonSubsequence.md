## 题目
**1143. 最长公共子序列**
>中等

给定两个字符串 text1 和 text2，返回这两个字符串的最长 `公共子序列` 的长度。如果不存在 `公共子序列` ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

* 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

 

示例 1：
```
输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。
```
示例 2：
```
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。
```
示例 3：
```
输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
```

提示：

* 1 <= text1.length, text2.length <= 1000
* text1 和 text2 仅由小写英文字符组成。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法1： 递归暴力解法
### 思路
两个指针`i`和`j`从后往前遍历，暴力递归（会超出时间限制）(可以用备忘录保存递归结果进行优化)

### 代码
```javascript
/**
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    this.dp = function (i, j) {
        // 递归结束条件，有一个字符串为空字符串
        if (i === -1 || j === -1) {
            return 0;
        }
        // 相等即找到一个LCS的字符，加1后继续向前查找
        if (text1[i] === text2[j]) {
            return this.dp(i - 1, j - 1) + 1;
        } else {
            // 没有找到LCS字符，则判断是移动哪个指针能使LCS更长
            return Math.max(
                this.dp(i - 1, j), // text1[i]不在LCS中，text2[j]在LCS中
                this.dp(i, j - 1), // text2[j]不在LCS中，text1[i]在LCS中
                this.dp(i - 1, j - 1) // text1[i]和text[2]都不在LCS中
            );
        }
    }
    // 两个指针i和j，分别指向字符串的最后一位，从后往前遍历
    return this.dp(text1.length - 1, text2.length - 1);
};
```

## 解法二：动态规划(推荐)
### 思路
解法一的优化，dp表格优化时间复杂度

1. 状态：`i`和`j`不同时，`dp[i][j]`最长公共子串状态改变
2. 选择：两层循环从前往后遍历，做选择时，选择`text1[i]`和`text2[j]`
3. dp数组：
    `dp[i][j]`表示：对于 `text1[1..i]` 和 `text2[1..j]`，它们的 LCS ⻓度是`dp[i][j]`，`dp[m][n]`即为所求结果（m为text1的长度，n为text2的长度）
4. 状态转移方程：
    两层循环从前往后遍历dp二维数组，做选择，即选择`text1[i]`和`text2[j]`
 * 当`text1[i] == text2[j]`时，说明这字符一定在LCS中，则`dp[i][j] = dp[i-1][j-1] + 1`
 * 当`text1[i] != text2[j]`时，说明这两个字符至少有一个不在LCS中（其中一个不在LCS，或都不在LCS中），选择其中能让LCS更长的，则`dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i-1][j-1])`

 >* `dp[i - 1][j]`表示`text1[i]`不在LCS中，`text2[j]`在LCS中
 >* `dp[i][j - 1]`表示`text2[j]`不在LCS中，`text1[i]`在LCS中
 >* `dp[i-1][j-1])`表示`text1[i]`和`text[2]`都不在LCS中

5. 基础情况base case
    索引为0的⾏和列表⽰空串，此时值为0，所以`dp[0][..] 和 dp[..][0] 都为 0`

### 代码
```javascript

/**
 * 
 * @param {*} text1 
 * @param {*} text2 
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp数组m+1行n+1列，初始化为0，此时基础情况dp[0][...] 和 dp[...][0]也一并初始化为0
    const dp = Array.from(Array(m+1), () => Array(n+1).fill(0));
  
    // 从前往后遍历做选择，从1开始，因为dp[0][..]和dp[..][0]是已知的，可以推出后面的值
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            // 找到1个LCS的元素，则在之前的长度加1（i是从1开始的，所以取对应索引的值需要减1）
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // 至少有一个字符不在LCS中；（这里没有比较dp[i-1][j-1]，因为它在三者中三最小的，没有必要比较）
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // 最后一个元素即为结果
    return dp[m][n];
};

```
### 复杂度
* 时间复杂度O(mn)
* 空间复杂度O(mn)
