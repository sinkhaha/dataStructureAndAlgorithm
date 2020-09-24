// leetcode 384
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    // 保存源数组
    this.originNums = nums;
    // 拷贝
    this.nums = nums.slice(0);
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.originNums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const nums = this.nums;
    let n = nums.length;
    for (let i = 0; i < nums.length; i++) {
        // 从i到尾部随机选一个
        const rand = randOne(i, n - 1); 
        swap(nums, i, rand);
    }
    return nums;
};

// 得到一个在闭区间 [n, m] 内的随机整数
function randOne(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
};

// 交换数组两个值
function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
};

const nums = ["Solution","shuffle","reset","shuffle"]
//[[[1,2,3]],[],[],[]];
 var obj = new Solution(nums);
 var param_1 = obj.reset();
 var param_2 = obj.shuffle();
 console.log(param_1);
 console.log(param_2);

 