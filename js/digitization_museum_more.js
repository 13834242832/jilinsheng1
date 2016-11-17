$.ajax({
    type:'GET',
    url:"data/basecode.json",
    dataType:"text",
    async:false,
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("TYPE","数字博物馆",datas);
        for(var k in datas){
            if(datas[k].FCODETYPE=="FMUSEUMID"){
                $("#gp1").append("<li><a href='' class='ly'>"+datas[k].FCODENAME+"</a></li>")
            }
            else if(datas[k].FCODETYPE=="FSTYLE"){
                 $("#gp2").append("<li><a href='' class='lx'>"+datas[k].FCODENAME+"</a></li>")
            }
        }
    }
})
$(function(){
    //点击搜索
    function search(key6) {
        //按来源
        var key1=decodeURI(location.search.split("&")[0].split("=")[1]);
        $(".group0 ul li a:contains("+key1+")").addClass("active").parent().siblings().find("a").removeClass("active");
        //按类型
        var key2=decodeURI(location.search.split("&")[1].split("=")[1]);
        $(".group1 ul li a:contains("+key2+")").addClass("active").parent().siblings().find("a").removeClass("active");
        //时间排序状态
        var key4=decodeURI(location.search.split("&")[3].split("=")[1]);
        if(key4==0){
            $(".bottom .time u").attr("class"," ");
        }else{
            $(".bottom .time u").attr("class","sort1");
        }
        //点击量排序状态
        var key5=decodeURI(location.search.split("&")[4].split("=")[1]);
        //关键字
        var key6=decodeURI(location.search.split("&")[2].split("=")[1]);
        var result={
            "FKeyName":key6
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/VRMuseumQW.j",
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
            showData(datal,key1,key2,key4,key5);
        }
    }
    //按来源
    var key1=decodeURI(location.search.split("&")[0].split("=")[1]);
    $(".group0 ul li a:contains("+key1+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按类型
    var key2=decodeURI(location.search.split("&")[1].split("=")[1]);
    $(".group1 ul li a:contains("+key2+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //时间排序状态
    var key4=decodeURI(location.search.split("&")[3].split("=")[1]);
    if(key4==0){
        $(".bottom .time u").attr("class"," ");
    }else{
        $(".bottom .time u").attr("class","sort1");
    }
    //点击量排序状态
    var key5=decodeURI(location.search.split("&")[4].split("=")[1]);
    //关键字
    var key6=decodeURI(location.search.split("&")[2].split("=")[1]);
    $(".bottom .year u").attr("class"," ");
    $.ajax({
        type:'GET',
        url:"data/digitization/popular.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            if(key6!="all"&&key6!=''){
                search(key6);
            }
            showData(datas,key1,key2,key4,key5);
        }
    });
//
    var k1=$(".group0 ul li a.active").html();
    var k2=$(".group1 ul li a.active").html();
    $(".clas-content li a").on("click",function(e){
        e.preventDefault();
        if($(this).hasClass("ly")){
            k1=$(this).html();
        }
        if($(this).hasClass("lx")){
            k2=$(this).html();
        }
        location.search="?group1="+k1+"&group2="+k2+"&key=all&time=0&hot=0";
    });
/////////////
    $(".more").on("click",function(){
        $(this).prev().toggleClass("auto");
        $(this).find('span').toggleClass("btn")
    });
    //点击搜索
    $("#btnsearch").on("click",function(){
        var keywords=$(this).prev().val();
        if(keywords){
            window.open("digitization_museum_more.html?group1=全部&group2=全部&key="+keywords+"&time=0&hot=0","_blank");
        }else{
            return
        }
    })
    //点击排序切换排序状态
    $(".bottom div").on("click",function(){
        var k=$(this).find("span").html();
        if(k=="时间"){
            var state=location.search.split("&")[3].split("=")[1];
            if(state==0){
                location.search=location.search.replace("time=0","time=1");
            }else{
                location.search=location.search.replace("time=1","time=0");
            }

        }else if(k=="热度"){
            var state=location.search.split("&")[4].split("=")[1];
            if(state==0){
                location.search=location.search.replace("hot=0","hot=1");
            }else{
                location.search=location.search.replace("hot=1","hot=0");
            }
        }
    });
})
//显示数据
function showData(datas,key1,key2,key4,key5){
    var limit=18;
    datas=select(key1,key2,datas);
    datas=px("时间",key4,datas);
    if(key5==1){
        datas=px("热度",key5,datas);
    }
    var len=datas.length;
    $(".modultop>p span").html(len);
    if(len==0){
        $('.pager').hide();
    }else{
        $(".pager").pager({
            pageIndex:0,
            pageSize:limit,
            itemCount:len,
            maxButtonCount:5
        });
    }
    $(".content ul").html(" ");
    for(var i=0;i<limit;i++){
        var a=$(".content ul");
        if(datas[i]) {
            a.append("<li><a href='digitization_details.html?ID=" + datas[i].FGUID + "'><img src='" + datas[i].FPIC + "' width='208px' height='154px'><p><span>" + datas[i].FNAME + "</span></p></a></li>")
        }
    }
    $(".pager").delegate("a[page]","click",function(){
        var num=$(".pager .curPage").html()-1;
        $(".content ul").html(" ");
        for(var i=0;i<limit;i++){
            if(datas[i+num*limit]){
                var a=$(".content ul");
                a.append("<li><a href='digitization_details.html?ID="+datas[i+num*limit].FGUID+"'><img src='"+datas[i+num*limit].FPIC+"' width='208px' height='154px'><p><span>"+datas[i+num*limit].FNAME+"</span></p></a></li>")
            }

        }
    })
}
//排序方法
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
            var value1 = parseInt(object1[propertyName]);
            var value2 = parseInt(object2[propertyName]);
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
            var value1 = parseInt(object1[propertyName]);
            var value2 = parseInt(object2[propertyName]);
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
function select(key1,key2,datas){
    var data=filter("FMUSEUMID",key1,datas);
    data=filter("FSTYLE",key2,data);
    return data;
}