/**
 * 124. 二叉树中的最大路径和
 * 
 * 困难
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

        // 和0比较是因为如果左或右子树的最大贡献值为负数，则可以不计算此贡献值
        const left = Math.max(0, getMax(root.left));
        const right = Math.max(0, getMax(root.right));

        // “根+左+右”
        // 最大贡献值不一定会经过根节点，最大贡献值是在整个递归遍历树的过
        // 程中进行更新的，getMax方法返回的结果跟最后所求的最大路径和没关系
        res = Math.max(res, root.val + left + right);

        // 返回某个节点左或右最大的路径和
        return root.val + Math.max(left, right);
    }

    getMax(root);

    return res;
}
