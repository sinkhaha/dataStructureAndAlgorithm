
/**
 * 滑动窗口解法
 * 
 * 维护两个map，表示块中的值，key是数字，value是该数字出现的次数
 * 如果两个map相等，则计数加1，滑动窗口，即清空map
 * 
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
    let count = 0;

    let sortArr = [...arr].sort();
    console.log(sortArr);

    let arrMap = new Map();
    let sortArrMap = new Map();

    for (let i = 0; i < arr.length; i++) {
        let a = arrMap.get(arr[i]) == undefined ? 1 : +arrMap.get(arr[i]) + 1;
        arrMap.set(arr[i], a);
        
        let b = sortArrMap.get(sortArr[i]) == undefined ? 1 : +sortArrMap.get(sortArr[i]) + 1;
        sortArrMap.set(sortArr[i], b);
        
        console.log(compareTwoMap(arrMap, sortArrMap));

        if (compareTwoMap(arrMap, sortArrMap)) {
            count++;
            arrMap = new Map();
            sortArrMap = new Map();
        }
    }

    return count;
};

const arr = [2,1,3,4,4];
console.log(maxChunksToSorted(arr));

// 比较两个map是否相等
function compareTwoMap(map1, map2) {
    if (map1.size !== map2.size) {
        return false;
    }

    for (let [key, val] of map1) {
        let tmpValue = map2.get(key);
        if (tmpValue !== val || (tmpValue === undefined && !map2.has(key))) {
            return false;
        }
    }
    return true;
}
/**=================================== */

