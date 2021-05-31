## 题目
**20. 有效的括号** 
>简单

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
```
输入: "()"
输出: true
```
示例 2:
```
输入: "()[]{}"
输出: true
```
示例 3:
```
输入: "(]"
输出: false
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：栈
### 思路
* 用栈来保存未匹配的左括号，从左到右依次遍历字符串
* 当遍历到`左括号`时，则将其压`入栈`中
* 当遍历到`右括号`时，从栈顶`取出`一个左括号
* 如果能够匹配，则继续遍历剩下的字符串。如果遍历的过程中，遇到不能配对的右括号，或者栈中没有数据，则说明为`非法格式`
* 当所有的括号都遍历完成之后，如果`栈为空`，则说明字符串为合法格式；否则，说明有未匹配的左括号，为非法格式

### 代码
```js

/**
 *
 * 
 */
function isValid(str) {
    const leftRightMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    // 左括号数组
    const lefts = [];
    for (let curSymbol of str) {
        if (['(', '[', '{'].includes(curSymbol)) {
            lefts.push(curSymbol); 
        } else {
            const leftSymbol = lefts.pop();
            let rightExpectSymbol = leftRightMap[leftSymbol];
            if (curSymbol !== rightExpectSymbol) {
                return false; 
            }
        }
    }
    return lefts.length === 0;
}

```

### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)
