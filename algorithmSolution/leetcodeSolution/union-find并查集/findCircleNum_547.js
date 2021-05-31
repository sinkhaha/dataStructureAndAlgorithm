/**
 * 547. 朋友圈
 * 
 * 中等
 * https://leetcode-cn.com/problems/number-of-provinces/
 * 
 * 和200题相同解法
 * 
 * 将所有有关系的同学进行连通,返回连通分量即结果
 */

/**
 * 并查集类
 */
class UF {
    constructor(n) {
        // 连通分量的个数
        this.count = n;

        // 节点 x 的节点是 parent[x], 父节点指针初始指向自己
        this.parent = new Array(n);

        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }

        // 记录每棵树包含的节点数,初始化 1
        this.size = Array(n).fill(1);
    }

    /**
     * 将p和q连接
     * 
     * O(1)
     * 
     * @param {*} p 
     * @param {*} q 
     */
    union(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP == rootQ) {
            return;
        }

        // 小的树接到大的树下面，相对较平衡
        if (this.size[rootP] > this.size[rootQ]) {
            this.parent[rootQ] = rootP;
            this.size[rootP] += this.size[rootQ];
        } else {
            this.parent[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
        }

        this.count--;
    }

    /**
     * 判断p和q是否连通
     * 
     * 如果节点p和q连通，p和q一定有相同的根节点
     * O(1)
     * @param {*} p 
     * @param {*} q 
     */
    connected(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        return rootP == rootQ;
    }

    /**
     * 返回图中有多少个连通分量
     */
    getCount() {
        return this.count;
    }

    /**
     * 返回某个节点x的根节点
     * O(1) 
     * @param {*} x 
     */
    find(x) {
        while (this.parent[x] != x) {
            // 进行路径压缩
            this.parent[x] = this.parent[this.parent[x]];
            x = this.parent[x];
        }
        return x;
    }
}

/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function (M) {
    if (!M || M.length == 0) {
        return 0;
    }

    // n行n列
    const n = M.length;
    // 构造并查集
    const uf = new UF(n);

    // 连通所有的同学
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (M[i][j] == 1 && i != j) {
                uf.union(i, j);
            }
        }
    }

    return uf.getCount();
};

const M = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
];

console.log(findCircleNum(M)); // 2
