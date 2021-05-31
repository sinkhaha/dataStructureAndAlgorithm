/**
 * leetcode 844. 比较含退格的字符串
 * 简单
 * https://leetcode-cn.com/problems/backspace-string-compare/
 * 
 * @param {*} S 
 * @param {*} T 
 */
/**
 * 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，
 * 判断二者是否相等，并返回结果。 # 代表退格字符。
 * 注意：如果对空文本输入退格字符，文本继续为空。
 * 
 * 输入：S = "ab#c", T = "ad#c"
 * 输出：true
 * 
 * 解法一：使用栈存储每次输入的字符
 * 时间复杂度O(n+m)
 * 空间复杂度O(n+m)
 * 
 * n和m分别是S和T的长度
 * 
 * @param {*} S 
 * @param {*} T 
 */
const backspaceCompare = function(S, T) {
    if (S === T) {
        return true;
    }
    
    return deal(S) === deal(T)
};

/**
 * 使用栈存储每次输入的字符，遇到#则出栈
 * @param {*} 
 */
function deal(s) {
    const arr = s.split('');
    let result = [];

    arr.forEach(val => {
        if (val === '#') {
            result.pop(); 
        } else {
            result.push(val);
        }
    });
    return result.join('');
}

console.log(backspaceCompare('dc', 'dc'));
