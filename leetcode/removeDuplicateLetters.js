/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    // 字符对应出现的个数
    let countMap = new Map();
    for (let char of s) {
        const value = countMap.get(char);
        if (value) {
            countMap.set(char, value + 1);
        } else {
            countMap.set(char, 1);
        }
    }
    
    let result = [];
    for (let char of s) {
        const value = countMap.get(char);
        countMap.set(char, value - 1);

        if (result.includes(char)) {
            continue;
        }

        while (result.length && char < result[result.length - 1]) {
            const last = result[result.length - 1];
            if (countMap.get(last) === 0) {
                break;
            }
            result.pop();
        }
        result.push(char);
    }

    return result.toString().replace(/,/g, '');
};