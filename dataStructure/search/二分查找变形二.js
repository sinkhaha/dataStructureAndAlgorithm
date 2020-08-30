// 变形二：查找最后一个相等的数
const binaryFindLast = (a, target) => {
    if (a.length === 0) {
        return -1;
    }

    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
        const mid =  Math.floor(low+(high-low)/2);
        if (target < a[mid]) {
            high = mid - 1;
        } else if (target > a[mid]) {
            low = mid + 1;
        } else {
            if (mid === a.length - 1 || a[mid + 1] > target) {
                return mid;
            } else {
                low = mid + 1;
            }
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];

const last = binaryFindLast(arr, 4);
console.log(`查找最后一个相等的数: ${last}`);
