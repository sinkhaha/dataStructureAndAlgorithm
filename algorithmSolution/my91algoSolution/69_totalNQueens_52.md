## 题目
**52. N皇后 II**
>困难

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。

示例 1：
```
输入：n = 4
输出：2
解释：如上图所示，4 皇后问题存在两个不同的解法。
```
示例 2：
```
输入：n = 1
输出：1
```

提示：
* 1 <= n <= 9
* 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-queens-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1：dfs+位运算
### 思路
位运算解法
* 用`3个整型col, pie, na`分别记`录每一列以及两个方向的每条斜线上是否有皇后`，每个整数有 N 个二进制位，二进制位为 `1 代表有皇后不能放置`，0 代表可以放置
* 棋盘的每一列对应每个整数的二进制表示中的一个数位，其中棋盘的最左列对应每个整数的最低二进制位，最右列对应每个整数的最高二进制位

### 代码
```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var totalNQueens = function (n) {
    let count = 0;

    /**
     * 
     * 用3个整型col, pie, na分别标记每一层哪些格子可以放置皇后
     * 二进制位为 1 代表不能放置，0 代表可以放置
     * 
     * @param {Number} n 
     * @param {Number} row 行
     * @param {Number} col 列
     * @param {Number} pie 左斜对角线
     * @param {Number} na 右斜对角线
     */
    this.dfs = function (n, row, col, pie, na) {
        // 递归终止条件，行都扫光了说明合法，直接返回
        if (row >= n) { 
            count++; 
            return; 
        }

        // 结果：得到有效的所有空位
        // col|pie|na得到可以放置皇后的位，原本为0的表示可以放，此时再取反～后为1的表示可以放，"此时前面的高位为0取反后是1，需要清除掉，所以执行&((1 << n) - 1)"
        // ((1 << n) - 1)是得到n位二进制1，把再和~(col | pie | na)进行“&”操作 可以把~(col | pie | na)前面的无效的二进制1消掉变成0
        // 最后bits中为1的表示可以放皇后
        let bits = ~(col | pie | na) & ((1 << n) - 1);

        // bits不为0，则遍历所有为1的二进制位
        while (bits > 0) {
            // x & -x,得到最后的一个1
            // 例如x是10100，-x是x取反后再加1，x取反后是01011，-x=01011+1=01100，所以x&-x=10100&01100=00100，即得到x的最后一个1，即此位置可以放皇后
            let pick = bits & -bits;
            // pick放皇后后，数据都要更新，行row加1，pie和na也都更新
            this.dfs(n, row + 1, col | pick, (pie | pick) << 1, (na | pick) >> 1);
            // x & (x - 1),去掉最后的1
            bits &= bits - 1; 
        }
    }

    this.dfs(n, 0, 0, 0, 0);
    return count;
}
```
### 复杂度
 * 时间复杂度：O(N!)，其中 N 是皇后数量
 * 空间复杂度：O(N)

## 解法2：回溯
```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var totalNQueens = function(n) {
    let res = [];

    this.backtrack = function(board, row) {
        // 结束条件，row 超过 board 的最后一行
        if (row === board.length) {
            // board是二维数组，转成结果所要的形式
            board = board.map(one => {
                return one.join('');
            });
            res.push(board);
            return;
        }

        // 列
        let n = board[row].length;
        for (let col = 0; col < n; col++) {
            // 排除不合法选择
            if (!isValid(board, row, col)) {
                continue;
            }

            // 做选择
            board[row][col] = 'Q';
            // 进入下一行决策
            this.backtrack(board, row + 1);
            // 撤销选择
            board[row][col] = '.';
        }
    }

    // 棋盘的初始化, n行n列, 点表示空，Q表示皇后
    const board = new Array(n);
    for (let i = 0; i < n; i++) {     
        board[i] = new Array(n).fill('.');
    }
    
    this.backtrack(board, 0);
    return res.length;
};

// 是否可以在 board[row][col] 放置皇后
const isValid = function(board, row, col) {
    let n = board.length;

    // 检查列是否有皇后互相冲突
    for (let i = 0; i < n; i++) {
        if (board[i][col] == 'Q') {
            return false;
        }
    }

    // 检查右上方是否有皇后互相冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    // 检查左上方是否有皇后互相冲突
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    return true;
}
```
