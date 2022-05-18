## 题目
**987. 二叉树的垂序遍历**
>中等

给定二叉树，按垂序遍历返回其结点值。

对位于 (X, Y) 的每个结点而言，其左右子结点分别位于 (X-1, Y-1) 和 (X+1, Y-1)。

把一条垂线从 X = -infinity 移动到 X = +infinity ，每当该垂线与结点接触时，我们按从上到下的顺序报告结点的值（ Y 坐标递减）。

如果两个结点位置相同，则首先报告的结点值较小。

按 X 坐标顺序返回非空报告的列表。每个报告都有一个结点值列表。

 

示例 1：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/987_1.PNG)

```
输入：[3,9,20,null,null,15,7]
输出：[[9],[3,15],[20],[7]]

解释： 
在不丧失其普遍性的情况下，我们可以假设根结点位于 (0, 0)：
然后，值为 9 的结点出现在 (-1, -1)；
值为 3 和 15 的两个结点分别出现在 (0, 0) 和 (0, -2)；
值为 20 的结点出现在 (1, -1)；
值为 7 的结点出现在 (2, -2)。
```
示例 2：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/987_2.png)

```
输入：[1,2,3,4,5,6,7]
输出：[[4],[2],[1,5,6],[3],[7]]
解释：
根据给定的方案，值为 5 和 6 的两个结点出现在同一位置。
然而，在报告 "[1,5,6]" 中，结点值 5 排在前面，因为 5 小于 6。
```

提示：

树的结点数介于 1 和 1000 之间。
每个结点值介于 0 和 1000 之间

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



## 解法：遍历+排序

### 思路
题目的意思是遍历所有的节点，然后对所有对节点进行`排序`

* 每个节点对应一个坐标，遍历树并保存下每个节点的坐标值和节点值，当前节点坐标为`(x, y)`，则其左子节点为`(x-1, y+1)`，其右子节点为`(x+1, y+1)`

* 对x进行升序排序，x相同的对y进行降序排序，y相同的对val进行升序排序

* 把x相同的val分成一组

  

这里坐标的定义跟示例不一样(坐标轴的值不一样)，不同的定义最后得出的树的节点坐标都不同，最后只要按题目的规则(`从左到右，从上到下，相同坐标根据值排序`)求解即可



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
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    if (!root) {
        return [];
    }

    // 二维数组 存坐标和值，形式如 [[x, y, val], [...]]
    let locationList = []; 

    // 先dfs前序遍历记录下节点坐标和值
    const dfs = function(root, x, y) {
        if (!root) {
            return;
        }
        locationList.push([x, y, root.val]);
        dfs(root.left, x - 1, y - 1);
        dfs(root.right, x + 1, y - 1);
    }
    dfs(root, 0, 0);
    
    // 按照x升序，y降序，val升序
    locationList = locationList.sort((a, b) => {
        if(a[0] != b[0]) {
            return a[0] - b[0];
        }
        if (a[1] != b[1]) {
            return b[1] - a[1]
        }
        return a[2] - b[2];
    });
    
    // curValOfX当前遍历的节点的x的值，默认先取第一个节点的x值
    let curValOfX = locationList[0][0];
    let result = [[locationList[0][2]]];

    // 从第2个节点开始遍历坐标数组，把x相同的val分成一组
    for (let i = 1; i < locationList.length; i++) {
        let location = locationList[i];
        let x = location[0];
        if (x == curValOfX) {
            let last = result[result.length - 1];
            last.push(location[2]);
        } else {
            curValOfX = x;
            result.push([location[2]]); 
        }
    }
    return result;
};
```

### 复杂度
* 时间复杂度：O(NlogN)，N是树的节点个数
* 空间复杂度：O(N)
