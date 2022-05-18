## 题目
**677. 键值映射**
>中等

实现一个 MapSum 类，支持两个方法，insert 和 sum：

* MapSum() 初始化 MapSum 对象
* void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
* int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。

示例：
```
输入：
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
输出：
[null, null, 3, null, 5]

解释：
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
```

提示：

* 1 <= key.length, prefix.length <= 50
* key 和 prefix 仅由小写英文字母组成
* 1 <= val <= 1000
* 最多调用 50 次 insert 和 sum

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/map-sum-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：哈希表
### 思路
* insert时，直接用哈希表存单词，key是单词，value是对应的值
* sum取得哈希表全部的key，累加前缀为prefix的value

### 代码
```js
/**
 * Initialize your data structure here.
 */
var MapSum = function() {
    this.root = {};
};

/** 
 * 时间O(1)
 * 空间O(1)
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    this.root[key] = val;
};

/** 
 * 时间O(n),n为单词的个数
 * 空间O(1)
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let result = 0;

    Object.keys(this.root).forEach(v => {
        if (v.startsWith(prefix)) {
           result += this.root[v];
        }
    });
    return result;
};


/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```
## 解法2: 前缀树+递归
### 思路
* insert时，用前缀树存储
* sum时，找到`符合前缀的节点`，然后`递归计算`以prefix为前缀的所有节点的值

### 代码
```js
/**
 * Initialize your data structure here.
 */
var MapSum = function() {
    this.root = {};
};

/** 
 * 时间O(n)，n是key的长度
 * 空间O(n)
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    let node = this.root;
    for (let char of key) {
        if (node[char] == undefined) {
            node[char] = {};
        }
        node = node[char];
    }
    node.val = val;
};

/** 
 * 时间O(n)，n是root中最长单词的长度
 * 空间O(n)
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let node = this.root;
    for (let char of prefix) {
        if (node[char] == undefined) {
            return 0;
        }
        node = node[char];
    }
    return this.getSum(node);
};

MapSum.prototype.getSum = function(obj){
    let sum = 0;
    if (obj.val !== undefined) {
        sum += obj.val;
    }
    for (let key in obj) {
        // 递归
        sum += this.getSum(obj[key]);
    }
    return sum;
}
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
```
