/**
 * 239 滑动窗口最大值
 * 困难
 * https://leetcode-cn.com/problems/sliding-window-maximum/
 * 
 * 解法1:
 * 可以用一个队列维护窗口，里面存数组的下标，队列第一个值是最大元素的下标
 * (1)如果第1个下标超过窗口的范围则删除该下标
 * (2)每进入一个值num，从队列右边开始比较，num大于等于队列最后一个值，就把该值删掉
 * (3)num的下标入队，最后如果下标大于等于窗口大小，则取队列第一个值对应的元素存入结果
 *
 * 时间复杂度O(n) n为nums的长度
 * 空间复杂度O(n)
 * 
 * 解法2:
 * 用优先队列，维护一个k个元素的大顶堆，滑动窗口，删除堆中刚从窗口移除的元素，然后再把新加入窗口的元素加入堆中，
 * 调整堆，然后结果为堆顶元素，时间复杂度N*log(k), 时间复杂度不如解法1
 * /

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let res = [];
    // 窗口存放nums的下标，最左边下标对应的nums的值最大，window的元素对应的nums的元素是单调递减的
    let window = [];
 
    for (let i = 0; i < nums.length; i++) {

        // 窗口扩大后，原先窗口不包含原先最大的那个数，需要把window最左边的元素去掉，即缩小窗口
        if (i - k >= window[0]) {
            window.shift();
        }

        const num = nums[i];
        // 新加入的元素的值比窗口(从右往左)的元素的值大,则删除窗口的元素(下标)
        while(nums[window[window.length - 1]] < num) {
            window.pop();
        }

        // 新元素的下标加入窗口
        window.push(i);

        // 是否超过窗口的大小，是的话加入最大元素nums[window[0]]
        if (i >= k - 1) {
            res.push(nums[window[0]]);
        }
    }

    return res;
};

const nums = [1,3,-1,-3,5,3,6,7];
const k = 3;
console.log(maxSlidingWindow(nums, k)); // [3,3,5,5,6,7] 

