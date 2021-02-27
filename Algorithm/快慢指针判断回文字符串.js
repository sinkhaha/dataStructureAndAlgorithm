/**
 * 字符串是通过单链表来存储的，如何来判断是一个回文串呢？
 */

/**
 * 链表节点结构
 * @param {*} x 
 */
function ListNode(x){
    this.val = x;
    this.next = null;
}

/**
 * 判断是否是回文
 * @param {*} head 
 */
function isPalindrome(head) {
    if (head === null) {
        console.log(`链表为空`);
        return;
    }
    if (head.next === null) {
        return true;
    }
    // 记录中间节点的索引用于判断链表节点个数
    let index = 0;
    let slow = head;

    let fast = slow.next.next;
    console.log(`调试日志 ｜ 开始时slow是：${slow.val}, fast是：${fast.val}`);

    // 慢指针前进1步，快指针前进2步
    // 快指针为空时，此时慢指针指向了中间节点(奇数节点时指向中间节点，偶数节点时指向上中位数)
    while (fast != null) {
        index++;
        slow = slow.next;
        fast = fast.next && fast.next.next;
    }

    let middleNode = slow;
    console.log(`调试日志 ｜ 中间节点的值是：${middleNode.val}，中间节点的index是：${index}`);

    // 反转后半部分
    let lastPartStartNode = slow.next;
    lastPartStartNode = reverseList(lastPartStartNode);

    // 前半部分跟后半部分连接起来
    middleNode.next = lastPartStartNode;

    // 比较前后部分
    // 中间节点的索引是偶,则链表个数是奇,要从中间节点的后一位开始比较
    let isPalindrome = true;
    if (index % 2 === 0) {
        let start = head;
        let end = lastPartStartNode;
        while(start !== middleNode) {
            if (start.val !== end.val) {
                isPalindrome = false;
                break;
            } else {
                start = start.next;
                end = end.next;
            }
        }
    } else {
        let start = head;
        let end = lastPartStartNode;
        // 偶数,循环到中节点后一个节点停止
        while(start !== middleNode.next) {
            if (start.val !== end.val) {
                isPalindrome = false;
                break;
            } else {
                start = start.next;
                end = end.next;
            }
        }
    }

    // 复原后半部分逆序的链表
    lastPartStartNode = reverseList(lastPartStartNode);
    middleNode.next = lastPartStartNode;

    return isPalindrome;
}

/**
 * 反转链表
 * @param {*} head 
 */
function reverseList(head) {
    if (head === null || head.next === null) {
        return head;
    }

    let prev = null;
    let cur = head;
    let end = head.next;

    while (cur !== null) {
        cur.next = prev;
        prev = cur;
        cur = end;
        if (end !== null) {
            end = end.next;
        }
    }
    return prev;
}

/**
 * 打印链表
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

// 构造单链表
const listNode = new ListNode(1);
const listNode1 = new ListNode(2);
const listNode2 = new ListNode(3);
const listNode3 = new ListNode(2);
const listNode4 = new ListNode(1);

listNode.next = listNode1;
listNode1.next = listNode2;
listNode2.next = listNode3;
listNode3.next = listNode4;

console.log('链表：' + printList(listNode) +'   是否是回文：' + isPalindrome(listNode));
console.log('链表：' + printList(listNode));
