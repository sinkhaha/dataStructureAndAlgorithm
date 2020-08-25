/**
 * 希尔排序
 * 
 * 时间复杂度：最好O(n)，平均O(nlog2 n)，最坏O(n^2)
 * 空间复杂度：O(1)
 *
 * 不稳定排序/原地排序
 * 
 * @param {Array} arr 
 * @returns {Array}
 */
function shellSort(arr) {
    // 增量/步长 默认取长度的一半
    let step = Math.floor(arr.length / 2);

    while (step >= 1) {
        // 把距离为 step 的元素组为一个组
        for (let i = step; i < arr.length; i++) {
            let temp = arr[i];
            // 对距离为 step 的元素组进行排序
            let j = i - step;
            for (;j >= 0; j -= step) {
                if (temp >= arr[j]) {
                    break;
                }
                arr[j + step] = arr[j];
            }
            arr[j + step] = temp;
        }

        // 减小步长增量为一半
        step = Math.floor(step / 2); 
    }

    return arr;
}

const arr = [ 2, 5, 13, 4, 13, 45, 67, 34, 80, 1];
console.log(shellSort(arr));
