/**
 * 优点：
 * 1.可以设置自定义key 
 * 2.开放地址寻址解决冲突
 * 缺点：：同个key不会存储
 */
class MyHashMap {
    // [[key, value],[key, value]]结构;
    constructor(size) {
        this.table = [];
        // 先初始化
        for (let i = 0; i < size; i++) {
            this.table.push([undefined, 0]);
        }
        this.size = 0;
    }
    hashConversion(key) {
        let keyCode = 0;
        for (let char of key) {
            keyCode += char.charCodeAt(0);
        }
        const hash = keyCode % this.table.length;
        return hash;
    }
    set(index, value) {
        let hash = this.hashConversion(index);
        while ((this.table[hash])[0] !== undefined && (this.table[hash])[0] !== index) {
            hash++;
            if (hash > this.table.length)
                throw new Error('空间不够');
        }
        if ((this.table[hash])[0] !== index) {
            this.size++;
            (this.table[hash])[0] = index;
            (this.table[hash])[1] = value;
        }
    }
    get(index) {
        let hash = this.hashConversion(index);
        while ((this.table[hash])[0] !== undefined && (this.table[hash])[0] !== index) {
            hash++;
            if (hash > this.table.length)
                throw new Error('空间不够');
        }
        return (this.table[hash])[1];
    }
    delete(index) {
        let hash = this.hashConversion(index);
        while ((this.table[hash])[0] !== undefined && (this.table[hash])[0] !== index) {
            hash++
            if (hash >= this.table.length) {
                return false;
            }
        }
        this.table[hash] = new Array(2);
        this.size--;
        return true;
    }
    has(index) {
        let hash = this.hashConversion(index)
        while ((this.table[hash])[0] !== undefined && (this.table[hash])[0] !== index) {
            hash++;
            if (hash >= this.table.length) {
                return false;
            }
        }
        return (this.table[hash])[0] !== undefined ? true : false;
    }
    getAllData() {
        let result = [];
        for (let item of this.table) {
            if (item[0] !== undefined) {
                result.push(item);
            }
        }
        return result;
    }
    getSize() {
        return this.size;
    }
}

let hashMap = new MyHashMap(3);
hashMap.set('name', 'aa');
hashMap.set('age', 33);
hashMap.set('tail', 180);
hashMap.set('tail', 190); // 缺点：同个key不会存储
console.log('取得：' + hashMap.get('tail'));
console.log(hashMap.getSize());
console.log(hashMap.getAllData());
