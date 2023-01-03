# Ubuntu系统bug修复记录
## NVIDIA 显卡
### 手动安装（稳定、靠谱）
#### 初次安装驱动安装前必须安装依赖
```shell
  sudo apt-get update
  sudo apt-get install g++ gcc make
    
```
#### 查看GPU型号
```shell
 lspci | grep -i nvidia
```
#### [官网下载对应驱动版本](https://www.nvidia.cn/Download/index.aspx?lang=cn)
#### 卸载原有驱动
```shell
 sudo apt-get remove --purge nvidia*
```
#### 禁用nouveau(nouveau是通用的驱动程序)（必须）
- 打开blacklist.conf
```shell
    sudo gedit /etc/modprobe.d/blacklist.conf 或者(blacklist-nouveau.conf)
```
- 在打开的blacklist.conf末尾添加如下，保存文本关闭
```text
blacklist nouveau
 
options nouveau modeset=0
```
- 在终端输入如下更新，更新结束后重启电脑（必须）
```shell
    sudo update-initramfs -u
```
- 重启后在终端输入如下，没有任何输出表示屏蔽成功
```shell
lsmod | grep nouveau
```
### 装显卡后xorg失效无法显示图像界面
```shell
# 自动重载xorg配置，重启系统生效
sudo nvidia-xconfig
```
### 为了安装新的Nvidia驱动程序，我们需要停止当前的显示服务器。最简单的方法是使用telinit命令更改为运行级别3。在终端输入以下linux命令后，显示服务器将停止。（必须
```shell
# 进入tty
sudo telinit 3
```
### 在文本界面中，禁用X-window服务,在终端输入（必须）

```shell
# 如果是默认的gdm3显示管理器，命令为sudo /etc/init.d/gdm3 stop）

sudo /etc/init.d/lightdm stop #或者（sudo service lightdm stop）
```
### 安装显卡二进制
```shell
sudo chmod 777 NVIDIA-Linux-x86_64-430.26.run   #给你下载的驱动赋予可执行权限，才可以安装
 
sudo ./NVIDIA-Linux-x86_64-430.26.run #（–no-opengl-files）   #安装
```
## systemctl 无法启动新服务:  Too many open files
```shell
    vim /etc/sysctl.conf
    # 添加 fs.inotify.max_user_instances=512
    # 添加 fs.inotify.max_user_watches=262144
    sysctl -p # 生效
```