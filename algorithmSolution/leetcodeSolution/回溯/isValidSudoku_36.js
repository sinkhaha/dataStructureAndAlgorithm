/**
 * 36 有效的数独
 * 中等
 * https://leetcode-cn.com/problems/valid-sudoku/
 * 
 * 哈希表解法
 * 
 * 遍历数独，检查看到每个单元格值是否已经在当前的行\列\子数独中出现过，
 * 如果出现重复，返回 false
 * 
 * 可参考 
 * https://leetcode-cn.com/problems/valid-sudoku/solution/ha-xi-biao-jie-fa-shu-zu-jie-fa-by-ac_oi-feac/
 * 
 * 本题难点在于如何确定某个数落在哪个小方块中，可以对小方块从左到右依次进行0到8编号，
 * 此时可推导出小方块编号和行列的关系为： idx = i / 3 * 3 + j / 3
 * 
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = (board) => {
    // 1. 初始化横、纵以及小九宫格
    const rows = [];
    const columns = [];
    const boxes = [];
    for (let i = 0; i < 9; i++) {
        rows[i] = [];
        columns[i] = [];
        boxes[i] = [];
    }
    
    // 如对应的 rows 为 [[], [], [], [], [], [], [], [], []]

    // 2.遍历二维数组，填充值，看是否可以完成数独
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // 获取值
            const value = board[i][j];

            // 判断非 . 元素
            if (value !== '.') {
                // 检验横排
                if (!rows[i].includes(value)) {
                    rows[i].push(value);
                } else {
                    return false;
                }

                // 检验竖排
                if (!columns[j].includes(value)) {
                    columns[j].push(value);
                } else {
                    return false;
                }

                // 检查盒子
                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3); // 对应的盒子
                if (!boxes[boxIndex].includes(value)) {
                    boxes[boxIndex].push(value);
                } else {
                    return false;
                }
            }
        }
    }

    // 3. 如果没有问题，就是真的，返回 true
    return true;
};