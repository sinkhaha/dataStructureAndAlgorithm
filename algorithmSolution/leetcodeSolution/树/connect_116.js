/**
 * 116 填充每个节点的下一个右侧节点指针
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
 * 
 * 中等
 */

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if (root == null) {
        return null;
    }

    connectTwoNode(root.left, root.right);

    return root;
};

/**
 * 连接两个节点
 */
function connectTwoNode(node1, node2) {
    if (node1 == null || node2 == null) {
        return;
    }

    // 前序遍历位置，将传入的两个节点连接
    node1.next = node2;

    // 递归
    // 连接相同父节点的两个子节点
    connectTwoNode(node1.left, node1.right);
    connectTwoNode(node2.left, node2.right);

    // 连接跨越父节点的两个子节点
    connectTwoNode(node1.right, node2.left);
}

// FIXME
