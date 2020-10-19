/**
 * 111. 二叉树的最小深度
 * 
 * 简单
 * 
 * 解法：BFS
 * bfs本质是在一个图中找到从起点start到终点target的最近距离
 * 
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
 * 广度优先
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root == null) {
        return 0;
    }

    // 队列
    const q = [root];

    // root本身是一层，depth 初始化为 1
    let depth = 1;
    while (q.length !== 0) {
        let n = q.length;
        // 将当前队列中的所有节点向四周扩散
        for (let i = 0; i < n; i++) {
            // 删除队头的元素
            const curNode = q.shift();

            // 判断是否到达终点
            if (curNode.left == null && curNode.right == null) {
                return depth;
            }
            //  将相邻节点加入队列
            if (curNode.left != null) {
                q.push(curNode.left);
            }
            if (curNode.right != null) {
                q.push(curNode.right);
            }
            // console.log(q);
        }
        depth++;
    }
    return depth;
};

/**
 * 递归解法
 * @param {*} root 
 */
var minDepth2 = function(root) {
    if (root == null) {
        return 0;
    }

    // 分别递归求左右子树的深度
    let left = minDepth2(root.left);
    let right = minDepth2(root.right);
    // left为0表示左子树为空，此时不需要和右子树比较大小，
    return (left == 0 || right == 0)
        ? left + right + 1
        : Math.min(left, right) + 1;
}

const root = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
root.left = node2;
root.right = node3;
node2.left = node4;
node3.right = node5;
console.log(minDepth(root)); // 3
console.log(minDepth2(root)); // 3
