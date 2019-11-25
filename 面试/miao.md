# miaomiao面试题讲解大全
  
  ## HTML5和4有什么不同
    html5语义化更强烈，
    新增很多标签，strong，em，b，i，u
    doctype也不一样
 
  ## 什么是语义化
    使用合适的标签表达合理的内容
    不要全用div等
    通过合适的标签来表示一个html文档的每个部分，内容区，顶部，底部，侧边栏，导航栏等等
    都可以用标签表示出来
    语义化的好处是有利于seo
   ### 什么是 seo
   就是搜索引擎优化，优化站点在相关搜索中的排名
   1. seo的手段
    1. 用https
    2. html文档的语义明确。会分析你的html文档的嵌套结构
    html文档中只出现一个h1标签，作为搜索的标题，但是现在没有了这种标准
    现在是使用title标签
    meta标签里面给一个<meta name = 'keyword' content='xxxx'>
    meta就是页面的相关信息的标签，引擎都会抓取相关信息
    3. 网站速度
   ### 哪些功能性标签
   1. video，audio，object（嵌入第三方的插件,比如pdf，以前叫做embed ）
   2. canvas，一般问canvas和svg有什么区别，
    交互不复杂，数据量不大，变化不多用svg
    canvas就是点，一旦画上去就不能再控制，不然就重画，可以用来做图标
   3. 如何避免canvas卡顿
     1. 降帧，降低刷新次数
     2. 用setinterval，或者raf（requestanimatonframe）
  
  ## http 协议
    是一个请求响应模型
    ### 一个普通的http请求包含什么内容
      请求方法，url，版本
      普通请求头：useragent，host，referere，accept，cookie
      缓存相关：if-modified-since,if-none-match,cache-control(前两个都是本地资源未修改返回304，最后那个是控制缓存的行为)
    ### Cookies在请求和响应的什么部分
      请求的时候是cookie头，响应的时候set-cookie头
      还可以设置http-only，就只有http能读到cookie，通过js是读取不到的
      http-only:secure/path/domain
    ### cookie和localstorage的区别
      cookie是http的一部分，是几乎每次请求都会带上（fetch就不会带上）
      但是localstorage是浏览器存储数据的html5新api
      cookie只能存储4k
      localstorage存5M
      localstorage存储的是字符串，存对象就把对象序列化后存储，读取后反序列化读取为对象
    ### post和get的区别
      post请求是有请求体的
      get是没有请求体的
      post和get在语义上也有直接的差距：
        post是表示在服务器上增加一个资源
        get是获取一个资源
      语义不同的其他请求也有：
      DELETE, 删除服务器上的一个资源
      PUT，更新或者替换服务器上的一个资源
      get是幂等的，其他的请求不是，表示一个操作执行多次和一次是一样的
  
  ## 什么是跨域
    ### 什么是域
      域就是每个打开的页面，每一个资源都属于一个域
      所属域就是http协议和域名/ip地址加上端口号
    ### 跨域都有哪些情况
      比如一个域想要通过ajax访问另一个域下的资源
      或者两个域之间的页面通信交互 
      浏览器里面的所有东西都是按照域划分的，比如cookie，localstorage
    ### 为什么不能跨域
      最典型的原因是：
      浏览器在请求资源的时候会默认带上该资源所在域的cookie信息
    ### 为什么跨域通过script标签来访问别的域的资源
    ### 如何解决合理的跨域访问资源
    1. JSONP，相当于加载了一个script标签
    缺点：不能发post
    2. CORS
    通过在http头里面写上一些头，然浏览器理解
    那么跨域的post请求和普通的post请求有什么区别？
    3. 预检请求
    为什么要有预检请求?
    为了确认，服务器支持跨域，
    非幂等请求会发
    4. 服务端代理
    5.为什么cors比jsonp好
    ### 跨域的页面通信
    通过iframe
  ## 盒模型
    ### inline和block的区别
    一个inline的元素过长在页面中宽度不够的时候，是直接剪断的，只有头和尾会有border
    如何让每一个剪短的内容有都有左右边框，用阴影
    或者让剪断之后带上左右border
    inline的布局垂直方向上的margin，padding，border都是不起作用的
    block就是有折行，下一个元素会直接换行摆放
  ## css布局
    1. 布局模型
      行内布局（ifc），块级布局（bfc），flex布局（ffc），栅格布局（gfc），浮动布局（ffc），绝对定位
      表格布局（tfc），多列布局
  ## 闭包
    每一本书的解释都不太一样，没有严格的定义
    闭包就创建了一个作用域，这个作用域不会销毁
    闭包的作用：
      高阶函数，数据的保存
  ## this
    this是动态的，取决于如何被调用
    this在哪个函数里面，这个函数又是如何被调用的
    eval()函数的this指向哪里
  ## 深拷贝
    deep copy和shallow copy
    无环的对象，递归遍历
    有环的对象，广度优先遍历
  ## 判断对象的类型
  typeof
  instanceof
  Object.prototype.toString.call(value)
  ## 如何克隆Date()实例
  ## 如何克隆RegExp实例
  ## fetch和axios
  ## 页面解析流程
  ## 资源下载的顺序和优先级
  js->css->图片->字体文件
  ## node cluster的工作原理
    多进程共享端口
  ## v-modal的实现
  ## 常见的content-type
    text/plain
    text/html
    text/css
    image/png
    image/jpg
    applition/javascript
    applition/json
    applition/x-www-form-urlencoded
    applition/xml
    multipart/form-data
    multipart/octet-stream。这个是在文件扩展名不明的是才会发送或者content-length不明确的时候
  ## 如何把arguments对象变成数组
    Array.from(arguments)
    [].splice.call(arguments)
    [].slice.call(arguments)
    [...arguments]
    [].map.call(arguments,it=>it)
    arguments._proto_=Array.prototype(不太好)
  ## _proto_和prototype的区别
  ## instanceof怎么工作的
    a1 instanceof A
    通过原型链来检查的
    instanceof来检查a1的原型链上有没有A，一直顺着原型链检查到null
    即为一直判断：a1._proto_ === A.prototype 是true就返回
    检查到null了就返回false
  ## Function.prototype._proto_ = Object.prototype
  ## 数组去重 , 应该注意数组是否排序
    lodash.unique
    es6的话用new set()
  ## 如何判断一个数组里面书否包含了NaN
    indexof里面是通过===去找的，所以不行
    includes是通过==去找的。所以可以
    所以通过includes，或者Number.isNaN()判断是否是nan,
    或者判断是否等于自己
    window.isNaN是判断是否是一个数
  ## reduce和map的意思和实现
  ## 事件代理或者事件委托的好处
    能够更好的处理动态的元素的响应事件
  ## currentNode和targetNode
    前者是正在执行的事件函数发生的元素
    后者是事件发生的原始元素
  ## async和await
     async是异步函数
     await是如果后面是正常的数据就直接返回，如果是promise就等待
     实现机制：Generator，在resovle的时候再去调用next()
  ## 如何读取一个元素el的id和data-id
    el.getAttribute('id')
    el.dataSet('id')
  ## innerText和innerContent
  ## 捕获和冒泡
  ## 如何获取到url？后面的内容
    localtion.search.slice(1)
  ## 401和403和405
    没有权限，权限不够，不允许使用该方法
  ## node，v8，和libvu
    node是js的运行环境
    v8是js的执行引擎
    libvu是底层异步的api实现
  ## node 的require是如何工作的
    我有笔记
  ## setImmediate和setTimeout和process.nextTick()
  第一个：
  ## 简单介绍一下node的stream
     可读流，可写流，双工流，转换流
     流所解决的问题：限制内存的使用，水位线
# CSS
  ## css box-sizing’
    会设定元素宽度的计算方式
    分为border-box和content-box
    最好是用bborder-box，因为一旦设定了宽度就不会有padding或者border来影响他的宽度
  ## display的值的介绍
  ## 水平垂直居中
     1. flex布局
     2. 绝对定位，上下左右都设置为0
     3. transform+绝对定位
     4. 表格
     5. 行内布局，vertical-align:middle,这个是元素的垂直中心，对着基准线上方半个ex高度 
# http
  ## 输入url的过程
     1. url编码解析
     2. dns查询匹配
       首先在你的dns缓存器里面找
       会在你电脑的hosts文件里面查询
       在路由器的dns里面找
       isp的dns缓存
     3. 发送请求
     4. 服务器接收到请求，反向代理
     5. 服务器响应：各种响应头，content-type,content-encoding,set-cookie
     6. 传输过程中可能是gzib压缩的
     7. 浏览器得到了返回的数据
     8. 就是浏览器打开一个页面的过程，html，js，css解析，dom树的挂载，页面的渲染
     9. 执行js的时候页面的渲染是暂停的（可能会问async，defer等属性）
        为什么js会暂停，也可能不暂停（defer的情况），但是不暂停是为了怕修改dom结构
  ## 页面打不开可能会有什么问题
    1. ping一个域名，会向baidu浏览器发一个包，通过网络层直接连接baidu，看她会不会返回
    2. ping不同，解析不了域名，看能不能上qq，可能是能上网
    3. 检查是否有代理，是否配置好，检查host文件是否写错
    4. 等等
  ## 无序数组中找第k大的数
    先排序，直接取（n*logn）
    堆排序（n+k*logn）
    快排的就地修改，选定基准元素，循环对比，）（2n）
    快排有两种写法，ij从左右来逼近，ij从开始不停的找
  ## ref的几种方式以及优缺点
    1. ref='boo' 字符串的方式
    2. ref={it=>this.boo=it} 函数的方式
  ## 子组件的componentWillReceiveProps什么时候被调用 
    父组件的render重新调用的时候，且子组件没有销毁的时候
# 新的东西技术
  pwa：service worker通过这个让页面的体验接近原生，缓存，离线缓存等等
  service worker用哪些东西控制缓存？
  
# 理论知识
  ## js会阻碍dom树的加载所以要放在最后
  ## acript标签的asybc和defer的区别
  在浏览器渲染的时候，如果有script标签需要引入外部文件
  那么就会阻塞dom的渲染，加载的时间越长dom卡住的时间越长
  这两个属性就是让这个js文件的加载不会阻塞，空闲式的加载
  defer是顺序式的加载，串行式
  async是不按照顺序的加载，谁先下完就是谁
  ## class的继承与原理
  class A extends B
  就是A.prototype._proto_ = B.prototype
  ## 排序算法的稳定性
    就是排序前后，相同元素是否会发生变化
    不稳定的就是快排，比较经典，还有选择排序，插入排序，堆排序
    稳定的：冒泡， 插入，二叉树排序，归并 
    是什么东西影响排序算法的性能，逆序数和每次执行交换数之间的逆序数
  ## 闭包如何实现，以及内存泄漏
  ## 如何监控用户对于页面的离开行为
    visibilitychange事件
  ## 作用域和作用域链，动态作用域和静态作用域
  ## 怪异模式和标准模式
  ## common.js CMD AMD, node.js属于哪一种
    node都不属于,是属于Common，同步读取再返回
    CMD：预先把所有的依赖都加在下来，再从入口模块加在执行
    AMD：遇到需要的模块再加载
  ## 箭头函数和普通函数的区别
    this的区别
    无arguments
    不能作为构造函数并调用
    也不能写成生成器
  ## canvas
    就是画布，画上去就失去控制，不能在进行修改操作
  ## doctype加不加的区别
  ## 如何创建一个没有原型链的对象
    Object.create(null)
    那又如何polyfill这个元素
  ## 为什么现在都不用cmd，amd了，异步加载不是更好吗
    因为在浏览器里面分模块的话反而会让文件模块加载更加慢
    所以不如打包成一个
    异步加载好的方式是按需加载
  ## H5是如何离线缓存的
    就是application cache，就是用一个xml文件来标明哪些文件是需要离线缓存的
    有别于强缓存
  ## css哪些属性默认继承
    font-xxx
    color
    line-height
  ## position 的fixed和relative和absolute的定位原点是什么
    relative的定位原点是自身
    absolute的定位原点是最近的定位元素
    fixed定位于窗口
  ## 为什么需要清除浮动
  ## 文本过长的三个点
    好几个元素搭配
    overflow:hidden
    text-overflow:ellipsis
  ## 千分位加逗号
  ## 如何判断一个函数是不是genrator
  Object.prototype.toString.call(f)
  ## 如何得到当前网页中各种标签的个数，并找出嵌套层次最深的元素和嵌套层数
    new Set($$('*').map(it=>it.tagName))这样就得到所有的不重复的标签
    嵌套层数应该就是深搜，找max
  ## new的工作流程
  ## node有哪些特征
    单线程，异步，高性能
  ## reset和nomolise
  ## 不使用border画出1px的线
  ## z-index最大值是多少，可以渐变吗？
    最大值是int 4的最大值，2147483647,四个字节的最大值
  ## 清除浮动
  ## 闭包
  ## call apply bind
  ## 类数组对象，0-length个下标，有length属性
  ## ajax
  ## 严格模式
    如何判断当前环境是不是严格模式，
    严格模式下this是空的
    var strict = (function() {return !this; }())
  ## 行内元素块级元素
  ## 浏览器如何实现多个标签页之间的通信
  ## a==b的时候，如果a是一个函数，那么==会自己转换内容，通过toString或者valueof
     这取决于b的值，如果b是数字取得是valueof
  ```js
  //自动柯里化
  function add(...args){
    let f = add.bind(null,...args)
    f.valueof = function(){
      return args.reduce((a,b)=>a+b)
    }
    return f
  }
  ```
  ## koa-body的原理
  ## 如何和数据库通信
     使用数据库的驱动程序，java的jdbc，
  ## react的生命周期以及自己的理解
  ## react-router如何配置
  ## react路由的动态模态加载
     就是react.lazy(()=>import('./aaa.js'))和react.suspense
  ## 服务端渲染ssr
     根据url，直接返回该路径下的最终页面
     就是服务器直接渲染最终的html的样子，
     等页面加载完成再去启动页面的react或者vue
  ## 路由的history
     是自己实现的history，但是和浏览器的几乎没有区别
  ## 介绍redux的数据流程
     单项数据流
     数据从store->组件里坐在组件里面通过dispatch
  ## 移动端适配1px的问题
     无论在哪个手机上，设置的元素的1px都是相对于手机的1px
  ## 居中为什么要使用transform
     不会影响布局，最灵活
     这个样式是直接对这个东西做变换，中间不涉及布局的计算
  ## dev-service是怎么跑起来的
     和浏览器简历ws连接
     监控磁盘文件项目的变化，一旦变化就编译打包
     同时浏览器刷新
  ## 抽取公共文件是怎么配置的
  ## 如何处理安全问题
     xss：永远不要把用户输入的东西当成代码执行
     scrf：让请求无法伪造，使用scrf token来区别，伪造的请求无法拿到token
  ## 如何实现this对象的深拷贝
     这个时候是一个类，需要考虑继承链
  ## redux就是组件之间跨层级通信
  ## 表单可以跨域，ajax不能跨域，表单提交会发referer
     ajax不能跨域的具体内容在于，这个请求是可以得到重要的信息的
  ## promise，async有什么区别
  ## 搜索请求如何处理（防抖）
  ## react的优化，
     尽量使用scu
  ## http2.0
     头部压缩，二进制，资源优先级，多路复用，服务器推送，必须使用tls
  ## 如何做到并发请求
     分散域名
  ## http1.1 如何复用tcp
  ## 浏览器事件模型/流向
     捕获阶段，目标阶段，冒泡阶段
  ## 事件代理的优缺点
     优点：节省内存
     缺点：需要判断来源
  ## html 5 的history的api
  ## cookie和session
    cookie里面会存放sessionid，通过这个来判断是否是同一个会话
  ## react的dom结构变化后经历了哪些变化
    重新render
    计算vdom的差异，差异怎么计算的
  ## key主要是解决什么问题
    对于相对差异较少的元素作对比
  ## redux的异步怎么处理
    redux的里面只要同步，要有异步需要使用中间件
  ## state是怎么注入到组价中去的
  ## 通过content-tppe来处理接受到的数据是什么，怎么接受，是什么数据类型
  ## connect的原理
     通过context来处理的
  ## ex6的map和原生对象的区别
    map是真的map，可以把任意对象映射到任意对象
    对象只能油某些值来映射到任意值
  ## pureComponent和functionComponent的区别
  ## http缓存控制
    强缓存和协商缓存
  ## native给了什么能力给RN
    绘制原生组件的能力
  ## jsonp需要服务端怎么处理和配合
    需要读取url中的callback的字段，返回改字段的调用并返回数据
  ## ajax的跨域需要设置什么
  ## xcrf/scrf的问题怎么防范
    就是需要scrf token
  ## async里面有多个await怎么优化
    通过解构和promise.all
  ## promise和async在处理错误上有什么区别
    一个是返回错误的promise，一个是抛出
  ## react的事件代理机制
  ## emit事件怎么发送
  ## promise有几个状态
  ## 缓存相关的https的请求头
     if-modified-since
     last-modified
     if-none-match
     etag
     catch-control
  ## https
     介绍一下，如何建立安全通道
     证书u，公私钥，信任链，非对称加密
  ## pwa有什么了解
    提供缓存，桌面图标，推送
    会间歇性的给你推送消息

  ## 前后通信的restful
    get，put，delete，post
  ## access-control-allow-origin在服务器的那里配置
    这个取决于用什么服务器软件
    如果是express
  ## promise的精髓和优缺点
    精髓就是链式调用，简单，灵活
  ## redux和挂载在window上有什么区别
  ## webpack和gulp
  ## web安全
    XSS
    CSRF/XSRF
  ## base64为什么能性能提升
    减少了http请求
    缺点是增加了解析时间
  ## webp文件格式
    完全碾压jpg
  ## jsonp为什么不能有post方法
  ## 数组的第一个元素和第一万个的元素的获取时间差多少
  ## setstate为什么是默认异步的
     默认异步是为了批量的更新
     setstate之后发生了重新渲染，计算dom，更新
  ## 为什么框架出来之后就有很多native框架
    理论上虚拟dom 渲染到各个平台上
  ## 304是什么
    协商缓存成功，用缓存版本
  ## 打包的时候hash码怎么生成的
  ## 什么是单页应用，
    react或者路由做的
  ## 为什么虚拟dom比真实的dom好
    轻量
  ## 添加原生事件不移除会有什么泄露
    只能算是bug
    某个东西不会再用，但是没有被释放
    元素被删掉了，但是其事件还在
  ## 单例，工厂，观察者模式在实际中的应用
  ## 树的使用场景
    dom树
    虚拟dom树
    语法树
  ## 有哪些地方会内存泄漏
  ## setinterval需要注意的点
    并不精确，并且错过的多个interval，只会执行一个
    为什么不精确，从定义上讲，时间只会回调执行的最小时间，js是单线程的
  ## settimeout(1) 和settimeout(2)的区别
  ## 宏任务和微任务
    微任务的递归调用相当于死循环
  ## class和es5的类有什么区别
  ## 介绍definedproperty
    给一个已经存在的对象添加不可枚举属性或者特殊属性getter/setter
    更多是给类库
  ## for in 和object.key的区别
    forin会遍历所有可枚举属性
    object.key会返回自有的可枚举属性组成的数组
  ## get和post的区别
  ## react15和16的区别
     16修改了很多生命周期函数
  ## 重新渲染 render会做些什么
     新旧对比，render拿到新的reactelement会跟之前一次作对比
     发现如果组件和属性变化，就会调用生命周期函数
  ## 哪些方法会触发react重新渲染
  ## art.sort()用法的区别
    直接使用会将数字变为字符串，编码之后进行处理
    [3, 15, 8, 29, 102, 22]=> [102, 15, 22, 29, 3, 8]
    但是如果使用[3, 15, 8, 29, 102, 22].sort((a,b)=>a-b)
    就会得到正常的数据



