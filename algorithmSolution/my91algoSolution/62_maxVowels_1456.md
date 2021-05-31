## 题目
**1456. 定长子串中元音的最大数目**
>中等

给你字符串 s 和整数 k 。

请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。

英文中的 元音字母 为`（a, e, i, o, u）`。

 

示例 1：
```
输入：s = "abciiidef", k = 3
输出：3
解释：子字符串 "iii" 包含 3 个元音字母。
```
示例 2：
```
输入：s = "aeiou", k = 2
输出：2
解释：任意长度为 2 的子字符串都包含 2 个元音字母。
```
示例 3：
```
输入：s = "leetcode", k = 3
输出：2
解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
```
示例 4：
```
输入：s = "rhythms", k = 4
输出：0
解释：字符串 s 中不含任何元音字母。
```
示例 5：
```
输入：s = "tryhard", k = 4
输出：1
```

提示：
* 1 <= s.length <= 10^5
* s 由小写英文字母组成
* 1 <= k <= s.length

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：滑动窗口
### 思路
* 维护一个窗口，窗口大小为k，双指针进行移动，右指针进行扩大窗口`right++`，左指针进行缩小窗口`left++`，当窗口大于k时，需要进行缩小窗口
* 每次计算当前窗口中元音字母的个数，保存最大值即可

### 代码
```js
/**
 * 空间O(1)
 * 时间O(n),n为s的长度
 * 
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    if (!s || !k) {
        return 0;
    }
    
    // 判断字符是否是元音字母
    let isVowel = char => ['a', 'e', 'i', 'o', 'u'].includes(char);
    
    let left = 0;
    let right = 0;
    let ans = 0;
    // 当前窗口内的元音字母个数
    let winCount = 0;

    // 窗口扩大
    while (right < s.length) {
        if (isVowel(s[right])) winCount++;
        
        // 窗口缩小
        if (right - left >= k) {
            if (isVowel(s[left])) winCount--;    
            left++;
        }
        ans = Math.max(ans, winCount);
      
        // 元音数最多等于k，可以提前跳出
        if (ans === k)  break;
      
        right++;
    }

    return ans;
};
```
### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)
