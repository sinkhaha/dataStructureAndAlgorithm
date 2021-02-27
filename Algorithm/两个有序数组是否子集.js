/**
 * 
 * 判断无序数组arr2是否是arr1的子集
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 */
function isChild(arr1, arr2) {
    let n1 = arr1.length;
    let n2 = arr2.length;

    // 排序
    arr1.sort();
    arr2.sort();

    // 双指针
    let i = 0;
    let j = 0;
    while (i < n1 && j < n2) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr1[i] === arr2[j]) {
            i++;
            j++;
        } else if (arr1[i] > arr2[j]) {
            return false;
        }
    }

    if (j < n2) {
        return false;
    } else {
        return true;
    }
}

console.log(isChild([1, 4, 3, 6, 7], [2, 3])); // false
console.log(isChild([1, 4, 3, 6, 7], [1, 3])); // true