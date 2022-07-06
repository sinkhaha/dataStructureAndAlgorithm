/**
 * 剑指 Offer 28. 对称的二叉树
 * 简单
 * https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/
 * 
 * 解法：递归
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
    return check(root, root);
};

const check = function (root1, root2) {
    // 递归
    if (!root1 && !root2) {
        return true;
    }
    if (!root1 || !root2) {
        return false;
    }

    // 值相等，且左子树等于右子树
    return root1.val === root2.val && check(root1.left, root2.right) && check(root1.right, root2.left);
}