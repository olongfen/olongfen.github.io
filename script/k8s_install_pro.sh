#!/bin/bash

echo  "开始按钮装k8s"

# check 验证指令执行结果
check() {
  if [ $? -eq 0 ];then
    echo "$1 success"
  else
    echo "$1 fail"
    exit
  fi
  return
}

# choiceSystemSource 换源 TODO 其他源
choiceSystemSource() {
    echo "请选择系统源"
    echo "1: 阿里源"
    echo "2: 清华源"
    read chioceTwo
    echo "正在备份源"
    mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
    check "备份源"

    # 替换源
    case $chioceTwo in
    1)
      curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo &&     wget  https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg && rpm --import yum-key.gpg
      echo "导入阿里公钥"
      check "导入阿里公钥1"
      wget https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg && rpm --import rpm-package-key.gpg
      check "导入阿里公钥2"
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
     check "配置kubernetes阿里源"
     yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
     check "配置docker阿里源"
      ;;
    2)
      # shellcheck disable=SC1073
      cat > /etc/yum.repos.d/CentOS-Base.repo << EOF
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#
# shellcheck disable=SC1073
[base]
name=CentOS-$releasever - Base
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/os/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-7

#released updates
[updates]
name=CentOS-$releasever - Updates
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/updates/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-7



#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/extras/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-7



#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/centosplus/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-7
EOF
      check "写入清华源"
      cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=kubernetes
baseurl=https://mirrors.tuna.tsinghua.edu.cn/kubernetes/yum/repos/kubernetes-el7-$basearch
enabled=1
EOF
      check "写入k8s清华源"
      wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/centos/docker-ce.repo && sudo sed -i 's+download.docker.com+mirrors.tuna.tsinghua.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo
      check "写入docker清华源"
      ;;
    *)
      echo "没有这个选项"
      exit
      ;;
    esac
    echo "清理缓存和重新生成缓存"
    yum clean all && yum makecache
    # shellcheck disable=SC2181
    check "清理缓存和重新生成缓存"
    return
}

# systemSetting 系统设置
systemSetting() {
  # 1 关闭防火墙
  echo  "停止防火墙与关闭开机启动防火墙"
  systemctl stop firewalld.service && systemctl disable firewalld.service
  check "停止防火墙与关闭开机启动防火墙"
  echo "清理防火墙规则，设置默认转发策略"
  iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat
  check "清理防火墙规则，设置默认转发策略"
  # 2 关闭swap分区
  echo "关闭swap分区"
  # swapoff -a && sed -i 's/^\/dev\/mapper\/centos-swap/#$/' /etc/fstab
  swapoff -a && sed -i 's/^\/dev\/mapper\/centos-swap/#&/'  /etc/fstab
  check "关闭swap分区"
  # 3 SELINUX 设置
  echo "SELINUX 设置"
  setenforce 0 && sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
  check "SELINUX 设置"
  # 4 设置系统时区和时间同步
  echo "设置系统时区和时间同步"
  timedatectl set-timezone Asia/Shanghai && systemctl enable chronyd && systemctl start chronyd
  check "设置系统时区和时间同步"

  echo "同步状态: "
  timedatectl status

  echo "将当前的 UTC 时间写入硬件时钟"
  timedatectl set-local-rtc 0
  check "将当前的 UTC 时间写入硬件时钟"

  echo "重启依赖于系统时间的服务"
  systemctl restart rsyslog && systemctl restart crond
  check "重启依赖于系统时间的服务"

  echo "关闭无关服务"
  systemctl stop postfix && systemctl disable postfix

  # 5 添加网桥过滤及地址转发
  echo "添加网桥过滤及地址转发"
  cat <<EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
EOF
check "添加网桥过滤及地址转发"

echo "加载 br_netfilter 模块"
modprobe br_netfilter
check "加载 br_netfilter 模块"

echo "查看是否加载: "
lsmod | grep br_netfilter

echo "加载网桥过滤配置文件"
sysctl -p /etc/sysctl.d/k8s.conf
check "加载网桥过滤配置文件"

  return
}

# 安装ipvs
installIPVS(){
  echo "安装 ipset 及 ipvsadm"
  yum install -y ipset ipvsadm
  check "安装ipvs"

  echo "添加需要加载的模块"
  cat <<EOF > /etc/sysconfig/modules/ipvs.modules
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
  check "添加需要加载的模块"
  echo "授权、运行、检查是否加载"
  chmod +x /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4
  check "授权、运行、检查是否加载"
  return
}

# installDocker 安装docker
installDocker() {
  echo "安装docker"
  echo "安装依赖项"
  yum install -y yum-utils device-mapper-persistent-data lvm2
  check "安装docker依赖项"

  yum install docker-ce
  check "安装docker"

  echo "启动docker和设置开机启动"
  systemctl restart docker && systemctl enable docker
  check "启动docker和设置开机启动"

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
  check "配置docker daemon.json"
  echo "重启docker"
  systemctl restart docker
  check "重启docker"
  return
}

# installK8s 安装k8s
installK8s() {
  echo "安装kubernetes"
  yum install kubeadm kubelet kubectl
  check "安装kubernetes"
  echo "设置kubernetes"
  cat <<EOF > /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"
EOF
  check "设置kubernetes"
  echo "开启k8s"
  systemctl enable kubelet && systemctl start kubelet
  check "开启k8s"
  return
}

echo -n "是否更换系统源: 1切换，其他不切换"
read chioceOne
# shellcheck disable=SC1073
if [ $chioceOne -eq 1 ];then
    choiceSystemSource
else
  echo  "使用系统默认源"
fi

systemSetting
installIPVS
installDocker
installK8s
echo "kubernetes安装完毕,部署k8s集群教程请看官网 https://kuboard.cn/"
echo "或者我个人博客: https://olongfen.github.io/#/note/kubernetes"


