/**
 * 开放寻址发解决冲突
 * 缺点：
 * 1.不可以set设置相同的元素，因为在set中没做处理
 * 2.不可以自定义key
 */
class MyHashMap {
    constructor(size) {
        this.size = 0;
        this.table = new Array(size);
    }

    hashConversion(value) {
        let keyCode = 0;
        for (let item of value) {
            keyCode += item.charCodeAt(0);
        }
        let key = keyCode % this.table.length;
        return key;
    }

    set(value) {
        let key = this.hashConversion(value);
        // 该位置已经有其他值了，一直往数组后面找
        // 这里当插入值已经在数组中存在，此时没做处理
        // 注意：如果该位置已经存有相同的值了，此set是不处理的，即此set不会做任何操作
        while (this.table[key] && this.table[key] !== value) {
            key++;
            // 数组位数不够，按理应该扩容，此处不处理
            if (key >= this.table.length) {
                throw new Error('空间不够');
            }
        }
        if (this.table[key] !== value) {
            this.size++;
            this.table[key] = value;
        }
    }

    get(value) {
        let key = this.hashConversion(value);
        while (this.table[key] && value !== this.table[key]) {
            key++;
            if (key >= this.table.length) {
                throw new Error('空间不够');
            }
        }
        return this.table[key];
    }

    delete(value) {
        let key = this.hashConversion(value);
        while (this.table[key] && this.table[key] !== value) {
            key++;
            if (key >= this.table.length) {
                throw new Error('没有该值');
            }
        }
        this.size--;
        this.table[key] = undefined;
        return true;
    }

    has(value) {
        let key = this.hashConversion(value);
        while (this.table[key] && this.table[key] !== value) {
            key++;
            if (key >= this.table.length) return false;
        }
        return this.table[key] !== undefined ? true : false;
    }

    getAllData() {
        let result = []
        for (let item of this.table) {
            if (item !== undefined) {
                result.push(item)
            }
        }
        return result
    }

    getSize() {
        return this.size;
    }
}

let hashMap = new MyHashMap(2);
hashMap.set('aa');
hashMap.set('bb');
hashMap.set('bb'); // 此处不会设置
console.log(hashMap.getSize()); // 2
console.log(hashMap.getAllData()); // aa, bb