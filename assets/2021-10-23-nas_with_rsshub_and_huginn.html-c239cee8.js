import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c as i,a as n,b as e,d as a,e as t}from"./app-4a83708c.js";const r={},c=t('<p>作为一个重度 RSS 用户，我获取的 90% 的新闻和信息都来自于 RSS 源。我使用 RSSHub 来生成主流媒体的 RSS，使用 Huginn 来定制个性化的 RSS，同时使用 TinyTinyRSS 来过滤并阅读 RSS。这些服务帮助我将阅读时间<strong>从原来的 3 个小时减少到 1 个小时</strong>。</p><p>这些服务最初托管在一台配置较低的 1 核 1G 服务器上。然而，由于配置过低，服务器频繁重启，维护成本不断上升。后来，我尝试了一些配置较高的国外服务器，例如 2 核 4G 低端服务器，但遇到了严重的超售和性能不稳定的问题。总的来说，购买国外的低端服务器（特别是<strong>俄罗斯服务器</strong>）就是把钱扔进水里。</p><p>因此，相较于升级高配服务器或者使用不靠谱的国外 VPS，NAS 成为了一个高性价比的选择。当然，这也面临着许多问题，我们需要一步步地去解决。</p><h2 id="事前准备" tabindex="-1"><a class="header-anchor" href="#事前准备" aria-hidden="true">#</a> 事前准备</h2><ul><li>NAS</li><li>域名 (子域名既可)</li><li>带动态 DNS 的路由器 (推荐 openwrt 软路由)</li></ul><h2 id="docker-镜像安装" tabindex="-1"><a class="header-anchor" href="#docker-镜像安装" aria-hidden="true">#</a> Docker 镜像安装</h2><ol><li><p>NAS 管理后台 &gt; 套件中心 &gt; 搜索并安装「Docker」，随后在 Docker 容器中安装所需服务。</p></li><li><p>在 Docker 注册表中搜索对应的镜像，选中有最多星的项目，然后点击下载。</p><figure><img src="https://img.newzone.top/2022-05-05-14-40-43.png?imageMogr2/format/webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>镜像下载完成后，进入「映像」，选中刚下载好的镜像，点击启动。</p><figure><img src="https://img.newzone.top/2022-05-05-14-41-01.png?imageMogr2/format/webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>在高级设置中的端口设置，将本地端口从自动改为一个固定的端口，这样以后就可以方便地进行端口映射，避免 NAS 重启后本地端口发生变化。</p><figure><img src="https://img.newzone.top/2022-05-05-14-41-15.png?imageMogr2/format/webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ol><h2 id="域名绑定" tabindex="-1"><a class="header-anchor" href="#域名绑定" aria-hidden="true">#</a> 域名绑定</h2>',8),u=n("li",null,[n("p",null,[n("strong",null,"关闭光猫路由"),e("：通过电话联系宽带运营商，要求关闭光猫的路由功能。对于那些默认不提供公网 IP 的运营商，也可以在这个环节让运营商给你分配一个公网 IP。如果碰到死板的客服，找你要开通理由，不要正面回答。")])],-1),d=n("li",null,[n("p",null,"家用宽带通常使用动态 IP，且无法提供对外的 80 接口。可以使用动态 DNS 插件来实现域名与家庭宽带 IP 的实时绑定，以达到固定链接打开 NAS 服务的效果。")],-1),S=n("p",null,[n("strong",null,"动态 DNS(DDNS) 设置"),e("，以下以 OpenWrt+Cloudflare 为例。")],-1),h={href:"https://p3terx.com/archives/openwrt-cloudflare-ddns.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://dash.cloudflare.com/profile/api-tokens",target:"_blank",rel:"noopener noreferrer"},_=n("figure",null,[n("img",{src:"https://img.newzone.top/2022-05-05-14-41-31.png?imageMogr2/format/webp",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),f=n("li",null,[n("p",null,"如果宽带是内网，无法提供公网 IP，可以使用花生壳等内网穿透工具来达到类似的效果。")],-1),m=t(`<h2 id="rss-转码" tabindex="-1"><a class="header-anchor" href="#rss-转码" aria-hidden="true">#</a> RSS 转码</h2><p>由于运营商禁用了家庭宽带的 80 和 443 端口，因此无法隐藏 NAS 服务的端口，只能使用类似于 <code>home.xxx.com:34567</code> 的链接。同时，大多数主流的 RSS 阅读器不支持配置带有端口号的 RSS 源。即使使用 DNS 设置域名隐式跳转，端口链接也会被识别出来。这导致在 NAS 上部署的 RSS 源无法直接被读取。例如，Tiny Tiny RSS 订阅 NAS 的 RSS 源时，经常报错，无法正确读取带有端口或是 HTTPS 的 RSS 源。</p><p>为了顺利获取 NAS 的 RSS 源，我使用了 php 制作了一个转录链接 <code>http://xxx.com/rss.php?type=yyy</code>。该 php 文件聚合了所有的 RSS 源，并使用链接参数进行区分。尽管需要在另一台服务器上部署 php 转录，但与抓取 RSS 所需的高配服务器的费用相比，它的性价比要高许多。此外，php 转录链接对服务器性能要求不高，如果你已经拥有一台服务器，可以像我一样直接部署在原有服务器上。</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>## 网站目录新建 rss.php 文件，然后放入如下代码
## yyy 为链接参数，方便区分不同 rss 源，qqq 为内部 rss 源路径
## 注意：如果链接参数 yyy 中有中文，可用 UrlEncode 编码，避免 rss 阅读器报错。
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token string double-quoted-string">&quot;yyy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;http://home.xxx.com:34567/qqq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">elseif</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token string double-quoted-string">&quot;zzz&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;http://home.xxx.com:34567/wwww&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你没有服务器或不愿意再折腾，也可以尝试其他的 RSS 阅读器。例如，The Old Reader 支持使用带有端口的 RSS 源。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>使用 NAS 替代服务器后，Huginn 不再定期崩溃，抓取也不再卡壳，也不需要总惦记给服务器续费。硬件配置也从 1 核 1G 跃升到 4 核 8G。这套流程跑了一年，基本上没有出现什么问题，可以放心使用。</p><p>这篇文章也是 RSS 系列的完结篇。从 2017 年 4 月的《RSS 入门篇：FEED43&amp;FeedEx-为静态网页定制 RSS 源》开始，零零散散地写了 4 年半，终于把坑都填起来了。</p><p>RSS 系列的初衷是为了减少算法推送泛滥而造成的信息过载。来自 Google 的分析师 Gary Illyes 曾表示：「互联网上大约 60% 的内容是重复的。」比如你搜索一项内容，打开前 10 个网页，可能内容完全一样。</p><p>RSS (Really Simple Syndication) 的中文含义是「简易信息聚合」，能按你个人所需定制信息聚合，让你脱离算法的掌控，把时间花在你真正需要的信息上。而 RSS 这个对抗信息过载的极佳工具却从 Google Reader 退役后，被很多人认为已经衰弱消亡。实际上 RSS 只是从主流社会中退出，变为少数人的高效信息获取方式。</p><p>RSS 定制的系列文章原本只是记录个人心得，我没想到文章发布后收到很多人的支持，才发觉并不是 RSS 在没落，而是缺少布道者。多数人希望了解 RSS，但之前的教程门槛较高，大厂如 Google 也关闭了 RSS 项目，导致新手入门变得更加困难。因此，我持续简化 RSS 教程，希望能让大家更轻松入门 RSS。如果你也对 RSS 感兴趣，希望把你遇到的疑问和所得都记录下来，帮助越来越多的人了解 RSS，掌握这项高效的信息获取方式。</p><p>我坚信 <strong>RSS 是最适合普通人的信息获取方式</strong>。这可能有些反潮流，但我内心对此深信不疑，也希望越来越多的人能认识到 RSS，开始使用这项只被少数人使用的高效信息获取方式。</p><h2 id="rss-合集" tabindex="-1"><a class="header-anchor" href="#rss-合集" aria-hidden="true">#</a> RSS 合集</h2><p>汇总的 RSS 永久订阅源都是通过 RSSHub 和 Huginn 制作的。如果你有兴趣自己制作 RSS，可以参考以下教程。</p>`,14),k={href:"https://newzone.top/posts/2017-04-22-rss_feed43_feedex.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://newzone.top/posts/2018-10-07-huginn_scraping_any_website.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://newzone.top/posts/2019-04-01-rsshub_noob.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://newzone.top/posts/2020-03-25-rsshub_on_vps.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://newzone.top/posts/2021-10-23-nas_with_rsshub_and_huginn.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://newzone.top/posts/2022-03-17-rss_persistent_link_collection.html",target:"_blank",rel:"noopener noreferrer"};function w(N,q){const s=l("ExternalLinkIcon");return p(),i("div",null,[c,n("ol",null,[u,d,n("li",null,[S,n("ul",null,[n("li",null,[n("p",null,[e("cloudflare 动态 DNS 配置 ("),n("a",h,[e("教程"),a(s)]),e(")：进入系统 - 软件包，搜索「cloudflare」，安装 ddns-scripts_cloudflare.com-v4，然后重启路由器。")])]),n("li",null,[n("p",null,[e("进入服务 - 动态 DNS，Cloudflare 登录密码为 "),n("a",g,[e("cloudflare API"),a(s)]),e(" 中的 Glodbal API Key。对于阿里云用户，可以在 RAM 访问控制中创建专门的 AccessKey。")]),_])])]),f]),m,n("ul",null,[n("li",null,[n("p",null,[n("a",k,[e("RSS 入门篇：FEED43&FeedEx-为静态网页定制 RSS 源"),a(s)])])]),n("li",null,[n("p",null,[n("a",R,[e("RSS 进阶篇：Huginn - 真·为任意网页定制 RSS 源（PhantomJs 抓取）"),a(s)])])]),n("li",null,[n("p",null,[n("a",b,[e("RSS 速成篇：RSSHub 捡现成的轮子"),a(s)])])]),n("li",null,[n("p",null,[n("a",y,[e("RSS 速成篇 2：RSSHub 自部署"),a(s)])])]),n("li",null,[n("p",null,[n("a",x,[e("RSS 完结篇：节省千元服务费，RSSHub、Huginn 转移 NAS"),a(s)])])]),n("li",null,[n("p",null,[n("a",v,[e("RSS 汇总篇：RSS 永久链接合集，拒绝 RSS 失效"),a(s)])])])])])}const D=o(r,[["render",w],["__file","2021-10-23-nas_with_rsshub_and_huginn.html.vue"]]);export{D as default};
