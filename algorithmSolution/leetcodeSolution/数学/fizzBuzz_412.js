/**
 * 412. Fizz Buzz
 * 简单
 * https://leetcode.cn/problems/fizz-buzz/
 * 
 * 解法：数学
 * 
 */
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    let result = [];

    for (let i = 1; i <= n; i++) {
        let item;
        if (i % 3 == 0 && i % 5 == 0) {
            item = 'FizzBuzz';
        } else if (i % 3 == 0) {
            item = 'Fizz';
        } else if (i % 5 == 0) {
            item = 'Buzz';
        } else {
            item = String(i);
        }
        result[i - 1] = item;
    }

    return result;
};