/**
 * leetcode 567 字符串的排列
 * Medium
 * https://leetcode-cn.com/problems/permutation-in-string/
 * 
 * 输入: s1 = "ab" s2 = "eidbaooo"
 * 输出: True
 * 解释: s2 包含 s1 的排列之一 ("ba")
 * 
 * 解法如leetcode 76题的minWindow
 * 区别点在于
 * （1）左指针在什么时候要移动
 * （2）什么时候返回true
 *
 * 因为是要求s1排列之一，所以维护一个s1长度的窗口在s2上移动，窗口每个字符的个数相等则返回true
 * 
 * 时间复杂度O(N) N为source度长度
 * 空间复杂度O(M) M为target度长度
 * 
 * @param {string} source 如eidbaooo
 * @param {string} target 如ab, 注意可能包含重复字符
 * @return {boolean}
 */
var checkInclusion = function(source, target) {
    if (source.length < target.length) {
        return false;
    }
    if (source.includes(target)) {
        return true;
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
   
    console.log(needs);

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

        right++; // 右移动窗口

        // 3.区别(1)：左移动窗口，当前左右指针的长度>=要找的目标字符串长度 即可向右滑动窗口
        while (right - left >= target.length) {
            // 区别(2) 当前窗口的个数符合需要查找的个数了，即可返回true
            if (isValidCount === needs.size) {
                return true;
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
            
            // 左移窗口
            left++;
        }
    }

    return false;
};


const source = 'eidboaoo';
const target = 'ab';
console.log(checkInclusion(source, target));
