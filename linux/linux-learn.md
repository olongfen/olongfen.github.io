一.df格式
	（1） df -h 把磁盘的数据以简易的方式读取出来
	（2） df -h /etc 读取当前目录的容量格式
二.du格式
	du对文件和目录磁盘使用的空间的查看

三.fdisk(需要以管理员的身份运行)
	格式：fdisk [-l] 装置名称
	-l ：输出后面接的装置所有的分区内容
*/
/*
	VIM/VI的使用
		基本上 vi/vim 共分为三种模式，分别是命令模式（Command mode），
		输入模式（Insert mode）和底线命令模式（Last line mode）

		命令模式：

		用户刚刚启动 vi/vim，便进入了命令模式。

		此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。

		以下是常用的几个命令：

		i 切换到输入模式，以输入字符。
		x 删除当前光标所在处的字符。
		:切换到底线命令模式，以在最底一行输入命令。
		若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。

		命令模式只有一些最基本的命令，因此仍要依靠底线命令模式输入更多命令。

		输入模式

		在命令模式下按下i就进入了输入模式。

		在输入模式中，可以使用以下按键：

		字符按键以及Shift组合，输入字符
		ENTER，回车键，换行
		BACK SPACE，退格键，删除光标前一个字符
		DEL，删除键，删除光标后一个字符
		方向键，在文本中移动光标
		HOME/END，移动光标到行首/行尾
		Page Up/Page Down，上/下翻页
		Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
		ESC，退出输入模式，切换到命令模式
		底线命令模式

		在命令模式下按下:（英文冒号）就进入了底线命令模式。

		底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。

		在底线命令模式中，基本的命令有（已经省略了冒号）：

		q 退出程序
		w 保存文件
		按ESC键可随时退出底线命令模式。
		
		
		
修改用户名：
	su
	usermod -l newusername -d /home/newusername -m oldsuername
	usermod -l 新用户名 老用户名
	修改密码：
	1. 修改普通用户密码

        命令： su                 获取root权限

        命令：passwd 用户名
	    输入两遍新密码
        选项：

            -l 锁定口令，即禁用账号。
            -u 口令解锁。
            -d 使账号无口令。
            -f 强迫用户下次登录时修改口令。
	2. 修改 root密码

        命令：passwd  root
	    输入两遍新密码
			
	 3.增加用户

        useradd 选项 用户名
        选项:
            -c comment 指定一段注释性描述。
            -d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
            -g 用户组 指定用户所属的用户组。
            -G 用户组，用户组 指定用户所属的附加组。
            -s Shell文件 指定用户的登录Shell。
            -u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。

- 配置服务器
       ` sudo vim /etc/hosts 
         添加： 服务器地址 命名(192.168.6.6 test.serve) 
         vim ~/.ssh/config
         添加： Host test.serve 
               Port 8080
         ssh-agent      
         ssh-copy-id     
       `
- privoxy 安装使用 
    ` 
      sudo dnf install privoxy
      sudo vim /etc/privoxy/config
      搜索 forward-socks5
      改这一行为 forward-socks5 / 127.0.0.1：1080 .
      在这一行上面加入 listen-addr 0.0.0.0:8118  
      sudo systemctl restart privoxy.service
    `      