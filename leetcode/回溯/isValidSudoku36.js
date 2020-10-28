/**
 * 36 有效的数独
 * 中等
 * 
 * 哈希表解法
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = (board) => {
    // 步骤 1：初始化横、纵以及小九宫格
    const rows = [],
        columns = [],
        boxes = [];
    for (let i = 0; i < 9; i++) {
        rows[i] = [];
        columns[i] = [];
        boxes[i] = [];
    }
    // 对应的 rows 为 [[], [], [], [], [], [], [], [], []]

    // 步骤 2：遍历填充值
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            // 获取值
            const value = board[i][j];

            // 先判断非 . 元素
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

    // 步骤 3：如果没有问题，就是真的，返回 true
    return true;
};