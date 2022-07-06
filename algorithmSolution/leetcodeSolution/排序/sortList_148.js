/**
 * 148. 排序链表
 * 中等
 * https://leetcode.cn/problems/sort-list/
 * 
 * 解法：自顶向下归并排序
 * 
 * 参考官方题解
 * 
 * 时间O(nlogn)
 * 空间O(logn)
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
var sortList = function (head) {
    return toSortList(head, null);
};

const toSortList = function (head, tail) {
    // head为空
    if (head === null) {
        return head;
    }

    // head只有一个节点
    if (head.next === tail) {
        head.next = null;
        return head;
    }

    // 快慢指针 找出head的中点
    let slow = head;
    let fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }

    const mid = slow;
    // 从中间分开，归并
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

// 归并
const merge = function (head1, head2) {
    const dummyHead = new ListNode(0);

    let temp = dummyHead;
    let temp1 = head1;
    let temp2 = head2;

    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}