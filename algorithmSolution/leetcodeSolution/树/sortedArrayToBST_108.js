/**
 * 108. 将有序数组转换为二叉搜索树
 * 简单
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    // 递归 时间O(n) 空间O(logN)
    if (!nums || !nums.length) {
        return null;
    }

    // 树的中序遍历后就是升序数组，可以任选一个节点为根节点进行构造
    const dfs = (nums, left, right) => {
        if (left > right) { // 节点为空
            return null;
        }

        // 选中间位置左边的数字为根节点；也可以选择中间位置右边的数字为根节点，或者任意位置的数字为根节点
        const mid = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = dfs(nums, left, mid - 1);
        root.right = dfs(nums, mid + 1, right);

        return root;
    }

    return dfs(nums, 0, nums.length - 1);
};