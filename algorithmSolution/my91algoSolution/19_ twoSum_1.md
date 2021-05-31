## 题目
**1. 两数之和**
>简单

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。


示例:
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路：哈希表
维护一个哈希表，key是数字，value为下标，遍历数组，判断`(目标值-当前数)`的值是否存在哈希表里，存在则返回对应的下标，不存在则把当前数字放入哈希表

## 代码
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {  
    // 存 数字=>下标 键值对
    let hashMap = new Map();  

    for (let i = 0; i < nums.length; i++) {
        const another = target - nums[i];
        const isHas = hashMap.has(another);
        if (isHas) {
          return [hashMap.get(another), i];
        }
        hashMap.set(nums[i], i);
    }
    return [];
};
```

## 复杂度
* 时间复杂度 O(N)
* 空间复杂度 O(N)