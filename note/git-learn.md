## git基本命令
``` 
git init 创建仓库

git status 查看当前状态

git log 查看历史信息记录

git add flieName 添加文件

git commit -m "备注添加信息"

git diff 查看当前修改信息详情
git diff --cache //查看已经add但是没有commit的内容
git diff HEAD //上面两个内容的合并

echo $HOME //查看git config的HOME路径
export $HOME=/c/gitconfig //配置git config的HOME路径

git checkout -- rmflie 撤销删除文件

删除库中文件 : git rm file

创建分支 : git branch newtest
删除分支 : git branch -d newtest
进入分支 : git checkout newtest
回到主分支 : git checkout master

合并分支 : git checkout master ==> git merge newtest --
对其他分支的更改不会反映在主分支上



git merge master //假设当前在test分支上面，把master分支上的修改同步到test分支上
git branch -r/-a //查看远程分支/全部分支
git fetch //把远程库的代码更新到本地库
git pull --rebase origin master //强制把远程库的代码跟新到当前分支上面
git pull origin master 拉代码
git stash list //查看所有的缓存
git stash pop //恢复本地分支到缓存状态
git stash //把未完成的修改缓存到栈容器中
git blame someFile //查看某个文件的每一行的修改记录（）谁在什么时候修改的）

git push origin master 提交代码
```

## git上传本地项目到github
 - 一. 绑定用户: 
    `git config --global user.name "xxx" `
    
    `git config --global user.email "xxx@gmail.com"`
    
    `git config --global credential.help store`
     
     查看配置:
      `git config --list`

- 二.  生成密钥对: ` ssh-keygen -t rsa -C 'XXX@gmail.com' `
        一路回车;
 
 - 三.  把生成密钥的.pub文件里面的内容添加到github账户的SSH里面
        
        测试是否有效: `ssh -T git@github.com`

- 四.  上传项目 
 
        1. 首先在github上创建一个空的项目demo
        
        2. 在本地创建demo目录: `mkdir demo && cd demo && echo "# demo " >> README.md`
        
        3. 初始化git: `git init`
        
        4. 添加当前目录所有文件: `git add . `
        
        5. 查看状态： `git status`
        
        6. 提交文件: `git commit -m "feat: init project"`
        
        7. 关联远程项目: `git remote add origin  https://github.com/srlemon/app.git(这个链接换成你的项目地址) `
        
        8. push到远程: `git push -u origin master`
          
