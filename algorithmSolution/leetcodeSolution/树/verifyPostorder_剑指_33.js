/**
 * 剑指 Offer 33. 二叉搜索树的后序遍历序列
 * 中等
 * https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
 * 
 * 解法：后序遍历 + dfs
 * 
 * 时间O(N^2) 
 * 空间O(N)
 */
/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function (postorder) {
    // 二叉搜索树 根节点值>左节点值，右节点值>根节点值
    // 后序遍历是 左->右->根
    //
    // 递归分治
    // 1、先在[i, j]区间先找到根节点，初始的区间就是[0, postorder.length-1]，然后把到该根节点的左右子树的值，即划分左右子树区间，判断左子树的值是否小于根节点 且 右子树的值大于根节点。
    // 2、怎么找到左子树区间：从i开始遍历到第一个大于根节点的值时停下，假设此时为m执行第1个大于根节点的值，则[i,m)为左子树的区间
    // 3、怎么划分右子树区间：从第2步的m开始遍历，遍历到值不大于j的值停下，如果此时m等于j，说明[m, j - 1]区间的值都大于根节点的值，说明此时符合二叉搜索树的后序遍历性质
    // 4、递归，分别对第2步的[i, m)左子树 和 第3步的[m, j - 1]右子树循环1、2、3步骤
    // 
    return dfs(postorder, 0, postorder.length - 1);
};

let dfs = function (postorder, i, j) {
    if (i >= j) { // 子树数量小于等于1，直接返回true
        return true;
    }
    const rootVal = postorder[j];

    let p = i;
    while (postorder[p] < rootVal) {
        p++;
    }

    // 保留下 右子树区间第一个值 的位置
    let m = p;

    while (postorder[p] > rootVal) {
        p++;
    }

    return p == j && dfs(postorder, i, m - 1) && dfs(postorder, m, j - 1);
}