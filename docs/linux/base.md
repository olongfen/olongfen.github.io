# centos7 安装证书
```shell
# 复制证书
cp your.cer /etc/pki/ca-trust/source/anchors/
# 做软连接
ln -s /etc/pki/ca-trust/source/anchors/your.cer /etc/ssl/certs/your.cer
# 更新系统证书
update-ca-trust
```