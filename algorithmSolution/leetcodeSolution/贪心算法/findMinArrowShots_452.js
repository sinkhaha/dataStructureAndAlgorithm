/**
 * 452. 用最少数量的箭引爆气球
 * https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/
 * 
 * 解法类似435
 * 
 * 输入:
 * [[10,16], [2,8], [1,6], [7,12]]
 * 输出:
 * 2
 */
/**
 * 注意：边界相同算重叠了，只需要用一只箭
 * 
 * 时间复杂度: 如果忽略sort排序，时间复杂度为O(n) n为points的长度
 * 空间复杂度O(1)
 * 
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
    let n = points.length;
    if (n === 0) {
        return 0;
    }
    
    // 根据区间的最后一个元素排序
    points.sort(function (a, b) {
        return a[1] - b[1];
    });

    // 最多不重叠区间数，至少为1
    let count = 1;
    // 排序后，初始时，第一个区间的最后一个元素即为end
    let end = points[0][1];
    for (let point of points) {
        let start = point[0];
        // 当前区间跟前一个区间不重叠，增加计数，更新end的值(注意：边界相同算重叠了，只需要用一只箭)
        if (start > end) {
            count++;
            end = point[1];
        }
    }

    return count;
};

const points = [[10, 16], [2, 8], [1, 6], [7, 12]];
console.log(findMinArrowShots(points));
