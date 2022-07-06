/**
 * 剑指 Offer 32 - III. 从上到下打印二叉树 III
 * 中等
 * https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
 * 
 * 解法：bfs
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) {
        return [];
    }

    // Z字形遍历
    // 时间O(n) 空间O(n)
    let result = [];
    let queue = [root];

    let isOrderLeftToright = true; // 表示从左到右

    while (queue.length) {
        const levelSize = queue.length;
        let curLevelRst = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // 决定插入的值是插入到数组头部 还是 数组尾部
            if (isOrderLeftToright) {
                curLevelRst.push(node.val);
            } else {
                curLevelRst.unshift(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        isOrderLeftToright = !isOrderLeftToright;
        result.push(curLevelRst);
    }

    return result;
};