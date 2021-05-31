## 题目
**4. 寻找两个正序数组的中位数**
>困难

给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？

 

示例 1：
```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```
示例 2：
```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```
示例 3：
```
输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000
```
示例 4：
```
输入：nums1 = [], nums2 = [1]
输出：1.00000
```
示例 5：
```
输入：nums1 = [2], nums2 = []
输出：2.00000
```

提示：
* nums1.length == m
* nums2.length == n
* 0 <= m <= 1000
* 0 <= n <= 1000
* 1 <= m + n <= 2000
* -106 <= nums1[i], nums2[i] <= 106

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：暴力
### 思路
合并两个代码后从小到大排序，数组总数是奇数取`nums[n/2]`，是偶数则取`(nums[n/2] + nums[n/2-1]) / 2`
### 代码
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let n = nums1.length + nums2.length;
    let nums = nums1.concat(nums2).sort((a, b) => a - b);
    
    let result = n % 2 == 0
        ? (nums[n/2] + nums[n/2-1]) / 2
        : nums[Math.floor(n/2)];

    return result;
};
```
### 复杂度
* 时间复杂度 O(NlogN)，N为两数组的长度和
* 空间复杂度 O(N)

## 解法：双指针法
### 思路
* 因为两个数组`有序`，求中位数不需要把两个数组合并
* 当合并后的数组总长度len为奇数时，只要知道索引为`len/2`位置上的数就行了，如果数偶数，只要知道索引为`len/2 - 1`和`len/2`上的数就行，所以不管是奇数还是偶数只要遍历`len/2`次即可，用两个值来存遍历过程中`len/2-1`和`len/2`上的数即可
* 两个指针point1和point2分别指向nums1和nums2，当`nums1[point1] < nums2[point2]`，则point1指针移动，否则point2指针移动

### 代码
```js
/**
 * 
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;

    // 两个数组总长度
    let len = n1 + n2;

    // 保存当前移动的指针的值(在nums1或nums2移动)，和上一个值
    let preValue = -1;
    let curValue = -1;

    //  两个指针分别在nums1和nums2上移动
    let point1 = 0;
    let point2 = 0;

    // 需要遍历len/2次，当len是奇数时，最后取curValue的值，是偶数时，最后取(preValue + curValue)/2的值
    for (let i = 0; i <= Math.floor(len/2); i++) {
        preValue = curValue;
        // 需要在nums1上移动point1指针
        if (point1 < n1 && (point2 >= n2 || nums1[point1] < nums2[point2])) {
            curValue = nums1[point1];
            point1++;
        } else {
            curValue = nums2[point2];
            point2++;
        }
    }
    
    return len % 2 === 0 
        ? (preValue + curValue) / 2
        : curValue
};
```
### 复杂度
* 时间复杂度O(n+m)，n为nums1的长度，m为nums2的长度
* 空间复杂度O(1)

## 解法：二分查找
### 思路
[参考官方题解](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/)

### 代码
```js
/**
 * 
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // nums1长度比nums2小
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    let m = nums1.length;
    let n = nums2.length;
    // 在0～m中查找
    let left = 0;
    let right = m;

    // median1：前一部分的最大值
    // median2：后一部分的最小值
    let median1 = 0;
    let median2 = 0;

    while(left <= right) {
        // 前一部分包含 nums1[0 .. i-1] 和 nums2[0 .. j-1]
        // 后一部分包含 nums1[i .. m-1] 和 nums2[j .. n-1]
        const i = left + Math.floor((right - left) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];

        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];

        if (maxLeft1 <= minRight2) {
            median1 = Math.max(maxLeft1, maxLeft2);
            median2 = Math.min(minRight1, minRight2);
            left = i + 1;
        } else{
            right = i - 1;
        }
    }
    return (m + n) % 2 == 0 ? (median1 + median2) / 2 : median1;
};

```
### 复杂度
* 时间复杂度O(log(min(m, n)))，n为nums1的长度，m为nums2的长度
* 空间复杂度O(1)
