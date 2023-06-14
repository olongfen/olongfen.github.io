<template><div><h1 id="_1-golang-时间与日期" tabindex="-1"><a class="header-anchor" href="#_1-golang-时间与日期" aria-hidden="true">#</a> 1. Golang 时间与日期</h1>
<p>time 包提供了时间的显示和计量用的功能。日历的计算采用的是公历。提供的主要类型如下：</p>
<h2 id="_1-1-location" tabindex="-1"><a class="header-anchor" href="#_1-1-location" aria-hidden="true">#</a> 1.1. Location</h2>
<p>表示某地区所在的时区</p>
<h3 id="_1-1-1-时区" tabindex="-1"><a class="header-anchor" href="#_1-1-1-时区" aria-hidden="true">#</a> 1.1.1 时区</h3>
<p>时区信息既浩繁又多变，Unix 系统以标准格式存于文件中，这些文件位于 /usr/share/zoneinfo，而本地时区可以通过 /etc/localtime 获取，这是一个符号链接，指向 /usr/share/zoneinfo 中某一个时区。比如我本地电脑指向的是：/usr/share/zoneinfo/Asia/Shanghai。</p>
<p>因此，在初始化 Local 时，通过读取 /etc/localtime 可以获取到系统本地时区。</p>
<p>当然，如果设置了环境变量 TZ，则会优先使用它。</p>
<h2 id="_1-2-time" tabindex="-1"><a class="header-anchor" href="#_1-2-time" aria-hidden="true">#</a> 1.2. Time</h2>
<p>一个纳秒精度的时间点，是公历时间。</p>
<h3 id="_1-2-1-time详解" tabindex="-1"><a class="header-anchor" href="#_1-2-1-time详解" aria-hidden="true">#</a> 1.2.1 Time详解</h3>
<p>程序中应使用 Time 类型值来保存和传递时间，而不是指针。也就是说，表示时间的变量和字段，应为 time.Time 类型，而不是 *time.Time 类型。一个 Time 类型值可以被多个 go 协程同时使用。时间点可以使用 Before、After 和 Equal 方法进行比较。Sub 方法让两个时间点相减，生成一个 Duration 类型值（代表时间段）。Add 方法给一个时间点加上一个时间段，生成一个新的 Time 类型时间点。</p>
<p>Time 零值代表时间点 January 1, year 1, 00:00:00.000000000 UTC。因为本时间点一般不会出现在使用中，IsZero 方法提供了检验时间是否是显式初始化的一个简单途径。</p>
<p>每一个 Time 都具有一个地点信息（即对应地点的时区信息），当计算时间的表示格式时，如 Format、Hour 和 Year 等方法，都会考虑该信息。Local、UTC 和 In 方法返回一个指定时区（但指向同一时间点）的 Time。修改地点 / 时区信息只是会改变其表示；不会修改被表示的时间点，因此也不会影响其计算。</p>
<p>通过 == 比较 Time 时，Location 信息也会参与比较，因此 Time 不应该作为 map 的 key。</p>
<h3 id="_1-2-2-time-源码分析" tabindex="-1"><a class="header-anchor" href="#_1-2-2-time-源码分析" aria-hidden="true">#</a> 1.2.2 Time 源码分析</h3>
<ul>
<li>Time 结构体</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Time <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// sec gives the number of seconds elapsed since</span>
    <span class="token comment">// January 1, year 1 00:00:00 UTC.</span>
    sec <span class="token builtin">int64</span>

    <span class="token comment">// nsec specifies a non-negative nanosecond</span>
    <span class="token comment">// offset within the second named by Seconds.</span>
    <span class="token comment">// It must be in the range [0, 999999999].</span>
    nsec <span class="token builtin">int32</span>

    <span class="token comment">// loc specifies the Location that should be used to</span>
    <span class="token comment">// determine the minute, hour, month, day, and year</span>
    <span class="token comment">// that correspond to this Time.</span>
    <span class="token comment">// Only the zero Time has a nil Location.</span>
    <span class="token comment">// In that case it is interpreted to mean UTC.</span>
    loc <span class="token operator">*</span>Location
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>获取当前时间</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// Now returns the current local time.</span>
<span class="token keyword">func</span> <span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Time <span class="token punctuation">{</span>
	sec<span class="token punctuation">,</span> nsec<span class="token punctuation">,</span> mono <span class="token operator">:=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	mono <span class="token operator">-=</span> startNano
	sec <span class="token operator">+=</span> unixToInternal <span class="token operator">-</span> minWall
	<span class="token keyword">if</span> <span class="token function">uint64</span><span class="token punctuation">(</span>sec<span class="token punctuation">)</span><span class="token operator">>></span><span class="token number">33</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> Time<span class="token punctuation">{</span><span class="token function">uint64</span><span class="token punctuation">(</span>nsec<span class="token punctuation">)</span><span class="token punctuation">,</span> sec <span class="token operator">+</span> minWall<span class="token punctuation">,</span> Local<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> Time<span class="token punctuation">{</span>hasMonotonic <span class="token operator">|</span> <span class="token function">uint64</span><span class="token punctuation">(</span>sec<span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span>nsecShift <span class="token operator">|</span> <span class="token function">uint64</span><span class="token punctuation">(</span>nsec<span class="token punctuation">)</span><span class="token punctuation">,</span> mono<span class="token punctuation">,</span> Local<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Time 常用函数与方法</p>
<ul>
<li>time.Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) 函数
日期返回对应的时间
yyyy-mm-dd hh：mm：ss + nsec纳秒
  在给定位置在该时间段的适当区域内。
  月，日，小时，分钟，秒和nsec值可能不在
  正常范围，并将在转换过程中进行标准化。
  例如，10月32日转换为11月1日。
  夏令时过渡会跳过或重复时间。
  例如，在美国，2011年3月13日凌晨2:15
  而2011年11月6日凌晨1:15发生了两次。 在这种情况下，
  时区的选择以及因此的时间定义不明确。
  日期返回的时间在所涉及的两个区域之一中是正确的
  在过渡中，但不能保证哪个。</li>
<li>time.Unix(sec, nsec int64) 函数
Unix返回与给定Unix时间相对应的本地时间，
自1970年1月1日UTC以来的sec秒和nsec纳秒。
在[0，999999999]范围之外传递nsec是有效的。
并非所有秒值都有相应的时间值。 一个这样的
值是1 &lt;&lt; 63-1（最大的int64值）。</li>
<li>time.Time.Unix() 返回 Unix 时间戳</li>
<li>time.Time.UnixNano() 返回 Unix 时间戳的纳秒表示</li>
<li>time.Time.Add(d Duration) 返回时间t+d</li>
<li>time.Time.Sub(d Duration) Sub返回持续时间t-u。 如果结果超过最大值（或最小值）可以存储在持续时间中的值，即最大（或最小）持续时间将被退回。要计算持续时间d的t-d，请使用t.Add（-d）。</li>
<li>time.Time.AddDate(years int, months int, days int) AddDate返回与addi相对应的时间,给定t的年数，月数和天数。</li>
<li>time.Parse(layout, value string) layout=&quot;2006-01-02 15:04:05&quot; value=&quot;输入时间&quot; 返回一个Time对象</li>
<li>time.Time.Format(layout string) 格式化时间,返回时间string</li>
</ul>
</li>
<li>
<p>为什么是 2006-01-02 15:04:05</p>
</li>
</ul>
<p>可能你已经注意到：2006-01-02 15:04:05 这个字符串了。没错，这是固定写法，类似于其他语言中 Y-m-d H:i:s 等。为什么采用这种形式？又为什么是这个时间点而不是其他时间点？
官方说，使用具体的时间，比使用 Y-m-d H:i:s 更容易理解和记忆
而选择这个时间点，也是出于好记的考虑，官方的例子：Mon Jan 2 15:04:05 MST 2006，另一种形式 01/02 03:04:05PM ，对应是 1、2、3、4、5、6、7；常见的格式：2006-01-02 15:04:05，很好记：2006 年 1 月 2 日 3 点 4 分 5 秒</p>
<h2 id="_1-3-duration" tabindex="-1"><a class="header-anchor" href="#_1-3-duration" aria-hidden="true">#</a> 1.3. Duration</h2>
<p>代表两个时间点之间经过的时间，以纳秒为单位。</p>
<h2 id="_1-4-timer与ticker" tabindex="-1"><a class="header-anchor" href="#_1-4-timer与ticker" aria-hidden="true">#</a> 1.4. Timer与Ticker</h2>
<p>定时器,定时器是进程规划自己在未来某一时刻接获通知的一种机制。</p>
<h3 id="_1-4-1-timer" tabindex="-1"><a class="header-anchor" href="#_1-4-1-timer" aria-hidden="true">#</a> 1.4.1 Timer</h3>
<p>Timer 类型代表单次时间事件。当 Timer 到期时，当时的时间会被发送给 C (channel)，除非 Timer 是被 AfterFunc 函数创建的。</p>
<p>注意：Timer 的实例必须通过 NewTimer 或 AfterFunc 获得。</p>
<p>结构体如下:</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Timer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    C <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time     <span class="token comment">// The channel on which the time is delivered.</span>
    r runtimeTimer
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>C 已经解释了，我们看看 runtimeTimer。它定义在 sleep.go 文件中，必须和 runtime 包中 time.go 文件中的 timer 必须保持一致：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> runtimeTimer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	tb <span class="token builtin">uintptr</span>
	i  <span class="token builtin">int</span>

	when   <span class="token builtin">int64</span>
	period <span class="token builtin">int64</span>
	f      <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">uintptr</span><span class="token punctuation">)</span> <span class="token comment">// NOTE: must not be closure</span>
	arg    <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	seq    <span class="token builtin">uintptr</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过 NewTimer() 来看这些字段都怎么赋值，是什么用途。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewTimer</span><span class="token punctuation">(</span>d Duration<span class="token punctuation">)</span> <span class="token operator">*</span>Timer <span class="token punctuation">{</span>
	c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Time<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	t <span class="token operator">:=</span> <span class="token operator">&amp;</span>Timer<span class="token punctuation">{</span>
		C<span class="token punctuation">:</span> c<span class="token punctuation">,</span>
		r<span class="token punctuation">:</span> runtimeTimer<span class="token punctuation">{</span>
			when<span class="token punctuation">:</span> <span class="token function">when</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">,</span>
			f<span class="token punctuation">:</span>    sendTime<span class="token punctuation">,</span>
			arg<span class="token punctuation">:</span>  c<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token function">startTimer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">.</span>r<span class="token punctuation">)</span>
	<span class="token keyword">return</span> t
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 when 表示的时间到时，会往C管道中发送当前时间。when 表示的时间是纳秒时间，正常通过 runtimeNano() + int64(d) 赋值。</p>
<h3 id="_1-4-2-ticker" tabindex="-1"><a class="header-anchor" href="#_1-4-2-ticker" aria-hidden="true">#</a> 1.4.2 Ticker</h3>
<p>Ticker 和 Timer 类似，区别是：Ticker 中的 runtimeTimer 字段的 period 字段会赋值为 NewTicker(d Duration) 中的 d，表示每间隔 d 纳秒，定时器就会触发一次。</p>
<p>除非程序终止前定时器一直需要触发，否则，不需要时应该调用 Ticker.Stop 来释放相关资源。</p>
<p>如果程序终止前需要定时器一直触发，可以使用更简单方便的 time.Tick 函数，因为 Ticker 实例隐藏起来了，因此，该函数启动的定时器无法停止。</p>
<h3 id="_1-4-3-定时器实际开发运用" tabindex="-1"><a class="header-anchor" href="#_1-4-3-定时器实际开发运用" aria-hidden="true">#</a> 1.4.3 定时器实际开发运用</h3>
<p>在实际开发中，定时器用的较多的会是 Timer，如模拟超时，而需要类似 Tiker 的功能时，可以使用实现了 cron spec 的库 <a href="https://github.com/robfig/cron" target="_blank" rel="noopener noreferrer">cron<ExternalLinkIcon/></a>，感兴趣的可以参考文章：<a href="http://blog.studygolang.com/2014/02/go_crontab/" target="_blank" rel="noopener noreferrer">《Go 语言版 crontab》<ExternalLinkIcon/></a>。</p>
</div></template>


