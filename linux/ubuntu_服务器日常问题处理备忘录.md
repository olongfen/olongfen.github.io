# ubuntu_服务器日常问题处理备忘录

## 显卡图像界面实现
```shell
# 自动重载xorg配置，重启系统生效
sudo nvidia-xconfig
```

## 内核被更新导致显卡无法使用

- [重装对应内核显卡](ubuntu.md)
- [安装Container Device](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)
- 

## Grup启动错误问题
- 修改/etc/default/grup文件的GRUB_DEFAULT指定到对应的内核， GRUB_DEFAULT="第一级菜单>第二级菜单”
- 更新grup配置
```shell
    update-grub
```

## 关闭系统自动更新
```shell
# 把后面的值全部设置成0
vim /etc/apt/apt.conf.d/10periodic
vim /etc/apt/apt.conf.d/20auto-upgrades
```