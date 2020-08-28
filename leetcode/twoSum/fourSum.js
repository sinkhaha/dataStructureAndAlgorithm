// leetcode 18 四数之和

/**
 * 可以在“3数之和”的解法再加一层循环，不过时间复杂度是O(n^3)
 * 
 * 解法一：
 * 
 * 这4个数可以想成两两的 2 sum, 先把第一个 2 sum 的结果保存下来， 
 * 然后在后续的数组中做第二个2 sum,这样就可以把时间复杂度降低到O(n^2)了
 * 
 * 为了避免重复，
 * 也就是
 * (nums[x] + nums[y]) + (nums[z] + nums[k])
 * 和
 * (nums[z] + nums[k]) + (nums[x] + nums[y])
 * 并没有区别，所以要限制第二组的两个数要在第一组的两个数之后
 * 
 * 时间复杂度O(n^2)
 * 空间复杂度O(n)
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum1 = function(nums, target) {
    let n = nums.length;
    if (n < 4) {
        return [];
    }

    // 从小到大排序，不能用默认sort(), 需要先parsetInt转换
    nums = nums.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    console.log(`排序后 ${nums}`);
    
    // { 和: [[i, j]] } 
    // key是和，值是等于该和的两个数的下标
    let map = new Map(); 
    let results = [];

    // 先处理第一对，把它们的sum存下来
    for (let i = 0; i < nums.length - 3; i++) {
        for (let j = i + 1; j < nums.length - 2; j++) {
            let currSum = nums[i] + nums[j];

            const rst = map.get(currSum) || [];
            rst.push([i, j]);

            console.log(`rst是 ${rst}`);
            map.set(currSum, rst);
        }
    }
    console.log(map);

    // 在其后做two sum
    for (let i = 2; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let currSum = nums[i] + nums[j];
            let list = map.get(target - currSum);
            if (!list) {
                continue;
            }
            console.log(`list是 ${list}`);
            // 4数之和等于目标值
            for (let one of list) {
                // 有什么用？？
                if (one[1] < i) {
                    results.push([ nums[one[0]], nums[one[1]], nums[i], nums[j] ]);
                }
            }
        }
    }

    return results;
};

const nums = [1, 0, -1, 0, -2, 2];
console.log(`原数组 ${nums}`);
const target = 0;
console.log(fourSum1(nums, target));

