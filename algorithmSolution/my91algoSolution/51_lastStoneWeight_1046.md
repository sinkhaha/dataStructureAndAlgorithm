## 题目
**1046. 最后一块石头的重量**
>简单

有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：

* 如果 x == y，那么两块石头都会被完全粉碎；
* 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

示例：
```
输入：[2,7,4,1,8,1]
输出：1
解释：
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。
```

提示：
1. 1 <= stones.length <= 30
2. 1 <= stones[i] <= 1000


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/last-stone-weight
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：大顶堆(java实现)
### 思路
* 维护一个大顶堆
* 依次取大顶堆的最大两个元素，不相等则把`差值`继续放入堆中，循环直到`堆的元素个数少于2个`
* 如果堆还有元素则返回元素的值，没有则返回0

### 代码
```java
class Solution {
    public int lastStoneWeight(int[] stones) {
        int len = stones.length;

        PriorityQueue<Integer> maxHeap = new PriorityQueue<Integer>(new Comparator<Integer>() {
            public int compare(Integer a, Integer b) {
                // 大顶堆
                return b - a;
            }
        });
       
        for (int stone: stones) {
           maxHeap.add(stone);
        }
        
        while (maxHeap.size() >= 2) {
            Integer top1 = maxHeap.poll();
            Integer top2 = maxHeap.poll();
            if (!top1.equals(top2)) {
                Integer val = top1 - top2;
                maxHeap.add(val);
            }
        }

        return maxHeap.isEmpty() ? 0 : maxHeap.poll() ;
    }
}
```

### 复杂度
* 时间复杂度：O(n * logk) ，n是stones数组大小，k是堆的大小，此题目的k等于n
* 空间复杂度：O(k)
