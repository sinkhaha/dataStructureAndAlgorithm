/**
 * 230. 二叉搜索树中第K小的元素
 * 中等
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    let i = 0;
    let result;

    const dfs = (root) => {
        if (root == null || i == k) {
            return;
        }

        dfs(root.left);

        i += 1;

        if (i == k) {
            result = root.val;
        }

        dfs(root.right);
    }

    dfs(root);

    return result;
};