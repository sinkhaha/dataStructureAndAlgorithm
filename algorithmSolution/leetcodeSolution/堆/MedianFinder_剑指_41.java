/**
 * 剑指 Offer 41. 数据流中的中位数
 * 困难
 * https://leetcode.cn/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/
 * 
 * 解法：大顶堆 + 小顶堆
 */
class MedianFinder {
    Queue<Integer> A, B;

    public MedianFinder() {
        A = new PriorityQueue<>((x, y) -> (y - x)); // 大顶堆，保存较小的一半，假设m个元素
        B = new PriorityQueue<>(); // 小顶堆，保存较大的一半，假设n个元素
    }

    public void addNum(int num) {
        // 原先是奇数，需向B添加一个元素。实现方法：将新元素num插入至A ，再将A堆顶元素插入至B
        if (B.size() != A.size()) {
            A.add(num);
            B.add(A.poll());
            // 原先是偶数，需要将加到大顶堆A中。实现：将新元素num先插入至B ，再将B堆顶元素插入至A，因为要保证插入A的元素一定是大于B堆的所有元素
        } else {
            B.add(num);
            A.add(B.poll());
        }
    }

    public double findMedian() {
        // 个数为奇数 则中位数为 大顶堆的堆顶元素；是偶数，则中位数为 (大顶堆+小顶堆)/2
        return B.size() != A.size()
                ? A.peek()
                : (B.peek() + A.peek()) / 2.0;
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */