/**
 * 计数排序
 * 
 * 比较适合数组的最大值是比较小的数据，数据相对集中的，这样不会浪费太多的空间
 * 
 * @param {*} array 
 */
function countingSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const max = findMaxValueFromArr(array);
    const arrCounts = new Array(max + 1);

    // 计算每个元素的个数，放入到arrCounts中, arrCounts下标是元素，值是元素个数
    // 例如 array=[4,5,2,1], arrCounts=[empty, 1, 1, empty, 1, 1]
    array.forEach(val => {
        if (!arrCounts[val]) {
            arrCounts[val] = 0;
        }
        arrCounts[val]++;
    });

    // i是下标即要排序的元素, count是元素个数
    let newArray = [];
    let sortedIndex = 0;
    arrCounts.forEach((count, i) => {
        while (count > 0) {
            newArray[sortedIndex] = i;
            sortedIndex++;
            count--;
        }
    });

    return newArray;
}

/**
 * 找数组中最大的数
 * @param {*} array 
 * @returns
 */
function findMaxValueFromArr(array) {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    return max;
}

const arr = [7, 18, 3, 5, 2, 4, 3, 1];
console.log(countingSort(arr));
