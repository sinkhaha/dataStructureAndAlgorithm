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
