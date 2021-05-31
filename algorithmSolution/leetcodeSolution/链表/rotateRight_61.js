/**
 * leetcode 61 旋转链表
 * 中等
 * https://leetcode-cn.com/problems/rotate-list/
 */

/**
 * 节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 
 * 整体思路：
 * 1. 先将链表闭合成环
 * 2. 找到新的链表尾节点断开这个环，返回新的链表新节点即可（新的链表头节点在新的链表尾节点后面）
 *
 * 怎样找到新的链表头和链表尾？
 * 1. 如果n>k,则新的链表尾节点在原链表的n-k-1位置
 * 2. 如果n<=k,则k可以改写成 k = (k / n) * n + k % n的形式(k/n是向下取整)，
 * 其中前面的部分(k / n) * n不影响最终的结果，因此只需要考虑 k%n 的部分，这个值一定比 n 小
 *
 * 总上，(关键点)
 * 新的链表尾节点是原链表的第 (n - k % n - 1) 个节点 
 * 新的链表头节点是原链表的第 (n - k % n) 个节点
 * 
 * 
 * 具体算法：
 * 1. 遍历原链表，找到原链表的尾节点，同时计算出节点总数n，
 * 尾节点的下一个节点指向原链表的头节点连成环，即tailNode.next = head
 * 
 * 2. 遍历原链表，找到新链表的尾节点，新的链表头是第 (n - k % n) 个节点，
 * 所以遍历到cur < (n - k % n)停止j即找到新的尾节点，
 * 此时的节点是新的尾节点newTailNode，
 * 此时新的头节点为newHead = newTailNode.next
 *
 * 3. 断开环 newTailNode.next = null，返回新的链表头即可newHead
 *
 *
 * 时间复杂度：O(N)，N 是链表节点的个数
 * 空间复杂度：O(1)
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (head == null || head.next == null) {
        return head;
    }

    // 1.找到原链表的尾节点 和 总的节点数
    let tailNode = head;
    let n = 1;
    while(tailNode && tailNode.next) {
        tailNode = tailNode.next;
        n++;
    }

    // 2.连成环
    tailNode.next = head;

    // 3.找到断开节点(即找新的链表尾节点)
    let cur = 1;
    let newTailNode = head;
    while (cur < (n - k % n)) { // 第(n-k%n)个节点是新的链表头
        newTailNode = newTailNode.next;
        cur++;
    }

    // 4. 新的头节点，即新的尾节点的next
    let newHead = newTailNode.next;
    // 5. 断开新的尾节点 和 新的头节点的连接
    newTailNode.next = null;

    return newHead;
};

