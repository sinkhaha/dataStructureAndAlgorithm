/**
 * leetcode 969. 煎饼排序
 * 
 * 递归解法
 * 
 * 思路：
 * 找到前n个煎饼中最⼤的，然后将这个煎饼翻转到最底下，接着递归调用n-1个煎饼即可；
 * 递归结束条件为 n == 1 （只有1个饼不需要翻转）
 * 
 * 怎样把第n个煎饼翻转到最底下？ 比如第4个饼是最大的
 * 1. 可以先将前4块翻一下，此时最大的即4在最上面
 * 2. 接着将前n快全部翻转，这样最大的饼4是最后一块
 * 
 * 
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (arr) {
    let result = [];
    this.sort = function (cakes, n) {
        if (n == 1) {
            return;
        }
        // 寻找最⼤饼的索引 
        let maxCake = 0;
        let maxCakeIndex = 0;
        for (let i = 0; i < n; i++) {
            if (cakes[i] > maxCake) {
                maxCakeIndex = i;
                maxCake = cakes[i];
            }
        }

        // 第⼀次翻转，将最⼤饼翻到最上⾯
        myReverse(cakes, 0, maxCakeIndex);
        result.push(maxCakeIndex + 1);

        // 第⼆次翻转，将最⼤饼翻到最下⾯ 
        myReverse(cakes, 0, n - 1);
        result.push(n);

        // 递归调⽤ 
        this.sort(cakes, n - 1);
    }
    this.sort(arr, arr.length);
    return result;
};

/**
 * 翻转arr数组[i..j]的元素
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
function myReverse(arr, i, j) {
    while (i < j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
    }
}

// TODO 此方法并不是翻转次数最少的最优解
const arr = [3, 2, 4, 1];
console.log(pancakeSort(arr));
