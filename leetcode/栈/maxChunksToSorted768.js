
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
// console.log(maxChunksToSorted(arr));

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

/**
 * 单调递增栈
 * 
 * 结果：栈有多少个元素就有多少个块 
 * 栈中每个元素即每个块的最大值
 * 
 * 当前值比栈顶元素大或等于的值，直接入栈(相当于当前元素算做一个块)
 * 当前值比栈顶元素小时，出栈，此时是栈的最大值max，循环，如果当前值依然小于栈顶元素，一直出栈，最后把max压入栈(相当于当前元素和前面的元素算一个块)
 * 
 * 时间O(n)
 * 空间O(n)
 * 
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted2 = function(arr) {
    let stack = [];

    for (let val of arr) {
        // 小于栈顶元素，直接入栈，算一个块
        if (!stack.length || stack[stack.length - 1] <= val) {
            stack.push(val);
        } else {
            let curMax = stack.pop();
            // val和这些弹出的元素算一个块
            while (stack.length && stack[stack.length - 1] > val) {
                stack.pop();      
            }
            stack.push(curMax);
        }
    }
    return stack.length;
}

console.log(maxChunksToSorted2(arr));

/**=============================== */
/**
 * 贪心算法
 * 
 * 对于当前位置，其左边（包括该数）的最大值<=其右侧的最小值，就可以在此分块
 *
 * @param {*} arr 
 */
var maxChunksToSorted3 = function(arr) {
    let n = arr.length;
    let lMax = Array(n).fill(Number.MIN_SAFE_INTEGER);
    let rMin = Array(n).fill(Number.MAX_SAFE_INTEGER);

    lMax[0] = arr[0];
    rMin[n - 1] = arr[n - 1];

    // 
    for (let i = 1; i < n; i++) {
        lMax[i] = Math.max(lMax[i - 1], arr[i]);
        rMin[n-1-i] = Math.min(rMin[n-i], arr[n-1-i]);
    }

    console.log('lMax=', lMax);
    console.log('rMin=', rMin);

    let result = 1;
    for (let i = 0; i < n - 1; ++i) {
        if (lMax[i] <= rMin[i + 1]) {
            result += 1;
        }
    }
    return result;
}
console.log(maxChunksToSorted3(arr));
