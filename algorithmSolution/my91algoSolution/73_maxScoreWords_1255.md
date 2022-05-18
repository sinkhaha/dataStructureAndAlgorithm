## 题目
**1255. 得分最高的单词集合**
>困难

你将会得到一份单词表 words，一个字母表 letters （可能会有重复字母），以及每个字母对应的得分情况表 score。

请你帮忙计算玩家在单词拼写游戏中所能获得的「最高得分」：能够由 letters 里的字母拼写出的 任意 属于 words 单词子集中，分数最高的单词集合的得分。

单词拼写游戏的规则概述如下：

* 玩家需要用字母表 letters 里的字母来拼写单词表 words 中的单词。
* 可以只使用字母表 letters 中的部分字母，但是每个字母最多被使用一次。
* 单词表 words 中每个单词只能计分（使用）一次。
* 根据字母得分情况表score，字母 'a', 'b', 'c', ... , 'z' 对应的得分分别为 score[0], score[1], ..., score[25]。
* 本场游戏的「得分」是指：玩家所拼写出的单词集合里包含的所有字母的得分之和。


示例 1：
```
输入：words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
输出：23
解释：
字母得分为  a=1, c=9, d=5, g=3, o=2
使用给定的字母表 letters，我们可以拼写单词 "dad" (5+1+5)和 "good" (3+2+2+5)，得分为 23 。
而单词 "dad" 和 "dog" 只能得到 21 分。
```
示例 2：
```
输入：words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
输出：27
解释：
字母得分为  a=4, b=4, c=4, x=5, z=10
使用给定的字母表 letters，我们可以组成单词 "ax" (4+5)， "bx" (4+5) 和 "cx" (4+5) ，总得分为 27 。
单词 "xxxz" 的得分仅为 25 。
```
示例 3：
```
输入：words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
输出：0
解释：
字母 "e" 在字母表 letters 中只出现了一次，所以无法组成单词表 words 中的单词。
```

提示：

* 1 <= words.length <= 14
* 1 <= words[i].length <= 15
* 1 <= letters.length <= 100
* letters[i].length == 1
* score.length == 26
* 0 <= score[i] <= 10
* words[i] 和 letters[i] 只包含小写的英文字母

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-score-words-formed-by-letters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：回溯
### 思路
* 遍历每个单词，做选择，计算选择单单词时的分数和不选择该单词时的分数，返回分数高的
> 因为letters里每个字母只能选择一次，所以要维护被选择后该字母的计数，即letterCount变量

### 代码
```js
/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function(words, letters, score) {
    // 存每个字母出现的个数，类似计数排序（因为每个字母只能使用一次）
    let letterCount = new Array(26).fill(0);
    for (let letter of letters) {
        let index = letter.charCodeAt() - 97;
        letterCount[index]++;
    }
    
    // 遍历words每个单词，计算选择时的分数 和 不选择时的分数 返回分数高的
    var backtrack = function(index, letterCount, words, letters, score) {
        if (index >= words.length) {
            return 0;
        }
        
        // 复制副本
        let letterCountCopy = [...letterCount];
        // 计算当前单词的得分
        let ret = getWordScore(words[index], letterCountCopy, letters, score);

        // 选择该单词
        // 注意:letterCountCopy是被getWordScore后
        let leftRet = ret == 0
            ? 0
            : ret + backtrack(index + 1, letterCountCopy, words, letters, score);
        
        // 不选该单词，则遍历下一个单词
        // 这里的字母表是没有改变的
        let rightRet = backtrack(index + 1, letterCount, words, letters, score);
        
        // 返回"选择"和"不选择"中得分大的
        return Math.max(leftRet, rightRet);
    }

    return backtrack(0, letterCount, words, letters, score);
};

/**
 * 获取某个单词的分数
 * @param {*} word 
 * @param {*} letterCountCopy 
 * @param {*} letters 
 * @param {*} score 
 */
var getWordScore = function (word, letterCountCopy, letters, score) {
    let ret = 0;
    for (let i = 0; i < word.length; i++) {
        let c = word[i];
        let index = c.charCodeAt() - 97;
        if (letterCountCopy[index] == 0) {
            return 0;
        }
        ret += score[index];
        letterCountCopy[index]--;
    }
    return ret;
}
```

### 复杂度
* 时间复杂度：O(n!)
* 空间复杂度：O(n)
