/**
 * 236. 二叉树的最近公共祖先
 * 
 * 中等
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * 
 * 跟235题的区别是这个不是二叉搜索树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 时间复杂度：O(N)，其中 N 是二叉树的节点数
 * 空间复杂度：O(N)
 * 
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root == null) {
        return null;
    }

    // 根为其中一个要找的节点重合，那这个就是结果
    if (root == p || root == q) {
        return root;
    }

    // 分别递归查找左子树 和 右子树
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    // 其中一个为空，则p和q都在另一个子树中，在另一个子树中查找
    if (left == null) {
        return right;
    }
    if (right == null) {
        return left;
    }

    // 两边都存在p和q，说明当前节点root为最近公共祖先
    return root;
};
