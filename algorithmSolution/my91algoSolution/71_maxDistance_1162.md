## 题目
**1162. 地图分析**
>中等

你现在手里有一份大小为 N x N 的 网格 grid，上面的每个 单元格 都用 0 和 1 标记好了。其中 0 代表海洋，1 代表陆地，请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的。

我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：`(x0, y0)` 和 `(x1, y1)` 这两个单元格之间的距离是 `|x0 - x1| + |y0 - y1|` 。

如果网格上只有陆地或者海洋，请返回 -1。

 

示例 1：

```
输入：[[1,0,1],[0,0,0],[1,0,1]]
输出：2
解释： 
海洋单元格 (1, 1) 和所有陆地单元格之间的距离都达到最大，最大距离为 2。
```
示例 2：

```
输入：[[1,0,0],[0,0,0],[0,0,0]]
输出：4
解释： 
海洋单元格 (2, 2) 和所有陆地单元格之间的距离都达到最大，最大距离为 4。
```

提示：
1. `1 <= grid.length == grid[0].length <= 100`
2. `grid[i][j]` 不是 0 就是 1

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/as-far-from-land-as-possible
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法:bfs
### 思路
见注释

### 代码
```js
/**
 * bfs
 */
var maxDistance = function(grid) {
    let n = grid.length;
    let queue = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // 将所有陆地加入队列，而不是海洋，陆地不断扩展到海洋
            if (grid[i][j] == 1) {
                queue.push([i, j]);
            }
        }
    }

    let ans = -1;
    // 都是海洋 或 都是陆地
    if (queue.length === 0 || queue.length === n * n) {
        return ans;
    }
    
    // 方向数组
    let locations = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    while (queue.length != 0) {
        let len = queue.length;

        // 对每个陆地4个方向搜索
        for (let k = 0; k < len; k++) {
            let [x, y] = queue.shift();
            // 向该点的4个方向进行搜索
            for (let location of locations) {
                let nextI = x + location[0];
                let nextJ = y + location[1];

                // 合法 且 是海洋
                if (nextI >= 0 && nextI < n && nextJ >=0 && nextJ < n && grid[nextI][nextJ] == 0) { 
                    grid[nextI][nextJ] = 1; // 变为陆地
                    queue.push([nextI, nextJ]);
                }
            }
        }
        ans++;
    }
    return ans;
};

```
### 复杂度
* 时间复杂度O(n^2)
* 空间复杂度O(n^2)
