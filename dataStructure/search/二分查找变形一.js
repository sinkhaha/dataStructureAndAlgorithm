/**
 * 二分查找变形一：查找第一个值等于给定值的元素
 * @param {*} a 
 * @param {*} target 
 */
const binaryFindFirst = (a, target) => {
    if (a.length === 0) {
        return -1;
    }

    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
        const mid = Math.floor(low+(high-low)/2);

        if (target < a[mid]) {
            high = mid - 1;
        } else if (target > a[mid]) {
            low = mid + 1;
        } else {
            // 相等时，需要判断此时这个数是否是第一个等于target的值
            // （1）如果 mid等于0，那这个元素已经是数组的第一个元素,arr[mid]就是要找的第一个值等于给定值的元素
            // （2）arr[mid]的前一个元素arr[mid-1]不等于target,则arr[mid]就是要找的第一个值等于给定值的元素
            if (mid === 0 || a[mid - 1] !== target) {
                return mid;
            } else {
                // 如果a[mid]前面的一个元素 a[mid-1]也等于target
                // a[mid]肯定不是我们要查找的第一个值等于给定值的元素
                // 就更新 high=mid-1，因为要找的元素肯定出现在[low, mid-1]之间
                high = mid - 1;
            }
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];
const first = binaryFindFirst(arr, 4);
console.log(`查找第一个值等于给定值的元素: index=${first} value=${arr[first]}`);
