## 题目
**1054. 距离相等的条形码**
>中等

在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]。

请你重新排列这些条形码，使其中两个相邻的条形码 不能 相等。 你可以返回任何满足该要求的答案，此题保证存在答案。

 

示例 1：
```
输入：[1,1,1,2,2,2]
输出：[2,1,2,1,2,1]
```
示例 2：
```
输入：[1,1,1,1,2,2,3,3]
输出：[1,3,1,3,2,1,2,1]
```

提示：
* 1 <= barcodes.length <= 10000
* 1 <= barcodes[i] <= 10000

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/distant-barcodes
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法:大顶堆
### 思路
* 把数组存入map中，key是数字，value是出现次数
* 维护一个大顶堆，根据map中value排
* 大顶堆出堆，把对应数字按隔位填充

### 代码
```java
class Solution {
    public int[] rearrangeBarcodes(int[] barcodes) {
        Integer n = barcodes.length;
        // 数字->出现次数
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int num: barcodes) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        // 大顶堆，根据出现次数排
        PriorityQueue<HashMap.Entry<Integer, Integer>> maxHeap = new PriorityQueue<>((a, b) -> (Integer)b.getValue() - (Integer)a.getValue());
        
        for (HashMap.Entry<Integer, Integer> entry : map.entrySet()) {
            maxHeap.offer(entry);
        }

        int[] res = new int[n];
        int i = 0;
        while(maxHeap.size() > 0) {
            HashMap.Entry<Integer, Integer> top = maxHeap.peek();
            Integer num = top.getKey();
            Integer count = top.getValue();

            maxHeap.poll();

            for (int j = 0; j < count; j++) {
                res[i] = num;
                // 隔一位填充一个
                i = (i + 2 >= n) ? 1 : i + 2;
            }
        }

        return res;
    }
}
```
### 复杂度
* 时间复杂度：O(n*logn)
* 空间复杂度：O(n)
