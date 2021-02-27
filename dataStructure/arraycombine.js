/**
 * 
 * @param {*} arr 
 */
function arrayCombine(arr) {
  let arr1 = [];//存放子数组长度
  let arr2 = [];//存放临时数组长度
  let result = [];//存放结果
  let num = 1;//获取所有情况

  for (let i = 0; i < arr.length; i++) { //获取数组信息
    arr1.push(arr[i].length);
    arr2.push(0);
    num = num * arr[i].length;
  }

  let str = '';
  for (let k = 0; k < num; k++) { //获取排列组合
    let num1 = k;
    str = '';
    for (let j = 0; j < arr.length; j++) {
      arr2[j] = num1 % arr1[j];//获取当前数组的元素
      str = str + arr[j][arr2[j]];//获取当前情况的元素
      num1 = parseInt(num1 / arr1[j]);//获取下一个数组的值
    }
    result.push(str);
  }
  return result;
}

let arr = [['a', '0'], ['b', '1'], ['c', '2']];
console.log(arrayCombine(arr));
// 输出如下
// [
//   'abc', '0bc',
//   'a1c', '01c',
//   'ab2', '0b2',
//   'a12', '012'
// ]