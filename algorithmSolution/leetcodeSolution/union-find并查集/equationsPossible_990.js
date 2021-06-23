const UF = require('./UF算法');

/**
 * 990 等式方程的可满足性
 * 中等
 * https://leetcode-cn.com/problems/satisfiability-of-equality-equations/
 * 
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
    // 26个字母
    const uf = new UF(26);

    // 让相等的字母形成连通分量
    for (let eq of equations) {
        if (eq.charAt(1) == '=') {
            // 获取ascii码，97 是 a
            const x = eq.charCodeAt(0) - 97;
            const y = eq.charCodeAt(3) - 97;
            uf.union(x, y);
        }
    }

    // console.log(uf.parent);

    // 检查不等关系是否打破相等关系的连通性
    for (let eq of equations) {
        if (eq.charAt(1) == '!') {
            const x = eq.charCodeAt(0) - 97;
            const y = eq.charCodeAt(3) - 97;
            if (uf.connected(x, y)) {
                return false;
            }
        }
    }

    return true;
};

const equations = ["c==c", "b==d", "x!=z"];
console.log(equationsPossible(equations));
