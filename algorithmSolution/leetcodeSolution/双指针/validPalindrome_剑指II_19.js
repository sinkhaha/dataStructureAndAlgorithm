/**
 * 剑指 Offer II 019. 最多删除一个字符得到回文
 * 简单
 * https://leetcode.cn/problems/RQku0D/
 * 
 * 解法：双指针
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    // 双指针 时间O(n) 空间O(1)
    if (s.length == 1 || s.length == 2) {
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    while (left <= right) {
        if (s[left] == s[right]) {
            left++;
            right--;
        } else {
            // 选择删掉left指向的字符 或 删掉right指向的字符
            return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
        }
    }

    return true;
};

// 判断s字符串[left, right]区间是否是回文
const isPalindrome = (s, left, right) => {
    while (left <= right) {
        if (s[left] == s[right]) {
            left++;
            right--;
        } else {
            return false;
        }
    }

    return true;
}