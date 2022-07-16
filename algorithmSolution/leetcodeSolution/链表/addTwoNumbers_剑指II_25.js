/**
 * 剑指 Offer II 025. 链表中的两数相加
 * 中等
 * https://leetcode.cn/problems/lMSNwu/
 * 
 * 解法：栈
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // 注意是从后往前加
    // 跟题目不一样 https://leetcode.cn/problems/add-two-numbers/ 是从前往后加

    // 栈
    let stack1 = [];
    let stack2 = [];

    let p1 = l1;
    while (p1) {
        stack1.push(p1.val);
        p1 = p1.next;
    }

    let p2 = l2;
    while (p2) {
        stack2.push(p2.val);
        p2 = p2.next;
    }

    let ans = null;
    let carry = 0; // 进位
    while (stack1.length || stack2.length || carry != 0) {
        let a = stack1.length ? stack1.pop() : 0;
        let b = stack2.length ? stack2.pop() : 0;
        let sum = a + b + carry;

        carry = Math.floor(sum / 10);

        let curNode = new ListNode(sum % 10);
        curNode.next = ans;
        ans = curNode;
    }

    return ans;
};