/**
 * leetcode 76 最小覆盖子串
 * Medium
 * 
 * 时间复杂度O(N) N为source度长度
 * 空间复杂度O(M) M为target度长度
 * 
 * 
 * 滑动窗口算法的思路是这样：
 * 1、我们在字符串S中使用双指针中的左右指针技巧，初始化left = right = 0，
 * 把索引左闭右开区间[left, right)称为一个「窗口」。
 *
 * 2、我们先不断地增加right指针扩大窗口[left, right)，
 * 直到窗口中的字符串符合要求（包含了T中的所有字符）。
 *
 * 3、此时，我们停止增加right，转而不断增加left指针缩小窗口[left, right)，
 * 直到窗口中的字符串不再符合要求（不包含T中的所有字符了）。同时，每次增加left，
 * 我们都要更新一轮结果。
 *
 * 4、重复第 2 和第 3 步，直到right到达字符串S的尽头。
 *
 * 
 * 滑动窗口问题需要思考以下四个问题：
 * 1、当移动right扩大窗口，即加入字符时，要更新什么数据
 * 
 * 2、窗口在什么条件时应该暂停扩大，开始移动left缩小窗口
 * 
 * 3、当移动left缩小窗口，即移出字符时，需要更新什么数据
 *
 * 4、我们要的结果应该在扩大窗口时还是缩小窗口时进行更新
 * 如果一个字符进入窗口，应该增加window计数器；如果一个字符将移出窗口的时候，
 * 应该减少window计数器；当isValidCount满足need时应该收缩窗口；
 * 应该在收缩窗口的时候更新最终结果。
 * 
 * 滑动窗口可参考 https://mp.weixin.qq.com/s/ioKXTMZufDECBUwRRp3zaA
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

    // window和need两个哈希表，记录窗口中的字符和需要凑齐的字符
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

    // 存滑动窗口出现的字符，key是出现在target的字符，value是出现的次数
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

    console.log(`start=${start} len=${len}`);

    return len === Number.MAX_VALUE 
        ? null
        : source.substr(start, len);
};

const source = 'ADOBECODEBANC';
const target = 'ABC';
console.log(minWindow(source, target)); // BANC
console.log('=============================');

const source1 = 'a';
const target1 = 'aa';
console.log(minWindow(source1, target1)); // null
console.log('=============================');

const source2 = 'aa';
const target2 = 'aa';
console.log(minWindow(source2, target2)); // aa
console.log('=============================');

const source3 = 'bbaa';
const target3 = 'aba';
console.log(minWindow(source3, target3)); // baa
