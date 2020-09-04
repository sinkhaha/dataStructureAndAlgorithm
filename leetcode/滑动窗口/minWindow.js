/**
 * leetcode 76 最小覆盖子串
 * 
 * 时间复杂度O(N) N为source度长度
 * 空间复杂度O(M) M为target度长度
 * 
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(source, target) {
    if (source.length < target.length) {
        return null;
    }
    if (source.includes(target)) {
        return target;
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

    // 记录最小覆盖子串的起始索引及长度
    let start = 0;
    let len = Number.MAX_VALUE;

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

        // 3.左移动窗口，window已经包含了needs所有的字符
        while (isValidCount === needs.size) {
            // 更新最小覆盖字串
            const curLen = right - left;
            if (curLen < len) {
                start = left;
                len = curLen;
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

    // console.log(`start=${start} len=${len}`);

    return len === Number.MAX_VALUE 
        ? null
        : source.substr(start, len);
};

const source = 'ADOBECODEBANC';
const target = 'ABC';
console.log(minWindow(source, target));
console.log('=============================');

const source1 = 'a';
const target1 = 'aa';
console.log(minWindow(source1, target1));
console.log('=============================');

const source2 = 'aa';
const target2 = 'aa';
console.log(minWindow(source2, target2));
console.log('=============================');

const source3 = 'bbaa';
const target3 = 'aba';
console.log(minWindow(source3, target3));
