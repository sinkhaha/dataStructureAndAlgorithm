/**
 * 103. 二叉树的锯齿形层序遍历
 * https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
 * 
 * s形层序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * bfs
 * 
 * 时间复杂度：O(N)
 * 空间复杂度：O(N)
 * 
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if (root == null) {
        return [];
    }

    let result = [];

    let queue = [root];

    // 标识是否从左往右遍历
    let isOrderLeft = true;

    while (queue.length) {
        let len = queue.length;
        // 当前层的结果
        let curLevelResult = [];

        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            if (isOrderLeft) {
                curLevelResult.push(node.val);
            } else {
                // 从右向左遍历的插入开头
                curLevelResult.unshift(node.val);
            }
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        result.push(curLevelResult);
        isOrderLeft = !isOrderLeft;
    }

    return result;
};

