/**
 * 剑指 Offer II 028. 展平多级双向链表
 * 中等
 * https://leetcode.cn/problems/Qv1Da2/
 * 
 * 解法：dfs
 * 
 * 时间O(n) 
 * 空间O(n)
 */
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
    // 遍历链表，当前节点为node，如果child不为空，则先处理child指向的链表，处理完后再回溯到node

    // 为了能够将扁平化的链表插入node 与node 的下一个节点之间，我们需要知道扁平化的链表的最后一个节点last，随后进行如下的三步操作
    // 1、将node与node的下一个节点 next 断开
    // 2、将node与child 相连
    // 3、将last与next 相连

    const dfs = (node) => {
        let cur = node;
        let last = null; // 链表的最后一个节点

        while (cur) {
            let next = cur.next;
            // 有子节点，则先处理子节点
            if (cur.child) {
                const childLast = dfs(cur.child);

                next = cur.next;

                // 将node与child相连
                cur.next = cur.child;
                cur.child.prev = cur;

                if (next != null) {
                    childLast.next = next;
                    next.prev = childLast;
                }

                // 将child置为空
                cur.child = null;
                last = childLast;
            } else {
                last = cur;
            }

            cur = next;
        }

        return last;
    }

    dfs(head);
    return head;
};