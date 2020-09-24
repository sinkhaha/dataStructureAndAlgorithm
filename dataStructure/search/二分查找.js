// 前提：数组必须有序 不存在重复
const arr = [1, 2, 4, 5, 7, 10, 11, 23, 44]

/**
 * 二分查找实现方式一：循环
 * @param {*} arr 
 * @param {*} target 
 */
const binarySearch1 = (arr, target) => {
    if (arr.length === 0) {
        return -1;
    }

    let low = 0;
    let high = arr.length - 1; // 注意:这里是最后一个元素的索引，所以下面是用<=
    // 循环退出条件,注意是low<=high，而不是low<high
    while (low <= high) {
        // mid=(low+high)/2 这种写法取两数的平均值是有问题的
        // 因为如果 low 和 high 比较大的话，两者之和就有可能会溢出
        // 改进方式mid = low+(high-low)/2
        // 也可以将这里的除以 2 操作转化成位运算 mid = low+((high-low)>>1)        
        const mid = Math.floor(low+(high-low)/2);
        if (target === arr[mid]) {
            return mid;
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

console.log(binarySearch1(arr, 5));
console.log(binarySearch1(arr, 44));
console.log(binarySearch1(arr, 1));
console.log(binarySearch1(arr, 102));
console.log('========================');


/**
 * 二分查找实现方式二：递归
 * @param {*} sortedArr 
 * @param {*} target 
 */
const binarySearch2 = (sortedArr, target) => {
    let length = sortedArr.length;
    return bsearchInternally(sortedArr, 0, length - 1, target);
}

function bsearchInternally(arr, low, high, value) {
    if (low > high) { 
        return -1;
    }

    const mid = low+((high-low)>>1);
    if (arr[mid] === value) {
        return mid;
    } else if (arr[mid] < value) {
        return bsearchInternally(arr, mid + 1, high, value);
    } else {
        return bsearchInternally(arr, low, mid - 1, value);
    }
}

console.log(binarySearch2(arr, 5));
console.log(binarySearch2(arr, 44));
console.log(binarySearch2(arr, 1));
console.log(binarySearch2(arr, 102));
