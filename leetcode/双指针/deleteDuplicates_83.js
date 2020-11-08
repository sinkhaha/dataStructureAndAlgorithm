/**
 * 83 删除排序链表中的重复元素
 * 简单
 * 
 * 解法类似26题
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (head == null) {
        return null;
    }
    
    let slow = head;
    let fast = head.next;
    while (fast != null) {
        if (fast.val != slow.val) {
            slow.next = fast;
            slow = slow.next;
            fast = fast.next;
        } else {
            fast = fast.next;
        }
    }

    // 断开与后面重复元素的连接
    slow.next = null;
    return head;
};

const head = new ListNode(1);
const node1 = new ListNode(1);
const node2 = new ListNode(2);
head.next = node1;
node1.next = node2;
console.log(deleteDuplicates(head));
