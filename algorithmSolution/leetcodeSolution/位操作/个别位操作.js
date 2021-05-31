/**
 * 个别位操作小技巧
 */

// 判断两个数是否异号
function test1(x, y) {
    const f = ((x ^ y) < 0); // true
    console.log('是否异号', f);
    return f;
}
test1(-1, 2);

// 交换两个数
function test2(a, b) {
    a ^= b; 
    b ^= a; 
    a ^= b;
    return { a, b };
}
console.log(test2(1, 2));


/**
 * 
 * 利用n & (n-1) 判断⼀个数是不是 2 的指数
 * 
 * ⼀个数如果是 2 的指数，那么它的⼆进制表⽰⼀定只含有⼀个 1
 * @param {*} n 
 */
function isPowerOfTwo(n) {
    if (n <= 0) {
        return false;
    } 
    return (n & (n - 1)) == 0;
}
console.log(isPowerOfTwo(1));
