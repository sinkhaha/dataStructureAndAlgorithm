/**
 * 快速排序
 * 
 * 时间复杂度：最好 O(nlog2n)、平均O(nlog2n)、最坏O(n^2)
 * 空间复杂度：O(nlog2n)
 *
 * 不稳定排序/非原地排序
 *
 * @param {Array} arr
 * @param {Number} i 
 * @param {Number} j 
 */
function quickSort(arr, i, j) {
    if (i < j) {
        // 左右指针
        let left = i;
        let right = j;

        // 简单的选择数组第一个元素为基准数
        // 基准数的选择关系到排序的次数，可以使用三数取中法去取基准数
        let pivot = arr[left];

        while (i < j) {
            // 从后往前找比基准小的数
            while (arr[j] >= pivot && i < j) {
                j--;
            }
            if (i < j) {
                arr[i] = arr[j];
                i++;
            }

            // 从前往后找比基准大的数
            while (arr[i] <= pivot && i < j) {
                i++;
            }
            if (i < j) {
                arr[j] = arr[i];
                j--;
            }
        }

        arr[i] = pivot;

        quickSort(arr, left, i - 1);
        quickSort(arr, i + 1, right);

        return arr;
    }
}

let arr = [2, 5, 8, 9, 3, 1, 3];
console.log(quickSort(arr, 0, arr.length - 1));
