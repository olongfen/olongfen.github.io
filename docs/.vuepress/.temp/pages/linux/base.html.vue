<template><div><h1 id="centos7-安装证书" tabindex="-1"><a class="header-anchor" href="#centos7-安装证书" aria-hidden="true">#</a> centos7 安装证书</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 复制证书</span>
<span class="token function">cp</span> your.cer /etc/pki/ca-trust/source/anchors/
<span class="token comment"># 做软连接</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/pki/ca-trust/source/anchors/your.cer /etc/ssl/certs/your.cer
<span class="token comment"># 更新系统证书</span>
update-ca-trust
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


