/**
 * 输出100以内的素数
 */
function suShu() {
  let arr = [];
  for (let i = 2; i <= 100; i++) {
    let isSuShu = true;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        isSuShu = false;
        break;
      }
    }
    if (isSuShu) arr.push(i);
  }
  return arr;
}
console.log(suShu());
