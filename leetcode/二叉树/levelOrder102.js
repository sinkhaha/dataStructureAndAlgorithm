/**
 * 102. 二叉树的层序遍历
 * 
 * 中等
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 
 * 广度优先解法
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root == null) {
        return [];
    }

    let result = [];
    let queue = [root];

    while (queue.length) {
        let levelSize = queue.length;

        // 当前层级的结果
        let curLevelResult = [];

        // 遍历当前层级的结果
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            curLevelResult.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(curLevelResult);
    }

    return result;
};
