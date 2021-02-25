/**
 * 768. 最多能完成排序的块 II
 * 困难
 */
/**
 * 解法1:
 * 
 * 单调递增栈(栈中每个元素即每个块的最大值)
 * 
 * 所求结果：栈元素的个数（栈有多少个元素就有多少个块 ）
 * 
 * 思路：
 * 1. 从左往右遍历数组arr，当前值arr[i]>=栈顶元素的值，arr[i]直接入栈(相当于当前元素arr[i]算是一个单独的块)
 * 2. 当前值arr[i]<栈顶元素小时，栈顶元素出栈后，先临时保存为栈的最大值max，循环继续比较arr[i]和栈顶元素的大小，
 * 如果当前值依然小于栈顶元素，一直出栈，直到当前值大于等于栈顶元素，
 * 最后把max压入栈(相当于当前元素arr[i] 和 前面出栈的的元素 和 当前栈顶的元素max 组合成一个块)
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * 
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted1 = function (arr) {
    let stack = [];

    for (let val of arr) {
        // 大于等于栈顶元素，直接入栈，算一个块
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

const arr1 = [2, 1, 3, 4, 4];
console.log(maxChunksToSorted1(arr1)); // 4


/**
 * 解法2:
 * 
 * 排序和解法
 * 
 * 如果一个数组arr 和 其排序后的数组sortArr 的前i项和相等时，
 * 则[0...i]这些元素都是相等的(可能就只有顺序不同)
 * 
 * 思路：
 * 1. 得到arr一个升序排序后的数组sortArr
 * 2. 从左往右遍历arr，计算当前i时，arr的前i项和 ，计算sortArr的前i项和
 * 3. 如果“arr的前i项和 == sortArr的前i项和”，则算一个计算数，因为他们可以组成一个块，
 * 如果不相等，继续遍历到相等的位置j，则i到j这些元素也可以组成一个块，增加计数
 * 
 * 
 * 时间复杂度O(nlogn)， Max(sort的时间复杂度nlogn, for循环的时间复杂度n)
 * 空间复杂度O(n)
 * 
 * 
 * 相似的解法还有计数排序解法：
 * 如果两个元素一样的数组，不管元素顺序怎样，两个数组的计数排序数组一定是一样的。
 * (计算排序数组即索引值为元素，值为在原数组出现的个数)
 * 思路：
 * 1. 得到arr一个升序排序后的数组sortArr
 * 2. 从左往右遍历arr，如果arr的前i项的计数信息和sortArr的前i项的计数
 * 信息一致，那么可以分成一个块，此时分块计数加1，否则继续遍历
 * 
 * @param {*} arr 
 */
var maxChunksToSorted2 = function (arr) {
    let count = 0;

    let sum1 = 0;
    let sum2 = 0;
    const arrSort = [...arr].sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        sum1 += arr[i];
        sum2 += arrSort[i];
        if (sum1 === sum2) {
            count++;
        }
    }

    return count;
}

const arr2 = [2, 1, 3, 4, 4];
console.log(maxChunksToSorted2(arr2));


/**
 * 贪心算法
 * 
 * 对于当前位置，其左边（包括该数）的最大值<=其右侧的最小值，就可以在此分块
 *
 * @param {*} arr 
 */
var maxChunksToSorted3 = function (arr) {
    let n = arr.length;
    let lMax = Array(n).fill(Number.MIN_SAFE_INTEGER);
    let rMin = Array(n).fill(Number.MAX_SAFE_INTEGER);

    lMax[0] = arr[0];
    rMin[n - 1] = arr[n - 1];

    for (let i = 1; i < n; i++) {
        lMax[i] = Math.max(lMax[i - 1], arr[i]);
        rMin[n - 1 - i] = Math.min(rMin[n - i], arr[n - 1 - i]);
    }

    // console.log('lMax=', lMax);
    // console.log('rMin=', rMin);

    let result = 1;
    for (let i = 0; i < n - 1; ++i) {
        if (lMax[i] <= rMin[i + 1]) {
            result += 1;
        }
    }
    return result;
}
const arr3 = [2, 1, 3, 4, 4];
console.log(maxChunksToSorted3(arr3));
