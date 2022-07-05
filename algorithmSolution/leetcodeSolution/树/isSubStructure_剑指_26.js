/**
 * 剑指 Offer 26. 树的子结构
 * 中等
 * https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/
 * 
 * 解法：递归
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
    // 递归
    if (!A || !B) {
        return false;
    }

    return isSame(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
};

// 判断A是否包含B
const isSame = function (A, B) {
    if (B == null) {
        return true;
    }

    // A遍历完了，B还没遍历完 或 A的值不等于B的值 说明不包含
    if (A == null || A.val != B.val) {
        return false;
    }

    return isSame(A.left, B.left) && isSame(A.right, B.right);
}