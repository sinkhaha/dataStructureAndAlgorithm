/**
 * 二分查找变形问题二：查找最后一个等于给定值的元素
 * @param {*} a 
 * @param {*} target 
 */
const binaryFindLast = (a, target) => {
    if (a.length === 0) {
        return -1;
    }

    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (target < a[mid]) {
            high = mid - 1;
        } else if (target > a[mid]) {
            low = mid + 1;
        } else {
            // 相等时，需要判断此时这个数是否是最后一个等于target的值
            // （1）如果 mid等于0，那这个元素已经是数组的最后一个元素,arr[mid]就是要找的最后一个值等于给定值的元素
            // （2）arr[mid]的后一个元素arr[mid-1]不等于target,则arr[mid]就是要找的最后一个值等于给定值的元素
            if (mid === a.length - 1 || a[mid + 1] !== target) {
                return mid;
            } else {
                // 如果不是最后一个等于给定值的元素，则在[mid+1, high]中查找
                low = mid + 1;
            }
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];
const last = binaryFindLast(arr, 4);
console.log(`查找最后一个相等的数: index=${last} value=${arr[last]}`);
