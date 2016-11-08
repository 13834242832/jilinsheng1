$.ajax({
    type:'GET',
    url:"data/information/text_slide.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k=0;k<3;k++){
            $("#b05 ul").append("<li><img width='300px' height='201px' src='"+datas[k].TPIC1+"' alt=''></li>")
        }
        $(document).ready(function() {
            var unslider05=$('#b05').unslider({
                    dots: true,
                    delay:3000
                }),
                data05=unslider05.data('unslider');
            $("#b05").css("height","");
            setInterval(function(){
                var n=$(".dots .active").index();
                $("#b05").next("p").html('');
                $("#b05").next("p").html("<span><a href='information_details.html?ID="+datas[n].ID+"' target='_blank'>"+datas[n].NAME+"</a></span>");
            },400);

        });
    }
});
$.ajax({
    type:'GET',
    url:"data/information/text_kw.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k=0;k<9;k++){
                $('.part1-bm ul').append("<li><a target='_blank' href='index_global_search.html?gp=全部&gp=所有结果&gp=时间不限&kw="+datas[k].FHOTWORD+"'></a></li>");
                $(".part1-bm ul li").eq(k).find('a').html(datas[k].FHOTWORD)
        }
    }
});
$.ajax({
    type:'GET',
    url:"data/information/text_synthesize.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        $(".newsimg img").attr("src",datas[0].TPIC1);
        $('.newsinf h4 a').html(datas[0].NAME).parent().next("h6").html(datas[0].TIME).next("p").html(datas[0].FBRIEF);
        $('.newsinf h5 a').attr("href","information_details.html?ID="+datas[0].ID).attr("target","_blank");
        for(var k=1;k<16;k++){
            $(".zh .content ul li").eq(k-1).find('a').attr("href","information_details.html?ID="+datas[k].ID).attr("target","_blank").html(datas[k].NAME).next("span").html(datas[k].TIME);
        }
    }
})
$.ajax({
    type:'GET',
    url:"data/information/text_show.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k=0;k<7;k++){
            $('.part3_1 ul li').eq(k).find('a').attr("href","index_showdetails.html?ID="+datas[k].ID).attr("target","_blank").html(datas[k].NAME).next("span").html(datas[k].TIME);
        }
    }
});
$.ajax({
    type:'GET',
    url:"data/information/text_recent.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k=0;k<8;k++){
            $('.part3_2 ul li').eq(k).find('a').attr("href","information_details.html?ID="+datas[k].ID).attr("target","_blank").html(datas[k].NAME).next("span").html(datas[k].TIME);
        }
    }
});
$.ajax({
    type:'GET',
    url:"data/information/text_academic.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        var xs=filter("FCOLUMN","学术快讯",datas);
        var ky=filter("FCOLUMN","科研成果",datas);
        var kg=filter("FCOLUMN","考古动态",datas);
        var jz=filter("FCOLUMN","学术讲座",datas);
        var output={"xs":xs,"ky":ky,"kg":kg,"jz":jz};
        for(var v in output){
            $("."+v+" .minf").find('a').attr("href","information_details.html?ID="+output[v][0].ID).attr("target","_blank").html(output[v][0].NAME).parent().next("p").html(output[v][0].FBRIEF);
            $("."+v+" .mimg img").attr('src',output[v][0].TPIC1);
            for(var k=1;k<9;k++){
                if(output[v][k]){
                     $("."+v+" ul li").eq(k-1).find('a').attr("href","information_details.html?ID="+output[v][k].ID).html(output[v][k].NAME).next("span").html(output[v][k].TIME).attr("target","_blank");
                }
            };
        }
    }
});
function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
    }
    return output;
}
