### 题目
**94. 二叉树的中序遍历**
>中等

https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

### 解法1:递归
#### 思路
中序遍历：左子树-根节点-右子树

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
var inorderTraversal = function(root) {
    let result = [];
    this.inOrder = function(root) {
        if (root == null) {
            return;
        }
        inOrder(root.left);
        // 中序遍历位置
        result.push(root.val);
        inOrder(root.right);
    }
    inOrder(root);
    return result;
};
```
#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点数
* 空间复杂度：O(n)，递归栈的深度，最坏时树退化成链表是O(n)


### 解法2:迭代
#### 思路
* 把root入栈，`root.left`入栈，`root.left.left `入栈...，直到遍历到最深层的叶子左节点
* 接着将栈顶元素弹出，放入结果数组中
* 如果该元素没有右子节点，说明这是个左叶子节点，最后root为null，下一次迭代就直接把其父节点放入结果中
* 如果该元素有右子节点，说明这是个父节点，最后root为右子节点，此时重复以上步骤

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
var inorderTraversal = function (root) {
    const stack = [];
    const result = [];

    while (root || stack.length > 0) {
        // 先把当前节点的左节点入栈，及root.left，root.left.left，......
        while (root) {
            stack.push(root);
            root = root.left;
        }

        root = stack.pop();
        result.push(root.val);
        root = root.right;
    }
    return res;
};
```
#### 复杂度
* 时间复杂度：O(n)，n 为二叉树节点的个数
* 空间复杂度：O(n)，取决于栈深度，在二叉树退化为链的情况下会达到 O(n)

