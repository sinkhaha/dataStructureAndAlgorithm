/**
 * leetcode 20 有效的括号
 * https://leetcode-cn.com/problems/valid-parentheses/
 * 
 * 题目：
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 *
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 *
 * 比如
 * 输入: "()[]{}"
 * 输出: true
 */
/**
 * 思路：
 * 1. 用栈来保存未匹配的左括号，从左到右依次扫描字符串
 * 2. 当扫描到左括号时，则将其压入栈中，当扫描到右括号时，从栈顶取出一个左括号
 * 3. 如果能够匹配，则继续扫描剩下的字符串
 * 4. 如果扫描的过程中，遇到不能配对的右括号，或者栈中没有数据，则说明为非法格式
 * 5. 当所有的括号都扫描完成之后，如果栈为空，则说明字符串为合法格式
 * 6. 否则，说明有未匹配的左括号，为非法格式
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 */
function isValid(str) {
    const leftRightMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    
    // 左括号数组
    const lefts = [];
    for (let curSymbol of str) {
        if (['(', '[', '{'].includes(curSymbol)) {
            lefts.push(curSymbol); 
        } else {
            const leftSymbol = lefts.pop();
            let rightExpectSymbol = leftRightMap[leftSymbol];
            if (curSymbol !== rightExpectSymbol) {
                return false; 
            }
        }
    }
    return lefts.length === 0;
}

const str = '((((()))))';
console.log(isValid(str));