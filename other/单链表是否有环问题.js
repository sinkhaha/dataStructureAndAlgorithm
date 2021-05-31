
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

/**
 * 使用快慢指针找出环的入环节点
 * 
 * 通过推导可以得出公式： 
 *    环外链表的长度 = 快慢指针第一次相遇点 + n-1次环的长度 (前提条件是快慢指针必须是在同个起点开始走)
 * 
 * 实现思路：当快慢指针第一次相遇时(此时快慢指针必须是在同个起点开始走)，只需要将其中一个指针移动到链表头部，
 * 另一个指针保持在第一次相遇位置，两个指针同时出发，且行进速度为一个节点，
 * 再次相遇点则为环的入口
 * 
 * @param {*} head 
 */
function hasCycleAndGetNode2(head) {
    if (head === null || head.next === null) {
        return -1;
    }

    let slow = head;
    let fast = head.next; // 指向下一个节点，注意这里快慢指针的起始点相差了1，和hasCycleAndGetNode3的区别

    while (slow !== fast) {
        if(fast === null || fast.next === null) {
            return -1;
        }
        fast = fast.next.next; // 快指针走两步
        slow = slow.next; // 慢指针走一步
    }

    // 此时快慢指针相遇，有环，使得其中一个指针指向头，另一个指针不变
    // 因为fast和slow的起始点相差了1，所以slow指向头时，需要把fast指向下一个元素，表示同时前进了一步
    slow = head;
    fast = fast.next; // FIXME: 和hasCycleAndGetNode3的区别

    while (fast !== slow) {
        // 快慢指针都同时只移动一步
        slow = slow.next;
        fast = fast.next;
    }
    // 此时再次相遇，指向的那个节点就是入环节点
    return slow; 
}

console.log('入环节点：' + hasCycleAndGetNode2(node1).val);

/**
 * 实现思路同hasCycleAndGetNode2，只不过
 * @param {*} head 
 */
function hasCycleAndGetNode3(head) {
    let fast = head;
    let slow = head; // 快慢指针指向同个起点

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        if(fast == slow){
            console.log(`相遇节点值是：${slow.val}`);
            // 其中一个指针指向不动，另一个指针指向头
            slow = head;
            while (fast !== slow) {
                // 快慢指针都同时只移动一步
                slow = slow.next;
                fast = fast.next;
            }
            // 此时再次相遇，指向的那个节点就是入环节点
            return slow; 
        }
    }

    return -1;
}
console.log('入环节点：' + hasCycleAndGetNode3(node1).val);
