### 题目
**146. LRU缓存机制**
>中等

运用你所掌握的数据结构，设计和实现一个  LRU `(最近最少使用) `缓存机制 。
实现 LRUCache 类：

* LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
* int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
* void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。


>进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？

示例：
```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

提示：
* 1 <= capacity <= 3000
* 0 <= key <= 3000
* 0 <= value <= 104
最多调用 3 * 104 次 get 和 put

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lru-cache
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


### 解法1: 哈希表法

#### 思路
利用js`哈希表`对于set进去的元素为`顺序插入`的特点来实现，哈希表中越先设置的元素为最近最少使用的元素。

**put方法**
* `存在`则删除，然后`重新set`进去
* `不存在`则先判断是否超容量，没超过直接set，超过则`删除哈希表的第一个元素`，然后再set

**get方法**

* 存在则把该元素删掉后重新set一下，表示最近访问，不存在返回-1


#### 代码
```javascript
/**
 *
 * 
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map();
    this.capacity = capacity; 
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key);
        // 会把元素设置在最后面
        this.cache.set(key, value);
    } else {
        // 容量不够
        if (this.cache.size >= this.capacity) {
            // 删除map的第一个元素
            this.cache.delete(this.cache.keys().next().value);
            this.cache.set(key, value);
        } else {
            this.cache.set(key, value);
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

#### 复杂度
* 时间复杂度：get:O(1), put: O(1)
* 空间复杂度：get:O(n), put: O(n)， n为capacity容量

### 解法2: 哈希 + 双链表(推荐)
#### 思路
利用哈希表`快速查找`，双向链表`快速插入`和`删除`的特点，所以把时间复杂度降为`O(1)`



双向链表的每个节点`都存key和value对`，哈希表value存的是`双向链表的一个节点`

双向链表`靠尾部`的数据是`最近使用的`，靠头部的数据是最久为使用的(根据自己的实现定义)



**get方法**

* key不存在，则返回-1
* key存在，则需要提升key对应的节点为`最近被使用的节点`，在哈希表定位到`该节点在双向链表的位置`，然后删除后重新插入链表的尾部，代表最近被使用

**put方法**

* key不存在，则要添加节点到`链表和哈希表`中，添加前需要看容量是否超限，超过限制则删除双向链表的头节点(最少使用的节点)，然后插入双向链表的尾节点代表最近使用
* key存在，类似get方法key存在的做法，则从链表和哈希表删除该节点，然后重新添加到哈希表和链表中，代表最近使用

#### 代码
```javascript
/**
 * 链表节点类
 */
class Node {
    constructor(k, v) {
        this.key = k;
        this.val = v;
        this.next = null;
        this.prev = null;
    }
}

/**
 * 双链表类
 */
class MyDoubleList {
    constructor() {
        this.head = new Node(0, 0); // 头虚节点
        this.tail = new Node(0, 0); // 尾虚节点
        this.head.next = this.tail;
        this.tail.prev = this.head;
        // 链表元素数
        this.size = 0; 
    }

    /**
     * 在链表尾部添加节点(注意是尾部，所以lru靠尾部的数据是最近使用的)
     * 
     * 时间复杂度 O(1)
     * @param {*} x 
     */
    addLast(x) {
        x.prev = this.tail.prev;
        x.next = this.tail;
        this.tail.prev.next = x;
        this.tail.prev = x;
        this.size++;
    }

    /**
     * 删除链表中的x节点
     * 
     * 时间复杂度 O(1)
     * @param {*} x 
     */
    remove(x) {
        x.prev.next = x.next;
        x.next.prev = x.prev;
        this.size--;
    }

    /**
     * 删除链表中第一个节点，并返回该节点
     * 
     * 时间复杂度 O(1)
     */
    removeFirst() {
        if (this.head.next == this.tail) {
            return null;
        }  
        let first = this.head.next;
        this.remove(first);
        return first;
    }

    /**
     * 返回链表长度
     * 
     * 时间复杂度 O(1)
     */
    getSize() {
        return this.size;
    }
}

/**
 * LRU实现
 * 
 * 因为双链链表类只提供该从尾部插入的方法
 * 所以靠尾部的数据是最近使用的，靠头部的数据是最久未使用的
 * 
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.map = new Map();
    this.cache = new MyDoubleList(); 
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    }
    // 将该数据提升为最近使用的
    this.makeRecently(key);
    return this.map.get(key).val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, val) {
   if (this.map.has(key)) {
        // 删除旧数据
        this.deleteKey(key);
        // 新插入的数据为最近使用的数据
        this.addRecently(key, val);
        return;
    }

    if (this.cap == this.cache.size) {
        // 删除最久未使用的元素
        this.removeLeastRecently();
    }
    // 添加为最近使用的元素
    this.addRecently(key, val);
};

/**
 * 将某个key提升为最近使用的
 * 
 * 先从链表中删除这个节点，然后再重新插到链表尾
 * 
 * @param {*} key 
 */
LRUCache.prototype.makeRecently = function(key) {
    let x = this.map.get(key);
    if (x !== undefined) {
        this.cache.remove(x);
        this.cache.addLast(x);
    }
}

/**
 * 添加最近使用的元素
 * 
 * @param {*} key 
 * @param {*} val 
 */
LRUCache.prototype.addRecently = function(key, val) {
    let x = new Node(key, val);
    // 链表尾部就是最近使用的元素
    this.cache.addLast(x);
    // 在 map 中添加 key 的映射
    this.map.set(key, x);
}

/**
 * 删除某一个 key
 * @param {*} key 
 */
LRUCache.prototype.deleteKey = function(key) {
    let x = this.map.get(key);
    if (x !== undefined) {
        // 从链表中删除
        this.cache.remove(x);
        // 从 map 中删除
        this.map.delete(key);
    }
}

/**
 * 删除最久未使用的元素
 */
LRUCache.prototype.removeLeastRecently = function() {
    // 链表头部的第一个元素就是最久未使用的
    let deletedNode = this.cache.removeFirst();
    // 从 map 中删除它的 key
    let deletedKey = deletedNode.key;
    this.map.delete(deletedKey);
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

#### 复杂度
* 时间复杂度：get:O(1), put: O(1)
* 空间复杂度：get:O(n), put: O(n)， n为capacity容量
