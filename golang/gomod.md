``` 
go mod init:初始化modules
go mod download:下载modules到本地cache
go mod edit:编辑go.mod文件，选项有-json、-require和-exclude，可以使用帮助go help mod edit
go mod graph:以文本模式打印模块需求图
go mod tidy:删除错误或者不使用的modules
go mod vendor:生成vendor目录
go mod verify:验证依赖是否正确
go mod why：查找依赖
go build -buildmode=c-shared -o *.so *.go  go生成静态库
go build -buildmode=c-archive -o *.dll *.go go生成动态库
```
