var id=location.search.split("=")[1];
if(id.length>32){
    id=id.substring(0,32);
}
$.ajax({
    type:'GET',
    url:"data/artifact/artifact.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        var data=filter("ID",id,datas)[0];
        for(var i=0;i<4;i++){
            if(data["FPRODUCTPIC"+(i+1)]){
                $("#b05 ul").append("<li><img src=''height='455px' width='631px'></li>")
                $("#b05 ul li").find("img").attr("src",data["FPRODUCTPIC"+(i+1)])
            }
        }
        $('#b05').unslider({
            speed: 600,
            dots: true,
        })
        $(".title h3").html(data.NAME);
        $("table tbody tr:first-child td:nth-child(2)").html(data.FMATERIAL);
        $("table tbody tr:first-child td:nth-child(4)").html(data.FTYPE);
        $("table tbody tr:nth-child(2) td:nth-child(2) span").html(data.FPRODUCTPRICE);
        $("table tbody tr:nth-child(2) td:nth-child(4)").html(data.FSIZE);
        $("table tbody tr:nth-child(3) td:nth-child(2)").html(data.LY);
        $(".txt >p").html(data.FPRODUCTBRIEF);
        //点击分享
        var text=$(".txt >p").html().substring(0,20);
        $(".share").on("mouseover",function(){
            $(".bdsharebuttonbox").show();
            window._bd_share_config = {
                common : {
                    bdText :data.FNAME,
                    bdDesc :text,
                    bdUrl :"http://123.56.50.236:40/jilinsheng/artifact_details.html?ID="+id
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
        });
        //点击收藏
        $(".collect").on("click",function(){
            var FUserName=getCookie("name");
            if(FUserName==""){
                layer.alert("请先登录！",{icon:2});
                return;
            }
            var FCreateDate=new Date();
            var FCollectionType="文创点收藏";
            var FCollectionID=id;
            var FClollectionPic=$(".banner ul li").eq(0).find("img").attr("src");
            var FCollectionName=$(".title h3").html();
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
        })

    }
});
$(function(){
    var username=getCookie("name");
    var time=new Date();
    var peration="文创点击量";
    var result={
        "FIP":ip,
        "FCreatTime":time,
        "FOperation":peration,
        "FOperationPsn":username,
        "FKey":id
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