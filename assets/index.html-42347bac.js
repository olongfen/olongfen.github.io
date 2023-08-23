import{_ as n,r as s,o as c,c as i,a as e,b as t,d as r,e as a}from"./app-e9d335a5.js";const d={},l=a('<h1 id="kubernetes-搭建集群笔记" tabindex="-1"><a class="header-anchor" href="#kubernetes-搭建集群笔记" aria-hidden="true">#</a> kubernetes 搭建集群笔记</h1><h2 id="_1-集群规划" tabindex="-1"><a class="header-anchor" href="#_1-集群规划" aria-hidden="true">#</a> 1 <strong>集群规划</strong></h2><p><em>准备三台虚拟机</em>: - master: 192.168.136.128 - node1: 192.168.136.130 - node2: 192.168.136.131</p><h2 id="_2-设置主机名" tabindex="-1"><a class="header-anchor" href="#_2-设置主机名" aria-hidden="true">#</a> 2 <strong>设置主机名</strong></h2><ul><li><em>master</em>: <code>hostnamectl set-hostname master</code></li><li><em>node1</em>: <code>hostnamectl set-hostname node1</code></li><li><em>node2</em>: <code>hostnamectl set-hostname node2</code></li><li><em>如果 DNS 不支持主机名称解析，还需要在每台机器的 /etc/hosts 文件中添加主机名和 IP 的对应关系：</em><code>cat &gt;&gt; /etc/hosts &lt;&lt;EOF 192.168.136.128 master 192.168.136.130 node1 192.168.136.131 node2 EOF</code></li></ul><h2 id="_3-关闭防火墙" tabindex="-1"><a class="header-anchor" href="#_3-关闭防火墙" aria-hidden="true">#</a> 3 <strong>关闭防火墙</strong></h2><pre><code>_三台机器都执行,关闭防火墙，清理防火墙规则，设置默认转发策略：_\n- `systemctl stop firewalld.service &amp;&amp; systemctl disable firewalld.service &amp;&amp;  firewall-cmd --state`   \n</code></pre><h2 id="_4-selinux-设置" tabindex="-1"><a class="header-anchor" href="#_4-selinux-设置" aria-hidden="true">#</a> 4 <strong>SELINUX 设置</strong></h2><ul><li><em>查看状态</em>: <code>setstatus</code></li><li><em>修改配置</em>: <code>sed -i &#39;s/^SELINUX=.*/SELINUX=disabled/&#39; /etc/selinux/config</code></li></ul><h2 id="_5-关闭swap分区" tabindex="-1"><a class="header-anchor" href="#_5-关闭swap分区" aria-hidden="true">#</a> 5 <strong>关闭swap分区</strong></h2><ul><li><em>三台机器都执行,关闭 swap 分区，否则kubelet 会启动失败(可以设置 kubelet 启动参数 --fail-swap-on 为 false 关闭 swap 检查)：</em><code>swapoff -a &amp;&amp; sed -i &#39;s/^\\/dev\\/mapper\\/centos-swap/#&amp;/&#39; /etc/fstab</code></li></ul><h2 id="_6-设置系统时区-时间同步" tabindex="-1"><a class="header-anchor" href="#_6-设置系统时区-时间同步" aria-hidden="true">#</a> 6 <strong>设置系统时区&amp;&amp;时间同步</strong></h2><ul><li><p><em>设置系统时区:</em> <code>timedatectl set-timezone Asia/Shanghai</code></p></li><li><p><em>设置时钟同步:</em> <code>systemctl enable chronyd &amp;&amp; systemctl start chronyd</code></p></li><li><p><em>查看同步状态:</em> <code>timedatectl status</code></p></li><li><p><em>将当前的 UTC 时间写入硬件时钟:</em> <code>timedatectl set-local-rtc 0</code></p></li><li><p><em>重启依赖于系统时间的服务:</em> <code>systemctl restart rsyslog &amp;&amp; systemctl restart crond</code></p></li><li><ul><li><strong>关闭无关服务</strong>:(可选关闭) <code>systemctl stop postfix &amp;&amp; systemctl disable postfix</code></li></ul></li></ul><h2 id="_7-添加网桥过滤" tabindex="-1"><a class="header-anchor" href="#_7-添加网桥过滤" aria-hidden="true">#</a> 7 <strong>添加网桥过滤</strong></h2><ul><li><em>添加网桥过滤及地址转发</em>: <code>cat &lt;&lt;EOF &gt; /etc/sysctl.d/k8s.conf net.bridge.bridge-nf-call-ip6tables = 1 net.bridge.bridge-nf-call-iptables = 1 net.ipv4.ip_forward = 1 vm.swappiness = 0 EOF </code></li><li><em>加载 br_netfilter 模块:</em> <code>modprobe br_netfilter</code></li><li><em>查看是否加载:</em> <code>lsmod | grep br_netfilter</code></li><li><em>加载网桥过滤配置文件:</em> <code>sysctl -p /etc/sysctl.d/k8s.conf</code></li></ul><h2 id="_8-服务器换阿里源" tabindex="-1"><a class="header-anchor" href="#_8-服务器换阿里源" aria-hidden="true">#</a> 8 <strong>服务器换阿里源</strong></h2><ul><li><p><em>备份源：</em> <code>mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak</code></p></li><li><p><em>修改OS源为阿里的仓库:</em> <code>curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo</code></p></li><li><p><em>导入阿里公钥</em><code> wget https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg &amp;&amp; rpm --import yum-key.gpg wget https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg &amp;&amp; rpm --import rpm-package-key.gpg</code></p></li><li><p><em>执行</em>: <code>yum clean all &amp;&amp; yum makecache</code></p></li></ul><h2 id="_9-开启-ipvs" tabindex="-1"><a class="header-anchor" href="#_9-开启-ipvs" aria-hidden="true">#</a> 9 <strong>开启 IPVS</strong></h2><ul><li><em>安装 ipset 及 ipvsadm:</em> <code> yum install -y ipset ipvsadm</code></li><li><em>添加需要加载的模块(复制命令记得去掉空格):</em><br><code>cat &lt;&lt;EOF &gt; /etc/sysconfig/modules/ipvs.modules modprobe -- ip_vs modprobe -- ip_vs_rr modprobe -- ip_vs_wrr modprobe -- ip_vs_sh modprobe -- nf_conntrack_ipv4 EOF</code></li><li><em>授权、运行、检查是否加载:</em> <code>chmod +x /etc/sysconfig/modules/ipvs.modules &amp;&amp; bash /etc/sysconfig/modules/ipvs.modules &amp;&amp; lsmod | grep -e ip_vs -e nf_conntrack_ipv4</code></li></ul><h2 id="_10-安装docker" tabindex="-1"><a class="header-anchor" href="#_10-安装docker" aria-hidden="true">#</a> 10 <strong>安装Docker</strong></h2><pre><code>- _安装依赖项:_ `yum install -y yum-utils device-mapper-persistent-data lvm2`\n- _添加docker源为阿里源:_ `yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`\n- _安装docker：_ `yum install docker-ce-18.06.3.ce-3.el7` \n- _添加镜像源：_ \n</code></pre><p><code>cat &gt; /etc/docker/daemon.json &lt;&lt; EOF { &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;], &quot;registry-mirrors&quot; : [&quot;http://registry.docker-cn.com&quot;,&quot;http://docker.mirrors.ustc.edu.cn&quot;,&quot;http://hub-mirror.c.163.com&quot;], &quot;insecure-registries&quot; : [&quot;registry.docker-cn.com&quot;,&quot;docker.mirrors.ustc.edu.cn&quot;], &quot;debug&quot; : true, &quot;experimental&quot; : true } EOF</code></p><ul><li><em>重启docker：</em> <code>systemctl restart docker &amp;&amp; systemctl enable docker</code></li></ul><h2 id="_11-安装k8s" tabindex="-1"><a class="header-anchor" href="#_11-安装k8s" aria-hidden="true">#</a> 11 <strong>安装k8s</strong></h2><ul><li><em>使用阿里云的 yum 仓库镜像(复制命令记得去掉空格):</em></li></ul><p><code>cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo [kubernetes] name=Kubernetes baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64 enabled=1 gpgcheck=1 repo_gpgcheck=1 gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg EOF </code></p><ul><li><em>安装k8s：</em> <code>yum install -y kubeadm kubelet kubectl</code></li><li><em>设置:</em> <code>vim /etc/sysconfig/kubelet #插入: KUBELET_EXTRA_ARGS=&quot;--cgroup-driver=systemd&quot;</code></li><li><em>开机自动启动:</em> <code>systemctl enable kubelet</code></li></ul>',27),m=e("code",null," 上面命令三个机器都要执行",-1),u=e("br",null,null,-1),p={href:"https://github.com/olongfen/olongfen.github.io/blob/master/script/k8s_install.sh",target:"_blank",rel:"noopener noreferrer"},h=e("br",null,null,-1),k={href:"https://github.com/olongfen/olongfen.github.io/blob/master/script/k8s_install_pro.sh",target:"_blank",rel:"noopener noreferrer"},b=a(`<p><code>重启服务器</code></p><h2 id="_12-部署k8s集群" tabindex="-1"><a class="header-anchor" href="#_12-部署k8s集群" aria-hidden="true">#</a> 12 <strong>部署k8s集群</strong></h2><pre><code>- _Master:_
  
  - _初始化_: \`kubeadm init --kubernetes-version=v1.18.3 --pod-network-cidr=172.16.0.0/16 --apiserver-advertise-address=192.168.136.128 --apiserver-cert-extra-sans=192.168.136.128,master   --image-repository registry.aliyuncs.com/google_containers\` 
  
  - _初始化成功后出现_:
        
        Your Kubernetes control-plane has initialized successfully!
             To start using your cluster, you need to run the following as a regular user:
               mkdir -p $HOME/.kube
               sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
               sudo chown $(id -u):$(id -g) $HOME/.kube/config
             You should now deploy a pod network to the cluster.
             Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
               https://kubernetes.io/docs/concepts/cluster-administration/addons/
             Then you can join any number of worker nodes by running the following on each as root:
             kubeadm join 192.168.136.128:6443 --token 0s36r8.14ngpdohrkd12gn4 \\
              --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552
  
  -  _将当前用户配置为集群管理员（如果不配置，下次连接时会无法使用kubectl）,执行这三条命令：_ 
        
        \`\`\`
         mkdir -p $HOME/.kube
         
         cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
         
         chown $(id -u):$(id -g) $HOME/.kube/config
        \`\`\` 
 
  
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
                        606               value: &quot;autodetect&quot;
                        607             - name: IP_AUTODETECTION_METHOD
                        608               value: &quot;interface=enp0s3.*&quot;
            
                       \`注意 interface 后面的网卡名字，我这里是用 VirtualBox 创建的虚拟机，网卡名字叫做 enp0s3 （可以使用 ip a 命令查看）\`
            
            - 修改 kubeadm 初始化时指定的 pod-network-cidr:   
                
                621             - name: CALICO_IPV4POOL_CIDR
                622               value: &quot;172.16.0.0/16&quot;       
            
            - 应用 calico 资源清单文件:  kubectl apply -f calico.yaml
                       
               
- _Node:_
   
   _加入节点:_  \`kubeadm join 192.168.136.128:6443 --token 0s36r8.14ngpdohrkd12gn4 --discovery-token-ca-cert-hash sha256:82655091bba3656f3a3061ef66df979af046837cbcb78e4a839d2211634d4552\`
</code></pre><h1 id="_13-安装kuboard" tabindex="-1"><a class="header-anchor" href="#_13-安装kuboard" aria-hidden="true">#</a> 13 <strong>安装kuboard</strong></h1><ul><li><p><em>install</em></p><p><code>kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml</code></p><p><code>kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.6/metrics-server.yaml</code></p></li><li><p><em>查看运行状态:</em> <code>kubectl get pods -l k8s.eip.work/name=kuboard -n kube-system</code></p></li><li><p><em>获取Token:</em> <code> kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-user | awk &#39;{print $1}&#39;)</code></p></li></ul><p><code>然后访问您集群中任意节点的 32567 端口（http://any-of-your-node-ip:32567） ，即可打开 Kuboard 界面，比如我的 Node 节点 IP 为：http://192.168.136.130:32567,然后输入生成的token就可以登入了</code></p>`,6);function g(_,y){const o=s("ExternalLinkIcon");return c(),i("div",null,[l,e("p",null,[m,u,e("a",p,[t("关闭防火墙到安装完k8s脚本"),r(o)]),h,e("a",k,[t("升级版脚本"),r(o)])]),b])}const v=n(d,[["render",g],["__file","index.html.vue"]]);export{v as default};
