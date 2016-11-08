var id = location.search.split("=")[1];
if(id.length>32){
    id=id.substring(0,32);
}
$.ajax({
    type:'GET',
    url:"data/appreciate/treasure.json",
    dataType:"text",
    success:function(json) {
        var datas = eval("(" + json + ")");
        var data = filter("FGUID", id, datas)[0];
        $(".banner ul").append("<img src='" + data.FPICADDRESS + "' width='700px' height='524px'/>")
        $(".wrapper>p u").html(data.FCOLLECTIONCNAME);
        $(".section1>h3").html(data.FCOLLECTIONCNAME);
        $(".msg>h4").html(data.FCOLLECTIONCNAME);
        $(".msg_box tr:first-child td:nth-child(1) span").html(data.FYEAR);
        $(".msg_box tr:first-child td:nth-child(2) span").html(data.FCOLLECTIONTYPE);
        $(".msg_box tr:nth-child(2) td:nth-child(1) span").html(data.FCOLLECTIONLEVEL);
        $(".msg_box tr:nth-child(2) td:nth-child(2) span").html(data.MID);
        $(".msg_box tr:nth-child(3) td:nth-child(1) span").html(data.FSIZE);
        $(".brief_content").html(data.FCOLLECT);
        $(".msg a").attr("href",data.FUPCONTENT);
        //点击分享
        var text=$(".brief_content").html().substring(0,100);
        $(".share").on("mouseover",function(){
            $(".bdsharebuttonbox").show();
            window._bd_share_config = {
                common : {
                    bdText :data.FCOLLECTIONCNAME,
                    bdDesc :text,
                    bdUrl :"http://123.56.50.236:40/jilinsheng/appreciate_details.html?ID="+id
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
$.ajax({
    type:'GET',
    url:"data/appreciate/treasure_Like.json",
    dataType:"text",
    success:function(json){
        var datas=eval(json);
        var data = filter("FGUID", id, datas);
        for(var k=0;k<7;k++){
            if(data[k]){
                var a=$(".hot ul");
                a.append("<li><a href=''><img src='' alt=''></a><div><h5></h5><p></p></div></li>")
                $(".hot ul li").eq(k).find("img").attr("src",data[k].FPICADDRESS)
                var b=$(".hot ul li").eq(k);
                b.find("a").attr("href","appreciate_details.html?ID="+data[k].XSID);
                b.find("img").attr("width","130px").attr("height","100px");
                b.find("div h5").html(data[k].FCOLLECTIONCNAME);
                b.find("div p").html(data[k].MID);
            }

        }
    }

});
$(function(){
    var username=getCookie("name");
    var time=new Date();
    var peration="藏品点击量";
    var result={
        "FIP":ip,
        "FCreatTime":time,
        "FOperation":peration,
        "FOperationPsn":username,
        "FKey":id,
        "FClollectionPic":$(".banner ul").find("img").attr("src"),
        "FCollectionName":$(".section1>h3").html()
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
    //点击收藏
    $(".collect").on("click",function(){
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var FCreateDate=new Date();
        var FCollectionType="藏品点收藏";
        var FCollectionID=id;
        var FClollectionPic=$(".banner ul").find("img").attr("src");
        var FCollectionName=$(".section1>h3").html();
        var result={
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
                    var limit=4;
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
                            $(".evaluate_list").append("<li><table><tr><td><span>"+data[i].FUSERNAME+"</span>:</td><td></td><td>时间：<span>"+data[i].FCOMMENTTIME+"</span></td><td><u></u>(<span>"+data[i].FDZ+"</span>)</td></tr><tr><td></td><td><p>"+data[i].FCOMMENTCONTENT+"</p></td></tr></table></li>")
                        }
                    }
                    $(".pager").delegate("a[page]","click",function(){
                        var num=$(".pager .curPage").html()-1;
                        $(".evaluate_list").html(" ");
                        for(var i=0;i<limit;i++){
                            if(data[i]) {
                                if(data[i+num*limit]){
                                    $(".evaluate_list").append("<li><table><tr><td><span>"+data[i+num*limit].FUSERNAME+"</span>:</td><td></td><td>时间：<span>"+data[i+num*limit].FCOMMENTTIME+"</span></td><td><u></u>(<span>"+data[i+num*limit].FDZ+"</span>)</td></tr><tr><td></td><td><p>"+data[i+num*limit].FCOMMENTCONTENT+"</p></td></tr></table></li>")
                                }
                            }
                        }
                    })
                }
            }
        });

    }
    getmsg()

    //post发送的数据评论
    $(".pbtn").on('click',function(e){
        e.preventDefault()
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var pmsg=$("#msgcontent").val();
        if(pmsg==""){
            layer.alert("内容不能为空！",{icon:2});
            return;
        }
        var time=new Date();
        var result={
            "MID":id,
            "msg":pmsg,
            "time":time,
            "username":FUserName
        };
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/collectionComment.j",
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

    })
});
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