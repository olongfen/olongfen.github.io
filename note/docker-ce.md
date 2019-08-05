## 在Ubuntu上安装Docker CE

卸载旧版本的Docker，旧版本的docker的名称为docker或docker-engine，如果已安装，请先卸载：

sudo apt-get remove docker docker-engine docker.io

Docker CE包现在称为docker-ce。

更新apt包索引：

sudo apt-get update

安装包以允许通过HTTPS使用存储库：

sudo apt-get install apt-transport-https \

ca-certificates \

curl \

software-properties-common

添加Docker的官方GPG密钥：

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

添加稳定存储库：

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

安装docker ce：

sudo apt-get update

sudo apt-get install docker-ce

如果想将Docker用作非root用户，现在应该考虑将你的用户添加到“docker”组，例如：

sudo usermod -aG docker your-user 


## 在Debian上安装Docker CE

更新apt包索引：

sudo apt-get update

安装包以允许通过HTTPS使用存储库：

sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common

添加Docker的官方GPG密钥：

curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add -

设置稳定的存储库：

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"

安装Docker：

sudo apt-get update

sudo apt-get install docker-ce

附：在Debian上卸载Docker CE的方法

如果要卸载Docker CE，请使用以下命令：

sudo apt-get purge docker-ce

清理images，容器和卷：

sudo rm -rf /var/lib/docker

 

## 在Fedora上安装Docker CE

卸载旧版本的Docker：

sudo dnf remove docker docker-common docker-selinux docker-engine-selinux docker-engine

配置Docker存储库：

sudo dnf -y install dnf-plugins-core

sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo

安装Docker CE：

sudo dnf install docker-ce

启动并启用docker服务：

sudo systemctl start docker && sudo systemctl enable docker

参考：在Fedora 29/Fedora 28系统上安装Docker的步骤。

 

## 在CentOS上安装Docker CE

卸载旧版本：

sudo yum remove docker docker-common docker-selinux docker-engine

安装Prereqs：

sudo yum install -y yum-utils device-mapper-persistent-data lvm2

设置stable repo：

sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

安装Docker CE：

sudo yum install docker-ce

如果出现依赖性错误，则运行：

sudo yum install -y --setopt=obsoletes=0 docker-ce docker-ce-selinux

启动并启用docker服务：

sudo systemctl start docker && sudo systemctl enable docker

 

## 在Arch上安装Docker CE

安装pacaur：

curl -s https://gist.githubusercontent.com/Tadly/0e65d30f279a34c33e9b/raw/pacaur_install.sh | bash

使用pacaur安装Docker CE：

pacaur --needed --noconfirm --noedit -S docker

