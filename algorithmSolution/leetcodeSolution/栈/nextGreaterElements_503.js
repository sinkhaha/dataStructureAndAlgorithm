// 503. 下一个更大元素 II
// https://leetcode-cn.com/problems/next-greater-element-ii/
// 
// 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），
// 输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，
// 这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。
// 如果不存在，则输出 -1。
//
// 输入: [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数； 
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。

/**
 * 单调栈解法
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * @param {*} nums 
 */
let nextGreaterElementsCircle = function(nums) {
    let n = nums.length;
    // 保存下标
    let stack = [];
    let resultArr = [];

    // 乘以2假装把数组扩为两倍长度
    for (let i = 2 * n - 1; i >= 0; i--) {
        // i % n 除模取余模拟环形, 后面的操作会把前面的数组相同的下标的值覆盖掉,
        // 其实这里是想对最后一个数起作用
        while (stack.length && nums[i % n] >= stack[stack.length - 1]) {
            stack.pop();
        }

        resultArr[i % n] = stack.length 
            ? stack[stack.length - 1] 
            : -1;

        stack.push(nums[i % n]);
    }
    return resultArr;
};
console.log(nextGreaterElementsCircle([1,2,4,1])); // [ 2, 4, -1, 2 ]


// 原始题一
// 给一个数组，返回一个等长的数组，对应索引存储着下一个更大元素，
// 如果没有更大的元素，就存 -1。
// 例子：
// 给你一个数组 [2,1,2,4,3]，最后返回数组 [4,2,4,-1,-1]
let nextGreaterElements = function(nums) {
    let stack = [];
    let results = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        while (stack.length && nums[i] >= stack[stack.length - 1]) {
            stack.pop();
        }
        results[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(nums[i]);
    }
    return results;
}
console.log(nextGreaterElements([2,1,2,4,3]));

// 变形一
// 给你一个数组 T = [73, 74, 75, 71, 69, 72, 76, 73]，这个数组存放的是
// 近几天的天气气温（华氏度）。
// 你返回一个数组，计算：对于每一天，你还要至少等多少天才能等到一个更暖和的气温；
// 如果等不到那一天，填 0 。
// 举例：给你 T = [73, 74, 75, 71, 69, 72, 76, 73]，你返回 [1, 1, 4, 2, 1, 1, 0, 0]。
let nextGreaterElementsWenDu = function(nums) {
    let indexStack = []; // 存放索引
    let results = []; // 存间隔
    for (let i = nums.length - 1; i >= 0; i--) {
        while (indexStack.length && nums[i] >= nums[indexStack[indexStack.length - 1]]) {
            indexStack.pop();
        }
        results[i] = indexStack.length ? indexStack[indexStack.length - 1] - i : 0;
        indexStack.push(i);
    }
    return results;
}
console.log(nextGreaterElementsWenDu([73, 74, 75, 71, 69, 72, 76, 73]));
