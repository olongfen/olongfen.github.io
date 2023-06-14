<template><div><h2 id="换阿里源镜像" tabindex="-1"><a class="header-anchor" href="#换阿里源镜像" aria-hidden="true">#</a> 换阿里源镜像</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sudo su
mv /etc/yum.repos.d/fedora.repo fedora.repo.bak
mv /etc/yum.repos.d/fedora-updates.repo fedora-updates.repo.bak
wget -O /etc/yum.repos.d/fedora.repo http://mirrors.aliyun.com/repo/fedora.repo
wget -O /etc/yum.repos.d/fedora-updates.repo http://mirrors.aliyun.com/repo/fedora-updates.repo
dnf clean all
dnf makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装golang" tabindex="-1"><a class="header-anchor" href="#安装golang" aria-hidden="true">#</a> 安装golang</h2>
<h3 id="_1-下载golang安装包-解压到-usr-local-下面" tabindex="-1"><a class="header-anchor" href="#_1-下载golang安装包-解压到-usr-local-下面" aria-hidden="true">#</a> 1.下载golang安装包,解压到/usr/local/下面</h3>
<h3 id="_2-配置环境" tabindex="-1"><a class="header-anchor" href="#_2-配置环境" aria-hidden="true">#</a> 2. 配置环境</h3>
<p><code v-pre>vim ~/.bash_profile </code>  <br>
添加 <br>
<code v-pre>export GOROOT=/data/bin/go</code> <br>
<code v-pre>export GOPATH=/data/gocode/</code> <br>
<code v-pre>export PATH=$GOROOT/bin:$GOPATH/bin:$PATH </code> <br>
<code v-pre>export GO111MODULE=on </code><br>
然后执行: <code v-pre> source ~/.bash_profile</code></p>
<h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h2>
<h3 id="_1-卸载旧版本docker" tabindex="-1"><a class="header-anchor" href="#_1-卸载旧版本docker" aria-hidden="true">#</a> 1.卸载旧版本docker</h3>
<p><code v-pre>sudo dnf remove docker docker-common docker-selinux docker-engine-selinux docker-engine</code></p>
<h3 id="_2-配置docker存储库" tabindex="-1"><a class="header-anchor" href="#_2-配置docker存储库" aria-hidden="true">#</a> 2.配置docker存储库</h3>
<p><code v-pre>sudo dnf -y install dnf-plugins-core </code> <br>
<code v-pre>sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo</code></p>
<h3 id="_3-安装docker-ce" tabindex="-1"><a class="header-anchor" href="#_3-安装docker-ce" aria-hidden="true">#</a> 3.安装docker-ce</h3>
<p><code v-pre>sudo dnf install docker-ce</code></p>
<h3 id="a-启动docker服务" tabindex="-1"><a class="header-anchor" href="#a-启动docker服务" aria-hidden="true">#</a> a.启动docker服务</h3>
<p><code v-pre>sudo systemctl start docker</code></p>
<h3 id="b-给普通用户添加docker权限" tabindex="-1"><a class="header-anchor" href="#b-给普通用户添加docker权限" aria-hidden="true">#</a> b.给普通用户添加docker权限</h3>
<h4 id="添加docker用户组" tabindex="-1"><a class="header-anchor" href="#添加docker用户组" aria-hidden="true">#</a> 添加docker用户组</h4>
<pre><code>sudo groupadd docekr
</code></pre>
<h4 id="c-将登陆用户加入到docker用户组中" tabindex="-1"><a class="header-anchor" href="#c-将登陆用户加入到docker用户组中" aria-hidden="true">#</a> c.将登陆用户加入到docker用户组中</h4>
<pre><code>sudo gpasswd  -a ${USER} docker
</code></pre>
<h4 id="d-更新用户组" tabindex="-1"><a class="header-anchor" href="#d-更新用户组" aria-hidden="true">#</a> d.更新用户组</h4>
<pre><code>newgrp docker
</code></pre>
<h4 id="e-重启docker" tabindex="-1"><a class="header-anchor" href="#e-重启docker" aria-hidden="true">#</a> e.重启docker</h4>
<pre><code>sudo systemctl restart docker
</code></pre>
<h4 id="fedora31-遇到错误-》》》cgroups-cgroup-mountpoint-does-not-exist-unknown" tabindex="-1"><a class="header-anchor" href="#fedora31-遇到错误-》》》cgroups-cgroup-mountpoint-does-not-exist-unknown" aria-hidden="true">#</a> fedora31 遇到错误 》》》cgroups: cgroup mountpoint does not exist: unknown</h4>
<pre><code>     $ sudo dnf install -y grubby
     $ sudo grubby --update-kernel=ALL --args=&quot;systemd.unified_cgroup_hierarchy=0&quot;
     $ sudo reboot   
</code></pre>
<h3 id="_4-安装docker-compose" tabindex="-1"><a class="header-anchor" href="#_4-安装docker-compose" aria-hidden="true">#</a> 4.安装docker-compose</h3>
<p><code v-pre>sudo pip3 install docker-compose</code></p>
<h2 id="安装显卡驱动" tabindex="-1"><a class="header-anchor" href="#安装显卡驱动" aria-hidden="true">#</a> 安装显卡驱动</h2>
<h3 id="_1-添加rpmfusion源" tabindex="-1"><a class="header-anchor" href="#_1-添加rpmfusion源" aria-hidden="true">#</a> 1.添加rpmfusion源</h3>
<pre><code>到 [rpmfusion官网](https://rpmfusion.org/) 下载release版本的rpm进行安装  \
更新源: sudo dnf update \
dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
</code></pre>
<h3 id="_2-安装显卡驱动" tabindex="-1"><a class="header-anchor" href="#_2-安装显卡驱动" aria-hidden="true">#</a> 2.安装显卡驱动</h3>
<pre><code>sudo dnf install akmod-nvidia
For recent GeForce/Quadro/Tesla execute:
    # dnf install akmod-nvidia
For Legacy GeForce 400/500 execute:
    # dnf install xorg-x11-drv-nvidia-390xx akmod-nvidia-390xx
For Legacy GeForce 8/9/200/300 execute:
    # dnf install xorg-x11-drv-nvidia-340xx akmod-nvidia-340xx
</code></pre>
<h3 id="_3-卸载" tabindex="-1"><a class="header-anchor" href="#_3-卸载" aria-hidden="true">#</a> 3.卸载</h3>
<pre><code>sudo yum erase kmod-nvidia-PAE nvidia-xconfig xorg-x11-drv-nvidia xorg-x11-drv-nvidia-libs
</code></pre>
<h2 id="安装桌面优化工具" tabindex="-1"><a class="header-anchor" href="#安装桌面优化工具" aria-hidden="true">#</a> 安装桌面优化工具</h2>
<p><code v-pre>sudo dnf install gnome-tweak-tool</code>
运行：<code v-pre>./usr/bin/gnome-tweaks</code></p>
<h3 id="安装gnome-shell-扩展" tabindex="-1"><a class="header-anchor" href="#安装gnome-shell-扩展" aria-hidden="true">#</a> 安装gnome shell 扩展</h3>
<p><a href="https://extensions.gnome.org/" target="_blank" rel="noopener noreferrer">扩展官网<ExternalLinkIcon/></a>
NetSpeed 显示网速 <br>
<code v-pre>sudo cp Downloads/NetSpeed-master /usr/share/gnome-shell/extensions/</code></p>
<h3 id="安装和mac一样的dock栏" tabindex="-1"><a class="header-anchor" href="#安装和mac一样的dock栏" aria-hidden="true">#</a> 安装和mac一样的dock栏</h3>
<p><code v-pre>git clone https://github.com/micheleg/dash-to-dock.git</code> <br>
<code v-pre>make </code><br>
<code v-pre>make install</code> <br>
重启系统会在插件里面看见</p>
<h3 id="主题安装" tabindex="-1"><a class="header-anchor" href="#主题安装" aria-hidden="true">#</a> 主题安装</h3>
<p><a href="https://www.gnome-look.org/" target="_blank" rel="noopener noreferrer">主题官网<ExternalLinkIcon/></a>
把喜欢的主题克隆下来,复制到/usr/share/themes/下面
例如: <br>
<code v-pre>git clone https://gitlab.com/LinxGem33/X-Arc-White</code> <br>
<code v-pre>cd X-Arc-White</code> <br>
sudo mv -r X-Arc-White /usr/share/themes/</p>
<h3 id="安装图标也是这样的方法-但是文件要移到-usr-share-icons目录下" tabindex="-1"><a class="header-anchor" href="#安装图标也是这样的方法-但是文件要移到-usr-share-icons目录下" aria-hidden="true">#</a> 安装图标也是这样的方法，但是文件要移到/usr/share/icons目录下</h3>
<h3 id="安装protobuf脚本" tabindex="-1"><a class="header-anchor" href="#安装protobuf脚本" aria-hidden="true">#</a> 安装protobuf脚本</h3>
<p><a href="https://github.com/olongfen/olongfen.github.io/blob/master/script/install_protobuf.sh" target="_blank" rel="noopener noreferrer">脚本<ExternalLinkIcon/></a></p>
<h3 id="安装-virtualbox脚本" tabindex="-1"><a class="header-anchor" href="#安装-virtualbox脚本" aria-hidden="true">#</a> 安装 VirtualBox脚本</h3>
<p><a href="https://github.com/olongfen/olongfen.github.io/blob/master/script/virtualBox_install.sh" target="_blank" rel="noopener noreferrer">脚本<ExternalLinkIcon/></a></p>
<h3 id="安装-grpc-环境" tabindex="-1"><a class="header-anchor" href="#安装-grpc-环境" aria-hidden="true">#</a> 安装 grpc 环境</h3>
<p><a href="https://github.com/olongfen/olongfen.github.io/blob/master/script/install_grpc.sh" target="_blank" rel="noopener noreferrer">脚本<ExternalLinkIcon/></a></p>
<h3 id="前端项目" tabindex="-1"><a class="header-anchor" href="#前端项目" aria-hidden="true">#</a> 前端项目</h3>
<ul>
<li>question
<code v-pre>Error: ENOSPC: System limit for number of file watchers reached, watch '/home/foldername/abcrypto/static</code></li>
<li>answer
<code v-pre>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf &amp;&amp; sudo sysctl -p</code></li>
</ul>
</div></template>


