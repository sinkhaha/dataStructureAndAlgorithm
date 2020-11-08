/**
 * 102. 二叉树的层序遍历
 * 
 * 中等
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 
 * 广度优先解法
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root == null) {
        return [];
    }

    let result = [];
    let queue = [root];

    while (queue.length) {
        let levelSize = queue.length;

        // 当前层级的结果
        let curLevelResult = [];

        // 遍历当前层级的结果
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            curLevelResult.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(curLevelResult);
    }

    return result;
};

/**
 * 深度优先解法
 * @param {*} root 
 */
var levelOrder1 = function (root) {
    if (root == null) {
        return [];
    }
    
    let result = [];
    this.dfs = function(node, level) {
        if (node == null) {
            return;
        }

        // 当前行没有结果，则初始化空数据，即行
        const n = result.length;
        if (n < level + 1) {
            result.push([]);
        }

        result[level].push(node.val);
        this.dfs(node.left, level + 1);
        this.dfs(node.right, level + 1);
    }
    this.dfs(root, 0);
    return result;
}
