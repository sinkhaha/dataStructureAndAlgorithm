/**
 * 96. 不同的二叉搜索树
 * 中等
 * https://leetcode.cn/problems/unique-binary-search-trees/
 * 
 * 解法：递归
 * 参考 https://leetcode.cn/problems/unique-binary-search-trees/solution/a-qiu-javadi-gui-jie-fa-by-emeraki-qi2d/
 *
 */
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    // 二叉搜索树的中序遍历是递增的
    // 题目可以转换为求“1到n”的递增序列[1...n]，分别以每个元素为二叉树根节点，能构造出多少个二叉搜索树

    // 以nums = [1,2,3,4,5,6,7]为例，当root根节点是5时，其左边有4个节点(1、2、3、4)，右边有2个节点(6、7)， 对于左边的4个节点，假设能延伸出n种二叉搜索树子树，对于右边的2个节点，假设能延伸出m种二叉搜索树子树。则以5为root节点时的二叉搜索树总数为 m*n

    // 没有节点或只有1个节点，则只有一个子树
    if (n == 0 || n == 1) {
        return 1;
    }

    let count = 0;
    for (let i = 1; i <= n; i++) {
        //当用i这个节点当做根节点时

        // 左边有多少种子树
        let leftNum = numTrees(i - 1);

        // 右边有多少种子树
        let rightNum = numTrees(n - i);

        count = count + leftNum * rightNum;
    }

    return count;
};