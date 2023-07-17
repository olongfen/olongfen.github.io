<template><div><h1 id="一、准备一台主机" tabindex="-1"><a class="header-anchor" href="#一、准备一台主机" aria-hidden="true">#</a> 一、准备一台主机</h1>
<h2 id="_1-1-主机信息" tabindex="-1"><a class="header-anchor" href="#_1-1-主机信息" aria-hidden="true">#</a> 1.1 主机信息</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ip地址         系统       主机名
192.168.161.128   centos7.9   engine161.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-2-配置hosts" tabindex="-1"><a class="header-anchor" href="#_1-2-配置hosts" aria-hidden="true">#</a> 1.2 配置hosts</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    echo 192.168.161.128  engine161.com >> /etc/hosts
    echo 192.168.161.128  node161.com >> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="二、ovirt-engine安装配置" tabindex="-1"><a class="header-anchor" href="#二、ovirt-engine安装配置" aria-hidden="true">#</a> 二、Ovirt-engine安装配置</h1>
<h2 id="_2-1-安装ovirt-engine" tabindex="-1"><a class="header-anchor" href="#_2-1-安装ovirt-engine" aria-hidden="true">#</a> 2.1 安装ovirt-engine</h2>
<p>添加官方oVir存储库并安装ovirt-engine程序包和依赖包</p>
<ul>
<li>设置安装源</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> https://resources.ovirt.org/pub/yum-repo/ovirt-release43.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装ovirt-engine</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ovirt-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-2-配置ovirt-engine" tabindex="-1"><a class="header-anchor" href="#_2-2-配置ovirt-engine" aria-hidden="true">#</a> 2.2 配置ovirt-engine</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#执行安装命令,基本上一路默认执行下去</span>
engine-setup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-3-修改ovirt-engine登入方式" tabindex="-1"><a class="header-anchor" href="#_2-3-修改ovirt-engine登入方式" aria-hidden="true">#</a> 2.3 修改ovirt-engine登入方式</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/ovirt-engine/engine.conf.d/11-setup-sso.conf
<span class="token comment"># 添加</span>
<span class="token assign-left variable">SSO_CALLBACK_PREFIX_CHECK</span><span class="token operator">=</span>false 
<span class="token assign-left variable">SSO_ALTERNATE_ENGINE_FQDNS</span><span class="token operator">=</span><span class="token string">"192.168.161.128"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-4-安装计算节点" tabindex="-1"><a class="header-anchor" href="#_2-4-安装计算节点" aria-hidden="true">#</a> 2.4 安装计算节点</h2>
<ul>
<li>安装依赖</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 1.设置安装源, 这里为官方oVir存储库</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> http://resources.ovirt.org/pub/yum-repo/ovirt-release43.rpm
 
<span class="token comment"># 2.安装软件</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> qemu-kvm libvirt virt-install bridge-utils vdsm
yum <span class="token function">install</span> cockpit cockpit-ovirt-dashboard <span class="token parameter variable">-y</span>
<span class="token comment"># 3.安装ovirt-viewer</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ovirt-viewer
 
<span class="token comment"># 3.启动服务并设置开机启动</span>
systemctl start libvirtd
systemctl <span class="token builtin class-name">enable</span> libvirtd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建虚拟机镜像存储目录</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/vdsm/images
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/vdsm/iso
<span class="token function">chown</span> <span class="token parameter variable">-R</span> vdsm /home/vdsm/images
<span class="token function">chown</span> <span class="token parameter variable">-R</span> vdsm /home/vdsm/iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>添加镜像</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>copy镜像到/home/vdsm/iso/2eb33fb7-ecae-490a-9463-15016a6c41fb/images/11111111-1111-1111-1111-111111111111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建虚拟机教程" tabindex="-1"><a class="header-anchor" href="#创建虚拟机教程" aria-hidden="true">#</a> 创建虚拟机教程</h2>
<ul>
<li>新建数据中心-关联集群-关联主机-添加存储域-创建虚拟机</li>
</ul>
</div></template>


