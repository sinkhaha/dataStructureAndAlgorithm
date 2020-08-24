/**
 * (简单)选择排序
 * 
 * 时间复杂度：最好、最坏、平均都是O(n^2)
 * 空间复杂度：O(1)
 *
 * 不稳定排序/原地排序
 * 
 * 思路：
 * 1. 外层循环依次遍历序列当中的每一个元素arr[i];
 * 2. 内层循环从剩下的 n-i 个元素的待排序序列中，找到最小的元素arr[min]，
 *    如果arr[i]不是最小元素，则将遍历得到的当前元素arr[i]和arr[min]交换
 * 3. 重复以上(1)(2)步骤直到结束
 * 
 * @param {Array} arr 
 * @returns {Array}
 */
function simpleSelectSort(arr) {
    let n = arr.length;
    if (n <= 1) {
        return arr;
    }

    // 注意边界, 因为需要在内层进行i+1后的循环，所以外层需要 数组长度-1
    for (let i = 0; i < n - 1; i++) {
        // 当前最小元素索引
        let minIndex = i;

        // 找到剩下的"无序序列"中最小元素的索引
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // 交换有序区最后的一个元素和待排序区最小待元素
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex]
            arr[minIndex] = temp;
        }
    }
    return arr;
}

const arr = [2, 13, 4, 13, 35, 67, 34, 70, 1];
console.log(simpleSelectSort(arr));

