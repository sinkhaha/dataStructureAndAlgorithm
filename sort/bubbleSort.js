/**
 * 冒泡排序
 * 
 * 时间复杂度： 平均O(n^2)、最好O(n)、最差O(n^2)
 * 空间复杂度： O(1)
 * 
 * 稳定排序/原地排序
 * 
 * @param {Array} arr 
 * @returns {Array}
 */
function bubbleSort(arr) {
    const len = arr.length;
  
    for (let i = 0; i < len; i++) {
        // 引入后面序列是否有序标志
        let isSorted = true;

        for(let j = 0; j < len-i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr [j+1];
                arr[j+1] = temp;
                // 有数据交换，说明后面序列无序
                isSorted = false;
            } 
        }
        // 后面序列已是有序，则不执行后面的循环
        if (isSorted) {
            break;
        }
    }
    return arr;
}

const arr = [5, 3, 4, 2, 32, 15, 2, 45, 15, 57];
console.log(bubbleSort(arr));

