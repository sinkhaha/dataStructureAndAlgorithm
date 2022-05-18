### 题目
**142. 环形链表 II**
>中等

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。**注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。**

**说明：**不允许修改给定的链表。

**进阶：**

* 你是否可以使用 O(1) 空间解决此题？

**示例 1：**

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/142_1.png)


>输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。

**示例 2：**

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/142_2.png)


>输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。

**示例 3：**

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/142_3.png)


>输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。

**提示：**

* 链表中节点的数目范围在范围` [0, 104]` 内
* `-105 <= Node.val <= 105`
* pos 的值为 -1 或者链表中的一个有效索引

### 解法1: set法
#### 思路
遍历链表中的每个节点，并将保存到set，如果下次遇到了遍历过的节点，说明链表中存在环，此时的节点为入环节点

#### 代码
```javascript
/**
 * @param {*} head 
 */
function detectCycle1(head) {
    const visited = new Set();

    while (head !== null) {
        if (visited.has(head)) {
            return head; // 有环，此时的节点为入环节点
        } else {
            visited.add(head);
            head = head.next;
        }
    }
    return null;
}

```

#### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(n)


### 解法2: 快慢指针(推荐)
#### 思路
快慢指针，快慢指针`同时从头节点一起走`，如果链表有环，当快慢指针第一次相遇时，只需要将其中一个指针移动到链表头部，另一个指针保持在相遇的位置不变，两个指针`再同时出发`，每次只走一步，`再次相遇时`的节点则为环的入口节点。



推导如下：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8.png)

如图所示：

当快慢指针第一次相遇时，

- 慢指针移动的距离为 `s1 = A + B + n1 * L`

- 快指针移动的距离为 `s2 = A + B + n2 * L`

- 快指针的速度是慢指针的两倍，所以` s2 = 2* s1`，即`A + B + n2 * L = 2A + 2B + n1 * L` 即` A =  (n2 - n1) * L - B`，表示`A的距离=n圈环的周长 - B的距离`

- 所以即在第一次相遇点，把其中一个指针指向链表头节点，一个在相遇节点，此时两个指针一起走，那肯定会在入环节点相遇

  

#### 代码

```javascript
/*
 * @param {*} head 
 */
function detectCycle3(head) {
    // 快慢指针指向头节点
    let fast = head;
    let slow = head; 

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        // 第1次相遇
        if (fast == slow) {
            // console.log(`相遇节点值是：${slow.val}`);
            // 其中一个指针指向不动，另一个指针指向头
            slow = head;

            while (fast !== slow) {
                // 快慢指针都同时只移动一步
                slow = slow.next;
                fast = fast.next;
            }
            // 此时第2次相遇，指向的那个节点就是入环节点
            return slow;
        }
    }

    return null;
}

```

#### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)
