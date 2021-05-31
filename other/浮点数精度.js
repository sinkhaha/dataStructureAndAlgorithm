// 参考 https://github.com/fzred/calculatorjs
/**
 * 解决小数精度问题
 * @param {*} l 操作数1
 * @param {*} r 操作数2
 * @param {*} sign 操作符
 * fixedFloat(0.3, 0.2, '-')
 */
function fixedFloat(l, r, sign) {
    const arrL = split(l)
    const arrR = split(r)
    let fLen = Math.max(arrL[1], arrR[1])

    if (fLen === 0) {
        return operate(Number(l), Number(r), sign, 1)
    }
    const f = Math.pow(10, fLen)
    if (arrL[1] !== arrR[1]) {
        if (arrL[1] > arrR[1]) {
            arrR[0] += padding0(arrL[1] - arrR[1])
        } else {
            arrL[0] += padding0(arrR[1] - arrL[1])
        }
    }
    return operate(Number(arrL[0]), Number(arrR[0]), sign, f)
}

/**
 * 计算
 * @param {*} l 操作数1
 * @param {*} r 操作数2
 * @param {*} sign 操作符
 * @param {*} f 精度
 */
function operate(l, r, sign, f) {
    switch (sign) {
        case '+': return (l + r) / f
        case '-': return (l - r) / f
        case '*': return (l * r) / (f * f)
        case '/': return (l / r)
    }
}

function split(number) {
    let str
    if (number < 1e-6) {
        str = noExponent(number)
    } else {
        str = number + ''
    }
    const index = str.lastIndexOf('.')
    if (index < 0) {
        return [str, 0]
    } else {
        return [str.replace('.', ''), str.length - index - 1]
    }
}

/**
 * 将科学记数法转为普通字符串
 * @param {Number} number
 */
function noExponent(number) {
    const data = String(number).split(/[eE]/)
    if (data.length == 1) return data[0]

    let z = ''
    const sign = number < 0 ? '-' : ''
    const str = data[0].replace('.', '')
    let mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.'
        while (mag++) z += '0'
        return z + str.replace(/^\-/, '')
    }
    mag -= str.length
    while (mag--) z += '0'
    return str + z
}

/**
 * 补0
 * @param {*} num 0个数
 */
function padding0(num) {
    let str = ''
    while (num--) str += '0'
    return str
}

/**
 * 加
 */
function add(l, r) {
    return fixedFloat(l, r, '+')
}

/**
 * 减
 */
function sub(l, r) {
    return fixedFloat(l, r, '-')
}

/**
 * 乘
 */
function mul(l, r) {
    return fixedFloat(l, r, '*')
}

/**
 * 除
 */
function div(l, r) {
    return fixedFloat(l, r, '/')
}

/**
 * 四舍五入
 * @param {*} number
 * @param {*} fraction
 */
function round(number, fraction) {
    return Math.round(number * Math.pow(10, fraction)) / Math.pow(10, fraction)
}

console.log(0.1 + 0.2)
console.log(add(0.1, 0.2))// 0.3
console.log('=====')

console.log(0.1 - 0.2)
console.log(sub(0.1, 0.2)) // -0.1
console.log('=====')

console.log(0.1 * 0.012)
console.log(mul(0.01, 2.012)) // 0.02
console.log('=====')

console.log(0.1 / 0.18)
console.log(div(0.1, 0.18)) // 0.5555555555555556

function mydiv() {
    if (arguments.length < 1) {
        return;
    }

    return Array.from(arguments).reduce((acc, val) => {
        return parseFloat(acc) / parseFloat(val);
    });
}
console.log(mydiv(0.1, 0.18)) // 0.5555555555555556



/**
 * 解决两个数相加精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatAdd(a, b) {
    var c, d, e;
    if (undefined == a || null == a || "" == a || isNaN(a)) { a = 0; }
    if (undefined == b || null == b || "" == b || isNaN(b)) { b = 0; }
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (floatMul(a, e) + floatMul(b, e)) / e;
}
/**
 * 解决两个数相减精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatSub(a, b) {
    var c, d, e;
    if (undefined == a || null == a || "" == a || isNaN(a)) { a = 0; }
    if (undefined == b || null == b || "" == b || isNaN(b)) { b = 0; }
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (floatMul(a, e) - floatMul(b, e)) / e;
}
/**
 * 解决两个数相乘精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatMul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
/**
 * 解决两个数相除精度丢失问题
 * @param a
 * @param b
 * @returns
 */
function floatDiv(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), floatMul(c / d, Math.pow(10, f - e));
}

console.log(floatMul(0.1, 10));

// 0.02
