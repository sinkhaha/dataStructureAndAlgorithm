/**
 * 剑指 Offer 55 - II. 平衡二叉树
 * 简单
 * https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/
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
var isBalanced = function (root) {
    // 递归
    if (!root) {
        return true;
    }

    // 当前节点的深度为1 且左右子树都平衡
    return Math.abs(height(root.left) - height(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};

// 求树的高度
const height = (root) => {
    if (!root) {
        return 0;
    }
    return Math.max(height(root.left), height(root.right)) + 1;
}