/**
 * 752. 打开转盘锁
 * 中等
 * 
 * 利用bfs穷举
 * 
 * 如果只转一下锁，总共有几种可能？
 * 因为总共有 4 个位置，每个位置可以向上转，也可以向下转，所以共有 8 种可能
 * 
 * 比如从"0000"开始，转一次，可以穷举"1000", "9000", "0100", "0900"...共 8 种密码
 * 然后以这 8 种密码作为基础，对每个密码再转一下，穷举出所有可能。
 * 因此 可以抽象成一幅图，每个节点有 8 个相邻的节点，利用bfs穷举
 * 
 */
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    // 记录已经穷举过的密码，避免重复穷举
    const visited = new Set();
    visited.add('0000');
    
    // 所有可能的密码
    const queue = [];
    queue.push('0000');

    // 记录步数
    let step = 0;
    while (queue.length) {
        let n = queue.length;

        // 依次遍历当前队列的每个节点，对每个节点向周围扩散
        for (let i = 0; i < n; i++) {
            const cur = queue.shift();
            
            // 死亡密码需要跳过
            if (deadends.includes(cur)) {
                continue;
            }
            // 找到目标值
            if (cur == target) {
                return step;
            }

            // 将一个节点的未遍历相邻节点加入队列 
            for (let j = 0; j < 4; j++) {
                let up = upOne(cur, j);
                if (!visited.has(up)) {
                    queue.push(up);
                    visited.add(up);
                }

                let down = downOne(cur, j);
                if (!visited.has(down)) {
                    queue.push(down);
                    visited.add(down);
                }
            }
        }

        step++;
    }

    // 穷举完没找到目标密码
    return -1;
};

/**
 * 将 s[i] 向上拨动一次
 */
function upOne(s, i) {
    const ch = s.split('');

    if (ch[i] == '9') {
        ch[i] = '0';
    } else {
        ch[i] = +ch[i] + 1;
    }

    return ch.join('');
}

/**
 * 将 s[i] 向下拨动一次
 */
function downOne(s, i) {
    const ch = s.split('');

    if (ch[i] == '0') {
        ch[i] = '9';
    } else {
        ch[i] = +ch[i] - 1;
    }

    return ch.join('');
}

const deadends = ["0201", "0101", "0102", "1212", "2002"];
const target = "0202";
console.log(openLock(deadends, target)); // 6
