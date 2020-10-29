/**
 * 24 两两交换链表中的节点
 * 
 * 中等
 * 
 * 
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 解法1: 递归
 * 
 * 
 * 时间复杂度：O(n)， n是链表节点数
 * 空间复杂度：O(n)
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs1 = function (head) {
    if (head === null || head.next === null) {
        return head;
    }

    const newHead = head.next;
    head.next = swapPairs(newHead.next);

    newHead.next = head;
    return newHead;
};

/**
 * 解法2:迭代
 * 
 * 时间复杂度：O(n)， n是链表节点数
 * 空间复杂度：O(1)
 * 
 * @param {*} head 
 */
var swapPairs2 = function(head) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }
    return dummyHead.next;
};

/**
 * 解法3: 可以用25题的解法，把k设置为2即可
 */