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

