## 题目
**547. 朋友圈**
>中等

班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。

给定一个 `N * N` 的矩阵 M，表示班级中学生之间的朋友关系。如果`M[i][j] = 1`，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。

 

示例 1：
```
输入：
[[1,1,0],
 [1,1,0],
 [0,0,1]]
输出：2 
解释：已知学生 0 和学生 1 互为朋友，他们在一个朋友圈。
第2个学生自己在一个朋友圈。所以返回 2 。
```

示例 2：
```
输入：
[[1,1,0],
 [1,1,1],
 [0,1,1]]
输出：1
解释：已知学生 0 和学生 1 互为朋友，学生 1 和学生 2 互为朋友，所以学生 0 和学生 2 也是朋友，所以他们三个在一个朋友圈，返回 1 。
```

提示：

* 1 <= N <= 200
* `M[i][i] == 1`
* `M[i][j] == M[j][i]`

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/friend-circles
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：并查集
### 思路
* 遍历整个二维数组，如果元素(即位置)的值为 1，则将其与`相邻四个方向`上的 1 在并查集中进行合并，即将所有有关系的同学进行`连通`，结果即为`连通分量的数目`

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
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function (M) {
    if (!M || M.length == 0) {
        return 0;
    }

    const n = M.length;
    const uf = new UF(n);

    // 连通所有的同学
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (M[i][j] == 1 && i != j) {
                uf.union(i, j);
            }
        }
    }

    // 连通分量即为结果
    return uf.getCount();
};

const M = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
];

console.log(findCircleNum(M)); // 2

```

### 复杂度
* 时间复杂度O(n^2)
* 空间复杂度O(n)，n为parent大小