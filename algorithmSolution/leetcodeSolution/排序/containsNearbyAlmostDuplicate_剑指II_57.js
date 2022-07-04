/**
 * 剑指 Offer II 057. 值和下标之差都在给定的范围内
 * 中等
 * https://leetcode.cn/problems/7WqeDu/
 * 
 * 解法：桶排序
 * 
 * 参考 https://leetcode.cn/problems/7WqeDu/solution/tong-pai-xu-si-lu-by-bin-watson-5u5f/
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    // 每个桶相差t时间间隔
    // 如第1个桶，存放值为[0, t]的数
    // 第2个桶，存放值为[t+1, 2t]的数

    // 这样同一个桶内的数据的绝对值之差一定小于等于t
    // 相邻的桶，也可能存在绝对值之差小于t的

    const n = nums.length;

    const map = new Map(); // key是桶下标，value是桶内的值

    for (let i = 0; i < n; i++) {
        const item = nums[i];

        // 获取桶编号，t+1为桶的大小
        const id = getID(item, t + 1);

        // 第1种情况
        // 分布在同一个桶
        if (map.has(id)) {
            return true;
        }

        // 第2种情况
        // 判断相邻桶是否已经有元素，若有则判断是否绝对值之差在t内
        if (map.has(id - 1) && Math.abs(item - map.get(id - 1)) <= t) {
            return true;
        }
        if (map.has(id + 1) && Math.abs(item - map.get(id + 1)) <= t) {
            return true;
        }

        // 加入桶里
        map.set(id, item);

        if (i >= k) { // 删除超出窗口长度的旧桶
            map.delete(getID(nums[i - k], t + 1));
        }
    }

    return false;
};

//w为桶的大小，返回数 字x入桶时桶的下标
const getID = (x, bucket_size) => {
    return x < 0
        ? Math.floor((x + 1) / bucket_size) - 1
        : Math.floor(x / bucket_size);
}