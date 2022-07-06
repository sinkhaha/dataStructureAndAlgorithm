/**
 * 剑指 Offer 32 - I. 从上到下打印二叉树
 * 中等
 * https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/
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
 * @return {number[]}
 */
var levelOrder = function (root) {
    // 层序遍历
    if (root == null) {
        return [];
    }

    let result = [];
    let queue = [root];

    while (queue.length) {
        let curLevelResult = [];

        for (let i = 0; i < queue.length; i++) {
            const root = queue.shift();
            curLevelResult.push(root.val);

            if (root.left) {
                queue.push(root.left);
            }
            if (root.right) {
                queue.push(root.right);
            }
        }

        result = result.concat(curLevelResult);
    }

    return result;
};