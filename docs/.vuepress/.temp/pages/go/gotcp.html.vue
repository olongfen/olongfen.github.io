<template><div><h2 id="golang-tcp-协议入门开发" tabindex="-1"><a class="header-anchor" href="#golang-tcp-协议入门开发" aria-hidden="true">#</a> golang tcp 协议入门开发</h2>
<p>说明：
<code v-pre>服务端开启服务，接收客户端发送的请求建立与客户端连接;   缓存客户端连接，放入连接池中， 用于广播消息给客户端  </code>
<code v-pre>客户端连接服务器，发送请求，接受服务器的广播消息   客户端之间互相不影响</code></p>
<ul>
<li>服务端</li>
</ul>
<p>server.go</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">// 运行前 先 go get  github.com/olongfen/docker</span>

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/json"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/olongfen/note/log"</span>
	<span class="token string">"net"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">startServe</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> <span class="token string">"1253"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">startServe</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		tcpAddr  <span class="token operator">*</span>net<span class="token punctuation">.</span>TCPAddr
		listener <span class="token operator">*</span>net<span class="token punctuation">.</span>TCPListener
	<span class="token punctuation">)</span>
	<span class="token comment">// 获取tcp地址</span>
	<span class="token keyword">if</span> tcpAddr<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">ResolveTCPAddr</span><span class="token punctuation">(</span><span class="token string">"tcp4"</span><span class="token punctuation">,</span> host<span class="token operator">+</span><span class="token string">":"</span><span class="token operator">+</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 开启监听</span>
	<span class="token keyword">if</span> listener<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">ListenTCP</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> tcpAddr<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 建立连接池,用于广播消息</span>
	conns <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span>

	<span class="token comment">// 消息缓存通道</span>
	messageChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// 广播消息</span>
	<span class="token keyword">go</span> <span class="token function">broadMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>conns<span class="token punctuation">,</span> messageChan<span class="token punctuation">)</span>

	<span class="token comment">// 启动</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"listening port: "</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span>
		conn<span class="token punctuation">,</span> _err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptTCP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> _err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Accept failed:%v\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//  把每个客户端连接扔进连接池</span>
		conns<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> conn
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>conns<span class="token punctuation">)</span>

		<span class="token comment">// 处理消息</span>
		<span class="token keyword">go</span> <span class="token function">handlerMessage</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token operator">&amp;</span>conns<span class="token punctuation">,</span> messageChan<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// broadMessage 广播消息</span>
<span class="token keyword">func</span> <span class="token function">broadMessage</span><span class="token punctuation">(</span>conns <span class="token operator">*</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> message <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		msg <span class="token operator">:=</span> <span class="token operator">&lt;-</span>message
		<span class="token keyword">var</span> d <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			ClientIP <span class="token builtin">string</span> <span class="token string">`json:"client_ip"`</span>
			Message  <span class="token builtin">string</span> <span class="token string">`json:"message"`</span>
		<span class="token punctuation">}</span>
		<span class="token boolean">_</span> <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>d<span class="token punctuation">)</span>
		<span class="token comment">// 发送消息给客户端</span>
		<span class="token keyword">for</span> key<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token operator">*</span>conns <span class="token punctuation">{</span>
			<span class="token comment">// 回复消息给相对应的客户端</span>
			<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> d<span class="token punctuation">.</span>ClientIP <span class="token punctuation">{</span>
				<span class="token comment">// 打印传过来的消息</span>
				log<span class="token punctuation">.</span><span class="token function">Infoln</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"---->"</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span>
				log<span class="token punctuation">.</span><span class="token function">Infoln</span><span class="token punctuation">(</span><span class="token string">"connection is connected from "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
				<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">": "</span> <span class="token operator">+</span> <span class="token string">"已经收到信息"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"broad message to %s failed: %v\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
					<span class="token function">delete</span><span class="token punctuation">(</span><span class="token operator">*</span>conns<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" 地址发送了请求消息："</span> <span class="token operator">+</span> d<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"broad message to %s failed: %v\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
					<span class="token function">delete</span><span class="token punctuation">(</span><span class="token operator">*</span>conns<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// handlerMessage 处理消息</span>
<span class="token keyword">func</span> <span class="token function">handlerMessage</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> conns <span class="token operator">*</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> messages <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 读取消息</span>
		l<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read client message failed:%v\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token function">delete</span><span class="token punctuation">(</span><span class="token operator">*</span>conns<span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 把收到的消息写到通道中</span>
		recvStr <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>l<span class="token punctuation">]</span><span class="token punctuation">)</span>
		messages <span class="token operator">&lt;-</span> recvStr
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>客户端代码</li>
</ul>
<p>client.go</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/json"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/olongfen/note/log"</span>
	<span class="token string">"net"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 发送消息体</span>
<span class="token keyword">type</span> messageData <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ClientIP <span class="token builtin">string</span> <span class="token string">`json:"client_ip"`</span>
	Message  <span class="token builtin">string</span> <span class="token string">`json:"message"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">startClient</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0:1253"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">startClient</span><span class="token punctuation">(</span>t <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		tcpAddress <span class="token operator">*</span>net<span class="token punctuation">.</span>TCPAddr
		conn       <span class="token operator">*</span>net<span class="token punctuation">.</span>TCPConn
	<span class="token punctuation">)</span>
	<span class="token keyword">if</span> tcpAddress<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">ResolveTCPAddr</span><span class="token punctuation">(</span><span class="token string">"tcp4"</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Errorln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 向服务器拨号</span>
	<span class="token keyword">if</span> conn<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">DialTCP</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> tcpAddress<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送消息</span>
	<span class="token keyword">go</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>

	<span class="token comment">// 接收消息</span>
	<span class="token function">readMessage</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// sendMessage 向服务器端发消息</span>
<span class="token keyword">func</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>messageData<span class="token punctuation">)</span>
	m<span class="token punctuation">.</span>ClientIP <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">LocalAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> input <span class="token builtin">string</span>

		<span class="token comment">// 接收输入消息，放到input变量中</span>
		fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>input<span class="token punctuation">)</span>

		<span class="token keyword">if</span> input <span class="token operator">==</span> <span class="token string">"/q"</span> <span class="token operator">||</span> input <span class="token operator">==</span> <span class="token string">"/quit"</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Byebye ..."</span><span class="token punctuation">)</span>
			conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 只处理有内容的消息</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
			m<span class="token punctuation">.</span>Message <span class="token operator">=</span> input
			_d<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
			<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>_d<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// readMessage 读取消息</span>
<span class="token keyword">func</span> <span class="token function">readMessage</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 接收来自服务器端的广播消息</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		length<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"recv server msg failed: %v\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		log<span class="token punctuation">.</span><span class="token function">Infoln</span><span class="token punctuation">(</span><span class="token string">"msg: ---->"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


