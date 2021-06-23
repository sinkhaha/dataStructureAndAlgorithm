/**
 * 226. 翻转二叉树 
 * 简单
 * https://leetcode-cn.com/problems/invert-binary-tree/
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 翻转后和原来的数镜像对称
 * 
 * 递归
 * 
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root == null) {
        return null;
    }

    // root节交换左右子节点
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    // 递归
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
};

