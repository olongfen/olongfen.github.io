import{_ as e,o as a,c as s,e as n}from"./app-e9d335a5.js";const c={},i=n(`<h1 id="centos7-安装证书" tabindex="-1"><a class="header-anchor" href="#centos7-安装证书" aria-hidden="true">#</a> centos7 安装证书</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 复制证书</span>
<span class="token function">cp</span> your.cer /etc/pki/ca-trust/source/anchors/
<span class="token comment"># 做软连接</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/pki/ca-trust/source/anchors/your.cer /etc/ssl/certs/your.cer
<span class="token comment"># 更新系统证书</span>
update-ca-trust
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="centos7-安装cockpit监控集群" tabindex="-1"><a class="header-anchor" href="#centos7-安装cockpit监控集群" aria-hidden="true">#</a> centos7 安装cockpit监控集群</h1><h2 id="主机1安装" tabindex="-1"><a class="header-anchor" href="#主机1安装" aria-hidden="true">#</a> 主机1安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>    yum <span class="token function">install</span> <span class="token parameter variable">-y</span> cockpit cockpit-machines
    systemctl start cockpit
    systemctl <span class="token builtin class-name">enable</span> cockpit

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主机x安装" tabindex="-1"><a class="header-anchor" href="#主机x安装" aria-hidden="true">#</a> 主机x安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>        yum <span class="token function">install</span> <span class="token parameter variable">-y</span> cockpit
    systemctl start cockpit
    systemctl <span class="token builtin class-name">enable</span> cockpit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问主机1-9090端口-添加主机x的记录" tabindex="-1"><a class="header-anchor" href="#访问主机1-9090端口-添加主机x的记录" aria-hidden="true">#</a> 访问主机1:9090端口，添加主机x的记录</h2>`,8),t=[i];function r(l,d){return a(),s("div",null,t)}const u=e(c,[["render",r],["__file","base.html.vue"]]);export{u as default};
