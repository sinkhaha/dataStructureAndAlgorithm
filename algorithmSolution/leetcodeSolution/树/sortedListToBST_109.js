/**
 * 109. 有序链表转换二叉搜索树
 * 
 * 中等
 * https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * 
 * 快慢指针 + 递归-分治
 * 
 * 时间复杂度O(nlogn)，n是链表的长度
 * 空间复杂度O(logn)
 *
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    return buildTree(head, null);
};

var buildTree = function (head, tail) {
    if (!head || head === tail) {
        return null;
    }
    
    // 快慢指针 得到链表中间节点
    let fast = head;
    let slow = head;
    while (fast !== tail && fast.next !== tail) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 递归构造二叉树
    let val = slow.val;
    let root = new TreeNode(val);

    root.left = buildTree(head, slow);
    root.right = buildTree(slow.next, tail);

    return root;
}
