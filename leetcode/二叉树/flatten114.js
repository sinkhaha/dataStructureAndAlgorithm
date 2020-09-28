/**
 * 114
 * 中等
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
 * 
 * 递归
 * 1、将root的左子树和右子树拉平
 * 2、将root的右子树接到左子树下方，然后将整个左子树作为右子树
 *
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    if (root == null) {
        return null;
    }

    flatten(root.left);
    flatten(root.right);

    // 后序遍历位置
    // 1、左右子树已经被拉平成一条链表
    let left = root.left;
    let right = root.right;

    // 2、将左子树作为右子树
    root.left = null;
    root.right = left;

    // 3、将原先的右子树接到当前右子树的末端
    let p = root;
    while (p.right != null) {
        p = p.right;
    }
    p.right = right;
};

// TODO
