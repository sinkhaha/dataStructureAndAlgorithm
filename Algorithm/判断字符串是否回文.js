/**
 * 判断一个字符串是不是回文串
 * 
 * 转成数组直接反转然后比较
 * 
 * @param {*} str 
 */
function palindromes(str) {
    let newStr = str.toLowerCase();
    let reverseStr = newStr.split('').reverse().join('');

    return reverseStr === newStr;
}

console.log(palindromes('asddsa')); // true
console.log(palindromes('adg')); // false
