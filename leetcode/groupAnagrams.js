/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if (strs.length === 0) {
        return [];
    }
    let strMap = {};
    for (let str of strs) {
        const strArr = str.split('');
        strArr.sort();
        const key = strArr.join('');
        const value = strMap[key];
        if (value === undefined) {
            strMap[key] = [ str ];
        } else {
            value.push(str);
            strMap[key] = value;
        }
    }
    return Object.values(strMap);
};
