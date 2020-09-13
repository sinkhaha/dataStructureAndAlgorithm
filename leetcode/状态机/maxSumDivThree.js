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
 * 有限状态机
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree2 = function(nums) {

};
