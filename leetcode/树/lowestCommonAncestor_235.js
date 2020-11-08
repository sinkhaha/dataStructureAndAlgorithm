/**
 * 235. 二叉搜索树的最近公共祖先
 * 
 * 跟236题的区别是这个是二叉搜索树，235也可以用236的解法
 * 
 * 简单 
 * 
 */

 /**
  * 节点类
  * @param {*} val 
  */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 
 * 递归解法
 * 
 * 利用二叉搜索树，左子树 < 根 ，根 > 右 的特性
 * 
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root == null) {
        return null;
    }
    
    if (root == p || root == q) {
        return root;
    }

    // p 和 q 都小于root, 那p和q都在左子树
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    }

    // p 和 q 都大于root, 那p和q都在右子树
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }

    return root;
};

/**
 * 同种思路，另一种不是递归的写法
 * @param {*} root 
 * @param {*} p 
 * @param {*} q 
 */
var lowestCommonAncestor2 = function(root, p, q) {
    while(root !== null) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right
        } else {
            return root;
        }
    }
}

function test() {
    const root = new TreeNode(6);
    const node1 = new TreeNode(2);
    const node2 = new TreeNode(8);
    root.left = node1;
    root.right = node2;

    const node3 = new TreeNode(0);
    const node4 = new TreeNode(4);
    node1.left = node3;
    node1.right = node4;

    const node5 = new TreeNode(7);
    const node6 = new TreeNode(9);
    node2.left = node5;
    node2.right = node6;

    const node7 = new TreeNode(3);
    const node8 = new TreeNode(5);
    node4.left = node7;
    node4.right = node8;
  
    console.log(lowestCommonAncestor(root, 2, 8).val);
    console.log(lowestCommonAncestor2(root, 2, 8).val);
}
test();
