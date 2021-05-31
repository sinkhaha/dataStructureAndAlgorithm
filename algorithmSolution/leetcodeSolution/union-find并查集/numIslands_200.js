/**
 * 200. 岛屿数量
 * 
 * 中等
 * https://leetcode-cn.com/problems/number-of-islands/
 * 
 * dfs/bfs/并查集解法
 */
/**
 * 并查集解法
 * 
 * 可以扫描整个二维网格，
 * 如果一个位置为 1，则将其与相邻四个方向上的 1 在并查集中进行合并，
 * 最终岛屿的数量就是并查集中连通分量的数目。
 * 
 * 即
 * 初始化，针对1的节点父节点指向自己，遍历所有节点，是1的话则合并，0就不管，最后结果为连通分量的个数
 * 
 * 和547题相同解法
 */

/**
 * 并查集类
 */
class UF {
    constructor(grid) {
        let m = grid.length;
        let n = grid[0].length;
        // 连通分量的个数
        this.count = 0;

        // 节点 x 的节点是 parent[x], 父节点指针初始指向自己
        this.parent = new Array(m * n);

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                // 节点为1的都指向自己
                if (grid[i][j] == '1') {
                    // i和j的节点的转化，即二维坐标转成一维坐标
                    this.parent[i * n + j] = i * n + j;
                    this.count++;
                }
            }
        }

        // 记录每棵树包含的节点数,初始化 1
        this.size = Array(m * n).fill(1);
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
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (!grid || grid.length == 0) {
        return 0;
    }

    // 构建m行n列的并查集
    const uf = new UF(grid);
    // 方向数组
    const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];

    console.log('count', uf.getCount());

    const m = grid.length;
    const n = grid[0].length;
    // 遍历所有节点
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == '0') {
                continue;
            }

            // 等于1时，分别取上下左右4个方向的点，如果该点是1，则连通
            for (let d of directions) {
                let nr = i + d[0];
                let nc = j + d[1];

                // 合法，则相邻的节点进行合并
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == '1') {
                    uf.union(i * n + j, nr * n + nc);
                }
            }
        }
    }

    return uf.getCount();
};

const grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
];

console.log(numIslands(grid)); 
