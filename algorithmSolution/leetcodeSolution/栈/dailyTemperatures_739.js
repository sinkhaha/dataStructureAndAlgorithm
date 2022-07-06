/**
 * 739. 每日温度
 * 中等
 * https://leetcode.cn/problems/daily-temperatures/
 * 
 * 解法：单调栈
 * 
 * 时间O(n) 
 * 空间O(n)
 */
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    let map = new Map(); // key是temperatures的下标，value是比key对应数和其下一个大的数下标差>

    let stack = []; // 单调递减栈，从栈底到栈顶是从大到小

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const popIndex = stack.pop();
            map.set(popIndex, i - popIndex);
        }
        stack.push(i);
    }

    return temperatures.map((_, index) => {
        return map.get(index) || 0;
    });
};