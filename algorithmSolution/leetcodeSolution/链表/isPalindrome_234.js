/**
 * 234 回文链表
 * 
 * 简单
 * https://leetcode-cn.com/problems/palindrome-linked-list/
 * 
 * 寻找回文串的核心思想是 从中心向两端扩展
 * 
 * 因为回文串长度可能为奇数也可能是偶数，长度为奇数时只存在一个中心点，
 * 而长度为偶数时存在两个中心点
 * 
 * 最简单的方法：
 * 把原始链表反转存入一条新的链表，然后比较这两条链表是否相同
 * 
 * 也可以借助二叉树后序遍历的思路，不需要显式反转原始链表也可以倒序遍历链表
 * 
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 解法一：递归解法
 * 递归模仿双指针实现回文
 * 
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome1 = function (head) {
    let left = head;

    this.traverse = function (right) {
        if (right == null) {
            return true;
        }
        // 先递归压入栈
        let res = traverse(right.next);

        // 后序遍历代码
        // 从尾部出栈即右指针，跟左指针指向的值比较
        res = res && (right.val == left.val);
        left = left.next;
        return res;
    }

    return traverse(head);
};

/**
 * 解法二：
 * 快慢指针来找到链表的中点，从中点反转后面的链表，然后比较前后部分链表
 * 
 * 空间复杂度O(1)
 * 时间复杂度O(n)
 * 
 * @param {*} head 
 */
var isPalindrome2 = function (head) {
    // 快慢指针来找到链表的中点，slow 指针指向链表中点
    let slow, fast;
    slow = fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 如果fast指针没有指向null，说明链表长度为奇数，slow还要再前进一步
    if (fast != null) {
        slow = slow.next;
    }

    // 从slow开始反转后面的链表
    let left = head;
    let right = reverse(slow);

    // 然后比较左边和右边链表，相同即回文串
    while (right != null) {
        if (left.val != right.val) {
            return false;
        }
        left = left.next;
        right = right.next;
    }
    return true;
};

/**
 * 反转链表
 * @param {*} head 
 */
function reverse(head) {
    let pre = null, cur = head;
    while (cur != null) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

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

    console.log(isPalindrome1(head));
    console.log(isPalindrome2(head));
}
test();
