## 题目
**23. 合并K个升序链表**
>困难

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

 

示例 1：
```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```
示例 2：
```
输入：lists = []
输出：[]
```
示例 3：
```
输入：lists = [[]]
输出：[]
```

提示：
* k == lists.length
* 0 <= k <= 10^4
* 0 <= lists[i].length <= 500
* -10^4 <= lists[i][j] <= 10^4
* lists[i] 按 升序 排列
* lists[i].length 的总和不超过 10^4

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：小顶堆(java实现)
### 思路
* 构造小顶堆(优先队列)
* 因为每个链表都是有序的，把每个链表放入小顶堆中
* 当小顶堆不为空时，输出堆顶元素(最小的元素)，即包含最小元素的链表，当输出的元素有下一个元素则继续放入堆中


### 代码
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // 小顶堆
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);
      
        for (ListNode node : lists) {
            if (node != null) {
                minHeap.offer(node);
            }
        }

        ListNode dummy = new ListNode(0);
        ListNode temp = dummy;

        while(!minHeap.isEmpty()) {
            // 最小节点
            ListNode minNode = minHeap.poll();
            temp.next = minNode;
            temp = minNode;
            if (minNode.next != null) {
                minHeap.offer(minNode.next);
            }
        }

        return dummy.next;
    }
}
```
### 复杂度
* 时间复杂度：O(NlogK)，N是链表元素的总和，K是链表个数，每次O(logK) 比较 K个指针求 min

* 空间复杂度：O(K)

  

## 补充：合并k个有序数组(每个数组的长度都是L)
### 思路：小顶堆
小顶堆

* 小顶堆的节点是`一个key是当前元素在数组的下标，value是当前元素`的节点

* 先将N个数组的`第1个元素`放到小顶堆中
* 循环取出堆的堆顶元素（最小值）放入result数组中
* 接着把`出堆的堆顶元素`所在数组的下一个数字放入堆中
* 直到所有数组的所有元素都被加入到result数组即停止`（N*L）次`
### 代码
```java
import java.util.PriorityQueue;
import java.util.Arrays;
import java.util.Comparator;

public class SortedArraysMerge {
    // 最小堆存的节点类
    static class Node {
        int value;
        int idx;

        public Node(int value, int idx) {
            this.value = value; // 当前元素
            this.idx = idx; // "当前元素所在的数组"在arr中的序号
        }
    }

    public static int[] MergeArrays(int[][] arr) {
        int N = arr.length, L;

        // 传入的数组为空
        if (N == 0) {
            return new int[0];
        } else { // 判断数组是否符合规范
            L = arr[0].length;
            for (int i = 1; i < N; i++) {
                if (arr[i].length != L) {
                    return new int[0]; // 数组不规范
                }
            }
        }

        // 结果数组
        int[] result = new int[N * L];

        // 初始化为0，value存的是数组已经入堆的下标，根据该下标可以取该数组下一个入堆的元素
        int[] index = new int[N];
        Arrays.fill(index, 0, N, 0);

        // 最小堆
        PriorityQueue<Node> queue = new PriorityQueue<Node>(new Comparator<Node>() {
            @Override
            public int compare(Node n1, Node n2) {
                if (n1.value < n2.value)
                    return -1;
                else if (n1.value > n2.value)
                    return 1;
                else
                    return 0;
            }
        });

        // 入堆
        for (int i = 0; i < N; i++) {
            Node node = new Node(arr[i][index[i]++], i);
            queue.offer(node);
        }

        System.out.println("最小堆的长度：" + queue.size());

        int idx = 0;
        while (idx < N * L) {
            // 出堆
            Node minNode = queue.poll();
            // 放入结果数组
            result[idx++] = minNode.value;
            
            // 数组元素还没完全入堆
            if (index[minNode.idx] < L) {
                queue.offer(
                    new Node(arr[minNode.idx][index[minNode.idx], 
                    minNode.idx)
                );
                index[minNode.idx]++;
            }
        }
        return result;
    }
}
```
### 复杂度
* 时间复杂度：O(N*LlogN)
* 空间复杂度：O(N)