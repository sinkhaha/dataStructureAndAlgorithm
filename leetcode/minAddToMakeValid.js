/**
 * 921. 使括号有效的最少添加
 * 
 * 中等
 * 
 * 思路:
 * 以左括号为基准，通过维护对右括号的需求数，来计算最小的插入次数
 * 
 * @param {*} S
 */
function minAddToMakeValid(S) {
    // 记录做括号插入次数
    let leftCount = 0;
    // 记录右括号的需求量
    let needRight = 0;

    for (let i = 0; i < S.length; i++) {
        if (S[i] === '(') {
            // 对右括号的需求 + 1
            needRight++; 
        }
        if (S[i] === ')') {
            // 对右括号的需求 - 1
            needRight--;

            // 等于-1表示右括号太多，需要插入左括号
            if (needRight === -1) {
                needRight = 0;
                leftCount++;
            }
        }
    }

    // 左括号插入次数 + 右括号的需求
    return leftCount + needRight;
}
const S = '))(';
console.log(minAddToMakeValid(S)); // 3
