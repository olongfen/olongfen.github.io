#!/bin/bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U
# 设置清华源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip install --upgrade pip
pip install grpcio protobuf grpcio-tools  googleapis-common-protos --user
sudo dnf  install protobuf-compiler protobuf-static protobuf protobuf-devel