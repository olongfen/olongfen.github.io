<template><div><h2 id="gis-简介以及python环境安装" tabindex="-1"><a class="header-anchor" href="#gis-简介以及python环境安装" aria-hidden="true">#</a> GIS 简介以及Python环境安装</h2>
<h3 id="数据" tabindex="-1"><a class="header-anchor" href="#数据" aria-hidden="true">#</a> 数据</h3>
<ul>
<li>栅格数据由存放唯一值存储单元的行和列组成。</li>
<li>矢量数据利用了几何图形的点、线（一系列点坐标），或是面（形状决定于线）来表现客观对象。</li>
</ul>
<h3 id="数据处理模块gdal-ogr" tabindex="-1"><a class="header-anchor" href="#数据处理模块gdal-ogr" aria-hidden="true">#</a> 数据处理模块GDAL/OGR</h3>
<ul>
<li>GDAL读写不同栅格数据格式功能的抽象类库</li>
<li>OGR读写矢量数据格式功能的抽象类库</li>
</ul>
<h3 id="投影处理-proj" tabindex="-1"><a class="header-anchor" href="#投影处理-proj" aria-hidden="true">#</a> 投影处理：PROJ</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    PROJ是坐标投影转换类库，不同坐标投影之间切换
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装gdal" tabindex="-1"><a class="header-anchor" href="#安装gdal" aria-hidden="true">#</a> 安装gdal</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> add-apt-repository ppa:ubuntugis/ppa <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gdal-bin
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libgdal-dev
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CPLUS_INCLUDE_PATH</span><span class="token operator">=</span>/usr/include/gdal
<span class="token builtin class-name">export</span> <span class="token assign-left variable">C_INCLUDE_PATH</span><span class="token operator">=</span>/usr/include/gdal
pip <span class="token function">install</span> GDAL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


