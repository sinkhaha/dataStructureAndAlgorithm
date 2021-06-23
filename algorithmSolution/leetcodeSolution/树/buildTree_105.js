/**
 * 105. 从前序与中序遍历序列构造二叉树
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 递归
 * 
 * 怎么找根节点：
 * 前序遍历的第一个值preorder[0]就是根节点的值
 * 
 * 关键：
 * 如何通过根节点的值，将preorder和postorder数组划分成两半，构造根节点的左右子树？
 * 
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
};

function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {
    if (preStart > preEnd) {
        return null;
    }

    // 前序遍历的第一个值preorder[0]就是根节点的值
    let rootVal = preorder[preStart];

    // 在中序遍历中找根节点的索引
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
    tree.left =  build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
    tree.right = build(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
    
    return tree;
}

const preorder = [3,9,20,15,7];
const inorder = [9,3,15,20,7];
console.log(buildTree(preorder, inorder));
