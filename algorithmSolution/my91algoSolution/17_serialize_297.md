## 题目
**297. 二叉树的序列化与反序列化**
>困难

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

示例: 
```
你可以将以下二叉树：

    1
   / \
  2   3
     / \
    4   5

序列化为 "[1,2,3,null,null,4,5]"
提示: 这与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
```
说明: 不要使用类的成员 / 全局 / 静态变量来存储状态，你的序列化和反序列化算法应该是无状态的。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




## 解法1: 前序遍历(dfs)
### 思路
* 序列化：使用二叉树的前序遍历，`空节点用#号代替`
* 反序列化：因为前序遍历后`根节点在最前面`，所以可以`找到根节点`，再分别构造左右子树
### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (root == null) {
        return '';
    }

    let res = [];
    const dfs = function(root) {
        if (root == null) {
            res.push('#');
            return;
        }

        // 前序遍历
        res.push(root.val);

        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);

    return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data == '#' || !data) {
        return null;
    }
    
    let nodeList = data.split(',');
    const buildTree = function(nodeList) {
        if (nodeList.length == 0) {
            return null;
        }
        const val = nodeList.shift();
        if (val == '#') {
            return null;
        }

        // 前序遍历的位置
        const root = new TreeNode(+val);
        root.left = buildTree(nodeList);
        root.right = buildTree(nodeList);

        return root;
    }

    return buildTree(nodeList);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

```

### 复杂度
**serialize()**

* 时间复杂度 O(N) N为二叉树的节点数
* 空间复杂度 O(h) h为二叉树的高度

**deserialize()**

* 时间复杂度 O(N) N为二叉树的节点数
* 空间复杂度 O(N) 

  
## 解法2: bfs
### 思路
1. 序列化：利用bfs一层层遍历，`空节点用#号代替`
2. 反序列化：bfs序列化后的字符串`第一个是根节点的值`，其他节点值都是成对的，对应左右子节点
>* 先把字符串转成数组
>* 先取出根节点的值，构造根节点放入队列中，使用cursor指向数组的第二个值开始扫描
>* 队列的第一个元素节点出队，分别取出其左右子节点的值（此时cursor指向它的左节点的值，cursor+1指向它的右节点的值），如果左右节点的值不等于#，则构造左右子节点，然后分别放入队列中
>* cursor前进2步，因为左右子节点是成对出现的，此时已经遍历过了

### 代码
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (root == null) {
        return '';
    }

    let queue = [root];
    let res = [];
    while(queue.length) {
        const node = queue.shift();
        if (!node) {
            res.push('#');
        } else {
            res.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data || data == '#') {
        return null;
    }
    
    let nodeValList = data.split(',');
    let root = new TreeNode(nodeValList[0]);
    let queue = [root];
     
    // 从第2个节点开始，即根节点的左子节点 
    let cursor = 1;
    while (cursor < nodeValList.length) {
        // 操作该节点的引用即可
        let node = queue.shift();
        if (!node) {
            return null;
        }

        // 左右子节点是成对出现的，所以最后cursor要向前移动2位
        let left = nodeValList[cursor];
        let right = nodeValList[cursor + 1];
        if (left !== '#') {
            const leftNode = new TreeNode(left);
            node.left = leftNode;
            queue.push(leftNode);
        }

        if (right !== '#') {
            const rightNode = new TreeNode(right);
            node.right = rightNode;
            queue.push(rightNode);
        }
        cursor += 2;
    }

    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

```

### 复杂度
**serialize()**

* 时间复杂度 O(N) N为二叉树的节点数
* 空间复杂度 O(q) q是队列的最大长度，最差是满二叉树，为N

**deserialize()**

* 时间复杂度 O(N) N为二叉树的节点数
* 空间复杂度 O(N) 


