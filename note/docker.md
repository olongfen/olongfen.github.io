
# Fedora 下docker入门笔记
#							 docker
# docker 安装
	卸载docker：sudo dnf remove docker
	 sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine

	安装依赖包：sudo dnf -y install dnf-plugins-core

	更新dnf：sudo dnf update

	安装docker：sudo dnf install docker -ce

	检查是否安装成功：sudo docker run hello-world

	建立docker用户组：sudo groupadd docker

	非root用户加入用户组：sudo gpasswd -a ${USER} docker
    
	重启：sudo service docker restart
    
    切换当前会话到新组【group】或重启会话: newgrp docker

# docker运行关闭指令
	// 运行
	systemctl start docker
	// 关闭
	systemctl stop docker
	// 重启
	systemctl restart docker
# 镜像加速器 
	cat /etc/docker/daemon.json 
	sudo vim /etc/docker/daemon.json 
		add:
			{
  				"registry-mirrors": [
   		 		"https://registry.docker-cn.com"
 			 				]
			}	
	sudo systemctl restart docker
# docker获取镜像命令
	获取镜像：docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
		比如：docker pull fedora:29
		     docker pull ubunyu // 自动获取最新的版本
	列举镜像：docker image ls
	查看镜像空间：docker system df
	删除镜像：docker image  rm [name]
	构建镜像:docker build [选项] <上下文路径/URL/->
# docker 容器管理
	// 创建容器
    		docker run -itd -p 8080:80 --name=my-nginx -v $PWD/test.html:/usr/share/nginx/html/ 
    		-v 启动镜像容器并挂载本地目录
		-it:交互的终端模式，--rm：避免浪费空间  bash:交互式 Shell
	// 打开容器：
        	docker exec -it 容器名或id bash 
	// 导出容器：
        	docker export 容器id > 生成的文件名.tar
    	// 导入容器：
        	docker import 容器文件
    	//  停止容器运行和删除：
		docker stop containerId // containerId 是容器的ID
		docker stop $(docker ps -a -q) //  stop停止所有容器
		docker  rm $(docker ps -a -q) //   remove删除所有容器
		docker rm -f 容器 强行删除容器
	
# docker 创建私有仓库
	1、pull registry
		docker pull registry
	2、创建本地存储目录
		mkdir -p /data/docker_registry
	3、 启动镜像容器并挂载本地目录
		docker run -d -p 5000:5000 -v /data/docker_registry:/var/lib/registry registry
	4、修改docker配置文件
		vim /lib/systemd/system/docker.service
		ExecStart=/usr/bin/dockerd --registry-mirror=https://registry.docker-cn.com --insecure-registry 127.0.0.1:5000
	5.拉一个镜像
		docker pull [镜像名称]:latest
	6、给镜像打tag
		docker tag [镜像id]  域名:镜像版本号
	7、推送到registry
		docker push 域名:镜像版本号
# docker 安装mysql镜像
	sudo docker pull mysql //拉下mysql镜像
	sudo docker image -a //查看 镜像
	// 运行mysql
	sudo docker run -p 3306:3306 --name mymysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
	// 进入mysql容器
	docker run -it  mysql bash
	// 进入mysql
	mysql -uroot -p
	// 导入sql文件
	sudo docker cp /home/allen/file/user.sql 容器名称:/home ，然后进入mysql，执行source /home/user.sql
	

# docker 安装 nginx
    // 拉取ngixn
    sudo docker pull nginx
    // 创建自己的容器
    sudo docker run -d -p 8080:80 --name my_nginx nginx
    // 进入容器 
    sudo docker exec -itd my_nginx bash
    // 进入容器后,输出hello_world(打开127.0.0.1：8080)
    echo "<h1>Hello World !!!</h1>" /usr/share/nginx/html/index.html
    
# 安装docker-compose
	 // 下载
	curl -L https://github.com/docker/compose/releases/download/1.15.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
        // 设定权限
	chmod +x /usr/local/bin/docker-compose
# docker 配置LNMP
    安装 nginx，php:5.6 ,mysql
    mkdir -p nginx/www nginx/conf #创建nginx目录用来挂载容器www和conf目录
    // 创建一个mysql容器，端口3306，密码123456，-d宿主机以守护进程在后台运行
    docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mymysql mysql
    // -v 将当前宿主机挂载到容器的/usr/share/nginx/html目录
    // --link用于php-fpm和mysql容器之间的通信
    docker run -d -p 9000:9000 -v $PWD:/www:/usr/share/nginx/html --name myphpfpm mymysql:mysql  php:5.6-fpm
    // #构建Nginx容器
    docker run -d -p 8080:80 -v $PWD:/www:/usr/share/nginx/html --name mynginx myphpfpm:phpfpm  nginx
    
    // docker exec -it mynginx /bin/bash #进入nginx修改配置
    // vi /etc/nginx/conf.d/default.conf
    /*
    location ~ \.php$ {
      fastcgi_pass   phpfpm:9000;
      fastcgi_index  index.php;
      fastcgi_param  SCRIPT_FILENAME  /usr/share/nginx/html$fastcgi_script_name;
      fastcgi_param  SCRIPT_NAME      $fastcgi_script_name;
      include        fastcgi_params;
    }*/

     vim default.conf //然后写入上面的内容
  
     // 拷贝到nginx容器
    docker cp $PWD:default.conf nginx:/etc/nginx/conf.d/default.conf
  
    // php-fpm没安装pdo扩展，安装相应扩展,先进入php容器
    docker exec -it myphpfpm /bin/bash
     cd /usr/bin
    docker-php-ext-install pdo_mysql
  
    看到mysql、php-fpm和nginx服务都起来了，接下来我们验证一下配置是否正确：
    在www下新建index.php文件,输入<?php phpinfo();?>,保存退出,打开浏览器输入localhost:8080/index.php，
    可以看到php信息，说明我们的php和nginx的服务都没问题,再验证mysql数据库的使用是否正常，修改index.php,
    加入下面代码，然后再输入localhost:8080/index.php,回车，lnmp开发环境就搭建完成啦.
# docker安装pgadmin4 和 pg 
	创建一个目录挂载数据
	mkdir /www/pg/data
	cd /www/pg
	chmod -R 777 data
	touch docker-compose.yml
	vim docker-compose.yml
	写入：
	version: '3'

	services:
    		pgsql:
       	 	image: postgres:10.5
        	volumes:
            		- /www/web/pg/data :/var/lib/postgresql/data
        	ports:
           		 - 5432:5432
		environment:
		    POSTGRES_DB: test
		    POSTGRES_USER: root
		    POSTGRES_PASSWORD: 123456
	    pgadmin4:
		image: dpage/pgadmin4
		ports:
		    - 8001:80
		environment:
		    PGADMIN_DEFAULT_EMAIL: a@b.com
		    PGADMIN_DEFAULT_PASSWORD: 123456
	执行：
	docker-compose up -d 等待执行完毕，成功安装
# docker 安装thrift，生成.go文件
	(1) docker pull thrift:0.12.0
	(2) 系统目录下新建文件，添加并编写.thrift文件
	(3) docker run -v ￥PWD：/data thrift thrift -o /data --gen go /data/service.thrift
