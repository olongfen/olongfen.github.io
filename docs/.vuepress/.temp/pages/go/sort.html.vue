<template><div><h4 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序" aria-hidden="true">#</a> 冒泡排序</h4>
<p><code v-pre>  </code></p>
<h4 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序" aria-hidden="true">#</a> 选择排序</h4>
<h4 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序" aria-hidden="true">#</a> 插入排序</h4>
<h4 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序" aria-hidden="true">#</a> 归并排序</h4>
<pre><code>把两个已经有序的列表a和b合成一个有序列表c
1.申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
2.设定两个指针，最初位置分别为两个已经排序序列的起始位置；
3.比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
4.重复步骤 3 直到某一指针达到序列尾；
5.将另一序列剩下的所有元素直接复制到合并序列尾。
</code></pre>
<ul>
<li>自顶向下(递归)</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">mergeA</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token comment">// 每次拿第一个元素比较</span>
		<span class="token keyword">if</span> left<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> right<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
			ret <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> left<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			left <span class="token operator">=</span> left<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> left<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> right<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
			ret <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> right<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			right <span class="token operator">=</span> right<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 右边的数据已经操作完成，遍历左边数据放到返回值中</span>
	<span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		ret <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> left<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		left <span class="token operator">=</span> left<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 同上理</span>
	<span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		ret <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> right<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		right <span class="token operator">=</span> right<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">mergeSortA</span><span class="token punctuation">(</span>arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
	l <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> l <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> arr
	<span class="token punctuation">}</span>
	mid <span class="token operator">:=</span> l <span class="token operator">/</span> <span class="token number">2</span>
	left <span class="token operator">:=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>mid<span class="token punctuation">]</span>
	right <span class="token operator">:=</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">:</span>l<span class="token punctuation">]</span>
	<span class="token keyword">return</span> <span class="token function">mergeA</span><span class="token punctuation">(</span><span class="token function">mergeSortA</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">mergeSortA</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>自低向上(非递归)</p>
<pre><code>原理： 先求出小问题的解，把它组合成较大问题的解
给出一个输入的数组，把每个连续的元素合并成有序的，以长度为2开始执行；
然后再合并长度到4,8,16,...,2的n次方进行合并，以此类推，直到整个数组完成排序
</code></pre>
</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"math"</span>

<span class="token keyword">func</span> <span class="token function">merge</span><span class="token punctuation">(</span>arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> right <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		temp <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> right<span class="token operator">-</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// 复制出来需要进行比较的数据</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> left<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> right<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		temp<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		j<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		i <span class="token operator">=</span> left    <span class="token comment">// 左半部分</span>
		j <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 右半部分</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">for</span> k <span class="token operator">:=</span> left<span class="token punctuation">;</span> k <span class="token operator">&lt;=</span> right<span class="token punctuation">;</span> k<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> j <span class="token operator">></span> right <span class="token punctuation">{</span> <span class="token comment">// 当右边的数据已经操作完左边的数据还有没有操作完毕的数据，直接把左边的数据继续塞进数组里面</span>
			arr<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>i<span class="token operator">-</span>left<span class="token punctuation">]</span>
			i<span class="token operator">++</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> i <span class="token operator">></span> mid <span class="token punctuation">{</span> <span class="token comment">// 与上面同理</span>
			arr<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>j<span class="token operator">-</span>left<span class="token punctuation">]</span>
			j<span class="token operator">++</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> temp<span class="token punctuation">[</span>i<span class="token operator">-</span>left<span class="token punctuation">]</span> <span class="token operator">&lt;</span> temp<span class="token punctuation">[</span>j<span class="token operator">-</span>left<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			arr<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>i<span class="token operator">-</span>left<span class="token punctuation">]</span>
			i<span class="token operator">++</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> temp<span class="token punctuation">[</span>i<span class="token operator">-</span>left<span class="token punctuation">]</span> <span class="token operator">>=</span> temp<span class="token punctuation">[</span>j<span class="token operator">-</span>left<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			arr<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>j<span class="token operator">-</span>left<span class="token punctuation">]</span>
			j<span class="token operator">++</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span>arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	length <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
	<span class="token comment">// size 每次需要进行操作的大小 1,2,4,8,16 ....</span>
	<span class="token keyword">for</span> size <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> size <span class="token operator">&lt;=</span> length<span class="token punctuation">;</span> size <span class="token operator">+=</span> size <span class="token punctuation">{</span>
		<span class="token comment">// //对[i,i+size-1]和[i+size,i+2*size-1]进行归并</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">+</span>size <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i <span class="token operator">+=</span> size <span class="token operator">*</span> <span class="token number">2</span> <span class="token punctuation">{</span>
			<span class="token comment">// arr left mid right  如果i+2*size>n了，越界了，就取length-1</span>
			<span class="token function">merge</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">+</span>size<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token function">int</span><span class="token punctuation">(</span> math<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span><span class="token function">float64</span><span class="token punctuation">(</span>i<span class="token operator">+</span>size<span class="token operator">*</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">float64</span><span class="token punctuation">(</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="快速排序-递归" tabindex="-1"><a class="header-anchor" href="#快速排序-递归" aria-hidden="true">#</a> 快速排序(递归)</h4>
<p>采用分治法把序列S分解成子序列，递归的排序每个子序列，然后通过简单的串联方式合并这些已经排序的子序列。</p>
<ul>
<li>
<ol>
<li>从数列中挑出一个元素,称为 “基准”(pivot)</li>
<li>重新排序数列,所有元素比基准值小的摆放在基准前面,所有元素比基准值大的摆在基准的后面(相同的数可以到任一边).在这个分区退出之后,该基准就处于数列的中间位置.这个称为分区(partition)操作；</li>
<li>递归地(recursive)把小于基准值元素的子数列和大于基准值元素的子数列排序；</li>
</ol>
</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">quickSort</span><span class="token punctuation">(</span>arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> left<span class="token punctuation">,</span> right <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> left <span class="token operator">&lt;</span> right <span class="token punctuation">{</span>
		pivot <span class="token operator">:=</span> <span class="token function">partition</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> right<span class="token punctuation">)</span>
		<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"aaa"</span><span class="token punctuation">,</span> pivot<span class="token punctuation">)</span>
		<span class="token comment">// 左边部分排序</span>
		<span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> pivot<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token comment">// 右边部分排序</span>
		<span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> pivot<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">partition</span><span class="token punctuation">(</span>arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> left<span class="token punctuation">,</span> right <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token comment">// 基准值位置空缺</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">for</span> left <span class="token operator">&lt;</span> right <span class="token punctuation">{</span>
		<span class="token comment">// 充从left开始遍历到right位置，找到第一个小于基准值</span>
		<span class="token keyword">for</span> left <span class="token operator">&lt;</span> right <span class="token operator">&amp;&amp;</span> pivot <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			right<span class="token operator">--</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 填补基准值的位置空值 right值移动到基准值left位置 right位置值空缺(小的值往左移动)</span>
		arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span>

		<span class="token comment">// left指针值&lt;=基准值</span>
		<span class="token keyword">for</span> left <span class="token operator">&lt;</span> right <span class="token operator">&amp;&amp;</span> pivot <span class="token operator">>=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			left<span class="token operator">++</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 填补v1位置空缺值 left值移动到right位置 left位置空缺(大的值往右移动)</span>
		arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 基准值填补left位置</span>
	arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> pivot
	<span class="token keyword">return</span> left
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


