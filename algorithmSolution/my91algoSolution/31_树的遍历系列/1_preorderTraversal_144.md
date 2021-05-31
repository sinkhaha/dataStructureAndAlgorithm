### 题目
**144. 二叉树的前序遍历**
>中等

https://leetcode-cn.com/problems/binary-tree-preorder-traversal/

### 解法1：递归
#### 思路
前序遍历：根节点—左子树—右子树

* 递归，当前root节点不为空时，先将 root 节点的值加入结果
* 递归调用 `preOrder(root.left) `来遍历 root 节点的左子树
* 递归调用` preOrder(root.right) `来遍历 root 节点的右子
* 递归终止的条件为`空节点`

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
var preorderTraversal = function(root) {
    let result = [];
   
    this.preOrder = function(root) {
        if (root == null) {
            return;
        }
        // 前序遍历位置
        result.push(root.val);
        preOrder(root.left);
        preOrder(root.right);
    }

    preOrder(root);
    return result;
};
```
#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点数
* 空间复杂度：O(n)，为递归栈的深度，平均情况下为 O(logn)，最坏情况下树退化成链表，为 O(n)
* 
### 解法2：迭代
#### 思路
* 维护一个栈，先把root入栈
* 当栈不为空时，弹出栈顶元素 node，把node的值存在结果数组中，先把node的右节点放入栈中，再把左节点入栈
* 遍历直到栈为空时结束
  
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
 * 迭代
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = [];
    let stack = [root];

    while(stack.length) {
        let node = stack.pop();
        if (node) {
            result.push(node.val);
            // 左节点先遍历，所以放后面要先pop出
            stack.push(node.right);
            stack.push(node.left);
        }
    }

    return result;
};
```
#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点数
* 空间复杂度：O(n)，为stack栈的空间，平均情况下为 O(logn)，最坏情况下树退化成链表为 O(n)
