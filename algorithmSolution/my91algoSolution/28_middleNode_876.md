## 题目
**876. 链表的中间结点**
>简单

给定一个头结点为 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

 

示例 1：
```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

示例 2：
```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

提示：
* 给定链表的结点数介于 1 和 100 之间。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/middle-of-the-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路
* 快慢指针遍历链表，慢指针每次`走一步`，快指针每次`走两步`，相同时间内快指针走的距离就是慢指针的两倍

* 当快指针走到链表`尾部`的时候，慢指针刚好在链表`中间`

  > 链表节点单数时，快指针指向最后一个节点，此时慢指针指向中间节点；链表节点偶数时，快指针指向null，此时慢指针指向第二个中间节点


### 代码
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    while(fast !== null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};
```

### 复杂度
* 时间复杂度 O(N)，N为链表的节点数
* 空间复杂度 O(1)
