# lunbotu
-v 1.0
超小型的轮播插件，连上注释才100多行。只需要输入绑定的对象，以及一个数组，里面的的对象有两个参数，一个是href是跳转的地址，一个url是图片的地址。初始化实例如下：
var img = [
           {
               'href':'/mobile/',
               'url':'*.jpg'
           },
           {
               'href':'/mobile',
               'url':'*.jpg'
           },
       ]
    //实例化对象
    new Carousel(obj,img);
    如果输入的对象只有一个，那么关闭轮播，只进行单个图片展示。否则进行轮播。
    下一个版本会更新错误日志。