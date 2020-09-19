/**
 * leetcode 435 无重叠子区间
 * 
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 * 
 * 输入: [ [1,2], [2,3], [3,4], [1,3] ]
 * 输出: 1
 */
/**
 * 
 * 先用贪心算法求出最多不重叠的区间m个，然后用n-m即可得结果
 * 注意：边界相同，并不算重叠
 * 
 * 思路： 
 * 1. 从区间集合 intervals 中选择⼀个区间 x，这个 x 是在当前所有区间中结束最早的（end 最⼩）
 * 2. 把所有与 x 区间相交的区间从区间集合 intervals 中删除
 * 3. 重复步骤 1 和 2，直到 intervals 为空为⽌。之前选出的那些 x 就是最⼤不相交⼦集
 * 
 * intervals可以先按每个区间的 end 数值升序排序，所以选择 x 很容易。
 * 关键在于，如何去除与 x 相交的区间，选择下⼀轮循环的 x 呢？
 * 
 * 由于我们事先排了序，不难发现所有与 x 相交的区间必然会与 x 的 end 相 交；
 * 如果⼀个区间不想与 x 的 end 相交，它的 start 必须要 >= x 的 end
 * 
 * 
 * 
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    let n = intervals.length;
    if (n === 0) {
        return 0;
    }
    // 根据end升序排序
    intervals.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    console.log(intervals);

    // ⾄少有⼀个区间不相交 
    let count = 1;
    // 排序后，第⼀个区间就是 x 
    let x_end = intervals[0][1];
    for (let inter of intervals) {
        let start = inter[0];
        if (start >= x_end) {
            count++;
            x_end = inter[1];
        }
    }

    return n - count;
};

const intervals = [ [1,2], [2,3] ];
console.log(eraseOverlapIntervals(intervals));