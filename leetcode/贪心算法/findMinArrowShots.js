/**
 * 452. 用最少数量的箭引爆气球
 * 
 * 输入:
 * [[10,16], [2,8], [1,6], [7,12]]
 * 输出:
 * 2
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    let n = points.length;
    if (n === 0) {
        return 0;
    }
    points.sort(function(a, b) {
       return a[1] - b[1];
    });

    let count = 1;
    // 最小
    let end = points[0][1];
    for (let point of points) {
        let start = point[0];
        if (start > end) {
            count++;
            end = point[1];
        }
    }

    return count;
};

const points = [[10,16], [2,8], [1,6], [7,12]];
console.log(findMinArrowShots(points));
