## 题目
**1712. 将数组分成三个子数组的方案数**
>中等

我们称一个分割整数数组的方案是 好的 ，当它满足：

数组被分成三个 非空 连续子数组，从左至右分别命名为 left ， mid ， right 。
left 中元素和小于等于 mid 中元素和，mid 中元素和小于等于 right 中元素和。
给你一个 非负 整数数组 nums ，请你返回 好的 分割 nums 方案数目。由于答案可能会很大，请你将结果对 10^9 + 7 取余后返回。

示例 1：
```
输入：nums = [1,1,1]
输出：1
解释：唯一一种好的分割方案是将 nums 分成 [1] [1] [1] 。
```
示例 2：
```
输入：nums = [1,2,2,2,5,0]
输出：3
解释：nums 总共有 3 种好的分割方案：
[1] [2] [2,2,5,0]
[1] [2,2] [2,5,0]
[1,2] [2,2] [5,0]
```
示例 3：
```
输入：nums = [3,2,1]
输出：0
解释：没有好的分割方案。
```
提示：
* 3 <= nums.length <= 105
* 0 <= nums[i] <= 104

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ways-to-split-array-into-three-subarrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：前缀和+二分查找
### 思路
题目要求数组分成3个连续的`非空`数组，满足`第1个数组元素和 <= 第2个数组元素和 <= 第3个数组元素和` 即 `sum(left) <= sum(mid) <= sum(right)`，现在需要在原数组中`找2个分隔点`，把数组分成符合要求的3个连续非空数组

1. 提前计算原数组的前缀和数组preSum
2. 找到第1个分隔点的位置
3. 找到第2个分隔点的位置(二分查找)

**第1个分隔点的可选位置**
分隔点的选择可以是一个范围，可以简单的认为原数组从0到n-1索引后任意一个位置进行分隔。
* 起始位置：因为要求非空，所以第一个分隔点的起始位置可以在索引0后面分隔，此时分隔点选择的值是最小的

* 终止位置：因为`sum(left)<=sum(mid)<=sum(right)`，所以当三个数组的和相等`sum(left)==sum(mid)==sum(right)`时，第一个分隔点可以选择的值是最大的，即`sum(nums) / 3`的位置，如果超过该位置，不可能sum(right)还会大于等于sum(mid)

  

  **综上，第一个分隔点的选择**
```js
for (let i = 0; i < n && sums[i] <= tsums[n - 1] / 3; i++) {

}
```
**第2个分隔点的可选位置**
当确定第一个分隔点i后，第二个分隔点的选择也是一个范围值，假设为`[a, b]`
* 起始位置：当mid元素和等于left元素和，即`sum(mid) == sum(left)`，即mid中元素和是最小值时，此时为第2个分隔点的起始位置a
>可以使用二分查找，目标值为`2 * preSum[i]`，因为当i是第一个分隔点时，`preSum[i]`为第一个数组的元素和，则第2个分隔点的起始位置要满足`sum(mid) == sum(left)`，即要找到`2 * preSum[i]`
* 终止位置：当`sum(mid) == sum(right)`，即`sum(mid) == (sum(mid) + sum(right)) / 2`，mid元素和等于right元素和，即mid中元素和是最大值时，此时为第2个分隔点的终止位置b
>可以使用二分查找，因为当i是第一个分隔点时，
>
>目标值为`preSum[i] + (preSum[n - 1] - preSum[i]) / 2)`，
>
>因为`sum(mid) == sum(right)，即sum(mid) == (sum(mid) + sum(right))/2`，
>
>而`preSum[mid] = preSum[right] = ((preSum[n-1] - preSum[i]) / 2)`，
>
>所以`sum(mid) == preSum[i] + (preSum[n - 1] - preSum[i]) / 2)`

### 代码
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplit = function (nums) {
    let n = nums.length;

    // 前缀和数组
    let preSum = Array(n).fill(0);
    preSum[0] = nums[0];
    for (let i = 1; i < n; i++) {
        preSum[i] = nums[i] + preSum[i - 1];
    }

    let result = 0;
    // 第一个分隔点最大点取值
    let firstMax = Math.floor(preSum[n - 1] / 3);
    // 第一个分隔点的取值
    for (let i = 0; i < n && preSum[i] <= firstMax; i++) {
        // 第2个分隔点的左边界
        let left = getLeft(i + 1, n - 1, preSum, 2 * preSum[i]);
        // 第2个分隔点的右边界
        let right = getRight(i + 1, n - 1, preSum, preSum[i] + ((preSum[n - 1] - preSum[i]) / 2));
        if (right >= left) {
            result += right - left + 1;
        }
    }

    let mod = Math.pow(10, 9) + 7;
    return Math.floor(result % mod);
};

/**
 * 找到第2个分隔点左边界
 * @param {*} left 
 * @param {*} right 
 * @param {*} preSum 前缀和数组
 * @param {*} target 要查找的目标值
 */
var getLeft = function (left, right, preSum, target) {
    while (left < right) {
        let mid = Math.floor(left + ((right - left) >> 1));
        if (preSum[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }

    }
    return left;
}

/**
 * 找到第2个分隔点的右边界
 * @param {*} left 
 * @param {*} right 
 * @param {*} preSum 前缀和数组
 * @param {*} target 要查找的目标值
 */
var getRight = function (left, right, preSum, target) {
    while (left < right) {
        let mid = Math.floor(left + ((right - left) >> 1));
        if (preSum[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left - 1;
}
```

### 复杂度
* 时间复杂度：O(nlog(n))
* 空间复杂度：O(n)
