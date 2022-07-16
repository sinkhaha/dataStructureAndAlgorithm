/**
 * 剑指 Offer II 044. 二叉树每层的最大值
 * 中等
 * https://leetcode.cn/problems/hPov7L/
 * 
 * 解法：bfs
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
    // 广度优先 bfs
    let result = [];

    if (!root) {
        return result;
    }

    let queue = [root];

    while (queue.length) {
        let n = queue.length;

        let levelMax = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < n; i++) {
            const cur = queue.shift();

            levelMax = Math.max(levelMax, cur.val);

            if (cur.left) {
                queue.push(cur.left);
            }
            if (cur.right) {
                queue.push(cur.right);
            }
        }

        result.push(levelMax);
    }

    return result;
};