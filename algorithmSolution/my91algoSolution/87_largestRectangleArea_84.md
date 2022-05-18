
# 题目
**84. 柱状图中最大的矩形**
> 困难
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

示例 1:
```
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
```

提示：
* 1 <= heights.length <=105
* 0 <= heights[i] <= 104

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 方法一：暴力（超时）
### 思路
遍历数组（对于每一个高度分别向左边和右边扩散，求出以当前高度为高度的矩形的最大宽度是多少
* 当前元素向左遍历，则找到比当前高度矮的柱子停止
* 当前元素向右遍历，则找到比当前高度矮的柱子停止
* 最后计算宽度差

### 代码
```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    const len = heights.length;
    if (len === 0 || len === 1) {
        return heights[0] || 0;
    }

    let result = 0;
    for (let i = 0; i < len; i++) {
        let curHeight = heights[i];

        let left = i;
        // 向左遍历
        while(left > 0 && heights[left - 1] >= curHeight) {
            left--;
        }

        let right = i;
        // 向右遍历
        while(right < len - 1 && heights[right + 1] >= curHeight) {
            right++;
        }

        let width = right - left + 1;
        result = Math.max(result, width * curHeight);
    }

    return result;
};
```
### 复杂度
 * 时间复杂度O(N^2)
 * 空间复杂度O(1)

## 方法二：单调递增栈(空间换时间)
### 思路
单调递增栈求解，栈中存数组元素的下标，下标对应数组的元素值是单调递增的，栈中表示的是这些下标对应能形成的矩形最大面积还是不确定的
1. 遍历数组
2. 如果栈中有值 并且 当前元素小于栈顶元素，说明可以求栈顶元素的高为矩形的高时的面积(因为右边没有更高的柱子了，可以确定矩形的面积了)，此时需要确定宽度，怎么确定宽度呢
3. 栈顶元素出栈（出栈元素对应数组的值即为矩形的高）
4. 如果栈中没有元素，说明当前数组遍历到的元素的高度是目前遍历到的最短的柱子了，那此时宽度就等于当前遍历的元素的下标
5. 如果栈中还有元素，说明前面还有没能确定面积的柱子，则先计算当前的最大面积，宽度就是`当前下标-栈顶元素-1`
6. 一直重复2步骤，直到不满足条件（即一直计算前面能确定面积的柱子）
7. 最后栈中可能存在单调递增的元素，此时也要计算面积

### 代码
```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const len = heights.length;
    if (len === 0 || len === 1) {
        return heights[0] || 0;
    }

    let result = 0;

    // 单调递增栈，存下标（下标对应的数组值单调地增）
    const indexStack = [];

    for (let i = 0; i < len; i++) {
        // 当前元素 < 栈顶元素，说明栈定元素能确定右边界，即栈顶元素自己
        while (indexStack.length && heights[i] < heights[indexStack.slice(-1)]) {
            // 获取栈顶元素的高度，然后删除栈顶元素
            const topIndex = indexStack.pop();
            const h = heights[topIndex];

            // 接下来确定栈顶元素的左边界，即确定矩形的宽

            // 栈顶元素出栈后
            // 如果栈不为空，则计算已出栈的元素能形成的面积的宽度
            // 如果栈为空，说明当前柱子是目前遍历最短的柱子，宽度是当前的下标
            const w = indexStack.length
                ? i - indexStack.slice(-1) - 1
                : i;

            result = Math.max(result, h * w);
        }

        // 大于栈顶元素，说明当前元素没有确定右边界，则入栈
        indexStack.push(i);
    }

    // 栈可能还有递增的数据，栈只有一个元素，说明宽即为数组长度len
    // 栈如果还有元素，则要以当前元素的下标为宽度
    while (indexStack.length) {
        const topIndex = indexStack.pop();
        const h = heights[topIndex];

        const w = indexStack.length
            ? len - indexStack.slice(-1) - 1
            : len;

        result = Math.max(result, h * w);
    }

    return result;
};
```
或
```js
// 单调递增栈
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
```
### 复杂度
 * 时间复杂度O(N)
 * 空间复杂度O(N)
