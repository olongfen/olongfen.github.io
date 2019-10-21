## 环境搭建 
   - linux环境搭建
     1. 到[go语言中文网](https://studygolang.com/dl)下载对应的linux版本
     2. 解压下载的包到/usr/local下>>>>> sudo tar -xvf `下载的压缩包` -C /usr/local
     3. vim   ~/.bash_profile
     4. 添加`           export GOROOT=/data/bin/go
           export GOPATH=/data/gocode/
           export PATH=$GOROOT/bin:GOPATH/bin:$PATH
           export GO111MODULE=on```
     5. source    ~/.bash_profile
     6. go version
    
   - windows环境搭建
     1. 下载[go语言中文网](https://studygolang.com/dl) .msi文件
     2. 然后直接安装即可
     3. Win+r 输入cmd, go version

     
## 编辑器
   - vscode
    
   - goland     
   
##   go介绍
   
   - 主要特征
   

       1.自动立即回收。
       2.更丰富的内置类型。
       3.函数多返回值。
       4.错误处理。
       5.匿名函数和闭包。
       6.类型和接口。
       7.并发编程。
       8.反射。
       9.语言交互性
        
   - 命名规则 
   
       
           1. 首字符可以是任意的Unicode字符或者下划线
           2. 剩余字符可以是Unicode字符、下划线、数字
           3. 字符长度不限
           
   - 声明
        
        
        1. var(变量) var str string
        2. const(常量) const num = 10
        3. type(声明类型) type num int
        4. func(函数声明) func helloWorld() {} 

## go类型
    
   - 基本类型
   
    ` 这里列出一些常用的类型 `
    1. int, int8, int16, int32, int64
    2. bool
    3. float32, float64
    4. uint, uint8, uint16, uint32, uint64
    5. byte
    6. string
    7. complex64, complex128
    8. array 固定长度的数组
    9. struct 结构体
    10. interface 接口
   
   - 引用类型
   
   
     1. slice 序列数组
     2. map   映射
     3. chan  管道(go 最大特点之一) 
   
   - 内置函数 
   
     
      1. append  		-- 用来追加元素到数组、slice中,返回修改后的数组、slice
      2. close   		-- 主要用来关闭channel
      3. delete    		-- 从map中删除key对应的value
      4. panic    		-- 停止常规的goroutine  （panic和recover：用来做错误处理）
      5. recover 		-- 允许程序定义goroutine的panic动作
      6. imag    		-- 返回complex的实部   （complex、real imag：用于创建和操作复数）
      7. real    		-- 返回complex的虚部
      8. make    		-- 用来分配内存，返回Type本身(只能应用于slice, map, channel)
      9. new        		-- 用来分配内存，主要用来分配值类型，比如int、struct。返回指向Type的指针
      10. cap        		-- capacity是容量的意思，用于返回某个类型的最大容量（只能用于切片和 map）
      11. copy    		-- 用于复制和连接slice，返回复制的数目
      12. len        		-- 来求长度，比如string、array、slice、map、channel ，返回长度
      13. print、println 	-- 底层打印函数，在部署环境中建议使用 fmt 包     

## 类型运用
- 变量
         
         
    var 语句定义了一个变量的列表；跟函数的参数列表一样，类型在后面
         
    
    
```go
package main

import "fmt"

var name = "golang" //  全局变量,首写字母大写,其他.go文件可以访问, 全局变量不能用 name:="golang"

func main() {
	name1:= "golang"
	fmt.Println("hello:", name)
    fmt.Println(name1)
}

```                     
输出结果: 

    hello:golang
    golang


- 常量
常量的定义与变量类似，只不过使用 const 关键字，代表永远是只读的，不能修改

``` go
const name = "golang" // 常量不能使用 ":=" 语法定义。
```   

  枚举:
    
    iota，特殊常量，可以认为是一个可以被编译器修改的常量。
    在每一个const关键字出现时，被重置为0，然后再下一个const出现之前，每出现一次iota，其所代表的数字会自动增加1。
    关键字 iota 定义常量组中从 0 开始按行计数的自增枚举值。
  
```go
package main

import "fmt"

const  (
	a = iota
	b
	c
	d
	e
	f
) 

func main() {//
    fmt.Println(a,b,c,d,e,f)
    // 0,1,2,3,4,5
}

```    

- 基本类型运用

rune int32 的别名，代表一个Unicode码，用UTF-8 进行编码
```go
/*
rune 类型使用
例如需要遍 历字符串中的字符。可以循环每个字节（仅在使用US ASCII 编码字符串时与字符等价， 而它们在Go 中不存在！）。
因此为了获得实际的字符，需要使用rune 类型。
string rune byte 的关系
在Go当中 string底层是用byte数组存的，并且是不可以改变的*/
package main
import "fmt"
func main(){
	fmt.Println(len("Golang学习"))
	fmt.Println(len([]rune("Golang学习")))
}
// 输出 12 , 8
```  

数组: 是同一种数据类型的固定长度的序列

```go
/*
遍历数组之前判断数组的长度,不然则触发访问越界会panic
*/
package main
import "fmt"
func main() {
	var arr1 = [5] string{2:"hello",4:"golang"} // 定义数组长度为5,存类型为string的一维数组,然后给第三个index和第五个index赋值,不输入index默认从0开始
	for i,v:=range arr1{
		fmt.Println(i,v) // 0 ;1 ; 2 hello; 3 ;4 golang
	}
	var arr2 = [5]string{3:"go","hello",1:"one","two"}
	// 这里第四个索引会赋值go,下一个没有写索引,会自动给第五个index赋值,后面从第二个索引开始,自动给第三个赋值赋值
    // TODO 如果这里把1换成2,会报错
    fmt.Println(arr2)
	// 多维数组原理与此类似
}

```

类型转换:

会用到golang的 strconv包,具体使用方式这里不说明了,教程一大把


引用类型: 指针、slice、map、chan等

切片：切片是数组的一个引用，因此切片是引用类型。但自身是结构体，值拷贝传递，切片可以无限扩展
```go
package main
import "fmt"
func main(){
	// 这样定义的切片不能继续扩展了
	var arr = [...]int{1,2,3,4,5,6,7,8,9,10}
	fmt.Println(arr[0:10])
	// 可以继续扩展的定义 
	// (1) var arr = []int{}
	// (2) var arr = make([]int,10)
}

```

容器Map: 引用类型，哈希表。一堆键值对的未排序集合


```go
package main
import "fmt"
func main(){
	var data = map[string]int{}
	data["hello"] = 1
	
	// 创建了一个键类型为string,值类型为int的map
	m1 := make(map[string]int)
	// 也可以选择是否在创建时指定该map的初始存储能力，如创建了一个初始存储能力为5的map
	m2 := make(map[string]int, 5)
    
	m1["a"] = 1
	// 判断 key 是否存在。
    	if val, ok := m1["a"]; !ok {
    		fmt.Println("map's key is not existence")
    	}else {
    		fmt.Println(val)
    	}
	m2["b"] = 2
	fmt.Printf("局部变量 map m1 : %v\n", m1)
	fmt.Printf("局部变量 map m2 : %v\n", m2)
}

```

管道Channel: 
    
     1. 类似unix中管道（pipe）
     2. 先进先出
     3. 线程安全，多个goroutine同时访问，不需要加锁
     4. channel是有类型的，一个整数的channel只能存放整数
     
```go
package main
import "fmt"
func main(){
	var(
		// 无缓冲
		// chan1 = make(chan string)
		// 有缓冲
		chan2 = make(chan int,1)
	)
	// 无缓冲： 不仅仅是向 chan1 通道放 1，而是一直要等有别的携程 <-chan1 接手了这个参数，那么chan1<-1才会继续下去，要不然就一直阻塞着
	// 有缓冲： chan2<-1 则不会阻塞，因为缓冲大小是1(其实是缓冲大小为0)，只有当放第二个值的时候，第一个还没被人拿走，这时候才会阻塞
	chan2 <- 98
    	if v, ok := <-chan2; ok {
    		// 读取之后缓存的数据被清除
    		fmt.Println(v)
    	}
    
    	// 写如10个数据到缓冲区
    	for i := 0; i < 10; i++ {
    		chan2 <- i
    	}
    	// 再写入数据
    	chan2 <- 9898
    	for v := range chan2 {
    		fmt.Println(v)
    		// 这里输入chan里面的任何一个value
    		if v == 9 {
    			// 关闭管道,不关闭会报错
    			close(chan2)
    		}
    	}
    	// channel关闭后，就不能取出数据了
}
```     

- 结构体 struct

```go
package main

import "fmt"

type Student struct{
	Name string // 姓名
	Age int // 年龄
	Id string // 学号
	Class string // 班级
}

func main(){
	// new 一个地址
	var s = new(Student)
	s.Name = "詹姆斯"
	s.Age = 35
	s.Id = "23"
	s.Class = "湖人"
	
	fmt.Println(s)
}
```
## 函数
- 定义一个函数
```golang
	// 首写字母大写其他包可以访问，反之其他包则不可以访问
	func addNum(a,b int)(ret int){
	 ret = a+b
	return	
	}
```
	a,b 两个为输入参数;ret为函数返回参数;golang函数可以有多个返回值;如果需要传入不定参数（`func (data ...int)int{return}`);

- 函数调用
	
	```golang
	package main
	
	func main(){
		println(addNum(10,20))
		// out 30
	}
	```
## 方法与接口

- 方法
 
 ```golang 
package main

import "fmt"

// 定义一个接口体
type Man struct {
	Age     int    // 年龄
	Name    string // 姓名
	IsAdult bool   // 成年:true;false: 未成年
	// 更多字段以此类推
	/*
		.
		.
		.
	*/
}

// 声明三个方法
// GetName 获取姓名
func (p *Man) GetName() (ret string) {
	return p.Name
}

// GetAge 获取年龄
func (p *Man) GetAge() (ret int) {
	return p.Age
}

// ViewIsAdult 查看是否成年
func (p *Man) ViewIsAdult() (ret bool) {
	if p.Age >= 18 {
		p.IsAdult = true
	} else {
		p.IsAdult = false
	}
	return p.IsAdult
}

func main() {

	// 定义一个 Man 类型
	var p = &Man{
		Age:  18,
		Name: "Tom",
	}
	// 执行方法
	fmt.Println(p.GetAge())
	fmt.Println(p.GetName())
	fmt.Println(p.ViewIsAdult())
	// out 18 Tom true

}
 ```
  
- 接口
	
```golang
package main

import "fmt"

// 定义一个接口体
type Man struct {
	Age     int    // 年龄
	Name    string // 姓名
	IsAdult bool   // 成年:true;false: 未成年
	// 更多字段以此类推
	/*
		.
		.
		.
	*/
}

type Person interface {
	Eating() (ret string)   // 吃
	Playing() (ret string)  // 玩
	Drinking() (ret string) // 喝
}

// 声明三个方法

// GetName 获取姓名
func (p *Man) GetName() (ret string) {
	return p.Name
}

// GetAge 获取年龄
func (p *Man) GetAge() (ret int) {
	return p.Age
}

// ViewIsAdult 查看是否成年
func (p *Man) ViewIsAdult() (ret bool) {
	if p.Age >= 18 {
		p.IsAdult = true
	} else {
		p.IsAdult = false
	}
	return p.IsAdult
}

// Eating 实现吃的方法
func (p *Man) Eating() (ret string) {
	return fmt.Sprintf(`%s is eating apple now`, p.Name)
}

// Playing 实现玩的方法
func (p *Man) Playing() (ret string) {
	return fmt.Sprintf(`%s is playing backball now`, p.Name)
}

// Drinking 实现喝的方法
func (p *Man) Drinking() (ret string) {
	return fmt.Sprintf(`%s is drinking cola now`, p.Name)
}

func main() {

	// 定义一个 Man 类型
	var p = &Man{
		Age:  18,
		Name: "Tom",
	}
	// 定义一个 Person 类型
	var person Person
	person = p
	// 执行方法
	fmt.Println(person.Drinking())
	fmt.Println(person.Eating())
	fmt.Println(person.Playing())
}

```	
- 接口可以通过方法来实现，任意一个结构体都可以实现接口里面的方法,但是必须声明全部方法,不然会报错。
