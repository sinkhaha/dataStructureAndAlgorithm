/**
 * 剑指 Offer II 026. 重排链表
 * 中等
 * https://leetcode.cn/problems/LGjMqU/
 * 
 * 解法：寻找链表中点 + 链表逆序 + 合并链表
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    // 找链表的中点  
    let mid = middleNode(head);

    let l1 = head;
    let l2 = mid.next;
    mid.next = null; // 拆分前后两部分

    l2 = reverseList(l2); // 反转后半部分

    mergetList(l1, l2); // 合并l1和l2
};

const middleNode = (head) => {
    let slow = head;
    let fast = head;

    // 双数是靠前的一个节点,单数是最中间的节点
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// 反转链表
const reverseList = (head) => {
    let pre = null;
    let cur = head;
    while (cur != null) {
        const next = cur.next;
        cur.next = pre;

        pre = cur;
        cur = next;
    }

    return pre;
}

// 合并链表
const mergetList = (l1, l2) => {
    let l1_tmp;
    let l2_tmp;

    while (l1 != null && l2 != null) {
        l1_tmp = l1.next;
        l2_tmp = l2.next;

        l1.next = l2;
        l1 = l1_tmp;

        l2.next = l1;
        l2 = l2_tmp;
    }
}