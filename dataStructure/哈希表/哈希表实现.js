// 缺点：1、未解决冲突 2、不能自定义key的值，key是value计算出来的
class MyHashMap {
    constructor(size) {
        this.size = 0;
        this.table = new Array(size);
    }
    // 哈希函数，将value转化，计算出存储的key
    hashConversion(value) {
        let keyCode = 0;
        for (let item of value) {
            keyCode += item.charCodeAt(0);
        }
        // 哈希函数,除模取余法
        let key = keyCode % this.table.length;
        return key;
    }
    set(value) {
        let key = this.hashConversion(value);
        this.size++;
        this.table[key] = value;
    }
    get(value) {
        let key = this.hashConversion(value);
        return this.table[key];
    }
    delete(value) {
        let key = this.hashConversion(value);
        const val = this.table[key];
        if (!val) return false;
        if (val !== value) return false;
        this.size--;
        this.table[key] = undefined; // 直接设置为undefined
        return true;
    }
    has(value) {
        let key = this.hashConversion(value);
        return this.table[key] ? true : false;
    }
    getAllData() {
        let result = [];
        for (let item of this.table) {
            if (item !== undefined) result.push(item);
        }
        return result;
    }
    getSize() {
        return this.size;
    }
}

let hashMap = new MyHashMap(10);
hashMap.set('aa');
hashMap.set('bb');
console.log(hashMap.getSize());
console.log(hashMap.getAllData());
