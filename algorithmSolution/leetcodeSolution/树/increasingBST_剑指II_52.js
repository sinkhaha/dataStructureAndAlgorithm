/**
 * 剑指 Offer II 052. 展平二叉搜索树
 * 简单
 * https://leetcode.cn/problems/NYBBNL/
 * 
 * 解法：中序遍历
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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    // 先中序遍历，然后再根据中序遍历的结果组装树
    if (!root) {
        return root;
    }

    let inOrderRst = []; // 中序遍历的值
    const dfs = (root) => {
        if (!root) {
            return;
        }

        dfs(root.left);
        inOrderRst.push(root.val);
        dfs(root.right);
    }

    dfs(root);

    const dummyNode = new TreeNode(-1);
    let currNode = dummyNode;

    for (const value of inOrderRst) {
        currNode.right = new TreeNode(value);
        currNode = currNode.right;
    }
    return dummyNode.right;
};