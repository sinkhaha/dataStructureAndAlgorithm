/**
 * 剑指 Offer II 054. 所有大于等于节点的值之和
 * 中等
 * https://leetcode.cn/problems/w6cpku/
 * 
 * 解法：dfs + 中序遍历
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
var convertBST = function (root) {
    if (!root) {
        return root;
    }

    // 中序遍历是从小到大，倒序的中序遍历是从大到小

    let sum = 0;
    const dfs = (root) => {
        if (!root) {
            return;
        }

        dfs(root.right);

        // 中序
        const val = root.val;
        sum += val;

        root.val = sum;

        dfs(root.left);
    }

    dfs(root);

    return root;
};