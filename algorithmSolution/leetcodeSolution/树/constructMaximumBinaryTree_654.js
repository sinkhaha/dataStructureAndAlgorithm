/**
 * 654 最大二叉树
 * 中等
 * https://leetcode-cn.com/problems/maximum-binary-tree/
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 
 * 对每个根节点，只需要找到当前nums中的最大值和对应的索引，然后递归调用左右数组构造左右子树即可
 * 
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    let n = nums.length;
    if (n === 0) {
        return null;
    }
    return buildTree(nums, 0, n - 1);
};

function buildTree(nums, low, high) {
    if (low > high) {
        return null;
    }

    // 最大值的索引
    let index = -1;

    // 找出最大值
    let maxVal = Number.MIN_SAFE_INTEGER;
    for (let i = low; i <= high; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
            index = i;
        }
    }

    let tree = new TreeNode(maxVal);
    // 递归构造左右子树
    tree.left = buildTree(nums, low, index - 1);
    tree.right = buildTree(nums, index + 1, high);
    return tree;
}

const nums = [3, 2, 1, 6, 0, 5];
console.log(constructMaximumBinaryTree(nums));
