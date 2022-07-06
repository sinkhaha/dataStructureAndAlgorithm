/**
 * 101. 对称二叉树
 * 简单
 * https://leetcode.cn/problems/symmetric-tree/
 * 
 * 解法：递归
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
    // 递归
    return check(root, root);
};

function check(root1, root2) {
    if (root1 == null && root2 == null) {
        return true;
    }

    if (root1 == null || root2 == null) {
        return false;
    }

    return root1.val == root2.val && check(root1.left, root2.right) && check(root1.right, root2.left);
}