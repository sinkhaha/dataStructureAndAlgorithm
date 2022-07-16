/**
 * 剑指 Offer II 053. 二叉搜索树中的中序后继
 * 中等
 * https://leetcode.cn/problems/P5rCT8/
 * 
 * 解法：中序遍历(迭代)
 * 
 * 时间O(n) 
 * 空间O(n)
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
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
    // 在中序遍历的过程中维护上一个访问的节点和当前访问的节点
    // 如果上一个访问的节点是节点 p，则当前访问的节点即为节点 p 的中序后继

    const stack = [];
    let pre = null;
    let cur = root;

    while (stack.length || cur) {
        while (cur) { // 寻找最左侧的节点
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();

        if (pre == p) {
            return cur;
        }

        pre = cur;
        cur = cur.right;
    }

    return null;
};