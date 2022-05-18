## 题目
**35. 搜索插入位置**
>简单

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:
```
输入: [1,3,5,6], 5
输出: 2
```
示例 2:
```
输入: [1,3,5,6], 2
输出: 1
```
示例 3:
```
输入: [1,3,5,6], 7
输出: 4
```
示例 4:
```
输入: [1,3,5,6], 0
输出: 0
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-insert-position
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：二分查找(双指针)
### 思路
因为数组已经是有序的，所以可以使用二分查找

### 代码
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if (target > nums[nums.length - 1]) {
        return nums.length;
    }
    if (target <= nums[0]) {
        return 0;
    }

    let left = 0;
    let right = nums.length;

    while(left <= right) {
        let mid = left + ((right - left) >> 1);
        if (target == nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
};
```
### 复杂度
* 时间复杂度：O(logn)，n 为数组的长度。二分查找所需的时间复杂度为O(logn)
* 空间复杂度：O(1)
