## 题目
**39. 组合总和**

>中等

给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以`无限制重复`被选取。

说明：
* 所有数字（包括 target）都是正整数。
* 解集不能包含重复的组合。 

示例 1：
```
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
```

示例 2：
```
输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

提示：
* 1 <= candidates.length <= 30
* 1 <= candidates[i] <= 200
* candidate 中的每个元素都是独一无二的。
* 1 <= target <= 500


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法:回溯+减枝
### 思路

先对数组排序，`递归`做选择，当`所选值candidates[i]>目标值target`则退出，`candidates[i+1]`即后面的值肯定大于target，直接退出



**注意：和40题的区别**

* 每个数字都是独一无二

* 每个数字都可以被无限制重复选择

  

### 代码
```js
/**
 * 
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    if (candidates.length <= 0) {
        return [];
    }

    // 从小到大排序，是剪枝的关键
    candidates.sort((a, b) => parseInt(a) - parseInt(b));

    /**
     * 
     * @param {*} candidates 原数组
     * @param {*} target 此时要组合成的目标值
     * @param {*} begin 数组开始遍历的索引
     * @param {*} track 每次选择的结果数组
     */
    this.backtrack = function(candidates, target, begin, track) {
        // 终止条件，找到符合的数组则保存数组结果
        if (target == 0) {
            // 注意这里要存复制的数组，因为存引用会改变
            res.push(track.slice()); 
            return;
        }

        // 循环做选择 
        for (let i = begin; i < candidates.length; i++) {
            // 剪枝，选择的数大于目标值，则后面的数也大于目标值，直接退出即可
            if (target - candidates[i] < 0) {
                break;
            }
            // 选择
            track.push(candidates[i]);
            
            // 回溯，i位置的数可以重复被选择
            backtrack(candidates, target - candidates[i], i, track);
            
            // 撤销选择
            track.pop();
        }
    }

    let res = [];
    // 存每次选择的结果数组
    let track = [];
    backtrack(candidates, target, 0, track);

    return res;
};
```

### 复杂度
* 时间O(n*2^n)
* 空间O(target)，取决于递归的栈深度
