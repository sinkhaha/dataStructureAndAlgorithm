/**
 * 617. 合并二叉树
 * 简单
 * https://leetcode.cn/problems/merge-two-binary-trees/
 * 
 * 解法：深度优先搜索
 * 
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
    if (root1 == null) {
        return root2;
    }
    if (root2 == null) {
        return root1;
    }

    // 构造新的树
    let treeNode = {};
    treeNode.val = root1.val + root2.val;
    treeNode.left = mergeTrees(root1.left, root2.left);
    treeNode.right = mergeTrees(root1.right, root2.right);

    return treeNode;
};