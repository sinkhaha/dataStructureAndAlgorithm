/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 * 简单
 * https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
    // 时间O(n) 空间O(1)
    // 当总节点数为n，输出倒数第k个节点后到链表，即找到 n - k + 1个节点即可

    if (!head) {
        return head;
    }

    // 计算总节点数
    let n = 0;
    let dummyHead = head;
    while (dummyHead !== null) {
        dummyHead = dummyHead.next;
        n = n + 1;
    }

    let j = n - k;
    let p = head;
    while (j > 0) {
        p = p.next;
        j--;
    }

    return p;
};