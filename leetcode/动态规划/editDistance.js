/**
 * 72 编辑距离
 * 
 * 输入: word1 = "horse", word2 = "ros"
 * 输出: 3
 * 解释:
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 * 
 * dp数组的定义
 * dp[i][j]:返回 s1[0..i] 和 s2[0..j] 的最小编辑距离
 * 
 * 选择：
 * word1[i]==word2[j]时，跳过
 * word1[i]！=word2[j]时，插入，删除，替换
 * 
 * base case:
 * word1和word2中任何一个字符串结束了，直接返回另一个字符串的长度
 * 
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

    // 指向最后一个索引，从后往前遍历
    return this.dp(n - 1, m - 1);
}

const word1 = 'horse';
const word2 = 'ros';
console.log(minDistance(word1, word2)); // 3

// 解法一的优化，备忘录
function minDistance2(word1, word2) {
    let m = word1.length;
    let n = word2.length;

    // m+1行，n+1列,初始为0
    const dp = [];
    for (let i = 0; i < m + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < n+1; j++) {
            if (i === 0) {
                dp[0][j] = j;
            } else if (j === 0) {
                dp[i][0] = i;
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    console.log(dp);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(
                    dp[i][j-1] +1,
                    dp[i-1][j] + 1,
                    dp[i-1][j-1] + 1
                );
            }
        }
    }

    return dp[m][n];
}

console.log(minDistance2(word1, word2)); // 3
