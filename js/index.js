function getCookie(name)
{
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++)
    {
        //arr2->['username', 'abc']
        var arr2=arr[i].split('=');

        if(arr2[0]==name)
        {
            var getC = decodeURIComponent(arr2[1]);
            return getC;
        }
    }

    return '';
}
$.ajax({
    type:'GET',
    url:"data/index/firstpage.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        var data=datas;

        $("#map").delegate(".open","click",function(){
            $(".bwmg").find("p").html(" ");
            $(".bwmg ul li a").html(" ");
            var id=$(this).attr("id");
            data=filter("MID",id,datas);
            var len=data.length
            var name=$("#"+id+" p span").html();
            $(".bwmg").find("p").html(name);
            if(len>1){
                for(var s=0;s<len;s++){
                    var info=data[s].FEXHIBITIONBTIME+"~"+data[s].FEXHIBITONETIME.slice(5)+data[s].FTITLE;
                    $(".bwmg ul li").eq(s).find("a").html(info).attr("href","index_showdetails.html?ID="+data[s].FGUID).attr("target","_blank");
            }
            }else if(len==1){
                var info=data[0].FEXHIBITIONBTIME+"~"+data[0].FEXHIBITONETIME.slice(5)+data[0].FTITLE;
                $(".bwmg ul li").eq(0).find("a").html(info).attr("href","index_showdetails.html?ID="+data[0].FGUID).attr("target","_blank");
            }
        })

    }
})

$.ajax({
    type:'GET',
    url:"data/index/museum_position.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k in datas){
            $("#map").append("<div data-level='"+datas[k].FMLEVEL+"' class='point' id='"+datas[k].MID+"' style='left:"+datas[k].FLONGITUDE+"px;top:"+datas[k].FLATITUDE+"px'><p><span>"+datas[k].FMUSEUMNAME+"</span><u class='ums'>"+datas[k].NUM+"<i id='total'></i>件藏品</u></p></div>");
        }
        $("[data-level='一级博物馆']").addClass("level1");
        $("[data-level='二级博物馆']").addClass("level2");
        $("[data-level='三级博物馆']").addClass("level3");
        $("[data-level='其他博物馆']").addClass("levelqt");

    }
})
///热门虚拟博物馆
$(".imglist li").hover(function(){
    $(this).animate({
        width:"212px",
        height:'140px'
    },200)
    $(this).find(".mask").animate({
        width:"212px",
        height:'140px',
        opacity:"0"
    },100)
    $(this).css("box-shadow","0 0 10px #199ce7").css('border',"none")
},function(){
    $(this).css("box-shadow","none")
    $(this).animate({
        width:"160px",
        height:'104px'
    },200)
    $(this).find(".mask").animate({
        opacity:".5"
    },100)
})
//左下角的资讯框
$(".zxtj ul li button").on("click",function(){
    var a=$(this).attr("id");
    $(".point").removeClass("open");
    if(a=="bt1"){
        $.ajax({
            type:'GET',
            url:"data/index/firstpage1.json",
            dataType:"text",
            success:function(json){
                var data=eval("("+json+")");
                $(".bwmg ul").html(" ");
                for (var k in data){
                    var info=data[k].FEXHIBITIONBTIME+"~"+data[k].FEXHIBITONETIME.slice(5)+data[k].FTITLE;
                    $(".bwmg p").html("本月展讯");
                    $(".bwmg ul").append("<li><a href='' >"+info+"</a></li>")
                    $(".bwmg ul li").eq(k).find("a").attr("href","index_showdetails.html?ID="+data[k].FGUID).attr("target","_blank");
                    $("#"+data[k].MID).addClass("open");
                }

            }
        })
    }else {
        $.ajax({
            type:'GET',
            url:"data/index/firstpage2.json",
            dataType:"text",
            success:function(json){
                var data=eval("("+json+")");
                $(".bwmg ul").html(" ");
                for (var k in data){
                    var info=data[k].FEXHIBITIONBTIME+"~"+data[k].FEXHIBITONETIME.slice(5)+data[k].FTITLE;
                    $(".bwmg p").html("下月展讯");
                    $(".bwmg ul").append("<li><a href=''>"+info+"</a></li>")
                    $(".bwmg ul li").eq(k).find("a").attr("href","index_showdetails.html?ID="+data[k].FGUID).attr("target","_blank");
                    $("#"+data[k].MID).addClass("open");
                }

            }
        })
    }

})
//打开页面默认本月资讯
$.ajax({
    type:'GET',
    url:"data/index/firstpage1.json",
    dataType:"text",
    success:function(json){
        var data=eval("("+json+")");
        for (var k in data){
            var info=data[k].FEXHIBITIONBTIME+"~"+data[k].FEXHIBITONETIME.slice(5)+data[k].FTITLE;
            $(".bwmg p").html("本月展讯");
            $(".bwmg ul").append("<li><a href=''>"+info+"</a></li>")
            $(".bwmg ul li").eq(k).find("a").attr("href","index_showdetails.html?ID="+data[k].FGUID).attr("target","_blank");
            $("#"+data[k].MID).addClass("open");
        }

    }
})
///热门虚拟博物馆
$.ajax({
    type:'GET',
    url:"data/index/second.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
             for(var k in datas){
                 var c=$(".imglist li").eq(datas[k].ORDER-1);
                 c.find("img").attr("src",datas[k].XNMS_IMG_URL);
             }
            var data=filter("ORDER","1",datas)[0];
             $(".msg h1").html(data.NAME);
            $(".msg a").attr("href","digitization_details.html?ID="+data.ID).attr("target","_blank");
            $(".msg p").html(data.ABSTRACT);
            $(".msg").find("img").attr("src",data.XNMS_IMG_URL);
            $(".imglist li").on("click",function(){
            for(var s in datas){
                var n=$(this).index()+1;
                if(datas[s].ORDER==n){
                    $(".msg h1").html(datas[s].NAME);
                    $(".msg a").attr("href","digitization_details.html?ID="+datas[s].ID).attr("target","_blank");
                    $(".msg p").html(datas[s].ABSTRACT);
                    $(".msg a").find("img").attr("src",datas[s].XNMS_IMG_URL)
                }
            }
        })
    }
})
//热门藏品
    $.ajax({
        type:'GET',
        url:"data/index/last.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            for(var k in datas){
                var c=$(".banner ul li").eq(datas[k].FORDER-1).append("<a href='appreciate_details.html?ID="+datas[k].ID+"' target='_blank'><img src='"+datas[k].FPIC+"' width='400px' heigth='622px'/></a><h4>"+datas[k].FYEAR+"</h4><h3></h3><p></p>");
                c.find("h3").html(datas[k].FNAME);
                c.find("p").html(datas[k].FBRIEF)

            }
            $('#b05').unslider({
                autoplay: true,
                infinite: true
            })
            $(".unslider-arrow").html(" ");
            $(".unslider-nav ol li").html(" ")
            for(var i in datas){
                $(".unslider-nav ol li").eq(datas[i].FORDER-1).html("").append("<img src='"+datas[i].FPIC+"' width='100px' height='154px'>")
            }
        }
    })
    var val=getCookie("name");
    if(val==""){
        $(".login_succe").css("display","none");
        $(".login_no").css("display","block");
    }else{
        $(".login_no").css("display","none");
        $(".login_succe").css("display","block");
        $("#uname").html(val);
    }
//博物馆等级
    $("#left-nav li").click(function() {
        var n = $(this).index();
        $(this).addClass("point6");
        $(this).siblings().removeClass('point6');
        if (n == 1) {
            $("[data-level='一级博物馆']").show();
            $("[data-level='二级博物馆']").hide();
            $("[data-level='三级博物馆']").hide();
            $("[data-level='其他博物馆']").hide();
        }
        else if (n == 2) {
            $("[data-level='二级博物馆']").show();
            $("[data-level='一级博物馆']").hide();
            $("[data-level='三级博物馆']").hide();
            $("[data-level='其他博物馆']").hide();
        }
        else if (n == 3) {
            $("[data-level='三级博物馆']").show();
            $("[data-level='一级博物馆']").hide();
            $("[data-level='二级博物馆']").hide();
            $("[data-level='其他博物馆']").hide();
        }
        else if (n == 4) {
            $("[data-level='三级博物馆']").hide();
            $("[data-level='其他博物馆']").show();
            $("[data-level='一级博物馆']").hide();
            $("[data-level='二级博物馆']").hide();
        }
        else {
            $("[data-level='一级博物馆']").show();
            $("[data-level='二级博物馆']").show();
            $("[data-level='其他博物馆']").show();
            $("[data-level='三级博物馆']").show();
        }
    })

function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
    }
    return output;
}
