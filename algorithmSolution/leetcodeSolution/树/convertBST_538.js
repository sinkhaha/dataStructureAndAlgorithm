/**
 * 538. 把二叉搜索树转换为累加树
 * 中等
 * https://leetcode.cn/problems/convert-bst-to-greater-tree/
 * 
 * 解法：反序中序遍历
 * 
 * 参考 https://leetcode.cn/problems/convert-bst-to-greater-tree/solution/shou-hua-tu-jie-zhong-xu-bian-li-fan-xiang-de-by-x/
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
    let sum = 0;

    const inOrder = (root) => {
        if (root == null) {
            return;
        }
        // 因为是反序中序遍历 所以先遍历右节点
        inOrder(root.right);

        sum += root.val;
        root.val = sum;

        inOrder(root.left);
    }

    inOrder(root);
    return root;
};