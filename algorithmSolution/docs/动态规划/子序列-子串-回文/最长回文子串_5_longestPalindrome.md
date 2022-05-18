## 题目
**5. 最长回文子串**
>中等

https://leetcode-cn.com/problems/longest-palindromic-substring/

## 解法：动态规划
### 思路
1. 状态：`i`和`j`不同时，`dp[i][j]`状态随之改变
2. 选择：当选择`s[i]`和`s[j]`字符时，影响到`s[i]`到`s[j]`之间是否是回文串
3. dp数组定义：
`dp[i][j]`表示`s[i..j]`的字符串是回文串，即`s[i]`到`s[j]`是回文串
4. 状态转移方程
* 当`s[i] != s[j]，dp[i][j] = false `
>`dp[i][j] = false `表示`s[i]`不等于`s[j]`，则`i`和`j`之间的字符串一定不是回文串

* 当`s[i] == s[j]`， `dp[i][j] = dp[i + 1][j - 1] 或 dp[i][j] = true (j - i < 3）`

>`dp[i][j] = dp[i + 1][j - 1]`，表示`i`到`j`之间，如果`i+1`到`j-1`之间是回文串，那当`s[i]`和`s[j]`相等时，`i`到`j`之间也是回文串


5. 基础情况base case
* 如果s只有一个字符，只能构成一个回文子串，即最长长度为1，
也就是`dp[i][j] = true (i==j)`，即dp二维数组对角线都为true


### 代码
```javascript
/**
 * 
 * @param {*} s 
 */
function longestPalindrome(s) {
    let n = s.length;
    if (n < 2) {
        return s;
    }

    // 初始化二维数组
    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            // base case 当i==j时，dp[i][j]为true，1个字符是回文初始化为true，其他元素都初始化为false
            if (i === j) {
                dp[i][j] = true;
            } else {
                dp[i][j] = false;
            }
        }
    }

    // console.log(dp);

    let start = 0;
    let maxLength = 1;

    
    // 因为已知值在对角线，所以从下往上，从左到右遍历
    // 左选择s[i]和s[j]
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                // [i..j]长度小于3一定是回文，其实只是下面dp[i+1][j-1]的特殊处理
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    // 表示i到j之间，如果i+1到j-1之间是回文串，那当s[i]和s[j]相等时，i到j之间也是回文串    
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }
            
            // 更新结果
            // dp[i][j] == true，表示子串 s[i..j] 是回文，记录回文长度j-i+1和起始位置
            if (dp[i][j] === true && j - i + 1 > maxLength) {
                maxLength = j - i + 1;
                start = i;
            }
        }
    }

    return s.substring(start, start + maxLength);
}
```


### 复杂度
* 时间复杂度 O(N^2)，N 是字符串的长度，动态规划的状态总数为 O(N^2)，对于每个状态，需要转移的时间为 O(1)
* 空间复杂度 O(N^2)

## 解法2：中心扩展法

### 思路
遍历每一个索引，以这个索引为中心，利用"回文串"中心对称的特点，从中间开始向两边扩散来判断回文串，看最多能扩散多长

注意：回文串在长度为奇数和偶数的时候，"回文中心"不一样
* 当回文串的长度是奇数时，回文串的中心是一个具体的字符
* 当回文串的长度是偶数时，回文串的中心是位于中间的两个字符的"空隙"

### 代码
```javascript
/**
 *
 * @param {*} s 
 */
function longestPalindrome(s) {
    let res = '';
    for (let i = 0; i < s.length; i++) {
        // 奇数：以s[i]为中心的最长回文串
        let s1 = palindrome(s, i, i);
        // 偶数：以 s[i]和s[i+1] 为中心的最长回文串
        let s2 = palindrome(s, i, i + 1);
        // 找s1、s2和res的最长的回文串
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }
    return res;
}

/**
 * 向两边扩散，寻找最长回文串
 * 
 * 时间O(n)
 *
 * @param {*} s 字符串
 * @param {*} l 左
 * @param {*} r 右
 */
function palindrome(s, l, r) {
    // 越界处理，向两边扩散
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--;
        r++;
    }
    // 返回以s[l]和s[r]为中心的最长回文串
    return s.substr(l + 1, r - l - 1);
}
```

### 复杂度
* 时间复杂度 O(N^2)
* 空间复杂度 O(1)
