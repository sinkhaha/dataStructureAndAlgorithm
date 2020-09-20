/**
 * kmp算法类
 */
class KMP {
    constructor(pat) {
        this.pat = pat;
        let M = pat.length;
        // dp[状态][字符] = 下个状态  M行256列
        this.dp = [];
        for (let i = 0; i < M; i++) {
            this.dp[i] = [];
            for (let j = 0; j < 256; j++) {
                this.dp[i][j] = 0;
            }
        }
        // console.log(this.dp);

        // base case 
        this.dp[0][pat.charCodeAt(0)] = 1;

        // 影⼦状态 X 初始为 0 
        let X = 0;
        // 构建状态转移
        for (let j = 1; j < M; j++) {
            for (let c = 0; c < 256; c++) {
                this.dp[j][c] = this.dp[X][c];
            }

            this.dp[j][pat.charCodeAt(j)] = j + 1;
            // 更新影⼦状态 
            X = this.dp[X][pat.charCodeAt(j)];
        }
        console.log(this.dp);
    }

    /**
     * 查找函数
     * @param {*} txt 
     */
    search(txt) {
        let M = this.pat.length;
        let N = txt.length;

        // pat 的初始态为 0
        let j = 0;
        for (let i = 0; i < N; i++) {
            // 计算 pat 的下⼀个状态
            j = this.dp[j][txt.charCodeAt(i)];
            // 到达终⽌态，返回结果 
            if (j == M) {
                return i - M + 1;
            }
        }
        // 没到达终⽌态，匹配失败
        return -1;
    }
}

module.exports = KMP;
