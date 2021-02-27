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
 * 单向列表
 */
class MyList {
    constructor(element) {
        this.size = 0;
        this.head = new Node(element);
    }
    // 在某个元素后插入某个值,时间复杂度O(n),主要在于查找，不考虑查找的话是O(1)
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
    // 查找某个元素,时间复杂度O(n)
    find(element) {
        let current = this.head; // 从头开始找
        while (current && current.element !== element) {
            current = current.next;
        }
        return current;
    }
    // 删除某个元素,时间复杂度O(n)，主要在于查找，不考虑查找的话是O(1)
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
    // 显示全部
    display() {
        let str = this.head.element;
        let current = this.head;
        while (current.next !== null) {
            str += `  ${current.next.element}`;
            current = current.next;
        }
        console.log(str);
    }
    getLength() {
        console.log(`长度是:${this.size}`);
        return this.size;
    }
}

// 实例化头节点时，是head节点，不是null，相当于一个哨兵机制，使得可以忽略一些边界问题
const myList = new MyList('head'); 
console.log(myList);
myList.insert('head', 'a');
myList.display();

myList.insert('a', 'b');
myList.insert('b', 'c');
myList.insert('c', 'd');
myList.insert('d', 'e');
myList.display();

const findNode = myList.find('g');
console.log(`查找g元素节点：${findNode ? findNode.element : findNode}`);
myList.display();

const findNode2 = myList.find('e');
console.log(`查找e元素节点：${findNode2 ? findNode2.element : findNode2}`);
myList.display();

myList.remove('e');
console.log('删除e');
myList.display();

myList.remove('a');
console.log('删除a');
myList.display();
myList.getLength();

myList.update('d', 'f');
myList.display();
myList.getLength();

myList.remove('c');
console.log('删除c');
myList.display();
myList.getLength();