/**
 * 875. 爱吃香蕉的珂珂
 * 中等
 * https://leetcode-cn.com/problems/koko-eating-bananas/
 */
/**
 * 解法一：暴力解法
 * @param {*} piles 
 * @param {*} H 
 */
function minEatingSpeed1(piles, H) {
    let max = getMax(piles);

    // 暴力解法，最大速度为max，从1到max遍历
    for (let speed = 1; speed < max; speed++) {
        if (canFinish(piles, speed, H)) {
            return speed;
        }
    }
    return max;
}

/**
 * 解法二：二分查找
 * @param {*} piles 
 * @param {*} H 
 */
function minEatingSpeed2(piles, H) {
    // 获取数组的最大值
    let max = getMax(piles);

    let left = 1;
    let right = max;
  
    // 注意是小于号
    while (left < right) {
        // 吃香蕉的速度
        let mid = left + Math.floor((right - left) / 2);

        if (canFinish(piles, mid, H)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

/**==========================一些辅助函数====================================== */
/**
 * 获取数组的最大值
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
 * 判断H是否能吃完香蕉(以speed的速度吃)
 * @param {*} piles 
 * @param {*} speed 吃香蕉的速度
 * @param {*} H 
 */
function canFinish(piles, speed, H) {
    let time = 0;
    for (let p of piles) {
        time += getWasteTime(p, speed)
    }
    return time <= H;
}

/**
 * 以speed的速度吃掉一堆香蕉p花的时间
 * @param {*} p 
 * @param {*} speed 
 */
function getWasteTime(p, speed) {
    // 不足要算1个小时
    return Math.floor(p / speed) + (p % speed === 0 ? 0 : 1);
}


function test() {
    const piles = [3, 6, 7, 11];
    const H = 8;
    console.log(minEatingSpeed1(piles, H)); // 4
    console.log(minEatingSpeed2(piles, H)); // 4
}
test();
