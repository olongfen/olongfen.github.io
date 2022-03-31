#!/bin/bash

sudo su

dnf update
wget -P -cd /etc/yum.repos.d/ http://download.virtualbox.org/virtualbox/rpm/fedora/virtualbox.repo
dnf install binutils gcc make patch libgomp glibc-headers glibc-devel kernel-headers kernel-devel dkms qt5-qtx11extras libxkbcommon
dnf install VirtualBox
/usr/lib/virtualbox/vboxdrv.sh setup
usermod -a -G vboxusers $USER

echo "安装完毕，请重启"
