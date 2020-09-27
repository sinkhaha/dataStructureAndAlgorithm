/**
 * 42. 接雨水
 * 困难 
 */
/**
 * 
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let n = height.length;
    let result = 0;

    for (let i = 1; i < n - 1; i++) {
        // 找到左边最高的
        let left_max = height[i];
        for (let j = i; j >= 0; j--) {
            left_max = Math.max(height[j], left_max);
        }
        // 找到右边最高的
        let right_max = height[i];
        for (let j = i; j < n; j++) {
            right_max = Math.max(height[j], right_max);
        }
        // min(左边，右边) - 当前高度 = 可以盛的水的高度
        result += Math.min(right_max, left_max) - height[i];
    }

    return result;
};


function test() {
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    console.log(trap(height)); // 6
}
test();
