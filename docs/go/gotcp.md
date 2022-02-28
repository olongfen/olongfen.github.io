## golang tcp 协议入门开发

说明：
``服务端开启服务，接收客户端发送的请求建立与客户端连接;
  缓存客户端连接，放入连接池中， 用于广播消息给客户端  ``
  ``客户端连接服务器，发送请求，接受服务器的广播消息
  客户端之间互相不影响``
  
- 服务端

server.go
```go
package main

// 运行前 先 go get  github.com/olongfen/docker

import (
	"encoding/json"
	"fmt"
	"github.com/olongfen/note/log"
	"net"
)

func main() {
	fmt.Println(startServe("0.0.0.0", "1253"))
}

func startServe(host, port string) (err error) {
	var (
		tcpAddr  *net.TCPAddr
		listener *net.TCPListener
	)
	// 获取tcp地址
	if tcpAddr, err = net.ResolveTCPAddr("tcp4", host+":"+port); err != nil {
		return
	}

	// 开启监听
	if listener, err = net.ListenTCP("tcp", tcpAddr); err != nil {
		return
	}

	// 建立连接池,用于广播消息
	conns := make(map[string]net.Conn)

	// 消息缓存通道
	messageChan := make(chan string, 1)

	// 广播消息
	go broadMessage(&conns, messageChan)

	// 启动
	for {
		log.Println("listening port: ", port)
		conn, _err := listener.AcceptTCP()
		if _err != nil {
			log.Printf("Accept failed:%v\n", err)
			continue
		}

		//  把每个客户端连接扔进连接池
		conns[conn.RemoteAddr().String()] = conn
		fmt.Println(conns)

		// 处理消息
		go handlerMessage(conn, &conns, messageChan)
	}
}

// broadMessage 广播消息
func broadMessage(conns *map[string]net.Conn, message chan string) {
	for {
		msg := <-message
		var d struct {
			ClientIP string `json:"client_ip"`
			Message  string `json:"message"`
		}
		_ = json.Unmarshal([]byte(msg), &d)
		// 发送消息给客户端
		for key, v := range *conns {
			// 回复消息给相对应的客户端
			if v.RemoteAddr().String() == d.ClientIP {
				// 打印传过来的消息
				log.Infoln(v.RemoteAddr().String() + "---->" + msg)
				log.Infoln("connection is connected from ", key)
				_, err := v.Write([]byte(v.RemoteAddr().String() + ": " + "已经收到信息"))
				if err != nil {
					log.Errorf("broad message to %s failed: %v\n", key, err)
					delete(*conns, key)
				}
			} else {
				_, err := v.Write([]byte(v.RemoteAddr().String() + " 地址发送了请求消息：" + d.Message))
				if err != nil {
					log.Errorf("broad message to %s failed: %v\n", key, err)
					delete(*conns, key)
				}
			}
		}
	}
}

// handlerMessage 处理消息
func handlerMessage(conn net.Conn, conns *map[string]net.Conn, messages chan string) {
	buf := make([]byte, 1024)
	for {
		// 读取消息
		l, err := conn.Read(buf)
		if err != nil {
			log.Errorf("read client message failed:%v\n", err)
			delete(*conns, conn.RemoteAddr().String())
			conn.Close()
			break
		}

		// 把收到的消息写到通道中
		recvStr := string(buf[0:l])
		messages <- recvStr
	}
}

```  
  
- 客户端代码

client.go 
```go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/olongfen/note/log"
	"net"
	"os"
)

// 发送消息体
type messageData struct {
	ClientIP string `json:"client_ip"`
	Message  string `json:"message"`
}

func main() {
	startClient("0.0.0.0:1253")
}

func startClient(t string) (err error) {
	var (
		tcpAddress *net.TCPAddr
		conn       *net.TCPConn
	)
	if tcpAddress, err = net.ResolveTCPAddr("tcp4", t); err != nil {
		log.Errorln(err)
		return
	}

	// 向服务器拨号
	if conn, err = net.DialTCP("tcp", nil, tcpAddress); err != nil {
		return
	}

	// 发送消息
	go sendMessage(conn)

	// 接收消息
	readMessage(conn)
	return
}

// sendMessage 向服务器端发消息
func sendMessage(conn net.Conn) {
	var m = new(messageData)
	m.ClientIP = conn.LocalAddr().String()
	for {
		var input string

		// 接收输入消息，放到input变量中
		fmt.Scanln(&input)

		if input == "/q" || input == "/quit" {
			fmt.Println("Byebye ...")
			conn.Close()
			os.Exit(0)
		}

		// 只处理有内容的消息
		if len(input) > 0 {
			m.Message = input
			_d, _ := json.Marshal(m)
			_, err := conn.Write(_d)
			if err != nil {
				conn.Close()
				break
			}
		}
	}
}

// readMessage 读取消息
func readMessage(conn net.Conn) {
	// 接收来自服务器端的广播消息
	buf := make([]byte, 1024)
	for {
		length, err := conn.Read(buf)
		if err != nil {
			log.Printf("recv server msg failed: %v\n", err)
			conn.Close()
			os.Exit(0)
		}

		log.Infoln("msg: ---->", string(buf[0:length]))
	}
}

``` 