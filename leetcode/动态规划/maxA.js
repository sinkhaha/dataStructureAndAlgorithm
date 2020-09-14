// 
// 暴力法
/**
 * leetcode 651 四字键盘
 * 
 * 题目：
 * 假设你有一个特殊的键盘包含下面的按键：
 * Key 1: (A)：在屏幕上打印一个 'A'。
 * Key 2: (Ctrl-A)：选中整个屏幕。
 * Key 3: (Ctrl-C)：复制选中区域到缓冲区。
 * Key 4: (Ctrl-V)：将缓冲区内容输出到上次输入的结束位置，并显示在屏幕上。
 * 现在，你只可以按键 N 次（使用上述四种按键），请问屏幕上最多可以显示几个 'A'呢？
 * 
 * 样例 1:
 * 输入: N = 3
 * 输出: 3
 * 解释:
 * 我们最多可以在屏幕上显示三个'A'通过如下顺序按键：
 * A, A, A
 *
 * 样例 2:
 * 输入: N = 7
 * 输出: 9
 * 解释:
 * 我们最多可以在屏幕上显示九个'A'通过如下顺序按键：
 * A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V
 /

/**
 * 解法一：暴力解法(动态规划)
 * 
 * 解题思路：
 * 1.找【选择】，找【状态】
 * 2.有4种选择，分别是A、C-A、C-C、C-V（Ctrl简写为C）
 * 可以定义3个状态：
 * 第1个状态是剩余的按键次数，用n表示；
 * 第2个状态是当前屏幕上字 A 的数量，用a_num表示
 * 第3个状态是剪切板中 A 的数量，用copy表示
 * 
 * 3. base case：当剩余次数n为 0 时，a_num就是答案
 * 
 * 根据4 种【选择】，把这几种选择通过状态转移表示如下：
 * (1)选a时，dp(n-1, a_num + 1, copy)
 * (2)ctrl+v时，dp(n-1, a_num + copy, copy)
 * (3)ctrl+a ctrl+c时(全选和复制必然是联合使用的)，dp(n-2, a_num, a_num)
 */
function maxA1(n) {
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

    // 初始化时，剩余数为n，a的个数为0，剪切板的个数为0
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
