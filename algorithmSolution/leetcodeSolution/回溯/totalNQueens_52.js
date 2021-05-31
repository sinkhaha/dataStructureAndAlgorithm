/**
 * 52. N皇后 II
 * 
 * 困难
 * 
 * 可以和51同样的解法，把输出结果改成输出数量即可
 * 
 * 位运算解法：
 * 用3个整型col, pie, na分别记录每一列以及两个方向的每条斜线上是否有皇后，每个整数有 N 个二进制位，二进制位为 1 代表有皇后不能放置，0 代表可以放置
 * 棋盘的每一列对应每个整数的二进制表示中的一个数位，其中棋盘的最左列对应每个整数的最低二进制位，最右列对应每个整数的最高二进制位
 *
 * 时间复杂度：O(N!)，其中 N 是皇后数量
 * 空间复杂度：O(N)
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
var totalNQueens = function (n) {
    let count = 0;

    /**
     * 
     * 用3个整型col, pie, na分别标记每一层哪些格子可以放置皇后，二进制位为 1 代表不能放置，0 代表可以放置
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
            // x & -x，得到最后的一个1
            // 例如x是10100，-x是x取反后再加1，x取反后是01011，-x=01011+1=01100，所以x&-x=10100&01100=00100，即得到x的最后一个1，即此位置可以放皇后
            let pick = bits & -bits;
            // pick放皇后后，数据都要更新，行row加1，pie和na也都更新
            this.dfs(n, row + 1, col | pick, (pie | pick) << 1, (na | pick) >> 1);
            // x & (x - 1)，去掉最后的1
            bits &= bits - 1; 
        }
    }

    this.dfs(n, 0, 0, 0, 0);
    return count;
}

const n = 4;
console.log(totalNQueens(n)); // 2
