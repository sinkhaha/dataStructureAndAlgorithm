/**
 * 变形四：查找最后一个小于等于给定值的元素
 * @param {*} a 
 * @param {*} target 
 */
const binaryFindLastSmall = (a, target) => {
    if (a.length === 0) {
        return -1;
    }
    
    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
        const mid = Math.floor(low+(high-low)/2);
        if (a[mid] > target) {
            high = mid - 1;
        } else {
            // mid是最后一个 或 mid的下一个大于目标值，说明当前值是最后一个小于等于给定值的
            if (mid === a.length - 1 || a[mid + 1] >= target) {
                return mid;
            } else {
                low = mid + 1;
            }
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];

const LastSmall = binaryFindLastSmall(arr, 4);
console.log(`FindLastSmall: ${LastSmall}`);
