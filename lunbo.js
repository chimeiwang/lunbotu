function Carousel (){
    //参数绑定
    this.init.apply(this,arguments);
}
Carousel.prototype = {
    //初始化一些东西，做一些定义，传入参数为待绑定id，与图片数据数组
    init:function(id,imgurl){
        if(typeof(id)!=='object'){
            console.error('输入对象类型需要是obj,输入id不好使');
        }
        if(id.nodeName !== 'DIV'){
            console.error('绑定的要是一个div，别的不行')
        }
        if(!imgurl instanceof Array){
            console.error('第二个参数必须是数组，别的不行')
        }
        if(imgurl.length==0){
            console.error('是的 空数组也不行')
        }
        imgurl.map(function(val){
            if(!val.href || !val.url){
                console.error('你得输入数据啊！！！')
            }
        });
        var warp;
        var startX,startY,moveX,moveY;
        var num = 1;
        var warpimg;
        this.imgnum =  imgurl.length;
        this.shows(id,imgurl);
    },
    //插件结构，传入参数为待绑定id，与图片数据数组
    shows:function(id,imgurl){
        //乱七八糟的把结构弄起来
        var _this =this;
        warp = document.createElement('div');
        warp.style.overflow = 'hidden';
        warp.style.width = '100%';
        warpimg = document.createElement('div');
        warpimg.style.width = imgurl.length+'00%';
        warpimg.style.position = 'relative';
        warpimg.style.transition = '1s all';
        var control = document.createElement('div');
        control.style.height = '0.5rem';
        control.style.margin = '-0.714em auto';
        control.style.position = 'relative';
        control.style.width = '2.406rem';
        imgurl.map(function(val,index){
            var a = document.createElement('a');
            a.href = val.href;
            a.setAttribute('data-ajax','false');
            var img = document.createElement('img');
            img.src = val.url;
            img.style.width = (100/imgurl.length).toFixed(2)+'%';
            img.style.float = 'left';
            a.appendChild(img);
            warpimg.appendChild(a);
            //判断是不是只有一张，如果只有一张，不渲染没有必要的导航条
            if(_this.imgnum != 1){
                var controlitem = document.createElement('img');
                if(index==0){
                    controlitem.src='https://img.feitianmao.cn/web/Images/img/carousel_chioce.png'
                } else{
                    controlitem.src='https://img.feitianmao.cn/web/Images/img/carousel.png'
                }
                controlitem.id = index;
                controlitem.setAttribute('class','controlitem');
                control.appendChild(controlitem);
                controlitem.style.cssText = 'height: 0.25em;'+
                'width: 0.25em;'+
                'margin: 0 0.276em;'+
                'float: left;'+
                'position: relative;'+
                'top: -0.714em;';
            }
        });
        //如果只有一条，不进行轮播和监听
        if(this.imgnum !== 1){
            this.listener();
            this.auto();
        }
        //把该绑的都绑上
        warp.appendChild(warpimg);
        warp.appendChild(control);
        id.appendChild(warp);
        return warp;
    },
    //监听动作，像左滑动还是向右
    listener:function(){
        var _this = this;
        warp.addEventListener('touchstart',function(e){
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        })
        warp.addEventListener('touchmove',function(e){
            moveX = e.touches[0].pageX;
            moveY = e.touches[0].pageY;
        })
        warp.addEventListener('touchend',function(){
            if(Math.abs(startX-moveX) > Math.abs(startY-moveY) && Math.abs(startX-moveX) > 20 && Math.abs(startY-moveY) <300){
                if(startX > moveX){
                    _this.move(true);
                }else{
                    _this.move(false);
                }
            }
        })
    },
    //页面移动 传入参数true向右，false向左
    move:function(val){
        var phone_width = window.screen.availWidth;
        if(val){
            if(num == this.imgnum-1){
                num =  0;
            }else{
                num++;
            }
            warpimg.style.right = num*phone_width+'px';
        }else{
            if(num == 0){
                num = this.imgnum - 1;
            }else{
                num--
            }
            warpimg.style.right = num * phone_width + 'px';
        }
        //导航条跟随
        this.controlchange(num);
    },
    //导航条跟随运动，传入参数为现在进行到第几张图（从0开始算起）
    controlchange:function(index){
        var con = document.getElementsByClassName('controlitem');
        for(var i = 0;i<con.length;i++){
            con[i].src = 'https://img.feitianmao.cn/web/Images/img/carousel.png';
        }
        var con_change = document.getElementById(index);
        con_change.src = 'https://img.feitianmao.cn/web/Images/img/carousel_chioce.png';
    },
    //轮播开启
    auto:function(){
        var _this =this;
        setInterval(function(){
            _this.move(true);
        },5000)
    }
};


