<template><div><h1 id="golang-领域驱动设计-六边形" tabindex="-1"><a class="header-anchor" href="#golang-领域驱动设计-六边形" aria-hidden="true">#</a> golang 领域驱动设计（六边形）</h1>
<h2 id="六边形领域驱动" tabindex="-1"><a class="header-anchor" href="#六边形领域驱动" aria-hidden="true">#</a> 六边形领域驱动</h2>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>    六边形领域驱动模型也称为端口适配器模型，它分为外部和内部，内部包含application和domain层，外部包含适配器层，依赖关系为
adapter->aplication->domain,domain层代码只像application层暴露。
   domain领域层：
       基本包含实体（entity）、值对象value object（vo）、聚合（aggregate）、依赖倒置（denpendency）、服务（sevice）实现业务逻辑（domain层
    里面如需其他业务可以自行扩展）。
   application应用层：
       没有太多逻辑，定义接口适配对象。
   adapter适配器层: 
       主适配器（例如 http）和从适配器（例如database）。
   （个人对于六边形架构只是进行简单的描述，如需详细描述） 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.infoq.cn/article/pjekymkzhmkafgi6ycri" target="_blank" rel="noopener noreferrer">Netflix 的六边形架构实践<ExternalLinkIcon/></a></p>
<p><a href="https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal" target="_blank" rel="noopener noreferrer">Domain-Driven Design and the Hexagonal Architecture<ExternalLinkIcon/></a></p>
<ul>
<li>项目实例结构</li>
</ul>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>  │ ├─config             项目配置
  │ ├─internal           项目核心代码
        │ ├─adapter      适配器
               │ ├─xhttp http适配器
               │ ├─respository 存储适配器      
        │ ├─application  应用服务层
        │ ├─contanst     常量
        │ ├─domain       领域层
              │ ├─aggregate 聚合函数
              │ ├─dependency 依赖倒置
              │ ├─entity 实体
              │ ├─service 业务逻辑
              │ ├─vo      值对象
        │ ├─infra         基础组件   
  │ ├─lib                (可以公共的工具)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>main入口</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>        <span class="token keyword">package</span> main
        
        <span class="token keyword">import</span> <span class="token punctuation">(</span>
        	<span class="token boolean">_</span> <span class="token string">"github.com/olongfen/go-ddd-hex/internal/adapter/repository"</span> <span class="token comment">// 初始化存储库适配器</span>
        	<span class="token boolean">_</span> <span class="token string">"github.com/olongfen/go-ddd-hex/internal/adapter/xhttp/xgin"</span> <span class="token comment">// 初始化http适配器</span>
        	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/application"</span>
        <span class="token punctuation">)</span>
        
        <span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        	application<span class="token punctuation">.</span>App<span class="token punctuation">.</span><span class="token function">InjectServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>application应用层主要代码</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    <span class="token keyword">package</span> application
    
    <span class="token keyword">import</span> <span class="token punctuation">(</span>
    	<span class="token string">"context"</span>
    	<span class="token string">"errors"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/config"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/domain/aggregate"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/domain/dependency"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/domain/service"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/domain/vo"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/internal/infra/db"</span>
    	<span class="token string">"github.com/olongfen/go-ddd-hex/lib/utils"</span>
    	<span class="token string">"github.com/opentracing/opentracing-go"</span>
    	log <span class="token string">"github.com/sirupsen/logrus"</span>
    	<span class="token string">"github.com/uber/jaeger-client-go"</span>
    	jaegercfg <span class="token string">"github.com/uber/jaeger-client-go/config"</span>
    	<span class="token string">"github.com/uber/jaeger-client-go/log/zap"</span>
    	<span class="token string">"github.com/uber/jaeger-lib/metrics"</span>
    	<span class="token string">"io"</span>
    	<span class="token string">"os"</span>
    	<span class="token string">"reflect"</span>
    <span class="token punctuation">)</span>
    
    <span class="token keyword">var</span> <span class="token punctuation">(</span>
    	App <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>Application<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    
    <span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	App<span class="token punctuation">.</span>Ctx<span class="token punctuation">,</span> App<span class="token punctuation">.</span>Cancel <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">NewWaitGroupCtx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	cfg <span class="token operator">:=</span> config<span class="token punctuation">.</span><span class="token function">GetConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token comment">// 数据库初始化</span>
    	App<span class="token punctuation">.</span><span class="token function">SetDatabase</span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token function">NewDatabase</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cfg<span class="token punctuation">.</span>DBConfig<span class="token punctuation">)</span><span class="token punctuation">)</span>
    	App<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token keyword">if</span> err <span class="token operator">:=</span> App<span class="token punctuation">.</span><span class="token function">setTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    	<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// UserInterface user 用户服务接口</span>
    <span class="token keyword">type</span> UserInterface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    	<span class="token function">ChangePassword</span><span class="token punctuation">(</span>id <span class="token builtin">string</span><span class="token punctuation">,</span> oldPwd<span class="token punctuation">,</span> newPwd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
    	<span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>res <span class="token operator">*</span>vo<span class="token punctuation">.</span>UserRes<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// PostInterface post 服务接口</span>
    <span class="token keyword">type</span> PostInterface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    	<span class="token function">GetByUserID</span><span class="token punctuation">(</span>userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>aggregate<span class="token punctuation">.</span>QueryUserPostRes<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// XHttp  http 接口</span>
    <span class="token keyword">type</span> XHttp <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    	<span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token function">Register</span><span class="token punctuation">(</span>reps <span class="token punctuation">[</span><span class="token punctuation">]</span>Service<span class="token punctuation">)</span> XHttp
    <span class="token punctuation">}</span>
    
    <span class="token comment">// Database 数据库基础组件接口</span>
    <span class="token keyword">type</span> Database <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    	<span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token function">DB</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// Repository 存储库接口</span>
    <span class="token keyword">type</span> Repository <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">// Service service 服务接口</span>
    <span class="token keyword">type</span> Service <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// Application 应用程序入口</span>
    <span class="token keyword">type</span> Application <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    	Ctx    context<span class="token punctuation">.</span>Context
    	Cancel context<span class="token punctuation">.</span>CancelFunc
    	<span class="token comment">/*
    		根据环境变量配置jaeger，参考 https://github.com/jaegertracing/jaeger-client-go#environment-variables
    
    		JAEGER_AGENT_HOST
    		JAEGER_AGENT_PORT
    	*/</span>
    	Tracer   opentracing<span class="token punctuation">.</span>Tracer
    	repos    <span class="token punctuation">[</span><span class="token punctuation">]</span>Repository
    	services <span class="token punctuation">[</span><span class="token punctuation">]</span>Service
    	XHttp
    	Database
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>domain领域层</p>
<ul>
<li>
<p>entity 实体</p>
<ul>
<li>user.go用户实体</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    UUID     <span class="token builtin">string</span>      <span class="token string">`gorm:"uniqueIndex;not null;type:varchar(36)"`</span>
    Username <span class="token builtin">string</span>      <span class="token string">`gorm:"uniqueIndex;not null;type:varchar(36)"`</span> <span class="token comment">// 用户名</span>
    Password null<span class="token punctuation">.</span>String <span class="token string">`gorm:"type:varchar(16)"`</span>                      <span class="token comment">// 密码</span>
    Nickname null<span class="token punctuation">.</span>String <span class="token string">`gorm:"type:varchar(36)"`</span>                      <span class="token comment">// 昵称</span>
    IsAdmin  null<span class="token punctuation">.</span>Bool   <span class="token string">`gorm:"default: false"`</span>                        <span class="token comment">// true：是管理员</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>post.go帖子实体</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    <span class="token keyword">type</span> Post <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        gorm<span class="token punctuation">.</span>Model
        UserUUID <span class="token builtin">string</span> <span class="token string">`gorm:"not null;type:varchar(36)"`</span>
        Title    <span class="token builtin">string</span> <span class="token string">`gorm:"type:varchar(64)"`</span> <span class="token comment">// 文章标题</span>
        Content  <span class="token builtin">string</span> <span class="token comment">// 文章内容</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>vo  值对象</p>
<ul>
<li>user.go 用户值对象<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    <span class="token keyword">type</span> UserRes <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        BaseRes
        UUID     <span class="token builtin">string</span> <span class="token string">`json:"uuid,omitempty"`</span>
        Username <span class="token builtin">string</span> <span class="token string">`json:"username,omitempty"`</span> <span class="token comment">// 用户名</span>
        Nickname <span class="token builtin">string</span> <span class="token string">`json:"nickname,omitempty"`</span> <span class="token comment">// 昵称</span>
        IsAdmin  <span class="token builtin">bool</span>   <span class="token string">`json:"isAdmin,omitempty"`</span>  <span class="token comment">// true：是管理员</span>
         <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>post 帖子值对象<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>  <span class="token keyword">type</span> PostRes <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    BaseRes
    Title   <span class="token builtin">string</span> <span class="token string">`json:"title"`</span>
    Content <span class="token builtin">string</span> <span class="token string">`json:"content"`</span>
    <span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>base 公共<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    <span class="token keyword">type</span> BaseRes <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        ID        <span class="token builtin">string</span>    <span class="token string">`json:"id,omitempty"`</span>
        CreatedAt time<span class="token punctuation">.</span>Time <span class="token string">`json:"createdAt,omitempty"`</span>
        UpdatedAt time<span class="token punctuation">.</span>Time <span class="token string">`json:"updatedAt,omitempty"`</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>aggregate 聚合</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>
  <span class="token comment">// UserPostFactory 帖子与用户逻辑聚合工厂模式</span>
    <span class="token keyword">type</span> UserPostFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        UserRepo dependency<span class="token punctuation">.</span>UserRepo <span class="token comment">// 用户存储库</span>
        PostRepo dependency<span class="token punctuation">.</span>PostRepo <span class="token comment">// 帖子存储库</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">type</span> QueryUserPostRes <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        User  vo<span class="token punctuation">.</span>UserRes   <span class="token string">`json:"user"`</span>
        Posts <span class="token punctuation">[</span><span class="token punctuation">]</span>vo<span class="token punctuation">.</span>PostRes <span class="token string">`json:"posts"`</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>dependency 依赖倒置</p>
<ul>
<li>user.go 用户存储对象<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> UserRepo <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>entity<span class="token punctuation">.</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token function">Find</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> meta <span class="token operator">*</span>query<span class="token punctuation">.</span>Meta<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>entity<span class="token punctuation">.</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token function">Create</span><span class="token punctuation">(</span>user <span class="token operator">*</span>entity<span class="token punctuation">.</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span>
    <span class="token function">Update</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> change <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
    <span class="token function">Delete</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
     <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>post.go 帖子存储对象<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>     <span class="token keyword">type</span> PostRepo <span class="token keyword">interface</span> <span class="token punctuation">{</span>
         <span class="token function">Get</span><span class="token punctuation">(</span>id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>entity<span class="token punctuation">.</span>Post<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
         <span class="token function">Find</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> meta <span class="token operator">*</span>query<span class="token punctuation">.</span>Meta<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>entity<span class="token punctuation">.</span>Post<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
         <span class="token function">Create</span><span class="token punctuation">(</span>post <span class="token operator">*</span>entity<span class="token punctuation">.</span>Post<span class="token punctuation">)</span> <span class="token builtin">error</span>
         <span class="token function">Update</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> change <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
         <span class="token function">Delete</span><span class="token punctuation">(</span>cond <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
     <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>service 业务逻辑</p>
</li>
</ul>
</li>
<li>
<p>adapter 适配器层</p>
<ul>
<li>repository 实现dependency定义的接口</li>
<li>xhttp 实现application应用层定义的xhttp接口</li>
</ul>
</li>
</ul>
<h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h1>
<pre><code>    domain层的代码不能依赖外面任何一层，只让application层可以依赖使用，adapter层依赖应用层而且实现出入端口具体逻辑。
面向对象开发是使用领域驱动框架必不可少的一部分，六边形模型可以解决很多让人蛋疼的业务开发，如果业务逻辑不是很复杂的话使用
六边形框架设计起来会比较麻烦。 另外ddd清洁分层架构也是不错的框架， 领域驱动的原理和详细google有很多大佬详写，大家需要看
详细内容可以自行google或者阅读上面我推荐两个链接文章，所以一些具体的解释本人就不献丑了，本项目是本人学习领域驱动框架之后
进行设想开发的，欢迎大家一起指正或者改善。个人觉得应用层可以设计层框架使用，目前暂时还没有idea，也欢迎大佬们讨论。
</code></pre>
<p><a href="https://github.com/olongfen/go-ddd-hex" target="_blank" rel="noopener noreferrer">项目地址<ExternalLinkIcon/></a></p>
</div></template>


