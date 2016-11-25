$.ajax({
    type:'GET',
    url:"data/index/museum_position.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k in datas){
            $(".form-control").append("<option>"+datas[k].FMUSEUMNAME+"</option>");
            var key=decodeURI(location.search.split("=")[1]);
            $(".form-control option:contains("+key+")").attr("selected","selected");
        }
    }

})
$("#adduser").on("click",function(){
    $(".msg tbody").append("<tr><td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td><td><input class=\"name\" type=\"text\" name='uname3' id='uname3' placeholder='请输入真实姓名' onfocus=\"this.placeholder=''\" onblur=\"this.placeholder='请输入真实姓名'\"><p></p></td><td style='padding-left:20px;'>证件号码：</td><td><input class=\"id\" name=\"uid3\" id=\"uid3\" placeholder=\"请输入身份证号码\" onfocus=\"this.placeholder=''\" onblur=\"this.placeholder='请输入身份证号码'\"><p></p></td></tr>")
    $(this).hide();
})

//真实姓名
$("tbody .name").bind("input propertychange",function(){
    var reg=/^[\u4E00-\u9FA5\s]+$|^[a-zA-Z\s]+$/;
    var val=$(this).val();
    var bl=reg.test(val);
    if(!val){
        $(this).next("p").html("内容不能为空").show();
        $(this).parent().siblings("td").find("p").html("内容不能为空").show();
    }
    else if(!bl){
        $(this).next("p").html("内容格式不正确").show();
    }else{
        $(this).next("p").html(" ").hide();
    }
})
//身份证号码
$("tbody .id").bind("input propertychange",function(){
    var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var val=$(this).val();
    var bl=reg.test(val);
    if(!val){
        $(this).next("p").html("内容不能为空").show();
        $(this).parent().siblings("td").find("p").html("内容不能为空").show();
    }
    else if(!bl){
        $(this).next("p").html("身份证格式不正确").show();
    }else{
        $(this).next("p").html(" ").hide();
    }
    var key0=$(this).parent().prev().prev().find("p").css("display");
    var key=$(this).next("p").css("display");
    console.log(key)
    var key1=$("#date").val();
    if(key1){
        if(key0=="none"){
            if(key=="none"){
                $("#submit").attr("disabled",false).css({background:"#928264",color:"#fff"})
            }
        }
    }

});

//post发送的数据
$(".content").delegate("#submit",'click',function(){
    var a=$("#museum option:selected").html();
    var b=$("#date").val();
    var uname1=$("#uname1").val();
    var uid1=$("#uid1").val();
    var uname2=$("#uname2").val();
    var uid2=$("#uid2").val();
    var uname3=$("#uname3").val();
    var uid3=$("#uid3").val();
    var user=[];
    if(uname1&&uid1){
        user.push({"uname":uname1,"uid":uid1})
    }
    if(uname2&&uid2){
        user.push({"uname":uname2,"uid":uid2})
    }
    if(uname3&&uid3){
        user.push({"uname":uname3,"uid":uid3})
    }
    var FUserName=getCookie("name");
    if(!FUserName){
        layer.alert("请先登录！",{icon:2});
        return;
    }
    var result=
        {
            "museum":a,
            "date":b,
            "user":user,
            "FUserName":FUserName
        }
    ;
    result=JSON.stringify(result);
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/geta.j",
        dataType:'JSONP',
        jsonp: "jsoncallback",
        jsonpCallback:"success_jsonpCallback",
        data:{"params":result},
        success:function(json){
            success_jsonpCallback(json);
        }
    });
    function success_jsonpCallback(data){
        console.log();
        if(data.state=="fail"){
            layer.alert(data.message,{icon:0});
        }
        else{
            layer.open({
                type: 1
                ,title: false //不显示标题栏
                ,closeBtn: false
                ,area:["500px","500px"]
                ,shade: 0.8
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,resize: false
                ,btn: ['确认']
                ,btnAlign:'a'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div style="height:348px; padding:50px;background:#393height:348px;padding:50px;background:#393D49; line-height: 22px;font-size:16px;color:#eee"><p>尊敬的'+data["sql1"][0].FWEBUSERNAME+'，您已成功预约参展预约信息已发送至您的邮箱'+data["sql1"][0].EMAIL+'具体信息如下：</p>' +
                '<table style="margin-top:20px">' +
                '<tbody class="list_r">' +
                '<tr style="line-height:60px">' +
                '<td>预约地点：</td><td>'+data["sql1"][0].FMUSEUM+'</td>' +
                '<td>预约时间：</td><td>'+data["sql1"][0].FVISITINGTIME+'</td>' +
                    '</tr>'+
                '</tbody>' +
                '</table>' +
                '</div>'
                ,success:function(layero){
                    var btn=layero;
                    for(var k in data["sql2"]){
                        btn.find(".list_r").append("<tr style='line-height:60px'><td>预约人：</td><td>"+data["sql2"][k].FNAME+"</td><td>预约码：</td><td>"+data["sql2"][k].FELECOUPON+"</td></tr>' ")
                    }
                }
            });
        }
    }
})
$("#LAY_layuipro").css("height","448px")
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