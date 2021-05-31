## 题目
**814. 二叉树剪枝**
>中等

给定二叉树根结点 root ，此外树的每个结点的值要么是 0，要么是 1。

返回移除了所有不包含 1 的子树的原二叉树。

( 节点 X 的子树为 X 本身，以及所有 X 的后代。)
```
示例1:
输入: [1,null,0,0,1]
输出: [1,null,0,null,1]
 
解释: 
只有红色节点满足条件“所有不包含 1 的子树”。
右图为返回的答案。
```

```
示例2:
输入: [1,0,1,0,0,0,1]
输出: [1,null,1,null,1]
```

```
示例3:
输入: [1,1,0,1,1,0,1,0]
输出: [1,1,0,1,1,null,1]
```

说明:
* 给定的二叉树最多有 100 个节点。
* 每个节点的值只会为 0 或 1 。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-pruning
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：递归
### 思路
* 递归判断节点是否全部为0，如果全部为0，就返回null

### 代码
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
 * @return {TreeNode}
 */
var pruneTree = function(root) {
    if (!root) {
        return null;
    }
    
    let left = pruneTree(root.left);
    let right = pruneTree(root.right);

    // 节点都为0则返回null
    if (root.val != 1 && !left && !right) {
        return null;
    }

    // 如果root.left节点及其子节点全为0，则root.left置为null，进行减枝
    root.left = left;
    root.right = right;

    return root;
};
```

### 复杂度
* 时间复杂度：O(N)，N为二叉树节点数
* 空间复杂度：O(H)，H为二叉树的高度，递归栈的最大空间