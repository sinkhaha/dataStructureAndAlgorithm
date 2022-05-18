## 题目
**260. 只出现一次的数字 III**
>中等

给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

示例 :
```
输入: [1,2,1,3,2,5]
输出: [3,5]
```
注意：

1. 结果输出的顺序并不重要，对于上面的例子， [5, 3] 也是正确答案。
2. 你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/single-number-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：位运算
### 思路
参考官方题解

https://leetcode-cn.com/problems/single-number-iii/solution/zhi-chu-xian-yi-ci-de-shu-zi-iii-by-leetcode/

具体注释见代码
### 代码
```js
/**
 * 
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    // 异或(相同为0，不同为1)
    // 会消除出现两次的数字，bitmask =会保留只出现一次的两个数字（x 和 y）之间的差异
    let bitmask = 0;
    for (let num of nums) {
        bitmask ^= num;
    }

    // 保留位中最右边1(这个1要么来自x，要么来自y)，且将其余的1置为 0
    let diff = bitmask & (-bitmask);
    
    // 从bitmask中分离x和y
    let x = 0;
    for (let num of nums) {
        if ((num & diff) != 0) {
            x ^= num;
        }
    }
    // 找到了x，则y = bitmask^x
    return [x, bitmask^x];
};
```
### 复杂度
* 时间复杂度 O(n)
* 空间复杂度 O(1)
