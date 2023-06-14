<template><div><h1 id="ubuntu-服务器日常问题处理备忘录" tabindex="-1"><a class="header-anchor" href="#ubuntu-服务器日常问题处理备忘录" aria-hidden="true">#</a> ubuntu_服务器日常问题处理备忘录</h1>
<h2 id="显卡图像界面实现" tabindex="-1"><a class="header-anchor" href="#显卡图像界面实现" aria-hidden="true">#</a> 显卡图像界面实现</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 自动重载xorg配置，重启系统生效</span>
<span class="token function">sudo</span> nvidia-xconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内核被更新导致显卡无法使用" tabindex="-1"><a class="header-anchor" href="#内核被更新导致显卡无法使用" aria-hidden="true">#</a> 内核被更新导致显卡无法使用</h2>
<ul>
<li><RouterLink to="/linux/ubuntu.html">重装对应内核显卡</RouterLink></li>
<li><a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html" target="_blank" rel="noopener noreferrer">安装Container Device<ExternalLinkIcon/></a></li>
<li></li>
</ul>
<h2 id="grup启动错误问题" tabindex="-1"><a class="header-anchor" href="#grup启动错误问题" aria-hidden="true">#</a> Grup启动错误问题</h2>
<ul>
<li>修改/etc/default/grup文件的GRUB_DEFAULT指定到对应的内核， GRUB_DEFAULT=&quot;第一级菜单&gt;第二级菜单”</li>
<li>更新grup配置</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    <span class="token function">update-grub</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关闭系统自动更新" tabindex="-1"><a class="header-anchor" href="#关闭系统自动更新" aria-hidden="true">#</a> 关闭系统自动更新</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 把后面的值全部设置成0</span>
<span class="token function">vim</span> /etc/apt/apt.conf.d/10periodic
<span class="token function">vim</span> /etc/apt/apt.conf.d/20auto-upgrades
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


