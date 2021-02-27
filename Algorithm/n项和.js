/**
 * 求前n项和
 * @param {*} n 
 */
function sum(n) {
    const map = new Map();
    if (n === 1) {
        return 1;
    }
    
    // 备忘录
    const val = map.get(n);
    if (val) {
        return val;
    }

    const result = n + sum(n - 1);
    map.set(n, result);

    return result;
}

console.log(sum(5));