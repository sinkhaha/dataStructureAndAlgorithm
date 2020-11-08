/**
 * 986. 区间列表的交集
 * 
 * 中等
 * 
 * @param {*} A 
 * @param {*} B 
 */
function intervalIntersection(A, B) {
    // 双指针
    let i = 0;
    let j = 0;
    let result = [];
    while (i < A.length && j < B.length) {
        let a1 = A[i][0];
        let a2 = A[i][1];

        let b1 = B[j][0];
        let b2 = B[j][1];

        // 注意点：因为两个区间不存在交集是 b1 > a2 || a1 > b2，所以两个区间存在交集是b2 >= a1 && a2 >= b1
        if (b2 >= a1 && a2 >= b1) {
            const one = Math.max(a1, b1);
            const two = Math.min(a2, b2);
            // 注意点：计算出交集
            result.push([one, two]);
        }
        // 注意点：i和j指针推进
        if (b2 < a2) {
            j += 1;
        } else {
            i += 1;
        }
    }
    return result;
}

const A = [[0, 2], [5, 10], [13, 23], [24, 25]];
const B = [[1, 5], [8, 12], [15, 24], [25, 26]];
console.log(intervalIntersection(A, B)); // [ [ 1, 2 ], [ 5, 5 ], [ 8, 10 ], [ 15, 23 ], [ 24, 24 ], [ 25, 25 ] ]
