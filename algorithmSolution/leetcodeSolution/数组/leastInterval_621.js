/**
 * 621. 任务调度器
 * 中等
 * https://leetcode.cn/problems/task-scheduler/
 * 
 * 解法：数组
 * 参考 https://leetcode.cn/problems/task-scheduler/solution/python-xiang-jie-by-jalan/
 * 
 * 时间O(n)
 * 空间O(1)
 */
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    let len = tasks.length;

    if (len <= 1) {
        return len;
    }

    // 记录每个任务出现的次数
    let letterNum = {};
    for (let item of tasks) {
        if (letterNum[item]) {
            letterNum[item] += 1;
        } else {
            letterNum[item] = 1;
        }
    }

    // 找出任务次数最多的任务次数maxCount
    const countSort = Object.values(letterNum).sort((a, b) => parseInt(b) - parseInt(a));
    let maxCount = countSort[0];

    // 至少需要的最短时间
    let ret = (maxCount - 1) * (n + 1);

    for (let letter in letterNum) {
        // 加上出现次数和“最大任务次数相同”的任务个数
        if (letterNum[letter] == maxCount) {
            ret++;
        }
    }

    return Math.max(ret, tasks.length); // 在tasks的长度和ret中取较大的一个
};