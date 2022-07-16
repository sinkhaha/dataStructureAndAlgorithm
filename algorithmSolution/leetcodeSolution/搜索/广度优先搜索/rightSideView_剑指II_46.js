/**
 * 剑指 Offer II 046. 二叉树的右侧视图
 * 中等
 * https://leetcode.cn/problems/WNC0Lk/
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
var rightSideView = function (root) {
    // bfs
    let result = [];
    if (root == null) {
        return result;
    }

    let queue = [root];

    while (queue.length) {
        let n = queue.length;

        for (let i = 0; i < n; i++) {
            const cur = queue.shift();

            // 每1层的最后1个节点的值
            if (i == n - 1) {
                result.push(cur.val);
            }

            if (cur.left) {
                queue.push(cur.left);
            }
            if (cur.right) {
                queue.push(cur.right);
            }
        }
    }

    return result;
};