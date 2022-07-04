/**
 * 剑指 Offer II 118. 多余的边
 * 中等
 * https://leetcode.cn/problems/7LpjUW/
 * 
 * 解法：并查集
 * 
 * 时间O(nlogn)
 * 空间O(n)
 */
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const parent = new Array(n + 1).fill(0).map((value, index) => index);

    for (let i = 0; i < n; i++) {
        const edge = edges[i];
        const node1 = edge[0], node2 = edge[1];
        if (find(parent, node1) != find(parent, node2)) {
            union(parent, node1, node2);
        } else {
            return edge;
        }
    }

    return [0];
};

const union = (parent, index1, index2) => {
    parent[find(parent, index1)] = find(parent, index2);
}

const find = (parent, index) => {
    if (parent[index] !== index) {
        parent[index] = find(parent, parent[index]);
    }
    return parent[index];
};