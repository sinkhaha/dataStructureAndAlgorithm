## 题目
**74. 搜索二维矩阵**
>中等

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

* 每行中的整数`从左到右按升序`排列。
* 每行的第一个整数大于前一行的最后一个整数。

示例 1：

![](https://gitee.com/sinkhaha/picture/raw/master/img/leetcode/74_1.jpg)
```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 3
输出：true
```

示例 3：
```
输入：matrix = [], target = 0
输出：false
```
提示：
* m == matrix.length
* n == matrix[i].length
* 0 <= m, n <= 100
* -104 <= matrix[i][j], target <= 104

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-a-2d-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：二分查找(双指针)
### 思路
双指针二分查找，需要`把二维数组映射成一维数组`

**怎样把二维数组映射成一维数组?**

* 假设有个m行n列的二维数组twoList
* 映射成下标从`0 到 m * n - 1`的一维数组oneList
* 假设一维数组中元素的下标为idx，则对应二维数组中的元素的下标为的行为`row=Math.floor(idx / n)`，列为`col=idx % n`；即`twoList[row][col] = onwList[idx]`

![](https://gitee.com/sinkhaha/picture/raw/master/img/leetcode/74_2.png)
(图片来自[leetcode 74. 搜索二维矩阵 官方题解](https://leetcode-cn.com/problems/search-a-2d-matrix/solution/sou-suo-er-wei-ju-zhen-by-leetcode/))

### 代码
```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (!matrix || !matrix.length) {
        return false;
    }
    let m = matrix.length;
    let n = matrix[0].length;

    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = left + ((right - left) >> 1);

        const row = Math.floor(mid / n);
        const col = mid % n;

        // 根据一维数组的下标找到二维数组中的元素
        const num = matrix[row][col];
        if (num == target) {
            return true;
        } else if (num > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return false;
};
```

### 复杂度
* 时间复杂度 O(log(mn))， m为matrix的行数，n为matrix的列数
* 空间复杂度 O(1)