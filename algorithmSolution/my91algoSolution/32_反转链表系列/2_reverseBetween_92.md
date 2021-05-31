### 题目
**92. 反转链表 II**
>中等

反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:
```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法：双指针
#### 思路
* 先找到m的前一个节点，cur指向m节点，先反转`m和n`之间的链表(和206题思路差不多)
* 然后`m - 1`位置的节点重新指向反转后的头节点
* 反转后的尾节点指向`n + 1`位置的节点

#### 代码
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 以 1->2->3->4->5->NULL, m = 2, n = 4举例，具体见代码注释
 * 
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    let dummy = new ListNode(-1);
    dummy.next = head;

    // 找到m的前一个节点
    let mNodePre = dummy;
    for (let i = 1; i < m; i++) {
        mNodePre = mNodePre.next;
    }
    // 例：此时mNodePre为1
    
    let pre = null;
    let cur = mNodePre.next;

    // 反转n和m之间的链表
    for (let i = 0; i <= n - m; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 例：n和m之间的链表反转后为 null<-2<-3<-4； pre指向4，cur指向5

    // 反转后的链表的尾节点指向n+1位置的节点
    // 例：当前mNodePre.next指向2，所以mNodePre.next.next当前指向null修改为指向5
    mNodePre.next.next = cur;
    // m-1位置的节点重新指向反转后的头节点
    // 例：此时mNodePre指向1，mNodePre.next指向2，改成指向了4
    mNodePre.next = pre;

    return dummy.next;
};
```
#### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)
