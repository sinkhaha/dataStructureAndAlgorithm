/**
 * 剑指 Offer 54. 二叉搜索树的第k大节点
 * 简单
 * https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
 * 
 * 解法：dfs
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
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
    if (!root) {
        return null;
    }

    let result = undefined;

    // 反向中序遍历 就是从大到小
    const dfs = (root) => {
        if (!root) {
            return;
        }

        // 说明已经找到第k大的数了，不需要遍历了
        if (result != undefined) {
            return;
        }

        dfs(root.right);

        k -= 1;

        if (k == 0) {
            result = root.val;
        }

        dfs(root.left);
    }

    dfs(root);

    return result;
};