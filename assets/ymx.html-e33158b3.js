import{_ as n,o as s,c as a,e as t}from"./app-e9d335a5.js";const p={},e=t(`<h2 id="一-python项目环境搭建" tabindex="-1"><a class="header-anchor" href="#一-python项目环境搭建" aria-hidden="true">#</a> 一.python项目环境搭建</h2><p><code>1. pip install virtualenv</code></p><p><code>2. virtualenv -p python3 --no-site-packages env</code></p><p><code>3. source env/bin/activate</code></p><p>清华源设置默认 :<code>pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple </code></p><p>临时安装: <code>pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package </code></p><p><code>4. pip install [your want package]</code></p><h2 id="二-python爬虫亚马逊网站商品信息" tabindex="-1"><a class="header-anchor" href="#二-python爬虫亚马逊网站商品信息" aria-hidden="true">#</a> 二.python爬虫亚马逊网站商品信息</h2><ul><li>把爬下来的数据进行分析，生成对应的.xlsx文件，包含商品的价格，星级，图片链接，名称等</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">from</span> selenium <span class="token keyword">import</span> webdriver
<span class="token keyword">from</span> selenium<span class="token punctuation">.</span>common<span class="token punctuation">.</span>exceptions <span class="token keyword">import</span> NoSuchElementException
<span class="token keyword">from</span> bs4 <span class="token keyword">import</span> BeautifulSoup
<span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token keyword">import</span> xlwt

<span class="token comment"># 关于样式</span>
style_head <span class="token operator">=</span> xlwt<span class="token punctuation">.</span>XFStyle<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 初始化样式</span>

font <span class="token operator">=</span> xlwt<span class="token punctuation">.</span>Font<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 初始化字体相关</span>
font<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;微软雅黑&quot;</span>
font<span class="token punctuation">.</span>bold <span class="token operator">=</span> <span class="token boolean">True</span>
font<span class="token punctuation">.</span>colour_index <span class="token operator">=</span> <span class="token number">1</span>

bg <span class="token operator">=</span> xlwt<span class="token punctuation">.</span>Pattern<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 初始背景图案</span>
bg<span class="token punctuation">.</span>pattern <span class="token operator">=</span> xlwt<span class="token punctuation">.</span>Pattern<span class="token punctuation">.</span>SOLID_PATTERN
bg<span class="token punctuation">.</span>pattern_fore_colour <span class="token operator">=</span> <span class="token number">4</span>
<span class="token comment"># 设置字体</span>
style_head<span class="token punctuation">.</span>font <span class="token operator">=</span> font
<span class="token comment"># 设置背景</span>
style_head<span class="token punctuation">.</span>pattern <span class="token operator">=</span> bg


<span class="token comment"># 创建一个excel</span>
excel <span class="token operator">=</span> xlwt<span class="token punctuation">.</span>Workbook<span class="token punctuation">(</span><span class="token punctuation">)</span>

baseUrl <span class="token operator">=</span> <span class="token string">&#39;https://www.amazon.com/Best-Sellers&#39;</span>

<span class="token comment"># 获取分类链接</span>
<span class="token keyword">def</span> <span class="token function">GetUrls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    arrUrl <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    browser <span class="token operator">=</span> webdriver<span class="token punctuation">.</span>Chrome<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;https://www.amazon.com/Best-Sellers/zgbs&#39;</span><span class="token punctuation">)</span>
        html <span class="token operator">=</span> browser<span class="token punctuation">.</span>page_source
        <span class="token comment"># print(html)</span>
        bsObj <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>html<span class="token punctuation">,</span> <span class="token string">&#39;html.parser&#39;</span><span class="token punctuation">)</span>
        d1 <span class="token operator">=</span> bsObj<span class="token punctuation">.</span>find_all<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> v <span class="token keyword">in</span> d1<span class="token punctuation">:</span>
            url <span class="token operator">=</span> v<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">)</span>
            <span class="token comment"># 获取相关链接</span>
            <span class="token keyword">if</span> baseUrl <span class="token keyword">in</span> <span class="token builtin">str</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">:</span>
                arrUrl<span class="token punctuation">.</span>append<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>arrUrl<span class="token punctuation">)</span>
    <span class="token keyword">return</span> arrUrl

<span class="token comment"># 获取分类页面链接</span>
<span class="token keyword">def</span> <span class="token function">GetPageUrl</span><span class="token punctuation">(</span>ulr<span class="token punctuation">)</span><span class="token punctuation">:</span>
    browser <span class="token operator">=</span> webdriver<span class="token punctuation">.</span>Chrome<span class="token punctuation">(</span><span class="token punctuation">)</span>
    arrUrl <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>get<span class="token punctuation">(</span>ulr<span class="token punctuation">)</span>
        <span class="token comment"># 获取分类名称</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;aaaaaaaaaaaaaaaaa&quot;</span><span class="token punctuation">,</span>ulr<span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            title <span class="token operator">=</span> browser<span class="token punctuation">.</span>find_element_by_class_name<span class="token punctuation">(</span><span class="token string">&#39;category&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text
        <span class="token keyword">except</span> NoSuchElementException<span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token string">&#39;&#39;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> links <span class="token keyword">in</span> browser<span class="token punctuation">.</span>find_element_by_class_name<span class="token punctuation">(</span><span class="token string">&#39;a-pagination&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>find_elements_by_xpath<span class="token punctuation">(</span><span class="token string">&quot;//*[@href]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

                <span class="token keyword">if</span> <span class="token string">&#39;https://www.amazon.com/Best-Sellers&#39;</span> <span class="token keyword">and</span> <span class="token string">&#39;ref=zg_bs_pg_&#39;</span> <span class="token keyword">in</span> links<span class="token punctuation">.</span>get_attribute<span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                    link <span class="token operator">=</span> links<span class="token punctuation">.</span>get_attribute<span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span> link <span class="token keyword">not</span> <span class="token keyword">in</span> arrUrl<span class="token punctuation">:</span>
                            arrUrl<span class="token punctuation">.</span>append<span class="token punctuation">(</span>link<span class="token punctuation">)</span>
        <span class="token keyword">except</span> NoSuchElementException<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;err: url&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&#39;</span><span class="token punctuation">,</span>ulr<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token string">&#39;&#39;</span>

    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>arrUrl<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span>
    <span class="token keyword">return</span> arrUrl<span class="token punctuation">,</span>title

<span class="token keyword">def</span> <span class="token function">GetData</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    browser <span class="token operator">=</span> webdriver<span class="token punctuation">.</span>Chrome<span class="token punctuation">(</span><span class="token punctuation">)</span>
    arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
        html <span class="token operator">=</span> browser<span class="token punctuation">.</span>page_source
        <span class="token comment"># print(html)</span>
        bsObj <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>html<span class="token punctuation">,</span> <span class="token string">&#39;html.parser&#39;</span><span class="token punctuation">)</span>
        <span class="token comment"># print(bsObj.find_all(&#39;#zg-ordered-list&#39;))</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            datas <span class="token operator">=</span> browser<span class="token punctuation">.</span>find_elements_by_class_name<span class="token punctuation">(</span><span class="token string">&#39;zg-item-immersion&#39;</span><span class="token punctuation">)</span>

            <span class="token keyword">for</span> val <span class="token keyword">in</span> datas<span class="token punctuation">:</span>
                data <span class="token operator">=</span> val<span class="token punctuation">.</span>find_element_by_class_name<span class="token punctuation">(</span><span class="token string">&#39;a-list-item&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text
                arr <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
                <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">:</span>i <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">:</span>
                        arr2<span class="token punctuation">.</span>append<span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">:</span>i <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>


        <span class="token keyword">except</span>  NoSuchElementException<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;err-url:&quot;</span><span class="token punctuation">,</span>url<span class="token punctuation">)</span>

    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        browser<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> arr2

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    datas <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    classUrl <span class="token operator">=</span> GetUrls<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> url <span class="token keyword">in</span> classUrl<span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token string">&#39;https://www.amazon.com/Best-Sellers/zgbs/ref=zg_bs_tab/&#39;</span>  <span class="token keyword">in</span> url<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token keyword">if</span> <span class="token string">&#39;https://www.amazon.com/Best-Sellers-MP3-Downloads/zgbs/dmusic&#39;</span> <span class="token keyword">in</span> url<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        pageUrls<span class="token punctuation">,</span>title <span class="token operator">=</span> GetPageUrl<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span>
        sheet <span class="token operator">=</span> excel<span class="token punctuation">.</span>add_sheet<span class="token punctuation">(</span>title<span class="token punctuation">)</span>
        head <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;badge&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;star&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;price&quot;</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">:</span>
            sheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">,</span> style_head<span class="token punctuation">)</span>
        <span class="token keyword">if</span>  pageUrls<span class="token punctuation">.</span>__len__<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;sss&quot;</span><span class="token punctuation">,</span>url<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token keyword">for</span> v <span class="token keyword">in</span> pageUrls<span class="token punctuation">:</span>
            data <span class="token operator">=</span> GetData<span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            datas <span class="token operator">+=</span> data
            createCsv<span class="token punctuation">(</span>data<span class="token punctuation">,</span>title<span class="token punctuation">)</span>
        createExcel<span class="token punctuation">(</span>datas<span class="token punctuation">,</span>sheet<span class="token punctuation">)</span>
        datas <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">createCsv</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>title<span class="token punctuation">)</span><span class="token punctuation">:</span>
    arrBadge <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    arrName <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    arrSatr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    arrPrice <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> v <span class="token keyword">in</span> data<span class="token punctuation">:</span>
        arrBadge<span class="token punctuation">.</span>append<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        arrName<span class="token punctuation">.</span>append<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        arrSatr<span class="token punctuation">.</span>append<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        arrPrice<span class="token punctuation">.</span>append<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        df <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token string">&#39;Badge&#39;</span><span class="token punctuation">:</span> arrBadge<span class="token punctuation">,</span>
            <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> arrName<span class="token punctuation">,</span>
            <span class="token string">&#39;start&#39;</span><span class="token punctuation">:</span> arrSatr<span class="token punctuation">,</span>
            <span class="token string">&#39;price&#39;</span><span class="token punctuation">:</span> arrPrice<span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        df<span class="token punctuation">.</span>to_csv<span class="token punctuation">(</span>title <span class="token operator">+</span> <span class="token string">&#39;.csv&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">createExcel</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>sheet<span class="token punctuation">)</span><span class="token punctuation">:</span>
    arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> val <span class="token keyword">in</span> data<span class="token punctuation">:</span>
        arr<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token builtin">tuple</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span>value_list <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> i <span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>value_list<span class="token punctuation">)</span><span class="token punctuation">:</span>
            sheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span>index<span class="token punctuation">,</span>i<span class="token punctuation">,</span>value<span class="token punctuation">)</span>
    excel<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&quot;goodData.xlsx&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;sucess&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> __name__<span class="token operator">==</span><span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token comment"># arr = [&#39;https://www.amazon.com/Best-Sellers/zgbs/smart-home/ref=zg_bs_nav_0/139-3807419-5993042&#39;, &#39;https://www.amazon.com/Best-Sellers-Sports-Outdoors/zgbs/sporting-goods/ref=zg_bs_nav_0/139-3807419-5993042&#39;, &#39;https://www.amazon.com/Best-Sellers-Sports-Collectibles/zgbs/sports-collectibles/ref=zg_bs_nav_0/139-3807419-5993042&#39;, &#39;https://www.amazon.com/Best-Sellers-Home-Improvement/zgbs/hi/ref=zg_bs_nav_0/139-3807419-5993042&#39;, &#39;https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games/ref=zg_bs_nav_0/139-3807419-5993042&#39;]</span>
    <span class="token comment"># for u in arr:</span>
    <span class="token comment">#     GetPageUrl(u)</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","ymx.html.vue"]]);export{r as default};
