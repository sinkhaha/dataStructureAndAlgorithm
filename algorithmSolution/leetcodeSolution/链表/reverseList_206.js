
/**
 * leetcode 206 反转链表
 * 简单
 * https://leetcode-cn.com/problems/reverse-linked-list/
 */

/**
 * 实现方式一：反转链表(双指针)
 * 
 * 时间复杂度：O(n)，n 是列表的长度
 * 空间复杂度：O(1)
 * 
 * @param {*} head 链表
 */
function reverseList1(head) {
    // 空链表 或 只有一个节点的链表
    if (head === null || head.next === null) {
        return head;
    }

    // 双指针实现
    let prev = null;
    let curr = head;
    while(curr !== null) {
        const curNext = curr.next;
        // 反转
        curr.next = prev;
        // 双指针都向前移动
        prev = curr;
        curr = curNext;
    }

    // 当cur为null时，prev指向最后一个节点
    return prev;
}

/**
 * 实现方式二：递归实现反转链表
 * 
 * 时间复杂度：O(n)，n 是列表的长度
 * 空间复杂度：O(n)，由于使用递归，将会使用隐式栈空间，递归深度可能会达到 n 层
 * 
 * @param {*} head 假设为9->6->1->4->2
 */
function reverseList2(head) {
    // 递归的终止条件，递归到链表的最后一个将其指针反转
    if (head === null || head.next === null) {
        return head;
    }

    // 1、reverseList2(4)递归开始，
    // 9->6->1->4->2,此时head指向4，则结束，此时返回2，即newHead指向2
    const newHead = reverseList2(head.next);

    // 2、此时head为4，head.next为2，
    // head.next.next指向head，即4.next.next指向2，即2.next指向4
    // 此时是9->6->1->4<->2 (4.next还是指向2)
    head.next.next = head; // 5.next = 4 即5指向4， 4<-5

    // 3、断开4和2的连接，此时是9->6->1->4<->2，断开后即9->6->1->4<-2
    head.next = null;

    // 4、此时的newHead指向2，head指向4；
    return newHead;
    // 以此类推，所以整个过程是：
    // reverseList2(4)时head=4,此时返回的就是newHead=2，执行后是9->6->1->4<-2
    // reverseList2(1)时head=1,此时返回的中间变量就是newHead=4，执行后是9->6->1<-4<-2
    // reverseList2(6)时head=6,此时返回的中间变量就是newHead=1，执行后是9->6<-1<-4<-2
    // reverseList2(9)时head=9,此时返回的中间变量就是newHead=6，执行后是9<-6<-1<-4<-2
    // 最后head为null,退出返回newHead,newHead为2，
}

/**
 * 打印链表方法
 * @param {*} head 
 */
function printList(head) {
    let str = head.val;
    let current = head;
    while (current.next !== null) {
        str += `  ${current.next.val}`;
        current = current.next;
    }
    return str;
}

// 手动构造链表
let list = {
    val: 2,
    next: {
        val: 4,
        next: {
            val: 1,
            next: {
                val: 6,
                next: {
                    val: 9,
                    next: null
                }
            }
        } 
    }
}

console.log('原链表', printList(list));
list = reverseList1(list);
console.log('反转后', printList(list));
list = reverseList2(list);
console.log('反转后', printList(list));
