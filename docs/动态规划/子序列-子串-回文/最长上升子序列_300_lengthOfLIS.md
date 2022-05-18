## 题目
**300. 最长上升子序列**
>中等

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

 
示例 1：
```
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```
示例 2：
```
输入：nums = [0,1,0,3,2,3]
输出：4
```
示例 3：
```
输入：nums = [7,7,7,7,7,7,7]
输出：1
```

提示：

* 1 <= nums.length <= 2500
* -10^4 <= nums[i] <= 10^4
 

进阶：

* 你可以设计时间复杂度为 O(n^2) 的解决方案吗？
* 你能将算法的时间复杂度降低到 O(n log(n)) 吗?

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-increasing-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法1：动态规划
### 思路
1. 状态：`i`改变，`dp[i]`的值即当前的最大长度改变
2. 选择：当前为`i`时，可以选择`0...i`之间的元素，即选择`dp[j](j < i 即 nums[j]<nums[i])`时，此时`dp[i]`的最大长度
   
3. dp数组：
`dp[i]`一维数组表示以`nums[i]`这个数为结尾的最长子序列的长度 (即从头到第`i`个元素的最长序列长度)，所以所求的最终结果就是dp数组中的最大值

4. 状态转移方程
当 `0 ≤ j < i 且 num[j] < num[i]`，`dp[i] = max(dp[i]，dp[j] + 1)`
因为`nums[i]`前面的值`nums[j]`要小于`nums[i]`才算递增，大于则直接跳过即可

5. 基础情况base case
dp数组的每一项初始值都值都为 1， 因为子序列最少要包含自己，所以长度最小为 1

### 代码
```javascript
/** 
 * 
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }

    // 初始化为1，因为子序列最少包含自己，即1
    let dp = Array(n).fill(1);
  
    // dp数组的最大值
    let maxResult = 0;
    // 做选择
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // 因为求的是递增子序列，所以前面的数nums[j]必须小于nums[i]才算递增子序列，才可以计算最大值
            // 加1为在nums[j]的最长递增子序列dp[j]基础上加上当前元素nums[i]所得的最长递增子序列
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // 找dp数组的最大值
        maxResult = Math.max(maxResult, dp[i]);
    }

    return maxResult;
};

```

### 复杂度
* 时间复杂度O(n^2)
* 空间复杂度O(n)

## 解法2：二分查找法
### 思路
略

### 代码
```javascript
/**
 * 
 * @param {*} nums 
 */
var lengthOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }

    let top = Array(n).fill(0);

    let piles = 0; // 堆数
    for (let i = 0; i < n; i++) {
        // 当前值
        let poker = nums[i];

        let left = 0;
        let right = piles;

        while (left < right) {
            let mid = Math.floor((right+left)/2);
            if (top[mid] > poker) {
                right = mid; 
            } else if (top[mid] < poker) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        console.log(top);

        // 没找到合适的堆，新建一个
        if (left === piles) {
            piles++;
        }
        // 把当前值放入该堆
        top[left] = poker;
    }

    // 新进来的数小于top最后一个有值的数，则替换，大于则拼在后面，最后top前面的元素即为最长上升子序列
    // [ 2, 3, 7, 18, 0, 0, 0, 0 ]
    // console.log('top==', top);
    return piles;
}

```
### 复杂度
 * 时间复杂度O(NlogN)
 * 空间复杂度O(N)
