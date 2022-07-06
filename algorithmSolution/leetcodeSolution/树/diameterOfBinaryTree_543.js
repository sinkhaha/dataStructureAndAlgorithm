/**
 * 543. 二叉树的直径
 * 简单
 * https://leetcode.cn/problems/diameter-of-binary-tree/
 * 
 * 
 * 解法：dfs
 * 
 * 时间O(n) 
 * 空间O(heigth)
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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    if (!root) {
        return 0;
    }

    let rst = 1; // 存最长路径的所有节点数量，默认只有根节点，即为1

    // 计算root为根节点时，子树最长时的节点数
    this.depth = function (root) {
        if (root == null) { // 空节点即为0
            return 0;
        }
        let leftDepth = this.depth(root.left);
        let rightDepth = this.depth(root.right);

        rst = Math.max(rst, leftDepth + rightDepth + 1); // 遍历树的过程中计算路径的最大值

        return Math.max(leftDepth, rightDepth) + 1; // 以该节点为根节点时树的深度，加1是因为要算上根节点
    }

    depth(root);

    // 路径长度 = 路径节点数 - 1
    return rst - 1;
};