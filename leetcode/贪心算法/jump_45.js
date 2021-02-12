/**
 * 45. 跳跃游戏 II
 */
/**
 * 
 * 动态规划解法
 * 
 * dp数组定义：
 * 从索引 p 跳到最后一格，至少需要 dp(nums, p) 步
 * 
 * 选择：在当前索引位置可以跳1到nmus[p]步
 * 
 * base case
 * 当 p 超过最后一格时，不需要跳跃
 * 
 * 
 * 时间复杂度：O(N^2) 递归深度 × 每次递归需要的时间复杂度
 * 
 * 超出时间限制
 * 
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    let n = nums.length;
    // 备忘录都初始化为 n，相当于最大值，因为从 0 跳到 n - 1 最多 n - 1 步
    const memo = Array(n).fill(n);

    this.dp = function (nums, p) {
        let n = nums.length;
        // base case , 当 p 超过最后一格时，不需要跳跃
        if (p >= n - 1) {
            return 0;
        }

        if (memo[p] !== n) {
            return memo[p];
        }

        // 当前可以选择跳的最多步数
        let steps = nums[p];
        // 做选择，计算每一个选择的结果
        for (let i = 1; i <= steps; i++) {
            let subProblem = this.dp(nums, p + i);
            // 最小的为结果
            memo[p] = Math.min(memo[p], subProblem + 1);
        }
        return memo[p];
    }

    return this.dp(nums, 0);
};

/**
 * 贪心算法（推荐）
 * 
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 
 * @param {*} nums 
 */
function jump2(nums) {
    let n = nums.length;

    let end = 0;
    // 当前位置能跳的最远距离
    let farthest = 0;

    let jumpCount = 0;
    for (let i = 0; i < n - 1; i ++) {
        // 从0到i位置中能跳到的最远距离
        farthest = Math.max(nums[i] + i, farthest);
        
        // 刚开始end和i都是0，此时end为nums[0]的值
        if (end === i) {
            jumpCount++;
            end = farthest; // 表示在0到i中做选择时，选择跳到能跳距离中最大的
        }
    }

    return jumpCount;
}

function test() {
    const nums = [2, 3, 1, 1, 4];
    console.log(jump(nums)); // 2
    console.log(jump2(nums)); // 2
}
test();
