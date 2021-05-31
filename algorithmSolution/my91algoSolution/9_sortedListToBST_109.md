### 题目
**109. 有序链表转换二叉搜索树**
>中等


给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：
```
      0
     / \
   -3   9
   /   /
 -10  5
```

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: 快慢指针 + 分治递归
#### 思路

* 首先要`确定根节点`，因为要构造`平衡的二叉树`，可以选定链表的`中间节点`作为根节点，因为这样构造出来的树会尽量平衡
* 使用快慢指针定位链表`中间节点`，构建根节点，`分治递归`构建左右子树

>快慢指针：快慢指针同时指向链表头节点，`快指针`移动2步，慢指针移动1步，直到`快指针`到达尾节点，此时`慢指针`指向的节点即为中间节点

#### 代码
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 
 * 快慢指针 + 递归-分治
 * 
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    return buildTree(head, null);
};

var buildTree = function (head, tail) {
    if (!head || head === tail) {
        return null;
    }
    
    // 快慢指针 得到链表中间节点
    let fast = head;
    let slow = head;
    while (fast !== tail && fast.next !== tail) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 递归构造二叉树
    let val = slow.val;
    let root = new TreeNode(val);

    root.left = buildTree(head, slow);
    root.right = buildTree(slow.next, tail);

    return root;
}
```

#### 复杂度
* 时间复杂度O(nlogn)，n是链表的长度
* 空间复杂度O(logn)

### 解法2: 中序遍历 + 递归

#### 思路
对链表进行`中序遍历`，还原二叉树

* 因为给定的链表是`有序的`，所以二叉树的中序遍历结果是`递增的`，其实就是链表的值，只不过此时链表少了	`null值`
* `链表的头节点`是构造出来的树的`最左子树的根节点`

---

维护`指针 h`，从链表头结点开始，用 `h.val `构建节点，构建一个，指针后移一位
* 先求出链表`总节点数`，每次求出`链表的中间位置mid`，分治，先根据左链递归构建左子树，
它会尽可能去分左右链，直到分不下去就返回 null，然后创建最左子树的根节点，
接上它的两个null，然后 h 指针后移，创建下一个节点



#### 代码
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 
 * 
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    if (head == null) {
        return null;
    }

    // h初始指向头结点
    let h = head; 

    // 链表总节点数
    let len = 0;
    while (head) { 
        len++;
        head = head.next;
    }

    const buildTree = (left, right) => {
        // 递归出口，返回null节点
        if (left > right) {
            return null;    
        }

        // 求mid中间节点
        const mid = left + ((right - left) >> 1);  
        
        const root = new TreeNode();

        // 先递归构建左子树
        const leftNode = buildTree(left, mid - 1); 
        // 构建左子树
        root.left = leftNode; 
        root.val = h.val;
        
        // h指针前进
        h = h.next; 

        // 构建右子树        
        root.right = buildTree(mid + 1, right);

        return root;
    };

    return buildTree(0, len - 1);
};

```

#### 复杂度
* 时间复杂度：O(n)
* 空间复杂度：O(logn)

比第1种解法，时间复杂度更优

