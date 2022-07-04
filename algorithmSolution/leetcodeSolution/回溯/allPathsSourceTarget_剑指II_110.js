/**
 * 剑指 Offer II 110. 所有路径
 * 中等
 * https://leetcode.cn/problems/bP4bmD/
 * 
 * 解法：深度优先搜索
 * 
 * 时间O(n * 2^n)
 * 空间O(n)
 */
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const dfs = (graph, x, n) => {
        if (x === n) {
            ans.push(stack.slice());
            return;
        }
        for (const y of graph[x]) {
            stack.push(y);
            dfs(graph, y, n);
            stack.pop();
        }
    }

    const stack = [];
    const ans = [];
    stack.push(0);

    dfs(graph, 0, graph.length - 1);

    return ans;
};