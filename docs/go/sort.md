
#### 冒泡排序
 ``
 ``
 

#### 选择排序
#### 插入排序

#### 归并排序

    把两个已经有序的列表a和b合成一个有序列表c
    1.申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
    2.设定两个指针，最初位置分别为两个已经排序序列的起始位置；
    3.比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
    4.重复步骤 3 直到某一指针达到序列尾；
    5.将另一序列剩下的所有元素直接复制到合并序列尾。

  - 自顶向下(递归)

```go
package main

func mergeA(left, right []int) (ret []int) {
	for len(left) > 0 && len(right) > 0 {
		// 每次拿第一个元素比较
		if left[0] < right[0] {
			ret = append(ret, left[0])
			left = left[1:]
			continue
		}
		if left[0] >= right[0] {
			ret = append(ret, right[0])
			right = right[1:]
		}
	}

	// 右边的数据已经操作完成，遍历左边数据放到返回值中
	for len(left) > 0 {
		ret = append(ret, left[0])
		left = left[1:]
	}

	// 同上理
	for len(right) > 0 {
		ret = append(ret, right[0])
		right = right[1:]
	}
	return
}

func mergeSortA(arr []int) []int {
	l := len(arr)
	if l < 2 {
		return arr
	}
	mid := l / 2
	left := arr[0:mid]
	right := arr[mid:l]
	return mergeA(mergeSortA(left), mergeSortA(right))
}
```
  - 自低向上(非递归)
        

        原理： 先求出小问题的解，把它组合成较大问题的解
        给出一个输入的数组，把每个连续的元素合并成有序的，以长度为2开始执行；
        然后再合并长度到4,8,16,...,2的n次方进行合并，以此类推，直到整个数组完成排序

```go
package main

import "math"

func merge(arr []int, left, mid, right int) {
	var (
		temp = make([]int, right-left+1)
	)

	// 复制出来需要进行比较的数据
	for i, j := left, 0; i <= right; i++ {
		temp[j] = arr[i]
		j++
	}
	var (
		i = left    // 左半部分
		j = mid + 1 // 右半部分
	)
	for k := left; k <= right; k++ {
		if j > right { // 当右边的数据已经操作完左边的数据还有没有操作完毕的数据，直接把左边的数据继续塞进数组里面
			arr[k] = temp[i-left]
			i++
			continue
		}
		if i > mid { // 与上面同理
			arr[k] = temp[j-left]
			j++
			continue
		}
		if temp[i-left] < temp[j-left] {
			arr[k] = temp[i-left]
			i++
			continue
		}
		if temp[i-left] >= temp[j-left] {
			arr[k] = temp[j-left]
			j++
			continue
		}
	}
}

func mergeSort(arr []int) {
	length := len(arr)
	// size 每次需要进行操作的大小 1,2,4,8,16 ....
	for size := 1; size <= length; size += size {
		// //对[i,i+size-1]和[i+size,i+2*size-1]进行归并
		for i := 0; i+size < length; i += size * 2 {
			// arr left mid right  如果i+2*size>n了，越界了，就取length-1
			merge(arr, i, i+size-1,int( math.Min(float64(i+size*2-1),float64(length-1))))
		}
	}
}
 ```

#### 快速排序(递归)
  采用分治法把序列S分解成子序列，递归的排序每个子序列，然后通过简单的串联方式合并这些已经排序的子序列。

- 1. 从数列中挑出一个元素,称为 “基准”(pivot)
  2. 重新排序数列,所有元素比基准值小的摆放在基准前面,所有元素比基准值大的摆在基准的后面(相同的数可以到任一边).在这个分区退出之后,该基准就处于数列的中间位置.这个称为分区(partition)操作；
  3. 递归地(recursive)把小于基准值元素的子数列和大于基准值元素的子数列排序；
```go
package main

func quickSort(arr []int, left, right int) {
	if left < right {
		pivot := partition(arr, left, right)
		println("aaa", pivot)
		// 左边部分排序
		quickSort(arr, left, pivot-1)
		// 右边部分排序
		quickSort(arr, pivot+1, right)
	}
}

func partition(arr []int, left, right int) int {
	var (
		pivot = arr[left] // 基准值位置空缺
	)
	for left < right {
		// 充从left开始遍历到right位置，找到第一个小于基准值
		for left < right && pivot <= arr[right] {
			right--
		}
		// 填补基准值的位置空值 right值移动到基准值left位置 right位置值空缺(小的值往左移动)
		arr[left] = arr[right]

		// left指针值<=基准值
		for left < right && pivot >= arr[left] {
			left++
		}

		// 填补v1位置空缺值 left值移动到right位置 left位置空缺(大的值往右移动)
		arr[right] = arr[left]
	}
	// 基准值填补left位置
	arr[left] = pivot
	return left
}
```