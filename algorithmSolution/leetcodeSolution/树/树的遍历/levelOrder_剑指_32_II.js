/**
 * 剑指 Offer 32 - II. 从上到下打印二叉树 II
 * 简单
 * https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/
 * 
 * 解法：bfs
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    // 层序遍历
    if (!root) {
        return [];
    }

    let result = [];
    let queue = [root];

    while (queue.length) {
        let levelSize = queue.length;

        let curLevelRst = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            curLevelRst.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push(curLevelRst);
    }

    return result;
};