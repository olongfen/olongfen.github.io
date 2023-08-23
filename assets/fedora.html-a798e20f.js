import{_ as n,r as c,o as s,c as i,a as e,b as r,d as a,e as d}from"./app-e9d335a5.js";const t={},h=d(`<h2 id="换阿里源镜像" tabindex="-1"><a class="header-anchor" href="#换阿里源镜像" aria-hidden="true">#</a> 换阿里源镜像</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo su
mv /etc/yum.repos.d/fedora.repo fedora.repo.bak
mv /etc/yum.repos.d/fedora-updates.repo fedora-updates.repo.bak
wget -O /etc/yum.repos.d/fedora.repo http://mirrors.aliyun.com/repo/fedora.repo
wget -O /etc/yum.repos.d/fedora-updates.repo http://mirrors.aliyun.com/repo/fedora-updates.repo
dnf clean all
dnf makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装golang" tabindex="-1"><a class="header-anchor" href="#安装golang" aria-hidden="true">#</a> 安装golang</h2><h3 id="_1-下载golang安装包-解压到-usr-local-下面" tabindex="-1"><a class="header-anchor" href="#_1-下载golang安装包-解压到-usr-local-下面" aria-hidden="true">#</a> 1.下载golang安装包,解压到/usr/local/下面</h3><h3 id="_2-配置环境" tabindex="-1"><a class="header-anchor" href="#_2-配置环境" aria-hidden="true">#</a> 2. 配置环境</h3><p><code>vim ~/.bash_profile </code> <br> 添加 <br><code>export GOROOT=/data/bin/go</code> <br><code>export GOPATH=/data/gocode/</code> <br><code>export PATH=$GOROOT/bin:$GOPATH/bin:$PATH </code> <br><code>export GO111MODULE=on </code><br> 然后执行: <code> source ~/.bash_profile</code></p><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h2><h3 id="_1-卸载旧版本docker" tabindex="-1"><a class="header-anchor" href="#_1-卸载旧版本docker" aria-hidden="true">#</a> 1.卸载旧版本docker</h3><p><code>sudo dnf remove docker docker-common docker-selinux docker-engine-selinux docker-engine</code></p><h3 id="_2-配置docker存储库" tabindex="-1"><a class="header-anchor" href="#_2-配置docker存储库" aria-hidden="true">#</a> 2.配置docker存储库</h3><p><code>sudo dnf -y install dnf-plugins-core </code> <br><code>sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo</code></p><h3 id="_3-安装docker-ce" tabindex="-1"><a class="header-anchor" href="#_3-安装docker-ce" aria-hidden="true">#</a> 3.安装docker-ce</h3><p><code>sudo dnf install docker-ce</code></p><h3 id="a-启动docker服务" tabindex="-1"><a class="header-anchor" href="#a-启动docker服务" aria-hidden="true">#</a> a.启动docker服务</h3><p><code>sudo systemctl start docker</code></p><h3 id="b-给普通用户添加docker权限" tabindex="-1"><a class="header-anchor" href="#b-给普通用户添加docker权限" aria-hidden="true">#</a> b.给普通用户添加docker权限</h3><h4 id="添加docker用户组" tabindex="-1"><a class="header-anchor" href="#添加docker用户组" aria-hidden="true">#</a> 添加docker用户组</h4><pre><code>sudo groupadd docekr
</code></pre><h4 id="c-将登陆用户加入到docker用户组中" tabindex="-1"><a class="header-anchor" href="#c-将登陆用户加入到docker用户组中" aria-hidden="true">#</a> c.将登陆用户加入到docker用户组中</h4><pre><code>sudo gpasswd  -a \${USER} docker
</code></pre><h4 id="d-更新用户组" tabindex="-1"><a class="header-anchor" href="#d-更新用户组" aria-hidden="true">#</a> d.更新用户组</h4><pre><code>newgrp docker
</code></pre><h4 id="e-重启docker" tabindex="-1"><a class="header-anchor" href="#e-重启docker" aria-hidden="true">#</a> e.重启docker</h4><pre><code>sudo systemctl restart docker
</code></pre><h4 id="fedora31-遇到错误-》》》cgroups-cgroup-mountpoint-does-not-exist-unknown" tabindex="-1"><a class="header-anchor" href="#fedora31-遇到错误-》》》cgroups-cgroup-mountpoint-does-not-exist-unknown" aria-hidden="true">#</a> fedora31 遇到错误 》》》cgroups: cgroup mountpoint does not exist: unknown</h4><pre><code>     $ sudo dnf install -y grubby
     $ sudo grubby --update-kernel=ALL --args=&quot;systemd.unified_cgroup_hierarchy=0&quot;
     $ sudo reboot   
</code></pre><h3 id="_4-安装docker-compose" tabindex="-1"><a class="header-anchor" href="#_4-安装docker-compose" aria-hidden="true">#</a> 4.安装docker-compose</h3><p><code>sudo pip3 install docker-compose</code></p><h2 id="安装显卡驱动" tabindex="-1"><a class="header-anchor" href="#安装显卡驱动" aria-hidden="true">#</a> 安装显卡驱动</h2><h3 id="_1-添加rpmfusion源" tabindex="-1"><a class="header-anchor" href="#_1-添加rpmfusion源" aria-hidden="true">#</a> 1.添加rpmfusion源</h3><pre><code>到 [rpmfusion官网](https://rpmfusion.org/) 下载release版本的rpm进行安装  \\
更新源: sudo dnf update \\
dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \\
dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
</code></pre><h3 id="_2-安装显卡驱动" tabindex="-1"><a class="header-anchor" href="#_2-安装显卡驱动" aria-hidden="true">#</a> 2.安装显卡驱动</h3><pre><code>sudo dnf install akmod-nvidia
For recent GeForce/Quadro/Tesla execute:
    # dnf install akmod-nvidia
For Legacy GeForce 400/500 execute:
    # dnf install xorg-x11-drv-nvidia-390xx akmod-nvidia-390xx
For Legacy GeForce 8/9/200/300 execute:
    # dnf install xorg-x11-drv-nvidia-340xx akmod-nvidia-340xx
</code></pre><h3 id="_3-卸载" tabindex="-1"><a class="header-anchor" href="#_3-卸载" aria-hidden="true">#</a> 3.卸载</h3><pre><code>sudo yum erase kmod-nvidia-PAE nvidia-xconfig xorg-x11-drv-nvidia xorg-x11-drv-nvidia-libs
</code></pre><h2 id="安装桌面优化工具" tabindex="-1"><a class="header-anchor" href="#安装桌面优化工具" aria-hidden="true">#</a> 安装桌面优化工具</h2><p><code>sudo dnf install gnome-tweak-tool</code> 运行：<code>./usr/bin/gnome-tweaks</code></p><h3 id="安装gnome-shell-扩展" tabindex="-1"><a class="header-anchor" href="#安装gnome-shell-扩展" aria-hidden="true">#</a> 安装gnome shell 扩展</h3>`,38),l={href:"https://extensions.gnome.org/",target:"_blank",rel:"noopener noreferrer"},u=e("br",null,null,-1),p=e("code",null,"sudo cp Downloads/NetSpeed-master /usr/share/gnome-shell/extensions/",-1),f=d('<h3 id="安装和mac一样的dock栏" tabindex="-1"><a class="header-anchor" href="#安装和mac一样的dock栏" aria-hidden="true">#</a> 安装和mac一样的dock栏</h3><p><code>git clone https://github.com/micheleg/dash-to-dock.git</code> <br><code>make </code><br><code>make install</code> <br> 重启系统会在插件里面看见</p><h3 id="主题安装" tabindex="-1"><a class="header-anchor" href="#主题安装" aria-hidden="true">#</a> 主题安装</h3>',3),m={href:"https://www.gnome-look.org/",target:"_blank",rel:"noopener noreferrer"},b=e("br",null,null,-1),_=e("code",null,"git clone https://gitlab.com/LinxGem33/X-Arc-White",-1),g=e("br",null,null,-1),x=e("code",null,"cd X-Arc-White",-1),k=e("br",null,null,-1),v=e("h3",{id:"安装图标也是这样的方法-但是文件要移到-usr-share-icons目录下",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装图标也是这样的方法-但是文件要移到-usr-share-icons目录下","aria-hidden":"true"},"#"),r(" 安装图标也是这样的方法，但是文件要移到/usr/share/icons目录下")],-1),y=e("h3",{id:"安装protobuf脚本",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装protobuf脚本","aria-hidden":"true"},"#"),r(" 安装protobuf脚本")],-1),w={href:"https://github.com/olongfen/olongfen.github.io/blob/master/script/install_protobuf.sh",target:"_blank",rel:"noopener noreferrer"},O=e("h3",{id:"安装-virtualbox脚本",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装-virtualbox脚本","aria-hidden":"true"},"#"),r(" 安装 VirtualBox脚本")],-1),E={href:"https://github.com/olongfen/olongfen.github.io/blob/master/script/virtualBox_install.sh",target:"_blank",rel:"noopener noreferrer"},A=e("h3",{id:"安装-grpc-环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装-grpc-环境","aria-hidden":"true"},"#"),r(" 安装 grpc 环境")],-1),G={href:"https://github.com/olongfen/olongfen.github.io/blob/master/script/install_grpc.sh",target:"_blank",rel:"noopener noreferrer"},$=e("h3",{id:"前端项目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前端项目","aria-hidden":"true"},"#"),r(" 前端项目")],-1),L=e("ul",null,[e("li",null,[r("question "),e("code",null,"Error: ENOSPC: System limit for number of file watchers reached, watch '/home/foldername/abcrypto/static")]),e("li",null,[r("answer "),e("code",null,"echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p")])],-1);function T(N,F){const o=c("ExternalLinkIcon");return s(),i("div",null,[h,e("p",null,[e("a",l,[r("扩展官网"),a(o)]),r(" NetSpeed 显示网速 "),u,p]),f,e("p",null,[e("a",m,[r("主题官网"),a(o)]),r(" 把喜欢的主题克隆下来,复制到/usr/share/themes/下面 例如: "),b,_,r(),g,x,r(),k,r(" sudo mv -r X-Arc-White /usr/share/themes/")]),v,y,e("p",null,[e("a",w,[r("脚本"),a(o)])]),O,e("p",null,[e("a",E,[r("脚本"),a(o)])]),A,e("p",null,[e("a",G,[r("脚本"),a(o)])]),$,L])}const S=n(t,[["render",T],["__file","fedora.html.vue"]]);export{S as default};
