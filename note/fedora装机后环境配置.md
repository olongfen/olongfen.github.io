## 安装golang  

### 1.下载golang安装包,解压到/usr/local/下面

### 2. 配置环境
  `vim ~/.bash_profile `  \
  添加 \
  ` export GOROOT=/data/bin/go ` \ 
  ` export GOPATH=/data/gocode/ ` \
  ` export PATH=$GOROOT/bin:GOPATH/bin:$PATH  ` \
  ` export GO111MODULE=on  `\
  然后执行: ` source ~/.bash_profile`
## 安装docker 
  ### 1.卸载旧版本docker
  `sudo dnf remove docker docker-common docker-selinux docker-engine-selinux docker-engine`
  ### 2.配置docker存储库
  `sudo dnf -y install dnf-plugins-core ` \
  ` sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo `
  ### 3.安装docker-ce
  `sudo dnf install docker-ce`
  ### a.启动docker服务
  `sudo systemctl start docker`
  ### b.给普通用户添加docker权限
  #### 添加docker用户组
    sudo groupadd docekr
  #### c.将登陆用户加入到docker用户组中
    sudo gpasswd  -a ${USER} docker
  #### d.更新用户组
    newgrp docker
  #### e.重启docker
    sudo systemctl restart docekr
 ### 4.安装docker-compose
 `sudo pip3 install docker-compose`
 ## 安装显卡驱动
 ### 1.添加rpmfusion源
    到 [rpmfusion官网](https://rpmfusion.org/) 下载release版本的rpm进行安装  \
    更新源: sudo dnf update \
    dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
    dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
 ### 2.安装显卡驱动
    sudo dnf install akmod-nvidia
    For recent GeForce/Quadro/Tesla execute:
        # dnf install akmod-nvidia
    For Legacy GeForce 400/500 execute:
        # dnf install xorg-x11-drv-nvidia-390xx akmod-nvidia-390xx
    For Legacy GeForce 8/9/200/300 execute:
        # dnf install xorg-x11-drv-nvidia-340xx akmod-nvidia-340xx
 ### 3.卸载   
    sudo yum erase kmod-nvidia-PAE nvidia-xconfig xorg-x11-drv-nvidia xorg-x11-drv-nvidia-libs
## 安装桌面优化工具
`sudo dnf install gnome-tweak-tool`
运行：`./usr/bin/gnome-tweaks`
### 安装gnome shell 扩展
[扩展官网](https://extensions.gnome.org/)
NetSpeed 显示网速 \
`sudo cp Downloads/NetSpeed-master /usr/share/gnome-shell/extensions/`
### 安装和mac一样的dock栏
`git clone https://github.com/micheleg/dash-to-dock.git` \
`make `\
`make install` \
重启系统会在插件里面看见
### 主题安装
[主题官网](https://www.gnome-look.org/)
把喜欢的主题克隆下来,复制到/usr/share/themes/下面
例如: \
`git clone https://gitlab.com/LinxGem33/X-Arc-White` \
`cd X-Arc-White` \
sudo mv -r X-Arc-White /usr/share/themes/
### 安装图标也是这样的方法，但是文件要移到/usr/share/icons目录下
