<template><div><h2 id="在ubuntu上安装docker-ce" tabindex="-1"><a class="header-anchor" href="#在ubuntu上安装docker-ce" aria-hidden="true">#</a> 在Ubuntu上安装Docker CE</h2>
<p>卸载旧版本的Docker，旧版本的docker的名称为docker或docker-engine，如果已安装，请先卸载：</p>
<p><code v-pre>sudo apt-get remove docker docker-engine docker.io</code></p>
<p>Docker CE包现在称为docker-ce。</p>
<p>更新apt包索引：</p>
<p><code v-pre>sudo apt-get update</code></p>
<p>安装包以允许通过HTTPS使用存储库：</p>
<div class="language-sudo line-numbers-mode" data-ext="sudo"><pre v-pre class="language-sudo"><code>
ca-certificates \

curl \

software-properties-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加Docker的官方GPG密钥：</p>
<p><code v-pre>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add  -</code></p>
<p>添加稳定存储库：</p>
<p><code v-pre>sudo add-apt-repository &quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable&quot; </code></p>
<p>安装docker ce：</p>
<p><code v-pre>sudo apt-get update</code></p>
<p><code v-pre>sudo apt-get install docker-ce</code></p>
<p>如果想将Docker用作非root用户，现在应该考虑将你的用户添加到“docker”组，例如：</p>
<p><code v-pre>sudo usermod -aG docker your-user </code></p>
<h2 id="在debian上安装docker-ce" tabindex="-1"><a class="header-anchor" href="#在debian上安装docker-ce" aria-hidden="true">#</a> 在Debian上安装Docker CE</h2>
<p>更新apt包索引：</p>
<p><code v-pre>sudo apt-get update</code></p>
<p>安装包以允许通过HTTPS使用存储库：</p>
<p><code v-pre>sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common</code></p>
<p>添加Docker的官方GPG密钥：</p>
<p><code v-pre>curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo &quot;$ID&quot;)/gpg | sudo apt-key add -</code></p>
<p>设置稳定的存储库：</p>
<p><code v-pre>sudo add-apt-repository &quot;deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo &quot;$ID&quot;) $(lsb_release -cs) stable&quot;</code></p>
<p>安装Docker：</p>
<p><code v-pre>sudo apt-get update</code></p>
<p><code v-pre>sudo apt-get install docker-ce</code></p>
<p>附：在Debian上卸载Docker CE的方法</p>
<p>如果要卸载Docker CE，请使用以下命令：</p>
<p><code v-pre>sudo apt-get purge docker-ce</code></p>
<p>清理images，容器和卷：</p>
<p><code v-pre>sudo rm -rf /var/lib/docker</code></p>
<h2 id="在fedora上安装docker-ce" tabindex="-1"><a class="header-anchor" href="#在fedora上安装docker-ce" aria-hidden="true">#</a> 在Fedora上安装Docker CE</h2>
<p>卸载旧版本的Docker：</p>
<p><code v-pre>sudo dnf remove docker docker-common docker-selinux docker-engine-selinux docker-engine</code></p>
<p>配置Docker存储库：</p>
<p><code v-pre>sudo dnf -y install dnf-plugins-core</code></p>
<p><code v-pre>sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo</code></p>
<p>安装Docker CE：</p>
<p><code v-pre>sudo dnf install docker-ce</code></p>
<p>启动并启用docker服务：</p>
<p><code v-pre>sudo systemctl start docker &amp;&amp; sudo systemctl enable docker</code></p>
<p>参考：在Fedora 29/Fedora 28系统上安装Docker的步骤。</p>
<h2 id="在centos上安装docker-ce" tabindex="-1"><a class="header-anchor" href="#在centos上安装docker-ce" aria-hidden="true">#</a> 在CentOS上安装Docker CE</h2>
<p>卸载旧版本：</p>
<p><code v-pre>sudo yum remove docker docker-common docker-selinux docker-engine</code></p>
<p>安装Prereqs：</p>
<p><code v-pre>sudo yum install -y yum-utils device-mapper-persistent-data lvm2</code></p>
<p>设置stable repo：</p>
<p><code v-pre>sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</code></p>
<p>安装Docker CE：</p>
<p><code v-pre>sudo yum install docker-ce</code></p>
<p>如果出现依赖性错误，则运行：</p>
<p><code v-pre>sudo yum install -y --setopt=obsoletes=0 docker-ce docker-ce-selinux</code></p>
<p>启动并启用docker服务：</p>
<p><code v-pre>sudo systemctl start docker &amp;&amp; sudo systemctl enable docker</code></p>
<h2 id="在arch上安装docker-ce" tabindex="-1"><a class="header-anchor" href="#在arch上安装docker-ce" aria-hidden="true">#</a> 在Arch上安装Docker CE</h2>
<p>安装pacaur：</p>
<p><code v-pre>curl -s https://gist.githubusercontent.com/Tadly/0e65d30f279a34c33e9b/raw/pacaur_install.sh | bash</code></p>
<p>使用pacaur安装Docker CE：</p>
<p><code v-pre>pacaur --needed --noconfirm --noedit -S docker</code></p>
</div></template>


