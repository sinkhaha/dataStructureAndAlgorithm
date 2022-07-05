/**
 * 134. 加油站
 * 中等
 * https://leetcode.cn/problems/gas-station/
 * 
 * 解法：贪心 + 数组
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    // 思路：
    // 1、首先判断总油量是否小于总油耗，如果是则肯定不能走一圈。如果否，那肯定能跑一圈
    // 2、循环数组，从第一个站开始，计算到下一站剩余的油量，如果油量为负了，就以这个站为起点从新计算
    // （如果到达某一个点为负，说明起点到这个点中间的所有站点都不能到达该点）
    // 
    let n = gas.length;
    let gasSum = 0;
    let costSum = 0;

    for (let i = 0; i < n; i++) {
        gasSum += gas[i];
        costSum += cost[i];
    }

    if (gasSum < costSum) { // 总油量<总耗油量肯定不能达到
        return -1;
    }

    // 总油量大于等于总耗油量，一定可以达到

    let start = 0; // 从start索引的站点开始
    let curRemainGas = 0; // 当前剩余的油量

    for (let i = start; i < n; i++) {
        // 到达下一站剩余的油量，如果小于0，说明起点到下一站中间的所有站点都不能到达该点
        curRemainGas = curRemainGas - cost[i] + gas[i];
        if (curRemainGas < 0) {
            start = i + 1; // 说明此时从start开始，无法到达第i+1站，则重新以i+1站为新的起点
            curRemainGas = 0;
        }
    }

    return start;
};