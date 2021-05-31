### 题目
**394. 字符串解码**
>中等

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。


示例 1：
```
输入：s = "3[a]2[bc]"
输出："aaabcbc"
```
示例 2：
```
输入：s = "3[a2[c]]"
输出："accaccacc"
```
示例 3：
```
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"
```
示例 4：
```
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/decode-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



### 思路：栈

利用`栈`解题，注意字母前面的数字可能有`多位`

* 遇到 `"数字"` 、`"["`、`"字母" `入栈（即不是右括号`"]"`的都入栈）

* 遇到右括号`"]"`则出栈，一直出栈直到不等于左括`"["`时停止出栈

* 取出`"[ ]"`括号之间要的字符串str，然后取得数字，计算str重复次数后的字符串pushStr，然后pushStr再入栈

* 最后把栈的元素拼接起来即可

  

### 代码
```javascript
function decodeString(S) {
    if (!S) {
        return '';
    }

    let stack = [];
  
    // 存字母前的数字，可能有多位
    let numstr = '';

    for (let s of S) {
        // 多位数字的处理
        if (Number.isInteger(+s)) {
            numstr += s;
            continue;
        }

        if (numstr) {
            stack.push(+numstr);
            numstr = ''; // 注意置空
        }

        // 不是右括号直接入栈
        if (s != ']') {
            stack.push(s);
            continue;
        }

        // 遇到右括号，需要出栈，直到不等于左括号
        let str = '';
        while (stack.length && stack.slice(-1) != '[') {
            let top = stack.pop();
            top += str;
            str = top;
        }

        // 删掉左括号
        stack.pop();

        // 取得数字
        let count = +stack.pop();

        // 字符拼接对应的次数
        let pushStr = str.repeat(count);  

        stack.push(pushStr);
    }

    return stack.join('');
}
```
### 复杂度
* 时间复杂度O(N)，N为S的长度
* 空间复杂度O(N)

