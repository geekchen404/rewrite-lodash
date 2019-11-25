# vue 的使用指南
## 关于data对象的属性定义
  当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。
  当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
  但是在你创建了vue对象之后再去给data新增其他属性c，那么c的属性值的改变是不会影响视图的更新的
  Object.freeze(某属性)可以让某个属性的变化不再被追踪，即使改变了也不会影响视图的渲染了

## 属性的绑定
  v-bind:属性名='属性值'，在标签里面这样使用就是绑定一个属性为某个值

## vue自己的属性和方法为了区别可以用 $ 开头
  ```js
  vm.$data === data // => true
  vm.$el === document.getElementById('example') // => true

  // $watch 是一个实例方法
  vm.$watch('a', function (newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
  })
  ```
## 钩子函数
  生命周期函数是有顺序的，根据页面的中模板实例的出现和消失来被定义
  被创建之前，创建之后，被渲染之前，渲染之后，被改变之前，被改变之后，被销毁之前，销毁后
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  deforeDestory
  destoryed

## 指令：指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
  1. v-once 只会渲染一次，以后不会在改变
  2. v-html 渲染html代码  
    <span v-html="rawHtml"></span>
    将rawhtml的内容渲染为html代码，但是注意不要讲用户的输入变成html插入，很危险，会导致xss攻击
  3. v-bind 绑定属性，但是对于属性取值为布尔值的时候，为null，undefined，false都不会有效果
  4. 注意在绑定属性值的赋值上可以有{{单个表达式，仅为一句话}} 会被当成JavaScript执行
  5. v-if 根据if属性值的真假来决定插入或者删除该元素
    <template v-if="ok">可以用来当成一个透明盒子包裹，动态渲染里面的多个元素
  6. v-on 绑定on事件，onchange，oncilck等等
  7. v-else & v-else-ifs
      v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
      类似于 v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。
  8. v-show
     这个元素和v-if有点像，但是又不太一样
     show的元素不管是否显示都会被保留在dom结构里面
     只是改变了display值，但是if是会增加删除这个元素的
  9. v-show和v-if
    if是懒惰的，不管属性值怎么改变除非是为真，否则是不会改变那个
    一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
  8. 一些指令能通过: 来接受一个参数，比如:v-bind,,v-on,冒号后面也可以通过[某变量]来动态的设定某些属性
    比如v-on:[event],event可以是change，也可以是click，但是对于event的取值只能是字符串或者null，其他任何形式都会被警告，比如含有空格或者引号
  ## 修饰符. .prevent修饰符告诉v-on指令对于触发的事件调用event.preventDefault()**???
    ```html
    <form v-on:submit.prevent="onSubmit">...</form>
    ```
  ## 简写,很常用
  ```html
  <a v-bind:href="url">...</a> => <a :href="url">...</a>
  <a v-on:click="doSomething">...</a> => <a @click="doSomething">...</a>
  ```
  ## 在vue中有一个computed方法用来定义所有的计算属性方法 
  需要进行计算或者处理的情况

  ## 侦听器watch
    这个watch会返回属性数据变化的新值和旧值

  ## v-bind和class结合
    ```html
    <div v-bind:class="{ active: isActive }"></div>接受对象
    <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    接受多个对象
    <div v-bind:class="classObject"></div>这里的classObject是一个函数计算后返回的对象,如下
    <div v-bind:class="[activeClass, errorClass]"></div>接受数组
    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>接受三元表达式


    ```
    ```js
    classObject= function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
      }
    }
    ```
  ## 绑定样式 v-bind:style="{}"
    ```html
    可以是对象，是外部对象，是数组
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    <div v-bind:style="[baseStyles, overridingStyles]"></div>
    style的属性也可以用一个数组接受多个属性值，如下
    从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
    这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
    ```
  ## 用key值管理可复用的元素
  如果不想复用两个元素，将这两个元素的key值设为不同的值即可
  会让这个元素重新渲染
  ## MVVM 是表示，modal的改变会触发视图的更新，而视图的更新也会触发对应modal的更新
  一个ui的某个模块的数据与某个数据绑定在一起，某些数据的改变不会导致整个页面的刷新
  但是react和vue是采用的单项数据流
  ## 数据的更新会导致页面的更新，但是只会对比虚拟dom，然后更新有变化的部分
  ## 虚拟dom的例子
    好比如真实的房子和施工的图纸
    你根据图纸修好了一栋房子，但是房主不是很满意，让设计师又修改了一部分结构，
    设计师会给你一张新的图纸，说，你按照这个图纸来修吧
    但是你真的会把房子拆了重修吗，当然不会
    你会把前后两个图纸进行对比，到底需要改变哪里的结构
    你就只改变那里的结构就好了
  ## 对于computed和methods
    对于数据的处理，改变一般放在computed里面。不用通过()调用，而是一个变量
    对于事件的处理放在methods里面，需要通过函数调用
  ## 关于key的必考题，为什么要有key，key的好处是什么
    在对比图纸的时候，图纸太大了，你要一个细节一个细节的对比就很乱，而且容易出错
    你会发现，对比的时候我们可以不需要专业人士，随便一个人都可以找不同
    那么这个时候，我们可以通过图纸上的每个区域的名字来进行对比，
    我们先对比下大客厅，两个大客厅之间有什么不同？
    没有不同，那我们接着对比下主卧室，通过对比我们发现，主卧室的有一面墙被打通了
    接着对比次卧，书房，每一个房间，然后厕所，
    我们从上往下一个一个对比图纸上每一个能说得上名字的内容
    那么key就是给每一个地方加一个名字，名字必须不同，一样的key会导致你对比失误
    我们把每一个区域变成不同的名字分给不同的人，最后让他们反馈每一个区域都改变了哪些地方
    比如说，在渲染5个li的时候
    我们只是在这5个li中间最前面增加一个li，
    如果每一个li没有唯一的key值
    那么他的diff算法会从头开始对比每一个li，如果在最前面增加一个li，会导致看起来，每一个li都改变了，
    都不一样了，那么我需要重新渲染所有的li
    如果给每一个li都唯一的key值，会发生什么？
    diff在对比的时候会对比所有key值相同的
    我们会发现，key值相同的都没有改变
    只是最前面增加一个key值不同的li
    那么我们只渲染那个新增的li就好了
    这样就大大的减少了浏览器的渲染效率
    这就是key的用处

  ## emit
    emit函数：this.$emit('事件名称','给该事件名称绑定的函数传递的参数')
    在子组件中定义这个emit，那么父组件在触发这个事件的时候就会收到定义好的传递的参数

  ## component
    在定义component的时候，如果不能通过标签直接使用，可以在使用原来的标签名，在里面加上is属性
    属性值为component的定义的名字
    并且在component里面定义Vue一样的data的时候，需要使用下面两种方法
    data(){
      return {}
    }
    data:function (){
      return {

      }
    }
    如果不用函数式的调用方式，那么这个组件在复用的过程中，所有该组件都是共用同一个数据
    当其中一个组件发生变化的时候，其他的同样组件都会发生改变  
    并且component可以全局注册，也可以在component里面再定义一个，但是只能让父component使用了
    其实局部组件是建议使用的

  ## vue的属性值的变化跟踪的方式是通过在beforeCreate和created之间去给data里面的每一个属性递归的增加getter和setter方法，这样就可以跟踪到每一个属性值的变化，并且在变化的时候得到之前和之后的值

  ## props
  父组件给子组件传递值是通过定一个属性，传递一个值下去
  子组件接受来自父组件的数据的时候通过在实例里面定一个和data同级的props属性，接受父组件定义的属性名的数据
  props：[]或者props:{
    changeValue:{
      type:String,
      default:null
    },
    foo:Number,
  }
  可以通过default设置初始值,type限制这个属性值的数据类型
  ## 组件在用新的标签使用的时候增加的class和原本的模板里面的最外层嵌套标签的属性会合并
    但是组件标签属性的元素是否会添加至原本的根元素属性上也可以通过设置来决定
    当某个组件被设置会不会转移属性的时候，也可以在原本的组件模块里面通过$attrs来得到
    也可以v-bind="$sttrs"来讲未被转移的属性添加至某个元素上面
  ## v-modal提供了双向绑定数据的机制
  ## slot标签会代替一个组件里面的增加的所有子元素
  ## <keep-alive>活性保留状态组件
  ## 异步组件
    Vue.component在使用的时候接受第二个参数是一个promise函数
    是用于实现该组件只有在渲染之前才会做的事情，其中需要渲染的组件放在reslove里面
    一般用于，在该组件被加载之前才会去获取相关的数据接口
    实现少流量，懒加载
  ## ref
    一个标签或者一个组件增加一个ref属性之后，
    其他的组件或者元素可以通过this.$refs.属性名 来获取那个元素的实例，从而得到那个在增加ref属性的
    元素的各种信息
    其实就相当于原生的js里面的querySelect by id/name
    当ref的属性相同的时候就是只会保留最后一个被增加该属性的元素的实例
    但是该ref属性只在组件渲染完成后生效，应该避免使用
  ## Vue.dieective('新建的指令名字',{ bind(el){} }) 可以用来自定义指令

  ## 关于vue的dom以及渲染,diff算法
    浏览器为了更好的用户体验，不会等整个html文档解析完成才去构建render树和计算布局
    而是一边加载一边解析一边渲染
    一个网页展示的步骤：
      html解析构建dom树-> css解析构建StyleRules->构建render树->布局Layout->绘制painting
      这里还要知道重绘和回流的差别
      每一次对dom的操作都会引起整个dom的流程走一遍，代价是巨大的
      所以需要虚拟dom来简化dom的操作，在一定的时间内去更新dom，重新布局，
      那么在那些时间内的所有操作都会放在队列里面等待
      当需要更新的时候，通过前后两次虚拟dom更新，比较不同的地方
      通过高效的diff对比，来判断是否需要删除节点，新增节点还是移动节点还是只是更改text
      而diff的对比采用的是深度优先对比，事实上就像是html代码一样，一行一行对比下来，
      先后对比标签，属性，内容是否一样
      不同的地方会记录到一个对象里面，变成一个数据表
      通过这个表，表示删除哪个节点，移动哪个节点，更改哪个text，再去真正的挂载真实的dom节点
      这个时候key值的出现更加高效的改变了对比的效率
      因为插入一个节点之后，从前往后对比会发现插入的节点之后都是乱掉的，
      后面的节点就会不停的卸载，挂载，那么如果有key值
      key值尽量不要取数组的下标，会导致错误
      对比的时候，key值相同的会进行对比，就会发现我不需要不停的卸载挂载，后面的节点都只是需要移动而已
      而对于需要移动的节点，采用的是最短距离算法来决定如何高效的移动
      为最小编辑距离的动态规划求解
    ### js操作真实dom的代价
    当我们需要更新10个dom节点，当浏览器收到第一个dom节点的更新的信息的时候并不会提前知道后面还有9个dom节点的更新，所以会立即更新第一个dom节点的变化
    ## vuex
      这个是状态管理的模式，
      它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
      简单的理解就是打破了单项数据流，不用再使用emit来绑定父子组件之间的数据传递
      而是把整个需要交换数据的组件引入vuex的概念来统一管理，更改，处理需要的数据
      把数据变成大家共用的
      ### 正常的vuex的概念有
      1. 状态state
      2. 模块module，用来同步改变state中的数据
      3. 访问属性getter，用来计算state的各种属性值
      4. 更改状态mutation
      5. 异步操作逻辑actions

      有个问题就是为什么需要异步的antions之后再去同步的直接更改数据mutations，
      因为vue需要知道数据的状态
      只有antions调用了commit，vue才会知道，数据变化了，不管是异步更新还是演示调用，都没有办法直接知道数据是否更新完成
      但是commit就代表，数据更新了，因为mutation是同步的，是一定是会马上执行的
    ## 路由嵌套是放在router的children里面的
    ```js
      var router = new VueRouter({
      routes: [{
        path: '/',
        component: Home,
      }, {
        path: '/orders',
        component: Orders,
        children: [{
          path: '',
          redirect: 'paid',
        },{
          path: 'yifahuo',
          component: {
            template: `<div>已发货</div>`
          },
          {
          path: 'yifahuo',
          components: {
            componentname1:{
              template: `<div>componentname1已发货</div>`
            },
            componentname2:{
              template: `<div>componentname2已发货</div>`
            }
          }
        }],
      }]
    ```
    需要在watch里面去监控路由的变化,或者使用beforerouteupdate()函数


