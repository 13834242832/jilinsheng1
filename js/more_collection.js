$.ajax({
    type:'GET',
    url:"data/basecode.json",
    dataType:"text",
    async:false,
    success:function(json){
        var datas=eval(json);
        datas=filter("TYPE","更多藏品",datas);
        for(var k in datas){
            if(datas[k].FCODETYPE=="FCollectionType"){
                $("#gp1").append("<li><a href='' class='fl'>"+datas[k].FCODENAME+"</a></li>")
            }
            else if(datas[k].FCODETYPE=="FCollectionStory"){
                $("#gp2").append("<li><a href='' class='nd'>"+datas[k].FCODENAME+"</a></li>")
            }else if(datas[k].FCODETYPE=="FCollectioner"){
                $("#gp3").append("<li><a href='' class='dw'>"+datas[k].FCODENAME+"</a></li>")
            }else if(datas[k].FCODETYPE=="FCollectionLevel"){
                $("#gp4").append("<li><a href='' class='jb'>"+datas[k].FCODENAME+"</a></li>")
            }
        }

    }
});
$(".more").on("click",function(){
    $(this).parent().toggleClass("auto");
    $(this).find('span').toggleClass("btn")
});
$(function(){
    //获取页面的传值
    //按分类
    var key1=decodeURI(location.search.split("&")[0].split("=")[1]);
    $(".group0 ul li a:contains("+key1+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按年代
    var key2=decodeURI(location.search.split("&")[1].split("=")[1]);
    $(".group1 ul li a:contains("+key2+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //按收藏单位
    var key3=decodeURI(location.search.split("&")[2].split("=")[1]);
    $(".group2 ul li a:contains("+key3+")").addClass("active").parent().siblings().find("a").removeClass("active");
    var key4=decodeURI(location.search.split("&")[3].split("=")[1]);
    $(".group3 ul li a:contains("+key4+")").addClass("active").parent().siblings().find("a").removeClass("active");
    var key5=decodeURI(location.search.split("&")[4].split("=")[1]);
    $(".group4 ul li a:contains("+key5+")").addClass("active").parent().siblings().find("a").removeClass("active");
    //搜索关键字
    var key6=decodeURI(location.search.split("&")[5].split("=")[1]);
    //按时间排序状态
    var key7=decodeURI(location.search.split("&")[6].split("=")[1]);
    if(key7==0){
        $(".bottom .time u").attr("class"," ");
    }else{
        $(".bottom .time u").attr("class","sort1");
    }
    //按热度排序状态
    var key8=decodeURI(location.search.split("&")[7].split("=")[1]);
    $(".bottom .year u").attr("class"," ");
    //点击搜索
    function search(key6) {
        var result={
            "FKeyName":key6
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/treasureQW.j",
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
            console.log(data);
            showData(datal);
        }
    }
    $.ajax({
        type:'GET',
        url:"data/appreciate/treasure.json",
        dataType:"text",
        async:false,
        success:function(json){
            var datas=eval("("+json+")");
            if(key6!="all"){
                search(key6);
            }
            showData(datas);
        }
    });
    //页面传递查询条件
    var k1=$(".group0 ul li a.active").html();
    var k2=$(".group1 ul li a.active").html();
    var k3=$(".group2 ul li a.active").html();
    var k4=$(".group3 ul li a.active").html();
    var k5=$(".group4 ul li a.active").html();
    $(".clas-content li a").on("click",function(e){
        e.preventDefault();
        if($(this).hasClass("fl")){
            k1=$(this).html();
        }
        if($(this).hasClass("nd")){
            k2=$(this).html();
        }
        if($(this).hasClass("dw")){
            k3=$(this).html();
        }
        if($(this).hasClass("jb")){
            k4=$(this).html();
        }if($(this).hasClass("xs")){
            k5=$(this).html();
        }
        location.search="?gp1="+k1+"&gp2="+k2+"&gp3="+k3+"&gp4="+k4+"&gp5="+k5+"&key=all&time=0&hot=0";
    });
    //点击排序切换排序状态
    $(".bottom div").on("click",function(){
        var k=$(this).find("span").html();
        if(k=="时间"){
            console.log(k);
            var state=location.search.split("&")[6].split("=")[1];
            if(state==0){
                location.search=location.search.replace("time=0","time=1");
            }else{
                location.search=location.search.replace("time=1","time=0");
            }

        }else if(k=="热度"){
            var state=location.search.split("&")[7].split("=")[1];
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
            window.open("more_collection.html?gp1=全部&gp2=全部&gp3=全部&gp4=全部&gp5=全部&kw="+keywords+"&time=0&hot=0","_blank");
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
        }

        return data
    }
    //显示数据
    function showData(datas){
        datas=select(key1,key2,key3,key4,key5,datas);
        datas=px("时间",key7,datas);
        if(key8==1){
            datas=px("热度",key8,datas);
        }
        var limit=18;
        var len=datas.length;
        $(".modultop>p span").html(len);
        $(".pager").pager({
            pageIndex:0,
            pageSize:limit,
            itemCount:len,
            maxButtonCount:4,
        });
        $(".img_list").html(" ")
        for(var i=0;i<limit;i++){
            if(datas[i]) {
                if(datas[i]) {
                    $(".img_list").append("<li><a href='appreciate_details.html?ID="+datas[i].FGUID+"'><img src='"+datas[i].FPICADDRESS+"' width='207px' height='152px' alt=''><p><span>"+datas[i].FCOLLECTIONCNAME+"</span></p></a></li>")
                }
            }
        }
        $(".pager").delegate("a[page]","click",function(){
            var num=$(".pager .curPage").html()-1;
            $(".img_list").html(" ")
            for(var i=0;i<limit;i++){
                if(datas[i]) {
                    if(datas[i+num*limit]){
                        $(".img_list").append("<li><a href='appreciate_details.html?ID="+datas[i+num*limit].FGUID+"'><img src='"+datas[i+num*limit].FPICADDRESS+"' width='207px' height='152px' alt=''><p><span>"+datas[i+num*limit].FCOLLECTIONCNAME+"</span></p></a></li>")
                    }
                }
            }
        })
    }
//多条件查询
    function select(key1,key2,key3,key4,key5,datas){
        var data=filter("FCOLLECTIONTYPE",key1,datas);
        data=filter("FCOLLECTIONSTORY",key2,data);
        data=filter("MID",key3,data);
        data=filter("FCOLLECTIONLEVEL",key4,data);
        data=filter("ZXXS",key5,data);
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
    //post发送的数据评论
    $(".pbtn").on('click',function(){
        var FUserName=getCookie("name");
        if(FUserName==""){
            layer.alert("请先登录！",{icon:2});
            return;
        }
        var time=new Date();
        var pmsg=$("#pmsg").val();
        var result={
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
            console.log(data);
        }
    });
})
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