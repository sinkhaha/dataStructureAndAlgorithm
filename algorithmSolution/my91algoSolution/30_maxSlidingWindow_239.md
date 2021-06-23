
## 题目
**239. 滑动窗口最大值**
>困难

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

 

进阶：

你能在线性时间复杂度内解决此题吗？

 

示例:
```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

提示：
* 1 <= nums.length <= 10^5
* -10^4 <= nums[i] <= 10^4
* 1 <= k <= nums.length

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sliding-window-maximum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：滑动窗口/单调栈
### 思路
维护一个单调递减栈stack，里面`存数组的下标`，下标对应的数组元素`单调递减`，所以数组第一个元素表示当前窗口的最大值的下标
1. 遍历数组(相当于窗口扩大)，每次窗口扩大时，判断窗口是否已经不包含stack的最左边的元素了，如果不包括则需要把stack最左边的元素去掉
2. 窗口扩大，每进入一个值num，需要判断该num是否是当前窗口最大的元素，是的话需要放入stack中，可以从`stack数组的最右边元素对应的值`开始比较，num大于stack数组最后一个值，就把stack中该值删掉，否则num的下标加入数组中，维护单调递减
3. 判断`当前遍历元素的下标 >= 窗口大小`，表示窗口内已经有到k个元素了，则取stack数组第一个值对应的元素存入结果，即当前窗口中nums的最大值加入结果

   
### 代码
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let res = [];
    // 存放nums数组元素的下标，最左边下标对应的nums的值最大，stack对应的nums的元素是单调递减的
    let stack = []; 
 
    for (let i = 0; i < nums.length; i++) {
        // 如果窗口最左边的元素对应的nums的数已经不在窗口中，需要把stack最左边的元素删掉
        // 因为当前窗口的最大值已经变了
        if (stack.length && stack[0] <= i - k) {
            stack.shift();
        }

        const num = nums[i];
        // 维持单调递减
        // 新加入的元素比stack(从右往左)元素的对应的nums值大，则删除stack的元素
        while(stack.length && nums[stack[stack.length - 1]] < num) {
            stack.pop();
        }

        // 加入新元素的下标
        stack.push(i);

        // 判断是否等于或超过第一个窗口，是的话加入最大元素nums[stack[0]]
        if (i >= k - 1) {
            res.push(nums[stack[0]]);
        }
    }

    return res;
};

```
### 复杂度
* 时间复杂度O(n)， n为nums的长度
* 空间复杂度O(n)

