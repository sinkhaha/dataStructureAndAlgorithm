// 两个大数相加，用字符串来表示数据
/**
 * 
 * 
 * @param {*} a1 
 * @param {*} a2 
 */
function add1(a1, a2) {
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

        // console.log('rst', rst);
    }

    if (carry == 1) {
        rst = rst + '1';
    }
    return rst;
}

console.log(add1('2', '199'));


/**
 * 
 * @param {*} num1 
 * @param {*} num2 
 */
var add2 = function(num1, num2) {
    let arr1 = num1.split('');
    let arr2 = num2.split('');

    let rst = [];
    let carry = 0;

    while(arr1.length || arr2.length){
        const val1 = parseInt(arr1.pop()) || 0;
        const val2 = parseInt(arr2.pop()) || 0;
        let sum = val1 + val2 + carry;
        carry = parseInt(sum/10);
        // 余数
        rst.unshift(sum%10);
    }

    return rst.join('');
};

console.log(add2('12', '222')); // 234