## 题目
**1052. 爱生气的书店老板**
>中等

今天，书店老板有一家店打算试营业 `customers.length` 分钟。每分钟都有一些顾客（`customers[i]`）会进入书店，所有这些顾客都会在那一分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 `grumpy[i] = 1`，否则 `grumpy[i] = 0`。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

请你返回这一天营业下来，最多有多少客户能够感到满意的数量。

示例：
```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
输出：16
解释：
书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
```

提示：
* 1 <= X <= customers.length == grumpy.length <= 20000
* 0 <= customers[i] <= 1000
* 0 <= grumpy[i] <= 1

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/grumpy-bookstore-owner
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 解法:滑动窗口

### 思路
* 计算老板`不生气时的顾客数总和total`
* 维护一个`长度为X`滑动窗口，该窗口代表老板的冷静期，结果需要算上该冷静期内的所有顾客数
* 当窗口扩大时，计算窗口内是否有老板生气的元素，即`grumpy[i]`值为1，有的话假设老板在该窗口冷静，则`total加上当前i索引对应的顾客数`；
* 当窗口缩小时，即窗口超过X个元素进行窗口缩小，如果从窗口移出的元素`grumpy[i]`的值为1，说明`刚才total已经加上了该i索引的顾客数`，所以此时需要`减掉i索引对应的顾客数`
* 窗口每次移动时，取total的最大值即可


### 代码
```javascript
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    // 不生气时所有的顾客满意数
    let total = 0;
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 0) {
            total += customers[i];
        }
    }

    let result = total;

    let left = 0;
    let right = 0;

    // 双指针维护长度为X的一个窗口
    while (right < customers.length) {
        // 新加入窗口的元素看是否是生气的，是的话加上该顾客人数
        if (grumpy[right]) {
            total += customers[right];
        }

        // 缩小窗口，缩小的元素是生气的，那减去该顾客的人数
        if (right - left == X) {
            if (grumpy[left]) {
              total -= customers[left];
            }
            left++;
        }

        right++;
        // 取最大值
        result = Math.max(result, total);
    }

    return result;
};
```

```javascript
/**
 * 
 * 思路一样，另一种代码实现
 * 
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    // 老板不生气时所有的顾客数
    let total = 0;
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 0) {
            total += customers[i];
        }
    }

    let result = total;

    for (let i = 0; i < customers.length; i++) {
        // 还没滑动的第一个窗口，加上第一个窗口中老板生气时对应的顾客数量
        if (i < X && grumpy[i]) {
            total += customers[i];
        } else {
            // 窗口缩小时，左边要移出窗口的元素的索引，该元素如果老板是生气的，则需要减掉刚才加上的数量
            let outIndex = i - X;
            if (grumpy[outIndex]) {
                total -=  customers[outIndex];
            }
            // 窗口扩大时，加上老板生气时对应的顾客数量
            if (grumpy[i]) {
                total += customers[i];
            }
        }
        result = Math.max(result, total);
    }

    return result;
};
```

```javascript
/**
 * 思路一样，一次遍历版本
 * 
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, X) {
    // 老板不生气时的所有满意顾客
    let satisfied = 0;
    // 老板控制X分钟不生气时增加的满意的顾客数，即滑动窗口中增加的满意顾客
    let total = 0;
    // 在滑动窗口移动过程中 total 的最大值
    let max = 0;

    for (let i = 0; i < customers.length; i++) {
        if (!grumpy[i]) {
            satisfied += customers[i];
        }

        // 第一个滑动窗口
        if (i < X && grumpy[i]) {
            total += customers[i];
        } else {
            // i - X即移出滑动窗口的下标
            if (grumpy[i - X]) {
                total -= customers[i - X];
            }
            if (grumpy[i]) {
                total += customers[i];
            }
        }
        max = Math.max(max, total);
    }
    
    // 原本满意的 + 冷静期把不满意的变成满意的
    return satisfied + max;
};
```

### 复杂度
* 时间复杂度 O(N)
* 空间复杂度 O(1)
