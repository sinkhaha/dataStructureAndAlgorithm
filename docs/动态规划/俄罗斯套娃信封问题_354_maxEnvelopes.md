## 题目
**354. 俄罗斯套娃信封问题**
>困难
给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。

当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

注意：不允许旋转信封。

 
示例 1：
```
输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
输出：3
解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
```

示例 2：
```
输入：envelopes = [[1,1],[1,1],[1,1]]
输出：1
```

提示：

* 1 <= envelopes.length <= 5000
* envelopes[i].length == 2
* 1 <= wi, hi <= 10^4


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/russian-doll-envelopes
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法
### 思路
其实此问题是最长递增子序列的一个变形，每次合法的嵌套是大的套小的，
相当于找一个最长递增的子序列，其长度就是最多能嵌套的信封个数。


* 先对宽度 w 进行升序排序，如果 w 相同，则按照高度 h 降序排序
（因为两个宽度相同的信封不能相互包含的，逆序排序保证在 w 相同的数对中最多只选取一个）
* 然后把所有的 h 作为一个数组，在h上求 长递增子序列

### 代码
```javascript
/**
 * 
 * 
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    // 按宽度升序排列，如果宽度一样，则按高度降序排列
    envelopes.sort(function(a, b) {
        const rst = a[0] - b[0];
        if (rst !== 0) {
            return rst;
        }
        return b[1] - a[1];
    });

    console.log('排序后', envelopes);

    let n = envelopes.length;
    // 对高度数组寻找 LIS
    let height = new Array(n);
    for (let i = 0; i < n; i++) {
        height[i] = envelopes[i][1];
    }

    console.log('高度h数组', height);

    return lengthOfLIS(height);
};

// 动态规划求最长上升子序列，参考leetcode 第300题 lengthOfLIS
var lengthOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }

    // 初始化为1，因为最短的子序列包含自己，即1
    let dp = Array(n).fill(1);
    // 选择
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // 因为求的是递增子序列，所以前面的数nums[j]必须小于nums[i]才算递增子序列，才可以计算最大值
            // 加1为在nums[j]的最长递增子序列dp[j]基础上加上当前元素nums[i]所得的最长递增子序列
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    // 此时dp数组的元素为i下标对应的最长子序列长度，遍历找出dp数组的最大元素即可
    let maxRestult = 0;
    for (let i = 0; i < n; i++) {
        maxRestult = Math.max(maxRestult, dp[i]);
    }
    return maxRestult;
};

const envelopes = [[5, 4], [6, 4], [6, 7], [2, 3]];
console.log(maxEnvelopes(envelopes));

```
### 复杂度
* 时间复杂度 O(NlogN)
* 空间复杂度 O(N)
