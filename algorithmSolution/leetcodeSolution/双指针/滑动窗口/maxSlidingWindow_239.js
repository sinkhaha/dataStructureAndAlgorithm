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
    // 存放nums数组元素的下标，最左边下标对应的nums的值最大，stack对应的nums的元素是单调递减的
    let stack = []; 
 
    for (let i = 0; i < nums.length; i++) {
        // 如果窗口最左边的元素对应的nums的数已经不在窗口中，需要把stack最左边的元素删掉，
        // 因为当前窗口的最大值已经变了
        if (stack.length && stack[0] <= i - k) {
            stack.shift();
        }

        const num = nums[i];
        // 维持单调递减
        // 新加入的元素比stack(从右往左)元素的对应的nums值大，则删除stack的元素
        while(stack.length && nums[stack[stack.length - 1]] < num) {
            stack.pop();
        }

        // 加入新元素的下标
        stack.push(i);

        // 判断是否等于或超过第一个窗口，是的话加入最大元素nums[stack[0]]
        if (i >= k - 1) {
            res.push(nums[stack[0]]);
        }
    }

    return res;
};

const nums = [1,3,-1,-3,5,3,6,7];
const k = 3;
console.log(maxSlidingWindow(nums, k)); // [3,3,5,5,6,7] 

