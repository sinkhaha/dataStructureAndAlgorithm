/**
 * 剑指 Offer 20. 表示数值的字符串
 * 中等
 * https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/
 * 
 * 解法：有限状态机
 * 参考 https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/solution/mian-shi-ti-20-biao-shi-shu-zhi-de-zi-fu-chuan-y-2/
 */
class Solution {
    public boolean isNumber(String s) {
    // 有限状态机
    // 
    // 按照字符串从左到右的顺序，定义以下 9 种状态
    // 0、开始的空格
    // 1、幂符号(e或E)前的正负号
    // 2、小数点前的数字
    // 3、小数点、小数点后的数字
    // 4、当小数点前为空格时，小数点、小数点后的数字
    // 5、幂符号
    // 6、幂符号后的正负号
    // 7、幂符号后的数字
    // 8、结尾的空格

        // 状态转移表
        // s表示正负号 d表示数字 .表示小数点 e表示幂符号 ' '则表示空格
        Map[] states = {
            // 初始9个哈希表，表示9个状态 即states[i]
            // 哈希值的key是某个状态类型，value表示可从状态i转移至状态value 
            new HashMap<>() {{ put(' ', 0); put('s', 1); put('d', 2); put('.', 4); }}, // 0.
            new HashMap<>() {{ put('d', 2); put('.', 4); }},                           // 1.
            new HashMap<>() {{ put('d', 2); put('.', 3); put('e', 5); put(' ', 8); }}, // 2.
            new HashMap<>() {{ put('d', 3); put('e', 5); put(' ', 8); }},              // 3.
            new HashMap<>() {{ put('d', 3); }},                                        // 4.
            new HashMap<>() {{ put('s', 6); put('d', 7); }},                           // 5.
            new HashMap<>() {{ put('d', 7); }},                                        // 6.
            new HashMap<>() {{ put('d', 7); put(' ', 8); }},                           // 7.
            new HashMap<>() {{ put(' ', 8); }}                                         // 8.
        };

        int p = 0; // 初始化状态为0
        char t; // 字符类型
        for(char c : s.toCharArray()) {
            if(c >= '0' && c <= '9') {
                t = 'd';
            } else if(c == '+' || c == '-') {
                t = 's';
            } else if(c == 'e' || c == 'E') {
                t = 'e';
            } else if(c == '.' || c == ' ') {
                t = c;
            } else {
                t = '?';
            }

            // 若字符类型t，不在哈希表states[p] 中，说明无法转移至下一状态，因此直接返回false 
            if(!states[p].containsKey(t)) {
                return false;
            }

            // 表示可以状态转移到states[p][t]
            p = (int)states[p].get(t);
        }
        
        // 跳出循环后，若状态 p属于 [2, 3, 7, 8] ，说明结尾合法
        return p == 2 || p == 3 || p == 7 || p == 8;
    }
}