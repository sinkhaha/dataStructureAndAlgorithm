/**
 * leetcode 22 括号生成
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n <= 0) {
        return [];
    }
    let res = [];

    // left 和 right 分别表示左括号、右括号剩下的个数
    this.backtrack = function (left, right, track) {
        // 左括号剩下的多不合法（左括号在左边，永远比右括号多）
        if (right < left) {
            return;
        }
        // 数量⼩于 0 不合法
        if (left < 0 || right < 0) {
            return;
        }

        // 当所有括号刚好⽤完时，此时得到⼀个合法的括号组合
        if (left == 0 && right == 0) {
            res.push(track.join(''));
            return;
        }

        // 选择左括号
        track.push('(');
        backtrack(left - 1, right, track);
        track.pop();

        // 选择右括号
        track.push(')');
        backtrack(left, right - 1, track);
        track.pop();
    }

    let track = [];
    // 刚开始左括号和右括号都是n个
    this.backtrack(n, n, track);
    return res;
};

const n = 3;
console.log(generateParenthesis(n));

