// 哈希表实现
// 缺点：1、未解决冲突 2、不能自定义key的值，key是value计算出来的
class MyHashMap {
    constructor(size) {
        this.size = 0;
        this.table = new Array(size);
    }

    /**
     * 哈希函数，将value转化，计算出存储的key
     * @param {*} value 
     * @returns 
     */
    hashConversion(value) {
        let keyCode = 0;
        for (let item of value) {
            keyCode += item.charCodeAt(0); // 返回字符串第一个字符的 Unicode 编码
        }
        // 哈希函数,除模取余法
        let key = keyCode % this.table.length;
        return key;
    }

    /**
     * 
     * @param {*} value 
     */
    set(value) {
        let key = this.hashConversion(value);
        this.size++;
        this.table[key] = value;
    }

    /**
     * 
     * @param {*} value 
     * @returns 
     */
    get(value) {
        let key = this.hashConversion(value);
        return this.table[key];
    }

    /**
     * 
     * @param {*} value 
     * @returns 
     */
    delete(value) {
        let key = this.hashConversion(value);
        const val = this.table[key];

        if (!val) 
            return false;
        if (val !== value) 
            return false;

        this.size--;
        this.table[key] = undefined; // 直接设置为undefined
        return true;
    }

    /**
     * 
     * @param {*} value 
     * @returns 
     */
    has(value) {
        let key = this.hashConversion(value);
        return this.table[key] ? true : false;
    }

    /**
     * 
     * @returns 
     */
    getAllData() {
        let result = [];
        for (let item of this.table) {
            if (item !== undefined) result.push(item);
        }
        return result;
    }

    /**
     * 
     * @returns 
     */
    getSize() {
        return this.size;
    }
}

let hashMap = new MyHashMap(10);
hashMap.set('aa');
hashMap.set('bb');
console.log(hashMap.getSize());
console.log(hashMap.getAllData());
