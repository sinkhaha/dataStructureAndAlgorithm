/**
 * 
 * dp函数的定义如下
 * 若dp(s,i,p,j) = true，则表示s[i..]可以匹配p[j..]
 * 若dp(s,i,p,j) = false，则表示s[i..]无法匹配p[j..]
 * 
 * 选择：就是p[j]选择匹配几个字符
 * 状态：就是i和j两个指针的位置
 * 
 * 有两个base case:
 * (1) 模式串p匹配完了，应该看看文本串s是否被匹配完，匹配完则说明匹配成功
 * (2)当s匹配完了，不能直接根据p是否匹配完判断是否成功，
 * 而是要p[j..]能够匹配空串，就可以算完成匹配，如s = "a", p = "ab*c*"，
 * 当i走到s末尾的时候，j并没有走到p的末尾，但是p依然可以匹配s
 * 
 * 根据dp函数，dp(s, 0, p, 0)就是所求结果，指针 i，j 从索引 0 开始移动
 * 
 * 
 * @param {*} s 
 * @param {*} p 
 */
function isMatch(s, p) {
    this.dp = function (s, i, p, j) {
        const m = s.length;
        const n = p.length;
        // base case1 模式串p匹配完了，应该看看文本串s是否被匹配完，匹配完则说明匹配成功
        if (j === n) {
            return i === m;
        }

        // base case2 当s匹配完了，不能直接根据p是否匹配完判断是否成功，
        // 而是要p[j..]能够匹配空串，就可以算完成匹配，如s = "a", p = "ab*c*"，当i走到s末尾的时候，j并没有走到p的末尾，但是p依然可以匹配s
        if (i === m) {
            // p剩下的个数不是成对出现，肯定不能匹配成功
            if ((n - j) % 2 == 1) {
                return false;
            }

            // 检查是否为 x*y*z* 这种形式
            for (j; j + 1 < n; j += 2) {
                if (p[j + 1] != '*') {
                    return false;
                }
            }
            return true;
        }

        // s和p当前字符匹配
        if (s[i] === p[j] || p[j] === '.') {
            // 当p[j+1]为*
            if (j < n - 1 && p[j+1] === '*') {
                // 通配符匹配前面的字符0次或多次(跳过s一个字符，p不变继续匹配即可)
                return this.dp(s, i, p, j+2) || this.dp(s, i + 1, p, j); 
            } else {
                return this.dp(s, i+1, p, j+1);
            }
        } else {
            // 为*则匹配0次，s不变，p跳过两位（跳过当前值和*）
            if (j < p.length - 1 && p[j+1] === '*') {
                return this.dp(s, i, p, j+2); 
            } else {
                return false;
            }
        }
    }
    
    return dp(s, 0, p, 0)
}

const s = 'abc';
const p = 'ab*c*';
console.log(isMatch(s, p));
