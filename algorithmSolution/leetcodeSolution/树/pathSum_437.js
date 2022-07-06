/**
 * 437. 路径总和 III
 * 中等
 * https://leetcode.cn/problems/path-sum-iii/
 * 
 * 解法：深度优先搜索
 * 
 * 时间O(N^2) 
 * 空间O(N) 
 * 
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
    if (root == null) {
        return 0;
    }

    let result = rootSum(root, targetSum);

    // 
    result += pathSum(root.left, targetSum);
    result += pathSum(root.right, targetSum);

    return result;
};

// 表示以节点 root 为起点向下且满足路径总和为 targetSum 的路径数目
const rootSum = (root, targetSum) => {
    let ret = 0;

    if (root == null) {
        return 0;
    }

    let val = root.val;
    if (val == targetSum) {
        ret++;
    }

    ret += rootSum(root.left, targetSum - val);
    ret += rootSum(root.right, targetSum - val);
    return ret;
}