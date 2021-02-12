/**
 * 1011 在 D 天内送达包裹的能力
 * 中等
 * 
 * 类似875. 爱吃香蕉的珂珂
 * 
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function (weights, D) {
    // 重点
    // 最小值 max(weights)
    // 最大值 sum(weights)
    let left = getMax(weights);
    let right = getSum(weights) + 1;

    // 二分查找
    // 注意是小于号
    while (left < right) {
        // 防溢出
        let mid = left + Math.floor((right - left) / 2);
        if (canFinish(weights, mid, D)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

/**
 * 当前载重cap，在D天内是否能运完weights
 * @param {*} weights 
 * @param {*} cap 
 * @param {*} D 
 */
function canFinish(weights, cap, D) {
    // 货物索引
    let i = 0;
    // 求在第day天能否将货物运完
    for (let day = 0; day < D; day++) {
        let maxCap = cap;
        while((maxCap -= weights[i]) >= 0) {
            i++;
            if (i == weights.length) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 求数组最大元素
 * @param {*} arr 
 */
function getMax(arr) {
    let max = arr[0];
    for (let a of arr) {
        max = Math.max(max, a);
    }
    return max;
}

/**
 * 求数组和
 * @param {*} arr 
 */
function getSum(arr) {
    let sum = 0;
    for (let a of arr) {
        sum += a;
    }
    return sum;
}

function test() {
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const D = 5;
    console.log(shipWithinDays(weights, D)); // 15
}

test();
