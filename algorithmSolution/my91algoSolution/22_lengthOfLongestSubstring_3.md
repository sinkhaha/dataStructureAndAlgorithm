## 题目
**3. 无重复字符的最长子串**
>中等

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```
示例 2:
```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```
示例 3:
```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：滑动窗口(哈希表计数)(推荐)
### 思路
滑动窗口的解法

> 要关注什么时候该扩大窗口，什么时候该缩小窗口

* 维护一个map，key是字符，value是该字符出现的次数
* `两个指针`同时指向第一个字符，右指针移动使得右窗口扩大，计算该字符出现的次数，如果当前字符出现次数大于1，说明出现重复字符，此时需要缩小左窗口，一直缩小到不会出现重复字符为止，然后更新最长无重复子串的长度

### 代码
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!s) {
        return 0;
    } 

    // 窗口，key是字符，value是字符出现的次数
    let win = new Map();

    let result = 0;
    let left = 0
    let right = 0;

    while (right < s.length) {
        // 右边字符数加1，右窗口扩大
        let rightLetter = s[right];
        win.set(rightLetter, (win.get(rightLetter) || 0) + 1);
        right++;

        // 如果右边字符数大于1，说明此时出现了重复字符，应该缩小左窗口
        // 一直缩到没有出现重复字符了，此时更新最长无重复字串的长度
        while(win.get(rightLetter) > 1) {
            let leftLetter = s[left];
            if (win.has(leftLetter)) {
                win.set(leftLetter, win.get(leftLetter) - 1);
            }
            left++;
        }
        result = Math.max(result, (right - left));
    }
    return result;
};
```

### 复杂度
* 时间复杂度O(N)，N为s的长度
* 空间复杂度O(N)

## 解法2:滑动窗口
### 思路
跟解法1同样是滑动窗口解法，思路类似，只是实现代码不一样

* 维护一个map存储已经遍历过的字符，key为字符，value为当前字符的下标
* 两个指针start和end，start为无重复子串开始的下标，end为当前遍历字符的下标
* 遍历字符串，如果当前字符串`s[end]`在map中，说明出现了重复字符，取出`s[end]`的下标index，更新start的下标为index的下一位置，即`index+1`，此时start到end为最新的无重复子串，更新最长的无重复子串的长度
* 把当前字符`s[end]`及其下标end放入map中
* 遍历结束返回结果即可

### 代码
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!s) {
        return 0;
    } 
    
    // key是字符，value是该字符的下标
    let map = new Map(); 
    let result = 0;
    for (let start = 0, end = 0; end < s.length; end++) {
        let curChar = s[end];
        // 出现了重复字符
        if (map.has(curChar)) {
            start = Math.max(start, map.get(curChar) + 1); 
        }
        // 更新最长无重复字串长度
        result = Math.max(result, end - start + 1);
        map.set(curChar, end);
    }
   
    return result;
};
```

### 复杂度
* 时间复杂度O(N)，N为s的长度
* 空间复杂度O(N)
