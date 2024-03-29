# kubernetes 搭建集群笔记

## 1 **集群规划**
  
   _准备三台虚拟机_:
    - master: 192.168.136.128
    - node1: 192.168.136.130
    - node2: 192.168.136.131

## 2 **设置主机名**
    
   - _master_: `hostnamectl set-hostname master`  
   - _node1_: `hostnamectl set-hostname node1`
   - _node2_: `hostnamectl set-hostname node2`
   - _如果 DNS 不支持主机名称解析，还需要在每台机器的 /etc/hosts 文件中添加主机名和 IP 的对应关系：_ 
`cat >> /etc/hosts <<EOF
192.168.136.128 master
192.168.136.130 node1
192.168.136.131 node2
EOF`

## 3 **关闭防火墙**
    
    _三台机器都执行,关闭防火墙，清理防火墙规则，设置默认转发策略：_
    - `systemctl stop firewalld.service && systemctl disable firewalld.service &&  firewall-cmd --state`   

## 4 **SELINUX 设置**
    
   - _查看状态_: `setstatus`
   - _修改配置_: `sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config`
   
## 5 **关闭swap分区**
      
   - _三台机器都执行,关闭 swap 分区，否则kubelet 会启动失败(可以设置 kubelet 启动参数 --fail-swap-on 为 false 关闭 swap 检查)：_
    `swapoff -a && sed -i 's/^\/dev\/mapper\/centos-swap/#&/'  /etc/fstab`


## 6 **设置系统时区&&时间同步**
    
  - _设置系统时区:_ `timedatectl set-timezone Asia/Shanghai`        
    
  - _设置时钟同步:_ `systemctl enable chronyd && systemctl start chronyd`
  
  - _查看同步状态:_ `timedatectl status`
  
  - _将当前的 UTC 时间写入硬件时钟:_ `timedatectl set-local-rtc 0`
  
  - _重启依赖于系统时间的服务:_   `systemctl restart rsyslog && systemctl restart crond`
  
  - - **关闭无关服务**:(可选关闭) `systemctl stop postfix && systemctl disable postfix`

## 7 **添加网桥过滤**
    
   - _添加网桥过滤及地址转发_: 
`cat <<EOF > /etc/sysctl.d/k8s.conf 
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
EOF
        `
   - _加载 br_netfilter 模块:_ `modprobe br_netfilter`
   - _查看是否加载:_ `lsmod | grep br_netfilter`
   - _加载网桥过滤配置文件:_ `sysctl -p /etc/sysctl.d/k8s.conf`       

## 8 **服务器换阿里源**
   - _备份源：_ `mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak`
    
   - _修改OS源为阿里的仓库:_ `curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`
    
   - _导入阿里公钥_ 
        `    wget  https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg && rpm --import yum-key.gpg    wget https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg && rpm --import rpm-package-key.gpg`
   - _执行_: `yum clean all && yum makecache`    
## 9 **开启 IPVS**
    
   - _安装 ipset 及 ipvsadm:_ ` yum install -y ipset ipvsadm`
   - _添加需要加载的模块(复制命令记得去掉空格):_  
`cat <<EOF > /etc/sysconfig/modules/ipvs.modules  
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF`
   - _授权、运行、检查是否加载:_ `chmod +x /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4`              


## 10 **安装Docker**
   
    - _安装依赖项:_ `yum install -y yum-utils device-mapper-persistent-data lvm2`
    - _添加docker源为阿里源:_ `yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`
    - _安装docker：_ `yum install docker-ce-18.06.3.ce-3.el7` 
    - _添加镜像源：_ 

`cat > /etc/docker/daemon.json << EOF
{
"exec-opts": ["native.cgroupdriver=systemd"],
"registry-mirrors" : ["http://registry.docker-cn.com","http://docker.mirrors.ustc.edu.cn","http://hub-mirror.c.163.com"],
"insecure-registries" : ["registry.docker-cn.com","docker.mirrors.ustc.edu.cn"],
"debug" : true,
"experimental" : true
}
EOF`
   - _重启docker：_ `systemctl restart docker && systemctl enable docker`

## 11 **安装k8s**
    
   -  _使用阿里云的 yum 仓库镜像(复制命令记得去掉空格):_

`cat <<EOF > /etc/yum.repos.d/kubernetes.repo    
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
  - _安装k8s：_ `yum install -y kubeadm kubelet kubectl`
  - _设置:_ `vim /etc/sysconfig/kubelet #插入: KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"`
  - _开机自动启动:_ `systemctl enable kubelet`  

 ` 上面命令三个机器都要执行`     
 [关闭防火墙到安装完k8s脚本](https://github.com/olongfen/olongfen.github.io/blob/master/script/k8s_install.sh)<br>
 [升级版脚本](https://github.com/olongfen/olongfen.github.io/blob/master/script/k8s_install_pro.sh)
 
 `重启服务器`

## 12 **部署k8s集群**
     
    - _Master:_
      
      - _初始化_: `kubeadm init --kubernetes-version=v1.18.3 --pod-network-cidr=172.16.0.0/16 --apiserver-advertise-address=192.168.136.128 --apiserver-cert-extra-sans=192.168.136.128,master   --image-repository registry.aliyuncs.com/google_containers` 
      
      - _初始化成功后出现_:
            
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
                  --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552
      
      -  _将当前用户配置为集群管理员（如果不配置，下次连接时会无法使用kubectl）,执行这三条命令：_ 
            
            ```
             mkdir -p $HOME/.kube
             
             cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
             
             chown $(id -u):$(id -g) $HOME/.kube/config
            ``` 
     
      
      - _配置网络_
                
                - 下载 calico docker 镜像:  wget https://docs.projectcalico.org/v3.9/manifests/calico.yaml
                
                - 查看需要哪些 docker 镜像: cat calico.yaml | grep image
                              image: calico/cni:v3.9.5
                              image: calico/cni:v3.9.5
                              image: calico/pod2daemon-flexvol:v3.9.5
                              image: calico/node:v3.9.5
                              image: calico/kube-controllers:v3.9.5
                - docker pull 上面的镜像
                
                - 修改 calico 资源清单文件:
                            # 由于 calico 自身网络发现机制有问题，比如集群重启后网络组件会有问题，这里修改下发现机制，添加第 607 和 608 行
                            604             # Auto-detect the BGP IP address.
                            605             - name: IP
                            606               value: "autodetect"
                            607             - name: IP_AUTODETECTION_METHOD
                            608               value: "interface=enp0s3.*"
                
                           `注意 interface 后面的网卡名字，我这里是用 VirtualBox 创建的虚拟机，网卡名字叫做 enp0s3 （可以使用 ip a 命令查看）`
                
                - 修改 kubeadm 初始化时指定的 pod-network-cidr:   
                    
                    621             - name: CALICO_IPV4POOL_CIDR
                    622               value: "172.16.0.0/16"       
                
                - 应用 calico 资源清单文件:  kubectl apply -f calico.yaml
                           
                   
    - _Node:_
       
       _加入节点:_  `kubeadm join 192.168.136.128:6443 --token 0s36r8.14ngpdohrkd12gn4 --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552`
              
# 13 **安装kuboard**
    
  - _install_
    
    ` kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml `
    
    `kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.6/metrics-server.yaml`
    
  - _查看运行状态:_  `kubectl get pods -l k8s.eip.work/name=kuboard -n kube-system`
    
  - _获取Token:_ ` kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}')`
    
    
  `然后访问您集群中任意节点的 32567 端口（http://any-of-your-node-ip:32567） ，即可打开 Kuboard 界面，比如我的 Node 节点 IP 为：http://192.168.136.130:32567,然后输入生成的token就可以登入了`
