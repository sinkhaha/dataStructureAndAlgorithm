## 题目
**447. 回旋镖的数量**
>中等

给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

示例:
```
输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-boomerangs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路
* 两层循环遍历
* 对于points中的每一个点，`都计算它与points其他点的距离dis`，维护一个map，key是这个距离dis的值，value为points中与该点符合该距离的点的数量
* 计算每一个点满足要求的所有组合，即遍历map，计算出所有距离的个数的所有组合方式 `count * (count - 1)` 再相加即可（例如和点pointA相距2的点有3个，那么可能的组合就有`3 * 2`种方式， 即`n * (n-1)` ）

## 代码
```javascript
/**
 *  
 * 
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
    // 小于3个点返回0
    if (points.length < 3) {
        return 0;
    }
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        // key是距离，value是符合该距离的点的数量
        let disCountMap = new Map();

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const dis = getDis(points[i], points[j]);
                if (disCountMap.has(dis)) {
                    disCountMap.set(dis, disCountMap.get(dis) + 1);
                } else {
                    disCountMap.set(dis, 1);
                }
            }
        }
        for (let count of disCountMap.values()) {
            if (count >= 2) { // 距离为0和1时，结果都是0，所以大于等于2即可
                result += count * (count - 1); // 计算排列组合个数 n * (n - 1)       
            }
        }
    }

    return result;
};

/**
 * 计算两点之间的距离 (在此题中计算距离开不开方无所谓，因为关注点是距离相等)
 */
var getDis = function(pointA, pointB) {
    const x = pointA[0] - pointB[0];
    const y = pointA[1] - pointB[1];
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
```

## 复杂度
* 时间复杂度O(n^2)
* 空间复杂度O(n^2)
