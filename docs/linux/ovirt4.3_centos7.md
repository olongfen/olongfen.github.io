# 一、准备一台主机
## 1.1 主机信息
```text
ip地址         系统       主机名
192.168.161.128   centos7.9   engine161.com
```
## 1.2 配置hosts
```text
    echo 192.168.161.128  engine161.com >> /etc/hosts
    echo 192.168.161.128  node161.com >> /etc/hosts
```

# 二、Ovirt-engine安装配置
## 2.1 安装ovirt-engine
添加官方oVir存储库并安装ovirt-engine程序包和依赖包
- 设置安装源
```shell
yum install https://resources.ovirt.org/pub/yum-repo/ovirt-release43.rpm
```
- 安装ovirt-engine
```shell
yum install -y ovirt-engine
```
## 2.2 配置ovirt-engine
```shell
#执行安装命令,基本上一路默认执行下去
engine-setup
```
## 2.3 修改ovirt-engine登入方式
```shell
vim /etc/ovirt-engine/engine.conf.d/11-setup-sso.conf
# 添加
SSO_CALLBACK_PREFIX_CHECK=false 
SSO_ALTERNATE_ENGINE_FQDNS="192.168.161.128"
```

## 2.4 安装计算节点
- 安装依赖
```shell
# 1.设置安装源, 这里为官方oVir存储库
yum install -y http://resources.ovirt.org/pub/yum-repo/ovirt-release43.rpm
 
# 2.安装软件
yum -y install qemu-kvm libvirt virt-install bridge-utils vdsm
yum install cockpit cockpit-ovirt-dashboard -y
# 3.安装ovirt-viewer
yum install -y ovirt-viewer
 
# 3.启动服务并设置开机启动
systemctl start libvirtd
systemctl enable libvirtd
```
- 创建虚拟机镜像存储目录
```shell
mkdir -p /home/vdsm/images
mkdir -p /home/vdsm/iso
chown -R vdsm /home/vdsm/images
chown -R vdsm /home/vdsm/iso
```
- 添加镜像
```text
copy镜像到/home/vdsm/iso/2eb33fb7-ecae-490a-9463-15016a6c41fb/images/11111111-1111-1111-1111-111111111111
```
## 创建虚拟机教程
- 新建数据中心-关联集群-关联主机-添加存储域-创建虚拟机