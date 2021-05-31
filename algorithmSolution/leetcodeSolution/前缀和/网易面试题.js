/**
 * 用一个长度为 150 的数组 prefix 来记录每个分数出现的次数，数组下标是分数值，数组的值就是分数出现的 次数；
 * 
 * 遍历 prefix，计算前缀和，第i位表示分数不超过分数为i的同学的人数
 *
 * 时间O(n)，n为scores全班所有同学的人数
 * 空间O(n)
 * 
 * @param {array} scores 所有同学第分数
 * @param {number} m 第m个同学 
 */
function wangyi(scores, m) {
    // 下标是分数，值是有多少人是该分数
    let prefix = Array(151).fill(0);

    scores.forEach(v => prefix[v]++);


    for (let i = 1; i < prefix.length; i++) {
        prefix[i] += prefix[i - 1];
    }

    // 分数即下标
    const score = scores[m - 1];
    // 分数不超过i的同学的人数/总人数
    const p = (prefix[score] / scores.length) * 100;

    return p.toFixed(6) + '%';
}

const scores = [50, 60, 70];
const m = 2;
console.log(wangyi(scores, m)); // 66.666667%