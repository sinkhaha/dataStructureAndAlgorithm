/**
 * 380. O(1) 时间插入、删除和获取随机元素
 * 中等
 * https://leetcode.cn/problems/insert-delete-getrandom-o1/
 * 
 * 解法：哈希表 + 数组
 */
/**
 * 
 */
var RandomizedSet = function () {
    // 特性：
    // 变长数组可以在O(1)时间内完成随机元素的获取
    // 哈希表可以在O(1)时间内完成插入和删除操作

    // 变长数组存元素，哈希表存每个元素在变长数组的下标
    this.arr = [];
    this.map = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.map.has(val)) {
        return false;
    }

    this.arr.push(val);
    this.map.set(val, this.arr.length - 1);

    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    if (!this.map.has(val)) {
        return false;
    }

    // 把数组最后一位跟要删除的值替换
    let index = this.map.get(val);
    this.arr[index] = this.arr[this.arr.length - 1];
    this.map.set(this.arr[index], index); // 重新维护map中对应值的索引
    this.arr.pop();

    this.map.delete(val);

    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    const randomIndex = Math.floor(Math.random() * this.arr.length);
    return this.arr[randomIndex];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */