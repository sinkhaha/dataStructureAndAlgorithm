/**
 * Definition for singly-linked list.
 * 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
 }
 
/**
 * leetcode 86 分隔链表
 * 
 * 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
 * 你应当保留两个分区中每个节点的初始相对位置。
 *
 * 输入: head = 1->4->3->2->5->2, x = 3
 * 输出: 1->2->2->4->3->5
 *
 * 思路：
 *   遍历链表，两个指针维护两个链表，一个链表是存小于x的元素，一个链表是存大于等于x的元素，然后两个链表连接
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let lt = new ListNode(-1); // 小于x的链表
    let gt = new ListNode(-1); // 大于x的链表

    let before = lt; // 小于x移动的指针
    let after = gt; // 大于x移动的指针

    // 遍历链表，把元素分别放在lt和gt链表中
    while(head !== null) {
        const val = head.val;
        if (val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }
    // after是最后一个元素，所以其下一个值置为null
    after.next = null;

    // 拼接lt和gt两个链表，before此时指向了lt的最后一个元素，gt.next是跳过哨兵元素
    before.next = gt.next;
    
    // lt.next是因为lt的头一个哨兵元素是-1，需要返回-1后的第一个元素的链表
    return lt.next;
};

// head = 1->4->3->2->5->2, x = 3
const node1 = new ListNode(1);
const node2 = new ListNode(4);
const node3 = new ListNode(3);
const node4 = new ListNode(2);
const node5 = new ListNode(5);
const node6 = new ListNode(2);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
console.log(JSON.stringify(partition(node1, 3)));

