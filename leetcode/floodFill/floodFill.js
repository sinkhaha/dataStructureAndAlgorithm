/**
 * 面试题 08.10. 颜色填充
 * 简单
 * 
 * floodFill算法
 * 适合二维矩阵中的搜索问题
 */
/**
 * 
 * @param {*} image 
 * @param {*} sr 
 * @param {*} sc 
 * @param {*} newColor 
 */
function floodFill(image, sr, sc, newColor) {
    let originColor = image[sr][sc];
    fill(image, sr, sc, originColor, newColor);
    return image;
}

function fill(image, x, y, originColor, newColor) {
    // 超出边界
    if (!inArea(image, x, y)) {
        return;
    }

    // 到其他颜色，超出 originColor 区域
    if (image[x][y] != originColor) {
        return;
    }

    // 已探索过的 originColor 区域
    if (image[x][y] == -1) {
        return;
    }

    // 注意点： choose：打标记，以免重复
    image[x][y] = -1;

    fill(image, x - 1, y, originColor, newColor);
    fill(image, x + 1, y, originColor, newColor);
    fill(image, x, y - 1, originColor, newColor);
    fill(image, x, y + 1, originColor, newColor);

    // unchoose：将标记替换为 newColor
    image[x][y] = newColor;
}

/**
 * 判断是否出界
 * @param {*} image 
 * @param {*} x 
 * @param {*} y 
 */
function inArea(image, x, y) {
    return x >= 0 && x < image.length && y >= 0 && y < image[0].length;
}

const image = [
    [1,1,1],
    [1,1,0],
    [1,0,1]
];
const sr = 1;
const sc = 1;
const newColor = 2;
floodFill(image, sr, sc, newColor);
console.log(image); // [ [ 2, 2, 2 ], [ 2, 2, 0 ], [ 2, 0, 1 ] ]
