
/**
 * 剑指 Offer 49. 丑数
 * 中等
 * https://leetcode.cn/problems/chou-shu-lcof/
 * 
 * 解法：最小堆
 * 每次取出堆顶元素 x，则 x 是堆中最小的丑数，由于 2x, 3x, 5x也是丑数，因此将 2x, 3x, 5x加入堆
 * 
 */

var nthUglyNumber = function (n) {
    const factors = [2, 3, 5];

    // 用于排除重复元素
    const seen = new Set();
    const heap = new MinHeap();
    seen.add(1);
    heap.insert(1);

    let ugly = 0;
    for (let i = 0; i < n; i++) {
        ugly = heap.pop();
        for (const factor of factors) {
            const next = ugly * factor;
            if (!seen.has(next)) {
                seen.add(next);
                heap.insert(next);
            }
        }

    }
    return ugly;
};

// 最小堆
class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return (i - 1) >> 1;
    }

    getLeftIndex(i) {
        return i * 2 + 1;
    }

    getRightIndex(i) {
        return i * 2 + 2;
    }

    shiftUp(index) {
        if (index === 0) { return; }
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }

    swap(i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }

    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }

    pop() {
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
        return this.heap[0];
    }

    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex);
        }
        if (this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex);
        }
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}