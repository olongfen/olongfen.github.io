# kubernetes 搭建集群笔记

- 集群规划
  
    准备三台虚拟机:
    - master: 192.168.136.128
    - node1: 192.168.136.130
    - node2: 192.168.136.131

- 设置主机名
    
    - master: `hostnamectl set-hostname master`  
    - node1: `hostnamectl set-hostname node1`
    - node2: `hostnamectl set-hostname node2`
    - 如果 DNS 不支持主机名称解析，还需要在每台机器的 
    /etc/hosts 文件中添加主机名和 IP 的对应关系： 
    `cat >> /etc/hosts <<EOF
    192.168.136.128 master
    192.168.136.130 node1
    192.168.136.131 node2
    EOF`

- 关闭防火墙
    
    三台机器都执行,关闭防火墙，清理防火墙规则，设置默认转发策略：
    - `systemctl stop firewalld.service && systemctl disable firewalld.service`
    - `iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat`
    - `iptables -P FORWARD ACCEPT`     

- 关闭swap分区
      
    三台机器都执行,关闭 swap 分区，否则kubelet 会启动失败(可以设置 kubelet 启动参数 --fail-swap-on 为 false 关闭 swap 检查)：
    - `swapoff -a`
    - `vim /etc/fsrab # 
    注释这一行/dev/mapper/centos-swap swap                    swap    defaults        0 0`

- SELINUX 设置
    
   - 查看状态: `setstatus`
   - `setenforce 0`
   - 修改配置: `sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config`

- 设置系统时区&&时间同步
    
    - 设置系统时区: `timedatectl set-timezone Asia/Shanghai`          
    - 设置时钟同步: `systemctl enable chronyd && systemctl start chronyd`
    - 查看同步状态: `timedatectl status`
    
    `将当前的 UTC 时间写入硬件时钟:
     timedatectl set-local-rtc 0
     重启依赖于系统时间的服务:
     systemctl restart rsyslog 
     systemctl restart crond`
- 关闭无关服务
   `systemctl stop postfix && systemctl disable postfix`

- 添加网桥过滤
    
    - 添加网桥过滤及地址转发: `cat > /etc/sysctl.d/k8s.conf << EOF
       net.bridge.bridge-nf-call-ip6tables = 1
       net.bridge.bridge-nf-call-iptables = 1
       net.ipv4.ip_forward = 1
       vm.swappiness = 0
       EOF`
    - 加载 br_netfilter 模块: `modprobe br_netfilter`
    - 查看是否加载: `lsmod | grep br_netfilter`
    - 加载网桥过滤配置文件: `sysctl -p /etc/sysctl.d/k8s.conf`       

- 开启 IPVS
    
    - 安装 ipset 及 ipvsadm: ` yum install -y ipset ipvsadm`
    - 添加需要加载的模块: `cat > /etc/sysconfig/modules/ipvs.modules << EOF #!/bin/bash
                  modprobe -- ip_vs
                  modprobe -- ip_vs_rr
                  modprobe -- ip_vs_wrr
                  modprobe -- ip_vs_sh
                  modprobe -- nf_conntrack_ipv4
                  EOF`
    - 授权、运行、检查是否加载: `chmod +x /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4`              

- 安装Docker
    
    - 备份源： `mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak`
    - 修改OS源为阿里的仓库: `curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`
    - 安装依赖项: `yum install -y yum-utils device-mapper-persistent-data lvm2`
    - 添加docker源为阿里源: `yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`
    - 安装docker： `yum install docker-ce-18.06.3.ce-3.el7` 
    - 添加镜像源： `vim /etc/docker/daemon.json`
        
        写入：  ```json 
        {
           "exec-opts": ["native.cgroupdriver=systemd"],
           "registry-mirrors" : [
               "http://registry.docker-cn.com",
               "http://docker.mirrors.ustc.edu.cn",
               "http://hub-mirror.c.163.com"
             ],
           "insecure-registries" : [
               "registry.docker-cn.com",
               "docker.mirrors.ustc.edu.cn"
             ],
           "debug" : true,
           "experimental" : true
              }```
    - 重启docker： `systemctl restrt docker && systemctl enable docker`

- 安装k8s
    
    -  使用阿里云的 yum 仓库镜像:
        
        `
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
        `             
    - 安装k8s： `yum install -y kubeadm-1.17.3-0 kubelet-1.17.3-0 kubectl-1.17.3-0`
    - 设置: `vim /etc/sysconfig/kubelet
            插入: KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"       
    `
    - 开机自动启动: `systemctl enable kubelet`  

 ` 上面命令三个机器都要执行`     
 
- 部署k8s集群
     
    - Master:
      
      - 初始化: `kubeadm init --kubernetes-version=v1.17.3 --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.136.128 --apiserver-cert-extra-sans=192.168.136.128,master   --image-repository registry.aliyuncs.com/google_containers
` 
      
      - 初始化成功后出现:
            `
                Your Kubernetes control-plane has initialized successfully!
                 To start using your cluster, you need to run the following as a regular user:
                   mkdir -p $HOME/.kube
                   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
                   sudo chown $(id -u):$(id -g) $HOME/.kube/config
                 You should now deploy a pod network to the cluster.
                 Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
                   https://kubernetes.io/docs/concepts/cluster-administration/addons/
                 Then you can join any number of worker nodes by running the following on each as root:
                 kubeadm join 192.168.136.128:6443 --token 0s36r8.14ngpdohrkd12gn4 \
                  --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552 `
      
      -  将当前用户配置为集群管理员（如果不配置，下次连接时会无法使用kubectl）,执行这三条命令： `  mkdir -p $HOME/.kube
                     cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
                     chown $(id -u):$(id -g) $HOME/.kube/config`  
     
      - 配置网络: `kubectl apply -f https://docs.projectcalico.org/v3.9/manifests/calico.yaml`
             
    - Node:
       
       加入节点: `kubeadm join 192.168.136.128:6443 --token 0s36r8.14ngpdohrkd12gn4 \
                                --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552`
                        