/**
 * 剑指 Offer II 029. 排序的循环链表
 * 中等
 * https://leetcode.cn/problems/4ueAj6/
 * 
 * 解法：链表
 * 
 * 时间O(n)
 * 空间O(1)
 */
/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
    const newNode = new Node(insertVal);

    // 1、head为空时，自己的next指向自己
    if (head == null) {
        newNode.next = newNode;
        return newNode;
    }

    // 2、 当head只有一个节点时，把新节点插到头节点后面
    if (head.next == head) {
        head.next = newNode;
        newNode.next = head;
        return head;
    }

    // 3、当head大于等于2个节点时
    // 双指针 找到可以插入到位置
    let curr = head;
    let next = head.next;
    while (next != head) {
        // (1)curr.val≤insertVal≤next.val，此时新节点介于循环链表中的两个节点之间，在curr和next之间插入新节点
        if (insertVal >= curr.val && insertVal <= next.val) {
            break;
        }
        // 当curr.val>next.val，此时curr和next分别是循环链表中的值最大的节点和值最小的节点，insertVal大于curr的节点值
        // (2)如果insertVal 大于 curr的节点值，则应该在curr的后面插入，即在curr和next之间插入新节点

        // (3)如果insertVal 小于 next 的节点值，则应该在next的前面插入，即在curr和next之间插入新节点

        if (curr.val > next.val) {
            if (insertVal > curr.val || insertVal < next.val) {
                break;
            }
        }

        // 同时向前移动一步
        curr = curr.next;
        next = next.next;
    }

    // 插入到curr和next之间
    curr.next = newNode;
    newNode.next = next;

    return head;
};