$.ajax({
    type:'GET',
    url:"data/basecode.json",
    dataType:"text",
    async:false,
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("TYPE","文创",datas);
        for(var k in datas){
            if(datas[k].FCODETYPE=="FTYPE"){
                $("#gp1").append("<li><a href='' class='ly' target='_blank'>"+datas[k].FCODENAME+"</a></li>")
            }
        }
    }
})
//时间排序状态
var key4=decodeURI(location.search.split("&")[1].split("=")[1]);
if(key4==0){
    $(".bottom .year u").attr("class"," ");
}else{
    $(".bottom .year u").attr("class","sort1");
}
//点击量排序状态
var key5=decodeURI(location.search.split("&")[2].split("=")[1]);
$(".bottom .time u").attr("class"," ");
//关键字
var key6=decodeURI(location.search.split("&")[3].split("=")[1]);
$(function(){
    //点击搜索
    function search(key6) {
        var result={
            "FKeyName":key6
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/WinchanceProductQW.j",
            async:false,
            dataType:'JSONP',
            jsonp: "jsoncallback",
            jsonpCallback:"success_jsonpCallback",
            data:{"params":result},
            success:function(json){
                success_jsonpCallback(json);
            }
        });
        function success_jsonpCallback(data){
            datal=data["sql1"];
            total(datal);
        }
    }
    $.ajax({
        type:'GET',
        url:"data/artifact/artifact.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            if(key6!="all"){
                search(key6);
            }
            total(datas);
        }
    });
})

//显示数据总方法
function total(datas){
    //默认
    var kw=decodeURI(location.search.split("&")[0].split("=")[1]).toString();
    $(".top ul li a:contains("+kw+")").addClass("active").parent().siblings().find("a").removeClass("active");
    datas=filter("FTYPE",kw,datas);
    datas=px("时间",key4,datas);
    if(key5==1){
        datas=px("热度",key5,datas);
    }
    var limit=15;
    $(".pager").pager({
        pageIndex:0,
        pageSize:limit,
        itemCount:datas.length,
        maxButtonCount:5,
    });
    showData(datas,limit)
    //点击分类
    $(".top ul li a").on("click",function(e){
        e.preventDefault();
        location.search="?CLASS="+$(this).html()+"&time=0&hot=0&kw=all";
        var kw=decodeURI(location.search.split("&")[0].split("=")[1]).toString();
        $(".top ul li a:contains("+kw+")").addClass("active").parent().siblings().find("a").removeClass("active");
    })
}
//点击搜索
$(".search").on("click",function(){
    var keywords=$("#pn").val();
    if(keywords){
        window.open("artifact.html?CLASS=全部&time=0&hot=1&kw="+keywords,"_blank");
    }else{
        return
    }
})
//排序
function px(name,key,data){
    if(name=="时间"){
        if(key==0){
            data.sort(sort0("FCREATEDATE"));
        }else if(key==1){
            data.sort(sort1("FCREATEDATE"))
        }
    }else if(name=="热度"){
        if(key==1){
            data.sort(sort0("DJL"))
        }
    }

    return data
}
//点击切换排序状态
$(".bottom div").on("click",function(){
    var k=$(this).find("span").html();
    if(k=="时间"){
        var state=location.search.split("&")[1].split("=")[1];
        if(state==0){
            location.search=location.search.replace("time=0","time=1");
        }else{
            location.search=location.search.replace("time=1","time=0");
        }

    }else{
        var state=location.search.split("&")[2].split("=")[1];
        if(state==0){
            location.search=location.search.replace("hot=0","hot=1");
        }else{
            location.search=location.search.replace("hot=1","hot=0");
        }
    }
});
//显示数据方法
function showData(data,limit){
    $(".content ul li").html(" ");
    for(var i=0;i<limit;i++){
        if(data[i]){
            $(".content ul li").eq(i).append("<a target='_blank'><img src='' width='100%' height='100%'><p><span></span></p></a>")
            $(".content ul li").eq(i).find("a").attr("href","artifact_details.html?ID="+data[i].ID)
            $(".content ul li").eq(i).find("img").attr("src",data[i].FPRODUCTPIC1);
            $(".content ul li").eq(i).find("span").html(data[i].NAME);
        }

    }
    $(".pager").delegate("a[page]","click",function(e){
        var num=$(".pager .curPage").html()-1;
        $(".content ul li").html(" ");
        for(var i=0;i<limit;i++){
            if(data[i+num*limit]){
                $(".content ul li").eq(i).append("<a target='_blank'><img src='' width='100%' height='100%'><p><span></span></p></a>")
                $(".content ul li").eq(i).find("a").attr("href","artifact_details.html?ID="+data[i+num*limit].ID)
                $(".content ul li").eq(i).find("img").attr("src",data[i+num*limit].FPRODUCTPIC1);
                $(".content ul li").eq(i).find("span").html(data[i+num*limit].NAME);
            }
        }
    })
}
////升序
function sort0(propertyName) {
    return function (object1, object2) {
    if(propertyName=="FCREATEDATE"){
        var value1=object1[propertyName];
            value1=value1.split("-");
        var value1=new Date(parseInt(value1[0]),parseInt(value1[1]),parseInt(value1[2]));
        var value2=object2[propertyName];
        value2=value2.split("-");
        var value2=new Date(parseInt(value2[0]),parseInt(value2[1]),parseInt(value2[2]));
    }else {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
    }

        if (value2 < value1) {
            return -1;
        }
        else if (value2 > value1) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
//降序
function sort1(propertyName) {
    return function (object1, object2) {
        if(propertyName=="FCREATEDATE"){
            var value1=object1[propertyName];
            value1=value1.split("-");
            var value1=new Date(parseInt(value1[0]),parseInt(value1[1]),parseInt(value1[2]));
            var value2=object2[propertyName];
            value2=value2.split("-");
            var value2=new Date(parseInt(value2[0]),parseInt(value2[1]),parseInt(value2[2]));
        }else {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
        }

        if (value2 < value1) {
            return 1;
        }
        else if (value2 > value1) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
//过滤器
function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
        else if(val=="全部"){
            output=data;
        }
    }
    return output;
}