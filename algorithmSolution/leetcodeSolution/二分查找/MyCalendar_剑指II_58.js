/**
 * 剑指 Offer II 058. 日程表
 * 中等
 * https://leetcode.cn/problems/fi9suh/
 * 
 * 解法：二分查找
 * 参考 https://leetcode.cn/problems/fi9suh/solution/li-yong-er-fen-fa-lai-ji-lu-ri-cheng-bia-b9nm/

 */
var MyCalendar = function () {
    this.events = []; // 元素为每个区间[start,end]
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
    let index = this.findInsertIndex(start);

    if (
        // 当前要插入的区间的起始点小于要插入的区间前一个区间的结束点
        (this.events[index - 1] && start < this.events[index - 1][1]) ||
        // 当前要插入的区间的结束点大于要插入的区间的起始点
        (this.events[index] && end > this.events[index][0])
    ) {
        return false;
    }

    this.events.splice(index, 0, [start, end]); // 在index之后预约时间
    return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

// 找到数组中最近的已经预约的时间段
MyCalendar.prototype.findInsertIndex = function (start) {
    let left = 0;
    let right = this.events.length - 1;

    while (left <= right) {
        let mid = left + ((right - left) >> 1);

        // 如果要插入的区间的起点跟当前区间的起点相同，则找到了要插入的区间的位置
        if (this.events[mid][0] == start) {
            return mid;
        } else if (this.events[mid][0] < start) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}