## 题目
**10. 正则表达式匹配**
>困难

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

 
示例 1：
```
输入：s = "aa" p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
```
示例 2:
```
输入：s = "aa" p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```
示例 3：
```
输入：s = "ab" p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```
示例 4：
```
输入：s = "aab" p = "c*a*b"
输出：true
解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```
示例 5：
```
输入：s = "mississippi" p = "mis*is*p*."
输出：false
```

提示：

* 0 <= s.length <= 20
* 0 <= p.length <= 30
* s 可能为空，且只包含从 a-z 的小写字母。
* p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
* 保证每次出现字符 * 时，前面都匹配到有效的字符

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/regular-expression-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：动态规划
### 思路
常规匹配想法：两个指针i、j分别在s和p上移动，看两个字符是否匹配，如果最后两个指针都能移动到字符串的末尾，则匹配成功，否则匹配失败。


1. 状态：`i`、`j`指针的位置
2. 选择：模式串`p[j]`选择匹配几个字符
3. dp函数的定义
若`dp(s, i, p, j) = true`，则表示`s[0...i]`可以匹配`p[0...j]`
若`dp(s, i, p, j) = false`，则表示`s[0...i]`无法匹配`p[0...j]`

>根据dp函数，`dp(s, 0, p, 0)`就是所求结果，指针 `i`，`j` 从索引 0 开始移动

如果`s[i]`等于`p[j]`(`p[j] `可以是点通配符)
* 当`p[j+1]`为星号：当`星号通配符匹配0次`的情况，`i不变，j加2`； 当`星号通配符匹配多次`的情况，`i加1，j不变`，代表`s[i]`和`p[j]`匹配了，但星号匹配符可以匹配多次
* 当`p[j+1]`不为星号：则i和j同时加1，说明只有`s[i]`和`p[j]`匹配

如果`s[i]`不等于`p[j]`
* 当`p[j+1]`为星号：如果`星号匹配0次`，则`i不变，j加2`
* 当`p[j+1]`不为星号：则s和j一定不会匹配成功

4. 两个base case:
* `j == p.length`，即模式串p匹配完了，要看文本串s是否被匹配完，匹配完则说明匹配成功
* `i == s.length`，当s匹配完了，不能直接根据p是否匹配完判断是否成功，
而是要看`p[j..]`能够匹配空串，能则算完成匹配，如s = "a"， p = "ab*c*"，
当i走到s末尾的时候，j并没有走到p的末尾，但是p依然可以匹配s


### 代码
```javascript
/**
 * 
 * @param {*} s 
 * @param {*} p 
 */
function isMatch(s, p) {
    this.dp = function (s, i, p, j) {
        const m = s.length;
        const n = p.length;
        // base case1 模式串p匹配完了，要看文本串s是否被匹配完，匹配完则说明匹配成功
        if (j === n) {
            return i === m;
        }

        // base case2 当s匹配完了，不能直接根据p是否匹配完判断是否成功，
        // 而是要看p[j..]能够匹配空串，能则算完成匹配，如s = "a", p = "ab*c*"，当i走到s末尾的时候，j并没有走到p的末尾，但是p依然可以匹配s
        if (i === m) {
            // p剩下的个数不是成对出现，肯定不能匹配成功
            if ((n - j) % 2 == 1) {
                return false;
            }

            // 检查是否为 x*y*z* 这种形式，是则能匹配成功，不是则不能匹配成功
            for (j; j + 1 < n; j += 2) {
                if (p[j + 1] != '*') {
                    return false;
                }
            }
            return true;
        }

        // 当s[i]等于p[j]时
        if (s[i] === p[j] || p[j] === '.') {
            // 此时当p[j+1]为*
            if (j < n - 1 && p[j + 1] === '*') {
                // 星号通配符匹配前面的字符0次 或 多次(s跳过一个字符，p不变继续匹配即可)
                return this.dp(s, i, p, j + 2) || this.dp(s, i + 1, p, j); 
            } else {
                // p[j+1]不为星号，则i和j同时移动
                return this.dp(s, i + 1, p, j + 1);
            }
        } else {
            // 当s[i]不等于p[j]时，当p[j+1]为*，此时*匹配0次，则i不变，j跳过两位（跳过当前值和*）
            if (j < p.length - 1 && p[j + 1] === '*') {
                return this.dp(s, i, p, j + 2); 
            } else {
                // s[i]不等于p[j]，且p[j+1]不是星号，则一定不匹配
                return false;
            }
        }
    }
    
    // i、j指针分别从0开始移动
    return dp(s, 0, p, 0);
}

```
## 解法2: 备忘录
解法1的优化
### 代码
```javascript
/**
 * 解法一的优化，增加备忘录(推荐)
 * 
 * 时间复杂度 O(mn) m为s的长度，n为p的长度
 * 空间复杂度 O(mn)
 * 
 * @param {*} s 
 * @param {*} p 
 */
function isMatch(s, p) {
    const map = {};

    this.dp = function (s, i, p, j) {
        const m = s.length;
        const n = p.length;
        // base case
        if (j === n) {
            return i === m;
        }

        // base case
        if (i === m) {
            // p剩下的个数不是成对出现，肯定不能匹配成功
            if ((n - j) % 2 == 1) {
                return false;
            }

            // 检查是否为 x*y*z* 这种形式
            for (j; j + 1 < n; j += 2) {
                if (p[j + 1] != '*') {
                    return false;
                }
            }
            return true;
        }

        // 备忘录消除重复子问题
        const key = `${i}_${j}`;
        if (map[key] !== undefined) {
            return map[key];
        }

        let result = false;
        // s和p当前字符匹配
        if (s[i] === p[j] || p[j] === '.') {
            // 当p[j+1]为*
            if (j < n - 1 && p[j+1] === '*') {
                // 通配符匹配前面的字符0次或多次(跳过s一个字符，p不变继续匹配即可)
                result = this.dp(s, i, p, j+2) || this.dp(s, i + 1, p, j); 
            } else {
                result = this.dp(s, i+1, p, j+1);
            }
        } else {
            // 为*则匹配0次，s不变，p跳过两位（跳过当前值和*）
            if (j < p.length - 1 && p[j+1] === '*') {
                result = this.dp(s, i, p, j+2); 
            } else {
                result = false;
            }
        }
        // 添加备忘录
        map[key] = result;
        return result;
    }
    
    return dp(s, 0, p, 0)
}
```
## 解法3: 解法2的代码精简版
### 代码
```javascript
/**
 * 代码精简版
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch3 = function(s, p) {
    const map = {};
    this.dp = function(i, j) {
        const key = `${i}_${j}`;
        if (map[key]) {
            return map[key];
        }

        if (j === p.length) {
            return i === s.length;
        }

        let first = i < s.length && [s[i], '.'].includes(p[j]);
        
        let ans = false;
        if (j <= p.length - 2 && p[j+1] === '*') {
            ans = dp(i, j+2) || (first && dp(i + 1, j));
        } else {
            ans = first && dp(i+1, j+1);
        }

        map[key] = ans
        return ans;
    }

    return this.dp(0, 0);
};
```