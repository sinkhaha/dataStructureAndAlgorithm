### 题目
**129. 求根到叶子节点数字之和**

>中等

给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

示例 1:
```
输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
```
示例 2:
```
输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
```

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: dfs深度优先搜索(推荐)
#### 思路
深度遍历

* 先计算`每个节点的父节点的路径和(从根节点到当前节点的父节点)`用preSum表示，根节点的preSum初始化为0
* 所以当前节点的路径和(从根节点到当前节点)可以求出来，即 `其父节点的路径和preSum * 10 + 当前节点的值`
* 一直递归到当前节点`没有左右子节点`或者`为空`时返回

比如示例1:
* 根节点为1，此时preSum为0，所以节点1的路径和为` 0 * 10 + 1 = 1`，此时以1节点为父节点的preSum为1
* 1的左节点为2，此时preSum为1，所以节点2的路径和为 `1 * 10 + 2 = 12`
* 1的其右节点为3，此时preSum为1，所以节点3的路径和为` 1 * 10 + 3 = 13`
* 此时2和3节点都没有子节点，所以结果为`12 + 13 = 25`

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
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    // 根节点的路径和preSum为0
    return dfs(root, 0);
};

/**
 * 深度优先遍历
 * @param {TreeNode} root
 * @param {number} preSum 父节点的路径之和
 */
var dfs = function(root, preSum) {
    if (root == null) {
        return 0;
    }
    
    // 当前节点的父节点的路径之和 * 10 + 当前节点的值 为 当前节点的路径和
    let sum = preSum * 10 + root.val;
    // 当前节点为没有子节点了，直接返回
    if (root.left == null && root.right == null) {
        return sum;
    } else {
        // 递归计算其左右子节点的和后相加
        return dfs(root.left, sum) + dfs(root.right, sum);
    }

}
```

#### 复杂度
* 时间复杂度：O(n), n 是二叉树的节点个数
* 空间复杂度：O(n), 主要取决于递归调用的栈空间，递归栈的深度等于二叉树的高度，最坏情况下，二叉树的高度等于节点个数，即退化成链表，所以空间复杂度为 O(n)
  
### 解法2: bfs广度优先搜索

#### 思路
逐层遍历(思路有点类似解法1的dfs)

* 用queue保存`遍历到的当前层的每个节点`，用一个`额外的数组rootToCurParentSum`来保遍历到的当前层节点中`每个节点的路径和`，即`从根节点到当前节点的路径和`数组
* 如果当前节点有左右子节点时，需要分别计算左右子节点的路径和 `（从根到当前节点的和 * 10 + 左或右子节点）`放入rootToCurParentSum中
* 如果当前节点没有左节点也没有右节点，则直接加上当前节点的路径和即可

比如示例1:

* queue=[1]，rootToCurParentSum=[1]，sum=0

* queue=[2, 3]， 因为`1 * 10 + 2 = 12`， ` 1 * 10 + 3 = 13`，所以rootToCurParentSum=[12, 13]，su m=0

* 2是叶子节点，所以sum=0+12=12， 3是叶子节点，所以sum=12+13=25

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
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    if (root == null) {
       return 0;
    }
    
    // 每层遍历的节点
    let queue = [root];
    // 存从根节点到当前层每个节点的路径的和
    let rootToCurParentSum = [root.val]; 
   
    let sum = 0;
    while(queue.length) {
        let node = queue.shift();
        
        // 从根节点到当前节点的路径和
        let num = rootToCurParentSum.shift();
        
        // 没有子节点，则加上当前节点的路径和即可
        if (node.left == null && node.right == null) {
            sum += num;
        } else {
            if (node.left != null) {
                queue.push(node.left);
                // 如果当前节点有左子节点时，（从根到当前节点的和num * 10 + 左子节点） 即为左子节点的路径和
                rootToCurParentSum.push(num * 10 + node.left.val);
            }
            if (node.right != null) {
                queue.push(node.right);
                rootToCurParentSum.push(num * 10 + node.right.val);
            }
        }
    }

    return sum;
};

```
#### 复杂度
* 时间复杂度：O(n)，n 是二叉树的节点个数
* 空间复杂度：O(n)，n 是二叉树的节点个数，空间复杂度主要取决于队列，每个队列中的元素个数不会超过 n