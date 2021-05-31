/**
 * 24 两两交换链表中的节点
 * 
 * 中等
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 */
/**
 * 节点类
 * @param {*} val 
 * @param {*} next 
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * 解法1: 递归
 * 
 * 把链表两两分组，在每个组互换节点后，再连接起来
 * 
 * 每一次递归都要返回每组互换后的第一个节点给上个递归
 * 
 * 时间复杂度：O(n)， n是链表节点数
 * 空间复杂度：O(n)
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs1 = function (head) {
    // 结束条件 当前已经是链表的尾节点了 或 已经是链表的最后一个节点
    if (head === null || head.next === null) {
        return head;
    }

    // 先指向每组的下一个节点
    const newHead = head.next;

    // head是当前交换后的第二个节点，所以head.next指向递归交换的后半部分
    head.next = swapPairs1(newHead.next);

    // 交换每两个节点
    newHead.next = head;

    // 返回互相交换后的第一个节点，因为递归指向交换后的第一个节点
    return newHead;
};

/**
 * 解法2:迭代
 * 
 * 保存一个当前节点指针cur，该cur指向每次已经交换好的部分的第二个节点，
 * 循环交换后面的每两个节点，cur指针继续移动，直到最后一个节点或只剩一个节点后停止
 * 
 * 时间复杂度：O(n)， n是链表节点数
 * 空间复杂度：O(1)
 * 
 * @param {*} head 
 */
var swapPairs2 = function(head) {
    // 哨兵节点，指向头节点
    const dummyHead = new ListNode(0);
    dummyHead.next = head;

    // 当前节点（指向已经交换后的节点的第二个节点）
    let cur = dummyHead;
    // 不是尾节点 且 不是只剩下一个节点 则循环交换每两个节点
    while (cur.next !== null && cur.next.next !== null) {
        // 每组的第一个节点
        const node1 = cur.next;
        // 每组的第二个节点
        const node2 = cur.next.next;

        // 上一组的后一个节点指向交换后的第一个节点
        cur.next = node2;
        // 先指向后面待交换的节点，防止下面交换丢失引用
        node1.next = node2.next;

        // 交换
        node2.next = node1;
        // 当前节点指向交换后的第二个节点
        cur = node1;
    }

    return dummyHead.next;
};

/**
 * 解法3: 可以用25题的解法，把k设置为2即可
 */