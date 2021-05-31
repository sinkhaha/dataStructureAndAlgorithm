## 题目
**26. 删除排序数组中的重复项**
>简单

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

 

示例 1:
```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
```
示例 2:
```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```



说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```js
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法:双指针
### 思路

> 题目要求空间复杂度O(1)

双指针解法：
* 遍历数组，慢指针 slow 在后，快指针 fast 在前
* 如果快指针`找到一个和慢指针不重复的元素`，则slow 前进一步，`并把fast的元素值赋给slow的元素值`，fast继续前进；如果快指针找到的元素和慢指针相同，则fast继续前进
* 当 fast 指针遍历完nums后，`nums[0...slow] `就是不重复元素

### 代码
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let n = nums.length;
    if (n <= 1) {
        return n;
    }

    let slow = 0;
    let fast = 1;

    while(fast < n) {
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast];
            fast++;
        } else {
            fast++;
        }
    }
    // 长度需要加1
    return slow + 1;
};
```
### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)

## 类似题目
[80. 删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

```javascript
/**
 *
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let n = nums.length;
    if (n <= 1) {
        return n;
    }

    let slow = 1;
    let fast = 2;

    while (fast < n) {
        // 跟前一位不相等
        // 或者 
        // 跟前一位相等，且跟前前一位不相等
        if (nums[fast] !== nums[slow] || (nums[fast] == nums[slow] && nums[fast] !== nums[slow-1]) ) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    return slow+1;
};

```