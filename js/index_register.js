function checkUsername(){
    var arr={"uname":0,"umail":0,"upwd":0};
    var reg1=/[\u4E00-\u9FA5\s]+/;
    var reg2=/[0-9]+/;
    var reg3=/[a-zA-Z]+/;
    var reg4=/[_]+/
    var reg5= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var regarr=["163.com","10086.cn","sohu.com","qq.com","189.cn","126.com","sina.com","outlook.com","aliyun.com","foxmail.com","yeah.net"]
    var username=$("#username").val();
    var usermail=$("#usermail").val();
    var userpwd=$("#userpwd").val();
    var qrpwd=$("#qrpwd").val();
//用户名：
    $("#username").on("focus",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("用户名不能为空！");
            arr.uname=0;
        }
    })
    $("#username").bind("input propertychange",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("用户名不能为空！");
            arr.uname=0;
        }
        else if(val.length>=4&&/((?=[\x21-\x7e]+)[^A-Za-z0-9_])/.test(val)&&val.length<=14){
            $(this).parent().next().css("display","block").html("用户名不符合规定！");
            arr.uname=0;
        }
        else if(val.length>=4&&(reg1.test(val)||reg2.test(val)||reg3.test(val)||reg4.test(val))&&val.length<=14){
            $(this).parent().next().css("display","none");
            arr.uname=1;
        }
        else{
            $(this).parent().next().css("display","block").html("用户名不符合规定！");
            arr.uname=0;
        }
    })
    //邮箱
    $("#usermail").on("focus",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("邮箱不能为空！");
            arr.umail=0;
        }
    })
    $("#usermail").bind("input propertychange",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("邮箱不能为空！");
            arr.umail=0;
        }
        else if(reg5.test(val)){
            var realval= val.split('@')[1];
            realval = realval.toLowerCase();
            regarr.indexOf(realval);
            if(regarr.indexOf(realval)!=-1){
                $(this).parent().next().css("display","none");
                arr.umail=1;
            }
        }
        else{
            $(this).parent().next().css("display","block").html("邮箱不符合规定！");
            arr.umail=0;
        }
    })
    //密码
    $("#userpwd").on("focus",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("密码不能为空！");
            arr.upwd=0;
        }
    })
    $("#userpwd").bind("input propertychange",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("密码不能为空！");
        }
        else if((/[a-zA-Z]+/.test(val) || /[0-9]+/.test(val))&&!/((?=[\x21-\x7e]+)[^A-Za-z0-9])/.test(val)){
            if(val.length<8){
                $(this).parent().next().css("display","block").html("密码过短！");
            }
            else if(val.length>=8&&val.length<=18){
                $(this).parent().next().css("display","none");
            }
            else if(val.length>18){
                $(this).parent().next().css("display","block").html("密码过长！");
            }
        }else{
            $(this).parent().next().css("display","block").html("密码不符合规定！");
        }

    })
    //确认密码
    $("#qrpwd").on("focus",function(){
        var val=$(this).val();
        if(val.length==0){
            $(this).parent().next().css("display","block").html("再次输入密码不能为空！");
            arr.upwd=0;
        }
    })
    $("#qrpwd").bind("input propertychange",function(){
        var val=$(this).val();
        var pwd=$("#userpwd").val()
        if(val.length==0){
            $(this).parent().next().css("display","block").html("再次输入密码不能为空！");
            arr.upwd=0;
        }
        else if(val==pwd){
            $(this).parent().next().css("display","none");
            arr.upwd=1;
        }else{
            $(this).parent().next().css("display","block").html("两次的输入不一致！");
            arr.upwd=0;
        }

    })
     var name=$("#username").val();
     var pwd=$("#userpwd").val();
     var mail=$("#usermail").val();
    if(name!=null&&pwd!=null&&mail!=null){
        $("#sub").removeAttr("disabled");
        $("#sub").on("click",function(){
            var arr1=[];
            var name=$("#username").val();
            var pwd=$("#userpwd").val();
            var mail=$("#usermail").val();
            var result={
                "username":name,
                "userpwd":pwd,
                "usermail":mail
            };
            for(var k in arr){
                arr1.push(arr[k])
            }
            var a=arr1.indexOf(0);
            if(a==-1){
                var realname=$("#username_real").val();
                pinfo("realname",realname);
                var sex=$(".sex input:checked").val();
                pinfo("sex",sex);
                var date=$("#date").val();
                pinfo("date",date);
                var work=$("#work").val();
                pinfo("work",work);
                var userlabel=$("#userlabel option:selected").val();
                pinfo("userlabel",userlabel);
                result=JSON.stringify(result);
                $.ajax({
                    type:'post',
                    url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/WebUserInfo.j",
                    dataType:'JSONP',
                    jsonp: "jsoncallback",
                    jsonpCallback:"success_jsonpCallback",
                    data:{"params":result,"FState":"1"},
                    success:function(json){
                        success_jsonpCallback(json);
                    }
                });
                function success_jsonpCallback(data){
                    console.log(mail)
                    if(data["state"]=="success"){
                        layer.alert("注册成功！",{icon:1},function(){
                            location.href="index_register_next.html?mail="+mail
                        });
                    }else{
                        layer.alert("注册失败！用户名已存在！",{icon:0});
                    }
                }
            }
            else if(a!=-1){
                $("#sub").attr("disabled","true");
                return;
            }
            function pinfo(key,val){
                if(val){
                    result[key]=val;
                }
            }
        })
    }
}
checkUsername();
$(".login").on("click",function(){
    location.href="index_login.html"
})
