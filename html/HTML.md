#  html 总结

  ## 语义化
    1. 语义化好的页面更加方便于人机交互
    2. 合适的使用标签
    3. 合适的嵌套标签
    4. 合适的标签类名
  ## 转义符/实体 
  ## base标签
    在head标签控制的页面的所有的a标签
    base标签的href属性可以规定次页面所有的url的基本路径，记得基准路径在最后加一个/
    base标签的target属性，可以规定文档里面所有连接的跳转方式
  ## meta标签
    ```html
    <meta name="xxx" content="xxx">
    ```
    name设置的页面的某种熟悉，content设置的某种属性的内容
    **还有一个功能是做eso优化**
    ```html
    <meta name="keydown" content="在搜索引擎中搜索的关键字的内容">
    ```
    优化自己的网站在搜索引擎中的排序，越靠前越好，优化也体现在，网页中只出现一个h1标签，为主要内容

  ## 相对路径和绝对路径
    简而言之是你在学校里找一个人的时候
    绝对路径是说：四楼三班的吴蕊
    相对路径是说：你楼下的你们教室的位置旁边的教室的吴蕊
    绝对路径是放在项目里面哪里都可以直接使用的
    但是相对路径是基于该文件的位置去定位的，不同的位置有不同的路径

  ## a标签
    ```html
    <a href="#p3">
    ```
    href是p3的时候，p3是id为p3的位置，但是这样的使用对于base标签也有影响
    当href是空的时候，点击会刷新，其实就是链接到自己，img标签同理
    多个a标签的时候，可以设置同一个target的名字，比如加入购物车，你不断的加入，其实只会打开一个购物车页面
    a标签还有一个download属性，加上这个属性会下载该a标签的href的东西，但是只能下载自己网站的东西

  ## br 换行，hr分割线（以整个页面为宽度）

  ## strong/em/bold 
    都是字体加粗的效果，但是strong有强调的语义，em也有强调的语义但是稍弱为strong，bold是纯粹的加粗字体，没有其他语义
  
  ## 命令行的脚本文件的后缀是：.shellScript
    在命令行中直接 xxx.sh 运行

  ## pre
    表示有预定义格式的文本，空格不会被忽略，是块级标签
    常常与code（行内标签）标签一起用于展示代码，pre套code

  ## dl 描述性列表
    ```html
    <dl>
      <dt></dt>
      <dd></dd>
      <dd></dd>
    </dl>
    ```
    一个dt至少对应一个dd为一组列表，dd会往后缩进一点
    就像是每个省对应一个dt，省内城市对应dd
  
  ## form 表单
    有两个属性：action（提交的地址）和target（类似于a标签的其属性）
  
  ## input 
    input标签有很多属性，有很多的类型和变种
    比较主要的type是：
      text（默认），CheckBox，radio，password，file，button
      h5新增date，number，email，url等
    注意file中：
      可以和label合用，当想要隐藏file的input标签的时候，可以直接
  ```html
  <label>
    <input type="file" hidden id="file" />
  </label>
  或者
  <label for="file"></label>
  <input type="file" hidden id="file" />
  ```
  当需要联动的input标签在label里面的时候，可以省去for属性的对应
  当label标签与需要关联的input不再一起的时候，可以用for属性关联id，
  实现隐藏不好看的input，自己设置label的样式达到好看的效果
  file的input还有一个属性是accept属性：接受什么格式的文件，打开文件的是系统会自动过滤
  但是实际上，没有什么意义，因为只有过滤效果而已 accept="image/*,text/*" accept=".zip"等

  ## fieldset 
    把多个input关联在一起，用的不多

  ## table
    table里面可以设置<clogroup><col><>/col></clogroup>
    还有 colspan，rowspan属性

  ## 现在决定标签的嵌套合法性的东西不再是行内块级标签，而是对于每个标签都有专门的分类
   可以在mdn上查找
