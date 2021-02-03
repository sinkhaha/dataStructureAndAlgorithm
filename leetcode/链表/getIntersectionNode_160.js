/**
 * 160. 相交链表
 * 
 * 简单
 * 
 * 参考 https://github.com/sinkhaha/my91algo/blob/master/solution/10_getIntersectionNode_160.md
 */
/**
 * 链表节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 解法1: set集合法
 * 
 * 时间O(m) n为Max(len(headA), len(headB))
 * 空间O(n) n为放到set集合的链表的长度
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode1 = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    
    let set = new Set();

    while (headA) {
        set.add(headA);
        headA = headA.next;
    }

    while(headB) {
        if (set.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }

    return null;
};

/**
 * 解法2: 统计法
 * 
 * 时间O(n) n为Max(len(headA), len(headB))
 * 空间O(1)
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode2 = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    let lenA = getLength(headA);
    let lenB = getLength(headB);
    
    while (lenA !== lenB) {
        if (lenA > lenB) {
            headA = headA.next;
            lenA--;
        } else {
            headB = headB.next;
            lenB--;
        }
    }

    while (headA != headB) {
        headA = headA.next;
        headB = headB.next;
    }

    return headA;
};
// 获取链表的长度
var getLength = function (head) {
    let len = 0;
    while(head) {
        head = head.next;
        len++;
    }
    return len;
}

/**
 * 解法3:双指针法
 * 
 * 时间O(m+n) m和n分别为两个链表的长度
 * 空间O(1)
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode3 = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    let pA = headA;
    let pB = headB;

    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }

    return pA;
};
