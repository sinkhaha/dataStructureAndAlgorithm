## 题目
**76. 最小覆盖子串**
>困难

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。


示例 1：
```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```
示例 2：
```
输入：s = "a", t = "a"
输出："a"
```

提示：
* 1 <= s.length, t.length <= 105
* s 和 t 由英文字母组成


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 解法:滑动窗口
### 思路

**滑动窗口算法的思路**
1. 在字符串S中使用双指针中的左右指针技巧，初始化`left = right = 0`，把索引左闭右开区间`[left, right)`称为一个「窗口

2. 先不断地增加right指针扩大窗口`[left, right)`，直到窗口中的字符串符合要求（包含了T中的所有字符）

3. 此时，停止增加right，转而不断增加left指针缩小窗口`[left, right)`，直到窗口中的字符串不再符合要求（不包含T中的所有字符了），同时，每次增加left，我们都要更新一轮结果

4. 重复第 2 和第 3 步，直到right到达字符串S的尽头

**滑动窗口需要思考以下4个问题**
1. 当移动right扩大窗口，即加入字符时，要更新什么数据

2. 窗口在什么条件时应该暂停扩大，开始移动left缩小窗口

3. 当移动left缩小窗口，即移出字符时，需要更新什么数据

4. 我们要的结果应该在扩大窗口时还是缩小窗口时进行更新，
如果一个字符进入窗口，应该增加window计数器；如果一个字符将移出窗口的时候，
应该减少window计数器；当isValidCount满足need时应该收缩窗口；
应该在收缩窗口的时候更新最终结果

>解法类似`483题的 findAnagrams`，`567题的 checkInclusion`


### 代码

```js
/**
 * 
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(source, target) {
    if (source.length < target.length) {
        return '';
    }
    if (source.includes(target)) {
        return target;
    }

    // window和need两个哈希表，记录窗口中的字符和需要凑齐的字符
    // key是要匹配的字符，value值是1，即出现的次数
    const needs = new Map();
    for (let t of target) {
        const v = needs.get(t) || 0;
        needs.set(t, v + 1)
    }
   
    // 存滑动窗口出现的字符，key是出现在target的字符，value是出现的次数
    const window = new Map();

    let isValidCount = 0; // 存放滑动窗口中的key的个数满足needs条件的字符个数

    // 记录最小覆盖子串的起始索引及长度
    let start = 0;
    let len = Number.MAX_VALUE;

    // 左右指针
    let left = 0;
    let right = 0;
    
    while (right < source.length) {
        let rightLetter = source[right];
                
        // 1.进行窗口的数据更新，当前字符是需要的则加入窗口
        if (needs.has(rightLetter)) {
            const count = window.get(rightLetter) || 0;
            window.set(rightLetter, count + 1);

            // 2.如果相等则有效计数+1，排除掉窗口中值大于1的，即有重复的字符
            if (needs.get(rightLetter) === window.get(rightLetter)) {
                isValidCount++;
            }
        }

        right++; // 扩大窗口

        // 3.左移动窗口，window已经包含了needs所有的字符
        while (isValidCount === needs.size) {
            // 更新最小覆盖字串
            const curLen = right - left;
            if (curLen < len) {
                start = left;
                len = curLen;
            }

            let l = source[left];
            if (needs.has(l) && window.has(l)) {
                // 4.即将窗口左移动后，窗口已经不包含需要的字符了，有效计数需要减一
                if (window.get(l) === needs.get(l)) {
                    isValidCount--;
                }
                window.set(l, window.get(l) - 1);
            }
            
            // 缩小窗口
            left++;
        }
    }

    return len === Number.MAX_VALUE 
        ? ''
        : source.substr(start, len);
};
```

### 复杂度
* 时间复杂度O(N) N为source度长度
* 空间复杂度O(M) M为target度长度