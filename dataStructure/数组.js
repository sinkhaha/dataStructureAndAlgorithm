// 数组的实现：读、更、删、插入
class MyArray {
    constructor() {
        this.array = new Array(); // 动态的
    }

    /**
     * 插入
     * 时间复杂度O(n)
     * @param {*} index 
     * @param {*} element 
     */
    insert(index, element) {
        if (index < 0) throw new Error('越界');
        // 注意：js数组是动态的，所以此处不需要判断超限，且不需要扩容
        let len = this.array.length;
        for (let i = len - 1; i >= index; i--) {
            this.array[i + 1] = this.array[i]; // 此处赋值即扩容
        }
        this.array[index] = element;
    }

    /**
     * 获取某个元素
     * 时间复杂度O(1)
     * @param {*} index 
     * @returns 
     */
    get(index) {
        if (index < 0 || index >= this.array.length)
            throw new Error('越界');
        return this.array[index];
    }

    /**
     * 删除某个元素
     * 时间复杂度O(n)
     * 如果删除的元素位于数组中间，其后的元素都需要向前挪动1位
     * @param {*} index 
     * @returns 
     */
    del(index) {
        if (index < 0 || index >= this.array.length)
            throw new Error('越界');
        let delElement = this.array[index];
        for (let i = index; i < this.array.length - 1; i++) {
            this.array[i] = this.array[i + 1]; // 注意：此处并没有删除最后一位的值
        }
        this.array.length--; // 长度减少即删除了最后一位元素
        return delElement;
    }

    /**
     * 更新某个元素
     * 时间复杂度O(1)
     * @param {*} index 
     * @param {*} element 
     */
    update(index, element) {
        if (index < 0 || index >= this.array.length);
        throw new Error('越界');
        this.array[index] = element;
    }

    /**
     * 
     */
    getAll() {
        console.log('===开始迭代全部元素===');
        this.array.forEach(element => {
            console.log(element);
        });
        console.log('===结束迭代全部元素===');
    }

    /**
     * 
     * @returns 
     */
    getSize() {
        return this.array.length;
    }
}

let array1 = new MyArray();
array1.insert(0, 1);
array1.insert(1, 2);
array1.insert(2, 3);

console.log(`长度是:${array1.getSize()}`);
console.log(`第一个元素是：${array1.get(0)}`);

array1.getAll();
array1.del(0);
array1.getAll();
array1.update(1, 4);
array1.getAll();

console.log(`长度是:${array1.getSize()}`);
