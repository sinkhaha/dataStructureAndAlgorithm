/**
 * 19. 删除链表的倒数第N个节点
 * 
 * 中等
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * 
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 
 * 示例：
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 
 */
/**
 * 解法一：两次遍历实现
 * 
 * 可以容易地简化成另一个问题：
 * 删除从列表开头数起的第(L−n+1) 个结点，
 * 其中 L 是列表的长度。只要我们找到列表的长度 L
 * 
 * 思路：
 * 首先我们将添加一个哨兵结点作为辅助，该结点位于列表头部。
 * 哨兵结点用来简化某些极端情况，例如列表中只含有一个结点，或需要删除列表的头部。
 * (1)在第一次遍历中，我们找出列表的长度 L。
 * (2)然后设置一个指向哨兵结点的指针，并移动它遍历列表，直至它到达第(L−n) 个结点那里。
 * 我们把第(L−n) 个结点的 next 指针重新链接至第(L−n+2) 个结点后完成
 * 
 * 时间复杂度：O(n) // n为链表的长度
 * 空间复杂度：O(1)
 * 
 * @param {*} head 
 * @param {*} n 
 */
function removeNodeFromEnd1(head, n) {
    // 第一次遍历，求出链表的长度
    let length = 0;
    let first = head;
    while(first !== null) {
        length++;
        first = first.next;
    }
    console.log(`链表长度是${length}`);
    
    let findNodePosition = length - n; // 要找到第几个节点
    console.log(`要找到第${findNodePosition}个节点，删除它后面的节点`);

    // 哨兵节点
    const shaoHead = new ListNode(-1);
    shaoHead.next = head;

    // 第2次遍历
    let prev = shaoHead;
    while (findNodePosition > 0) {
        findNodePosition--;
        prev = prev.next;
    }
    console.log(`找到的节点是${prev.val}`);

    prev.next = prev.next.next;

    return shaoHead.next; // return head;
}

/**
 * 解法二：一次遍历实现（双指针）
 * 
 * 思路：上述算法可以优化为只使用一次遍历
 * 
 * 可以使用双指针
 * 1. 第一个指针从头向前移动 n+1 步后，此时第二个指针将从头出发，此时这两个指针被 n 个结点分开
 * 2. 接着两个指针同时向前移动保持这个恒定的间隔，直到第一个指针指向null时
 * 3. 此时第二个指针将指向从最后一个结点数起的第 n-1 个结点
 * 4. 最后把第二个指针的next指向下下个结点即可
 * 
 * 时间复杂度：O(n) // n为链表的长度
 * 空间复杂度：O(1)
 * 
 * @param {*} head 
 * @param {*} n 
 */
function removeNodeFromEnd2(head, n) {
    const shaoHead = new ListNode(-1);
    shaoHead.next = head;

    let first = shaoHead;
    let last = shaoHead;

    // 第一个指针向前走n+1步
    let step = n + 1;
    while(step > 0) {
        first = first.next;
        step--;
    }
    console.log(`first = ${first.val}, last=${last.val}`);

    // 此时第一个指针和第二个指针相隔n个节点，然后第一个指针和第二个指针同时移动一步，直到第1个指针指向null
    while(first !== null) {
        first = first.next;
        last = last.next;
    }

    // 当第一个指针为null时，第二个指针指向的是倒数的第n-1个节点
    console.log(`last = ${last.val}`);
    last.next = last.next.next;

    return shaoHead.next;
}

/** ================================================================== */

// 打印链表
function printList(head) {
    let str = head.val;
    let current = head;
    while (current.next !== null) {
        str += `  ${current.next.val}`;
        current = current.next;
    }
    return str;
}

/**
 * 节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// 测试
function test() {
    const list1 = new ListNode(1);
    const node1 = new ListNode(5);
    const node2 = new ListNode(8);
    const node3 = new ListNode(21);
    const node4 = new ListNode(6);
    const node5 = new ListNode(2);
    list1.next = node1;
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    console.log('链表是：' + printList(list1));

    let n = 3;
    // const result = removeNodeFromEnd1(list1, n);
    const result = removeNodeFromEnd2(list1, n);
    console.log(`链表删除倒数第${n}个节点后是：${printList(result)}`);
}
test();

