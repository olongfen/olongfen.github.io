<template><div><h2 id="yapi-部署" tabindex="-1"><a class="header-anchor" href="#yapi-部署" aria-hidden="true">#</a> YAPI 部署</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">yapi-web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jayfong/yapi<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> yapi<span class="token punctuation">-</span>web
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 40001<span class="token punctuation">:</span><span class="token number">3000</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> YAPI_ADMIN_ACCOUNT=test@168.com
      <span class="token punctuation">-</span> YAPI_ADMIN_PASSWORD=111111
      <span class="token punctuation">-</span> YAPI_CLOSE_REGISTER=true
      <span class="token punctuation">-</span> YAPI_DB_SERVERNAME=yapi<span class="token punctuation">-</span>mongo
      <span class="token punctuation">-</span> YAPI_DB_PORT=27017
      <span class="token punctuation">-</span> YAPI_DB_DATABASE=yapi
      <span class="token punctuation">-</span> YAPI_MAIL_ENABLE=false
      <span class="token punctuation">-</span> YAPI_LDAP_LOGIN_ENABLE=false
      <span class="token punctuation">-</span> YAPI_PLUGINS=<span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> yapi<span class="token punctuation">-</span>mongo
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> yapi<span class="token punctuation">-</span>mongo
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
  <span class="token key atrule">yapi-mongo</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mongo<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> yapi<span class="token punctuation">-</span>mongo
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mongodata<span class="token punctuation">:</span>/data/db
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token number">27017</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">mongodata</span><span class="token punctuation">:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


