## 题目
**416. 分割等和子集**
>中等

给你一个 `只包含正整数` 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

 

示例 1：
```
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
```
示例 2：
```
输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
```

提示：

* 1 <= nums.length <= 200
* 1 <= nums[i] <= 100

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-equal-subset-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法1：动态规划
### 思路
**实际题目可以转化为0-1背包问题**

一个可以装载重量为 `sum/2` 的背包 和 n个物品，每个物品的重量为 `nums[i]`，
问是否存在一种能够恰好将背包装满的装法？
>sum为数组nums的和，n为nums数组的元素个数

---

1. 状态：背包的容量 和 可选择的物品(即nums元素)
2. 选择：装进背包 或 不装进背包
3. dp数组的定义：
`dp[i][j] = x`，表示对于`前i`个物品，当前背包的容量为`j`时;
* 如果值x为`true`，说明能将背包装满
* 如果值x为`false`，说明不能将背包装满

4. 状态转移方程
* 如果把第i个物品装入了背包(即`nums[i]`算入子集)，
此时背包能否装满为 `dp[i][j] = dp[i - 1][j - nums[i - 1]]`；
>`j-nums[i-1]` 表示 `背包的剩余重量j`减去当前i的重量`nums[i - 1]`，因为i是从 1 开始，数组索引是从 0 开始，所以第i个物品的重量是 `nums[i - 1]`
* 如果不把第i个物品装入背包，此时`dp[i][j] = dp[i - 1][j]` (和上一个状态一样)

**所以状态转移代码如下**

```javascript
if (j - nums[i - 1] < 0) {
    // 背包容量不够装下nums[i-1]了，只能选择不装
    dp[i][j] = dp[i-1][j];
} else {
    // 不装 或 装，看哪一个选择能装满
    dp[i][j] = dp[i-1][j] || dp[i-1][j - nums[i - 1 ]]; 
}
```

5. 基础情况
* `dp[..][0] = true`，背包容量为0，相当于装满了
* `dp[0][..] = false`，没有物品了，相当于没法装满了

  > 此时`dp[0][0]`不管为true还是false都行，因为它不影响状态的转移

### 代码
```javascript
/**
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition1 = function(nums) {
    // 总和
    let sum = 0;
    for (let num of nums) {
        sum = sum + num;
    }

    // 和为奇数时，不能平分为两个相等的子集
    if (sum % 2 !== 0) {
        return false;
    }

    let n = nums.length;
    sum = sum / 2;
    console.log(`sum=${sum}, n=${n}`);
    
    let dp = [];
    for (let i = 0; i < n + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < sum + 1; j++) {
            // base case 
            // dp[..][0] = true 和 dp[0][..] = false，其余为false
            dp[i][j] = j === 0 ? true : false;
        }
    }
    console.log(dp);

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < sum + 1; j++) {
            // 背包容量不够，只有不装
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i-1][j];
            } else {
                // 不装 或 装
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]; 
            }
        }
    }
    console.log(dp);

    return dp[n][sum];
};

```
### 复杂度
* 时间复杂度 O(n*sum)，n为nums的个数，sum为nums数组元素的和
* 空间复杂度 O(n*sum)


## 解法2：解法1的优化,状态压缩
### 思路
**状态压缩**
注意到解法1中的`dp[i][j]`都是通过上一个状态`dp[i-1][..]`转移过来的，且之前的数据在后面的状态都不会再用了，所以可以进行状态压缩，将二维dp数组压缩为一维，降低空间复杂度

### 代码
```javascript
/**
 * 
 * @param {*} nums 
 */
var canPartition2 = function(nums) {
    // 总和
    let sum = 0;
    for (let num of nums) {
        sum = sum + num;
    }

    // 和为奇数时，不能平分为两个相等的子集
    if (sum % 2 !== 0) {
        return false;
    }

    let n = nums.length;
    sum = sum / 2;
    console.log(`sum=${sum}, n=${n}`);

    const dp = Array(sum + 1).fill(false);
    dp[0] = true; // base case

    console.log(dp);

    // 只在一行dp数组上操作，i每进行一轮迭代，dp[j]其实就相当于dp[i-1][j]，所以只需要一维数组就够用了
    // 需要注意的是j应该从后往前反向遍历，因为每个物品（或者说数字）只能用一次，以免之前的结果影响其他的结果
    for (let i = 0; i < n; i++) {
        for (let j = sum; j >= 0; j--) {
            if (j - nums[i] >= 0) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
    }
       
    return dp[sum];

}
console.log(canPartition2(nums));

```
### 复杂度
* 时间复杂度 O(n*sum)，n为nums的个数,sum为nums数组元素的和
* 空间复杂度 O(sum)