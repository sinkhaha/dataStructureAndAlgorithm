## 题目
**30. 串联所有单词的子串**
>困难

给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

示例 1：
```
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
```
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
示例 2：
```
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1：滑动窗口+哈希表
### 思路
从s入手，判断`s每个子串`是否可以由words的单词组合而成，符合的把下标保存起来，最后返回即可



**怎么判断子串是否符合？**

1. 维护两个HashMap
2. 把所有的单词words存到一个哈希表wordsMap里，key存单词，value 存单词出现的个数（因为给出的单词可能会有重复）

3. `for循环判断s的每个子串`，扫描`每个子串tmpS的单词`是否匹配words的单词

* 如果当前扫描的单词curWord存在哈希表wordsMap中，把该单词存到新的哈希表map中；不存在则跳过
* 然后判断新的map中该单词的value是否大于之前的wordsMap该单词的value；如果大于，说明该子串不是要找的，跳过接着判断下一个子串即可；如果不大于，说明该curWord符合words的单词，`计算一下子串符合words的长度`，接着判断下一个单词的情况
* 子串扫描结束，如果子串的全部单词都符合（此处用长度作为标记，长度相等即该子串是符合words里所有拆分的单词），保存下开始下标

4. 返回所有开始下标结果即可

### 代码
```javascript
/**
 * 
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!s || !words || !words.length) {
        return [];
    }
    
    // key是单词，value是出现的次数
    let wordsMap = new Map();
    for (let word of words) {
        wordsMap.set(word, (wordsMap.get(word) || 0)+ 1);  
    }

    // 一个单词的长度
    let oneWordsLen = words[0].length;
    // 所有单词的长度
    let allWordsLen = oneWordsLen * words.length;

    let result = [];
    // 开始扫描s的每个子串，s每次只移动一位
    for (let i = 0; i < s.length - allWordsLen + 1; i++) {
        // s的一个子串
        let tmpS = s.substring(i, i + allWordsLen);

        // 存放子串各个单词及其出现次数，最后用于和wordsMap做比较
        let map = new Map();

        // 判断s的子串是否可以拆成words里所有单词
        let tmpLength = 0;
        for (let j = 0; j < allWordsLen; j += oneWordsLen) {
            let curWord = tmpS.substring(j, j + oneWordsLen);
            map.set(curWord, (map.get(curWord) || 0) + 1);
            // words不包含该单词，直接跳过，判断下一个单词
            if (!wordsMap.has(curWord)) {
                break;
            }
            // 当前单词的数量比words中该单词的数量还多，也跳过判断下一个单词
            if (map.get(curWord) > wordsMap.get(curWord)) {
                break;
            }
            tmpLength += oneWordsLen;
        }
        // 长度相等，说明该字串可以拆成words里的所有单词
        if (tmpLength === tmpS.length) {
            result.push(i);
        }
    }

    // 返回能拆分成words的所有起始索引
    return result;
};
```
### 复杂度
* 时间O（n * m），n是s的长度，m是words的单词数
* 空间O（m， m是words的单词数


## 解法2：滑动窗口+哈希表
### 思路
思路类似解法1，`对解法1的优化`，降低时间复杂度



解法1在s中每次只移动1个字符；解法2改成每次移动一个单词的长度，此时s子串的所有可能结果有3种，所以外层循环小于一个单词的长度即可

* i从0开始，每次移动一个单词的长度
* i从1开始，每次移动一个单词的长度
* i从2开始，每次移动一个单词的长度



1. 右窗口每次移动一个单词的长度，获取该单词word；

2. 如果该单词不在wordsMap中，说明该单词可以直接跳过，缩小窗口，左指针移动到右指针的位置；

3. 如果该单词在wordsMap中，如果该单词在子串中的个数，比在wordsMap中的个数还多，说明需要缩小窗口，即左指针向右移动，一直到该单词在子串中的个数不比wordsMap中多为止



### 代码
```javascript
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!s || !words || !words.length) {
        return [];
    }
    
    // key是单词，value是出现的次数
    let wordsMap = new Map();
    for (let word of words) {
        wordsMap.set(word, (wordsMap.get(word) || 0)+ 1);  
    }

    // 一个单词的长度
    let oneWordsLen = words[0].length;
    // 所有单词的长度
    let allWordsLen = oneWordsLen * words.length;
    if (s.length < allWordsLen) {
        return [];
    }

    let res = [];
    // 为什么要小于一个单词的长度，即i < oneWordsLen ？
    // 因为每次移动一个单词的长度，即3个字符，所以所有的移动被分成了三类 1、从0开始，每次移动一个单词的长度；2、从1开始，每次移动一个单词的长度；3、从2开始，每次移动一个单词的长度
    // 每次窗口大小 wordsLen，每次后移一个单词长度，由左右窗口维持当前窗口位置
    for (let i = 0; i < oneWordsLen; i++) {
        let left = i;
        let right = i;

        // 符合要求的单词数
        let count = 0;
        // 符合要求的word窗口
        let tmpMap = new Map();

        // 右窗口不超出s的长度，每次移动一个单词的长度
        while (right + oneWordsLen <= s.length) {
            const word = s.substring(right, right + oneWordsLen);
            right += oneWordsLen; // 右窗口右移

            // words中没有这个单词，则左指针移动，缩小窗口，直接右移到这个单词后面
            if (!wordsMap.has(word)) {
                // 左指针直接移动到右窗口的位置，包含该不符合字符的串都直接跳过
                left = right;
                // 窗口内单词统计map清空，重新统计
                tmpMap.clear();
                // 符合要求的单词数清0
                count = 0;
            } else { 
                // 统计当前子串中这个单词出现的次数
                tmpMap.set(word, (tmpMap.get(word) || 0) + 1);
                count++;
                // 一直减，减到不大于，即重复单词前面的都是没用的，左窗口直接跳过
                while (tmpMap.get(word) > wordsMap.get(word)) {
                    let tmpWord = s.substring(left, left + oneWordsLen);
                    count--;
                    tmpMap.set(tmpWord, (tmpMap.get(tmpWord) || 0) - 1);
                    // 左窗口右移动，即缩小
                    left += oneWordsLen;
                }
                // 当前窗口字符串个数满足要求，此时窗口的单词刚好满足words
                if (count == words.length) {
                    res.push(left);
                }
            }             
        }
    }

    // 返回能拆分成words的所有起始索引
    return res;
};
```
### 复杂度
* 时间复杂度是 O（n），n是s的长度
* 空间复杂度是 O（m），m是words的单词数