/**
 * 337. 打家劫舍 III
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob1 = function (root) {
    const map = new Map();
    this.dp = function (root) {
        if (root == null) {
            return 0;
        }
        // 备忘录消除重复子问题
        if (map.has(root)) {
            return map.get(root);
        }

        // 抢，然后去下下家 
        let do_it = root.val
            + (root.left == null
                ? 0
                : this.dp(root.left.left) + this.dp(root.left.right))
            + (root.right == null
                ? 0
                : this.dp(root.right.left) + this.dp(root.right.right));

        // console.log(do_it);

        // 不抢，然后去下家 
        let not_do = this.dp(root.left) + this.dp(root.right);

        let res = Math.max(do_it, not_do);
        // console.log(res);

        map.set(root, res);
        // console.log(map);
        return res;
    }
    // console.log(this.dp(root));

    return this.dp(root);
};

let root = new TreeNode(3);
let node1 = new TreeNode(2);
let node2 = new TreeNode(3);
root.left = node1;
root.right = node2;
node1.left = null;
node1.right = 3;
node2.left = null;
node2.right = 1;

console.log(rob1(root)); // 7  因为3 + 3 + 1 = 7


var rob2 = function (root) {
    // 返回⼀个⼤⼩为 2 的数组 arr 
    // arr[0] 表⽰不抢 root 的话，得到的最⼤钱数
    // arr[1] 表⽰抢 root 的话，得到的最⼤钱数
    this.dp = function (root) {
        if (root == null) {
            return [0, 0];
        }

        let left = this.dp(root.left);
        let right = this.dp(root.right);

        // 抢，下家就不能抢了
        let do_it = root.val + left[0] + right[0];
        // 不抢，下家可抢可不抢，取决于收益⼤⼩
        let not_do_it = Math.max(left[0], left[1])
            + Math.max(right[0], right[1]);
        return [not_do_it, do_it];
    }

    let res = this.dp(root);
    return Math.max(res[0], res[1]);
};

console.log(rob2(root)); // 7  因为3 + 3 + 1 = 7
