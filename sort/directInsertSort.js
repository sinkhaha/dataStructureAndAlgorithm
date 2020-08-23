/**
 * (直接)插入排序
 * 
 * 时间复杂度: 最好O(n), 平均O(n^2), 平均O(n^2)
 * 空间复杂度: O(1)
 * 
 * 稳定排序/原地排序
 * 
 * 思路：
 * 外层循环：遍历待比较的所有数组元素arr[i]
 * 内层循环：将本轮选择的元素与已经排好序的元素依次相比较，如果选择的元素比已排序的元素小，则交换，直到全部元素都比较完
 *
 * @param {Array} arr 
 * @returns {Array}
 */
function directInsertSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // i=0第一个元素默认是有序区
    for (let i = 1; i < arr.length; i++) {
        // 需要插入有序区的当前值
        let needInsertValue = arr[i];

        // 在已排序区"从后往前"找插入的位置
        let j = i - 1;
        for (; j >= 0; j--) {
            if (needInsertValue < arr[j]) {
                // 当前元素小于之前的元素，则把元素往后移动
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }

        // 把元素插入有序区
        arr[j + 1] = needInsertValue;
    }

    return arr;
}

const arr = [2, 5, 13, 4, 13, 45, 67, 34, 80, 1];
console.log(directInsertSort(arr));
