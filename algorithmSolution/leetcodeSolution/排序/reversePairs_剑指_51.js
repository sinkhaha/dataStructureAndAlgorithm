/**
 * 剑指 Offer 51. 数组中的逆序对
 * 困难
 * https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
 * 
 * 解法：归并排序 + 分治
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
    // 归并排序、分治
    let count = 0;

    // 如果数组中只有1个元素或者为空，则不存在逆序对
    if (nums.length < 2) {
        return count;
    }

    const mergeSort = (front, behind) => {
        // 如果前后指针相遇，则归并区间只剩下一个元素了
        if (front == behind) {
            return [nums[front]];
        }

        let mid = front + ((behind - front) >> 1);
        // 规则让左半部分不包含中心元素 右半部分包含中心元素
        let left = mergeSort(front, mid);
        let right = mergeSort(mid + 1, behind);
        let temp = new Array(behind - front + 1).fill(0);

        // 合并有三个指针
        let cur = 0;
        let l = 0;
        let r = 0;
        while (l < left.length && r < right.length) {
            // 如果右边元素大于左边元素，将左边元素放到结果数组中
            if (right[r] >= left[l]) {
                temp[cur++] = left[l++];
            } else {
                temp[cur++] = right[r++];
                // 如果左边元素大于右边元素，那就出现了序列对了
                // 由于左右两边都是有序的，左边当前元素及之后的元素都会跟右边构建逆序对
                count += left.length - l;
            }
        }

        while (l < left.length) {
            temp[cur++] = left[l++];
        }
        while (r < right.length) {
            temp[cur++] = right[r++];
        }

        return temp;
    };

    // 左闭右闭区间
    mergeSort(0, nums.length - 1);
    return count;
};