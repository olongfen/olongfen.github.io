<template><div><h2 id="ogr-操作矢量数据" tabindex="-1"><a class="header-anchor" href="#ogr-操作矢量数据" aria-hidden="true">#</a> OGR 操作矢量数据</h2>
<h3 id="ogr读取矢量数据" tabindex="-1"><a class="header-anchor" href="#ogr读取矢量数据" aria-hidden="true">#</a> OGR读取矢量数据</h3>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr


<span class="token keyword">def</span> <span class="token function">read_file</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">,</span> driver_name<span class="token operator">=</span><span class="token string">"ESRI Shapefile"</span> <span class="token punctuation">)</span><span class="token punctuation">:</span>
    driver <span class="token operator">=</span> ogr<span class="token punctuation">.</span>GetDriverByName<span class="token punctuation">(</span>driver_name<span class="token punctuation">)</span>
    ds <span class="token operator">=</span> driver<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">)</span>
    <span class="token comment"># 获取图层</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>ds<span class="token punctuation">.</span>GetLayerCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    layer <span class="token operator">=</span> ds<span class="token punctuation">.</span>GetLayer<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">#print(dir(layer))</span>
    <span class="token comment"># 查看图层要素</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>layer<span class="token punctuation">.</span>GetFeatureCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 查看图层范围</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>layer<span class="token punctuation">.</span>GetExtent<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># (75.9659275, 134.5129026, 18.2485402, 60.755592)对应西、东、南、北</span>
    <span class="token comment"># 图层的属性</span>
    layer_def <span class="token operator">=</span> layer<span class="token punctuation">.</span>GetLayerDefn<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>layer_def<span class="token punctuation">.</span>GetFieldCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        defn <span class="token operator">=</span> layer_def<span class="token punctuation">.</span>GetFieldDefn<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>defn<span class="token punctuation">.</span>GetName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>defn<span class="token punctuation">.</span>GetWidth<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>defn<span class="token punctuation">.</span>GetType<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>defn<span class="token punctuation">.</span>GetPrecision<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 读取图层要素 Feature</span>
    layer<span class="token punctuation">.</span>ResetReading<span class="token punctuation">(</span><span class="token punctuation">)</span>
    feature <span class="token operator">=</span> layer<span class="token punctuation">.</span>GetFeature<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment"># 要素属性</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>feature<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>feature<span class="token punctuation">.</span>GetFieldCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>feature<span class="token punctuation">.</span>GetField<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 要素的几何形状(Geometry)</span>
    geom <span class="token operator">=</span> feature<span class="token punctuation">.</span>GetGeometryRef<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">(</span>geom<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>geom<span class="token punctuation">.</span>GetGeometryName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>geom<span class="token punctuation">.</span>GetGeometryCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>geom<span class="token punctuation">.</span>GetPointCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>geom<span class="token punctuation">.</span>ExportToWkt<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    ds<span class="token punctuation">.</span>Destroy<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    read_file<span class="token punctuation">(</span><span class="token builtin">input</span><span class="token operator">=</span><span class="token string">'railways/railways.shp'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="图层概念" tabindex="-1"><a class="header-anchor" href="#图层概念" aria-hidden="true">#</a> 图层概念</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>在GIS中，Layer（图层）由同种要素（Feature）（如点、线、多边形等）组在一起的“层”

要素类：具有相同几何形状的要素的集合：点、线或多边形。我们最常见的两种要素类是简单要素类和拓扑要素类。简单要素类是指没有任何拓扑关系的点、线、多边形或注记。也就是说，一个要素类内的点与另一要素类中线要素的终点可以是一致的，但它们是不同的，其特点是可独立编辑。拓扑要素类局限在一定的图形范围内，它是一个由完整拓扑单元组成的一组要素类限定的对象。

要素数据集（要素集）：具有相同坐标系统的要素类的集合。我们可以选择在要素集的内部或外部组织简单要素类，但拓扑要素类只能在要素集内部组织，以确保它们具有相同的坐标系统。


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建shapefile" tabindex="-1"><a class="header-anchor" href="#创建shapefile" aria-hidden="true">#</a> 创建Shapefile</h3>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr
<span class="token keyword">import</span> os

driver <span class="token operator">=</span> ogr<span class="token punctuation">.</span>GetDriverByName<span class="token punctuation">(</span><span class="token string">"ESRI Shapefile"</span><span class="token punctuation">)</span>
out<span class="token operator">=</span><span class="token string">"demo/demo.shp"</span>
<span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>out<span class="token punctuation">)</span><span class="token punctuation">:</span>
    driver<span class="token punctuation">.</span>DeleteDataSource<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
<span class="token comment"># 创建数据</span>
ds <span class="token operator">=</span> driver<span class="token punctuation">.</span>CreateDataSource<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
<span class="token comment"># 创建图层</span>
layer <span class="token operator">=</span> ds<span class="token punctuation">.</span>CreateLayer<span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">,</span>geom_type<span class="token operator">=</span>ogr<span class="token punctuation">.</span>wkbPoint<span class="token punctuation">)</span>
<span class="token comment"># 添加一个新字段，只能在layer里加，而且还得保证layer里没有数</span>
field_defn <span class="token operator">=</span> ogr<span class="token punctuation">.</span>FieldDefn<span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">,</span>ogr<span class="token punctuation">.</span>OFTString<span class="token punctuation">)</span>
field_defn<span class="token punctuation">.</span>SetWidth<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>layer<span class="token punctuation">.</span>CreateField<span class="token punctuation">(</span>field_defn<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 然后从layer中读取相应的feature类型，并创建feature：</span>
feature_defn <span class="token operator">=</span> layer<span class="token punctuation">.</span>GetLayerDefn<span class="token punctuation">(</span><span class="token punctuation">)</span>
feature <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Feature<span class="token punctuation">(</span>feature_defn<span class="token punctuation">)</span>
<span class="token comment"># 设定几何形状</span>
point <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbPoint<span class="token punctuation">)</span>
point<span class="token punctuation">.</span>SetPoint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">118</span><span class="token punctuation">,</span><span class="token number">118</span><span class="token punctuation">)</span>
feature<span class="token punctuation">.</span>SetGeometry<span class="token punctuation">(</span>point<span class="token punctuation">)</span>
<span class="token comment"># 设置某字段值</span>
feature<span class="token punctuation">.</span>SetField<span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># 把feature写入图层</span>
layer<span class="token punctuation">.</span>CreateFeature<span class="token punctuation">(</span>feature<span class="token punctuation">)</span>
ds<span class="token punctuation">.</span>Destroy<span class="token punctuation">(</span><span class="token punctuation">)</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ogr创建要素几何形状-geometry" tabindex="-1"><a class="header-anchor" href="#ogr创建要素几何形状-geometry" aria-hidden="true">#</a> OGR创建要素几何形状（Geometry）</h4>
<ul>
<li>创建点、线、线环、多边形、复合几何形状</li>
</ul>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr

<span class="token comment"># 创建点要素</span>
point <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbPoint<span class="token punctuation">)</span>
point<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span>

<span class="token comment"># 创建线要素</span>
line <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbLineString<span class="token punctuation">)</span>
line<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">)</span>
line<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span>GetPointCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 创建线环</span>
ring <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbLinearRing<span class="token punctuation">)</span>
ring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
ring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
ring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
ring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
ring<span class="token punctuation">.</span>CloseRings<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>ring<span class="token punctuation">)</span>

<span class="token comment"># 创建多边形</span>
outring <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbLinearRing<span class="token punctuation">)</span>
outring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
outring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
outring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
outring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
outring<span class="token punctuation">.</span>CloseRings<span class="token punctuation">(</span><span class="token punctuation">)</span>
inring <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbLinearRing<span class="token punctuation">)</span>
inring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token number">25</span><span class="token punctuation">)</span>
inring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">,</span><span class="token number">25</span><span class="token punctuation">)</span>
inring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">,</span><span class="token number">75</span><span class="token punctuation">)</span>
inring<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token number">75</span><span class="token punctuation">)</span>
inring<span class="token punctuation">.</span>CloseRings<span class="token punctuation">(</span><span class="token punctuation">)</span>
polygon <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbPolygon<span class="token punctuation">)</span>
polygon<span class="token punctuation">.</span>AddGeometry<span class="token punctuation">(</span>outring<span class="token punctuation">)</span>
polygon<span class="token punctuation">.</span>AddGeometry<span class="token punctuation">(</span>inring<span class="token punctuation">)</span>
<span class="token comment"># 创建复合几何形状（MultiGeometry）</span>
multipoint <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbMultiPoint<span class="token punctuation">)</span>
point <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Geometry<span class="token punctuation">(</span>ogr<span class="token punctuation">.</span>wkbPoint<span class="token punctuation">)</span>
point<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span>
multipoint<span class="token punctuation">.</span>AddGeometry<span class="token punctuation">(</span>point<span class="token punctuation">)</span>

point<span class="token punctuation">.</span>AddPoint<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
multipoint<span class="token punctuation">.</span>AddGeometry<span class="token punctuation">(</span>point<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>multipoint<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空间过滤器" tabindex="-1"><a class="header-anchor" href="#空间过滤器" aria-hidden="true">#</a> 空间过滤器</h3>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr
<span class="token keyword">import</span> os

driver <span class="token operator">=</span> ogr<span class="token punctuation">.</span>GetDriverByName<span class="token punctuation">(</span><span class="token string">"ESRI Shapefile"</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">create_shp_by_layer</span><span class="token punctuation">(</span>output_file<span class="token punctuation">,</span>layer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> os<span class="token punctuation">.</span>access<span class="token punctuation">(</span>output_file<span class="token punctuation">,</span>os<span class="token punctuation">.</span>F_OK<span class="token punctuation">)</span><span class="token punctuation">:</span>
        driver<span class="token punctuation">.</span>DeleteDataSource<span class="token punctuation">(</span>output_file<span class="token punctuation">)</span>
    new_ds<span class="token operator">=</span>driver<span class="token punctuation">.</span>CreateDataSource<span class="token punctuation">(</span>output_file<span class="token punctuation">)</span>
    pt_layer <span class="token operator">=</span> new_ds<span class="token punctuation">.</span>CopyLayer<span class="token punctuation">(</span>layer<span class="token punctuation">,</span><span class="token string">''</span><span class="token punctuation">)</span>
    new_ds<span class="token punctuation">.</span>Destroy<span class="token punctuation">(</span><span class="token punctuation">)</span>

china_shp <span class="token operator">=</span> <span class="token string">"./china/china.shp"</span>
cover_shp <span class="token operator">=</span> <span class="token string">"./cover/cover.shp"</span>

china_ds <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Open<span class="token punctuation">(</span>china_shp<span class="token punctuation">)</span>
china_layer <span class="token operator">=</span> china_ds<span class="token punctuation">.</span>GetLayer<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
cover_ds <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Open<span class="token punctuation">(</span>cover_shp<span class="token punctuation">)</span>
cover_layer <span class="token operator">=</span> cover_ds<span class="token punctuation">.</span>GetLayer<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

cover_feats <span class="token operator">=</span>cover_layer<span class="token punctuation">.</span>GetNextFeature<span class="token punctuation">(</span><span class="token punctuation">)</span>
poly <span class="token operator">=</span> cover_feats<span class="token punctuation">.</span>GetGeometryRef<span class="token punctuation">(</span><span class="token punctuation">)</span>
china_layer<span class="token punctuation">.</span>SetSpatialFilter<span class="token punctuation">(</span>poly<span class="token punctuation">)</span>
create_shp_by_layer<span class="token punctuation">(</span><span class="token string">'/out/out.shp'</span><span class="token punctuation">,</span>china_layer<span class="token punctuation">)</span>

<span class="token comment"># 通过坐标选中要素</span>
china_layer<span class="token punctuation">.</span>ResetReading<span class="token punctuation">(</span><span class="token punctuation">)</span>
china_layer<span class="token punctuation">.</span>SetSpatialFilterRect<span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">33</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">)</span>
create_shp_by_layer<span class="token punctuation">(</span><span class="token string">'/out1/out.shp'</span><span class="token punctuation">,</span>china_layer<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在ogr中执行sql语句查询" tabindex="-1"><a class="header-anchor" href="#在ogr中执行sql语句查询" aria-hidden="true">#</a> 在OGR中执行sql语句查询</h4>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr
driver <span class="token operator">=</span> ogr<span class="token punctuation">.</span>GetDriverByName<span class="token punctuation">(</span><span class="token string">"ESRI Shapefile"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">create_shp_by_layer</span><span class="token punctuation">(</span>output_file<span class="token punctuation">,</span>layer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> os<span class="token punctuation">.</span>access<span class="token punctuation">(</span>output_file<span class="token punctuation">,</span>os<span class="token punctuation">.</span>F_OK<span class="token punctuation">)</span><span class="token punctuation">:</span>
        driver<span class="token punctuation">.</span>DeleteDataSource<span class="token punctuation">(</span>output_file<span class="token punctuation">)</span>
    new_ds<span class="token operator">=</span>driver<span class="token punctuation">.</span>CreateDataSource<span class="token punctuation">(</span>output_file<span class="token punctuation">)</span>
    pt_layer <span class="token operator">=</span> new_ds<span class="token punctuation">.</span>CopyLayer<span class="token punctuation">(</span>layer<span class="token punctuation">,</span><span class="token string">''</span><span class="token punctuation">)</span>
    new_ds<span class="token punctuation">.</span>Destroy<span class="token punctuation">(</span><span class="token punctuation">)</span>

out<span class="token operator">=</span><span class="token string">"railways/railways.shp"</span>
ds <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Open<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
layer <span class="token operator">=</span> ds<span class="token punctuation">.</span>GetLayer<span class="token punctuation">(</span><span class="token punctuation">)</span>
name <span class="token operator">=</span> layer<span class="token punctuation">.</span>GetName<span class="token punctuation">(</span><span class="token punctuation">)</span>
rs <span class="token operator">=</span> ds<span class="token punctuation">.</span>ExecuteSQL<span class="token punctuation">(</span><span class="token string">"select * from %s"</span><span class="token operator">%</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>

create_shp_by_layer<span class="token punctuation">(</span><span class="token string">'demo/demo.shp'</span><span class="token punctuation">,</span>rs<span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="根据属性条件选择要素" tabindex="-1"><a class="header-anchor" href="#根据属性条件选择要素" aria-hidden="true">#</a> 根据属性条件选择要素</h4>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> osgeo <span class="token keyword">import</span> ogr

driver <span class="token operator">=</span> ogr<span class="token punctuation">.</span>GetDriverByName<span class="token punctuation">(</span><span class="token string">"ESRI Shapefile"</span><span class="token punctuation">)</span>


out <span class="token operator">=</span> <span class="token string">"railways/railways.shp"</span>
ds <span class="token operator">=</span> ogr<span class="token punctuation">.</span>Open<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
layer <span class="token operator">=</span> ds<span class="token punctuation">.</span>GetLayer<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>layer<span class="token punctuation">.</span>GetFeatureCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
layer<span class="token punctuation">.</span>SetAttributeFilter<span class="token punctuation">(</span><span class="token string">"osm_id > '4182662'"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>layer<span class="token punctuation">.</span>GetFeatureCount<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空间计算" tabindex="-1"><a class="header-anchor" href="#空间计算" aria-hidden="true">#</a> 空间计算</h3>
<h4 id="地理数据处理-geoprocessing-计算函数" tabindex="-1"><a class="header-anchor" href="#地理数据处理-geoprocessing-计算函数" aria-hidden="true">#</a> 地理数据处理（geoprocessing）计算函数</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
多边形（Polygon）：

交：poly3.Intersection(poly2)

并：poly3.Union(poly2)

差：poly3.Difference(poly2)

补：poly3.SymmetricDifference(poly2)

几何形状(Geometry)：

给geometry加buffer，效果就是把点、线变成多边形，线条加粗： &lt;geom>.Buffer(&lt;distance>)；

两个geometry是否相等：&lt;geom1>.Equal(&lt;geom2>) ；

两个geometry之间的最短距离：&lt;geom1>.Distance(&lt;geom2>) ；

用方框边界框住这个几何形状，并返回四个角的点坐标(minx,maxx, miny, maxy)：&lt;geom>.GetEnvelope()。


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断两个对象的关系" tabindex="-1"><a class="header-anchor" href="#判断两个对象的关系" aria-hidden="true">#</a> 判断两个对象的关系</h4>
<ul>
<li>判断相交</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>poly2.Intersect(poly1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>判断不相交</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>poly2.Disjoint(poly1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>判断相邻</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>poly2.Touches(poly1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>横穿，指一条线穿过一个多边形</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> poly2.Crosses(line)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>判断被包含</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ptB.Within(poly1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>判断不被包含</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>poly1.Contains(ptB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>重叠</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>poly2.Overlaps(poly1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


