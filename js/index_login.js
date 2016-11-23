$(function(){
    var title1=$("title").html();
    if(title1=="登录"||title1=="注册"){
        $(".login_no").css("display","none");
    }
})
//post发送的数据
$("#sub").on('click',function(){
    var a=$("#username").val();
    var b=$("#userpwd").val();
    if(a==""){
        layer.alert("用户名不能为空！",{icon: 2});
        return;
    }
    else if(b==""){
        layer.alert("密码不能为空！",{icon: 2});
        return;
    }
    var time=new Date();
    var result={
            "username":a,
            "userpwd":b,
            "time":time
        };
    result=JSON.stringify(result);
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/UserLogin.j",
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
        if(data["sql2"]){
            var name=data["sql2"][0].FWEBUSERNAME;
            function setCookie(name, value, iDay)
            {
                var oDate=new Date();
                oDate.setDate(oDate.getDate()+iDay);
                document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
            }
            setCookie("name",name,7);
            if(data["sql2"][0].STATE=="success"){
                layer.alert("登录成功，返回上一级页面！",{icon: 1},function () {
                    var reg=/register/;
                    if(reg.test(parent.location.href)){
                        location.href="index.html"
                    }else{
                        history.go(-1);
                    }
                });

            }
        }else{
            layer.alert("用户名或者密码错误！",{icon: 1});
        }
     }
})
