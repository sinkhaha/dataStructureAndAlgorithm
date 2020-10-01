'use strict';

// LRU 算法实际上是设计数据结构：首先要接收一个 capacity 参数作为缓存的最大容量
// 然后实现两个 API，一个是 put(key, val) 方法存入键值对，
// 另一个是 get(key) 方法获取 key 对应的 val，如果 key 不存在则返回 -1。

// map越先set的元素为最近最少使用的元素
class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity; 
    }

    /**
     * 时间复杂度为 O(1)
     * 存在时删除后重新设置
     * 不存在时，容量够，则直接设置，容量不够则删除第一个元素后，再设置
     * @param {*} key 
     * @param {*} value 
     */
    put(key, value) {
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
    }

    /**
     * 时间复杂度为 O(1)
     * 存在时删除该值后重新设置，表示最新访问（map最后的元素为最新访问的元素）
     * @param {*} key 
     */
    get(key) {
        if (this.cache.has(key)) {
           const value = this.cache.get(key);
           this.cache.delete(key);
           this.cache.set(key, value);
           return value;
        }
        return -1;
    }
}

// 容量为2
const lruCache = new LRUCache(2);
lruCache.put(1, 1); 
// cache = [(1, 1)]
// 遍历
for (let [key, value] of lruCache.cache.entries()) {
    console.log(`${key}==${value}`);
}

console.log('-------------');

lruCache.put(2, 2);
// cache = [(1, 1), (2, 2)]
for (let [key, value] of lruCache.cache.entries()) {
    console.log(`${key}==${value}`);
}

console.log('-------------');

console.log(lruCache.get(1)); // 返回 1

// cache = [(2, 2), (1, 1)]
// 解释：因为最近访问了键 1，所以提前至队头
// 返回键 1 对应的值 1
lruCache.put(3, 3);
// cache = [(1, 1),(3, 3)]
for (let [key, value] of lruCache.cache.entries()) {
    console.log(`${key}==${value}`);
}

console.log('-------------');

// 解释：缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入队头
console.log(lruCache.get(2));     // 返回 -1 (未找到)
// cache = [(3, 3), (1, 1)]
// 解释：cache 中不存在键为 2 的数据

console.log('-------------');

lruCache.put(1, 4);
// cache = [(3, 3), (1, 4)]
// 解释：键 1 已存在，把原始值 1 覆盖为 4

for (let [key, value] of lruCache.cache.entries()) {
    console.log(`${key}==${value}`);
}
