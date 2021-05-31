 /**
 * 2. 两数相加
 * 中等
 * https://leetcode-cn.com/problems/add-two-numbers/
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 时间复杂度：O(max(m,n))
 * 空间复杂度：O(max(m,n))，m 和 n 分别表示 l1 和 l2 的长度
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(-1);

    let cur = dummy;

    // 进位，0或1
    let carry = 0;
    while (l1 || l2) {
        let value1 = l1 ? l1.val : 0;
        let value2 = l2 ? l2.val : 0;
        
        // 相加后的和
        let sum = value1 + value2 + carry;
        
        // 新的进位
        carry = Math.floor(sum/10); 

        // 除去进位后新的节点
        cur.next = new ListNode(sum%10); 
        
        cur = cur.next;

        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }

    // 链表完了，此时有进位，则在最后添加新的结点
    if (carry == 1) {
        cur.next = new ListNode(carry);
    }

    return dummy.next;
};