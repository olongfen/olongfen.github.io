import{_ as a,o as n,c as s,e}from"./app-e9d335a5.js";const i={},l=e(`<h2 id="spatialite" tabindex="-1"><a class="header-anchor" href="#spatialite" aria-hidden="true">#</a> SpatiaLite</h2><h3 id="什么是spatialite" tabindex="-1"><a class="header-anchor" href="#什么是spatialite" aria-hidden="true">#</a> 什么是SpatiaLite</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SpatiaLite是SQLite数据的空间数据引擎。 为了使用SQLite能够处理空间数据，需要在SQLite中加载空间扩展。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="spatialite主要功能" tabindex="-1"><a class="header-anchor" href="#spatialite主要功能" aria-hidden="true">#</a> SpatiaLite主要功能</h3><ul><li>支持WKT和WKB格式。</li><li>支持SQL空间函数AsText(),GeomFromText(),Area(),PointN()。</li><li>对OpenGIS空间函数集的完全支持需要借助于GEOS， 支持高级复杂空间分析函数如：Overlaps(), Touches(), Union(), Buffer()等</li><li>支持导入导出Shapefile</li><li>可以处理大多数的图形数据，包括：点、线、多边形、点集合、线集合、多边形集合和几何对象集。</li><li>每个几何要素都有一个空间参照标志符(spatial reference identifier，SRID)，来标识其空间参照。</li><li>几何对象列包括特定的几何类型和特定的SRID。可以阻止在数据库表中保存错误的几何对象或错误的空间参照。</li><li>支持几何对象在WKT和WKB格式之间进行转换。</li><li>支持几何功能，如面积量算，多边形和线简化，几何对象的距离量算，几何对象集合计算（九交模型），以及缓冲区生成等。</li><li>支持几何对象在不同空间参照系间转换，以及平移、缩放或旋转几何对象。</li><li>支持用最小外包矩形来快速计算空间关系</li><li>支持用几何对象自身的空间关系运算（九交模型，如相等，接触和交叉等等），而不是用最小矩形来计算。</li><li>正确运用R-树索引可以大大提高空间查询的速度。</li><li>实施空间索引的另外一种方法是利用MBR内存缓冲。这是用最小边界矩形来索引要素的极快方法，但是受限于可用的RAM，所以不适于大型数据集。</li></ul><h3 id="环境安装" tabindex="-1"><a class="header-anchor" href="#环境安装" aria-hidden="true">#</a> 环境安装</h3><ul><li>conda</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>conda <span class="token function">install</span> <span class="token parameter variable">-c</span> anaconda libspatialite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>ubuntu</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libspatialite7 libsqlite3-mod-spatialite
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> python-pyspatialite
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> spatialite-bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="spatialite-常用指令" tabindex="-1"><a class="header-anchor" href="#spatialite-常用指令" aria-hidden="true">#</a> Spatialite 常用指令</h3><ul><li>导入GIS数据</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 说明： shp文件自己准备</span>
ogr2ogr <span class="token parameter variable">-f</span> SQLite <span class="token parameter variable">-dsco</span> <span class="token assign-left variable">SPATIALITE</span><span class="token operator">=</span>YES railways.db railways/railways.shp <span class="token parameter variable">-nlt</span> LINESTRING
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查询数据</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spatialite railways.db
spatialite&gt; .headers on
spatialite&gt; select * from railways limit 10;
ogc_fid|osm_id|name|type|GEOMETRY
1|4181592|港鐵機場快綫 MTR Airport Express|rail|
2|4181898|港鐵機場快綫/東涌綫 MTR Airport Express|rail|
3|4182662|港鐵機場快綫 MTR Airport Express|rail|
4|4338940|山頂纜車 Peak Tram|funicular|
5|4734640||rail|
6|4734641||rail|
7|4959070|港鐵機場快綫 MTR Airport Express|rail|
8|4959071|港鐵機場快綫 MTR Airport Express|rail|
9|7370291||rail|
10|7370318||rail|

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>导出GIS数据</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spatialite railways.db
spatialite&gt; .dumpshp railways Geometry demo utf-8 LINESPRING
========
Dumping SQLite table &#39;railways&#39; into shapefile at &#39;demo&#39;

Exported 63264 rows into SHAPEFILE
========

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>python 简单读取例子</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> sqlite3
conn  <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&quot;railways.db&quot;</span><span class="token punctuation">)</span>
conn<span class="token punctuation">.</span>enable_load_extension<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
conn<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&#39;select load_extension(&quot;mod_spatialite.so.7&quot;)&#39;</span><span class="token punctuation">)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>

sql <span class="token operator">=</span> <span class="token string">&#39;select ogc_fid,osm_id,name,NumPoints(Geometry), GLength(Geometry) ,Dimension(Geometry),&#39;</span> \\
      <span class="token string">&#39; GeometryType(Geometry)  from railways limit 10&#39;</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>sql<span class="token punctuation">)</span>

<span class="token keyword">for</span> x <span class="token keyword">in</span> cursor<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),t=[l];function r(d,c){return n(),s("div",null,t)}const p=a(i,[["render",r],["__file","spatialite.html.vue"]]);export{p as default};
