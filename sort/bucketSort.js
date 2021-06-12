/**
 * 桶排序
 * 
 * 思路：
 * 将数组中的数据，按桶进行划分，将相邻的数据划分在同一个桶中，
 * 每个桶用插入排序算法（或者快速排序）进行排序，最后整合每个桶中的数据
 * 
 * @param {*} array 
 * @param {*} bucketSize 每个桶默认存放10个数据
 * @returns {Array}
 */
function bucketSort(array, bucketSize = 10) {
    if (array.length <= 1) {
        return array;
    }

    // 二维数组模拟桶
    const buckets = createBuckets(array, bucketSize);

    return sortBuckets(buckets);
}

/**
 * 把数据分到桶里
 * @param {Array} array 
 * @param {Number} bucketSize 每个桶的元素个数
 * @returns {Array} 返回二维数组
 */
function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];

    // 遍历数组，找到数组最小值与数组最大值
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }

    // 计算桶的个数
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;

    console.log(`桶的个数 ${bucketCount}`);

    // 二维数组模拟桶
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }

    // 计算数组每一个元素应该放在哪一个桶中
    for (let i = 0; i < array.length; i++) {
        const val = array[i];
        const bucketIndex = Math.floor((val - minValue) / bucketSize);
        buckets[bucketIndex].push(val);
    }

    return buckets;
}

/**
 * 对每个桶的数据进行排序
 * @param {Array} buckets 二维数组 [[],[]]
 * @returns {Array}
 */
function sortBuckets(buckets) {
    const result = [];

    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]) {
            // 对每个桶里的数据分别进行插入排序
            const sortArr = directInsertSort(buckets[i]);
            result.push(...sortArr);
        }
    }
    return result;
}

/**===================================================== */
/**
 * 插入排序
 * @param {*} array 
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

const arr = [2, 9, 3, 7, 5, 17, 31, 66, 34, 42];
console.log(bucketSort(arr));
