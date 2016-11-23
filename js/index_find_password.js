$(".btn").on("click",function(){
    var index=parseInt($(this).attr("class").split(" ")[1].slice(3,4))+1;
    $(".state ul li:nth-child("+index+")").addClass("active").siblings().removeClass("active")
    $(this).parent().hide().next().show()
})
var code ; //在全局定义验证码
//产生验证码
window.onload = function createCode(){
    code = "";
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("val");
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z');//随机数
    for(var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
    }
    checkCode.value = code;//把code值赋给验证码
}
//校验验证码
function validate(){
    var inputCode = document.getElementById("code").value.toUpperCase(); //取得输入的验证码并转化为大写
    if(inputCode.length <= 0) { //若输入的验证码长度为0
        alert("请输入验证码！"); //则弹出请输入验证码
    }
    else if(inputCode != code ) { //若输入的验证码与产生的验证码不一致时
        alert("验证码输入错误！@_@"); //则弹出验证码输入错误
        createCode();//刷新验证码
        document.getElementById("code").value = "";//清空文本框
    }
    else { //输入正确时
        alert("输入正确"); //弹出^-^
    }
}
//密码
$("#newpwd").on("focus",function(){
    var val=$(this).val();
    if(val.length==0){
        $(this).parent().next().css("display","block").html("密码不能为空！");
    }
})
$("#newpwd").bind("input propertychange",function(){
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
    }
})
$("#qrpwd").bind("input propertychange",function(){
    var val=$(this).val();
    var pwd=$("#userpwd").val()
    if(val.length==0){
        $(this).parent().next().css("display","block").html("再次输入密码不能为空！");
    }
    else if(val==pwd){
        $(this).parent().next().css("display","none");
    }else{
        $(this).parent().next().css("display","block").html("两次的输入不一致！");
    }

})
//邮箱
var reg5= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
var regarr=["163.com","10086.cn","sohu.com","qq.com","189.cn","126.com","sina.com","outlook.com","aliyun.com","foxmail.com","yeah.net"];
$("#umail").on("focus",function(){
    var val=$(this).val();
    if(val.length==0){
        $(this).parent().next().css("display","block").html("邮箱不能为空！");
    }
})
$("#umail").bind("input propertychange",function(){
    var val=$(this).val();
    if(val.length==0){
        $(this).parent().next().css("display","block").html("邮箱不能为空！");
    }
    else if(reg5.test(val)){
        var realval= val.split('@')[1];
        realval = realval.toLowerCase();
        regarr.indexOf(realval);
        if(regarr.indexOf(realval)!=-1){
            $(this).parent().next().css("display","none");
        }
    }
    else{
        $(this).parent().next().css("display","block").html("邮箱不符合规定！");
    }
})
function getcode(){
    var val=$("#umail").val();
    $(".secondstep p u").html(val);
    var result={
        mail:val
    };
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/getcode.j",
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
}
function updatepassword(){
    var result={
        pwd:$("#qrpwd").val(),
        mail:$("#umail").val()
    }
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/updatepassword.j",
        dataType:'JSONP',
        jsonp: "jsoncallback",
        jsonpCallback:"success_jsonpCallback",
        data:{"params":result},
        success:function(json){
            success_jsonpCallback(json);
        }
    });
    function success_jsonpCallback(data){
        if(data["state"]=="success"){
            layer.alert("注册成功！",{icon:1},function(){
                location.href="index_register_next.html"
            });
        }else{
            layer.alert("注册失败！用户名已存在！",{icon:0});
        }
    }
}
