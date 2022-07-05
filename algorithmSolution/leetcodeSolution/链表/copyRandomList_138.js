/**
 * 138. 复制带随机指针的链表
 * 中等
 * https://leetcode.cn/problems/copy-list-with-random-pointer/
 * 
 * 解法：链表
 */
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {

    // 参考https://leetcode.cn/problems/copy-list-with-random-pointer/solution/liang-chong-shi-xian-tu-jie-138-fu-zhi-dai-sui-ji-/
    // 1、先为每个节点创建一个新节点，把原节点跟新节点的关系保存到哈希表中
    // 2、遍历链表，为每个新节点设置next和random节点
    // 3、返回新节点即可
    // 时间O(n) 空间O(n)

    const map = new Map(); // key是原节点，value是新节点

    let p = head;
    while (p != null) {
        const newNode = new Node(p.val);
        map.set(p, newNode);
        p = p.next;
    }

    let q = head;
    while (q != null) {
        const newNode = map.get(q);

        // 为新节点设置next节点
        if (q.next) {
            newNode.next = map.get(q.next);
        }

        // 为新节点设置random节点 
        if (q.random) {
            newNode.random = map.get(q.random);
        }

        q = q.next;
    }

    return map.get(head); // 返回新的head节点即可
};