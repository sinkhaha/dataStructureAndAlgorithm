/**
 * 剑指 Offer II 037. 小行星碰撞
 * 中等
 * https://leetcode.cn/problems/XagZNi/
 * 
 * 解法：栈
 */
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
    // 栈
    let stack = [];

    for (let num of asteroids) {
        // 只有当前元素小于0，且栈顶元素大于0时，才会相撞
        if (num < 0) {
            // 栈顶元素小于当前元素，栈顶元素会爆炸，所以栈顶出栈
            while (stack.length > 0 && stack[stack.length - 1] > 0 && stack[stack.length - 1] < Math.abs(num)) {
                stack.pop();
            }

            // 栈顶跟新元素相等则两个一起爆炸，栈顶大于新元素就是新元素自己爆炸，当前元素需要爆炸，即不入栈
            if (stack.length > 0 && stack[stack.length - 1] >= Math.abs(num)) {
                // 两个元素相等，两个都爆炸
                if (stack[stack.length - 1] == Math.abs(num)) {
                    stack.pop();
                }
                // 跳过for单次循环，则不执行下面入栈的逻辑，表示当前元素爆炸
                continue;
            }

            stack.push(num);
        } else {
            stack.push(num);
        }

    }

    return stack;
};