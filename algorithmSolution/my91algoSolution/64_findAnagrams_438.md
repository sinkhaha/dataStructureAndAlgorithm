## 题目
**438. 找到字符串中所有字母异位词**
>中等

给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:

```
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```
 示例 2:
```
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-all-anagrams-in-a-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：滑动窗口
### 思路
* 维护2个map，一个needPatchMap存需要匹配的字符及其个数，一个winMap存窗口中符合匹配的字符及其个数
* 左右指针在s上移动，保持窗口大小为p字符串的长度，窗口扩大和缩小时，进行窗口数据的更新
>解法类似`567题的 checkInclusion`，`76题的 minWindow`
### 代码
```js
/**
 * 
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const results = [];
    if (s.length < p.length) {
        return results;
    }

    // 存要匹配的字符及其出现的此时，key为要匹配的字符，value值是1，即出现的次数
    const needPatchMap = new Map();
    for (let t of p) {
        const v = needPatchMap.get(t) || 0;
        needPatchMap.set(t, v + 1);
    }
   
    // 滑动窗口内的数据，key是出现在p的字符，value是出现的次数
    const winMap = new Map();

    // 存放滑动窗口中的key的个数满足needPatchMap条件的字符个数
    let isValidCharCount = 0; 

    // 窗口左右指针
    let left = 0;
    let right = 0;
    
    while (right < s.length) {
        // 扩大窗口，对窗口内对数据进行更新
        let rightChar = s[right];
        // 1.当前字符是需要的则加入窗口
        if (needPatchMap.has(rightChar)) {
            const count = winMap.get(rightChar) || 0;
            winMap.set(rightChar, count + 1);
            
            // 2.如果相等则有效计数+1，排除掉窗口中值大于1的，即有重复的字符
            if (needPatchMap.get(rightChar) === winMap.get(rightChar)) {
                isValidCharCount++;
            }
        } 
        right++; // 扩大窗口    

        // 缩小窗口
        // 3.当前左右指针的长度>=要找的目标字符串长度
        if (right - left >= p.length) {
            // 当前窗口的个数符合需要查找的个数了加入结果
            if (isValidCharCount === needPatchMap.size) {
                results.push(left);
            }
  
            let leftChar = s[left];
            if (needPatchMap.has(leftChar)) {
                // 4.窗口缩小后，要判断左边移出的字符在不在窗口数据里
                // 窗口已经不包含需要的字符了，有效计数需要减一
                if (winMap.has(leftChar)) {
                    if (winMap.get(leftChar) === needPatchMap.get(leftChar)) {
                        isValidCharCount--;
                    }
                    winMap.set(leftChar, winMap.get(leftChar) - 1);
                }
            }
            
            // 缩小窗口
            left++;
        }      
    }

    return results;
};
```
### 复杂度
* 时间复杂度O(N) N为s度长度
* 空间复杂度O(M) M为p度长度