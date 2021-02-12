/**
 * leetcode 653 两数之和 --- 输入是二叉查找树BST，不是数组 findTarget
 * 
 * 题目：
 * 给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和
 * 等于给定的目标结果，则返回 true
 *
 * 思路：先中序遍历二叉查找树，得到一个有序数组，用双指针解决
 */

/**
  * 树的节点类
  * @param {*} val 
  */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * n 是树中节点的数量
 * 
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
function findTarget(root, k) {
    if (root == null) {
        return false;
    }

    // 中序遍历结果，从小到大排序
    let bstNums = [];
    inOrderTraverse(root, bstNums);

    console.log(bstNums);

    // 和167解法类似，双指针
    let low = 0;
    let high = bstNums.length - 1;
    while (low < high) {
        const sum = bstNums[low] + bstNums[high];
        console.log(`${low} ${high} ${sum}`);
        if (sum > target) {
            high--;
        } else if (sum < target) {
            low++;
        } else {
            return true;
        }
    }

    return false;
};

/**
 * 中序遍历树
 * @param {*} root 
 */
function inOrderTraverse(root, bstNums) {
    if (root != null) {
        inOrderTraverse(root.left, bstNums);
        bstNums.push(root.val);
        inOrderTraverse(root.right, bstNums);
    }
}

// 手动构造树
// const root = new TreeNode(5);
// const node2 = new TreeNode(3);
// const node3 = new TreeNode(6);
// const node4 = new TreeNode(2);
// const node5 = new TreeNode(4);
// const node6 = new TreeNode(7);

const root = new TreeNode(2);
const node2 = new TreeNode(1);
const node3 = new TreeNode(3);
root.left = node2;
root.right = node3;
// node2.left = node4;
// node2.right = node5;
// node3.right = node6;

const target = 3;
console.log(findTarget(root, target));
