/**
 * 16进制的字符串转成十进制整数
 * 
 * @param {*} hex 
 */
function hex2int(hex) {
    var len = hex.length;
    var a = new Array(len);
    var code;

    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
    return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

console.log(hex2int('1df')); // 479


/**
 * 十进制转十六进制
 * 
 * @param {*} num 
 * @param {*} width 
 */
function int2hex(num, width) {
    var hex = '0123456789abcdef';
    var s = ''
    while (num) {
        s = hex.charAt(num % 16) + s;
        num = Math.floor(num / 16);
    }
    if (typeof width === 'undefined' || width <= s.length) {
        return '0x' + s;
    }
    var delta = width - s.length;
    var padding = '';
    while (delta-- > 0) {
        padding += '0';
    }
    return '0x' + padding + s;
}

console.log(int2hex(479, 8)); // 0x000001df

