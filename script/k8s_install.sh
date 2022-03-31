#!/bin/bash

echo -n "是否修改docker和k8s版本"                   # 参数-n的作用是不换行，echo默认换行
# shellcheck disable=SC2162
read  name                                   # 把键盘输入放入变量name

# shellcheck disable=SC2170
if [ $name -eq 0 ];then
  echo "使用脚本默认版本"
else
  echo "请搜索 改版本"
  echo "手动修改版本后输入 0 执行脚本"
  exit
fi

# 第一步
echo  "开始停止防火墙与关闭开机启动防火墙"
systemctl stop firewalld.service && systemctl disable firewalld.service
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "停止防火墙与关闭开机启动防火墙完毕"
else
  echo "停止防火墙与关闭开机启动防火墙失败"
  exit
fi


# 第二步
echo "开始清理防火墙规则，设置默认转发策略"
iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "清理防火墙规则，设置默认转发策略完毕"
else
  echo "清理防火墙规则，设置默认转发策略失败"
  exit
fi

# 第三步
echo "开始关闭swap分区"
swapoff -a && sed -i 's/^\/dev\/mapper\/centos-swap/#&/'  /etc/fstab
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "关闭swap分区完毕"
else
  echo "关闭swap分区失败"
  exit
fi

# 第四步
echo "开始SELINUX 设置"
echo "查看状态"
sestatus

echo "关闭linux防火墙与修改防火墙配置"
setenforce 0 && sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "关闭linux防火墙与修改防火墙配置成功"
else
  echo "关闭linux防火墙与修改防火墙配置失败"
  exit
fi

# 第五步
echo "设置系统时区和时间同步"
timedatectl set-timezone Asia/Shanghai && systemctl enable chronyd && systemctl start chronyd
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "设置系统时区和时间同步成功"
else
  echo "设置系统时区和时间同步失败"
  exit
fi

echo "查看同步状态"
timedatectl status

echo "将当前的 UTC 时间写入硬件时钟"
timedatectl set-local-rtc 0
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "将当前的 UTC 时间写入硬件时钟成功"
else
  echo "将当前的 UTC 时间写入硬件时钟失败"
  exit
fi


echo "重启依赖于系统时间的服务"
systemctl restart rsyslog && systemctl restart crond
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "重启依赖于系统时间的服务成功"
else
  echo "重启依赖于系统时间的服务失败"
  exit
fi

echo "关闭无关服务"
systemctl stop postfix && systemctl disable postfix

# 第六步
echo "添加网桥过滤"
echo "添加网桥过滤及地址转发"
cat <<EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
EOF
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "添加网桥过滤及地址转发成功"
else
  echo "添加网桥过滤及地址转发失败"
  exit
fi

echo "加载 br_netfilter 模块"
modprobe br_netfilter

echo "查看是否加载"
lsmod | grep br_netfilter

echo "加载网桥过滤配置文件"
sysctl -p /etc/sysctl.d/k8s.conf
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "加载网桥过滤配置文件 成功"
else
  echo "加载网桥过滤配置文件 失败"
  exit
fi

# 第七步
echo "服务器换阿里源"
echo "备份源和修改OS源为阿里的仓库"
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak && curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "备份源和修改OS源为阿里的仓库 成功"
else
  echo "备份源和修改OS源为阿里的仓库 失败"
  exit
fi

echo "导入阿里公钥"
wget  https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg && rpm --import yum-key.gpg
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "导入阿里公钥1 成功"
else
  echo "导入阿里公钥1 失败"
  exit
fi

wget https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg && rpm --import rpm-package-key.gpg
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "导入阿里公钥2 成功"
else
  echo "导入阿里公钥2 失败"
  exit
fi

echo "清理缓存和重新生成缓存"
yum clean all && yum makecache
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "清理缓存和重新生成缓存 成功"
else
  echo "清理缓存和重新生成缓存 失败"
  exit
fi

# 第八步
echo "开启 IPVS"

echo "安装 ipset 及 ipvsadm"
yum install -y ipset ipvsadm
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "安装 ipset 及 ipvsadm 成功"
else
  echo "安装 ipset 及 ipvsadm 失败"
  exit
fi

echo "添加需要加载的模块"
cat <<EOF > /etc/sysconfig/modules/ipvs.modules
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "添加需要加载的模块 成功"
else
  echo "添加需要加载的模块 失败"
  exit
fi

echo "授权、运行、检查是否加载"
chmod +x /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "授权、运行、检查是否加载 成功"
else
  echo "授权、运行、检查是否加载 失败"
  exit
fi


# 第九步
echo "安装docker"

echo "安装依赖项"
yum install -y yum-utils device-mapper-persistent-data lvm2
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "安装依赖项 成功"
else
  echo "安装依赖项 失败"
  exit
fi

echo "添加docker源为阿里源"
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "添加docker源为阿里源 成功"
else
  echo "添加docker源为阿里源 失败"
  exit
fi

echo "安装docker,如果需要改docker版本,清修改脚本下一行的版本"
yum install docker-ce-18.06.3.ce-3.el7 # 改版本
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "安装docker 成功"
else
  echo "安装docker 失败"
  exit
fi

echo "启动docker和设置开机启动"
systemctl restart docker && systemctl enable docker
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "启动docker和设置开机启动 成功"
else
  echo "启动docker和设置开机启动 失败"
  exit
fi

echo "配置docker daemon.json"
cat <<EOF > /etc/docker/daemon.json
{
"exec-opts": ["native.cgroupdriver=systemd"],
"registry-mirrors" : ["http://registry.docker-cn.com","http://docker.mirrors.ustc.edu.cn","http://hub-mirror.c.163.com"],
"insecure-registries" : ["registry.docker-cn.com","docker.mirrors.ustc.edu.cn"],
"debug" : true,
"experimental" : true
}
EOF
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "配置docker daemon.json 成功"
else
  echo "配置docker daemon.json 失败"
  exit
fi

echo "重启docker"
systemctl restart docker
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "重启docker 成功"
else
  echo "重启docker 失败"
  exit
fi

# 第十步
echo "安装kubernetes"
echo "配置kubernetes阿里源"
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "配置kubernetes阿里源 成功"
else
  echo "配置kubernetes阿里源 失败"
  exit
fi

echo "安装kubernetes,版本自行替换下面的命令"
yum install -y kubeadm-1.17.3-0 kubelet-1.17.3-0 kubectl-1.17.3-0 # 改版本
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "安装kubernetes 成功"
else
  echo "安装kubernetes 失败"
  exit
fi

echo "设置kubernetes"
cat <<EOF > /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"
EOF
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "安装kubernetes 成功"
else
  echo "安装kubernetes 失败"
  exit
fi

echo "开启k8s"
systemctl enable kubelet && systemctl start kubelet
# shellcheck disable=SC2181
if [ $? -eq 0 ];then
  echo "开启k8s 成功"
else
  echo "开启k8s 失败"
  exit
fi

echo "kubernetes安装完毕,部署k8s集群教程请看官网"
echo "或者我个人博客: https://olongfen.github.io/#/note/kubernetes"
