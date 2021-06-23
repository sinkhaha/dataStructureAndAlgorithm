
/**
 * 876. 链表的中间结点
 * https://leetcode-cn.com/problems/middle-of-the-linked-list/
 * 
 * 问题： 给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
 * （如果有两个中间结点，则返回第二个中间结点）
 * 
 * 输入：[1,2,3,4,5]
 * 输出：此列表中的结点 3
 *
 * 输入：[1,2,3,4,5,6]
 * 输出：此列表中的结点 4 
 * 
 */

/**
 * 解法1：数组法，利用数组下标的有序性
 * 
 * 思路：遍历一次链表，把n个值存在数组中，中间节点为数组下标n/2的元素
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * 
 * @param {*} head
 */
function middleNode1(head) {
    const arr = [];

    let prev = head;
    while (prev !== null) {
        arr.push(prev);
        prev = prev.next;
    }

    // 去掉小数部分，个数为偶数时，此时中间节点为中间的第二个
    const middleIndex = Math.trunc(arr.length/2);
    return arr[middleIndex];
}

/**
 * 解法2：单指针实现(两次遍历)
 * 
 * 思路：先遍历一次链表，计算出链表的元素个数n，
 *  第二次遍历，遍历到第 n/2 个元素（链表的首节点为第 0 个元素）时，将该元素返回即可
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} head 
 */
function middleNode2(head) {
    let prev = head;

    let length = 0;
    while(prev !== null) {
        length++;
        prev = prev.next;
    }
    
    let cur = head;
    let middleIndex = Math.floor(length/2); // 向下取整
    while (middleIndex > 0) {
        cur = cur.next;
        middleIndex--;
    }

    return cur;
}

/**
 * 解法3：快慢指针实现（推荐）
 * 
 * 实现思路：快指针和慢指针同时指向头节点，
 * 快指针每次走2步，慢指针每次走1步，当快指针走完时，此时慢指针指向的为中间节点
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} head 
 */
function middleNode3(head) {
    let fast = head;
    let slow = head;
    
    // 单数返回中间节点，偶数返回中间第2个节点
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
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
    // node4.next = node5;
    console.log('链表是：' + printList(list1));

    const result1 = middleNode1(list1);
    console.log(`中间节点是:${result1.val}`);

    const result2 = middleNode2(list1);
    console.log(`中间节点是:${result2.val}`);

    const result3 = middleNode3(list1);
    console.log(`中间节点是:${result3.val}`);
}
test();
