/**
 * 142. 环形链表 II
 * 
 * 中等 
 * 
 * 判断单链表有环,且求出入环的的节点,无环返回null
 */

/**
 * 链表节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;

/**
 * 解法1:哈希法
 * 遍历链表中的每个节点，并将保存到set，如果下次遇到了遍历过的节点，说明链表中存在环，此时的节点为入环节点
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * @param {*} head 
 */
function detectCycle1(head) {
    const visited = new Set();

    while (head !== null) {
        if (visited.has(head)) {
            return head; // 有环，此时的节点为入环节点
        } else {
            visited.add(head);
            head = head.next;
        }
    }
    return null;
}

console.log('入环节点值是：' + detectCycle1(node1).val);

/**
 * 
 * 使用快慢指针方式找出环的入环节点
 * 
 * 通过推导可以得出公式： 
 *    环外链表的长度 = 快慢指针第一次相遇点 + n-1次环的长度 (前提条件是快慢指针必须是在同个起点开始走)
 * 
 * 实现思路：当快慢指针第一次相遇时(此时快慢指针必须是在同个起点开始走)，
 * 只需要将其中一个指针移动到链表头部，另一个指针保持在第一次相遇位置，
 * 两个指针同时出发，且行进速度为一个节点，再次相遇点则为环的入口
 * 
 */
/**
 * 解法2:快慢指针的解法
 * 
 * 注意：此时慢指针指向头节点，快指针指向下一个节点（和解法3的区别）
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} head 
 */
function detectCycle2(head) {
    if (head === null || head.next === null) {
        return null;
    }

    let slow = head;
    let fast = head.next; // 指向下一个节点，注意这里快慢指针的起始点相差了1，和解法3的区别

    while (slow !== fast) {
        if (fast === null || fast.next === null) {
            return null;
        }
        fast = fast.next.next; // 快指针走两步
        slow = slow.next; // 慢指针走一步
    }

    // 此时快慢指针相遇，有环，使得其中一个指针指向头，另一个指针不变
    // 因为fast和slow的起始点相差了1，所以slow指向头时，需要把fast指向下一个元素，表示同时前进了一步
    slow = head;
    fast = fast.next; // 和解法3的区别

    while (fast !== slow) {
        // 快慢指针都同时只移动一步
        slow = slow.next;
        fast = fast.next;
    }
    // 此时再次相遇，指向的那个节点就是入环节点
    return slow;
}

console.log('入环节点：' + detectCycle2(node1).val);

/**
 * 解法3:快慢指针的另一种代码实现(相比解法2简单易懂)
 * 
 * 此时快慢指针开始时都是指向头节点(和解法2的区别)
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} head 
 */
function detectCycle3(head) {
    let fast = head;
    let slow = head; // 快慢指针指向同个起点

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        if (fast == slow) {
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

    return null;
}

console.log('入环节点：' + detectCycle3(node1).val);
