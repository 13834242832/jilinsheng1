var id=location.search.split("=")[1];
if(id.length>32){
    id=id.substring(0,32);
}
$.ajax({
    type:'GET',
    url:"data/digitization/banner_3dM.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("FGUID",id,datas)[0];
            var a=$(".banner ul");
            a.append("<li><img src='"+datas.FPICADDRESS+"' height='418px' width='700px' alt=''></li>")
        var unslider05 = $('#b05').unslider({
                dots: true
            }),
            data05 = unslider05.data('unslider');

    }
});
$.ajax({
    type:'GET',
    url:"data/digitization/popular.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("FGUID",id,datas);
        for(var k in datas){
            $(".wrapper p>u").html(datas[k].FNAME);
            $(".msg>h4").html(datas[k].FNAME);
            $("#msg").html(datas[k].FSTYLE);
            $(".brief_content").html(datas[k].FBRIEF);
            if(datas[k].FUPCONTENT){
                $(".grade_box a").attr("href",datas[k].FUPCONTENT);
            }
            $(".zhpf span").html(datas[k].PCOMMENT)
            //该馆的评分
            $(".grade").html(datas[k].FSCORE);
            $(".zh").raty({
                path:"img/digitization/details",
                starOff: 'star_b_off.png',
                starOn: 'star_b_on.png',
                starHalf:'star_b_half.png',
                readOnly:true,
                half:true,
                round: { down: .3, up: .76 },
                halfShow: true,
                score:datas[k].FSCORE
            })
            $(".qw1").html(datas[k].FINTERESTING);
            $(".inte").raty({
                path:"img/digitization/details",
                starOff: 'star_s_off.png',
                starOn: 'star_s_on.png',
                readOnly:true,
                half:true,
                starHalf :'star_s_half.png',
                round: { down: .29},
                halfShow: true,
                score:datas[k].FINTERESTING
            })
            $(".jy1").html(datas[k].FEDUCATION);
            $(".edu").raty({
                path:"img/digitization/details",
                starOff: 'star_s_off.png',
                starOn: 'star_s_on.png',
                starHalf: 'star_s_half.png',
                readOnly:true,
                half:true,
                round: { down: .29},
                halfShow: true,
                score:datas[k].FEDUCATION
            })
            $(".hd1").html(datas[k].FINTERACTION);
            $(".move").raty({
                path:"img/digitization/details",
                starOff: 'star_s_off.png',
                starOn: 'star_s_on.png',
                starHalf: 'star_s_half.png',
                readOnly:true,
                half:true,
                round: { down: .29},
                halfShow: true,
                score:datas[k].FINTERACTION
            })
            //点击分享
            var text=$(".brief_content").html().substring(0,100);
            $(".share").on("mouseover",function(){
                $(".bdsharebuttonbox").show();
                window._bd_share_config = {
                    common : {
                        bdText :datas[k].FNAME,
                        bdDesc :text,
                        bdUrl :"http://123.56.50.236:40/jilinsheng/digitization_details.html?ID="+id
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

    }
});
$.ajax({
    type:'GET',
    url:"data/digitization/hot_3dM.json",
    dataType:"text",
    success:function(json){
        var datas=eval(json);
        var data=datas.slice(0,7);
        for(var k in data){
            var a=$(".hot ul");
            a.append("<li><a href=''><img src='"+data[k].FPIC+"' alt=''></a><div><h5></h5><h6>"+data[k].FSTYLE+"</h6><p><span></span></p></div></li>")
            var b=$(".hot ul li").eq(k);
            b.find("a").attr("href","digitization_details.html?ID="+data[k].FGUID);
            b.find("img").attr("width","130px").attr("height","100px");
            b.find("div h5").html(data[k].FNAME);
            b.find("div p").html("评分：<span>"+data[k].FPM+"</span>");
        }
    }

});

//////////////////
$(".zt").raty({
    path:"img/digitization/details",
    starOff: 'star_m_off.png',
    starOn: 'star_m_on.png',
    click:function(score){
        $("#zt").val(score);
    }

})
$(".qw").raty({
    path:"img/digitization/details",
    starOff: 'star_m_off.png',
    starOn: 'star_m_on.png',
    click:function(score){
        $("#qw").val(score);
    }

})
$(".hd").raty({
    path:"img/digitization/details",
    starOff: 'star_m_off.png',
    starOn: 'star_m_on.png',
    click:function(score){
        $("#hd").val(score);
    }

})
$(".jy").raty({
    path:"img/digitization/details",
    starOff: 'star_m_off.png',
    starOn: 'star_m_on.png',
    click:function(score){
        $("#jy").val(score);
    }
})



//已看过
$("[data-drop]").on("click",function(){
    var n=$(this).attr("data-drop");
    if(n==0){
        $(this).attr('data-drop',"1");
        $(".evaluate").slideDown()
    }else{
        $(this).attr('data-drop',"0");
        $(".evaluate").slideUp()
    }

})
//想去看
$("[data-add]").on("click",function(){
    $(this).find('u').toggleClass("clicked");
    var n=$(this).attr("data-add");
    var s=parseInt($(this).find('i').html());
    if(n==0){
        $(this).attr("data-add",'1');
        $(this).find('i').html(s+1);
    }else{
        $(this).attr("data-add",'0');
        $(this).find('i').html(s-1);
    }
})
$(function(){

    var username=getCookie("name");
    var time=new Date();
    var peration="数字博物馆点击量";
    var result={
        "FIP":ip,
        "FCreatTime":time,
        "FOperation":peration,
        "FOperationPsn":username,
        "FKey":id,
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
    //post发送的数据评论
    $("#sub").on('click',function(){
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var zt=$("#zt").val();
        var qw=$("#qw").val();
        var hd=$("#hd").val();
        var jy=$("#jy").val();
        var time=new Date();
        var pmsg=$("#pmsg").val();
        if(pmsg==""){
            layer.alert("内容不能为空！",{icon:2});
            return;
        }
        var result={
            "zt":zt,
            "qw":qw,
            "hd":hd,
            "jy":jy,
            "msg":pmsg,
            "MID":id,
            "time":time,
            "username":FUserName
        };
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/comment.j",
            dataType:'JSONP',
            jsonp: "jsoncallback",
            jsonpCallback:"success_jsonpCallback",
            data:{"params":result},
            success:function(json){
                success_jsonpCallback(json);
            }
        });
        function success_jsonpCallback(data){
            if(data.state=="success"){
                layer.alert(""+data.message,{icon:1},function(){
                    location.reload();
                })
            }
        }
        // location.reload()
    });
    //点击收藏
    $(".collect").on("click",function(){
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var FCreateDate=new Date();
        var FCollectionType="数字博物馆点收藏";
        var FCollectionID=id;
        var FClollectionPic=$(".banner ul li").eq(0).find("img").attr("src");
        var FCollectionName=$(".wrapper>p u").html();
        var result={
            "FCollectionType":FCollectionType,
            "FCreateDate":FCreateDate,
            "FUserName":FUserName,
            "FCollectionID":FCollectionID,
            "FClollectionPic":FClollectionPic,
            "FCollectionName":FCollectionName
        }
        result=JSON.stringify(result);
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
    });
    //评论的数据
    function getmsg(){
        var result={
            "MID":id
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/getComment.j",
            dataType:'JSONP',
            jsonp: "jsoncallback",
            jsonpCallback:"success",
            data:{"params":result},
            success:function(json){
                success(json);
                function success(data){
                    data=data["sql1"];
                    var limit=3;
                    var len=data.length;
                    $(".part2>p>span u").html(len);
                    $(".pager").pager({
                        pageIndex:0,
                        pageSize:limit,
                        itemCount:len,
                        maxButtonCount:4,
                    });
                    for(var i=0;i<limit;i++){
                        if(data[i]){
                            $(".evaluate_list").append("<li><table><tr><td>"+data[i].FUSERNAME+"</td><td class='user"+i+"'></td><td>趣味：<span>"+data[i].FINTERESTING+"</span></td><td>互助：<span>"+data[i].FINTERACTION+"</span></td><td>教育：<span>"+data[i].FEDUCATION+"</span></td><td>时间：<span>"+data[i].FCOMMENTTIME+"</span></td><td><u></u>(<span>"+data[i].FDZ+"</span>)</td></tr><tr><td></td><td colspan='6'><p>"+data[i].FCOMMENTCONTENT+"</p></td></tr></table></li>")
                            $(".user"+i).raty({
                                path:"img/digitization/details",
                                starOff: 'star_m_off.png',
                                starOn: 'star_m_on.png',
                                starHalf: 'star_m_half.png',
                                readOnly:true,
                                half:true,
                                round: { down: .29},
                                halfShow: true,
                                score:data[i].FSCORE
                            });
                        }
                    }
                    $(".pager").delegate("a[page]","click",function(){
                        var num=$(".pager .curPage").html()-1;
                        $(".evaluate_list").html(" ");

                        for(var i=0;i<limit;i++){
                            if(data[i]) {
                                if(data[i+num*limit]){
                                    $(".evaluate_list").append("<li><table><tr><td>"+data[i+num*limit].FUSERNAME+"</td><td class='user"+i+"'></td><td>趣味：<span>"+data[i+num*limit].FINTERESTING+"</span></td><td>互助：<span>"+data[i+num*limit].FINTERACTION+"</span></td><td>教育：<span>"+data[i+num*limit].FEDUCATION+"</span></td><td>时间：<span>"+data[i+num*limit].FCOMMENTTIME+"</span></td><td><u></u>(<span>"+data[i+num*limit].FDZ+"</span>)</td></tr><tr><td></td><td colspan='6'><p>"+data[i+num*limit].FCOMMENTCONTENT+"</p></td></tr></table></li>")
                                    $(".user"+i).raty({
                                        path:"img/digitization/details",
                                        starOff: 'star_m_off.png',
                                        starOn: 'star_m_on.png',
                                        starHalf: 'star_m_half.png',
                                        readOnly:true,
                                        half:true,
                                        round: { down: .29},
                                        halfShow: true,
                                        score:data[i+num*limit].FSCORE
                                    });
                                }
                            }
                        }
                    })
                }
            }
        });

    }
    getmsg()

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