/**
 * leetcode 435 无重叠子区间
 * 
 * 题目：
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 * 
 * 例子：
 * 输入: [ [1,2], [2,3], [3,4], [1,3] ]
 * 输出: 1
 */
/**
 * 
 * 先用贪心算法求出最多不重叠的区间m个，然后用n-m即可得结果
 * 注意：边界相同，并不算重叠
 * 
 * 思路： 
 * 1. intervals各个区间先根据区间的最后一个元素排序，
 * 排完序后intervals里第一个区间里的末尾元素是intervals所有区间中末尾元素最小的，记为end;
 *
 * 2. 遍历intervals各个区间，取每个区间的第一个元素(记为curStart)和end相比较，
 * 如果curStart >= end 时，说明此时这两个区间不会重叠，更新计数和更新end的值，
 * 如果curStart < end，说明此时这两个区间重叠，则跳过不处理
 *
 * 3. 最后所求的计数count即为最多不重叠的区间数，所以要移除的最小区间数量 = n - count
 *
 * 时间复杂度: 如果忽略sort排序，时间复杂度为O(n) n为intervals的长度
 * 空间复杂度O(1)
 * 
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    let n = intervals.length;
    if (n === 0) {
        return 0;
    }
    // 根据区间的最后一个元素排序
    intervals.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    console.log(intervals);

     // 最多不重叠区间数，至少为1
    let count = 1;
    // 排序后，初始时，第一个区间的最后一个元素即为end
    let x_end = intervals[0][1];
    for (let inter of intervals) {
        let start = inter[0];
        // 当前区间跟前一个区间不重叠，增加计数，更新end的值
        if (start >= x_end) {
            count++;
            x_end = inter[1];
        }
    }

    // 总数 - 最多不重叠区间数 = 所求结果
    return n - count;
};

const intervals = [ [1,2], [2,3] ];
console.log(eraseOverlapIntervals(intervals));
