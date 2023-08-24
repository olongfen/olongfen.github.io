# centos7 安装证书
```shell
# 复制证书
cp your.cer /etc/pki/ca-trust/source/anchors/
# 做软连接
ln -s /etc/pki/ca-trust/source/anchors/your.cer /etc/ssl/certs/your.cer
# 更新系统证书
update-ca-trust
```
# centos7 安装cockpit监控集群
## 主机1安装
```shell
    yum install -y cockpit cockpit-machines
    systemctl start cockpit
    systemctl enable cockpit

```

## 主机x安装
```shell
        yum install -y cockpit
    systemctl start cockpit
    systemctl enable cockpit
```


## 访问主机1:9090端口，添加主机x的记录