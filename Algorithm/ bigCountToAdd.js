/**
 * 两个大数相加，用字符串来表示数据
 * 
 * @param {*} a1 
 * @param {*} a2 
 */
function add(a1, a2) {
    if (!a1) {
        return a2;
    }
    if (!a2) {
        return a1;
    }

    let maxLength = Math.max(a1.length, a2.length);
    // 用0去补齐长度
    a1 = a1.padStart(maxLength, 0);
    a2 = a2.padStart(maxLength, 0);

    // 进位，不是0就是1
    let carry = 0;

    let rst = '';
    // 从后往前遍历
    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = parseInt(a1[i]) + parseInt(a2[i]) + carry;
        // 进位
        carry = Math.floor(sum / 10);
        // 结果
        rst = sum % 10 + rst;

        console.log('rst', rst);
    }

    if (carry == 1) {
        rst = rst + '1';
    }
    return rst;
}

console.log(add('2', '199'));
