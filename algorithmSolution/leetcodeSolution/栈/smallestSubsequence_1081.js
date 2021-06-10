/**
 * leetcode 1081 不同字符的最小子序列
 * https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/
 * 
 * 解法同316题 removeDuplicateLetters
 * 
 * @param {string} text
 * @return {string}
 */
var smallestSubsequence = function(text) {
    let countMap = {};

    for (let c of text) {
        countMap[c] = countMap[c] 
            ? countMap[c] + 1 
            : 1;
    }

    let result = [];
    for (let s of text) {
        // 计数减1
        countMap[s] = +countMap[s] - 1;

        if (result.includes(s)) {
            continue;
        }

        while (result.length && s < result.slice(-1)) {
            const last = result.slice(-1);
            if (countMap[last] === 0) {
                break; 
            }
            result.pop();
        }
        
        result.push(s);
    }
    
    return result.join(''); 
};

const text = 'cdadabcc';
console.log(smallestSubsequence(text)); // adbc
