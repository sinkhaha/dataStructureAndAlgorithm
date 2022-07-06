/**
 * 剑指 Offer 18. 删除链表的节点
 * 简单
 * https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/
 * 
 * 解法：链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
    // 双指针 时间O(n) 空间O(1)
    if (head.val == val) {
        return head.next;
    }

    let pre = head;
    let cur = head.next;

    while (cur !== null) {
        if (cur.val == val) {
            pre.next = cur.next;
            break;
        } else {
            pre = cur;
            cur = cur.next;
        }
    }

    return head;
};