## 题目
**78. 子集**
>中等

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:
```
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1:回溯
### 思路
递归回溯
### 代码
```js
/**
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let res = [];
    this.backtrack = function(nums, start, track) {
        // 不能直接res.push(track)
        res.push(track.slice());

        for (let i = start; i < nums.length; i++) {
            // 做选择
            track.push(nums[i]);
            // 回溯
            this.backtrack(nums, i + 1, track);
            // 撤回选择
            track.pop();
        }
    }
    // 记录所做的选择
    const track = [];
    backtrack(nums, 0, track); 
    return res;
};
```
### 复杂度
* 时间复杂度：O(n* 2^n)
* 空间复杂度：O(n)

## 解法2:迭代
### 思路

### 代码
```js
/**
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;

    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    
    return ans;
};

```
### 复杂度
* 时间复杂度：O(n* 2^n)
* 空间复杂度：O(n)
