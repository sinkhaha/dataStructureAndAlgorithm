### 题目
**104. 二叉树的最大深度**
>简单

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例：**
给定二叉树 [3,9,20,null,null,15,7]，
```

    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: 递归
#### 思路
递归分别计算出左子树和右子树的高度，取其中度最大值加一即可

#### 代码
```javascript
/*
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    
    return 1 + Math.max(maxDepth2(root.left), maxDepth2(root.right));
}

```

#### 复杂度
* 时间复杂度：O(N)
* 空间复杂度：O(N) 递归栈空间

### 解法2: bfs广度优先(推荐)

#### 思路
树有多少层，即为深度，所以可以用广度优先遍历计算出层数

#### 代码
```javascript
/*
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }

    let maxDeep = 0;
    let queue = [root];

    while (queue.length) {
        let n = queue.length;
        // 一层一层遍历
        for (let i = 0; i < n; i++) {
            const curNode = queue.shift();
            if (curNode.left) queue.push(curNode.left);
            if (curNode.right) queue.push(curNode.right);
        }
        // 每遍历完一层，深度加1
        maxDeep++;
    }
    
    return maxDeep;
};

```

#### 复杂度
* 时间复杂度: O(N)， N为节点数
* 空间复杂度: 取决于队列存储的元素数量，最坏会达到 O(N)
