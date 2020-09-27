/**
 * 42. 接雨水
 * 困难 
 */
/**
 * 暴力解法
 * 
 * 每根柱子盛的水跟最左边和最右边的高度有关
 * 
 * min(每根柱子最左边的最大高度， 最右边的最大高度) - 当前柱子的高度 = 当前柱子可以盛的水
 * 
 * 时间复杂度 O(N^2)
 * 空间复杂度 O(1)
 * 
 * @param {number[]} height
 * @return {number}
 */
var trap1 = function (height) {
    let n = height.length;
    if (n === 0) {
        return 0;
    }
    let result = 0;

    // 不需要 最左边 和 最右边，因为没办法盛水
    for (let i = 1; i < n - 1; i++) {
        // 找到左边最高的
        let left_max = 0;
        for (let j = i; j >= 0; j--) {
            left_max = Math.max(height[j], left_max);
        }
        // 找到右边最高的
        let right_max = 0;
        for (let j = i; j < n; j++) {
            right_max = Math.max(height[j], right_max);
        }
        // min(左边，右边) - 当前高度 = 可以盛的水的高度
        result += Math.min(right_max, left_max) - height[i];
    }

    return result;
};

/**
 * 解法一的优化
 * 
 * 备忘录法
 * 
 * 用两个数组
 * left_max存当前柱子左边的最高高度,left_max[i]即为位置i左边的最高的柱子的高度
 * right_max存当前柱子右边的最高高度
 * 
 * 
 * 
 * 
 * @param {*} height 
 */
var trap2 = function (height) {
    let n = height.length;
    if (n === 0) {
        return 0;
    }

    let left_max = [];
    let right_max = [];
    left_max[0] = height[0];
    right_max[n - 1] = height[n - 1];

    for (let i = 1; i < n; i++) {
        left_max[i] = Math.max(height[i], left_max[i - 1]);
    }

    for (let i = n - 2; i >= 0; i--) {
        right_max[i] = Math.max(height[i], right_max[i + 1]);
    }

    console.log('左边最大值数组', left_max);
    console.log('右边最大值数组', right_max);

    // 计算结果
    let result = 0;
    for (let i = 1; i < n - 1; i++) {
        result += Math.min(left_max[i], right_max[i]) - height[i];
    }
    return result;
};


function test() {
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    console.log(trap1(height)); // 6
    console.log(trap2(height)); // 6
}
test();
