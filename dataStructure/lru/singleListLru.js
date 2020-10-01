'use strict';

// 使用单链表实现lru
// 思路：
// 维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的。
// (1)当有一个新的数据被访问get时，我们从链表头开始顺序遍历链表
// 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
// 如果此数据没有在缓存链表中，返回-1
// 
// (2)当往缓存中放入一个数据时，从链表头开始顺序遍历链表，
// 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
// 如果不存在，又可以分为两种情况：
//   如果此时缓存未满，则将此结点直接插入到链表的头部
//   如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

// 链表节点类 
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 自己实现单链表类
class MyList {
    constructor(element) {
        this.size = 0; // 链表节点个数
        this.head = new Node(element);
    }

    // 在某个元素后插入某个值,时间复杂度O(n),主要在于查找，不考虑查找的话是O(1)
    insert(element, newElement) {
        const newNode = new Node(newElement);
        let current = this.find(element);
        if (!current)
            throw new Error('找不到原来的元素');
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        return newElement;
    }

    // 插入元素到链表头部
    insertToHead(element){
        return this.insert('head', element);
    }

    // 查找某个元素,时间复杂度O(n)
    find(element) {
        let current = this.head;
        while (current && current.element !== element) {
            current = current.next;
        }
        return current;
    }

    // 删除某个元素,时间复杂度O(n)，主要在于查找，不考虑查找的话是O(1)
    remove(element) {
        const currentNode = this.find(element);
        if (!currentNode) throw new Error('找不到删除的元素');

        const previousNode = this.findPrevious(element);
        if (!previousNode) throw new Error('找不到删除的元素');

        if (previousNode.next !== null) {
            previousNode.next = previousNode.next.next;
        }
        this.size--;
    }

    // 更新,时间复杂度O(n),主要在于查找
    update(element, newElement) {
        const node = this.find(element);
        if (!node)
            throw new Error('找不到原来的元素');
        node.element = newElement; 
    }

    // 找到某个元素的前一个元素
    findPrevious(element) {
        let current = this.head;
        while (current.next !== null && current.next.element !== element) {
            current = current.next;
        }
        return current;
    }

    // 获取链表的最后一个节点
    findLast() {
        let currNode = this.head;
        while (currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }

    // 显示链表全部
    display() {
        let str = this.head.element;
        let current = this.head;
        while (current.next !== null) {
            str += `  ${current.next.element}`;
            current = current.next;
        }
        console.log(str);
    }

    // 获取链表长度
    getLength() {
        console.log(`链表的长度是:${this.size}`);
        return this.size;
    }
}

// 实例化链表
const myList = new MyList('head');

// 实现lru缓存类，主要是put/get方法
class MyLRUCache {
    constructor(myList, capacity) {
        this.myList = myList;
        this.capacity = capacity; // 缓存的容量
    }

    /**
     * 从缓存中存放数据
     * 
     * 元素存在时：则删除原来的值，然后重新插入头部
     * 元素不存在：
     *   (1)如果容量不够，则删除链表最后一个元素，然后插入头部
     *   (2)如果容量够，则直接插入头部
     * @param {*} element 
     */
    put(element) {
        const curNode = this.myList.find(element);
        if (curNode) {
            this.myList.remove(curNode.element);
            this.myList.insertToHead(curNode.element);
        } else {
            if (this.myList.size < this.capacity) {
                this.myList.insertToHead(element);
            } else {
                const lastNode = this.myList.findLast();
                this.myList.remove(lastNode.element);
                this.myList.insertToHead(element);
            }
        }
    }

    /**
     * 从缓存中获取数据
     * 
     * 元素存在:则删除元素后重新插入链表头部
     * 元素不存在：则返回-1
     * @param {*} element 
     */
    get(element) {
        if (this.myList.find(element)) {
            this.myList.remove(element);
            const newNode = this.myList.insertToHead(element);
            return newNode;
        } 
        return -1;
    }

    /**
     * 查看缓存所有元素
     */
    display() {
        return this.myList.display();
    }

    /**
     * 获取缓存长度
     */
    getLength() {
        return this.myList.getLength();
    }
}

// 实例化容量为4的一个缓存
const myCache = new MyLRUCache(myList, 4);

myCache.put('a');
myCache.put('b');
myCache.put('c');
myCache.put('d');
myCache.display(); // head  d  c  b  a

myCache.get('c');
myCache.display(); // head  c  d  b  a

myCache.put('a'); 
myCache.display(); // head  a  c  d  b

myCache.getLength();

// 容量不够了，删除b后，把e放入最前面
myCache.put('e');
myCache.display(); // head  e  a  c  d

myCache.put('f'); // head  f  e  a  c
myCache.display();
