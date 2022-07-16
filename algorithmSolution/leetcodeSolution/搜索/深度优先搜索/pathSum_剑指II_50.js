/**
 * 剑指 Offer II 050. 向下的路径节点之和
 * 中等
 * https://leetcode.cn/problems/6eUYwP/
 * 
 * 解法：dfs
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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    // dfs
    // 访问每一个节点node，检测以node为起始节点且向下延深的路径有多少种
    if (root == null) {
        return 0;
    }

    let ret = rootSum(root, targetSum);

    // 左子树 和 右子树递归
    ret += pathSum(root.left, targetSum);
    ret += pathSum(root.right, targetSum);
    return ret;
};

// 以节点root为起点向下 且 满足路径总和为targetSum的路径数目
const rootSum = (root, targetSum) => {
    let ret = 0;

    if (root == null) {
        return 0;
    }

    const val = root.val;
    if (val === targetSum) {
        ret++;
    }

    // 左子树 和 右子树递归搜索
    ret += rootSum(root.left, targetSum - val);
    ret += rootSum(root.right, targetSum - val);
    return ret;
}