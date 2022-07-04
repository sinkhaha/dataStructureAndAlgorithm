/**
 * 剑指 Offer II 043. 往完全二叉树添加节点
 * 中等
 * https://leetcode.cn/problems/NaqhDT/
 * 
 * 解法：bfs
 * 
 * 参考 https://leetcode.cn/problems/NaqhDT/solution/xiao-lu-you-hua-de-fang-shi-dui-lie-zhon-vfii/
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
 * 
 * @param {TreeNode} root
 */
var CBTInserter = function (root) {

    // 可以每次在完全二叉树中按照广度优先搜索的顺序找出第1个需要被插入节点的元素，如果它没有左节点，则新节点作为它的左节点，如果它没有右节点，则新节点作为它的右节点
    // 初始化时只把根节点插入到队列，第一次执行插入时才去准备好队列中元素，即根据根节点，依次插入根节点的左右子节点，然后判断是否是在此节点下进行插入新节点；凡是有左右子节点的节点就可以从队列中移除，避免下一次插入的时再重新判断一遍，也为了节省空间
    this.root = root;
    this.queue = [root]; // 初始时把根节点放入
}
/** 
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function (v) {
    let newNode = new TreeNode(v);

    // 如果当前节点具备左右子节点，说明当前节点不可能作为新节点的父节点，只能是当前节点的左右子节点作为新节点的父节点
    while (this.queue[0].left && this.queue[0].right) {
        this.queue.push(this.queue[0].left);
        this.queue.push(this.queue[0].right);
        this.queue.shift(); // 既然当前节点不可能作为新节点的父节点，则可以把当前节点从队列移除
    }

    // 如果没有左节点，就当成它的左节点，没有右节点则当成右节点
    this.queue[0].left == null
        ? (this.queue[0].left = newNode)
        : (this.queue[0].right = newNode);

    return this.queue[0].val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
    return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */