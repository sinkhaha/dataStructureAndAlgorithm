// leetcode 651 四字键盘
// 暴力法
function maxA1(n) {
    // 定义3个状态，剩余的按键数/此时a的个数a_num/粘贴版a的个数copy
    // 选a时， dp(n-1, a_num + 1, copy)
    // ctrl+v时， dp(n-1, a_num + copy, copy)
    // ctrl+a ctrl+c时，dp(n-2, a_num, a_num)
    this.dp = function (n, a_num, copy) {
        if (n <= 0) {
            return a_num;
        }
        for (let i = 0; i < n; i++) {
            return Math.max(
                dp(n-1, a_num + 1, copy),
                dp(n-1, a_num + copy, copy),
                dp(n-2, a_num, a_num)
            );
        }
    }

    return this.dp(n, 0, 0);
}
const n1 = 3;
const n2 = 7;
console.log(maxA1(n1)); // 3
console.log(maxA1(n2)); // 9

// 解法一的优化，备忘录
function maxA2(n) {
    const map = {}; // key为a-n_num-copy
    this.dp = function (n, a_num, copy) {
        if (n <= 0) {
            return a_num;
        }
        for (let i = 0; i < n; i++) {
            const key = `${n}-${a_num}-${copy}`;
            if (map[key] !== undefined) {
                return map[key];
            }
            const max = Math.max(
                dp(n-1, a_num + 1, copy),
                dp(n-1, a_num + copy, copy),
                dp(n-2, a_num, a_num)
            );
            map[key] = max;
            return map[key];
        }
    }

    return this.dp(n, 0, 0);
}

console.log(maxA2(n1)); // 3
console.log(maxA2(n2)); // 9

/**
 * 只定义一个「状态」，也就是剩余的敲击次数n
 * 
 * 定义：dp[i] 表示 i 次操作后最多能显示多少个 A
 * 
 * 最优按键序列一定只有两种情况：
 * (1)要么一直按A：A,A,…A（当 N 比较小时）
 * (2)要么是这么一个形式：A,A,…C-A,C-C,C-V,C-V,…C-V（当 N 比较大时）
 * 
 * 换句话说，最后一次按键要么是A要么是C-V
 * 
 * 所以 dp[i] = max(这次按 A 键，这次按 C-V)
 * 
 * 对于 [按A键]这种情况，就是状态i - 1的屏幕上新增了一个 A 而已，
 * 很容易得到结果：dp[i] = dp[i - 1] + 1;
 * 
 * 最优的操作序列一定是C-A C-C接着若干C-V，所以我们用一个变量j作为
 * 若干C-V的起点。那么j之前的 2 个操作就应该是C-A C-C了
 * 
 * 时间复杂度 O(N^2)，
 * 空间复杂度 O(N)
 * 
 * @param {*} n 
 */
function maxA3(n) {
    const dp = new Array(n + 1);
    // 剩余0次则敲0个a
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        // 按a键
        dp[i] = dp[i - 1] + 1;
        // j从2开始，因为c-a加c-c占了两次操作
        for (let j = 2; j < i; j++) {
            // 全选+复制 此时的a个数是dp[j-2],连续粘贴i-j次
            // 屏幕共有dp[j-2]*(i-j+1)个a
            dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1))
        }
    }
    return dp[n];
}

console.log(maxA3(n1)); // 3
console.log(maxA3(n2)); // 9
