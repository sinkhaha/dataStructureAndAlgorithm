/**
 * 剑指 Offer II 055. 二叉搜索树迭代器
 * 中等
 * https://leetcode.cn/problems/kTOapQ/
 * 
 * 解法：栈、中序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 中序遍历的迭代器
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
    this.arr = [];
    this.inorderTraversal(root, this.arr); // 先对树进行中序遍历

    this.idx = 0;
};

/**
 * 指针右移，返回指针指向的数字
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    return this.arr[this.idx++];
};

/**
 * 指针右侧存在数字则返回true,否则返回false
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.idx < this.arr.length;
};

// 中序遍历
BSTIterator.prototype.inorderTraversal = function (root, arr) {
    if (!root) {
        return;
    }

    this.inorderTraversal(root.left, arr);
    arr.push(root.val);
    this.inorderTraversal(root.right, arr);
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */