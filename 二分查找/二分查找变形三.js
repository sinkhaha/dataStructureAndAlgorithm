/**
 * 变形三：查找第一个大于等于给定值的元素
 * @param {*} a 
 * @param {*} target 
 */
const binaryFindFistBig = (a, target) => {
    if (a.length === 0) {
        return -1;
    }

    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (a[mid] >= target) {
            // 如果mid此时是数组第一个元素 或者 前一个值小于要查找的值，那此时就是要查找的第一个大于target的值了
            if (mid === 0 || a[mid - 1] < target) {
                return mid;
            } else {
                // 在[low, mid-1]找
                high = mid - 1;
            }
        } else {
            // 如果a[mid]小于要查找的值target, 那要查找的值肯定在[mid+1, high]之间，所以更新 low=mid+1    
            low = mid + 1;
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];

const firstBig = binaryFindFistBig(arr, 5);
console.log(`查找第一个大于等于给定值的元素: indes=${firstBig} value=${arr[firstBig]}`);
