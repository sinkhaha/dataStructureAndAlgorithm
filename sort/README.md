## 排序算法
* [冒泡排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/bubbleSort.js)
  
* [直接插入排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/directInsertSort.js)
  
* [桶排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/bucketSort.js)
  
* [计数排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/countingSort.js)
  
* [归并排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/mergeSort.js)
  
* [快速排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/quickSort.js)
  
* [希尔排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/shellSort.js)
  
* [简单选择排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/simpleSelectSort.js)

* [堆排序](https://github.com/sinkhaha/dataStructureAndAlgorithm/blob/master/sort/heapSort.js)


### 排序的稳定性
如果排序的数组中两个相等的数，假设用算法A进行排序后，两个相等的数的前后顺序不会变，则算法A是稳定的，否则算法A不稳定

**不稳定的排序算法口诀: `快些选一堆`**
>快速排序（快）
>希尔排序（些）
>选择排序（选）
>堆排序（一堆）

## 应用
* 当排序基数n比较小时，可采用`直接插入排序`和`选择排序`
* 若n较大，则应采用时间复杂度为`O(nlgn)`的排序方法：`快速排序`、`堆排序`或`归并排序`

1. 快速排序
>是经常用到的一种排序，应用场景是`大规模的数据排序`，快排适合随机分布
杂乱无章的数据，快排的平均时间最短

2. 归并排序
>若要求排序稳定，则可选用归并排序

3. 堆排序
>适合优先队列（在N个元素中选出前K名，TopK问题），适合大数据，在数据量特别大的时候效果明显

4. 希尔排序
>适用于大型数组
希尔排序是对直接插入排序的一种优化，希尔排序比插入排序和选择排序要快的多，并且数组越大，优势越大
