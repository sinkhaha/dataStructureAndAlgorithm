/**
 * leetcode 98. 验证二叉搜索树
 * 中等
 * 
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树
 * 
 */

/**
 * 节点类
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 解法1: 利用中序遍历的特性，遍历后的数组是递增的
 * 
 * 时间复杂度O(N),N为节点的个数
 * 空间复杂度O(N)
 * 
 * @param {*} root 
 */
var isValidBST1 = function (root) {
    if (root == null) {
        return true;
    }

    let result = [];

    // 中序遍历
    this.inOrder = function (root) {
        if (root == null) {
            return;
        }
        inOrder(root.left);
        result.push(root.val);
        inOrder(root.right);
    }

    inOrder(root);

    for (let i = 1; i < result.length; i++) {
        if (result[i] <= result[i - 1]) {
            return false;
        }
    }
    return true;
};

/**
 * 解法2: 也是利用中序遍历的特性，是解法1的优化，优化了空间，只使用前驱节点左存储
 * 
 * 时间复杂度O(N),N为节点的个数
 * 空间复杂度O(1)
 * 
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST2 = function (root) {
    if (root == null) {
        return true;
    }

    // 前继节点
    this.pre = null;

    this.inOrder = function (root) {
        if (root == null) {
            return true;
        }

        const rst = inOrder(root.left);

        // 在中序遍历位置操作
        if (rst == false) {
            return false;
        }
        // 前继节点大于当前节点, 即不是递增的
        if (this.pre && (this.pre.val >= root.val)) {
            return false;
        }
        this.pre = root;

        return inOrder(root.right);
    }

    return inOrder(root);
};


/**
 * 解法3: 递归实现
 * 
 * 左子树都小于根节点
 * 右子树都大于根节点
 * 
 * @param {*} root 
 */
var isValidBST3 = function (root) {
    if (root == null) {
        return true;
    }

    // 当前节点在 min和max之间
    this.isValid = function (root, min, max) {
        if (root == null) {
            return true;
        }
        if (min != null && root.val <= min) {
            return false;
        }
        if (max != null && root.val >= max) {
            return false;
        }

        // 检查左子树 和 检查右子树
        // 所以左子树的节点小于root.val, 右子树的节点大于roo.val
        return this.isValid(root.left, min, root.val)
            && this.isValid(root.right, root.val, max);
    }

    return this.isValid(root, null, null);
}


function test() {
    const root = new TreeNode(2);
    const node1 = new TreeNode(1);
    const node2 = new TreeNode(3);
    root.left = node1;
    root.right = node2;

    console.log(isValidBST1(root));
    console.log(isValidBST2(root));
    console.log(isValidBST3(root));
}
test();
