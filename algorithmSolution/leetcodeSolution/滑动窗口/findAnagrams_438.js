/**
 * leetcode 438 找到字符串中所有字母异位词
 * Medium 
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
 * 
 * 输入: source: "abab"  target: "ab"
 * 输出:[0, 1, 2]
 * 
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
 *
 *
 * 解法类似567题的 checkInclusion
 * 
 * 时间复杂度O(N) N为source度长度
 * 空间复杂度O(M) M为target度长度
 * 
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (source, target) {
    const results = []; // 结果数组
    if (source.length < target.length) {
        return results;
    }

    // key是要匹配的字符，value值是1，即出现的次数
    const needs = new Map();
    for (let t of target) {
        const v = needs.get(t);
        if (v === undefined) {
            needs.set(t, 1);
        } else {
            needs.set(t, v + 1);
        }
    }

    // console.log(needs);

    // 滑动窗口，key是出现在target的字符，value是出现的次数
    const window = new Map();

    let isValidCount = 0; // 存放滑动窗口中的key的个数满足needs条件的字符个数

    // 左右指针
    let left = 0;
    let right = 0;

    while (right < source.length) {
        let rightLetter = source[right];

        // 1.进行窗口的数据更新，当前字符是需要的则加入窗口
        if (needs.has(rightLetter)) {
            const count = window.get(rightLetter); // key不存在返回undefined
            if (count === undefined) {
                window.set(rightLetter, 1);
            } else {
                window.set(rightLetter, count + 1);
            }

            // 2.如果相等则有效计数+1，排除掉窗口中值大于1的，即有重复的字符
            if (needs.get(rightLetter) === window.get(rightLetter)) {
                isValidCount++;
            }
        }

        right++; // 右指针移动，扩大窗口

        // 3.左指针移动，缩小窗口，当前左右指针的长度>=要找的目标字符串长度 即可向右滑动窗口
        while (right - left >= target.length) {
            // 当前窗口的个数符合需要查找的个数了
            if (isValidCount === needs.size) {
                results.push(left);
            }

            let l = source[left];
            if (needs.has(l)) {
                // 4.即将窗口左移动后，窗口已经不包含需要的字符了，有效计数需要减一
                if (window.get(l) === needs.get(l)) {
                    isValidCount--;
                }

                const curWinValue = window.get(l);
                if (curWinValue !== undefined) {
                    window.set(l, curWinValue - 1);
                }
            }

            // 左指针移动，缩小窗口
            left++;
        }
    }

    return results;
};

const source = 'cbaebabacd';
const target = 'abc';
console.log(findAnagrams(source, target)); // [0, 6]
