/**
 * 341. 扁平化嵌套列表迭代器
 * 中等
 * https://leetcode.cn/problems/flatten-nested-list-iterator/
 * 
 * 解法：dfs
 */
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function (nestedList) {
    // 参考官方 深度优先遍历
    vals = [];

    const dfs = (nestedList) => {
        for (const nest of nestedList) {
            if (nest.isInteger()) {
                vals.push(nest.getInteger());
            } else {
                dfs(nest.getList());
            }
        }
    }

    dfs(nestedList);
};

NestedIterator.prototype.hasNext = function () {
    return vals.length > 0;
};

NestedIterator.prototype.next = function () {
    const val = vals[0];
    vals = vals.slice(1);
    return val;
};