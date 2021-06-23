/**
 * 21. 合并两个有序链表
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * 
 * 
 * 其他题意相关题目 
 * 23. 合并K个升序链表mergeKLists  https://leetcode-cn.com/problems/merge-k-sorted-lists/
 * 88. 合并两个有序数组 merge
 * 
 * @param {*} list1 
 * @param {*} list2 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 解法1:递归
 * 时间复杂度：O(n+m)，其中 n 和 m 分别为两个链表的长度
 * 空间复杂度：O(n+m)
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    if (list1 === null) {
        return list2;
    } else if (list2 === null) {
        return list1;
    } else if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};

/**
 * 解法2:迭代（推荐）
 * 时间复杂度：O(n+m)，其中 n 和 m 分别为两个链表的长度
 * 空间复杂度：O(1)
 * 
 * @param {*} l1 
 * @param {*} l2 
 */
var mergeTwoLists2 = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            // 下一个节点指向l1，l1前进一个节点
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        
        // 指针前进
        prev = prev.next;
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};
