/**
 * 剑指 Offer II 115. 重建序列
 * 中等
 * https://leetcode.cn/problems/ur2n8P/
 * 
 * 解法：图/拓扑排序
 * 
 * 解法有点类似课程表题目 https://leetcode.cn/problems/course-schedule-ii/
 */
/**
 * @param {number[]} nums
 * @param {number[][]} sequences
 * @return {boolean}
 */
var sequenceReconstruction = function (nums, sequences) {
    const n = nums.length;

    let graph = new Map();
    let inDegrees = new Array(n + 1); // 入度表

    for (let seq of sequences) {
        for (let num of seq) {
            if (num < 1 || num > nums.length) {
                return false;
            }
            graph.set(num, []);
            inDegrees[num] = 0;
        }
    }

    if (graph.size !== n) { // nums元素是1到n
        return false;
    }

    for (let seq of sequences) {
        for (let i = 0; i < seq.length; i++) {
            let num1 = seq[i];
            let num2 = seq[i + 1];
            if (num2 !== undefined) {
                graph.get(num1).push(num2);
                inDegrees[num2]++;
            }
        }
    }

    let queue = []; // 存入度为0的
    for (let i = 1; i <= n; i++) {
        if (inDegrees[i] === 0) {
            queue.push(i);
        }
    }

    let res = [];
    while (queue.length === 1) {
        let num = queue.shift();
        res.push(num);

        for (let next of graph.get(num)) {
            inDegrees[next]--;
            if (inDegrees[next] === 0) {
                queue.push(next);
            }
        }
    }

    return res.join(',') === nums.join(',');
};