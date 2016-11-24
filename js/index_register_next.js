var mail=location.search.split("=")[1];
$(".font-mail").html(mail);
//跳转到指定的邮箱登录页面
$(".btn1").click(function () {
    var uurl = $(".font-mail").html();
    uurl = gotoEmail(uurl);
    if (uurl != "") {
        window.open("http://"+uurl);

    } else {
        alert("抱歉!未找到对应的邮箱登录地址，请自己登录邮箱查看邮件！");
    }
});

//功能：根据用户输入的Email跳转到相应的电子邮箱首页
function gotoEmail($mail) {
    var mail = $mail.split('@')[1];
    $t = mail.toLowerCase();
    if ($t == '163.com') {
        return 'mail.163.com';
    } else if ($t == 'vip.163.com') {
        return 'vip.163.com';
    } else if ($t == '126.com') {
        return 'mail.126.com';
    } else if ($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
        return 'mail.qq.com';
    }else if ($t == 'sohu.com') {
        return 'mail.sohu.com';
    }else if ($t == 'vip.sina.com') {
        return 'vip.sina.com';
    } else if ($t == 'sina.com.cn' || $t == 'sina.com') {
        return 'mail.sina.com.cn';
    } else if ($t == 'yeah.net') {
        return 'www.yeah.net';
    } else if ($t == 'outlook.com') {
        return 'www.outlook.com';
    }  else if ($t == '189.cn') {
        return 'webmail30.189.cn/w2/';
    } else if ($t == '139.com') {
        return 'mail.10086.cn';
    } else if ($t == 'aliyun.com') {
        return 'mail.aliyun.com';
    } else if ($t == 'foxmail.com') {
        return 'foxmail.com';
    } else {
        return '';
    }
};