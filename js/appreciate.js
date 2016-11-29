
$(function(){

        $("#gp1 li span a").on("click",function(){
            $(this).attr("href","more_collection.html?gp1="+$(this).html()+"&gp2=全部&gp3=全部&gp4=全部&gp5=全部&kw=all&time=0&hot=0")
        })
    $.ajax({
        type:'GET',
        url:"data/appreciate/banner.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k=0;k<5;k++){
                $(".banner ul").append("<li><img width='907px' height='638px' src='' alt=''></li>");
                $(".banner ul li").eq(k).find("img").attr("src",datas[k].FCONTENTCOVER);
                $("[data-index='"+k+"'] h3").html(datas[k].FTITLE);
                $("[data-index]").eq(k).find("a").attr("href","appreciate_month_details.html?ID="+datas[k].FGUID)
                    .next().html(" ");
                $("[data-index]" ).eq(k).find("img").attr('src',datas[k].FCONTENTCOVER).attr("width","120px").attr("height","84px")
                $("[data-index]" ).eq(k).find("p").html(datas[k].FBRIEF);
            }
            $("b05").css("height","638px");
            var unslider05 = $('#b05').unslider({
                    dots: true
                }),
                data05 = unslider05.data('unslider');
            $("[data-index]").mouseover(function() {
                var num=$(this).index();
                data05.move(num, function() {});
                data05.stop();
            });
        }
    });
    //推荐三维藏品
    $.ajax({
        type:'GET',
        url:"data/digitization/3d.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k in datas){
                $("[data-3dname='" + k + "'] u").html(datas[k].FNAME).parent().prev()
                    .attr("href", "appreciate_details.html?ID=" + datas[k].FGUID + "").attr("target","_blank");
                var s=parseInt(k)+1;
                $("[data-3dname='" + k + "']").parent().find("img")
                    .attr('src',datas[k].FPIC);

            }
        }

    });
    //镇馆之宝
    $.ajax({
        type:'GET',
        url:"data/appreciate/treasure.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            var limit=12;
            $(".img_list").html(" ");
            for(var i=0;i<limit;i++){
                if(datas[i]) {
                    $(".img_list").append("<li><a href='appreciate_details.html?ID="+datas[i].FGUID+"' target='_blank'><img src='"+datas[i].FPICADDRESS+"' alt=''><p><span>"+datas[i].FCOLLECTIONCNAME+"</span></p></a></li>")

                }
            }
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