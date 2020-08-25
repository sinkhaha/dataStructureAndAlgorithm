/**
 * 归并排序
 * 
 * 分治思想
 * 
 * 时间复杂度: 最好、最坏、平均都是O(nlog2 n)
 * 空间复杂度: O(n)
 *
 * 稳定排序/非原地排序
 * 
 * @param {Array} arr
 */
function mergeSort(arr) {
    // 数组分解到只有一个时返回
    if (arr.length <= 1) {
        return arr;
    }

    // 找到中间值, 分割数组
    const middle = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middle);
    const rightArr = arr.slice(middle);

    // 递归分解，然后合并
    return mergeArr(mergeSort(leftArr), mergeSort(rightArr));
}

/**
 * 合并两个有序数组
 * @param {Array} left 
 * @param {Array} right 
 * @returns {Array}
 */
function mergeArr(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // 判断两个数组中元素大小，依次插入结果数组
    while (left.length > leftIndex && right.length > rightIndex) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // 拼接多余的数组元素
    const leftRemain = left.slice(leftIndex);
    const rightRemain = right.slice(rightIndex);
    return result.concat(leftRemain).concat(rightRemain);
}

const arr = [10, 3, 1, 5, 4, 11, 2, 0, 6, 3];
console.log(mergeSort(arr))
