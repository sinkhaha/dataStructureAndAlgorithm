
/**
 * 链表节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// leetcode 141题
/**  判断单链表有环的2种方法 */
/**
* 快慢指针检查链表是否有环
* 
* 实现方式：在快指针快追上慢的，它们之间一定只差1个格子或2个格子。
*   如果快的落后1个，那么下一次就追上了；
*   如果快的落后2个，那么下一次就是落后1个，再下一次就能追上了
* 
* 时间复杂度O(n)
* 空间复杂度O(1)
* @param {*} head 
*/
function hasCycle1(head) {
   if (head === null || head.next === null) {
       return false
   }

   let slow = head;
   let fast = head.next; // 指向下一个节点

   while (slow !== fast) {
       if(fast === null || fast.next === null) {
           return false;
       }
       fast = fast.next.next; // 快指针走两步
       slow = slow.next; // 慢指针走一步
   }
   console.log(`相遇节点的值是：${fast.val}`);

   return true;
}

/**
* 哈希表检查单链表是否有环
* 
* 实现方式：循环链表把每个节点存在哈希表中，边循环链表边判断是否存在存哈希表中
*     存在则返回true
*     不存在则把节点放入哈希表
* 
* 时间复杂度O(n)
* 空间复杂度O(n)
* @param {*} head 
*/
function hasCycle2(head) {
   const map = new Map();

   while (head !== null) {
       if (map.has(head)) {
           return true;
       } else {
           map.set(head);
           head = head.next;
       }
   }
   return false;
}

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;

console.log('是否有环：' + hasCycle1(node1));
console.log('是否有环：' + hasCycle2(node1));


/**  变形问题1: 判断单链表有环,且求环的长度 */

/**
 * 变形问题1: 判断单链表有环,且求环的长度
 * 
 * 实现：
 * 快慢指针法中，两个指针的速度差为1；
 * 当两个指针在环的某个节点相遇时，快指针走了慢指针的2倍长度，
 * 此时慢指针走了n步，快指针走了2n步，而快指针比慢指针多走的n步即环的长度
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * @param {*} head 
 */
function hasCycleAndGetCycleLength(head) {
    if (head === null || head.next === null) {
        return -1;
    }

    let slow = head;
    let fast = head.next; // 指向下一个节点，快慢指针相差1，

    let count = 1; // 因为快慢指针相差1，所以从1开始

    while (slow !== fast) {
        if(fast === null || fast.next === null) {
            return -1;
        }
        fast = fast.next.next; // 快指针走两步
        slow = slow.next; // 慢指针走一步
        count += 1;
    }
    return count;
}

console.log('环的长度是：' + hasCycleAndGetCycleLength(node1));

/**  变形问题2: 判断单链表有环,且求出入环的的节点 */
/**
 * 和用哈希表判断链表是否有环一样，入环节点即相遇节点
 * @param {*} head 
 */
function hasCycleAndGetNode1(head) {
    const map = new Map();

    while (head !== null) {
        if (map.has(head)) {
            return head; // 有环，此时的节点为入环节点
        } else {
            map.set(head);
            head = head.next;
        }
    }
    return -1;
}

console.log('入环节点值是：' + hasCycleAndGetNode1(node1).val);
