## 题目
**215. 数组中的第K个最大元素**
>中等

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

示例 2:

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：小顶堆(java实现)
### 思路
* 遍历数组，放入小顶堆
* 堆达到k个则判断当前值大于是否大于堆顶元素，是的话则删除堆顶元素，然后当前值入堆，不是则不处理

### 代码
```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        // java优先队列默认就是优先取到小的元素，即小顶堆
        PriorityQueue<Integer> queue = new PriorityQueue<Integer>(new Comparator<Integer>() {
            public int compare(Integer a, Integer b) {
                return a - b; // 小顶堆
            }
        });

        // 遍历数组，放入小顶堆，堆达到k个则判断 当前值大于是否大于堆顶元素，是的话则删除堆顶元素，然后当前值入堆
        for (int num : nums) {
            if (queue.size() != k) {
                queue.add(num);
            } else {
                if (num > queue.peek()) {
                    queue.poll();
                    queue.add(num);
                }
            }
        }

        return queue.peek();
    }
}
```

### 复杂度
* 时间复杂度：O(n * logk) ，n是nums数组大小，k是堆的大小，此题目的k等于n
* 空间复杂度：O(k)

## 解法：排序
### 思路
直接从大到小排序，取第k个数即可
### 代码
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => parseInt(b) - parseInt(a));
    return nums[k - 1];
};
```

### 复杂度
* 时间复杂度：O(nlogn) - n  ，n是nums数组大小
* 空间复杂度：O(1)
