### 题目
**768. 最多能完成排序的块 II**
>困难

这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。

arr是一个可能包含`重复元素`的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。

我们最多能将数组分成多少块？

示例 1:
```
输入: arr = [5,4,3,2,1]
输出: 1
解释:
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。
```
示例 2:
```
输入: arr = [2,1,3,4,4]
输出: 4
解释:
我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。 
```

注意:

* arr的长度在[1, 2000]之间。
* arr[i]的大小在[0, 10**8]之间。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-chunks-to-make-sorted-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法1: 单调递增栈

#### 思路
单调递增栈
> 维护单调栈，单调栈中每个元素代表每个块中的最大值
> 
> 所以所求结果为：栈元素的个数（栈有多少个元素就有多少个块）

因为题目要求的是`最多的块`，最多的块的情况下只能是每一个元素都可以当成一个块，此时`数组是递增`或者是`递减`的。



1. `从左往右`遍历数组arr，如果当前值`arr[i] >= 单调栈的栈顶元素`的值，`arr[i]`直接`入栈`(相当于当前元素`arr[i]`可以算为一个单独的块，因为要求的是最多的块)
2. 如果当前值`arr[i] < 单调栈的栈顶元素`时，栈顶元素出栈后，先把它临时保存为`此时栈的最大值max`，循环继续比较`arr[i]`和下一个栈顶元素的大小，如果当前值依然小于栈顶元素，一直出栈，直到`当前值 >= 栈顶元素`，最后`把max压入栈`（相当于 `当前元素arr[i]` 和 `比arr[i]小而出栈的所有元素` 和 `当前栈顶的元素max` 组成一个块，块的最大值即为max，所以最后需要把max入栈）



#### 代码

```javascript
/**
 *
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted1 = function (arr) {
    let stack = [];

    for (let val of arr) {
        // 大于栈顶元素，直接入栈，算一个块
        if (!stack.length || stack[stack.length - 1] <= val) {
            stack.push(val);
        } else {
            let curMax = stack.pop();
            // val和这些弹出的元素算一个块
            while (stack.length && stack[stack.length - 1] > val) {
                stack.pop();
            }
            // 保存块中的最大值
            stack.push(curMax);
        }
    }
    return stack.length;
}

const arr1 = [2, 1, 3, 4, 4];
console.log(maxChunksToSorted1(arr1)); // 4
```
#### 复杂度
 * 时间复杂度O(n)

 * 空间复杂度O(n)

   

### 解法2: "排序和"解法
#### 思路
排序和解法
> 如果`一个数组arr` 和 `其排序后的数组sortArr` 的前i项和相等时，则两个数组中`[0...i]`这些元素都是相同的(可能就只有顺序不同)

1. 得到arr一个`升序排序`后的数组sortArr
2. `从左往右`遍历arr，计算当前i时，`arr的前i项和` ，计算sortArr的前i项和
3. 如果`两个数组的前i项和相等`，即`arr的前i项和 == sortArr的前i项和`，则增加计数，因为它们可以组成一个块，如果不相等，继续遍历到相等的位置j，表示i到j这些元素也可以组成一个块，增加计数


#### 代码
```javascript
/**
 * 
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted2 = function (arr) {
    let count = 0;

    let sum1 = 0; // 存arr的前i项和
    let sum2 = 0;
    // 拷贝数组，升序排序
    const arrSort = [...arr].sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        sum1 += arr[i];
        sum2 += arrSort[i];
        if (sum1 === sum2) {
            count++;
        }
    }

    return count;
}

const arr2 = [2, 1, 3, 4, 4];
console.log(maxChunksToSorted2(arr2));
```

#### 复杂度
* 时间复杂度O(nlogn)
> Max(sort的时间复杂度nlogn, for循环的时间复杂度n)
 * 空间复杂度O(n)



***相似的解法还有计数排序解法***

>如果两个元素一样的数组，不管元素顺序怎样，两个数组的计数排序数组一定是一样的。
>(计算排序数组即索引值为元素，值为在原数组出现的个数)

1. 得到arr一个升序排序后的数组sortArr
2. 从左往右遍历arr，如果arr的前i项的计数信息和sortArr的前i项的计数信息一致，那么可以分成一个块，此时分块计数加1，否则继续遍历

