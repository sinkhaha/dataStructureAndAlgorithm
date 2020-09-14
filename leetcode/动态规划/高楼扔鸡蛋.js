/**
 * leetcode 887 鸡蛋掉落
 * hard
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

console.log(superEggDrop2(K1, N1));
console.log(superEggDrop2(K2, N2));
console.log(superEggDrop2(K3, N3));


function superEggDrop3(K, N) {

}