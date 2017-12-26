var user = $(".user")[0];
//获取cookie
function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for(var i=0;i<arr1.length;i++){
        var arr2  = arr1[i].split('=');
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}
user.innerHTML = getCookie('username');
//意见反馈
$(function () {
    $(".advice").on("click", function () {
        $(".text").css({
            "display": "block"
        });
        $(".text").on("mouseleave", function () {
            $(".text").css({
                "display": "none"
            })
        });
    })
});
//模拟百度搜索接口
function callback(data){
    $('.search ul').html('');
    var str = '';
    if(data.s.length){
        for(var i=0;i<data.s.length;i++){
            str +='<li><a href="http://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>';
        }
        $('.search ul').html(str).slideDown();
    }else{
        $('.search ul').hide();
    }
}
$(function(){
    $('.search input').on('keyup',function(){
        if($(this).val()!=''){
            var $Script = $('script');
            var Url = 'http://suggestion.baidu.com/su?wd='+ $(this).val() +'&cb=callback';
            $Script.attr('src',Url);
            $(document).append($Script);
        }else{
            $('.search ul').hide();
        }
    });
});
//音频播放
var flag = false;
window.onload = function() {
    var player = $('#player')[0];
    $(".music").on("click", function () {
        if (flag == false) {
            player.play();
            $(".music").attr("src", "img/music.png");
            flag = true;
        }
        else {
            player.pause();
            $(".music").attr("src", "img/music_off.png");
            flag = false;
        }
    });
};
//轮播
$(function(){
    var num=0;
    $(".left .ban").mouseenter(function(){
        $(".left ol").css({
            "display": "block"
        });
        $(".left ol li").mouseenter(function(){
            num = $(this).index()-1;
            $(this).addClass('current').siblings().removeClass('current');
            $(".left .banner img").eq($(this).index()).css({display: "block"}).siblings().css({display: "none"});
        });
    });
    $(".left .ban").mouseleave(function(){
        $(".left ol").css({
            "display": "none"
        });
    });
    //自动轮播
    setInterval(function(){
        num++;    //让图片的索引值次序加1，这样就可以实现顺序轮播图片
        if(num>$(".left ol li").length-1){ //当到达最后一张图的时候，让num赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
            num=0;
        }
        $(".left ol li").eq(num).addClass('current').siblings().removeClass('current');
        $(".left .banner img").eq(num).css({display: "block"}).siblings().css({display: "none"}) //模拟触发数字事件mouseenter
    }, 2000);
});
//视频双击退出全屏
$(function () {
    var video = $("#video")[0];
    //取消全屏
    //双加全屏
    function requestFullScreen(element){
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if(requestMethod){
            requestMethod.call(element);
        }else if(typeof window.ActiveXObject!=='undefined'){
            //创建Wsshell对象，可以调用系统程序，注册表，，，，，
            var wsShell = new ActiveXObject('WSript.shell');
            //---F11
            if(wsShell!==null){
                wsShell.SendKeys('{F11}');
            }
        }
    }
    //取消全屏
    function  cancelFullScreen(element){
        var cancelMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozRequestCancelFullScreen || element.msCancelFullScreen;
        if(cancelMethod){
            cancelMethod.call(element);
        }else if(typeof window.ActiveXObject!=='undefined'){
            //创建Wsshell对象，可以调用系统程序，注册表，，，，，
            var wsShell = new ActiveXObject('WSript.shell');
            //---F11
            if(wsShell!==null){
                wsShell.SendKeys('{F11}');
            }
        }
    }
    //双击全屏，退出全屏
    function fullorcallScreen(element){
        //--点击的次数
        var count = 0;
        element.addEventListener('dblclick',function(){
            if(count%2==0){
                requestFullScreen(element);
            }else{
                cancelFullScreen(document);
            }
            count++;
        },false);
    }
    fullorcallScreen(video);
});
//点击加微信
$(function () {
    $(".weix").on("click", function () {
        $(".weixin").css({
            "display": "block"
        })
    });
    $(".weixin").on("mouseleave", function () {
        $(".weixin").css({
            "display": "none"
        })
    });
});