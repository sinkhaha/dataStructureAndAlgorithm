/**
 * 210. 课程表 II
 * 中等
 * https://leetcode.cn/problems/course-schedule-ii/
 * 
 * 解法：拓扑排序
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {

    // 求“后完成的课”的初始入度值
    // 维护在“先完成的课”的后面的后续要完成的所有课
    // 循环选入度为0的课

    let indegree = new Array(numCourses).fill(0); // 标记某门课的入度
    const coursesAfterMap = {}; // key是课号；value是排在key这门课后面的所有课，是数组形式

    for (let item of prerequisites) {
        indegree[item[0]]++;

        if (coursesAfterMap[item[1]]) {
            coursesAfterMap[item[1]].push(item[0]);
        } else {
            coursesAfterMap[item[1]] = [item[0]];
        }
    }

    let queueOfIndegreeIsZero = []; // 入度为0的课号
    for (let i = 0; i < indegree.length; i++) {
        if (indegree[i] == 0) {
            queueOfIndegreeIsZero.push(i);
        }
    }

    let result = [];
    while (queueOfIndegreeIsZero.length) {
        // 选择了一门入度为0的课
        const selected = queueOfIndegreeIsZero.shift();
        result.push(selected);

        const afterArr = coursesAfterMap[selected];
        if (afterArr && afterArr.length) {
            for (let item of afterArr) {
                indegree[item]--;
                if (indegree[item] == 0) {
                    queueOfIndegreeIsZero.push(item);
                }
            }
        }
    }


    return result.length == numCourses ? result : [];
};