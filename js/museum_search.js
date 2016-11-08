var datal;
$.ajax({
    type:'GET',
    url:"data/basecode.json",
    dataType:"text",
    async:false,
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("TYPE","博物馆一览",datas);
        for(var k in datas){
            if(datas[k].FCODETYPE=="FPROVINCE"){
                $("#gp1").append("<li><a href='' class='dq'>"+datas[k].FCODENAME+"</a></li>")
            }
            else if(datas[k].FCODETYPE=="FMLEVEL"){
                $("#gp2").append("<li><a href='' class='jb'>"+datas[k].FCODENAME+"</a></li>")
            }
            else{
                $("#gp3").append("<li><a href='' class='lb'>"+datas[k].FCODENAME+"</a></li>")
            }
        }

    }
})

$(function(){
    //点击搜索
    function search(key6) {
        var result={
            "FKeyName":key6
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/MuseumQW.j",
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
            showData(datal);
        }
    }
    //获取页面的传值
    //按地区
    var key1=decodeURI(location.search.split("&")[0].split("=")[1]);
    $(".group0 ul li a:contains("+key1+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按级别
    var key2=decodeURI(location.search.split("&")[1].split("=")[1]);
    $(".group1 ul li a:contains("+key2+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按类型
    var key3=decodeURI(location.search.split("&")[2].split("=")[1]);
    $(".group2 ul li a:contains("+key3+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按时间排序状态
    var key4=decodeURI(location.search.split("&")[4].split("=")[1]);
    if(key4==0){
        $(".bottom .time u").attr("class"," ");
    }else{
        $(".bottom .time u").attr("class","sort1");
    }
    //按热度排序状态
    var key5=decodeURI(location.search.split("&")[5].split("=")[1]);
        $(".bottom .year u").attr("class"," ");
    //关键字
    var key6=decodeURI(location.search.split("&")[3].split("=")[1]);
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/Mdetails_ALL.j",
        dataType:'JSONP',
        cache:true,
        async:false,
        jsonp: "jsoncallback",
        jsonpCallback:"success_jsonpCallback",
        success:function(json){
            success_jsonpCallback(json);
            function success_jsonpCallback(datas){
                datas=datas["sql2"];
                if(key6!="all"){
                    search(key6);
                }
                showData(datas);
            }
        }
    });
//页面传递查询条件
    var k1=$(".group0 ul li a.active").html();
    var k2=$(".group1 ul li a.active").html();
    var k3=$(".group2 ul li a.active").html();
    $(".clas-content li a").on("click",function(e){
        e.preventDefault();
        if($(this).hasClass("dq")){
            k1=$(this).html();
        }
        if($(this).hasClass("jb")){
            k2=$(this).html();
        }
        if($(this).hasClass("lb")){
            k3=$(this).html();
        }
        location.search="?gp1="+k1+"&gp2="+k2+"&gp3="+k3+"&key=all&time=0&hot=0";
    });
//点击排序切换排序状态
    $(".bottom div").on("click",function(){
        var k=$(this).find("span").html();
        if(k=="时间"){
            var state=location.search.split("&")[4].split("=")[1];
            if(state==0){
                location.search=location.search.replace("time=0","time=1");
            }else{
                location.search=location.search.replace("time=1","time=0");
            }

        }else if(k=="热度"){
            var state=location.search.split("&")[5].split("=")[1];
            if(state==0){
                location.search=location.search.replace("hot=0","hot=1");
            }else{
                location.search=location.search.replace("hot=1","hot=0");
            }
        }
    });
//点击搜索
    $(".search").on("click",function(){
        var keywords=$(this).prev().val();
        if(keywords){
            window.open("museum_search.html?gp1=全部&gp2=全部&gp3=全部&key="+keywords+"&time=0&hot=0","_blank")
        }else{
            return
        }
    })
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
        }else if(name=="级别"){
            if(key==3){
                data.sort(sort1("NUM"));
            }

        }

        return data
    }
    //显示数据
    function showData(datas){
        var limit=18;
        datas=select(key1,key2,key3,datas);
        datas=px("时间",key4,datas);
        if(key5==1){
            datas=px("热度",key5,datas);
        }
        datas=px("级别","3",datas);
        $(".modultop>p span").html(datas.length)
        $(".pager").pager({
            pageIndex:0,
            pageSize:limit,
            itemCount:datas.length,
            maxButtonCount:5
        });
        $("[data-treasure]").html(" ");
        for(var k in datas){
            if(datas[k]){
                var a=$("[data-treasure="+k+"]").append("<a href=''><img src=''  alt=''><p><span></span></p></a>");
                a.find('a').attr("href","museum_details.html?ID="+datas[k].MID).attr("target","_blank");
                a.find("img").attr("src",datas[k].PICPHOTO1).attr("width","207px").attr("height","152px");
                a.find("span").html(datas[k].FMUSEUMNAME);
            }
        }
        $(".pager").delegate("a[page]","click",function(){
            var num=$(".pager .curPage").html()-1;
            $("[data-treasure]").html(" ");
            for(var i=0;i<limit;i++){
                if(datas[i+num*limit]){
                    var a=$("[data-treasure="+i+"]").append("<a href=''><img src=''  alt=''><p><span></span></p></a>");;
                    a.find('a').attr("href","museum_details.html?ID="+datas[i+num*limit].MID).attr("target","_blank");
                    a.find("img").attr("src",datas[i+num*limit].PICPHOTO1).attr("width","207px").attr("height","152px");
                    a.find("span").html(datas[i+num*limit].FMUSEUMNAME);
                }
            }
        })
    }
//多条件查询
    function select(key1,key2,key3,datas){
        var data=filter("FPROVINCE",key1,datas);
        data=filter("FMLEVEL",key2,data);
        key3=key3.replace(" ",'');
        data=filter("FMTYPE",key3,data);
        return data;
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
    $(".more").on("click",function(){
        $(this).prev().toggleClass("auto");
        $(this).find('span').toggleClass("btn")
    });
})
//数据过滤
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