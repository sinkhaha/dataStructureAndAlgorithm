/**
 * 328. 奇偶链表
 * 中等
 * https://leetcode.cn/problems/odd-even-linked-list/
 * 
 * 解法：链表
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    if (!head || !head.next) {
        return head;
    }

    // 偶数的头，用于最后拼接
    let ouHead = head.next;

    let ji = head;
    let ou = head.next;

    while (ou !== null && ou.next !== null) {
        ji.next = ou.next;
        ji = ji.next;

        ou.next = ji.next;
        ou = ou.next;
    }

    // 奇链表 拼接 偶链表
    ji.next = ouHead;

    return head;
};