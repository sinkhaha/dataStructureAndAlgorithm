## 题目
**887. 鸡蛋掉落**
>困难

https://leetcode-cn.com/problems/super-egg-drop/

## 解法1:动态规划(暴力)
### 思路
1. 状态：当前`拥有的鸡蛋数K` 和 需要`测试的楼层数 N` (随着测试的进⾏，鸡蛋个数可能减少，楼层的搜索范围会减⼩)
2. 选择：选择去哪层楼扔鸡蛋
3. dp数组
`dp(K, N)`表示当前状态为 `k` 个鸡蛋，⾯对 `N` 层楼, 返回这个状态下`最少的扔鸡蛋次数`
4. 状态转移方程：
选择在`第 i 层`楼扔了鸡蛋之后，可能出现两种情况，这时会出现状态转移：
(1)鸡蛋碎了：那么剩下鸡蛋的个数是`K-1`，搜索的楼层区间从 `[1..N]` 变为 `[1..i-1]` 共 `i-1`层楼
(2)鸡蛋没碎：那么鸡蛋的个数`K`不变，搜索的楼层区间从 `[1..N]` 变为 `[i+1..N]` 共 `N-i` 层楼，区间已经包含`i`层楼

因为要求的是`最坏情况下扔鸡蛋的次数`，所以鸡蛋在第i层楼碎没碎，取结果更⼤的情况：
`max(碎，没碎) + 1`，加1是因为在第i层楼扔了一次，即 
`max(dp(K - 1, i - 1), dp(K, N - i)) + 1`

所以状态转移方程:
`dp(K, N) = min{ max(dp(K - 1, i - 1), dp(K, N - i)) + 1 }`

5. 基础情况
* 当楼层数 `N 等于 0` 时，不需要扔鸡蛋 `if(N == 0) { return 0 }`
* 当鸡蛋数 `K 为 1` 时，只能线性扫描所有楼层 `if(K == 1) { return N } `
  
### 代码
```js
/**
 * leetcode会超出时间限制
 * 
 */
function superEggDrop(K, N) {
    // 定义dp函数
    this.dp = function(K, N) {
        // 基础情况
        if (N === 0) {
            return 0;
        }
        // 基础情况
        if (K === 1) {
            return N;
        }
        let result = Number.MAX_SAFE_INTEGER;
        
        for (let i = 1; i <= N; i++) {
            // 最坏情况下的最少扔鸡蛋次数
            result = Math.min(result, Math.max(
                dp(K - 1, i - 1),
                dp(K, N - i)
            ) + 1); 
        }
        return result;
    }

    return this.dp(K, N);
}

```

## 解法2:解法1的优化：增加备忘录
### 思路
* 解法一的优化：增加备忘录，消除重叠子问题
* 动态规划算法的时间复杂度是: ⼦问题个数 × 函数本⾝的复杂度

* 函数本⾝的复杂度是忽略递归部分的复杂度，
dp函数有⼀个for循环，所以函数本⾝的复杂度是 O(N)

* ⼦问题个数就是不同状态组合的总数，是两个状态的乘积，是 O(KN)
### 代码
```js
/**
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop(K, N) {
    // 备忘录
    const map = {};

    // 定义dp函数
    this.dp = function(K, N) {
        // base case
        if (N === 0) {
            return 0;
        }
        if (K === 1) {
            return N;
        }

        let result = Number.MAX_SAFE_INTEGER;
        // 消除重复计算
        const key = `${N}_${K}`
        if (map[key] !== undefined) {
            return map[key];
        }

        // 穷举所有选择,i可以取到N值
        for (let i = 1; i <= N; i++) {
            // 状态转移方程
            result = Math.min(result, Math.max(
                dp(K - 1, i - 1),
                dp(K, N - i)
            ) + 1); 
        }

        map[key] = result;
        return result;
    }

    return this.dp(K, N);
}
```
### 复杂度
* 时间复杂度 O(K*N^2)
* 空间复杂度 O(KN)

## 解法3:二分搜索
### 思路
利用二分搜索

根据解法2的状态转移方程
`dp(K, N) = min{max(dp(K - 1, i - 1), dp(K, N - i)) + 1}`

1. 根据 `dp(K, N)` 数组的定义（有 K 个鸡蛋⾯对 N 层楼，最少需要扔⼏次），
当 K 固定时，这个函数随着 N 的增加⼀定是单调递增的，即楼层增加测试次数⼀定要增加

注意 `dp(K - 1, i - 1) 和 dp(K, N - i) `这两个函数，其中 i 是从 1 到 N 单增的，如果我们固定 K 和 N；把这两个函数看做关于 i 的函数，前者随着 i 的增加应该也是`单调递增`的；⽽后者随着 i 的增加应该 是`单调递减`的。

这时候求⼆者的较⼤值，再求这些最⼤值之中的最⼩值，其实就是`求这两条直线交点`，也就是`折线的最低点`。

### 代码
```js
/**
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop(K, N) {
    // 备忘录
    const map = {};

    // 定义dp函数
    this.dp = function(K, N) {
        // base case
        if (N === 0) {
            return 0;
        }
        if (K === 1) {
            return N;
        }

        const key = `${N}_${K}`
        if (map[key] !== undefined) {
            return map[key];
        }

        let result = Number.MAX_SAFE_INTEGER;
        let low = 1;
        let high = 1;
        while (low <= high) {
            let mid = Math.floor(low + (high-low)/2);
            let broken = dp(K - 1, mid - 1); // 碎
            let unBroken = dp(K, N - mid); // 没碎
            
            if (broken > unBroken) {
                high = mid - 1;
                result = Math.min(result, broken + 1);
            } else {
                low = mid + 1;
                result = Math.min(result, unBroken + 1);
            }
        }

        map[key] = result;
        return result;
    }

    return this.dp(K, N);
}

```
### 复杂度
* 时间复杂度是 O(K*N*logN)
* 空间复杂度 O(KN)

## 解法4:动态规划(最优)
### 思路
跟解法1的区别：重新定义状态转移

1. dp数组
解法1的dp(K, N)改成用dp数组表⽰：`dp[k][n] = m `
表示当前状态为 k 个鸡蛋，⾯对 n 层楼这个状态下最少的扔鸡蛋次数为 m

按照定义，确定当前的鸡蛋个数和⾯对的楼层数，就知道最⼩扔鸡蛋次数
最终的答案就是 `dp(K, N)` 的结果

现在改进的做法：
稍微修改 dp 数组的定义，确定当前的鸡蛋个数和最多允许的扔鸡蛋次数， 就知道能够确定 F 的最⾼楼层数。

即：
`dp[k][m] = n`，当前有 k 个鸡蛋，可以尝试扔 m 次鸡蛋 
这个状态下，最坏情况下最多能确切测试⼀栋 n 层的楼 

⽐如：`dp[1][7] = 7` 表⽰现在有 1 个鸡蛋，允许你扔 7 次
这个状态下最多给你 7 层楼，使得你可以确定楼层 F 使得鸡蛋恰好摔不碎 （⼀层⼀层线性探查）

这就是原始思路的⼀个【反向】版本

2. 状态转移⽅程： `dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1`

### 代码
```js
/**
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop(K, N) {
    // 二维数组 [k+1]行 [N+1]列，初始化为0
    const dp = Array.from(Array(K+1), () => Array(N+1).fill(0));

    // base case 初始化dp时已经默认数组都为0了
    // dp[0][..] = 0;
    // dp[..][0] = 0;

    let m = 0;
    while (dp[K][m] < N) {
        m++;
        for (let k = 1; k <= K; k++) {
            dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1;
        }
    }
    return m;
}

```
### 复杂度
* 时间复杂度 O(KN)
* 空间复杂度 O(K+N)
