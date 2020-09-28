/**
 * 106 从中序与后序遍历序列构造二叉树
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 
 * 找根节点：
 * 后序遍历的最后一个值preorder[0]就是根节点的值
 * 
 * 关键：
 * 在于如何通过根节点的值，将inorder和postorder数组划分成两半，构造根节点的左右子树？
 * 
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1);
};

function build(inorder, inStart, inEnd, postorder, postStart, postEnd) {
    if (inStart > inEnd) {
        return null;
    }

    let rootVal = postorder[postEnd];
    // 中序遍历中根节点的索引
    let index = 0;
    for (let i = inStart; i <= inEnd; i++) {
        if (inorder[i] === rootVal) {
            index = i;
            break;
        }
    }

    // 左子树的节点数
    let leftSize = index - inStart;
 
    let tree = new TreeNode(rootVal);
    // 递归构造左右子树 难点
    tree.left = build(inorder, inStart, index - 1, postorder, postStart, postStart + leftSize - 1);
    tree.right = build(inorder, index + 1, inEnd, postorder, postStart + leftSize, postEnd - 1);
    return tree;
}

// TODO
const inorder = [9, 3, 15, 20, 7]
const postorder = [9, 15, 7, 20, 3]
console.log(buildTree(inorder, postorder));
