/**
 * 剑指 Offer II 113. 课程顺序
 * 中等
 * https://leetcode.cn/problems/QA2IGt/
 * 
 * 解法：拓扑排序
 * 
 * 时间O(n+m)
 * 空间O(n+m)
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    const map = {};
    const inDegrees = new Array(numCourses).fill(0); // 入度数组

    for (const [a, b] of prerequisites) {
        if (map[b]) {
            map[b].push(a);
        } else {
            map[b] = [a];
        }
        inDegrees[a]++;
    }

    const queue = []; // 入度为0的数
    for (let i = 0; i < numCourses; i++) {
        if (inDegrees[i] === 0) {
            queue.push(i);
        }
    }

    const ans = [];
    while (queue.length) {
        let cur = queue.shift();
        ans.push(cur);

        for (let next of (map[cur] || [])) {
            inDegrees[next]--;
            if (inDegrees[next] === 0) {
                queue.push(next);
            }
        }
    }

    return ans.length === numCourses ? ans : [];
};