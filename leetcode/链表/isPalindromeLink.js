/**
 * 234 回文链表
 * 
 * 简单
 * 
 * 寻找回文串的核心思想是从中心向两端扩展
 * 
 * 因为回文串长度可能为奇数也可能是偶数，长度为奇数时只存在一个中心点，而长度为偶数时存在两个中心点
 * 
 * 最简单的方法：把原始链表反转存入一条新的链表，然后比较这两条链表是否相同
 * 
 * 借助二叉树后序遍历的思路，不需要显式反转原始链表也可以倒序遍历链表
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let left = head;

    this.traverse = function (right) {
        if (right == null) {
            return true;
        }
        let res = traverse(right.next);
        // 后序遍历代码
        res = res && (right.val == left.val);
        left = left.next;
        return res;
    }

    return traverse(head);
};

// TODO
function test() {
    let head = new ListNode(1);
    let node1 = new ListNode(2);
    let node2 = new ListNode(3);
    let node3 = new ListNode(2);
    let node4 = new ListNode(1);
    head.next = node1;
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;

    console.log(head);

    console.log(isPalindrome(head));
}
test();
