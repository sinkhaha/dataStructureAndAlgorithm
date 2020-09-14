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
