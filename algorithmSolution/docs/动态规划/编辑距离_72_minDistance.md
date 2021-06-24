## 题目
**72. 编辑距离**
>困难

https://leetcode-cn.com/problems/edit-distance/

## 解法1:暴力的递归(自顶向下)
### 思路
1. 维护`i`和`j`两个指针，分别指向`word1`和`word2`的最后一个元素，从后往前遍历
2. 当`word1[i]==word2[j]`时，`i`和`j`同时向前移动，此时不增加操作数，继续往前递归即可，即`dp(i-1, j-1)`
3. 当`word1[i]!==word2[j]`时，可以选择插入/删除/替换，返回其中操作数的最小者并加1代表进行了一次操作
* 可以选择`插入`，即把`word2[j]`插入`word1`的`i`后面，即`word1`的`i`不变，`word2`的`j`向前移动，然后操作数加1，即`dp(i, j - 1) + 1`继续往前递归
* 可以选择删除，即把`word1[i]`删除，即`word1`的`i`向前移动，`word2`的`j`不变，然后操作数加1，即`dp(i - 1, j) + 1`，继续往前递归
* 可以选择替换，即把`word1[i]`替换成`word2[j]`，即`word1`的`i`和`word2`的`j`都向前移动一步，然后操作数加1，即`dp(i-1, j-1) + 1`，继续往前递归
4. 当`i`走完`word1 `或` j`走完`word2`了，直接返回另一个字符串剩下的长度


### 代码
```javascript
/**
 * 
 * @param {*} word1 
 * @param {*} word2 
 */
function minDistance(word1, word2) {
    let n = word1.length;
    let m = word2.length;

    this.dp = function (i, j) {
        // base case 一个字符串结束了，直接返回另一个字符串的长度
        if (i < 0) {
            return j + 1;
        }
        if (j < 0) {
            return i + 1;
        }

        if (word1[i] === word2[j]) {
            return this.dp(i - 1, j - 1);
        } else {
            return Math.min(
                this.dp(i, j - 1) + 1, // 插入
                this.dp(i - 1, j) + 1, // 删除
                this.dp(i - 1, j - 1) + 1 // 替换
            );
        }
    }

    // i和j指针指向最后一个索引，从后往前遍历
    return this.dp(n - 1, m - 1);
}
```
### 复杂度
* 时间复杂度 O(nm)
* 空间复杂度 O(nm) 递归栈的空间

## 解法2:dp动态规划(自底向上)
### 思路
解法1的递归存在重叠子问题，计算出现重复，可以用备忘录剪枝也可以用动态规划优化

动态规划解法：
1. 状态: 当前`word1[0...i]`转成`word2[0...j]`的最小编辑距离

2. 选择: 对于每次操作，有4种选择，`插入`、`删除`、`替换`、还有`不操作`即跳过（即i和j两个指针同时向前移动）

3. dp数组的定义
`dp[i][j]`表示返回 `word1[0..i]` 和 `word2[0..j]` 的最小编辑距离
（即从word1的前i个字符 变成 word2的前j个字符 的最小操作数)

4. 状态转移方程
* 当`word1[i] = word2[j]`时，表示相同直接跳过，操作数和前一步一样，即`dp[i][j] = dp[i-1][j-1]`
* 当`word1[i]！=word2[j]`时，可以选择`插入`、`删除`、`替换`，要选其中操作数最小的即
`dp[i][j] = Math.min(
    dp[i][j - 1] + 1, // 插入
    dp[i - 1][j] + 1, // 删除
    dp[i - 1][j - 1] + 1 // 替换
)`
>根据状态转移方程可以知道所求结果为`dp[i][j]`
5. 基础情况
  `word1`和`word2`中任何一个字符串结束了，直接返回另一个字符串剩余的长度即可，

  即`dp[i][0]==i`和`dp[0][j]==j`

### 代码
```javascript
/**
 * 
 * @param {*} word1
 * @param {*} word2
 */
function minDistance(word1, word2) {
    let m = word1.length;
    let n = word2.length;

    // 初始化二维数组，m+1行，n+1列
    // base case为word1和word2中任何一个字符串结束了
    // 直接返回另一个字符串剩余的长度即可，即 dp[i][0]==i 和 dp[0][j]==j
    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[0][j] = j; // base case
            } else if (j === 0) {
                dp[i][0] = i; // base case
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // console.log(dp);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1, // 插入
                    dp[i - 1][j] + 1, // 删除
                    dp[i - 1][j - 1] + 1 // 替换
                );
            }
        }
    }

    return dp[m][n];
}
```
### 复杂度
* 时间复杂度O(mn)，m为word1的长度，n为word2的长度
* 空间复杂度O(mn)

