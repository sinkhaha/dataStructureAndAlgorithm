/**
 * 1541
 * 
 * 解法类似921
 * 
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let res = 0;
    let needRight = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            needRight += 2; // 一个左括号需要2个右括号

            // 当遇到左括号时，若对右括号的需求量为奇数，需要插入 1 个右括号
            if (needRight % 2 == 1) {
                res++;
                needRight--;
            }
        }

        if (s[i] == ')') {
            needRight--;
            if (needRight == -1) {
                res++;
                needRight = 1;
            }
        }
    }

    return res + needRight;
};

// TODO
const s = '(()))';
console.log(minInsertions(s)); // 1
