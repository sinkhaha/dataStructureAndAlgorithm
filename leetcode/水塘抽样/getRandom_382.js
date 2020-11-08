/**
 * 382 链表随机节点
 * 
 * 中等
 * 
 * 水塘抽样算法
 * 
 * 类似算法还有398题
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param head The linked list's head.
        Note that the head is guaranteed to be not null, so it contains at least one node.
 * @param {ListNode} head
 */
var Solution = function (head) {
    this.head = head;
};

/**
 * 返回链表中随机的一个节点
 * 
 * 随机：第 i 个元素最终被选中的概率是 1/n
 * 
 * 当遇到第 i 个元素时，应该有 1/i 的概率选择该元素，1 - 1/i 的概率保持原有的选择
 * 
 * 第 i 个元素被选择的概率是 1/i，第 i+1 次不被替换的概率是 1 - 1/(i+1)，
 * 以此类推，相乘就是第 i 个元素最终被选中的概率，就是 1/n。
 * 
 * @return {number}
 */
Solution.prototype.getRandom = function () {
    let i = 0;
    let res = 0;
    let p = this.head;

    while (p != null) {
        // 生成一个 [0, i) 之间的整数，这个整数等于 0 的概率就是 1/i
        i++;
        if (parseInt(Math.random() * i) == 0) {
            res = p.val;
        }
        p = p.next;
    }
    return res;
};

/**
 * 扩展
 * 返回链表中 k 个随机节点的值
 * @param {*} k 
 */
Solution.prototype.getRandomK = function (k) {
    let res = new Array(k);
    let p = this.head;

     // 前 k 个元素先默认选上
     for (let j = 0; j < k && p != null; j++) {
        res[j] = p.val;
        p = p.next;
    }

    let i = k;
    while (p != null) {
        // 生成一个 [0, i) 之间的整数，这个整数等于 0 的概率就是 1/i
        i++;
        let j = parseInt(Math.random() * i);
        // 这个整数小于 k 的概率就是 k/i
        if (j < k) {
            res[j] = p.val;
        }
        p = p.next;
    }
    return res;
};

// TODO
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
var obj = new Solution(head);
var param_1 = obj.getRandom();
console.log(param_1);
var param_2 = obj.getRandom(2)
console.log(param_2);

