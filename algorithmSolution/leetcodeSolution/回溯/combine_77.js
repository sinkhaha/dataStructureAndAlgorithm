/**
 * leetcode 77 组合
 * https://leetcode-cn.com/problems/combinations/
 * 
 * 回溯
 * 
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let res = [];
    if (k <= 0 || n <= 0) {
        return res;
    }

    this.backtrack = function (n, k, start, track) {
        // 结束条件，长度等于要求的长度即可以存入结果集
        if (track.length === k) {
            // 不能直接res.push(track)，因为该引用的值会改变，需要存拷贝后的值
            res.push(track.slice());
            return;
        }

        for (let i = start; i <= n; i++) {
            // 选择
            track.push(i);
            
            // 回溯
            this.backtrack(n, k, i + 1, track);

            // 撤销选择
            track.pop();
        }
    }
    
    // 所选的路径
    let track = [];
    // 从1开始，因为题目是要求返回1到n
    this.backtrack(n, k, 1, track);
    return res;
};

const n = 4;
const k = 2;
console.log(combine(n, k));
