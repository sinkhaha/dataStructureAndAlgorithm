/**
 * 链表实现
 */
// 节点类  
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

/**
 * 单链表
 */
class MyLink {
    constructor(element) {
        this.size = 0; // 链表个数
        this.head = new Node(element);
    }

    /**
     * 在某个元素后插入某个值，时间复杂度O(n)
     * 主要在于查找，不考虑查找的话是O(1)
     * 
     * @param {*} element 
     * @param {*} newElement 
     * @returns 
     */
    insert(element, newElement) {
        let current = this.find(element);
        if (!current) {
            throw new Error('找不到原来的元素');
        }
        const newNode = new Node(newElement);
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        return newElement;
    }

    /**
     * 查找某个元素,时间复杂度O(n)
     * @param {*} element 
     * @returns 
     */
    find(element) {
        let current = this.head; // 从头开始找
        while (current && current.element !== element) {
            current = current.next;
        }
        return current;
    }

    /**
     * 删除某个元素，时间复杂度O(n)
     * 主要在于查找，不考虑查找的话是O(1)
     * @param {*} element 
     */
    remove(element) {
        let currentNode = this.find(element);
        if (!currentNode) {
            throw new Error('找不到删除的元素');
        }
        if (currentNode.element === 'head') {
            throw new Error('head节点不可删除');
        }

        const previousNode = this.findPrevious(element);

        // 删除的是头节点head,按理不会删除头节点head
        if (previousNode !== null) {
            previousNode.next = previousNode.next.next;
            currentNode.next = null; // 把当前节点指向空，防止删除节点时出现内存泄漏
        }

        this.size--;
    }

    /**
     * 更新,时间复杂度O(n),主要在于查找
     * @param {*} element 
     * @param {*} newElement 
     */
    update(element, newElement) {
        const node = this.find(element);
        if (!node)
            throw new Error('找不到原来的元素');
        node.element = newElement;
    }

    /**
     * 找到某个元素的前一个元素
     * @param {*} element 
     * @returns 
     */
    findPrevious(element) {
        let current = this.head;
        while (current.next !== null && current.next.element !== element) {
            current = current.next;
        }
        return current;
    }

    /**
     * 打印链表
     */
    display() {
        let str = this.head.element;
        let current = this.head;
        while (current.next !== null) {
            str += `  ${current.next.element}`;
            current = current.next;
        }
        console.log(str);
    }
    
    /**
     * 获取链表长度
     * @returns 
     */
    getLength() {
        console.log(`长度是:${this.size}`);
        return this.size;
    }
}

// 实例化头节点时，是head节点，不是null，相当于一个哨兵机制，使得可以忽略一些边界问题
const myLink = new MyLink('head');
console.log(myLink);
myLink.insert('head', 'a');
myLink.display();

myLink.insert('a', 'b');
myLink.insert('b', 'c');
myLink.insert('c', 'd');
myLink.insert('d', 'e');
myLink.display();

const findNode = myLink.find('g');
console.log(`查找g元素节点：${findNode ? findNode.element : findNode}`);
myLink.display();

const findNode2 = myLink.find('e');
console.log(`查找e元素节点：${findNode2 ? findNode2.element : findNode2}`);
myLink.display();

myLink.remove('e');
console.log('删除e');
myLink.display();

myLink.remove('a');
console.log('删除a');
myLink.display();
myLink.getLength();

myLink.update('d', 'f');
myLink.display();
myLink.getLength();

myLink.remove('c');
console.log('删除c');
myLink.display();
myLink.getLength();