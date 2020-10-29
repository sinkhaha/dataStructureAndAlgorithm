/**
 * 25 K 个一组翻转链表
 * 困难
 * 
 * 24 题目swapPairs 两个一组翻转链表 也可以用该解法，把k设置为2即可
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 递归
 * 
 * 1.先反转以 head 开头的 k 个元素
 * 2.将第 k + 1 个元素作为 head 递归调用 reverseKGroup 函数
 * 3.将上述两个过程的结果连接起来
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    if (head == null) {
        return null;
    }
    
    // 区间 [a, b) 包含 k 个待反转元素
    let a, b;
    a = b = head;
    for (let i = 0; i < k; i++) {
        // 不足 k 个，不需要反转，base case
        if (b == null) {
            return head;
        }
        b = b.next;
    }

    console.log('a', a);
    console.log('b', b);

    // 反转前 k 个元素
    let newHead = reverse(a, b);
    console.log('newHead', newHead);

    // 递归反转后续链表并连接起来
    a.next = reverseKGroup(b, k);
    console.log('aa', a);

    return newHead;
};

/**
 * 反转链表
 * 反转区间 [a, b) 链表的元素，左闭右开 
 * @param {*} a 
 */
function reverse(a, b) {
    let pre = null;
    let cur = a;
    let nxt = a;
    while (cur != b) {
        nxt = cur.next;
        // 逐个结点反转
        cur.next = pre;
        // 更新指针位置
        pre = cur;
        cur = nxt;
    }
    // 返回反转后的头结点
    return pre;
}

// 如链表：1->2->3->4->5
// 当 k = 2 时，应当返回: 2->1->4->3->5
// 当 k = 3 时，应当返回: 3->2->1->4->5
function test() {
    let head = new ListNode(1);
    let node1 = new ListNode(2);
    let node2 = new ListNode(3);
    let node3 = new ListNode(4);
    let node4 = new ListNode(5);
    head.next = node1;
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;

    // console.log(head);

    console.log(reverseKGroup(head, 2));
}
test();
