// leetcode 18 四数之和
// https://leetcode-cn.com/problems/4sum/
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

            // console.log(`rst是 ${rst}`);
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
            // console.log(`list是 ${list}`);
            // 4数之和等于目标值
            for (let one of list) {
                // 
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

console.log('======================');

/**
 * 
 * 解法2: 同3数之和，双指针法
 * 
 * 时间复杂度O(n^3)
 * 空间复杂度O(1)
 * 
 * @param {*} nums 
 * @param {*} target 
 */
function fourSum2(nums, target) {
    let n = nums.length;
    if (n < 4) {
        return [];
    }
    nums = nums.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    
    let results = [];
    for (let first = 0; first < n; first++) {
        if (nums[first] === nums[first - 1]) {
            continue;
        }

        for (let second = first + 1; second < n; second++) {
            if (second > first + 1 && nums[second] == nums[second-1]) {
                continue;
            }

            let third = second + 1;
            let four = n - 1;
            
            // 双指针
            while (third < four) {
                const sum = nums[first] + nums[second] + nums[third] + nums[four];
                if (sum > target) {
                    four--; 
                } else if (sum < target){
                    third++;
                } else {
                    results.push([nums[first], nums[second], nums[third], nums[four]]);
                    // 第3数重复，继续向后移动指针
                    while(third < four && nums[third] === nums[third + 1]) {
                        third++;
                    }
                    // 第4数重复，继续向前移动指针
                    while(third < four && nums[four] === nums[four - 1]) {
                        four--;
                    }
                    // 继续移动third,four指针
                    third++;
                    four--;
                }
            }
        }
    }
    return results;
}

const nums2 = [1, 0, -1, 0, -2, 2];
console.log(`原数组 ${nums2}`);
const target2 = 0;
console.log(fourSum2(nums2, target2));
