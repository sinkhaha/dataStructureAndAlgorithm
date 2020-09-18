/**
 * 416 分割等和子集
 * 
 * 输入: [1, 5, 11, 5]
 * 输出: true
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11]
 * 
 * 先对数组求和sum,问题可转化为：
 * 给一个可装载重量为sum/2的背包和N个物品，每个物品的重量为nums[i]，
 * 是否存在一种装法，能够恰好将背包装满？
 * 
 * 
 * 1.dp数组：
 * dp[i][j] = x
 * 表示对于前i个物品，当前背包的容量为j时，
 * 若x为true，则说明可以恰好将背包装满，
 * 若x为false，则说明不能恰好将背包装满
 * 最终所求对答案是dp[N][sum/2]
 * 
 * 
 * 2.选择：装进背包 或者 不装进背包
 * 如果把nums[i]算入子集，或者把这第i个物品装入了背包，那么是否能够恰好装满背包，
 * 取决于状态dp[i - 1][j-nums[i-1]] (背包的剩余重量j - nums[i-1])
 * 
 * 如果不把nums[i]算入子集，或者不把这第i个物品装入背包，那么是否能够恰好装满背包，
 * 取决于上一个状态dp[i-1][j]，继承之前的结果。
 * 
 * (由于i是从 1 开始的，而数组索引是从 0 开始的，所以第i个物品的重量应该是nums[i-1])
 * 
 * 3.状态：背包的容量 和 可选择的物品
 * 
 * base case ：
 * 是dp[..][0] = true和dp[0][..] = false，
 * 因为背包没有空间的时候，就相当于装满了，而当没有物品可选择的时候，肯定没办法装满背包
 * 
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

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            // 背包容量不够，只有不装
            if (j - nums[i - 1] < 0) {
                dp[i][j] = dp[i-1][j];
            } else {
                dp[i][j] = dp[i-1][j] || dp[i-1][j - nums[i]]; // 不装 || 装
            }
        }
    }

    return dp[n][sum];
};

const nums = [1, 5, 11, 5];
console.log(canPartition1(nums));
