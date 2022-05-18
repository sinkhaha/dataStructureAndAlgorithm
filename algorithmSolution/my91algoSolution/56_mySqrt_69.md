## 题目
**69. x 的平方根**
>简单

实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:
```
输入: 4
输出: 2
```
示例 2:
```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sqrtx
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：二分查找
### 思路
* 因为x平方根的整数部分k，在满足`k^2 ≤ x`的情况下，k取最大值
* 所以可以二分查找`0～x`区间之间符合的k值

### 代码
```js
/**
 * 
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let low = 0;
    let high = x;
    let result = 0;

    while (low <= high) {
        let mid = Math.floor(low + (high - low)/2);
        if (mid * mid <= x) {
            result = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return result; 
};
```

### 复杂度
* 时间复杂度O(logN)
* 空间复杂度O(1)
