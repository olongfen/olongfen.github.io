<template><div><h1 id="ubuntu系统bug修复记录" tabindex="-1"><a class="header-anchor" href="#ubuntu系统bug修复记录" aria-hidden="true">#</a> Ubuntu系统bug修复记录</h1>
<h2 id="nvidia-显卡" tabindex="-1"><a class="header-anchor" href="#nvidia-显卡" aria-hidden="true">#</a> NVIDIA 显卡</h2>
<h3 id="手动安装-稳定、靠谱" tabindex="-1"><a class="header-anchor" href="#手动安装-稳定、靠谱" aria-hidden="true">#</a> 手动安装（稳定、靠谱）</h3>
<h4 id="初次安装驱动安装前必须安装依赖" tabindex="-1"><a class="header-anchor" href="#初次安装驱动安装前必须安装依赖" aria-hidden="true">#</a> 初次安装驱动安装前必须安装依赖</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token function">sudo</span> <span class="token function">apt-get</span> update
  <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> g++ gcc <span class="token function">make</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看gpu型号" tabindex="-1"><a class="header-anchor" href="#查看gpu型号" aria-hidden="true">#</a> 查看GPU型号</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> lspci <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> nvidia
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="官网下载对应驱动版本" tabindex="-1"><a class="header-anchor" href="#官网下载对应驱动版本" aria-hidden="true">#</a> <a href="https://www.nvidia.cn/Download/index.aspx?lang=cn" target="_blank" rel="noopener noreferrer">官网下载对应驱动版本<ExternalLinkIcon/></a></h4>
<h4 id="卸载原有驱动" tabindex="-1"><a class="header-anchor" href="#卸载原有驱动" aria-hidden="true">#</a> 卸载原有驱动</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">sudo</span> <span class="token function">apt-get</span> remove <span class="token parameter variable">--purge</span> nvidia*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="禁用nouveau-nouveau是通用的驱动程序-必须" tabindex="-1"><a class="header-anchor" href="#禁用nouveau-nouveau是通用的驱动程序-必须" aria-hidden="true">#</a> 禁用nouveau(nouveau是通用的驱动程序)（必须）</h4>
<ul>
<li>打开blacklist.conf</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    <span class="token function">sudo</span> gedit /etc/modprobe.d/blacklist.conf 或者<span class="token punctuation">(</span>blacklist-nouveau.conf<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>在打开的blacklist.conf末尾添加如下，保存文本关闭</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>blacklist nouveau
 
options nouveau modeset=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在终端输入如下更新，更新结束后重启电脑（必须）</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    <span class="token function">sudo</span> update-initramfs <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>重启后在终端输入如下，没有任何输出表示屏蔽成功</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lsmod <span class="token operator">|</span> <span class="token function">grep</span> nouveau
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="装显卡后xorg失效无法显示图像界面" tabindex="-1"><a class="header-anchor" href="#装显卡后xorg失效无法显示图像界面" aria-hidden="true">#</a> 装显卡后xorg失效无法显示图像界面</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 自动重载xorg配置，重启系统生效</span>
<span class="token function">sudo</span> nvidia-xconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为了安装新的nvidia驱动程序-我们需要停止当前的显示服务器。最简单的方法是使用telinit命令更改为运行级别3。在终端输入以下linux命令后-显示服务器将停止。-必须" tabindex="-1"><a class="header-anchor" href="#为了安装新的nvidia驱动程序-我们需要停止当前的显示服务器。最简单的方法是使用telinit命令更改为运行级别3。在终端输入以下linux命令后-显示服务器将停止。-必须" aria-hidden="true">#</a> 为了安装新的Nvidia驱动程序，我们需要停止当前的显示服务器。最简单的方法是使用telinit命令更改为运行级别3。在终端输入以下linux命令后，显示服务器将停止。（必须</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入tty</span>
<span class="token function">sudo</span> telinit <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在文本界面中-禁用x-window服务-在终端输入-必须" tabindex="-1"><a class="header-anchor" href="#在文本界面中-禁用x-window服务-在终端输入-必须" aria-hidden="true">#</a> 在文本界面中，禁用X-window服务,在终端输入（必须）</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 如果是默认的gdm3显示管理器，命令为sudo /etc/init.d/gdm3 stop）</span>

<span class="token function">sudo</span> /etc/init.d/lightdm stop <span class="token comment">#或者（sudo service lightdm stop）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装显卡二进制" tabindex="-1"><a class="header-anchor" href="#安装显卡二进制" aria-hidden="true">#</a> 安装显卡二进制</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> NVIDIA-Linux-x86_64-430.26.run   <span class="token comment">#给你下载的驱动赋予可执行权限，才可以安装</span>
 
<span class="token function">sudo</span> ./NVIDIA-Linux-x86_64-430.26.run <span class="token comment">#（–no-opengl-files）   #安装</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="systemctl-无法启动新服务-too-many-open-files" tabindex="-1"><a class="header-anchor" href="#systemctl-无法启动新服务-too-many-open-files" aria-hidden="true">#</a> systemctl 无法启动新服务:  Too many open files</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    <span class="token function">vim</span> /etc/sysctl.conf
    <span class="token comment"># 添加 fs.inotify.max_user_instances=512</span>
    <span class="token comment"># 添加 fs.inotify.max_user_watches=262144</span>
    <span class="token function">sysctl</span> <span class="token parameter variable">-p</span> <span class="token comment"># 生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


