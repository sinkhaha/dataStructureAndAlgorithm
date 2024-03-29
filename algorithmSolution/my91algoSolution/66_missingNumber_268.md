## 题目
**268. 丢失的数字**
>简单

给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

 

进阶：

* 你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?
 

示例 1：
```
输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
```
示例 2：
```
输入：nums = [0,1]
输出：2
解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
```
示例 3：
```
输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
```
示例 4：
```
输入：nums = [0]
输出：1
解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
```

提示：

* n == nums.length
* 1 <= n <= 104
* 0 <= nums[i] <= n
* nums 中的所有数字都 独一无二

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/missing-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：异或运算
### 思路
异或运算：
* 如果a、b两个值`不相同`，则异或结果为`1`。如果a、b两个值`相同`，异或结果为`0`
* 所以一个数和它本身做异或运算结果为 0
* 所以一个数和 0 做异或运算还是它本身

把所有的元素和索引做异或运算，成对的数字都会消为 0，最后就会剩下这个缺失的元素

### 代码
```js
/**
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var missingNumber = function (nums) {
    let n = nums.length;

    let res = 0;
    // 先和新补的索引异或一下
    res ^= n;

    // 和其他的元素、索引做异或
    for (let i = 0; i < n; i++) {
        res ^= i ^ nums[i];
    }

    return res;
};

```
### 复杂度
* 时间复杂度 O(N)
* 空间复杂度 O(1)

## 解法2：等差数列
### 思路
等差数列前n项和公式：`(首项 + 末项) * 项数 / 2`

### 代码
```js
/**
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var missingNumber = function (nums) {
    let n = nums.length;
    // 公式：(首项 + 末项) * 项数 / 2
    let expect = (0 + n) * (n + 1) / 2;

    let sum = 0;
    for (let x of nums) {
        sum += x;
    }

    return expect - sum;
}
```
### 复杂度
* 时间复杂度 O(N)
* 空间复杂度 O(1)
