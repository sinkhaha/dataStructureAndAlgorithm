### 题目
**232. 用栈实现队列**

>简单

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列的支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

* void push(int x) 将元素 x 推到队列的末尾
* int pop() 从队列的开头移除并返回元素
* int peek() 返回队列开头的元素
* boolean empty() 如果队列为空，返回 true ；否则，返回 false


说明：

* 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
* 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。


进阶：

* 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。


示例：
```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]

输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```


提示：
* 1 <= x <= 9
* 最多调用 100 次 push、pop、peek 和 empty
* 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



### 解法1：一个栈
#### 思路

用一个`数组(栈)`来维护一个队列(`数组的头部是队列尾部，数组尾部是队列头部`，因为队头出队，队尾入队)

* `pop出队`直接弹出数组队最后一个元素，peek时直接取数组的最后一个元素

* `push入队`需要插入数组队的头部，利用辅助栈，先把数组的数据都搬移到辅助栈中，push入数据，然后再把辅助栈队数据放入原数组中

  

#### 代码
```javascript
/**
 * 解法1
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.dataStack = []; // 数组第一个元素是队尾，最后一个是队头
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    let helpStack = [];
    while(this.dataStack.length !== 0) {
        helpStack.push(this.dataStack.pop());
    }
    this.dataStack.push(x);
    while(helpStack.length) {
        this.dataStack.push(helpStack.pop());
    }
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.dataStack.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.dataStack[this.dataStack.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.dataStack.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

#### 复杂度
* 时间复杂度 `push:O(n)` `pop:O(1)` `peek:O(1)` `empty:O(1)`
* 空间复杂度： 都是`O(1)`



### 解法2：两个栈

#### 思路

`时间复杂度`和解法1不同



用`两个数组`(栈)实现队列

* `push入列`时，直接插入数据栈stack
* `pop出列`时，因为先入列的元素在stack栈底，需要先他们弹出依次压入`辅助栈helperStack`，取数组头元素a，然后再把辅助栈的元素重新入stack，返回a

* peek类似pop

#### 代码

```javascript
class MyQueue {
    constructor() {
        this.stack = []; // 数组头部为栈底
        this.helperStack = []; // 辅助栈
    }

    /**
     * 时间O(1)
     * 将一个元素放入队列的尾部
     */
    push(x) {
        this.stack.push(x);
    }

    /**
     * 从队列首部移除元素
     * 
     * 时间复杂度O(n)
     * 空间复杂度O(1)
     */
    pop() {
        while(this.stack.length) {
            this.helperStack.push(this.stack.pop());
        }
        const pop = this.helperStack.pop();
        while(this.helperStack.length) {
            this.stack.push(this.helperStack.pop())
        }
        return pop;
    }

    /**
     * 时间复杂度O(n)
     * 返回队列首部的元素
     */
    peek() {
        while(this.stack.length) {
            this.helperStack.push(this.stack.pop());
        }
        const peek = this.helperStack[this.helperStack.length - 1];
        while(this.helperStack.length) {
            this.stack.push(this.helperStack.pop())
        }
        return peek;
    }

    /**
     * O(1)
     * 返回队列是否为空
     */
    empty() {
        return this.stack.length === 0;
    }
}
```

#### 复杂度

* 时间复杂度 `push:O(1)` `pop:O(n)` `peek:O(n)` `empty:O(1)`
* 空间复杂度： 都是`O(1)`
