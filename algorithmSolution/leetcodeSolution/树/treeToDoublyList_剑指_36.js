/**
 * 剑指 Offer 36. 二叉搜索树与双向链表
 * 中等
 * https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/
 * 
 * 解法：中序遍历 + dfs
 */
/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
    if (!root) {
        return null;
    }

    let pre = null;
    let head = null; // 双向链表的头节点

    // 在中序遍历处做处理
    const dfs = (cur) => {
        if (!cur) {
            return;
        }

        // 左子树
        dfs(cur.left);

        // 构建链表

        if (pre != null) {
            pre.right = cur;
            cur.left = pre;
        } else { // pre为空，说明是此时正访问链表头节点
            head = cur;
            cur.left = pre;
        }

        pre = cur;

        // 右子树
        dfs(cur.right);
    }

    dfs(root);

    // 中序遍历完成后，head指向头节点， pre指向尾节点，修改 head 和 pre 的双向节点引用即可
    head.left = pre;
    pre.right = head;

    return head;
};