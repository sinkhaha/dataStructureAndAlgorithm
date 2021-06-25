/**
 * 堆排序
 * 
 * 时间复杂度：最好O(nlog2n)、平均 O(nlog2n)、最坏O(nlog2n)
 * 空间复杂度O(1)
 * 
 * 不稳定排序/原地排序
 * 
 * @param {*} arr 
 */
function heapSort(arr) {
    // 初始化大顶堆，从第一个非叶子结点开始调整
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        adjustHeap(arr, i, arr.length);
    }

    for (let i = Math.floor(arr.length - 1); i > 0; i--) {
        // 根节点与最后一个节点交换
        swap(arr, 0, i);
        adjustHeap(arr, 0, i);
    }
    return arr;
}

/**
 * 堆调整
 * @param {*} arr 
 * @param {*} i 
 * @param {*} length 
 */
function adjustHeap(arr, i, length) {
    let temp = arr[i];

    // 对节点 i 以下的结点全部做顺序调整
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = arr[i];
        if (j + 1 < length && arr[j] < arr[j + 1]) {
            j++;
        }
        if (temp < arr[j]) {
            swap(arr, i, j);
            i = j;
        } else {
            break;
        }
    }
}

/**
 * 交换数组的两个节点
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

let arr = [3, 4, 10, 8, 5, 9, 1, 25, 5, 32, 2];
console.log(heapSort(arr));
