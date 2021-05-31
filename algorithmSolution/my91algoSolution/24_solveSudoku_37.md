## 题目
**37. 解数独**
>困难

>类似题目：36题 有效的数独

编写一个程序，通过填充空格来解决数独问题。

一个数独的解法需遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。

![](https://gitee.com/sinkhaha/picture/raw/master/img/leetcode/37-1.png)

一个数独。

![](https://gitee.com/sinkhaha/picture/raw/master/img/leetcode/37-2.png)

答案被标成红色。

提示：

给定的数独序列只包含数字 1-9 和字符 '.' 。
你可以假设给定的数独只有唯一解。
给定数独永远是 9x9 形式的。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sudoku-solver
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：回溯

**数独的特点**

1. 行只有1-9，不会重复

2. 列只有1-9，不会重复

3. 每个3乘3的小块也是只有1-9，不会重复

   

### 思路

递归，对每一个空的格子依次选择1到9填入，判断当前填入的数字是否合法(使得board有效)，合法则在该位置填入数字，不合法则继续下一个数字



**判断数字是否使得board有效**

该数字其所在行、所在列、3*3的方块中没有重复，则有效。



### 代码
```javascript
/**
 * 
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
    if (board.length === 0) {
        return [board];
    }

    this.backtrack = function (board, i, j) {
        let m = 9;
        let n = 9;

        // 当j穷举到每一行的最后一个索引，即最后一列，就换到下一行(i+1)重新穷举
        if (j == n) {
            return this.backtrack(board, i + 1, 0);
        }

        // r == m 说明穷举完了最后一行，完成了所有的穷举
        // 找到一个可行解，返回 true 结束递归
        if (i == m) {
            return true;
        }

        // 如果该位置是已填好的数字，则跳过该列即可
        if (board[i][j] != '.') {
            return this.backtrack(board, i, j + 1);
        }

        // 选择1到9
        for (let ch = 1; ch <= 9; ch++) {
            // 遇到不合法的数字则跳过
            if (!isValid(board, i, j, ch)) {
                continue;
            }

            // 做选择，选择一个数字填入
            board[i][j] = ch.toString();

            // 继续穷举下一个，递归过程中如果每次选择填入的数字是有效的，立即结束
            if (this.backtrack(board, i, j + 1)) {
                return true;
            }

            // 撤销选择
            board[i][j] = '.';
        }

        // 穷举完1-9，还没有找到可以填的数字，说明不符合
        return false;
    }

    // 找到一个符合的结果即返回
    if (this.backtrack(board, 0, 0)) {
        return board;
    }
};

/**
 * 
 * 判断board[r][c]是否可以填入数字 n
 * 
 * @param {*} board 
 * @param {*} r 行
 * @param {*} c 列
 * @param {*} n 要判断填入的数字
 */
function isValid(board, r, c, n) {
    for (let i = 0; i < 9; i++) {
        // 判断行是否存在重复
        if (board[r][i] == n) {
            return false;
        }

        // 判断列是否存在重复
        if (board[i][c] == n) {
            return false;
        }

        let ii = Math.floor((r / 3)) * 3 + Math.floor(i / 3);
        let jj = Math.floor((c / 3)) * 3 + Math.floor(i % 3);
        // 判断 3 x 3 小块是否存在重复
        if (board[ii][jj] == n) {
            return false;
        }
    }

    return true;
}

```
### 复杂度
* 时间复杂度：O(n^2)
* 空间复杂度：O(n)
