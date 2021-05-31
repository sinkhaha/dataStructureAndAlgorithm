/**
 * leetcode 887 鸡蛋掉落
 * hard
 * https://leetcode-cn.com/problems/super-egg-drop/
 * 
 * 题⽬：
 * 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
 * 
 * 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，
 * 从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
 *
 * 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
 *
 * 最坏情况下，你⾄少要扔⼏次鸡蛋，才能确定这个楼层 F 呢？
 * 
 * 解法：动态规划
 * 
 */

/**
 * 解法一：暴力解法（动态规划）
 * 
 * 1.状态和选择
 * (1)[状态]是当前拥有的鸡蛋数 K 和需要测试的楼层数 N 。
 * (随着测试的进⾏，鸡蛋个数可能减少，楼层的搜索范围会减⼩，这就是状态的变化)
 * (2)[选择]是去选择哪层楼扔鸡蛋
 * 
 * 基本思路：一个⼆维的 dp 数组或者带有两个状态参数的 dp 函数来表⽰状态转移；
 * 再加⼀个 for 循环来遍历所有选择，择最优的选择更新状态
 * 
 * dp(K, N):当前状态为 k 个鸡蛋，⾯对 n 层楼, 返回这个状态下最少的扔鸡蛋次数
 * 
 * 2. base case:
 * 当楼层数 N 等于 0 时，不需要扔鸡蛋 if(N == 0) { return 0 }
 * 当鸡蛋数 K 为 1 时，只能线性扫描所有楼层 if(K == 1) { return N } 
 * 
 * 
 * 选择在第 i 层楼扔了鸡蛋之后，可能出现两种情况，这时会出现状态转移：
 * (1)鸡蛋碎了（那么鸡蛋的个数是K-1，搜索的楼层区间从 [1..N] 变为 [1..i-1] 共 i-1 层楼）
 * (2)鸡蛋没碎（那么鸡蛋的个数K不变，搜索的楼层区间从 [1..N] 变为 [i+1..N] 共 N-i 层楼，区间已经包含i层楼）
 * 
 * 因为要求的是最坏情况下扔鸡蛋的次数，所以鸡蛋在第i层楼碎没碎，取结果更⼤的情况：
 * // max(碎，没碎) + 1，加1是因为在第i层楼扔了一次
 * max(dp(K - 1, i - 1), dp(K, N - i)) + 1
 * 
 * 状态转移方程:
 * dp(K, N) = min{max(dp(K - 1, i - 1), dp(K, N - i)) + 1}
 * 
 * leetcode会超出时间限制
 * 
 */
function superEggDrop1(K, N) {
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

console.log('==========superEggDrop1===========');

const K1 = 1,N1 = 2;
console.log(superEggDrop1(K1, N1)); // 2

const K2 = 2,N2 = 6;
console.log(superEggDrop1(K2, N2)); // 3

const K3 = 3, N3 = 14
console.log(superEggDrop1(K3, N3)); // 4

/**
 * 解法一的优化：增加备忘录，消除重叠子问题
 * 
 * leetcode会超出时间限制
 * 
 * 动态规划算法的时间复杂度是: ⼦问题个数 × 函数本⾝的复杂度
 * 
 * 函数本⾝的复杂度是忽略递归部分的复杂度，
 * dp函数有⼀个for循环，所以函数本⾝的复杂度是 O(N)
 * 
 * ⼦问题个数就是不同状态组合的总数，是两个状态的乘积，是 O(KN)
 * 
 * 时间复杂度 O(K*N^2)
 * 空间复杂度 O(KN)
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop2(K, N) {
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

console.log('==========superEggDrop2===========');
console.log(superEggDrop2(K1, N1));
console.log(superEggDrop2(K2, N2));
console.log(superEggDrop2(K3, N3));

/**
 * 解法三：利用二分搜索
 * 
 * 根据解法二的状态转移方程
 * dp(K, N) = min{max(dp(K - 1, i - 1), dp(K, N - i)) + 1}
 *
 * 1. 根据 dp(K, N) 数组的定义（有 K 个鸡蛋⾯对 N 层楼，最少需要扔⼏次），
 * 当 K 固定时，这个函数随着 N 的增加⼀定是单调递增的，即楼层增加测试次数⼀定要增加
 * 
 * 注意 dp(K - 1, i - 1) 和 dp(K, N - i) 这两个函数，
 * 其中 i 是从 1 到 N 单增的，如果我们固定 K 和 N ，
 * 把这两个函数看做关于 i 的函数，前者随着 i 的增加应该也是单调递增的，
 * ⽽后者随着 i 的增加应该 是单调递减的。
 * 
 * 这时候求⼆者的较⼤值，再求这些最⼤值之中的最⼩值，其实就是求这两条直线交点，也就是折线的最低点。
 * 
 * 时间复杂度是 O(K*N*logN)
 * 空间复杂度 O(KN)
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop3(K, N) {
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

console.log('==========superEggDrop3===========');
console.log(superEggDrop3(K1, N1));
console.log(superEggDrop3(K2, N2));
console.log(superEggDrop3(K3, N3));

/**
 * 解法四：动态规划(最优解)
 * 跟解法一的区别：重新定义状态转移
 * 
 * 定义：
 * dp(K, N)改成用dp数组表⽰：dp[k][n] = m 
 * 当前状态为 k 个鸡蛋，⾯对 n 层楼这个状态下最少的扔鸡蛋次数为 m
 * 
 * 按照定义，确定当前的鸡蛋个数和⾯对的楼层数，就知道最⼩扔鸡蛋次数
 * 最终的答案就是 dp(K, N) 的结果
 * 
 * 现在改进的做法：
 * 稍微修改 dp 数组的定义，确定当前的鸡蛋个数和最多允许的扔鸡蛋次数，
 * 就知道能够确定 F 的最⾼楼层数。
 * 具体来说是这个意思：
 * dp[k][m] = n
 * 当前有 k 个鸡蛋，可以尝试扔 m 次鸡蛋 
 * 这个状态下，最坏情况下最多能确切测试⼀栋 n 层的楼 
 * ⽐如：
 * dp[1][7] = 7 表⽰
 * 现在有 1 个鸡蛋，允许你扔 7 次
 * 这个状态下最多给你 7 层楼，使得你可以确定楼层 F 使得鸡蛋恰好摔不碎 （⼀层⼀层线性探查）
 * 
 * 这就是原始思路的⼀个【反向】版本
 * 
 * 状态转移⽅程： dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1
 * 
 * 时间复杂度 O(KN)
 * 
 * @param {*} K 
 * @param {*} N 
 */
function superEggDrop4(K, N) {
    // 二维数组 [k+1]行 [N+1]列
    const dp = [];
    for (let i = 0; i <= K; i++) {
        dp[i] = [];
        for (let j = 0; j <= N; j++) {
            dp[i][j] = 0; // 都初始化为0
        }
    }
    // console.log('dp数组初始化后是:', dp);

    // base case 定时dp时已经默认数组都为0了
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

console.log('==========superEggDrop4===========');

console.log(superEggDrop4(K1, N1));
console.log(superEggDrop4(K2, N2));
console.log(superEggDrop4(K3, N3));
