### 题目
**1381. 设计一个支持增量操作的栈**

>中等

请你设计一个支持下述操作的栈。

实现自定义栈类 CustomStack ：

* CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
* void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
* int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
* void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。


示例：
```
输入：
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]

输出：
[null,null,null,2,null,null,null,null,null,103,202,201,-1]

解释：
CustomStack customStack = new CustomStack(3); // 栈是空的 []
customStack.push(1);                          // 栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.pop();                            // 返回 2 --> 返回栈顶值 2，栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.push(3);                          // 栈变为 [1, 2, 3]
customStack.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
customStack.pop();                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
customStack.pop();                            // 返回 -1 --> 栈为空，返回 -1
```

提示：
* 1 <= maxSize <= 1000
* 1 <= x <= 1000
* 1 <= k <= 1000
* 0 <= val <= 100
* 每种方法 increment，push 以及 pop 分别最多调用 1000 次

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-a-stack-with-increment-operation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1：数组实现栈

#### 思路

直接用`数组`模拟栈，`push和pop时`只需要操作数组原生的方法即可，`increment`时为栈中的`每个元素都加上增量的值`

#### 代码
```javascript
/**
 * @param {number} maxSize
 */
var CustomStack = function(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if (this.stack.length >= this.maxSize) {
        return;
    }
    this.stack.push(x);
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    return this.stack.length ? this.stack.pop() : -1;
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    // 注意：当有增量时，取栈中的每个元素加上增量的值再次存入栈中
    let length = Math.min(k, this.stack.length);
    for (let i = 0; i < length; i++) {
        this.stack[i] += val;
    }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
```

#### 复杂度
* 时间复杂度 push:O(1)、pop：O(1)、increment：O(N) ，N为min(K， 栈中元素的个数)
* 空间复杂度 O(N)，N为maxSize



### 解法2：空间换时间

#### 思路

 解法1的优化，在解法1的基础上`把increment的时间复杂度从O(N)降为O(1)`，保存增量，在pop时才增加增量的值



**空间换时间**

* 增加`哈希表`存储空间(数组也行)，`key`是stack数组的下标，`value`是当前下标`要增加的增量`，表示stack对应下标在pop时要增加的增量，在increment时要保存增量到哈希表
* 在pop时才去`为弹出的元素增加增量`（类似按需加载，而不是在increment时为栈的每个元素都添加增量），注意此时哈希表中的key为`前一个下标newTop的值要加上pop出的元素的下标top的增量`（因为increment方法，表示的是前k个元素都要加上增量，而此时的实现，在哈希表中保存的`仅是当前第k个元素的增量`，并没有把`第1到k-1元素`的增量保存到哈希表中），pop后的元素对应的下标top的增量要置为0

#### 代码

```javascript
/**
 * @param {number} maxSize
 */
var CustomStack = function(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
    this.hashMap = {}; // key是stack数组下标，value是当前下标对应的元素要加上的增量
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if (this.stack.length < this.maxSize) {
        this.stack.push(x);
    }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    let top = this.stack.length - 1;
    if (top < 0) {
        return -1;
    }
    
    let result = this.stack.pop();
    const incValue = this.hashMap[top] || 0;
    result += incValue; // 加上增量

    // 注意：top-1 也需要加上top的增量，因为在increment时，只保存了第k个下标加上增量，并没有保存从1到k-1下标的增量，而increment时实际是第1到k个元素都需要加上增量的
    const newTop = top - 1;
    this.setIncValue(newTop, incValue);

    this.hashMap[top] = 0;
    return result;
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    let index = Math.min(k, this.stack.length) - 1;
    if (index < 0) {
        return;
    }

    this.setIncValue(index, val);
};

CustomStack.prototype.setIncValue = function (key, value) {
    if (!(key in this.hashMap)) {
        this.hashMap[key] = 0;
    }
    // 只为第k个下标加上增量保存，并没有保存从1到k-1下标的增量
    this.hashMap[key] += value;
};
/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
```

#### 复杂度

* 时间复杂度 push:O(1)、pop：O(1)、increment：O(1) ，N为min(K， 栈中元素的个数)
* 空间复杂度 O(N)，N为maxSize

