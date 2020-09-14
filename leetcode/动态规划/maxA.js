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
