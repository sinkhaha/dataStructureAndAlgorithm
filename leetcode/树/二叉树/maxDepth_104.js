/**
 * 104. 二叉树的最大深度
 * 
 * 简单
 * 
 * 对应相反的题目是111题
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 广度优先解法
 * 
 * 时间复杂度O(N),N为节点数
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }

    let maxDeep = 0;
    let queue = [root];

    while(queue.length) {
        let n = queue.length;
        // 一层一层遍历
        for (let i = 0; i < n; i++) {
            const curNode = queue.shift();
            if (curNode.left) queue.push(curNode.left);
            if (curNode.right) queue.push(curNode.right);
        }
        maxDeep++;
    }
    
    return maxDeep;
};

/**
 * 递归解法
 * @param {*} root 
 */
var maxDepth2 = function(root) {
    if (root == null) {
        return 0;
    }
    
    // 分治-递归
    return 1 + Math.max(maxDepth2(root.left), maxDepth2(root.right));
}
