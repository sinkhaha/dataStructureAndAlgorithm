/**
 * O(1)
 * put(key, value) 查找/删除 
 * get(key) 获取
 * 
 * 哈希表:查找快，但数据无顺序(不符合)
 * 链表:有顺序，插入删除快，但是查找慢(不符合)
 * 
 * 理想数据结构：
 * 哈希链表：双向链表和哈希表, 有序的存储key/value，如java的LinkedHashMap
 * 
 */

/**
 * 双向链表节点类
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
 * 双向链表类
 */ 
class MyDoubleList {
    constructor() {
        // 初始化双向链表的数据
        this.head = new Node(0, 0); // 头尾虚节点
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0; // 链表元素数
    }

    // 在链表尾部添加节点 x，时间 O(1)
    addLast(x) {
        x.prev = this.tail.prev;
        x.next = this.tail;
        this.tail.prev.next = x;
        this.tail.prev = x;
        this.size++;
    }

    // 删除链表中的 x 节点（x 一定存在）
    // 由于是双链表且给的是目标 Node 节点，时间 O(1)
    remove(x) {
        x.prev.next = x.next;
        x.next.prev = x.prev;
        this.size--;
    }

    // 删除链表中第一个节点，并返回该节点，时间 O(1)
    removeFirst() {
        if (this.head.next == this.tail)
            return null;
        let first = this.head.next;
        this.remove(first);
        return first;
    }

    // 返回链表长度，时间 O(1)
    size() {
        return this.size;
    }
}

/**
 * LRU类
 */
class LRUCache {
    constructor(capacity) {
        this.cap = capacity; // 最大容量
        this.map = new Map(); // key -> Node(key, val)
        this.cache = new MyDoubleList(); // Node(k1, v1) <-> Node(k2, v2)
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }
        // 将该数据提升为最近使用的
        this.makeRecently(key);
        return this.map.get(key).val;
    }

    put(key, val) {
        if (this.map.has(key)) {
            // 删除旧的数据
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
    }

    /**================================= */
    /* 将某个 key 提升为最近使用的 */
    makeRecently(key) {
        let x = this.map.get(key);
        if (x !== undefined) {
            // 先从链表中删除这个节点
            this.cache.remove(x);
            // 重新插到队尾
            this.cache.addLast(x);
        }
    }

    /* 添加最近使用的元素 */
    addRecently(key, val) {
        let x = new Node(key, val);
        // 链表尾部就是最近使用的元素
        this.cache.addLast(x);
        // 别忘了在 map 中添加 key 的映射
        this.map.set(key, x);
    }

    /* 删除某一个 key */
    deleteKey(key) {
        let x = this.map.get(key);
        if (x !== undefined) {
            // 从链表中删除
            this.cache.remove(x);
            // 从 map 中删除
            this.map.delete(key);
        }  
    }

    /* 删除最久未使用的元素 */
    removeLeastRecently() {
        // 链表头部的第一个元素就是最久未使用的
        let deletedNode = this.cache.removeFirst();
        // 同时别忘了从 map 中删除它的 key
        let deletedKey = deletedNode.key;
        this.map.delete(deletedKey);
    }
}

const lruCache = new LRUCache(3);
lruCache.put(1, 1);
lruCache.put(2, 2);
lruCache.put(3, 3);
console.log('====lruCache====', lruCache);
console.log('====lruCache.doubleList====', lruCache.cache);
console.log(lruCache.get(2));
console.log('====lruCache====', lruCache);
console.log('====lruCache.doubleList====', lruCache.cache);
