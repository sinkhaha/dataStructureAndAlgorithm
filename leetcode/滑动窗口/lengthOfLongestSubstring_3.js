/**
 * leetcode 3 无重复字符的最长子串
 * Medium
 * 
 * 输入: "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 时间复杂度O(n) n为s的长度
 * 空间复杂度O(n)
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!s) {
        return 0;
    }
    let win = new Map(); // 存放s各个字符出现的次数

    let left = 0;
    let right = 0;
    let result = 0; // 结果

    // 右指针移动
    while (right < s.length) {
        // 右指针的字符放入win，移动右指针
        let rightLetter = s[right];
        const value = win.get(rightLetter);
        if (value !== undefined) {
            win.set(rightLetter, value + 1);
        } else {
            win.set(rightLetter, 1);
        }

        right++;

        // 左指针移动(当前窗口加入该right指向的字符后，如果已经出现重复字符了，需要移动左指针)
        while (win.get(rightLetter) > 1) {
            const leftLetter = s[left];

            const value = win.get(leftLetter);
            if (value !== undefined) {
                // 左移时，如果窗口包含了该字符，移除该字符
                win.set(leftLetter, value - 1);
            }
            left++;
        }

        result = Math.max(result, right - left);
    }

    return result;
};

const s = 'abcabcbb';
console.log(lengthOfLongestSubstring(s));
