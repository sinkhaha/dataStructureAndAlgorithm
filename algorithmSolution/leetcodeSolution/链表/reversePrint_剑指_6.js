/**
 * 剑指 Offer 06. 从尾到头打印链表
 * 简单
 * https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/
 * 
 * 
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
 * @return {number[]}
 */
var reversePrint = function (head) {
    let list = [];
    // 遍历链表，存到数组，反转数组即可
    // 时间和空间都是o(n)
    let p = head;
    while (p) {
        list.push(p.val);
        p = p.next;
    }

    let rst = [];
    for (let i = list.length - 1; i >= 0; i--) {
        rst.push(list[i]);
    }

    return rst;
};