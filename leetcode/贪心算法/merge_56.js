//  56. 合并区间 中等

/**
 * 解法1
 * @param {*} intervals 
 */
function merge(intervals) {
    let n = intervals.length;
    if (n <= 1) {
        return intervals;
    }

    // 根据区间第一个元素升序排序
    intervals.sort(function(a, b) {
        return a[0] - b[0];
    });

    let result = [];
    let start = intervals[0][0];
    let end = intervals[0][1];
    for (let i = 1; i < n; i++) {
        const cur = intervals[i];
        if (end < cur[0]) {
            result.push([start, end]);
            start = cur[0];
            end = cur[1];
        } else {
            end = Math.max(end, cur[1]);
        }
    }
    result.push([start, end]);
    return result;
}

const intervals1 = [[1,4],[4,5]];
console.log(merge(intervals1)); // [[1,4]]

/**
 * 解法2
 * @param {*} intervals 
 */
function merge2(intervals) {
    let n = intervals.length;
    if (n <= 1) {
        return intervals;
    }

    // 根据区间第一个元素升序排序
    intervals.sort(function(a, b) {
        return a[0] - b[0];
    });

    let result = [];
    result.push(intervals[0]);

    // 不断改变结果区间最后一个元素的第二个值
    for (let i = 1; i < n; i++) {
        const cur = intervals[i];
        // result最后一个元素的引用
        const resultLast = result[result.length - 1];
        if (cur[0] <= resultLast[1]) {
            resultLast[1] = Math.max(resultLast[1], cur[1]);
        } else {
            result.push(cur);
        }
    }
    return result;
}
const intervals2 = [[1,4],[4,5]];
console.log(merge2(intervals2));
