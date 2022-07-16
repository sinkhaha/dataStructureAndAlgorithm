/**
 * 剑指 Offer II 106. 二分图
 * 中等
 * 
 * https://leetcode.cn/problems/vEAB3K/
 * 
 * 解法：dfs
 * 
 * 参考题解 https://leetcode.cn/problems/vEAB3K/solution/tu-jie-er-fen-tu-si-lu-tong-su-yi-dong-z-ayw1/
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {

    // DFS 遍历框架
    const traverse = (graph, v) => {
        // 如果已经确定不是二分图了，就不用浪费时间再递归遍历了
        if (!ok) return;
        visited[v] = true;
        for (let w of graph[v]) {
            if (!visited[w]) {
                // 相邻节点 w 没有被访问过，那么应该给节点 w 涂上和节点 v 不同的颜色
                color[w] = !color[v];
                // 继续遍历 w
                traverse(graph, w);
            } else {
                // 相邻节点 w 已经被访问过，根据 v 和 w 的颜色判断是否是二分图
                if (color[w] == color[v]) {
                    ok = false;
                }
            }
        }
    };

    // 记录图是否符合二分图性质
    let ok = true;
    let n = graph.length;

    // 记录图中节点的颜色，false 和 true 代表两种不同颜色
    let color = new Array(n).fill(false);
    // 记录图中节点是否被访问过
    let visited = new Array(n).fill(false);

    // 因为图不一定是联通的，可能存在多个子图
    // 所以要把每个节点都作为起点进行一次遍历
    // 如果发现任何一个子图不是二分图，整幅图都不算二分图
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            traverse(graph, i);
        }
    }

    return ok;
};