    var id=location.search.split("=")[1];
    if(id.length>32){
        id=id.substring(0,32);
    }
    $.ajax({
        type:'GET',
        url:"data/museum/MDetails.json",
        dataType:"text",
        async:false,
        success:function(json){
            var datas=eval("("+json+")");
            var data=filter("MID",id,datas)[0];
            for(var i=0;i<4;i++){
                if(data["PICPHOTO"+(i+1)]){
                    $(".banner ul").append("<li><img alt=''height='320px' width='892px'></li>")
                    $(".banner ul li").find("img").attr("src",data["PICPHOTO"+(i+1)])
                }
            }
            var unslider05 = $('#b05').unslider({
                    dots: true
                }),
                data05 = unslider05.data('unslider');
            $(".morec").on("click",function(e){
                e.preventDefault()
                location.href="more_collection.html?gp1=全部&gp2=全部&gp3="+data.FMUSEUMNAME+"&gp4=全部&gp5=全部&kw=all&time=0&hot=0"
            });
            $(".information_link").attr("href","more_information.html?CLASS=展览资讯&ly="+data.FMUSEUMNAME).attr("target","_blank");
            $(".wrapper>p span u").html(data.FMUSEUMNAME);
            $(".wrapper h3").html(data.FMUSEUMNAME);
            $(".jb").html(data.FMLEVEL);
            $(".lb").html(data.FMTYPE);
            $(".dq").html(data.DQ);
            $(".sj").html(data.OPENTIME);
            $(".dz").html(data.FDETAILADDRESS);
            $(".dh").html(data.FTEL1);
            $(".web a").html(data.FNET).attr("href",data.FNET);
            $("#txt").html(data.FMUSEUMBRIEF);
            $("#history").html(data.FHISTORICALEVOLUTION);
            $("#msg").html(data.FLONGSPEECH);
            $("#leader").html(data.FMUSEUMLEADERSHIP);
            var text=$("#txt p").text().substring(0,100);
            $(".btn3").on("mouseover",function(){
                $(".bdsharebuttonbox").show();
                window._bd_share_config = {
                    common : {
                        bdText :data.FMUSEUMNAME,
                        bdDesc :text,
                        bdUrl :"http://123.56.50.236:40/jilinsheng/museum_details.html?ID="+id
                    },
                    share : [{
                        "bdSize" : 24
                    }]
                }
                with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
                $(".bdsharebuttonbox").hover(function(){
                    $(this).show();
                },function(){
                    $(this).hide();
                })
            })
        }
    });
    //常设展览
    $.ajax({
        type:'GET',
        url:"data/museum/Mdetails_CSZL.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            datas=filter("MID",id,datas);
            for(var k=0;k<datas.length;k++){
                if(datas[k]){
                    $(".picList").append("<li><div class='pic'><a href='' target='_blank'><img src='"+datas[k].BLOB_ID+"' width='304px' height='210px;'/></a></div></li>")
                }
                $(".picScroll-left").slide( { titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,scroll:1,vis:4,easing:"swing",delayTime:1000,pnLoop:false,trigger:"mouseover",mouseOverStop:true });
            }
        }
    });
    //点击收藏
    $(".btn1").on("click",function(){
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var FCreateDate=new Date();
        var FCollectionType="博物馆点收藏";
        var FCollectionID=id;
        var FClollectionPic=$(".banner ul li").eq(0).find("img").attr("src");
        var FCollectionName=$(".wrapper>p span u").html();
        var result={
            "FIP":ip,
            "FCollectionType":FCollectionType,
            "FCreateDate":FCreateDate,
            "FUserName":FUserName,
            "FCollectionID":FCollectionID,
            "FClollectionPic":FClollectionPic,
            "FCollectionName":FCollectionName
        }
        var result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/mycollection.j",
            dataType:'JSONP',
            jsonp: "jsoncallback",
            jsonpCallback:"success_jsonpCallback",
            data:{"params":result},
            success:function(json){
                success_jsonpCallback(json);
                function success_jsonpCallback(data){
                    if(data.state=="fail"){
                        layer.alert(data.message,{icon:0});
                    }
                    else{
                        layer.alert(data.message,{icon:1});
                    }
                }
            }
        });
    })
    $(".btn2").on("click",function(){
        var FCollectionName=$(".wrapper h3").html();
        location.href="index_appointment.html?key="+FCollectionName;
    })
    //资讯
    $.ajax({
        type:'GET',
        url:"data/museum/Mdetails_ZX.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            var data=filter("FCONTENTTYPE","资讯",datas);
            data=filter("MID",id,data);
            for(var k=0;k<6;k++){
                $(".m1 ul").append("<li><a href='information_details.html?ID="+data[k].ID+"'>【"+data[k].FCOLUMN+"】"+data[k].NAME+"</a><span>"+data[k].TIME+"</span></li>")
            }
            var data1=filter("FCONTENTTYPE","学术",datas);
            data1=filter("MID",id,data1);
            for(var i=0;i<6;i++){
                $(".m4 ul").append("<li><a href='information_details.html?ID="+data1[i].ID+"'>【"+data1[i].FCOLUMN+"】"+data1[i].NAME+"</a><span>"+data1[i].TIME+"</span></li>")
            }
        }
    });
    //文创
    $.ajax({
        type:'GET',
        url:"data/museum/Mdetails_WenC.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            datas=filter("MID",id,datas);
            var len=datas.length;
            var lens=Math.ceil(len/2);
            for(var k=0;k<lens;k++){
                if(datas[2*k+1]){
                    // $(".img_list_wc").append("<li><a href='artifact_details.html?ID="+datas[k].FGUID+"'><img src='"+datas[k].BLOB_ID+"' width='130px' height='90px'><p><u>"+datas[k].FPRODUCTNAME+"</u></p></a></li>")
                    $(".img_list_wc").append("<ul><li><a href='artifact_details.html?ID="+datas[2*k+1].FGUID+"'><img src='"+datas[2*k+1].BLOB_ID+"' width='130px' height='90px'><p><u>"+datas[2*k+1].FPRODUCTNAME+"</u></p></a></li><li><a href='artifact_details.html?ID="+datas[2*k+2].FGUID+"'><img src='"+datas[2*k+2].BLOB_ID+"' width='130px' height='90px'><p><u>"+datas[2*k+2].FPRODUCTNAME+"</u></p></a></li></ul>")
                }

            }
            $(".multipleColumn").slide({titCell:".hd1 ul",mainCell:".bd1 .img_list_wc",autoPage:true,effect:"leftLoop",pnLoop:false,trigger:"mouseover",mouseOverStop:true,autoPlay:true,vis:3})
            // $(".picScroll-left").slide( { titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,scroll:1,vis:4,easing:"swing",delayTime:1000,pnLoop:false,trigger:"mouseover",mouseOverStop:true });
        }
    });
    //虚拟博物馆
    $.ajax({
        type:'GET',
        url:"data/museum/Mdetails_VR.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            var data=filter("MID",id,datas);
            if(data){
                for(var k=0;k<2;k++){
                    $(".img_list_sz").append("<li><a href='digitization_details.html?ID="+data[k].ID+"'><img src='"+data[k].XNMS_IMG_UR+"' width='192px' height='133px'><p><u>"+data[k].NAME+"</u></p></a></li>")
                }
            }

        }
    });
    //请求一普数据
    $.ajax({
        type:'GET',
        url:"data/datas/alldatas.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            datas=filter("MID",$(".wrapper>p span u").html(),datas);
            for(var o=0;o<12;o++){
                if(datas[o]){
                    $(".yp .img_list").append("<li><a href='data_details.html?id="+datas[o].FGUID+"'><img src='"+datas[o].FPICADDRESS+"' width='165px' height='120px'><p><span>"+datas[o].FCOLLECTIONCNAME+"</span></p></a></li>")
                }
            }

        }
    });
    //馆藏精品
    $.ajax({
        type:'GET',
        url:"data/museum/Mdetails_Collection.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            datas=filter("FMUSEUMID",id,datas);
            if(datas){
                $(".rt1>p a").attr("href","more_collection.html")
                for(var i=0;i<5;i++){
                    if(datas[i]){
                        $(".img_list1").append("<li><a href='appreciate_details.html?ID="+datas[i].FGUID+"'><img src='"+datas[i].FPICADDRESS+"' width='250px' height='170px'><p><u>"+datas[i].FCOLLECTIONCNAME+"</u></p></a></li>")
                    }
                }
            }
        }
    });
    //点击切换页签
    $(".lf1 ul li").on("click",function(){
        $(this).toggleClass("active").siblings().removeClass("active");
        var s=$(this).attr('data-items');
        $(s).css("display","block").siblings("div").css("display","none");
    })
    //点击更多博物馆动态
    $(".m1 p a").on("click",function(e){
        e.preventDefault()
        location.href="more_information.html?CLASS=博物馆动态&ly="+$(".wrapper>p span u").html();
    })
    //点击更多学术
    $(".m4 p a").on("click",function(e){
        e.preventDefault()
        location.href="more_information.html?CLASS=学术快讯&ly="+$(".wrapper>p span u").html();
    })
    //点更多馆藏精品
    $(".m6 p a").on("click",function(e){
        e.preventDefault()
        location.href="more_collection.html?gp1=全部&gp2=全部&gp3="+$(".wrapper>p span u").html()+"&gp4=全部&gp5=全部&kw=all&time=0&hot=0";
    })
    //点更多一普
    $(".wc p a").on("click",function(e){
        e.preventDefault()
        location.href="datas.html?gp1=全部&gp2=全部&gp3="+$(".wrapper>p span u").html()+"&gp4=全部&kw=all&time=0";
    })
    $(function(){
        var username=getCookie("name");
        var time=new Date();
        var peration="博物馆点击量";
        var FClollectionPic=$(".banner ul li").eq(0).find("img").attr("src");
        var FCollectionName=$(".wrapper h3").html();
        var result={
            "FIP":ip,
            "FCreatTime":time,
            "FOperation":peration,
            "FOperationPsn":username,
            "FKey":id,
            "FCollectionName":FCollectionName,
            "FClollectionPic":FClollectionPic
        }
        var result=JSON.stringify(result);
            $.ajax({
                type:'post',
                url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/UserClick.j",
                dataType:'JSONP',
                jsonp: "jsoncallback",
                jsonpCallback:"success_jsonpCallback",
                data:{"params":result},
                success:function(json){
                    success_jsonpCallback(json);
                }
            });
            function success_jsonpCallback(data){
            }
    });

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
    function getCookie(name){
        /* 获取浏览器所有cookie将其拆分成数组 */
        var arr=document.cookie.split('; ');
        for(var i=0;i<arr.length;i++)    {
            /* 将cookie名称和值拆分进行判断 */
            var arr2=arr[i].split('=');
            if(arr2[0]==name){
                return arr2[1];
            }
        }
        return '';
    }