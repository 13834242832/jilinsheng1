//获取页面的传值
//按地区
var key1=decodeURI(location.search.split("&")[0].split("=")[1]);
$(".part1 ul li s:contains("+key1+")").parent().addClass("active").siblings().removeClass("active");
//按级别
var key2=decodeURI(location.search.split("&")[1].split("=")[1]);
$(".part2 ul li s:contains("+key2+")").parent().addClass("active").siblings().removeClass("active");;
//按类型
var key3=decodeURI(location.search.split("&")[2].split("=")[1]);
$(".part3 ul li s:contains("+key3+")").parent().addClass("active").siblings().removeClass("active");;
//按时间排序状态
// var key4=decodeURI(location.search.split("&")[4].split("=")[1]);
// if(key4==0){
//     $(".bottom .time u").attr("class"," ");
// }else{
//     $(".bottom .time u").attr("class","sort1");
// }
//搜索关键字
var key6=decodeURI(location.search.split("&")[3].split("=")[1]);
//页面传递查询条件
var k1=$(".part1 ul li.active s").html();
var k2=$(".part2 ul li.active s").html();
var k3=$(".part3 ul li.active s").html();
$(".common ul li").on("click",function(e){
    e.preventDefault();
    if($(this).hasClass("fl")){
        k1=$(this).find("s").html();
    }
    if($(this).hasClass("fw")){
        k2=$(this).find("s").html();
    }
    if($(this).hasClass("sj")){
        k3=$(this).find("s").html();
    }
    location.search="?gp="+k1+"&gp="+k2+"&gp="+k3+"&kw="+key6;
});
$(".section3 ul li").on("click",function(e){
    e.preventDefault();
    location.href="index_global_search.html?gp=全部&gp=所有结果&gp=时间不限&kw="+$(this).html();
})
$(function(){
    function search(key6) {
        var result={
            "FKeyName":key6
        }
        result=JSON.stringify(result);
        $.ajax({
            type:'post',
            url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/QZQW.j",
            async:false,
            dataType:'JSONP',
            jsonp: "jsoncallback",
            jsonpCallback:"success_jsonpCallback",
            data:{"params":result},
            beforeSend:function(){
                layer.load(1,{shade: [0.3,'#000']});
            },
            success:function(json){
                success_jsonpCallback(json);
            },
            complete:function(){
                layer.closeAll('loading');
            }
        });
        function success_jsonpCallback(data){
            var bwg=data["sql1"].length+data["sql11"].length;
            var sz=data["sql2"].length+data["sql21"].length;
            var cp=data["sql3"].length+data["sql31"].length;
            var wc=data["sql4"].length+data["sql41"].length;
            var zx=data["sql5"].length+data["sql51"].length;
            var xs=data["sql6"].length+data["sql61"].length;
            var ls=data["sql7"].length+data["sql71"].length;
            $(".part1 ul li:nth-child(2)").find("u").html(bwg);
            $(".part1 ul li:nth-child(3)").find("u").html(sz);
            $(".part1 ul li:nth-child(4)").find("u").html(cp);
            $(".part1 ul li:nth-child(5)").find("u").html(wc);
            $(".part1 ul li:nth-child(6)").find("u").html(zx);
            $(".part1 ul li:nth-child(7)").find("u").html(xs);
            $(".part1 ul li:nth-child(8)").find("u").html(ls);
            var datas=[];
            for(var k in data){
                datas=datas.concat(data[k]);
            }
            var sj=select(key1,key2,datas);
            var lens=datas.length
            if(lens==0){
                $(".content").prepend("<p style='text-align: center'>对不起没有找到与 '"+key6+"' 相关的内容，请换个关键词搜索</p>")
            }
            $(".part1 ul li:first-child").find("u").html(lens);
            showData(sj);
        }
    }
    search(key6);
    $.ajax({
        type:'GET',
        url:"data/information/text_kw.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            for(var k=0;k<9;k++){
                $(".section3 ul li").eq(k).html(datas[k].FHOTWORD);
            }
        }
    });
})
//数据过滤
function filters(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
        else if(val=="全部"||val=="所有结果"){
            function unique(arr){
                var hash={};
                var data=[];
                for(var i=0,l=arr.length;i<l;i++){
                    if(!hash[arr[i].NAME]){
                        hash[arr[i].NAME]=true;
                        data.push(arr[i])
                    }
                }
                return data
            }
            var a=unique(data);
            output=a;
        }
    }
    return output;
}
//多条件查询
function select(key1,key2,datas){
    var data=filters("JGFL",key1,datas);
    data=filters("CXFW",key2,data);
    return data;
}
//显示数据
function showData(datas){
    var limit=6;
    var len=datas.length
    $(".modultop>p span").html(len)
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
    for(var k=0;k<limit;k++){
        if(datas[k]&&datas){
            if(datas[k].JGFL=="博物馆一览"){
                $(".content ul").append("<li class='msgimgtext'><a href='museum_details.html?ID="+datas[k].MID+"'><img src='"+datas[k].PICPHOTO1+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[k].FMUSEUMNAME+"</h2><h3>地址：<span>"+datas[k].FDETAILADDRESS+"</span></h3><h5>开放时间：<span>"+datas[k].KFSJ+"</span></h5><div>"+datas[k].FMUSEUMBRIEF+"</div></div></li>")
                // $(".part1 ul li:nth-child(2)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="数字博物馆"){
                $(".content ul").append("<li class='msgimgtext'><a href='digitization_details.html?id="+datas[k].FGUID+"'><img src='"+datas[k].FPIC+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[k].FNAME+"</h2><h3>类型：<span>"+datas[k].FSTYLE+"</span></h3><h5>评分：<span>"+datas[k].FSCORE+"</span></h5><div>"+datas[k].FBRIEF+"</div></div></li>");
                // $(".part1 ul li:nth-child(3)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="藏品鉴赏"){
                $(".content ul").append("<li class='msgimgtext'><a href='appreciate_details.html?ID="+datas[k].FGUID+"'><img src='"+datas[k].FPICADDRESS+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[k].FCOLLECTIONCNAME+"</h2><h3>类型：<span>"+datas[k].FCOLLECTIONTYPE+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏品年代：<span>"+datas[k].FYEAR+"</span></h3><h5>规格：<span>"+datas[k].FSIZE+"</span></h5><div>"+datas[k].FCOLLECT+"</div></div></li>");
                // $(".part1 ul li:nth-child(4)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="文创产品"){
                $(".content ul").append("<li class='msgimgtext'><a href='artifact_details.html?ID="+datas[k].ID+"'><img src='"+datas[k].FPRODUCTPIC1+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[k].NAME+"</h2><h3>材质：<span>"+datas[k].FMATERIAL+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类别：<span>"+datas[k].FTYPE+"</span></h3><h5>规格：<span>"+datas[k].FSIZE+"</span></h5><div>"+datas[k].FPRODUCTBRIEF+"</div></div></li>");
                // $(".part1 ul li:nth-child(5)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="资讯"){
                $(".content ul").append("<li class='msgtext'><h4>"+datas[k].NAME+"</h4><p>"+datas[k].FBRIEF+"</p><div><a href='information_details.html?ID="+datas[k].ID+"'>information_details.html?ID="+datas[k].ID+"</a><span>"+datas[k].TIME+"</span></div></li>")
                // $(".part1 ul li:nth-child(6)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="学术"){
                $(".content ul").append("<li class='msgtext'><h4>"+datas[k].NAME+"</h4><p>"+datas[k].FBRIEF+"</p><div><a href='information_details.html?ID="+datas[k].ID+"'>information_details.html?ID="+datas[k].ID+"</a><span>"+datas[k].TIME+"</span></div></li>")
                // $(".part1 ul li:nth-child(7)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }
            else if(datas[k].JGFL=="历史吉林"){
                $(".content ul").append("<li class='msgtext'><h4>"+datas[k].NAME+"</h4><p>"+datas[k].FBRIEF+"</p><div><a href='history_culture_details.html?ID="+datas[k].ID+"'>history_culture_details.html?ID"+datas[k].ID+"</a><span>"+datas[k].TIME+"</span></div></li>")
                // $(".part1 ul li:nth-child(8)").find("u").html(datas.length);
                $(".top2>span u").html($(".part1 ul li.active span>u").html());
            }

        }
    }
    $(".pager").delegate("a[page]","click",function(){
        var num=$(".pager .curPage").html()-1;
        $(".content ul").html(" ");
        for(var i=0;i<limit;i++){
            if(datas[i+num*limit]&&datas){
                if(datas[i+num*limit].JGFL=="博物馆一览"){
                    $(".content ul").append("<li class='msgimgtext'><a href='museum_details.html?ID="+datas[i+num*limit].MID+"'><img src='"+datas[i+num*limit].PICPHOTO1+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[i+num*limit].FMUSEUMNAME+"</h2><h3>地址：<span>"+datas[i+num*limit].FDETAILADDRESS+"</span></h3><h5>开放时间：<span>"+datas[i+num*limit].KFSJ+"</span></h5><div>"+datas[i+num*limit].FMUSEUMBRIEF+"</div></div></li>")
                }
                else if(datas[i+num*limit].JGFL=="数字博物馆"){
                    $(".content ul").append("<li class='msgimgtext'><a href='digitization_details.html?id="+datas[i+num*limit].FGUID+"'><img src='"+datas[i+num*limit].FPIC+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[i+num*limit].FNAME+"</h2><h3>类型：<span>"+datas[i+num*limit].FSTYLE+"</span></h3><h5>评分：<span>"+datas[i+num*limit].FSCORE+"</span></h5><div>"+datas[i+num*limit].FBRIEF+"</div></div></li>");
                }
                else if(datas[i+num*limit].JGFL=="藏品鉴赏"){
                    $(".content ul").append("<li class='msgimgtext'><a href='appreciate_details.html?ID="+datas[i+num*limit].FGUID+"'><img src='"+datas[i+num*limit].FPICADDRESS+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[i+num*limit].FCOLLECTIONCNAME+"</h2><h3>类型：<span>"+datas[i+num*limit].FCOLLECTIONTYPE+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏品年代：<span>"+datas[i+num*limit].FYEAR+"</span></h3><h5>规格：<span>"+datas[i+num*limit].FSIZE+"</span></h5><div>"+datas[i+num*limit].FCOLLECT+"</div></div></li>");
                }
                else if(datas[i+num*limit].JGFL=="文创产品"){
                    $(".content ul").append("<li class='msgimgtext'><a href='artifact_details.html?ID="+datas[i+num*limit].ID+"'><img src='"+datas[i+num*limit].FPRODUCTPIC1+"' width='207px' height='154px'></a><div class='msg'><h2>"+datas[i+num*limit].NAME+"</h2><h3>材质：<span>"+datas[i+num*limit].FMATERIAL+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类别：<span>"+datas[i+num*limit].FTYPE+"</span></h3><h5>规格：<span>"+datas[i+num*limit].FSIZE+"</span></h5><div>"+datas[i+num*limit].FPRODUCTBRIEF+"</div></div></li>");
                }
                else if(datas[i+num*limit].JGFL=="资讯"){
                    $(".content ul").append("<li class='msgtext'><h4>"+datas[i+num*limit].NAME+"</h4><p>"+datas[i+num*limit].FBRIEF+"</p><div><a href='information_details.html?ID="+datas[i+num*limit].ID+"'>information_details.html?ID="+datas[i+num*limit].ID+"</a><span>"+datas[i+num*limit].TIME+"</span></div></li>")

                }
                else if(datas[i+num*limit].JGFL=="学术"){
                    $(".content ul").append("<li class='msgtext'><h4>"+datas[i+num*limit].NAME+"</h4><p>"+datas[i+num*limit].FBRIEF+"</p><div><a href='information_details.html?ID="+datas[i+num*limit].ID+"'>information_details.html?ID="+datas[i+num*limit].ID+"</a><span>"+datas[i+num*limit].TIME+"</span></div></li>")
                }
                else if(datas[i+num*limit].JGFL=="历史吉林"){
                    $(".content ul").append("<li class='msgtext'><h4>"+datas[i+num*limit].NAME+"</h4><p>"+datas[i+num*limit].FBRIEF+"</p><div><a href='history_culture_details.html?ID="+datas[i+num*limit].ID+"'>history_culture_details.html?ID"+datas[i+num*limit].ID+"</a><span>2010-02-01</span></div></li>")
                }
            }
        }
    })
}
