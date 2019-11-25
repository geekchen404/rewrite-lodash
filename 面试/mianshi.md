# 个人经历面试总结
个人情况，有工作经验
  ## xxx公司
  主要是看你的工作经验，对于你做的项目和他们目前的项目有没有切合点
  1. 计算机五层是哪五层，介绍一下
  2. tcp三次握手介绍一下
  3. 你熟悉哪些数据结构，bst是什么，二叉树，讲一下快排的原理和复杂度
  4. 盒模型介绍一下
  5. 事件循环和宏任务和微任务
  6. 虚拟dom和key
  7. 介绍一下node，是做什么的，这个有什么好
  8. 怎么实现涂鸦画板的线条大小根据人的手的轻重来调节
  ## xxx公司
  主要问css，实现一个什么效果，出题形式居多,技术面两个人，hr面一个人，全程两个小时
  1. html5有哪些
  2. 什么是语义化
  3. 有哪些水平垂直居中的效果（100*100px在一个宽高未知的盒子里面），具体讲一遍
  4. 介绍一下localstorage，一般用来存放什么数据，还有如何实现过期功能
  5. 还有token，什么时候，情况下用
  6. css3的一些新的api有了解吗
  7. requestAnimationFrame和普通的settimeout有什么区别
  8. 怎么纯css绘画一个爱心，并实现跳动效果 
  9. 如何实现8px的字体
  10. js的所有数据结构讲一遍
  11. 字符串，数字和布尔值之间的转换，+0,-0,+1,-1在布尔值中都是什么
  12. es6都有哪些api，讲一遍
  13. var，let，const有什么区别
  14. promise是什么，async是谁的语法糖
  15. 关于数组去重
  16. react的生命周期函数介绍一下，你用的是哪个版本
  17. 介绍一下最常用的生命周期函数
  18. 剩下的基本上都是让我介绍项目，以及项目的技术栈
  19. 画一条0.5px的线
  20. webSocket介绍一下
  21. setState为什么是异步的
    回答：不是仅仅是异步的，只是默认是异步的。同步异步取决于你如何调用，
    同步的方式调用就是异步的set，异步的方式调用就会同步的set
  ## xxxx公司
    有面试题，面试主要围绕面试题展开，两轮技术面，最后hr面
    1. 请描述cookies，seesionStorage，localStorage
    2. 为什么css的<link>标签通常放在<head>之间，但是js的<script/>标签放在<body>之前
    3. 请描述BFC如何工作
    4. display:none和visibility:hidden如何工作
    5. translate()和absolute positioning的区别
    6. == 和=== 有什么不同
    7. 接受浏览器的同源策略
    8. 什么是事件循环
    9. 实现add(2,5)add(2)(5)都为7
    10. <script>(window.foo || (window.foo='bar') )<script/>
      上面的代码输出什么
    11. 
    ```js
      function  getResult(val,time){
        return new Promise((resovle)=>{
          setTimeout(()=>{
            console.log(val)
            resovle()
          },time)
        })
      }
      (async ()=>{
        const a= getResult(1,300)
        const b= getResult(2,200)
        await a
        await b
      })()

      (async ()=>{
        await getResult(1,300)
        await getResult(2,200)
      })()


      var obj = {
        a:1,
        name:'world',
        objSayName:function(fn){
          fn()
        }
      }
      var name = 'hello'
      var arr = [1,2,3,3,4,5]
      function foo(o){
        var bar= arr||[6,7,8]
        var arr = [4,2,9]
        o.a=3
        var baz=  o
        baz.a= 2
        console.log(bar,obj.a)
      }
      function sayName(){
        return console.log(this.name)
      }
      foo(obj)
      obj.objSayName(sayName)
    ``` 
    求执行结果
    12. 如何实现一个全是异步的函数的数组分别实现串行执行和并行执行
    ## xxx公司
      无面试题，主要是问我自己能不能负责从头搭建一个项目到落地
      1. https介绍一下
      2. tcp udp介绍一下
      3. setState介绍一下
      4. node用过吗
      5. redis缓存
      6. 数据库索引优化
      7. es6 的class介绍一下
      8. 如何实现[1,2,3,4,5]和[3,4,5]如何最优解得到[1,2]
      9. get和post的区别
  ## xxx公司
      1. 一个很大的数组如何得到前十个最大的元素
      2. 二叉树的层序遍历，伪代码
      3. 1px的线
      4. position绝对定位和相对定位的基准
      5. 事件委托讲一下
      6. react key讲清楚,有重复的key值会渲染吗，
      7. react 的路由直接刷新还能直接回到当前页面吗
    ### 现场面试
      1. 第一轮项目面
        抠项目的细节，重点是考察你是否真的有工作经验，这个工作靠不靠谱，项目是否很水
        介绍项目，做什么，什么技术栈，面了40分钟，还有工作的各种细节
      2. 第二轮技术面
        拿着我的简历一个一个问
        1. http和https的区别
          追问：那从http到https，会有性能的问题吗
        2. 闭包是什么，什么情况下使用，写一下
        3. 原型与原型链，我直接画的图
        4. 事件循环，也是画的图
        5. 怎么封装异步的ajax，大概写了一点
        ```js
        /**
         * 封装ajax的异步请求，promise版本
        * @param {*} url 
        */
        function get(url) {
          return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('get', url.false)//false表示不异步，等待结果后才继续
            xhr.send()
            xhr.onload = function () {
              resolve(xhr.responseText)
            }
            xhr.onerror = function (e) {
              reject(e)
            }
          })
        }
        ```
        6. less讲一下(问的不是很清楚)
        7. webpack有了解过吗
        8. 虚拟dom怎么回事儿，画图比较直接
          （从setstate，讲到虚拟dom，从对比讲到对比数据表，key的作用，再讲到如何挂载）
           其实就是把setstate之后发生了什么讲了一遍
           追问：是如何挂载的呢，是一次挂载还是多次
        9. vue如何理解的，vue和react的区别
        10. js是如何实现的异步
            这个从回调函数讲到generator，再到await
        11. 讲一下node，有没有自己实现过什么东西
        12. http各个版本号之间的差异
        13. 进程和线程的区别，协程有了解过吗
        14. jquery 的链式调用
        15. git如何回滚
        16. 有没有做过消息的功能，我问了下是想问web worker还是web socket
        17. 用过高阶组件没有，什么情况会用
      3. 第三轮cto面，主要对你性格和潜力的判断
        1. 自己觉得自己的劣势
        2. 自己在之前的公司记忆最深的事情
        3. 问了蛮多
      4. 第四轮hr面，主要是压薪水，了解你的背景
        1. 主要问，为什么离职，因为具体的什么事情
  ## youzan  
    ### 第一轮
     1. 三个coding题，数组去重，数组降维，两个值判断是否相等，都是递归解决,题目看面试官心情来
     2. 问计算机五层模型，哪五层，http是哪层协议，具体讲一下
     3. tcp和udp的区别
     4. for in 和for of 和foreach和map 的区别讲一下
     5. 判断数组都有哪些方法，有什么优劣
     6. react的组件之间的通信，都有哪些，讲一下
     7. context介绍一下，都什么情况下使用
     8. redux讲一下
     9. url输入后的每一步，越细越好，也可以详细的讲其中一个步骤，够详细就好
     10. 浏览器的渲染步骤
     11. cookie和session
     12. http版本之间的差异

