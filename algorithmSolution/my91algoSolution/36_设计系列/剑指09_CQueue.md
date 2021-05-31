## 题目
**剑指 Offer 09. 用两个栈实现队列**
>简单

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

 

示例 1：
```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```
示例 2：
```
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```
提示：
* 1 <= values <= 10000
* 最多会对 appendTail、deleteHead 进行 10000 次调用


>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：栈
### 思路
1. 用数组模拟两个栈
2. `插入时`都往stack1栈插入
3. `删除时`判断stack2栈是否有数据，没有数据则把stack1的数据pop出来然后插入stack2，然后stack2执行pop删除队头元素；如果stack2有数据则直接stack2执行pop即可

### 代码
```js
var CQueue = function() {
    this.stack1 = []; // 插入操作栈
    this.stack2 = []; // 删除操作栈
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (!this.stack2.length) {
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        }
    }
    if (!this.stack2.length) {
        return -1;
    } else {
        // 直接pop即可
        return this.stack2.pop();
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
## 复杂度
* 时间复杂度O(N)
* 空间复杂度O(N)