## 题目
**378. 有序矩阵中第K小的元素**
>中等

给定一个 `n x n` 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

 

示例：
```
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

返回 13。
```

提示：
你可以假设 k 的值永远是有效的，`1 ≤ k ≤ n2` 。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1:排序(简单)
### 思路
* 把二维数组直接转成`一维数组`
* 从小到大排序
* 取第k个值


### 代码
```js
/**
 * 
 * 
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    let nums = [];
    matrix.forEach(v => {
        nums.push(...v);
    });
    
    nums.sort((a, b) => parseInt(a) - parseInt(b));

    return nums[k - 1];
};
```
### 复杂度
* 时间复杂度：O(n^2*logn)，n为matrix的行数/列数
* 空间复杂度 O(n^2)

## 解法2:大顶堆
### 思路
* 维护一个大顶堆，k个元素
* 遍历矩阵
* 当堆未满时，直接入堆
* 当堆满时，大于等于堆顶直接丢弃，比堆小时，删除堆顶元素后入堆，最后遍历完堆顶元素即为第k小元素
### 代码
```java
class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        // 大顶堆，堆k个元素
        PriorityQueue<Integer> q = new PriorityQueue<>((a, b) -> b - a);
        // 遍历矩阵，当堆未满时，直接入堆；当堆满时，大于等于堆顶直接丢弃，比堆小时，删除堆顶元素后入堆，最后遍历完堆顶元素即为第k小元素
        for (int [] row : matrix) {
            for (int num : row) {
                if (q.size() == k) {
                    if (num < q.peek()) {
                        q.poll();
                        q.offer(num);
                    }                    
                } else {
                   q.offer(num);
                }
            }
        }

        return q.peek();

    }
}
```
### 复杂度
* 时间复杂度为O(n^2log(k))
* 空间复杂度为O(k)

## 解法3:二分查找(推荐)
### 思路
1. 因为二维矩阵从左到右，从上到下是`有序`的，所以当前最小元素为`left = matrix[0][0]`，最大元素为`right = matrix[n-1][n-1]`，第k小的数一定在它们之间
2. 求`left和right的中间值mid`，算出二维矩阵中小于等于mid的元素的个数count
3. 如果`count < k`，说明k在`[mid+1, right]`之间，如果`count >= k`，说明k在`[left, mid]`之间
4. 如此循环第2和第3步，当`left == right`时，跳出循环，此时left即为第k小的数

### 代码
```js
/**
 * 
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    let row = matrix.length;
    let col = matrix[0].length;

    // 左指针指向最小的元素
    let left = matrix[0][0];
    // 右指针指向最大的元素
    let right = matrix[row-1][col-1];
    while (left < right) {
        let mid = Math.floor(left + ((right - left) >> 1));
        // 求出小于等于mid的数的数量
        let count = getLessThanMidCount(matrix, mid, row, col);
        // 当数量小于k，说明第k小的数在[mid+1, right]之间
        if (count < k) {
            left = mid + 1;
        } else {
            // 当数量大于k，说明第k小的数在[left], mid]之间
            right = mid;
        }
    }

    return left;
};

/**
 * 求出matrix矩阵中值小于等于mid的数量
 */
var getLessThanMidCount = function(matrix, mid, row, col) {
    let count = 0;
    // 按列遍历
    // 从每一列的最后一行开始从下往上，从左往右遍历
    let i = row - 1;
    let j = 0;
    while (i >= 0 && j < col) {
        // 因为当前值小于等于mid，则0到i之间的值肯定也小于mi，此时直接遍历第2列
        if (matrix[i][j] <= mid) {
            count += i + 1;
            j++;
        } else {
            i--;
        }
    }

    return count;
}
```
### 复杂度
 * 时间复杂度：O(nlog(r−l))，二分查找进行次数为O(log(r−l))，每次操作时间复杂度为 O(n)
 * 空间复杂度 O(1)
