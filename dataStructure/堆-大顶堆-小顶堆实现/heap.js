/**
 * 堆实现
 */
class Heap {
    /**
     * 
     * @param {*} list 数组模拟堆
     * @param {*} comparator 比较器，默认升序
     */
    constructor(list = [], comparator) {
        this.list = list;

        if (typeof comparator != 'function') {
            this.comparator = function comparator(target, compared) {
                return target < compared; // 大顶堆
            };
        } else {
            this.comparator = comparator;
        }

        this.init();
    }

    init() {
        const size = this.size();
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            this.heapify(this.list, i);
        }
    }

    /**
     * 插入元素
     * @param {*} n 
     */
    insert(n) {
        this.list.push(n);
        const size = this.size();
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            this.heapify(this.list, i);
        }
    }

    /**
     * 获取堆顶元素
     * @returns 
     */
    peek() {
        return this.list[0];
    }

    /**
     * 弹出堆顶元素
     * @returns 
     */
    pop() {
        const last = this.list.pop();
        if (this.size() === 0) {
            return last;
        }
        const returnItem = this.list[0];
        this.list[0] = last;
        this.heapify(this.list, 0);
        return returnItem;
    }

    /**
     * 堆的大小
     * @returns 
     */
    size() {
        return this.list.length;
    }

    getHeap() {
        return this.list;
    }

    /**
     * 堆化
     * @param {*}} arr 
     * @param {*} i 
     */
    heapify(arr, i) {
        // 当前要堆化的根节点
        let largest = i;
        // 左子节点
        const left = Math.floor(i * 2 + 1);
        // 右子节点
        const right = Math.floor(i * 2 + 2);

        // 左子节点跟根节点比较；如果是大顶堆，arr[largest]>arr[left]；如果是小顶堆，arr[largest]<arr[left]
        if (left < this.size() && this.comparator(arr[largest], arr[left])) {
            largest = left;
        }

        // 右子节点跟根节点比较；如果是大顶堆，arr[largest]>arr[left]；如果是小顶堆，arr[largest]<arr[left]
        if (right < this.size() && this.comparator(arr[largest], arr[right])) {
            largest = right;
        }

        // 交换位置
        if (largest !== i) {
            [arr[largest], arr[i]] = [arr[i], arr[largest]];
            // 交换后继续从后往前堆化
            this.heapify(arr, largest);
        }
    }
}

/**
 * 大顶堆
 */
class MaxHeap extends Heap {
    /**
     * 
     * @param {*} list 把list初始化成一个小顶堆
     */
    constructor(list) {
        super(list, function comparator(a, b) {
            return a < b;
        });
    }
}

/**
 * 小顶堆
 */
class MinHeap extends Heap {
    /**
     * 
     * @param {*} list 把list初始化成一个小顶堆
     */
    constructor(list) {
        super(list, function comparator(a, b) {
            return a > b;
        });
    }
}

const list = [2, 5, 10, 4, 1, 9, 31, 17];
const maxHeap = new MaxHeap([...list]);
const minHeap = new MinHeap([...list]);

console.log(maxHeap.getHeap()); // [ 31, 17, 10, 5, 1, 9, 2, 4 ]
console.log(minHeap.getHeap()); // [ 1, 2, 9, 4, 5, 10, 31, 17 ]
