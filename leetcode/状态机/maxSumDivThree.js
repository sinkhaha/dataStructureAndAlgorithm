/**
 * 1262. 可被三整除的最大和
 * 
 */
/**
 * 暴力法(回溯)
 * 
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree1 = function (nums) {
    let result = 0;
    backtrace = function (temp, start) {
        const total = sum(temp);
        if (total % 3 === 0) {
            result = Math.max(result, total);
        }
        for (let i = start; i < nums.length; i++) {
            temp.push(nums[i]);
            backtrace(temp, i + 1);
            temp.pop();
        }
    }
    backtrace([], 0);
    return result;
};

function sum(arr) {
    var s = 0;
    arr.forEach(function (val, idx, arr) {
        s += val;
    }, 0);

    return s;
};

const nums = [1,2,3,4,4];
console.log(maxSumDivThree1(nums)); // 12


/**
 * 解法二
 * 有限状态机
 * 
 * 解题思路：
 * 1.维护一个3个元素的state数组
 *  state[0] 表示 mod 为 0 的 最大和
 *  state[1] 表示 mod 为 1 的 最大和
 *  state[2] 表示 mod 为 2 的 最大和
 * 
 * 2.遍历nums数组的每个元素num
 * (1)当num%3为0时，state各个元素加上num后，mod 3的值不变
 * (2)当num%3为1时，
 * state[2] + num后是一个能被3整除的数，此时只需比较和state[0]哪个大，把值大的赋予state[0]即可,即state[0] = Max(state[2] + num, state[0])
 * state[0] + num后是一个mod 3为1的数，此时state[1] = Max(state[0] + num, state[1])
 * state[1] + num后是一个mod 3为2的数，此时state[2] = Max(state[1] + num, state[2])
 * (3)当num%3为2时，
 * state[1] + num后是一个能被3整除的数，此时state[0] = Max(state[1] + num, state[0])
 * state[2] + num后是一个mod 3为1的数，此时state[1] = Max(state[2] + num, state[1])
 * state[0] + num后是一个mod 3为2的数，此时state[2] = Max(state[0] + num, state[2])
 * 
 * 3.最后返回 state[0]即可
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * 
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree2 = function(nums) {
    let state = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

    for (let num of nums) {
        if (num % 3 === 0) {
            state = [state[0] + num, state[1] + num, state[2] + num ]
        } else if (num % 3 === 1) {
            const a = Math.max(state[2] + num, state[0]);
            const b = Math.max(state[0] + num, state[1]);
            const c = Math.max(state[1] + num, state[2]);
            state = [a, b, c];
        } else if (num % 3 === 2) {
            const a = Math.max(state[1] + num, state[0]);
            const b = Math.max(state[2] + num, state[1]);
            const c = Math.max(state[0] + num, state[2]);
            state = [a, b, c];
        }
    }
    return state[0];
};

console.log(maxSumDivThree2(nums)); // 12

/**
 * 解法二的代码整洁版
 * @param {*} nums 
 */
var maxSumDivThree3 = function(nums) {
    let state = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

    for (let num of nums) {
        const temp = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            const index = (i + num) % 3;
            temp[index] = Math.max(state[index], state[i] + num);
        }
        state = temp;
    }

    return state[0];
}
console.log(maxSumDivThree3(nums)); // 12

