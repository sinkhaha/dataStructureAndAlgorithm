### 题目
**160. 相交链表**
> 简单

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：



![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/160_1.png)



在节点 c1 开始相交。

 

示例 1：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/160_2.png)


```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3

输出：Reference of the node with value = 8

输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

示例 2：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/160_3.png)


```
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1

输出：Reference of the node with value = 2

输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

示例 3：

![](https://sink-blog-pic.oss-cn-shenzhen.aliyuncs.com/img/leetcode/160_4.png)


```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2

输出：null

输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。

解释：这两个链表不相交，因此返回 null。
```

注意：

* 如果两个链表没有交点，返回 null.
* 在返回结果后，两个链表仍须保持原有的结构。
* 可假定整个链表结构中没有循环。
* 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/intersection-of-two-linked-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: set法
#### 思路
* 遍历其中一个链表`把每个节点放入set`
* 然后遍历另一个链表判断当前节点是否在set中，是的话返回，当链表`遍历完`都不存在则不相交

#### 代码
```javascript
/**
 * 链表节点类
 * @param {*} val 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    
    let set = new Set();

    while (headA) {
        set.add(headA);
        headA = headA.next;
    }

    while(headB) {
        if (set.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }

    return null;
};
```

#### 复杂度
* 时间复杂度O(n)， n为Max(len(headA), len(headB))
* 空间复杂度O(n) ，n为放到set集合的链表的长度


### 解法2: 统计法(随便命的名)

#### 思路
* 先分别`统计`两个链表的`长度`
* 当长度不相等时，让`长的链表先遍历`，直到两个链表长度一样停止，此时两个链表距离末尾是同样的长度
* 让两个链表`同时往后遍历`，有相同的节点即相交，直接返回，遍历完后没有则不相交

#### 代码
```javascript
/**
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    let lenA = getLength(headA);
    let lenB = getLength(headB);
    
    while (lenA !== lenB) {
        if (lenA > lenB) {
            headA = headA.next;
            lenA--;
        } else {
            headB = headB.next;
            lenB--;
        }
    }
    
    // 同时遍历
    while (headA != headB) {
        headA = headA.next;
        headB = headB.next;
    }

    return headA;
};
// 获取链表的长度
var getLength = function (head) {
    let len = 0;
    while(head) {
        head = head.next;
        len++;
    }
    return len;
}
```

#### 复杂度
* 时间复杂度O(n) ，n为Max(len(headA), len(headB))

* 空间复杂度O(1)
  
  > 空间复杂度比解法1更优
  
  
### 解法3: 双指针(推荐)
#### 思路
利用双指针，两个指针分别指向`两个链表的头节点`，此时有两种情况：
1.  链表A的长度和链表B的`长度相等`，它们每次都走一步，在遍历完链表前，肯定会在相交点相遇
2.  链表A的长度和链表B的`长度不相等`

这里主要是第2种情况的处理麻烦，当链表A和链表B长度不相等时，如果同时从头节点遍历不可能会相交， 所以需要`消除两个链表的长度差`。



**消除长度差（假设B链表比A链表长）**

* 指针 pA 指向 A 链表，指针 pB 指向 B 链表，依次`从左往右遍历`
* 如果 pA 遍历完链表A了，即`pA == null`时，下一步让pA指向B链表头节点后开始遍历，即 `pA = headB` 继续遍历；(此时pB指针到B链表末尾是A链表和B链表的长度差)
* 如果 pB 遍历完链表B了，即`pB == null`时，下一步让pB指向A链表头节点后开始遍历，即` pB = headA` 继续遍历；(此时pB走完了B链表，而`pA走完了长度差的长度`，pB指针回到了A链表头节点，即相当于pA和pB消除了长度差，此时`距离各自的链表尾是同样的长度`，同时走如果相交肯定会相遇)

#### 代码
```javascript
/**
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) {
        return null;
    }
    let pA = headA;
    let pB = headB;

    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }

    return pA;
};

```

#### 复杂度
* 时间O(m+n)， m和n分别为两个链表的长度
* 空间O(1)
