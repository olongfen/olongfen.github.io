# Golang 单元测试用例

- 单元测试的好处
    - 提高代码质量 
    - 保证逻辑的正确性
    - 优化代码设计、更好的调式代码
    - 更早的发现bug

- 直接开干
  - `简单的测试加减乘除>>>main.go`
  ```go
  package demo
  
  func Add(i,j int) int  {
    return i+j
  }
  
  func Sub(i,j int)int  {
    return i-j
  }
  
  func Mul(i,j int)int  {
    return i*j
  }
  
  
  func Div(i,j int) int  {
    if j==0{
    	panic("除数不能为0")
    }
    return i/j
  }
  
  ```

  - `main_test.go`
  ```go
  package demo
  import (
	. "github.com/smartystreets/goconvey/convey"
	"testing"
    )

  func TestAdd(t *testing.T) {
      Convey("测试Add运算", t, func() {
      res := Add(8, 1)
      // 断言
      So(res, ShouldEqual, 9)
    })
  }

  func TestSub(t *testing.T) {
    Convey("测试Sub运算", t, func() {
    res := Sub(8, 1)
    // 断言
    So(res, ShouldEqual, 7)
    })
  }

  func TestMul(t *testing.T) {
    Convey("测试Mul", t, func() {
    res := Mul(8, 1)
    // 断言
    So(res, ShouldEqual, 8)
  })
  }

  func TestDiv(t *testing.T) {
    Convey("测试Div运算", t, func() {
    res := Div(8, 1)
    // 断言
    So(res, ShouldEqual, 8)
    })
  }
  ```
  
`执行：go test . `