#!/bin/bash

# pip + yum 安装
function methodOne() {
# pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip install --upgrade pip --user
pip install grpcio --user && pip install protobuf --user
pip install  grpcio-tools --user
sudo yum -y install protobuf-compiler protobuf-static protobuf protobuf-devel  protobuf-compiler.x86_64
pip install googleapis-common-protos --user
}

# 二进制安装 methodTwo
function methodTwo() {
git clone -b $(curl -L https://grpc.io/release) https://github.com/grpc/grpc
cd grpc
git submodule update --init
make && sudo make install
ll ./bins/opt/
cp -r ./bins/opt/* /usr/local/bin/
}

echo -n "选这安装方法 0 为二进制安装，任意为pip+yum安装"
read chioce

if [ $chioce -eq 0 ]; then
    methodTwo
else
    methodOne
fi

export GO111MODULE=on
export GOPROXY=https://goproxy.io
go get -u google.golang.org/grpc
go get -u github.com/golang/protobuf/protoc-gen-go