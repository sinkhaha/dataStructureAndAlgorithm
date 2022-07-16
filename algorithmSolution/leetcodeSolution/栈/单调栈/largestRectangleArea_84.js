/**
 * 84. 柱状图中最大的矩形
 * 困难
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/
 * 
 * 解法：单调递增栈
 * 
 */
/**
 * 
 * @param {*} heights 
 * @returns 
 */
var largestRectangleArea = function (heights) {
    heights.push(0);
    const len = heights.length;

    let result = 0;
    const indexStack = [];

    for (let i = 0; i < len; i++) {
        while (indexStack.length && heights[i] <= heights[indexStack.slice(-1)]) {
            let h = heights[indexStack.slice(-1)];
            indexStack.pop();

            const j = indexStack.length
                ? indexStack.slice(-1)
                : -1;

            result = Math.max(result, h * (i - j - 1));
        }

        indexStack.push(i);
    }

    return result;
};