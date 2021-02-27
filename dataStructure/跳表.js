/**
 * 跳表实现
 * 
 * 参考
 * https://github.com/dreamapplehappy/blog/tree/master/2018/12/02
 */

// 定义了跳表索引的最大级数
const MAX_LEVEL = 16;

/**
 * 定义Node类，用来辅助实现跳表功能
 */
class Node {
    constructor({
        data = -1, // data属性存放了每个节点的数据
        maxLevel = 0, // maxLevel属性表明了当前节点处于整个跳表索引的级数
        // refer是一个有着MAX_LEVEL大小的数组，refer属性存放着很多个索引
        // 如果用p表示当前节点，用level表示这个节点处于整个跳表索引的级数；那么p[level]表示在level这一层级p节点的下一个节点
        // p[level-n]表示level级下面n级的节点
        refer = new Array(MAX_LEVEL)
    } = {}) {
        this.data = data;
        this.maxLevel = maxLevel;
        this.refer = refer
    }
}

/**
 * 定义SkipList类
 */
class SkipList{
    constructor() {
        this.head = new Node(); // head属性是一个Node类的实例，指向整个链表的开始
        this.levelCount = 1; // levelCount属性表示了当前跳表索引的总共级数
    }

    // 在跳里面插入数据的时候，随机生成索引的级数
    randomLevel() {
        let level = 1;
        for (let i = 1; i < MAX_LEVEL; i++) {
            if (Math.random() < 0.5) {
                level++;
            }
        }
        return level;
    }

    /**
     * 向跳表里面插入数据
     * @param value
     */
    insert(value) {
        const level = this.randomLevel();
        const newNode = new Node();
        newNode.data = value;
        newNode.maxLevel = level;
        const update = new Array(level).fill(new Node());
        let p = this.head;
        for(let i = level - 1; i >= 0; i--) {
            while(p.refer[i] !== undefined && p.refer[i].data < value) {
                p = p.refer[i];
            }
            update[i] = p;
        }
        for(let i = 0; i < level; i++) {
            newNode.refer[i] = update[i].refer[i];
            update[i].refer[i] = newNode;
        }
        if(this.levelCount < level) {
            this.levelCount = level;
        }
    }

    // 查找跳表里面的某个数据节点，并返回
    find(value) {
        if(!value){return null}
        let p = this.head;
        for(let i = this.levelCount - 1; i >= 0; i--) {
            while(p.refer[i] !== undefined && p.refer[i].data < value) {
                p = p.refer[i];
            }
        }

        if(p.refer[0] !== undefined && p.refer[0].data === value) {
            return p.refer[0];
        }
        return null;
    }

    //  移除跳表里面的某个数据节点
    remove(value) {
        let _node;
        let p = this.head;
        const update = new Array(new Node());
        for(let i = this.levelCount - 1; i >= 0; i--) {
            while(p.refer[i] !== undefined && p.refer[i].data < value){
                p = p.refer[i];
            }
            update[i] = p;
        }

        if(p.refer[0] !== undefined && p.refer[0].data === value) {
            _node = p.refer[0];
            for(let i = 0; i <= this.levelCount - 1; i++) {
                if(update[i].refer[i] !== undefined && update[i].refer[i].data === value) {
                    update[i].refer[i] = update[i].refer[i].refer[i];
                }
            }
            return _node;
        }
        return null;
    }

    // 打印跳表里面的所有数据
    printAll() {
        let p = this.head;
        while(p.refer[0] !== undefined) {
            console.log(p.refer[0].data)
            p = p.refer[0];
        }
    }
}

test();
function test() {
    let list = new SkipList();
    let length = 20000;
    //顺序插入
    for (let i = 1; i <= 10; i++) {
        list.insert(i);
    }
    //输出一次
    list.printAll();
    console.time('create length-10')
    //插入剩下的
    for (let i = 11; i <= length - 10; i++) {
        list.insert(i);
    }
    console.timeEnd('create length-10')
    //搜索 10次
    for (let j = 0; j < 10; j++) {
        let key = Math.floor(Math.random() * length + 1);
        console.log(key, list.find(key))
    }
    //搜索不存在的值
    console.log('null:', list.find(length + 1));
    //搜索5000次统计时间
    console.time('search 5000');
    for (let j = 0; j < 5000; j++) {
        let key = Math.floor(Math.random() * length + 1);
    }
    console.timeEnd('search 5000');
}
