### 题目
**61. 旋转链表**
> 中等

给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:
```
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
```
示例 2:

```
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rotate-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路
#### 整体思路
1. 先将链表`闭合成环`

2. 找到`新的链表尾节点`断开这个环，返回`新的链表新节点`即可（新的链表头节点在新的链表尾节点后面）

   


##### 补充：怎样找到新的链表头和链表尾
* 如果`n > k`，则新的链表尾节点在原链表的`n - k - 1`位置
* 如果`n <= k`，则k可以改写成` k = (k / n) * n + k % n`的形式(`k / n`是向下取整)，
其中前面的部分`(k / n) * n`不影响最终的结果，因此只需要考虑 `k%n` 的部分，这个值一定比 n 小

综上，(关键点)
1. 新的链表尾节点是原链表的第` (n - k % n - 1) `个节点 

2. 新的链表头节点是原链表的第` (n - k % n) `个节点

   

#### 具体算法：两次遍历
1. 遍历原链表，找到`原链表的尾节点`，同时计算出`节点总数n`，尾节点的下一个节点指向原链表的头节点`连成环`，即`tailNode.next = head`

2. 遍历原链表，找到`新链表的尾节点`，新的链表头是第` (n - k % n) `个节点，
所以遍历到`cur < (n - k % n)`停止即找到`新的尾节点`，此时的节点是`新的尾节点newTailNode`，此时新的头节点为`newHead = newTailNode.next`

3. 断开环 `newTailNode.next = null`，返回新的链表头即可newHead


### 代码
```javascript
/**
 * 节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (head == null || head.next == null) {
        return head;
    }

    // 1.找到原链表的尾节点 和 总的节点数
    let tailNode = head;
    let n = 1;
    while(tailNode && tailNode.next) {
        tailNode = tailNode.next;
        n++;
    }

    // 2.连成环
    tailNode.next = head;

    // 3.找到断开节点(即找新的链表尾节点)
    let cur = 1;
    let newTailNode = head;
    while (cur < (n - k % n)) { // 第(n-k%n)个节点是新的链表头
        newTailNode = newTailNode.next;
        cur++;
    }

    // 4. 新的头节点(即新的尾节点的next)
    let newHead = newTailNode.next;
    // 5. 断开新的尾节点 和 新的头节点的连接
    newTailNode.next = null;

    return newHead;
};

```

### 复杂度
* 时间复杂度：O(N)，N 是链表节点的个数
* 空间复杂度：O(1)


