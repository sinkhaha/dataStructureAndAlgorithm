## 题目
**347. 前 K 个高频元素**
>中等

给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

示例 1:
```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```
示例 2:
```
输入: nums = [1], k = 1
输出: [1]
```

提示：
* 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
* 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
* 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
* 你可以按任意顺序返回答案。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/top-k-frequent-elements
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1:哈希表法
### 思路
* 遍历数组，哈希表维护一个计数 (key是数字，val是出现的次数)
* 根据`次数降序`排序，取前k位返回即可(js可利用entries/sort/map)

### 代码
```javascript
/**
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = {};
    for (let num of nums) {
        if(map[num] == undefined) {
            map[num] = 0;
        } else {
            map[num]++;
        }
    }

    return Object.entries(map)
        .sort((a, b) => {
            return b[1] - a[1];
        })
        .slice(0, k)
        .map(val => val[0]);
};
```
### 复杂度
* 时间复杂度O(NlogN), 排序的时间
* 空间复杂度O(N)


## 解法2: 哈希表+小顶堆(推荐)
### 思路
* 遍历数组，哈希表维护一个计数 (key是数字，val是出现的次数)
* 形成一个【出现次数的数组】，此时相当于找出现次数前k的数
* 维护一个k个元素的`小顶堆`，遍历【出现次数的数组】
>* 如果堆的元素个数小于k，则直接插入堆中
>* 如果堆的元素个数等于k了，则检查插入的值的出现次数跟堆顶元素的出现次数相比较，如果当前要插入的值的出现次数大于堆顶元素，则堆顶元素删除，当前值插入堆中，调整小顶堆；如果当前要插入堆值的出现次数小于等于堆顶元素，则不操作，继续遍历下一个值

---

* java可以用自带的优先队列api实现
* 类似题目[215.数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

### 代码
```java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // key是数字，value是出现次数
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int num: nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        // 维护一个小顶堆，优先队列实现，根据出现次数比较大小
        // int[] 的第一个元素是值，第二个元素是该值出现的次数
        PriorityQueue<int[]> queue = new PriorityQueue<int[]>(new Comparator<int[]>() {
            public int compare(int[] m, int[] n) {
                return m[1] - n[1]; // 下标1是出现次数
            }
        });

        for (Map.Entry<Integer, Integer> entry: map.entrySet()) {
            int num = entry.getKey();
            int count = entry.getValue();

            // 未达到容量，直接放入堆中
            if (queue.size() != k) {
                queue.add(new int[]{num, count});
            } else {
                // 达到则需要根堆顶元素判断大小，大于则替换，小于则不操作
                if (count > queue.peek()[1]) {
                    queue.poll();
                    queue.offer(new int[]{num, count});
                }
            }
        }

        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = queue.poll()[0];
        }
        return result;
    }
}
```
### 复杂度
* 时间复杂度：O(Nlogk)， N为数组的长度
> 遍历数组，要 O(N)的时间；遍历【出现次数数组】，因为堆的大小至多为 k，每次堆操作需要 O(logk) 的时间，共需O(Nlogk) 的时间，取大者即O(Nlogk)

* 空间复杂度：O(N)
>因为哈希表的大小为 O(N)，而堆的大小为 O(K)，最坏K等于N
