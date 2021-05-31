### 题目
**100. 相同的树**
>简单

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```
示例 2:
```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```
示例 3:
```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/same-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: 深度优先递归(推荐)
#### 思路
递归
* 如果两个树都为空，则两个树相同；
* 如果一个树为空，一个树不为空，即结构不同，则两个树一定不同； 
* 如果两个树都不为空，即结构相同，则判断它们的值是否相等
  > 如果值不相等，则不相同
  >
  > 如果值相等，则分别递归判断左右子树是否相同
#### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p == null && q == null) {
        return true;
    } else if (p == null || q == null) {
        return false;
    } else if (p.val != q.val) {
        return false;
    } else {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right); 
    }
};
```
#### 复杂度
* 时间复杂度 O(min(m,n)),m 和 n 分别是两个二叉树的节点数
* 空间复杂度 O(min(m,n)

### 解法2: 广度优先
#### 思路
`一层层遍历`比较节点，两棵树是否相同，先判断树的结构是否相同，结构相同则判断值是否相同，结构不同则两棵树不同。

用两个队列queue1和queue2分别存储两个二叉树`每一层的节点`，每次从两个队列各取出一个节点，进行以下操作：

* 比较两个节点curNode1和curNode2的值，如果两个节点的值`不相同`则两个二叉树一定不同

* 如果两个节点curNode1和curNode2的`值相同`，则判断两个节点的`子节点是否为空`，如果只有一个节点的左子节点为空，或者只有一个节点的右子节点为空，则两个二叉树的`结构不同`，两个二叉树一定不同

* 如果两个节点curNode1和curNode2的子节点的`结构相同`，则将两个节点的非空子节点分别加入两个队列，如果左右子节点都不为空，则先加入左子节点，后加入右子节点


#### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p == null && q == null) {
        return true;
    } else if (p == null || q == null) {
        return false;
    }

    let queue1 = [p]; // 存p树每一层的节点
    let queue2 = [q]; // 存q树每一层的节点
  
    while (queue1.length && queue2.length) {
        let curNode1 = queue1.shift();
        let curNode2 = queue2.shift();
        
        // 当前节点的值不相等一定不相等
        if (curNode1.val != curNode2.val) {
            return false;
        }

        let left1 = curNode1.left;
        let right1 = curNode1.right;
        let left2 = curNode2.left;
        let right2 = curNode2.right;
        // 子节点有一个为空一个不为空 说明 两个树结构不同 则一定不相同
        if ((left1 == null && left2 != null) || (left1 != null && left2 == null)) {
            return false;
        }
        // 也可以用异或运算判断，简洁点
        // if (left1 == null ^ left2 == null) {
        //    return false;
        // }
。
        if ((right1 == null && right2 != null) || (right1 != null && right2 == null)) {
            return false;
        }

        // 把下一层的非空节点放入queue
        if (left1) {
            queue1.push(left1);
        }
            
        if (right1) {
            queue1.push(right1);
        }

        if (left2) {
            queue2.push(left2);
        }

        if (right2) {
            queue2.push(right2);
        }
    }
    // 两个队列都为空则相同
    return queue1.length === 0 && queue2.length === 0;
};
```
#### 复杂度
* 时间复杂度 O(min(m,n)),m 和 n 分别是两个二叉树的节点数
* 空间复杂度 O(min(m,n)





### 解法3: 比较前序遍历和中序列遍历序列

#### 思路

树的`前序遍历`和`中序遍历`可以确定一棵树，所以`比较两个树的前序遍历结果和中序遍历结果`即可，注意空节点也要有个`占位标识别`

#### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    let preOrderP = preOrder(p).join('');
    let preOrderQ = preOrder(q).join('');

    let inOrderP = inOrder(p).join('');
    let inOrderQ = inOrder(q).join('');
    
    // 直接转成字符串比较即可
    return preOrderP == preOrderQ && inOrderQ == inOrderQ;
};

// 树的前序遍历
var preOrder = function (root, result = []) {
    if (root == null) {
        result.push('#'); // 空节点占位
        return result;
    }
    result.push(root.val);
    preOrder(root.left, result);
    preOrder(root.right, result);

    return result;
}

// 树的中序遍历
var inOrder = function(root, result = []) {
    if (root == null) {
        result.push('#'); // 空节点占位
        return result;
    }
    inOrder(root.left, result);
    result.push(root.val);
    inOrder(root.right, result);

    return result;
}
```



#### 复杂度

 * 时间复杂度O(N)， N 为二叉树的节点数
 * 空间复杂度O(N)

