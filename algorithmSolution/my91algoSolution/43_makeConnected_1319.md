## 题目
**1319. 连通网络的操作次数**
>中等

https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/

## 解法：并查集
### 思路
* 如果`连接数 < n - 1`，说明网线不够，直接返回-1
* 构造并查集，计算连通分量，结果为`"连通分量 - 1"`

### 代码
```js
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
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    let lineLen = connections.length;
    // 线不够
    if (lineLen < n - 1) {
        return -1;
    }
    const uf = new UF(n);
    for (let i = 0; i < lineLen; i++) {
        uf.union(connections[i][0], connections[i][1]);
    }

    return uf.getCount() - 1;
};
```

### 复杂度
* 时间复杂度：O(NlogN + M)，M是连通分量数量，N是节点个数
* 空间复杂度：O(N)
