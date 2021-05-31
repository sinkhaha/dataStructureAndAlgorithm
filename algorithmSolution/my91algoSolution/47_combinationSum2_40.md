## 题目
**40. 组合总和 II**
>中等

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

* 所有数字（包括目标数）都是正整数。
* 解集不能包含重复的组合。 

示例 1:
```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

示例 2:
```
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：回溯+减枝
### 思路
回溯+减枝



**和39题的区别**

* 数组含有重复数字
* 每个数字只能选择一次



### 代码
```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    if (candidates.length < 0) {
        return [];
    }
    
    // 排序
    candidates.sort((a, b) => parseInt(a) - parseInt(b));

    this.backtrack = function(candidates, list, start, target) {
        if (target == 0) {
            res.push(list.slice());
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // 减枝：因为target小于candidates[i]，candidates升序，所以candidates从i+1后面的数肯定大于target，直接break 进行减枝
            if (target < candidates[i]) {
                break;
            }

            // 减枝：跳过重复的数字，重复的不选择 
            if (i > start && candidates[i] == candidates[i-1]) {
                continue;
            }

            list.push(candidates[i]);
            
            // i位置的选择的，所以从i+1开始选
            backtrack(candidates, list, i + 1, target - candidates[i]);

            list.pop();
        }
    }

    let res = [];
    let list = [];
    backtrack(candidates, list, 0, target);
    return res;
};
```

### 复杂度
* 时间O(n*2^n)
* 空间O(target)，取决于递归的栈深度
