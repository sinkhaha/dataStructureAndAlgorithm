## 题目
**1206. 设计跳表**
>困难

不使用任何库函数，设计一个跳表。

跳表是在 `O(log(n))` 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。



例如，一个跳表包含 [30, 40, 50, 60, 70, 90]，然后增加 80、45 到跳表中

跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 O(n)。跳表的每一个操作的平均时间复杂度是 O(log(n))，空间复杂度是 O(n)。

在本题中，你的设计应该要包含这些函数：

* bool search(int target) : 返回target是否存在于跳表中。
* void add(int num): 插入一个元素到跳表。
* bool erase(int num): 在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。

了解更多 : `https://en.wikipedia.org/wiki/Skip_list`

注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。

样例:
```
Skiplist skiplist = new Skiplist();

skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // 返回 false
skiplist.add(4);
skiplist.search(1);   // 返回 true
skiplist.erase(0);    // 返回 false，0 不在跳表中
skiplist.erase(1);    // 返回 true
skiplist.search(1);   // 返回 false，1 已被擦除
```
约束条件:
* 0 <= num, target <= 20000
* 最多调用 50000 次 search, add, 以及 erase操作。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-skiplist
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路
* 跳表是在` O(log(n)) `时间内完成增加、删除、搜索操作的数据结构
* 每个节点有`两个指针`，往右和往下
* 寻找节点时，从最左上角开始往右搜索，网络`每层是有序的`
* `插入`时记录每层可能需要插入的位置，从下往上逐个插入，是否插入策略由抛硬币决定
* `删除`时，从上往下删，把每层符合要求的节点从当前层链表删除

参考 https://github.com/leetcode-pp/91alg-2/blob/master/solution/advanced/d47.design-skiplist.md

## 代码
```js
/**
 * 节点
 * 每个节点都有一个next右指针和down下指针
 * @param {*} val 
 * @param {*} next 
 * @param {*} down 
 */
function Node(val, next = null, down = null) {
    this.val = val;
    this.next = next;
    this.down = down;
}

/**
 * 
 */
var Skiplist = function () {
    this.head = new Node(null);
};

/**
 * 因为链表有序，查找时，从左往右查，查不到则往下找
 * @param {number} target 要查找的值
 * @return {boolean}
 */
Skiplist.prototype.search = function (target) {
    let head = this.head;
    while (head) {
        // 链表有序，从左往右找
        while (head.next && head.next.val < target) {
            head = head.next;
        }
        // 向下找
        if (!head.next || head.next.val > target) { 
            head = head.down;
        } else {
            return true;
        }
    }
    return false;
};

/**
 * 插入时记录每层可能需要插入的位置，从下往上逐个插入，是否插入策略由抛硬币决定
 * @param {number} num
 * @return {void}
 */
Skiplist.prototype.add = function (num) {
    const stack = [];
    let cur = this.head;

    // 用一个栈记录每一层可能会插入的位置
    while (cur) {
        while (cur.next && cur.next.val < num) {
            cur = cur.next;
        }
        stack.push(cur);
        cur = cur.down;
    }

    // 用一个标志位记录是否要插入，最底下一层一定需要插入(对应栈顶元素)
    let isNeedInsert = true;
    let downNode = null;
    while (isNeedInsert && stack.length) {
        let pre = stack.pop();
        // 插入元素，维护 next/down 指针
        pre.next = new Node(num, pre.next, downNode);
        downNode = pre.next;
        // 抛硬币确定下一个元素是否需要被添加
        isNeedInsert = Math.random() < 0.5;
    }

    // 当前所有层都插入了改元素，还需要继续往上插入，则新建一层，表现为新建一层元素
    if (isNeedInsert) {
        this.head = new Node(null, new Node(num, null, downNode), this.head);
    }
};

/**
 * @param {number} num
 * @return {boolean}
 */
Skiplist.prototype.erase = function (num) {
    let head = this.head;
    let seen = false;
    while (head) {
        // 在当前层往前走
        while (head.next && head.next.val < num) {
            head = head.next;
        }
        // 往下走
        if (!head.next || head.next.val > num) {
            head = head.down;
        } else {
            // 找到了该元素
            seen = true;
            // 从当前链表删除
            head.next = head.next.next;
            // 往下
            head = head.down;
        }
    }
    return seen;
};
```