/**
 * 124. 二叉树中的最大路径和
 * 
 * 困难
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
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
 * @return {number}
 */
function maxPathSum(root) {
    let res = Number.MIN_SAFE_INTEGER;

    const getMax = (root) => {
        // 递归结束条件
        if (root == null) {
            return 0;
        }

        // 左右子树的和为负数的话，不计算，返回0
        const left = Math.max(0, getMax(root.left));
        const right = Math.max(0, getMax(root.right));

        // “根+左+右”
        // 节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值
        let sum = root.val + left + right;

        // 更新路径的最大和，因为最大和可以为不经过根节点的子树
        res = Math.max(res, sum);

        // 返回节点的最大贡献值
        return root.val + Math.max(left, right);
    }

    getMax(root);

    return res;
}
