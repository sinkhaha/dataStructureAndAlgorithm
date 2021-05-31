## 题目
**778. 水位上升的泳池中游泳**
>困难

在一个 `N x N` 的坐标方格 grid 中，每一个方格的值 `grid[i][j]` 表示在位置 `(i,j)` 的平台高度。

现在开始下雨了。当时间为 t 时，此时雨水导致水池中任意位置的水位为 t 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

你从坐标方格的左上平台 `(0，0)` 出发。最少耗时多久你才能到达坐标方格的右下平台 `(N-1, N-1)`？


示例 1:
```
输入: [[0,2],[1,3]]
输出: 3
解释:
时间为0时，你位于坐标方格的位置为 (0, 0)。
此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
```

示例2:
```
输入: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
输出: 16
解释:
 0  1  2  3  4
24 23 22 21  5
12 13 14 15 16
11 17 18 19 20
10  9  8  7  6

最终的路线用加粗进行了标记。
我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
```

提示:
1. 2 <= N <= 50.
2. `grid[i][j] `位于区间 [0, ..., N*N - 1] 内。


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/swim-in-rising-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：二分查找 + dfs(递归实现)
### 思路
由题意可知，最大需要消耗的时间为`Max(grid[i][j])`，即所有方格中`高度最高的值`，此时一定可以游到最后一个节点，所以此时需要找到比这个时间小的一条可达路径；

可以使用二分查找，当花费时间为t时，判断是否可以找到一条从第`(0, 0)`节点游到`(n-1, n-1)`节点的路径，即是否有可达路径，此路径是否可达可以用深度优先来判断

* 先二分法查找出`中间水位mid`，判断花费和该水位一样的时间是否有可达路径
>刚开始查找左指针为`low = grid[0][0]`，
>
>右指针为`high = Max(grid[i][j])`，
>
>因为题目限制了方块最大高度值的范围`grid[i][j]位于区间[0, ... N*N - 1] 内`，
>
>所以可以直接让`high = n * n`，二分`mid = low + (high - low) / 2`
* 如果在mid时间内，找得到一条路从起点到终点(深度优先搜索)，则可以继续缩小查找的时间范围，在`[left, mid]`中继续查找
* 如果在mid时间内，不能找到一条路从起点到终点，则需要扩大查找的时间范围，在`[mid+1, right]`中继续查找
* 一直到左指针大于等于右指针，左指针指向的方块的值即为结果

### 代码
```js
/**
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
    let n = grid.length;
    let low = grid[0][0];
    let high = n * n; // 条件限制了grid[i][j] 位于区间 [0, ..., N*N - 1] 内

    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (!isCanSwim(mid, grid)) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};

/**
 * 在时间t是否可以游到最后一个节点
 * @param {*} t 
 * @param {*} grid 
 */
var isCanSwim = function (t, grid) {
    let n = grid.length;
    // n行n列的二维数组，都初始化为false，访问过的位置为true
    let visited = Array.from(Array(n), () => Array(n).fill(false));

    let dfs = function (row, col) {
        // 越界 或 已访问过 或 不可达
        if (row < 0 || col < 0 || row >= n || col >= n || visited[row][col] || grid[row][col] > t) {
            return false;
        }

        if (row == n - 1 && col == n - 1) {
            return true;
        }

        visited[row][col] = true;

        // 该位置的上 下 左 右 四个方向进行遍历
        return dfs(row + 1, col) || dfs(row - 1, col) || dfs(row, col + 1) || dfs(row, col - 1);
    }

    // 默认从第1个节点开始遍历
    return dfs(0, 0);
}

```
### 复杂度
* 时间复杂度：O(N^2log N))，深度优先搜索复杂度为 O(N^2)，最多需要搜索 O(logN) 次
* 空间复杂度：O(N^2)

## 解法：二分查找 + bfs(迭代实现)

### 代码
```js
/**
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
    let n = grid.length;
    let low = grid[0][0];
    let high = n * n;

    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (!isCanSwim(mid, grid)) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};

/**
 * 在时间t内是否可以游到最后一个节点
 * @param {*} t 
 * @param {*} grid 
 */
var isCanSwim = function (t, grid) {
    let n = grid.length;

    // 方向数组，上 下 左 右
    let directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];

    // 遍历过的位置(存二维数组节点的坐标字符串，用下划线连接)
    const visited = new Set();
    visited.add('0_0'); // 从第1个点(0, 0)开始访问

    // 存需要去遍历的位置(存二维数组节点的坐标)
    let needToInterable = [];
    needToInterable.push([0, 0]); // 默认从第1个点(0, 0)开始访问

    while (needToInterable.length) {
        let position = needToInterable.pop();
        let row = position[0];
        let col = position[1];

        // 是二维数组最后一个位置，则返回true
        if (row == n - 1 && col == n - 1) {
            return true;
        }

        // 沿着(row,col)该点的4个方向进行遍历
        for (let direction of directions) {
            // 沿着某个方向遍历后新的二维数组的索引
            let newRow = row + direction[0];
            let newCol = col + direction[1];

            // 不会越界，且还没遍历过，且该点的时间小于t(即是可达的)
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && !visited.has(`${newRow}_${newCol}`) && grid[newRow][newCol] <= t) {
                visited.add(`${newRow}_${newCol}`);
                needToInterable.push([newRow, newCol]);
            }
        }
    }

    return false;
}
```
### 复杂
* 时间复杂度：O(N^2log N))，深度优先搜索复杂度为 O(N^2)，最多需要搜索 O(logN) 次
* 空间复杂度：O(N^2)
