import{_ as t,r as l,o as p,c as o,a as n,b as s,d as e,e as a}from"./app-e9d335a5.js";const c={},u=n("h2",{id:"环境搭建",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#环境搭建","aria-hidden":"true"},"#"),s(" 环境搭建")],-1),d=n("p",null,"linux环境搭建",-1),r={href:"https://studygolang.com/dl",target:"_blank",rel:"noopener noreferrer"},v=a(`<li><ol start="2"><li>解压下载的包到/usr/local下&gt;&gt;&gt;&gt;&gt; sudo tar -xvf <code>下载的压缩包</code> -C /usr/local</li></ol></li><li><ol start="3"><li>用vim打开.profile: <code>vim ~/.bash_profile</code></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># add</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOROOT</span><span class="token operator">=</span>/data/bin/go
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span>/data/gocode/
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">$GOROOT</span>/bin:<span class="token variable">$GOPATH</span>/bin:<span class="token environment constant">$PATH</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><ol start="4"><li>添加:</li></ol></li>`,3),k=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token builtin class-name">source</span>    ~/.bash_profile
   go version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m=n("p",null,"windows环境搭建",-1),b={href:"https://studygolang.com/dl",target:"_blank",rel:"noopener noreferrer"},g=n("li",null,"然后直接安装即可",-1),f=n("li",null,"Win+r 输入cmd, go version",-1),h=a(`<h2 id="gomod-指令" tabindex="-1"><a class="header-anchor" href="#gomod-指令" aria-hidden="true">#</a> gomod 指令</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>go mod init:初始化modules
go mod download:下载modules到本地cache
go mod edit:编辑go.mod文件，选项有-json、-require和-exclude，可以使用帮助go help mod edit
go mod graph:以文本模式打印模块需求图
go mod tidy:删除错误或者不使用的modules
go mod vendor:生成vendor目录
go mod verify:验证依赖是否正确
go mod why：查找依赖
go build -buildmode=c-shared -o <span class="token italic"><span class="token punctuation">*</span><span class="token content">.so </span><span class="token punctuation">*</span></span>.go  go生成静态库
go build -buildmode=c-archive -o <span class="token italic"><span class="token punctuation">*</span><span class="token content">.dll </span><span class="token punctuation">*</span></span>.go go生成动态库
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go介绍" tabindex="-1"><a class="header-anchor" href="#go介绍" aria-hidden="true">#</a> go介绍</h2><ul><li><p>主要特征</p><ul><li>1.自动立即回收。</li><li>2.更丰富的内置类型。</li><li>3.函数多返回值。</li><li>4.错误处理。</li><li>5.匿名函数和闭包。</li><li>6.类型和接口。</li><li>7.并发编程。</li><li>8.反射。</li><li>9.语言交互性</li></ul></li><li><p>命名规则</p><ul><li><ol><li>首字符可以是任意的Unicode字符或者下划线</li></ol></li><li><ol start="2"><li>剩余字符可以是Unicode字符、下划线、数字</li></ol></li><li><ol start="3"><li>字符长度不限</li></ol></li></ul></li><li><p>声明</p><ul><li><ol><li>var(变量) var str string</li></ol></li><li><ol start="2"><li>const(常量) const num = 10</li></ol></li><li><ol start="3"><li>type(声明类型) type num int</li></ol></li><li><ol start="4"><li>func(函数声明) func helloWorld() {}</li></ol></li></ul></li></ul><h2 id="go类型" tabindex="-1"><a class="header-anchor" href="#go类型" aria-hidden="true">#</a> go类型</h2><ul><li><p>基本常用类型</p><ul><li><ol><li>int, int8, int16, int32, int64</li></ol></li><li><ol start="2"><li>bool</li></ol></li><li><ol start="3"><li>float32, float64</li></ol></li><li><ol start="4"><li>uint, uint8, uint16, uint32, uint64</li></ol></li><li><ol start="5"><li>byte</li></ol></li><li><ol start="6"><li>string</li></ol></li><li><ol start="7"><li>complex64, complex128</li></ol></li><li><ol start="8"><li>array 固定长度的数组</li></ol></li><li><ol start="9"><li>struct 结构体</li></ol></li><li><ol start="10"><li>interface 接口</li></ol></li></ul></li><li><p>引用类型</p><ul><li><ol><li>slice 序列数组</li></ol></li><li><ol start="2"><li>map 映射</li></ol></li><li><ol start="3"><li>chan 管道(go 最大特点之一)</li></ol></li></ul></li><li><p>内置函数</p><ul><li><ol><li>append -- 用来追加元素到数组、slice中,返回修改后的数组、slice</li></ol></li><li><ol start="2"><li>close -- 主要用来关闭channel</li></ol></li><li><ol start="3"><li>delete -- 从map中删除key对应的value</li></ol></li><li><ol start="4"><li>panic -- 停止常规的goroutine （panic和recover：用来做错误处理）</li></ol></li><li><ol start="5"><li>recover -- 允许程序定义goroutine的panic动作</li></ol></li><li><ol start="6"><li>imag -- 返回complex的实部 （complex、real imag：用于创建和操作复数）</li></ol></li><li><ol start="7"><li>real -- 返回complex的虚部</li></ol></li><li><ol start="8"><li>make -- 用来分配内存，返回Type本身(只能应用于slice, map, channel)</li></ol></li><li><ol start="9"><li>new -- 用来分配内存，主要用来分配值类型，比如int、struct。返回指向Type的指针</li></ol></li><li><ol start="10"><li>cap -- capacity是容量的意思，用于返回某个类型的最大容量（只能用于切片和 map）</li></ol></li><li><ol start="11"><li>copy -- 用于复制和连接slice，返回复制的数目</li></ol></li><li><ol start="12"><li>len -- 来求长度，比如string、array、slice、map、channel ，返回长度</li></ol></li><li><ol start="13"><li>print、println -- 底层打印函数，在部署环境中建议使用 fmt 包</li></ol></li></ul></li></ul><h2 id="类型运用" tabindex="-1"><a class="header-anchor" href="#类型运用" aria-hidden="true">#</a> 类型运用</h2><ul><li>变量: var 语句定义了一个变量的列表；跟函数的参数列表一样，类型在后面</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;golang&quot;</span> <span class="token comment">//  全局变量,首写字母大写,其他.go文件可以访问, 全局变量不能用 name:=&quot;golang&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	name1<span class="token operator">:=</span> <span class="token string">&quot;golang&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello:&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
输出结果:
hello:golang 
golang
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>常量 常量的定义与变量类似，只不过使用 const 关键字，代表永远是只读的，不能修改</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">&quot;golang&quot;</span> <span class="token comment">// 常量不能使用 &quot;:=&quot; 语法定义。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>枚举:</p><p>iota，特殊常量，可以认为是一个可以被编译器修改的常量。 在每一个const关键字出现时，被重置为0，然后再下一个const出现之前，每出现一次iota，其所代表的数字会自动增加1。 关键字 iota 定义常量组中从 0 开始按行计数的自增枚举值。</p></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">const</span>  <span class="token punctuation">(</span>
	a <span class="token operator">=</span> <span class="token boolean">iota</span>
	b
	c
	d
	e
	f
<span class="token punctuation">)</span> 

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">,</span>d<span class="token punctuation">,</span>e<span class="token punctuation">,</span>f<span class="token punctuation">)</span>
    <span class="token comment">// 0,1,2,3,4,5</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本类型运用" tabindex="-1"><a class="header-anchor" href="#基本类型运用" aria-hidden="true">#</a> 基本类型运用</h2><ul><li>rune int32 的别名，代表一个Unicode码，用UTF-8 进行编码</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/*
rune 类型使用
例如需要遍 历字符串中的字符。可以循环每个字节（仅在使用US ASCII 编码字符串时与字符等价， 而它们在Go 中不存在！）。
因此为了获得实际的字符，需要使用rune 类型。
string rune byte 的关系
在Go当中 string底层是用byte数组存的，并且是不可以改变的*/</span>
<span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token string">&quot;Golang学习&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token string">&quot;Golang学习&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出 12 , 8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>数组: 是同一种数据类型的固定长度的序列</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/*
遍历数组之前判断数组的长度,不然则触发访问越界会panic
*/</span>
<span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token builtin">string</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">:</span><span class="token string">&quot;golang&quot;</span><span class="token punctuation">}</span> <span class="token comment">// 定义数组长度为5,存类型为string的一维数组,然后给第三个index和第五个index赋值,不输入index默认从0开始</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span>v<span class="token operator">:=</span><span class="token keyword">range</span> arr1<span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>v<span class="token punctuation">)</span> <span class="token comment">// 0 ;1 ; 2 hello; 3 ;4 golang</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token string">&quot;go&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">}</span>
	<span class="token comment">// 这里第四个索引会赋值go,下一个没有写索引,会自动给第五个index赋值,后面从第二个索引开始,自动给第三个赋值赋值</span>
    <span class="token comment">// TODO 如果这里把1换成2,会报错</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span>
	<span class="token comment">// 多维数组原理与此类似</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>类型转换:</li></ul><p>会用到golang的 strconv包,具体使用方式这里不说明了,教程一大把 <br> 引用类型: 指针、slice、map、chan等 <br> 切片：切片是数组的一个引用，因此切片是引用类型。但自身是结构体，值拷贝传递，切片可以无限扩展 <br></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 这样定义的切片不能继续扩展了</span>
	<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token comment">// 可以继续扩展的定义 </span>
	<span class="token comment">// (1) var arr = []int{}</span>
	<span class="token comment">// (2) var arr = make([]int,10)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>容器Map: 引用类型，哈希表。一堆键值对的未排序集合</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	data<span class="token punctuation">[</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
	
	<span class="token comment">// 创建了一个键类型为string,值类型为int的map</span>
	m1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token comment">// 也可以选择是否在创建时指定该map的初始存储能力，如创建了一个初始存储能力为5的map</span>
	m2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    
	m1<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token comment">// 判断 key 是否存在。</span>
    	<span class="token keyword">if</span> val<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m1<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
    		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;map&#39;s key is not existence&quot;</span><span class="token punctuation">)</span>
    	<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
    		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    	<span class="token punctuation">}</span>
	m2<span class="token punctuation">[</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;局部变量 map m1 : %v\\n&quot;</span><span class="token punctuation">,</span> m1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;局部变量 map m2 : %v\\n&quot;</span><span class="token punctuation">,</span> m2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>管道Channel: <ul><li><ol><li>类似unix中管道（pipe）</li></ol></li><li><ol start="2"><li>先进先出</li></ol></li><li><ol start="3"><li>线程安全，多个goroutine同时访问，不需要加锁</li></ol></li><li><ol start="4"><li>channel是有类型的，一个整数的channel只能存放整数</li></ol></li></ul></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span><span class="token punctuation">(</span>
		<span class="token comment">// 无缓冲</span>
		<span class="token comment">// chan1 = make(chan string)</span>
		<span class="token comment">// 有缓冲</span>
		chan2 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">)</span>
	<span class="token comment">// 无缓冲： 不仅仅是向 chan1 通道放 1，而是一直要等有别的携程 &lt;-chan1 接手了这个参数，那么chan1&lt;-1才会继续下去，要不然就一直阻塞着</span>
	<span class="token comment">// 有缓冲： chan2&lt;-1 则不会阻塞，因为缓冲大小是1(其实是缓冲大小为0)，只有当放第二个值的时候，第一个还没被人拿走，这时候才会阻塞</span>
	chan2 <span class="token operator">&lt;-</span> <span class="token number">98</span>
    	<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chan2<span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
    		<span class="token comment">// 读取之后缓存的数据被清除</span>
    		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
    	<span class="token punctuation">}</span>
    
    	<span class="token comment">// 写如10个数据到缓冲区</span>
    	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    		chan2 <span class="token operator">&lt;-</span> i
    	<span class="token punctuation">}</span>
    	<span class="token comment">// 再写入数据</span>
    	chan2 <span class="token operator">&lt;-</span> <span class="token number">9898</span>
    	<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> chan2 <span class="token punctuation">{</span>
    		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
    		<span class="token comment">// 这里输入chan里面的任何一个value</span>
    		<span class="token keyword">if</span> v <span class="token operator">==</span> <span class="token number">9</span> <span class="token punctuation">{</span>
    			<span class="token comment">// 关闭管道,不关闭会报错</span>
    			<span class="token function">close</span><span class="token punctuation">(</span>chan2<span class="token punctuation">)</span>
    		<span class="token punctuation">}</span>
    	<span class="token punctuation">}</span>
    	<span class="token comment">// channel关闭后，就不能取出数据了</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>结构体 struct</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span><span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token comment">// 姓名</span>
	Age <span class="token builtin">int</span> <span class="token comment">// 年龄</span>
	Id <span class="token builtin">string</span> <span class="token comment">// 学号</span>
	Class <span class="token builtin">string</span> <span class="token comment">// 班级</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// new 一个地址</span>
	<span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span>
	s<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;詹姆斯&quot;</span>
	s<span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">35</span>
	s<span class="token punctuation">.</span>Id <span class="token operator">=</span> <span class="token string">&quot;23&quot;</span>
	s<span class="token punctuation">.</span>Class <span class="token operator">=</span> <span class="token string">&quot;湖人&quot;</span>
	
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><ul><li>定义一个函数</li></ul><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>	// 首写字母大写其他包可以访问，反之其他包则不可以访问
	func addNum(a,b int)(ret int){
	 ret = a+b
	return	
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>a,b 两个为输入参数;ret为函数返回参数;golang函数可以有多个返回值;如果需要传入不定参数（func (data ...int)int{return});
</code></pre><ul><li><p>函数调用</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package main

func main(){
	println(addNum(10,20))
	// out 30
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="方法与接口" tabindex="-1"><a class="header-anchor" href="#方法与接口" aria-hidden="true">#</a> 方法与接口</h2><ul><li>方法</li></ul><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>
package main

import &quot;fmt&quot;

// 定义一个接口体
type Man struct {
	Age     int    // 年龄
	Name    string // 姓名
	IsAdult bool   // 成年:true;false: 未成年
	// 更多字段以此类推
	/*
		.
		.
		.
	*/
}

// 声明三个方法
// GetName 获取姓名
func (p *Man) GetName() (ret string) {
	return p.Name
}

// GetAge 获取年龄
func (p *Man) GetAge() (ret int) {
	return p.Age
}

// ViewIsAdult 查看是否成年
func (p *Man) ViewIsAdult() (ret bool) {
	if p.Age &gt;= 18 {
		p.IsAdult = true
	} else {
		p.IsAdult = false
	}
	return p.IsAdult
}

func main() {

	// 定义一个 Man 类型
	var p = &amp;Man{
		Age:  18,
		Name: &quot;Tom&quot;,
	}
	// 执行方法
	fmt.Println(p.GetAge())
	fmt.Println(p.GetName())
	fmt.Println(p.ViewIsAdult())
	// out 18 Tom true

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>接口</li></ul><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package main

import &quot;fmt&quot;

// 定义一个接口体
type Man struct {
	Age     int    // 年龄
	Name    string // 姓名
	IsAdult bool   // 成年:true;false: 未成年
	// 更多字段以此类推
	/*
		.
		.
		.
	*/
}

type Person interface {
	Eating() (ret string)   // 吃
	Playing() (ret string)  // 玩
	Drinking() (ret string) // 喝
}

// 声明三个方法

// GetName 获取姓名
func (p *Man) GetName() (ret string) {
	return p.Name
}

// GetAge 获取年龄
func (p *Man) GetAge() (ret int) {
	return p.Age
}

// ViewIsAdult 查看是否成年
func (p *Man) ViewIsAdult() (ret bool) {
	if p.Age &gt;= 18 {
		p.IsAdult = true
	} else {
		p.IsAdult = false
	}
	return p.IsAdult
}

// Eating 实现吃的方法
func (p *Man) Eating() (ret string) {
	return fmt.Sprintf(\`%s is eating apple now\`, p.Name)
}

// Playing 实现玩的方法
func (p *Man) Playing() (ret string) {
	return fmt.Sprintf(\`%s is playing backball now\`, p.Name)
}

// Drinking 实现喝的方法
func (p *Man) Drinking() (ret string) {
	return fmt.Sprintf(\`%s is drinking cola now\`, p.Name)
}

func main() {

	// 定义一个 Man 类型
	var p = &amp;Man{
		Age:  18,
		Name: &quot;Tom&quot;,
	}
	// 定义一个 Person 类型
	var person Person
	person = p
	// 执行方法
	fmt.Println(person.Drinking())
	fmt.Println(person.Eating())
	fmt.Println(person.Playing())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>接口可以通过方法来实现，任意一个结构体都可以实现接口里面的方法,但是必须声明全部方法,不然会报错。</li></ul><h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h2><ul><li><p>单元测试的好处</p><ul><li>提高代码质量</li><li>保证逻辑的正确性</li><li>优化代码设计、更好的调式代码</li><li>更早的发现bug</li></ul></li><li><p>直接开干</p><ul><li><code>简单的测试加减乘除&gt;&gt;&gt;main.go</code></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> demo

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>  <span class="token punctuation">{</span>
  <span class="token keyword">return</span> i<span class="token operator">+</span>j
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Sub</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>j <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token builtin">int</span>  <span class="token punctuation">{</span>
  <span class="token keyword">return</span> i<span class="token operator">-</span>j
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Mul</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>j <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token builtin">int</span>  <span class="token punctuation">{</span>
  <span class="token keyword">return</span> i<span class="token operator">*</span>j
<span class="token punctuation">}</span>


<span class="token keyword">func</span> <span class="token function">Div</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>  <span class="token punctuation">{</span>
  <span class="token keyword">if</span> j<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">{</span>
  	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;除数不能为0&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> i<span class="token operator">/</span>j
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>main_test.go</code></p></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">package</span> demo
  <span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token punctuation">.</span> <span class="token string">&quot;github.com/smartystreets/goconvey/convey&quot;</span>
	<span class="token string">&quot;testing&quot;</span>
    <span class="token punctuation">)</span>

  <span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">Convey</span><span class="token punctuation">(</span><span class="token string">&quot;测试Add运算&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token comment">// 断言</span>
      <span class="token function">So</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> ShouldEqual<span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">func</span> <span class="token function">TestSub</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Convey</span><span class="token punctuation">(</span><span class="token string">&quot;测试Sub运算&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">:=</span> <span class="token function">Sub</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// 断言</span>
    <span class="token function">So</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> ShouldEqual<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">func</span> <span class="token function">TestMul</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Convey</span><span class="token punctuation">(</span><span class="token string">&quot;测试Mul&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">:=</span> <span class="token function">Mul</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// 断言</span>
    <span class="token function">So</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> ShouldEqual<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">func</span> <span class="token function">TestDiv</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Convey</span><span class="token punctuation">(</span><span class="token string">&quot;测试Div运算&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">:=</span> <span class="token function">Div</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// 断言</span>
    <span class="token function">So</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> ShouldEqual<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>执行：go test . </code></p>`,42);function y(q,w){const i=l("ExternalLinkIcon");return p(),o("div",null,[u,n("ul",null,[n("li",null,[d,n("ul",null,[n("li",null,[n("ol",null,[n("li",null,[s("到"),n("a",r,[s("go语言中文网"),e(i)]),s("下载对应的linux版本")])])]),v]),k]),n("li",null,[m,n("ol",null,[n("li",null,[s("下载"),n("a",b,[s("go语言中文网"),e(i)]),s(" .msi文件")]),g,f])])]),h])}const _=t(c,[["render",y],["__file","golang.html.vue"]]);export{_ as default};
