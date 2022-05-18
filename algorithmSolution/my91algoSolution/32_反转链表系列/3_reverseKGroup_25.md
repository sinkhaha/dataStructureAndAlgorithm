### 题目
**25. K 个一组翻转链表**
>困难

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。


示例：

给你这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5


说明：
* 你的算法只能使用常数的额外空间。
* 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-nodes-in-k-group
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法：递归+双指针

#### 思路
递归
1. 先判断链表是否大于等于k个元素，是的话以k个元素为一组反转链表，不是则这几个元素不用反转
2. 先反转以 head 开头的 k 个元素
3. 将第` k + 1 `个元素作为 head 递归调用 `reverseKGroup` 函数
4. 将上述2和3两个过程的结果连接起来

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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
   if (head == null) {
        return null;
    }
    
    // 区间 [a, b) 包含 k 个待反转元素
    let a = head;
    let b = head;
    for (let i = 0; i < k; i++) {
        // 不足 k 个，不需要反转，链表直接返回
        if (b == null) {
            return head;
        }
        b = b.next;
    }

    // 反转前 k 个元素
    let newHead = reverse(a, b);

    // 递归反转后续链表并连接起来
    a.next = reverseKGroup(b, k);

    return newHead;
};

/**
 * 反转链表
 * 反转区间 [a, b) 链表的元素，左闭右开 
 * @param {*} a 
 */
function reverse(a, b) {
    let pre = null;
    let cur = a;
    let nxt = a;
    while (cur != b) {
        nxt = cur.next;
        // 逐个结点反转
        cur.next = pre;
        // 更新指针位置
        pre = cur;
        cur = nxt;
    }
    // 返回反转后的头结点
    return pre;
}
```
#### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(n)
