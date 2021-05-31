### 题目
**102. 二叉树的层序遍历**
>中等

https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

#### 解法1:迭代
#### 思路
bfs一层层遍历
#### 代码
```js
/**
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

```
#### 复杂度
* 时间复杂度：O(n)，n为树的节点数
* 空间复杂度：O(n)

### 解法2:递归
#### 思路
维护一个变量来标识当前遍历的深度

#### 代码
```js
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
var levelOrder = function (root, depth = 0, res = []) {
    if (!root) {
        return [];
    }

    res[depth] || (res[depth] = []);
    res[depth].push(root.val);

    levelOrder(root.left, depth + 1, res);
    levelOrder(root.right, depth + 1, res);

    return res;
};
```
#### 复杂度
* 时间复杂度：O(n), n 为二叉树的节点数
* 空间复杂度：O(n)