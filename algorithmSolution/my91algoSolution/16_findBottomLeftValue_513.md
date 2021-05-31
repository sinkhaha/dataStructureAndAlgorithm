### 题目
**513. 找树左下角的值**
>中等

给定一个二叉树，在树的最后一行找到最左边的值。

示例 1:
```
输入:

    2
   / \
  1   3

输出:
1
```

示例 2:
```
输入:

        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7

输出:
7
```

注意: 您可以假设树（即给定的根节点）不为 NULL

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-bottom-left-tree-value
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1:bfs(推荐)
#### 思路
bfs广度优先遍历，`遍历每一层时，找到最左边的节点`，最后一层时的最左边的节点即为结果值

#### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * bfs
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let queue = [root];
    let result = 0;

    while (queue.length) {
        // 每一层最左边的值
        result = queue[0].val;

        // 遍历树当前层的值
        for (let i = 0; i < queue.length; i++) {
            let node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) { 
                queue.push(node.right);
            }
        }
    }
    return result;
};
```
#### 复杂度
* 时间复杂度 O(n)，树的节点数
* 空间复杂度 O(n)，队列的长度，最坏情况下是当树为满二叉树，此时为O(n)

### 解法2:dfs
#### 思路
递归，记录该树`已经遍历过的最大深度maxDepth`，depth表示`当前层`，如果当前的深度大于树的最大深度，即`depth > maxDepth`，则说明遍历到了新的层，当前该节点是树最深的节点，此时更新树的最大深度值和结果值

#### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * dfs
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let result = 0;
    // 初始化最大深度为-1
    let maxDepth = -1;

    let dfs = function(root, depth) {
        // 结束遍历
        if (root == null) {
            return;
        }
        if (depth > maxDepth) {
            maxDepth = depth;
            result = root.val;
        }
        // 下一层递归
        dfs(root.left, depth + 1);
        dfs(root.right, depth + 1)
    }

    dfs(root, 0);
    return result;
};
```
#### 复杂度
* 时间复杂度 O(n)，树的节点数
* 空间复杂度 O(h)，h为树的高度，最快情况下，树退化成链表，此时为O(n)