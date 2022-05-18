## 题目
**301. 删除无效的括号**
>困难

删除最小数量的无效括号，使得输入的字符串有效，返回所有可能的结果。

说明: 输入可能包含了除 ( 和 ) 以外的字符。

示例 1:
```
输入: "()())()"
输出: ["()()()", "(())()"]
```

示例 2:
```
输入: "(a)())()"
输出: ["(a)()()", "(a())()"]
```

示例 3:
```
输入: ")("
输出: [""]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-invalid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：bfs
### 思路
bfs，依次删除s的第i个字符，然后判断剩下的字符串是否有效，有效则添加进结果数组
   
### 代码
```js

/**
 * 
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    if (!s || s.length === 0) {
        return [''];
    }

    const ret = [];

    const queue = [s];
    const visited = {}; // 标记是否访问过
    let current = null;
    // 只记录最小改动
    let removedParentheses = 0; 

    while (queue.length) {
        current = queue.shift()
        // 是否有效
        let hit = isValid(current);
        if (hit) {
            if (!removedParentheses) {
                removedParentheses = s.length - current.length
            }
            if (s.length - current.length > removedParentheses) {
                return ret.length === 0 ? [''] : ret;
            }
            ret.unshift(current);
            continue;
        }

        for (let i = 0; i < current.length; i++) {
            if (current[i] !== ')' && current[i] !== '(') {
                continue;
            }

            const subString = current.slice(0, i).concat(current.slice(i + 1));
            
            if (visited[subString]) {
                continue;
            }

            visited[subString] = true;
            queue.push(subString);
        }
    }

    return ret.length === 0 ? [''] : ret;
};

/**
 * 判断给定字符串是否是有效的
 * @param {*} s 
 */
var isValid = function (s) {
    let openParenthes = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openParenthes++;
        } else if (s[i] === ')') {
            if (openParenthes === 0) return false;
            openParenthes--;
        }
    }
    return openParenthes === 0;
};
```
