## 题目
**401. 二进制手表**
>简单

二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。

每个 LED 代表一个 0 或 1，最低位在右侧。

例如，上面的二进制手表读取 “3:25”。

给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

 

示例：
```
输入: n = 1
返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
```

提示：

* 输出的顺序没有要求。
* 小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
* 分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
* 超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-watch
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 解法：回溯
### 思路
回溯
### 代码

```js
/**
 * @param {number} num
 * @return {string[]}
 */
var readBinaryWatch = function(num) {
    // choice[0~3]是小时，choice[4~9]是分钟
    const choice = [1, 2, 4, 8, 1, 2, 4, 8, 16, 32];
    const result = [];
    backTrace(choice, num, 0, [0, 0], result);
    return result;
};

var backTrace = function(choice, num, start, temp, result) {
    if (temp[0] >= 12 || temp[1] >= 60) {
       return;
    }
    if (num === 0) {
        let minutes = temp[1] < 10 ? `0${temp[1]}` : temp[1];
        result.push(`${temp[0]}:${minutes}`);
        return;
    }

    for (let i = start; i < choice.length; i++) {
        // 做选择
        // 前4位是小时，后面是分钟
        if (i <= 3) {
            temp[0] = temp[0] + choice[i];
        } else {
            temp[1] = temp[1] + choice[i];
        }
        num = num - 1;

        // 回溯
        backTrace(choice, num, i + 1, temp, result);

        // 撤销选择
        if (i <= 3) {
            temp[0] = temp[0] - choice[i];
        } else {
            temp[1] = temp[1] - choice[i];
        }
        num = num + 1;
    }
}

```
