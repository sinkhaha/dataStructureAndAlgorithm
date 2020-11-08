/**
 * 297. 二叉树的序列化与反序列化
 * 
 * 困难
 * 
 * 前序遍历解法：遍历后的列表第一个元素是root
 * 
 * 也可以用后序遍历解法：遍历后的列表最后一个元素是root
 * 
 * 不可用中序遍历，无法实现反序列化操作
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 *
 * 把一棵二叉树序列化成字符串
 * 
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let res = [];
    let NULL_STR = '#';
    this.mySerialize = function(root) {
        if (root == null) {
            res.push(NULL_STR);
            return;
        }
        
        // 前序遍历的位置
        res.push(root.val);
        
        this.mySerialize(root.left);
        this.mySerialize(root.right);
    }

    this.mySerialize(root);
    return res.join(',');
};

/**
 * 
 * 把字符串反序列化成二叉树
 * 
 * 一般只有前序遍历结果是不能还原二叉树结构的，
 * 因为缺少空指针的信息，至少要得到前、中、后序遍历中的两种才能还原二叉树。
 * 但这里的前序遍历结果列表包含空指针信息，所以也可以还原二叉树：
 * 
 * 先确定根节点 root，然后遵循前序遍历的规则，递归生成左右子树，
 * 结果列表的第一个元素就是根节点
 * 
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let NULL_STR = '#';

    const nodeList = data.split(',');
    this.myDeserialize = function(nodeList) {
        if (nodeList.length === 0) {
            return null;
        }
        
        // 前序遍历位置
        // 重点：列表最左侧就是根节点
        const first = nodeList.shift();
        if (first == NULL_STR) {
            return null;
        }

        const root = new TreeNode(+first);

        root.left = this.myDeserialize(nodeList);
        root.right = this.myDeserialize(nodeList);

        return root;
    }
    return this.myDeserialize(nodeList);
};

const root = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
root.left = node2;
root.right = node3;
node3.left = node4;
node3.right = node5;

console.log(root);

const data = serialize(root);
console.log(data);

const origin = deserialize(data);
console.log(origin);
