/**
 * 区间计算问题
 * 计算一个用户一个月共交多少元
 * x为每月累计订单数，花费是指每笔订单花费
 * 
 * 1 <= x <= 5, 花费30
 * 6 <= x <= 20, 花费15元
 * 21 <= x <= 50, 花费10元
 * 51 <= x <= 100, 花费9元
 * 101 <= x <= 500, 花费8元
 * 501 <= x <= 1000, 花费7元
 * 1001 <= x <= 2000, 花费6元
 * 2001 <= x <= 4000, 花费5元
 * 2001 <= x <= 4000, 花费4元
 * 4001 <= x <= 5000, 花费3元
 * 5001 <= x <= 6000, 花费3元
 * 6001 <= x, 花费1元
 * 
 * 如果x为30，则共花费 
 * 梯度1的花费(5 * 30) + 梯度2的花费(15 * 15) + 梯度3的花费(10 * 10)
 * 即5 * 30 + 15 * 15 + 10 * 10 = 150 + 225 + 100 = 475
 * 
 * @param {*} count 
 */
function orderCal(count) {
    if (count < 1) {
        return 0;
    }

    const allCounts = [5, 20, 50, 100, 500, 1000, 2000,
        3000, 4000, 5000, 6000, 6001];
    const costs = [30, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const maxCount = allCounts.pop();

    let beyondCount = count - maxCount;
    let priceRet = (beyondCount >= 0 ? beyondCount : 0) * costs.pop();

    let except = 0;
    for (let index in allCounts) {
        const curCount = allCounts[index];
        const curCost = costs[index];
        if (count <= curCount) {
            priceRet += (count - except) * curCost;
            return priceRet;
        } else {
            priceRet += (curCount - except) * curCost;
        }
        except = curCount;
    }

    return priceRet;
}

// 30 * 5 + 1 * 15 = 165
console.log(orderCal(6)); 
// 5 * 30 + 15 * 15 + 1 * 10 = 150 + 225 + 10 = 385
console.log(orderCal(21)); 
// 5 * 30 + 15 * 15 + 10 * 10 = 150 + 225 + 100 = 475
console.log(orderCal(30));
