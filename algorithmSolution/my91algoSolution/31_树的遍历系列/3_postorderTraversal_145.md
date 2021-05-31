### 题目
**145. 二叉树的后序遍历**
>中等

https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

### 解法1:递归

#### 思路
递归：左子树 - 右子树 - 根节点

#### 代码
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    let result = [];

    this.postOrder = function(root) {
        if (root == null) {
            return;
        }
        postOrder(root.left);
        postOrder(root.right);
        // 后序遍历位置
        result.push(root.val);
    } 
    
    postOrder(root);
    return result;
};
```
#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点数
* 空间复杂度：O(n)，递归栈的深度，最坏时树退化成链表是O(n)

### 解法2:迭代
#### 思路
和144题前序遍历的迭代解法差不多

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
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    const stack = [root];
    const res = [];

    while (stack.length > 0) {
        const node = stack.pop();
        if (node) {
            stack.push(node.left, node.right);
            res.unshift(node.val);
        }
    }
    return res;
};
```

#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点数
* 空间复杂度：O(n)，为stack栈的空间，平均情况下为 O(logn)，最坏情况下树退化成链表为 O(n)