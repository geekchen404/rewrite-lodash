# JavaScript 记录，一下记录部分先后，想到哪儿写到哪儿

 ## Promise
    个人理解：
    在看张鑫旭的文章的时候，说过promise一开始本来想命名为futures，意味未来
    其实，翻译为承诺有点误区，个人喜好理解为‘如果’
    你喜欢上一个人，和他表白，有两种可能，拒绝你，答应你
    如果答应你，你会开始计划与她要做的事情，我们去逛街，看电影
    如果拒绝你，你就马上找个酒吧，去买醉
    这个如果，就是提前计划好自己未来的行为
    但是未来有很多可能，一种有结果，一种没有结果
    看见一句话，promise也还是有很多的回调，但是，他让回调更加可控

    promise.all更加像是人对于第二天的所有计划，之后时间到了我才能继续下一个计划
    明日计划：这就是一个promise未来链
    1. 早上九点去爬山
      1.1 爬山完成
      1.2 要是下雨，不能爬山我就起床看个电影
        1.2.1 看电影完成
        1.2.2 直接睡过头，没看成电影，over
    2. 中午睡个午觉
      2.1 睡午觉完成
      2.2 要是隔壁在装修，没睡成那我就直接找老王去
    3. 下午约隔壁老王去打篮球
      3.1 打篮球完成
      3.2 还在下雨，没打成球，那就和老王去逛超市
        3.2.1 和老王去逛超市完成
        3.2.1 老王不在家，over
    4. 晚上约小李吃个饭，约会
      4.1 约会完成
      4.2 小李放我鸽子了，over，没心情干别的了
      也有点像以前看的古装电视剧，里面的大佬死之前会给主角三个锦囊，告诉他
      你其实是皇帝的儿子。但是被抛弃了，你现在要去夺回你太子的位置
      1. 你先去隔壁村找王员外，告诉他你的身份
        1.1 他信了，你就听他的话
        1.2 他要是没信，你就把我的黄色的锦囊，让他带你去找

      promise.race有点像，你去好几家公司面试了，每个hr都告诉你这周末会给你答复
      但是在周末来临之前，你都不知道哪个hr会最先给你答复
      那race就是，你告诉我，周末是哪位hr最先给你答复的，不管是否被录取

      promise.try是可以用于如果一个异步的请求本来就可能会报错
      使用try执行，promise会用catch接住错误
      比如下面的database.users根本就不存在怎么办
  ```js
  Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
  ```

      
      promise有一个主要的then方法，会为promise注册两个回调函数，
      用来接收这个promise成功返回的值或者是失败的原因

      promise还有一个finally方法的回调函数不接受任何参数，
      和状态无关，是最终一定会执行的代码

      promise有三种状态，
      其中一种状态是可以变为其他两种状态其中之一的，
      而其中两种状态是不可更改的
      而其中的不可变也仅仅指的是
      一个promise最终只能有一种状态，成功，或者失败，
      每一个promise都会返回一个东西，可能是一个值，也可能是一个promise，也可能抛错
      那最后的结果取决于x的值，或者返回的promise的最终状态，也可能是一个中间的错误
      一个promise的最终状态是reslove还是reject是看这个promise内部的代码是否成功运行，成功运行，是resolve，如果发生错误或者抛出错误就是reject
      如果要自己实现一个promise，就应该知道一个promise做了什么，如何使用
      所以我们写一个用例：
      用promise异步的读取


      如果你的Promise的then的回调函数没有return ，那么不能实现then的链式调用。
      因为then会返回一个promise，如果不返回就是undefined，

      then可以接受两个参数，但是建议then，catch这样写，因为更加全面的接受错误


  ##  事件执行机制
      事件的执行机制就是Event Loop，事件轮询，也是一种js实现异步的方式
      事件分为同步和异步，更加细致的话分为宏任务和微任务
      宏任务按顺序执行，且浏览器在每个宏任务之间渲染页面
      所有微任务也按顺序执行，且在以下场景会立即执行所有微任务
      每个回调之后且js执行栈中为空。
      每个宏任务结束后。
      1. macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
      2. micro-task(微任务)：Promise，process.nextTick

  ##  web-socket 
      实现的原理是什么，就是tcp层 根本没有断开连接
      建立了一个tcp连接，走的是web-socket协议
      浏览器通过http请求和服务器说我想要变成web-socket连接
      服务器就会走web-socket协议，连接不会再断开
      浏览器像服务器发一个http请求，要求服务器升级为web-socket的连接
      不再走http报文，以消息为单位，有点像udp，但是又是可靠和有序的
      ws = new WebSocket('wss://路径')//ws是http的，wss是https的
      在请求头里面是：
      Connection: Upgrade
      Upgrade: websocked
      响应头里面：
      Connection: Upgrade
      Upgrade: websocked
      Sec-WebScoked-Accept:.....
      通过二进制进行消息连接
      node里面已经有一个event是来监听wetsocket的upgrade请求升级事件：upgrade
      