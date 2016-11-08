var id=location.search.split("=")[1];
function getuserinfo(){
    laydate({
        elem: '#date',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        isclear: true //是否显示清空
    });
    var FUserName=getCookie("name");
    if(FUserName==""){
        layer.alert("请先登录！",{icon:2},function () {
            location.href="index_login.html";
        });
        return;
    }
    var result={
        "FUserName":FUserName
    }
    var result=JSON.stringify(result);
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/pesoninfo.j",
        dataType:'JSONP',
        jsonp: "jsoncallback",
        jsonpCallback:"success_jsonpCallback",
        data:{"params":result},
        success:function(json){
            success_jsonpCallback(json);
            function success_jsonpCallback(datas){
                //基本信息
                $(".sname").html(datas["sql1"][0].FWEBUSERNAME);
                $(".usermail").html(datas["sql1"][0].EMAIL);
                $(".realname").html(datas["sql1"][0].FNAME);
                $(".birthday").html(datas["sql1"][0].FBIRTHDATE);
                $(".job").html(datas["sql1"][0].FPROFESSION);
                $(".idnum").html(datas["sql1"][0].FIDCARD);
                $(".sex").html(datas["sql1"][0].FSEX);
                $(".label1").html(datas["sql1"][0].FLABLE);
                $("input[name='sname']").val($(".sname").html());
                $("input[name='usermail']").val($(".usermail").html());
                $("input[name='realname']").val($(".realname").html());
                $("input[name='birthday']").val($(".birthday").html());
                $("input[name='job']").val($(".job").html());
                $("input[name='idnum']").val($(".idnum").html());
                //编辑我的信息
                $(".userbase_xg_btn").on("click",function(){
                    var sname=$("input[name='sname']").val();
                    var realname=$("input[name='realname']").val();
                    var birthday=$("input[name='birthday']").val();
                    var job=$("input[name='job']").val();
                    var sex=$("input:radio:checked").val();
                    var label=$("select option:selected").val();
                    var idnum=$("input[name='idnum']").val();
                    var result={
                        "FWEBUSERNAME":sname,
                        "FNAME":realname,
                        "FBIRTHDATE":birthday,
                        "JOB":job,
                        "ID":idnum,
                        "FSEX":sex,
                        "FLABLE":label
                    }
                    var result=JSON.stringify(result);
                    $.ajax({
                        type:'post',
                        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/modifyPersoninfo.j",
                        dataType:'JSONP',
                        jsonp:"jsoncallback",
                        jsonpCallback:"success_jsonpCallback",
                        data:{"params":result},
                        success:function(json){


                        }
                    })
                })
                //我的预约
                var datayy=datas["sql2"];
                var a=$(".appointment_content tbody");
                for(var k in datayy){
                    a.append("<tr><td>"+datayy[k].FVISITINGTIME+"</td><td>"+datayy[k].FMUSEUM+"</td><td>"+datayy[k].FNAME+"</td><td>"+datayy[k].FRESERVENUM+"</td></tr>")
                }
                //我的收藏
                var collection=datas["sql3"];
                var collection1=filter("FCOLLECTIONTYPE","藏品点收藏",collection)
                var len=collection1.length;
                var limit=10;
                $(".pager").pager({
                    pageIndex:0,
                    pageSize:limit,
                    itemCount:len,
                    maxButtonCount:4,
                });
                showData(collection1);
                $(".collect_content ul li").on("click",function(){
                    $(this).addClass("active").siblings().removeClass("active");
                    var key=$(this).attr("data-name");
                    var collection2;
                    if(key=="cp"){
                        collection2=filter("FCOLLECTIONTYPE","藏品点收藏",collection)
                    }
                    else if(key=="bwg"){
                        collection2=filter("FCOLLECTIONTYPE","博物馆点收藏",collection)
                    }
                    else if(key=="xbwg"){
                        collection2=filter("FCOLLECTIONTYPE","数字博物馆点收藏",collection)
                    }
                    else if(key=="wc"){
                        collection2=filter("FCOLLECTIONTYPE","文创点收藏",collection)
                    }
                    var len=collection2.length;
                    var limit=10;
                    $(".pager").pager({
                        pageIndex:0,
                        pageSize:limit,
                        itemCount:len,
                        maxButtonCount:4,
                    });
                    showData(collection2);
                })

            }
        }
    });
}
getuserinfo();
$(".userbase_btn").on("click",function(){
    $(".userbase").hide();
    $(".userbase_xg").show();

})
$(".pwd").on("click",function(){
    $(".usersafe").hide();
    $(".usersafe_xg").show();
})

checkpwd("123465789");
//检查密码
function checkpwd(pwd) {
    if(/[a-zA-Z]+/.test(pwd) || /[0-9]+/.test(pwd)){
        if(pwd.length>18|| pwd.length<=8){
            noticeAssign(null);
        }
        else if (pwd.length>8&&(/[a-zA-Z]+/.test(pwd) || /[0-9]+/.test(pwd))){
            if (/[a-zA-Z]+/.test(pwd) && /[0-9]+/.test(pwd) && pwd.length > 12 && pwd.length<=18) {
                noticeAssign(1);
            }
            else if ((/[a-zA-Z]+/.test(pwd) || /[0-9]+/.test(pwd)) && pwd.length <= 12) {
                if ( /[a-zA-Z]+/.test(pwd) && /[0-9]+/.test(pwd)) {
                    noticeAssign(-1);
                }
                else {
                    noticeAssign(0);
                }
            }
        }
        else if(pwd.length <= 8 &&(/[a-zA-Z]+/.test(pwd) || /[0-9]+/.test(pwd))){
            noticeAssign(0);
        }

    }else {
        noticeAssign(null);
    }
}

    function noticeAssign(num) {
        if(num == 1) {
            $('.rank').css("background-position",'0 0');
        }else if(num == -1){
            $('.rank').css("background-position",'-81px 0');
        }else if(num ==0) {
            $('.rank').css("background-position",'-163px 0');
        }else{
            $('.rank').css("background-position",'-245px 0');
        }
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
function showData(data){
    var a=$(".list ul");
    a.html("");

    var arr=["appreciate_details.html?ID=","museum_details.html?ID=","digitization_details.html?id=","artifact_details.html?ID="]
    for(var k=0;k<10;k++){
        if(data[k]){
            if(data[k].FCOLLECTIONTYPE=="博物馆点收藏"){
                a.append("<li><a href='"+arr[1]+data[k].FCOLLECTIONID+"'><img src='"+data[k].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k].FCOLLECTIONNAME+"</p></a></li>")
            }else if(data[k].FCOLLECTIONTYPE=="藏品点收藏"){
                a.append("<li><a href='"+arr[0]+data[k].FCOLLECTIONID+"'><img src='"+data[k].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k].FCOLLECTIONNAME+"</p></a></li>")
            }else if(data[k].FCOLLECTIONTYPE=="数字博物馆点收藏"){
                a.append("<li><a href='"+arr[2]+data[k].FCOLLECTIONID+"'><img src='"+data[k].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k].FCOLLECTIONNAME+"</p></a></li>")
            }else if(data[k].FCOLLECTIONTYPE=="文创点收藏"){
                a.append("<li><a href='"+arr[3]+data[k].FCOLLECTIONID+"'><img src='"+data[k].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k].FCOLLECTIONNAME+"</p></a></li>")
            }
        }
    }
    $(".pager").delegate("a[page]","click",function(){
        var num=$(".pager .curPage").html()-1;
        a.html("");
        var limit=10;
        for(var k=0;k<10;k++){
            if(data[k+num*limit]){
                if(data[k+num*limit].FCOLLECTIONTYPE=="博物馆点收藏"){
                a.append("<li><a href='"+arr[1]+data[k+num*limit].FCOLLECTIONID+"'><img src='"+data[k+num*limit].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k+num*limit].FCOLLECTIONNAME+"</p></a></li>")
                }else if(data[k+num*limit].FCOLLECTIONTYPE=="藏品点收藏"){
                    a.append("<li><a href='"+arr[0]+data[k+num*limit].FCOLLECTIONID+"'><img src='"+data[k+num*limit].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k+num*limit].FCOLLECTIONNAME+"</p></a></li>")
                }else if(data[k+num*limit].FCOLLECTIONTYPE=="数字博物馆点收藏"){
                    a.append("<li><a href='"+arr[2]+data[k+num*limit].FCOLLECTIONID+"'><img src='"+data[k+num*limit].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k+num*limit].FCOLLECTIONNAME+"</p></a></li>")
                }else if(data[k+num*limit].FCOLLECTIONTYPE=="文创点收藏"){
                    a.append("<li><a href='"+arr[3]+data[k+num*limit].FCOLLECTIONID+"'><img src='"+data[k+num*limit].FCLOLLECTIONPIC+"' width='223px' height='171px'><p>"+data[k+num*limit].FCOLLECTIONNAME+"</p></a></li>")
                }
            }
        }
    })
}