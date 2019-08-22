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
  