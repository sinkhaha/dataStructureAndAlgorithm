/**
 * 1312 让字符串成为回文串的最少插入次数
 * 困难
 *
 * 1、dp数组的定义
 * dp[i][j]，表示字符串[i....j]，要变成回文串时最少需要dp[i][j]次插入
 * 根据dp数组可知所求结果为dp[0][n-1]（n为s的长度）
 *
 * 
 * 2、选择 和 状态
 * 选择: 字符s[i]和s[j]
 * 状态: 插入次数的改变
 * 
 * 如果s[i] == s[j]的话，此时结果s[i, j]和s[i+1..j-1]的插入次数相等
 * 
 * 如果s[i] !== s[j]的话，先将s[i..j-1]或者s[i+1..j]变成回文串，取两者中的小者后加上1即可，
 * (
 * 把s[i..j-1]变回文串，可以在s[i..j-1]左边插入一个字符s[j]一定可以将s[i..j]变成回文
 * 把s[i+1..j]变回文串，可以在s[i+1..j]右边插入一个字符s[i]一定可以将s[i..j]变成回文
 * )
 * 
 * 状态转移方程:
 * if (s[i] == s[j]) {
 *   dp[i][j] = dp[i + 1][j - 1];
 * } else {
 *   dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + 1;
 * }
 * 
 * 3、base case
 * 当i == j时，dp[i][j] = 0
 * （当i == j时，s[i..j]就是一个字符，本身就是回文串，不需要进行任何插入操作）
 * 
 * 时间复杂度 O(N^2), N为s的长度
 * 空间复杂度 O(N^2)
 * 
 * @param {string} s
 * @return {number}
 */
var minInsertions1 = function (s) {
    let n = s.length;

    // 初始化为0，base case为 i===j时，dp[i][j]=0
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i][j] = 0;
        }
    }
    // console.log(dp);

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

const s = 'mbadm';
console.log(minInsertions1(s)); // 2 字符串可变为 "mbdadbm" 或者 "mdbabdm" 

// 状态压缩, dp数组的状态之和它相邻的状态有关，所以可以压缩成一维
var minInsertions2 = function (s) {
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

console.log(minInsertions2(s)); 
