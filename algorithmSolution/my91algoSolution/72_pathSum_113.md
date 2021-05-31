## 题目
**113. 路径总和 II**
>中等

给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

说明: 叶子节点是指没有子节点的节点。

示例:
给定如下二叉树，以及目标和 sum = 22，
```
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
```
返回:
```
[
   [5,4,11,2],
   [5,8,4,5]
]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法:深度优先搜索
### 思路
* 深度优先搜索枚举每一条从根节点到叶子节点的路径
* 当遍历到叶子节点，则判断路径和是否为目标和，是即找到了一条满足条件的路径
* 当不是叶子节点则递归遍历左右子节点

### 代码
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 
 * 
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let res = [];
    /**
     * 
     * @param {*} root 
     * @param {*} path 当前路径
     * @param {*} treeSum 当前路径和
     */
    var dfs = function(root, path, treeSum) {
        // 终止条件
        if (!root) {
            return;
        }
        
        // 选择
        path.push(root.val);
        treeSum += root.val;

        // 叶子节点，判断是否等于目标结果
        if (!root.left && !root.right) {
            if (treeSum == sum) {
                res.push(path.slice());
            }
        } else {
            // 递归左右子树
            dfs(root.left, path, treeSum);
            dfs(root.right, path, treeSum);
        }
        
        // 撤销
        path.pop();
    }
    
    dfs(root, [], 0);
    return res;
};
```
### 复杂度
* 时间复杂度：O(N^2)，N为树的节点数
* 空间复杂度：O(N)
