### 题目
**206. 反转链表**
>简单

反转一个单链表。

示例:
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法：双指针
#### 思路
双指针
* 定义两个指针：pre在后，cur在前，一次走一步，直到cur为null，即到链表尾部
* 每次让 cur 的 next 指向 pre ，完成一次局部反转
* pre指向cur，cur指向cur的下一个节点，即前进一步

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
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre = null;
    let cur = head;
    while(cur != null) {
        let curNext = cur.next;
        cur.next = pre;
        pre = cur;
        cur = curNext;
    }
    return pre;
};
```
#### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)
