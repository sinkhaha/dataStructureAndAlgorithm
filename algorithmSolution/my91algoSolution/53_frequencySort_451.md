## 题目
**451. 根据字符出现频率排序**
>中等

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

示例 1:
```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```
示例 2:
```
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```
示例 3:
```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-characters-by-frequency
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：大顶堆+哈希表(java实现)
### 思路
* 遍历s字符串，维护一个哈希表，key是字符，value是出现的次数
* 把哈希表`根据value出现次数`构造一个大顶堆
* 遍历大顶堆，取出堆顶元素，即`出现次数最多的字符`，根据其出现次数构造结果字符串，接着取堆顶元素直到大顶堆为空

### 代码
```java
class Solution {
    public String frequencySort(String s) {
        // 字符->出现次数
        HashMap<Character, Integer> map = new HashMap<>();
        for (Character c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        // 大顶堆，根据字符的出现次数排
        PriorityQueue<HashMap.Entry<Character, Integer>> q = new PriorityQueue<>((a, b) -> (Integer)b.getValue() - (Integer)a.getValue());
        
        // 入堆
        for (Map.Entry<Character, Integer> entry: map.entrySet()) {
            q.offer(entry);
        }
        
        StringBuilder strb = new StringBuilder();
        while (!q.isEmpty()) {
            Map.Entry<Character, Integer> top = q.poll();
            Integer value = (Integer)top.getValue();
            // 循环构造到当前字符次数为0
            while (value > 0) {
                strb.append(top.getKey());
                value--;
            }
        }

        return strb.toString();
    }
}
```

### 复杂度
* 时间复杂度 O(NlogN)
* 空间复杂度 O(N)

## 解法2:哈希表+排序
### 思路
哈希表+排序

### 代码
```js
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    // 字符->出现次数
    let map = new Map();
    for (let w of s) {
        map.set(w, (map.get(w) || 0) + 1);
    }

    // 根据出现次数降序排序
    map = new Map([...map].sort((v1, v2) => v2[1] - v1[1]));

    let ans = '';
    for(let [k, v] of map) {
        while (v > 0) {
            ans += k;
            v--;
        }
    }
    return ans;
};

```
